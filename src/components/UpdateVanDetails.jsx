import React, { useState, useEffect } from "react";
import {
  Form,
  Link,
  redirect,
  useLoaderData,
  useNavigation,
  useActionData,
} from "react-router-dom";
import { getVanById, updateVan } from "../api";
import useInput from "../hook/useInput";
import { ArrowLeft } from "react-feather";

export async function loader({ params }) {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) {
    return redirect("/login");
  }
  const van = await getVanById(params.id);
  if (!van) {
    throw new Response("Not Found", { status: 404 });
  }
  if (van.hostId !== user.hostId) {
    return redirect("/host/update");
  }
  return van;
}

export async function action({ request }) {
  const formData = await request.formData();
  const name = formData.get("name");
  const price = Number(formData.get("price"));
  const description = formData.get("description");
  const imageUrl = formData.get("imageUrl");
  const type = formData.get("type");
  const id = formData.get("id");

  try {
    await updateVan({
      id,
      name,
      price,
      description,
      imageUrl,
      type,
    });
    return { success: true };
  } catch (err) {
    return { success: false, message: err.message };
  }
}

const UpdateVanDetails = () => {
  const van = useLoaderData();
  const navigate = useNavigation();
  const actionData = useActionData();
  const [showPopup, setShowPopup] = useState(false);

  const { values, handleChange, reset } = useInput({
    name: `${van.name}`,
    price: `${van.price}`,
    description: `${van.description}`,
    imageUrl: `${van.imageUrl}`,
    type: `${van.type}`,
  });

  useEffect(() => {
    if (actionData?.success) {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        window.location.href = "/host/updatevans"; 
      }, 1000);
    }
  }, [actionData]);

  return (
    <div className="p-5 pt-0 bg-[#FFF7ED]">
      <Link to={"../updatevans"}>
        <div className="flex text-xl underline items-center py-2">
          <ArrowLeft size={17} />
          Back to your vans
        </div>
      </Link>

      <div className="font-bold text-4xl text-center pt-2 ">Update van</div>

      <Form
        method="patch"
        className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden"
      >
        {values.imageUrl ? (
          <img
            src={values.imageUrl}
            alt={values.name || "Van"}
            className="w-full h-64 object-contain"
          />
        ) : (
          <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}

        <input type="hidden" name="id" value={van.id} />

        <div className="p-6 space-y-5">
          <div>
            <label htmlFor="name" className="block text-lg font-semibold mb-2">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={values.name}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-lg font-semibold mb-2">
              Price (per day)
            </label>
            <input
              id="price"
              name="price"
              type="number"
              value={values.price}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-lg font-semibold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={values.description}
              onChange={handleChange}
              rows="4"
              required
              className="w-full border rounded-lg px-3 py-2 resize-none"
            />
          </div>

          <div>
            <label
              htmlFor="imageUrl"
              className="block text-lg font-semibold mb-2"
            >
              Image URL
            </label>
            <input
              id="imageUrl"
              name="imageUrl"
              type="url"
              value={values.imageUrl}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label htmlFor="type" className="block text-lg font-semibold mb-2">
              Type
            </label>
            <select
              id="type"
              name="type"
              value={values.type}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="simple">Simple</option>
              <option value="rugged">Rugged</option>
              <option value="luxury">Luxury</option>
            </select>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2 rounded-lg transition disabled:bg-orange-300"
            >
              {navigate.state === "submitting" ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </Form>

      {showPopup && (
        <div className="fixed inset-0 backdrop-blur-md flex justify-center items-center p-4 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <h2 className="text-xl font-bold text-green-600">
              ✅ Changes Saved Successfully!
            </h2>
            <p className="mt-2 text-gray-600">Redirecting...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateVanDetails;
