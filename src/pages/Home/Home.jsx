import React from "react";
import { Link } from "react-router-dom";
import bgImage from "../../assets/background1.png";

const Home = () => {
  return (
    <div>
      <div
        className="h-[500px] bg-cover bg-center relative rounded-lg overflow-hidden"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black/20" />

        <div className="absolute top-1/2 left-6 transform -translate-y-1/2 bg-white/70 p-8 rounded-xl shadow-lg max-w-md">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-snug">
            You got the travel plans, <br /> we got the travel vans
          </h1>
          <p className="text-gray-700 mb-6 text-base leading-relaxed">
            Explore the world on your terms. Rent the perfect campervan that fits your
            style and budget, and embark on an unforgettable journey. From rugged
            off-grid explorers to luxurious mobile homes — your adventure starts here.
          </p>
          <Link
            to="/vans"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition transform hover:scale-105 shadow-md"
          >
            Find Your Van
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
