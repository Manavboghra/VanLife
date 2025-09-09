import { useLoaderData } from "react-router-dom";
import { clearCart, getCart, removeFromCart, updateCartItem } from "../../api";
import { useState } from "react";
import { X } from "react-feather";
import DaysSelector from "../../components/DaysSelector";
import { getCurrentUser } from "../../utils/auth";
import requireAuth from "../../utils/requireAuth";

export async function loader() {
  await requireAuth("/cart");
  const currentUser = getCurrentUser();
  if (!currentUser) {
    return [];
  }
  return getCart(currentUser.id);
}

const Cart = () => {
  const loaderData = useLoaderData();
  const [cartItems, setCartItems] = useState(loaderData);
  const [isToggleCancel, setIsToggleCancel] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleXClick = (id) => {
    setDeleteId(id);
    setIsToggleCancel(true);
  };

  const confirmDelete = async () => {
    try {
      await removeFromCart(deleteId);
      setCartItems((prev) => prev.filter((item) => item.id !== deleteId));
    } catch (err) {
      console.error("Failed to delete item:", err);
      alert("Failed to delete item");
    } finally {
      setIsToggleCancel(false);
      setDeleteId(null);
    }
  };

  // Cancel delete
  const cancelDelete = () => {
    setIsToggleCancel(false);
    setDeleteId(null);
  };

  
  const subTotalAmount = cartItems.reduce(
    (a, b) => a + b.price * b.days,
    0
  );
  const tax = ((subTotalAmount * 12) / 100).toFixed(2);
  const total = (subTotalAmount + Number(tax)).toFixed(2);

  const handleDaysUpdate = (vanId, newDays) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === vanId ? { ...item, days: newDays } : item
      )
    );
    return updateCartItem(vanId, { days: newDays });
  };

  const handleClear = async () => {
    try {
      const currentUser = getCurrentUser();
      await clearCart(currentUser.id);
      setCartItems([]);
    } catch (err) {
      console.error("Failed to clear cart", err);
    }
  };

  return (
    <div className="bg-[#FFF7ED] min-h-screen p-4 lg:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        <button
          className="hover:underline !text-gray-600 font-bold"
          onClick={handleClear}
        >
          Clear All
        </button>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          {cartItems.length > 0 ? (
            <div className="space-y-4">
              {cartItems.map((van) => (
                <div
                  key={van.id}
                  className="flex items-center bg-white p-4 rounded-lg shadow-sm"
                >
                  <img
                    src={van.imageUrl}
                    alt={van.name}
                    className="w-24 h-24 lg:w-32 lg:h-32 object-cover rounded-md flex-shrink-0"
                  />

                  <div className="flex-grow flex flex-col gap-1 ml-4">
                    <h2 className="text-lg font-semibold">{van.name}</h2>
                    <p className="text-gray-600">Price: ${van.price}/day</p>
                    <DaysSelector
                      van={van}
                      onDaysChange={handleDaysUpdate}
                    />
                  </div>
                  <div className="pb-24">
                    <button
                      onClick={() => handleXClick(van.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <X size={20} />
                    </button>
                    </div>

                  {isToggleCancel && (
                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center p-4 z-50">
                      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                        <h2 className="font-semibold text-lg mb-3">
                          Confirm Deletion
                        </h2>
                        <p className="text-gray-600">
                          Are you sure you want to delete this item?
                        </p>

                        <div className="flex justify-end gap-3 mt-5">
                          <button
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
                            onClick={confirmDelete}
                          >
                            Delete
                          </button>
                          <button
                            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md transition"
                            onClick={cancelDelete}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <p className="text-gray-600">Your cart is empty.</p>
              <a
                href="/vans"
                className="mt-4 inline-block bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
              >
                Explore Vans
              </a>
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="lg:w-1/3 bg-white p-6 rounded-lg shadow-sm lg:sticky lg:top-8 h-fit">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              Order Summary
            </h2>

            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${subTotalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (Estimated)</span>
                <span>${tax}</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>

            <button className="w-full bg-orange-500 !text-white font-bold py-3 rounded-md hover:bg-orange-600 transition duration-200">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
