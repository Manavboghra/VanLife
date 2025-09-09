import React, { useEffect, useRef, useState } from "react";
import { Form, useLocation, useNavigation } from "react-router-dom";
import { getNewVan } from "../../api";

import { getVans } from "../../api";
import { getCurrentUser } from "../../utils/auth";

export async function action({ request }) {
  const formData = await request.formData();
  const name = formData.get("name");
  const price = Number(formData.get("price"));
  const description = formData.get("description");
  const type = formData.get("type");
  const imageUrl = formData.get("imageUrl");
  const hostId = formData.get("hostId");
  const vans = await getVans();
  const maxId = Math.max(...vans.map((v) => parseInt(v.id, 10)));
  const newId = (maxId + 1).toString();

  try {
    const data = await getNewVan({
      id: newId,
      name,
      price,
      description,
      imageUrl,
      type,
      hostId,
    });
    return data;
  } catch (err) {
    return err.message;
  }
}

const AddVans = () => {
  const currentUser = getCurrentUser();
  // const [currentUser, setCurrentUser] = useState(null);
  // useEffect(() => {
  //   const user = localStorage.getItem("currentUser");
  //   if (user) {
  //     setCurrentUser(JSON.parse(user));
  //   }
  // }, []);
  const formRef = useRef();
  const navigatation = useNavigation();

  const handleSubmit = () => {
    setTimeout(() => formRef.current.reset(), 100);
  };

  if (currentUser?.hostId === "01") {
    return (
      <div className="bg-[#FFF7ED] h-full flex items-center justify-center p-10">
        <div className="text-2xl font-semibold text-gray-500">
          Sorry, you do not have this access.
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#FFF7ED]">
      <div className="font-bold text-4xl text-center ">Add new van</div>
      <Form ref={formRef} onSubmit={handleSubmit} method="post">
        <div className="bg-white border-2 rounded-lg text-left  ml-auto mr-auto max-w-96 m-7 px-10 py-7">
          <div className="flex flex-col">
            <label className="font-[600] text-xl pb-2" htmlFor="name">
              Name
            </label>
            <input
              className="border-2 rounded-lg h-7 py-4 px-2"
              type="text"
              name="name"
              id="name"
              placeholder="Enter name of van"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-[600] text-xl pt-4 pb-2" htmlFor="price">
              Price
            </label>
            <input
              className="border-2 rounded-lg h-7 py-4 px-2"
              type="number"
              name="price"
              id="price"
              placeholder="Enter price"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              className="font-[600] text-xl pt-4 pb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="border-2 rounded-lg  py-1 h-20 px-2"
              name="description"
              id="description"
              placeholder="Add description"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-[600] text-xl" htmlFor="imageUrl">
              Image
            </label>
            {/* <input
              className="border-2 rounded-lg h-20 content-center  cursor-pointer pl-12"
              type="file"
              name="image"
              id="image"
              required
              accept="Image/.jpg/.png/.jpeg"
            /> */}

            <input
              type="url"
              name="imageUrl"
              id="imageUrl"
              placeholder="Paste Image URL"
              className="border-2 rounded-lg h-10 cursor-pointer p-2"
              required
            />

          </div>
          <div className="flex flex-col">
            <label className="font-[600] text-xl pt-4 pb-2" htmlFor="type">
              Type
            </label>

            <select
              name="type"
              id="type"
              className="border-2 rounded-lg h-10 px-2 py-2"
            >
              <option value="simple">Simple</option>
              <option value="rugged">Rugged</option>
              <option value="luxury">Luxury</option>
            </select>
          </div>
          {currentUser && (
            <input type="hidden" name="hostId" value={currentUser.hostId} />
          )}
          <div className="flex justify-center mt-4">
            <button
              disabled={navigatation.state === "submitting"}
              className="bg-[#FF8C38] font-bold py-2 px-4 rounded-lg mt-5 hover:bg-[#e6761a] !text-white disabled:bg-[#ffc9a0]"
            >
              Submit
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AddVans;
