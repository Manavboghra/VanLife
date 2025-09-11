import React from "react";
import aboutHero from "../../assets/About.png";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="relative">
        <img
          src={aboutHero}
          alt="Van hero"
          className="w-full h-72 md:h-96 object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white text-center px-4">
            Don't squeeze in a sedan, relax in a van 🚐
          </h1>
        </div>
      </div>

      <div className="px-6 py-12 max-w-5xl mx-auto space-y-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#161616] mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              Our mission is to enliven your road trip with the perfect travel van
              rental. Every van is <strong>recertified before each trip</strong> so your adventure
              can go off without a hitch. <span className="text-xl">😉</span>
            </p>
          </div>
          <div>
            <p className="text-gray-700 leading-relaxed text-lg">
              Our team is full of <strong>vanlife enthusiasts</strong> who know firsthand the
              magic of exploring the world on 4 wheels. We believe in travel that's
              comfortable, flexible, and unforgettable.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#FFCC8D] to-[#FFD9A3] rounded-2xl mx-6 md:mx-auto max-w-4xl my-12 p-10 text-center shadow-lg">
        <h3 className="text-2xl md:text-3xl font-bold text-[#161616] mb-6">
          Your destination is waiting.  
          <br /> Your van is ready.
        </h3>
        <Link
          to="/vans"
          className="inline-block bg-black text-white font-semibold px-8 py-3 rounded-lg text-lg transition transform hover:bg-gray-900 hover:scale-105"
        >
          Explore Our Vans
        </Link>
      </div>
    </div>
  );
};

export default About;
