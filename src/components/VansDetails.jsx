import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, Star } from "react-feather";

import {
  useParams,
  Link,
  useLocation,
  useLoaderData,
  Form,
  useNavigate,
  NavLink,
} from "react-router-dom";
import { addToCart, getReview, getVanById } from "../api";
import requireAuth from "../utils/requireAuth";
import { getCurrentUser } from "../utils/auth";

export async function loader({ params }) {
  return getVanById(params.id);
}

export async function action({ request, params }) {
  const pathname = new URL(request.url).pathname;
  await requireAuth(pathname);
  const formData = await request.formData();
  const date = new Intl.DateTimeFormat("en-CA").format(new Date());

  const id = params.id;
  const comment = formData.get("comment");
  const payment = Number(formData.get("payment"));
  const reviewer = formData.get("reviewer");
  const stars = Number(formData.get("stars"));

  try {
    const data = await getReview({
      id,
      reviewer,
      date,
      payment,
      stars,
      comment,
    });
    return data;
  } catch (err) {
    return err.message;
  }
}

const VansDetails = () => {
  const [stars, setStars] = useState(1);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [addtoCart, setAddtoCart] = useState(false);
  const Allvans = useLoaderData();
  const clear = useRef();
  const navigate = useNavigate();

  // const [currentUser, setCurrentUser] = useState(null);
  const currentUser = getCurrentUser();

  // useEffect(() => {
  //   const user = localStorage.getItem("currentUser");
  //   if (user) {
  //     setCurrentUser(JSON.parse(user));
  //   }
  // }, []);

  async function handleAddToCart() {
    if (!currentUser) {
      setShowLoginPopup(true);
      return;
    }

    try {
      await addToCart(currentUser.id, Allvans);

      setAddtoCart(true);

      setTimeout(() => setAddtoCart(false), 3000);
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  }

  // const { id } = useParams();

  // const [Allvans,setAllVans] = useState("")

  // useEffect(() => {
  //   const fetchReviews = async () => {
  //     const res = await fetch(`http://localhost:5000/vans/${id}`);
  //     const vanData = await res.json();
  //     setAllVans(vanData || []);
  //   };

  //   fetchReviews();
  // }, [id]);
  const location = useLocation();
  const search = location.state?.search;
  const type = location.state?.type || "all";
  const allReviews = Allvans.reviews || [];
  const totalReviews = allReviews.length;
  const count = allReviews.filter((r) => r.stars).length;
  const average = (
    allReviews.reduce((sum, r) => sum + r.stars, 0) / totalReviews
  ).toFixed(1);

  const handleSubmit = () => {
    setTimeout(() => clear.current.reset(), 100);
  };

  return (
    <div className="bg-white p-6">
      <div className="mb-10 font-medium text-xl">
        <Link to={search ? `/vans${search}` : "/vans"}>
          <div className="flex items-center gap-2">
            <ArrowLeft size={16} />
            <span className="underline">
              Back to {type.typeFilters?.join(" ")} vans
            </span>
          </div>
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/5">
          <img
            src={Allvans.imageUrl}
            alt={Allvans.name}
            className="w-full h-auto rounded-md"
          />
        </div>

        <div className="lg:w-4/5 flex flex-col gap-4">
          <div
            className={`inline-block my-2 py-2 w-[40%] text-center rounded-md font-semibold text-white
        ${String(Allvans.type) === "simple" && "bg-blue-400"}
        ${String(Allvans.type) === "rugged" && "bg-blue-600"}
        ${String(Allvans.type) === "luxury" && "bg-blue-900"}`}
          >
            {String(Allvans.type).charAt(0).toUpperCase() +
              String(Allvans.type).slice(1)}
          </div>

          <div className="font-bold text-2xl text-[#161616]">
            {Allvans.name}
          </div>
          <div className="text-lg">
            <b>${Allvans.price}</b>/day
          </div>

          <div className="font-medium text-[#161616] lg:text-lg text-sm">
            {Allvans.description}
          </div>
        </div>
      </div>

      <div className="pt-6 mt-6 lg:mt-8 w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex items-center gap-4 mb-4 px-3">
          <div className="text-2xl font-bold text-gray-900">Reviews</div>
          <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full">
            <Star size={18} className="fill-yellow-500 text-yellow-500" />
            <span className="font-bold text-gray-800">{average}</span>
            <span className="text-gray-600">({count} reviews)</span>
          </div>
        </div>

        <div className="space-y-3">
          {allReviews.length > 0 ? (
            allReviews.map((review, index) => (
              <div
                key={index}
                className="bg-gray-100 shadow-sm border border-gray-100 m-3 p-5 rounded-lg"
              >
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={
                        i < review.stars
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <p className="text-gray-800 mb-2">{review.comment}</p>
                <p className="text-sm text-gray-500 font-medium">
                  — {review.reviewer}, {review.date}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No reviews available</p>
          )}
        </div>
        <hr className="border-gray-200 my-8 ml-auto mr-auto space-y-3 w-[98%]" />
        {currentUser?.hostId === "01" && (
          <Form
            method="post"
            ref={clear}
            className="m-5 flex flex-col"
            onSubmit={handleSubmit}
          >
            <div className="text-2xl font-bold pb-3">Leave a Review</div>

            <div>
              <div className="block mb-1 text-sm font-medium text-gray-700">
                Your Rating
              </div>
              <div className="flex flex-row py-2 gap-1">
                {[...Array(5)].map((_, i) => {
                  const value = i + 1;
                  return (
                    <button
                      type="button"
                      key={value}
                      onClick={() => setStars(value)}
                    >
                      <Star
                        size={24}
                        className={
                          value <= stars
                            ? "text-amber-500 fill-amber-500"
                            : "text-gray-300 fill-gray-300 hover:text-amber-500 hover:fill-amber-500"
                        }
                      />
                    </button>
                  );
                })}
                <input type="hidden" name="stars" value={stars} />
              </div>
            </div>

            <div className="mt-3">
              <div className="block mb-1 text-sm font-medium text-gray-700">
                Your Name
              </div>
              <input
                type="text"
                placeholder="Enter your name"
                className="block py-2 px-3 w-full rounded-md border border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                name="reviewer"
                rows="4"
                id="reviewer"
                required
              />
            </div>

            <div className="mt-3">
              <div className="block mb-1 text-sm font-medium text-gray-700">
                Amount
              </div>
              <input
                type="number"
                placeholder="Amount you paid"
                className="block py-2 px-3 w-full rounded-md border border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                name="payment"
                rows="4"
                id="payment"
                required
              />
            </div>

            <div className="mt-3">
              <div className="block mb-1 text-sm font-medium text-gray-700">
                Your Review
              </div>
              <textarea
                placeholder="Share your experience..."
                className="block py-2 px-3 w-full rounded-md border border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                name="comment"
                rows="4"
                id="comment"
                required
              />
            </div>

            <div className="mt-10 bg-[#FF8C38] !text-white font-semibold px-5 py-2 text-center rounded-md hover:bg-[#e57d30] transition-colors">
              <button type="submit">Submit Review</button>
            </div>
          </Form>
        )}
      </div>
      {currentUser?.hostId === "01" && (
        <div className="mt-4 lg:mt-8 flex justify-center">
          {showLoginPopup ? (
            <div className="fixed inset-0 backdrop-blur-xs flex justify-center items-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-xs text-center">
                <div className="text-xl font-bold mb-4">Not Logged In</div>
                <div className="mb-6">
                  Please log in to add items to your cart.
                </div>
                <Link
                  to={`/login?redirectTo=${location.pathname}`}
                  className="w-full p-2 bg-orange-500 !text-white font-bold py-3 rounded-md hover:bg-orange-600 transition duration-200"
                >
                  Go to Login
                </Link>
              </div>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="bg-orange-500  !text-white p-4 w-full rounded"
            >
              Rent the van
            </button>
          )}
        </div>
      )}
      {addtoCart && (
        <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center p-4 z-50">
          <div className="bg-white p-8 rounded-xl flex-row shadow-lg text-center">
            <div className="font-[600] text-xl text-black flex flex-col items-center gap-2">
              Van added to cart!
              <div className="font-light">
                <NavLink
                  className="bg-gray-300 my-auto p-2 text-sm rounded-lg"
                  to={"/cart"}
                >
                  view
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VansDetails;
