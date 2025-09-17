import React from "react";
import { Link } from "react-router-dom";
import aboutHero from "../../assets/About2.png";

const About = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="relative p-2">
        <img
          src={aboutHero}
          alt="About Hero"
          className="w-full h-[400px] md:h-[500px] object-cover rounded-2xl"
        />
        <div className="absolute inset-0 flex items-center justify-center rounded-b-2xl">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">
            About Us
          </h1>
        </div>
      </div>

      <div className="px-6 py-16 max-w-6xl mx-auto space-y-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              Our mission is to enliven your road trip with the perfect travel
              van rental. Every van is{" "}
              <strong>recertified before each trip</strong> so your adventure
              can go off without a hitch. <span className="text-2xl">😉</span>
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-xl shadow-md">
            <p className="text-gray-700 leading-relaxed text-lg">
              Our team is full of <strong>vanlife enthusiasts</strong> who know
              firsthand the magic of exploring the world on 4 wheels. We believe
              in travel that's comfortable, flexible, and unforgettable.
            </p>
          </div>
        </div>
      </div>

      {/* Highlight Section */}
      <div className="bg-gradient-to-r from-[#FFCC8D] to-[#FFD9A3] rounded-2xl mx-6 md:mx-auto max-w-5xl my-16 p-12 text-center shadow-xl">
        <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-snug">
          Your destination is waiting.  
          <br /> Your van is ready.
        </h3>
        <Link
          to="/vans"
          className="inline-block bg-black text-white font-semibold px-10 py-4 rounded-xl text-lg transition-all transform hover:bg-gray-900 hover:scale-105 shadow-md"
        >
          Explore Our Vans
        </Link>
      </div>
    </div>
  );
};

export default About;
