import React, { useRef, useMemo, useEffect } from "react";
import { Form, useNavigation } from "react-router-dom";
import { getCurrentUser } from "../../utils/auth";
import { getNewVan, getVans } from "../../api";
import { notification } from "antd";
const Context = React.createContext({ name: "Default" });

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
  const formRef = useRef();
  const navigation = useNavigation();

  const handleSubmit = () => {
    setTimeout(() => formRef.current.reset(), 100);
  };
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement) => {
    api.error({
      message: `Account Error`,
      description: (
        <Context.Consumer>
          {() =>
            `Hello, ${currentUser.name}! Sorry, you do not have this access. Please login with host ID.`
          }
        </Context.Consumer>
      ),
      placement,
    });
  };
  const contextValue = useMemo(() => ({ name: "Guest" }), []);

  if (currentUser?.hostId === "01") {
    useEffect(() => {
      openNotification("topRight");
    }, []);

    return (
      <div>
        {contextHolder}
        <Context.Provider value={contextValue}>
          <div className="bg-gray-50 h-screen flex items-center justify-center">
            <div className="text-2xl font-semibold text-gray-500 bg-white p-8 rounded-2xl shadow-md">
              🚫 Sorry, you do not have access to add vans.
            </div>
          </div>
        </Context.Provider>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen flex items-center justify-center px-6 py-12">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-lg ">
        <div className="bg-blue-500 text-white rounded-t-2xl flex justify-center p-10">
          <h1 className="text-3xl font-extrabold text-center">Add New Van</h1>
        </div>

        <div className="p-10">
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            method="post"
            className="space-y-6"
          >
            <div>
              <label
                className="block font-semibold text-gray-700 mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                type="text"
                name="name"
                id="name"
                placeholder="Enter name of van"
                required
              />
            </div>

            <div>
              <label
                className="block font-semibold text-gray-700 mb-2"
                htmlFor="price"
              >
                Price (₹)
              </label>
              <input
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                type="number"
                name="price"
                id="price"
                placeholder="Enter price"
                required
              />
            </div>

            <div>
              <label
                className="block font-semibold text-gray-700 mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className="w-full border rounded-lg px-3 py-2 h-24 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
                name="description"
                id="description"
                placeholder="Add description"
                required
              />
            </div>

            <div>
              <label
                className="block font-semibold text-gray-700 mb-2"
                htmlFor="imageUrl"
              >
                Image URL
              </label>
              <input
                type="url"
                name="imageUrl"
                id="imageUrl"
                placeholder="Paste image URL"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <div>
              <label
                className="block font-semibold text-gray-700 mb-2"
                htmlFor="type"
              >
                Type
              </label>
              <select
                name="type"
                id="type"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="simple">Simple</option>
                <option value="rugged">Rugged</option>
                <option value="luxury">Luxury</option>
              </select>
            </div>

            {currentUser && (
              <input type="hidden" name="hostId" value={currentUser.hostId} />
            )}

            <div className="flex justify-center">
              <button
                disabled={navigation.state === "submitting"}
                className="w-full bg-blue-500 !text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition disabled:bg-blue-400"
              >
                {navigation.state === "submitting" ? "Submitting..." : "Submit"}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddVans;
