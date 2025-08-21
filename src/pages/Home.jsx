import React from "react";
import bgImage from "../assets/background.png";
const Home = () => {
  return (
    <div>
      <div
        className="h-[500px] bg-cover bg-center flex flex-col justify-center items-center text-white px-4 text-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="mx-4 text-left">
          <h1 className="text-4xl md:text-5xl font-bold max-w-2xl mb-4">
            You got the travel plans, we got the travel vans.
          </h1>
          <p className="text-lg  max-w-xl ">
            Add adventure to your life by joining the #vanlife movement.{" "}
          </p>
          <p className="text-lg max-w-xl mb-6">
            Rent the perfect van to make your perfect road trip.
          </p>
        </div>
        <button className="bg-orange-400  hover:bg-orange-500 text-white font-semibold w-[95%] py-3 rounded-md transition">
          Find your van
        </button>
      </div>
    </div>
  );
};

export default Home;
