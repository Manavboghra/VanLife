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
  const id = formData.get("id");
  const payload = {
    id,
    name: formData.get("name"),
    price: Number(formData.get("price")),
    description: formData.get("description"),
    imageUrl: formData.get("imageUrl"),
    type: formData.get("type"),
  };

  try {
    await updateVan(payload);
    return { success: true };
  } catch (err) {
    return { success: false, message: err.message };
  }
}

const UpdateVanDetails = () => {
  const van = useLoaderData();
  const navigation = useNavigation();
  const actionData = useActionData();
  const [showPopup, setShowPopup] = useState(false);

  const { values, handleChange } = useInput({
    name: van.name,
    price: van.price,
    description: van.description,
    imageUrl: van.imageUrl,
    type: van.type,
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
    <div className="bg-[#FFF7ED] min-h-screen p-6">
      <Link
        to={"../updatevans"}
        className="flex items-center gap-2 text-orange-600 hover:underline mb-6"
      >
        <ArrowLeft size={18} />
        Back to your vans
      </Link>

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-[#c67a1d] text-white p-6">
          <h1 className="text-3xl font-bold">Update Van</h1>
          <p className="text-orange-100">Modify the details of your listing</p>
        </div>

        <Form method="patch" className="p-8 space-y-6">
          {values.imageUrl ? (
            <img
              src={values.imageUrl}
              alt={values.name || "Van"}
              className="w-full lg:w-64 mx-auto  object-cover rounded-lg shadow-md"
            />
          ) : (
            <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-lg text-gray-500">
              No Image
            </div>
          )}

          <input type="hidden" name="id" value={van.id} />

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Name
              </label>
              <input
                name="name"
                type="text"
                value={values.name}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price (per day)
              </label>
              <input
                name="price"
                type="number"
                value={values.price}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={values.description}
              onChange={handleChange}
              rows="4"
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Image URL
            </label>
            <input
              name="imageUrl"
              type="url"
              value={values.imageUrl}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Type
            </label>
            <select
              name="type"
              value={values.type}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
            >
              <option value="simple">Simple</option>
              <option value="rugged">Rugged</option>
              <option value="luxury">Luxury</option>
            </select>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 !text-white font-semibold px-6 py-3 rounded-lg transition disabled:bg-orange-300"
              disabled={navigation.state === "submitting"}
            >
              {navigation.state === "submitting"
                ? "Saving..."
                : "Save Changes"}
            </button>
          </div>
        </Form>
      </div>

      {showPopup && (
        <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-xl text-center">
            <h2 className="text-xl font-bold text-gray-600">
              Changes Saved Successfully!
            </h2>
            <p className="mt-2 text-gray-500">Redirecting...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateVanDetails;
