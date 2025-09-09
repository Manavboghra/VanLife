import React from "react";
import aboutHero from "../../assets/About.png";
import { Link } from "react-router-dom";

const About = () => {
  return (
   <div className="bg-[#FFF7ED] min-h-screen pb-2">
  <img
    src={aboutHero}
    alt="Van hero"
    className="w-full h-60 object-cover"
  />

  <div className="px-6 py-4 mx-4 max-w-full text-[#161616] space-y-6">
    <h1 className="text-4xl font-bold">
      Don’t squeeze in a sedan when you could relax in a van.
    </h1>
    <div>
      <p className="font-medium text-[16px]">
        Our mission is to enliven your road trip with the perfect travel van
        rental. Our vans are recertified before each trip to ensure your
        travel plans can go off without a hitch.
        <span className="text-xl">😉</span>
      </p>
      <p className="font-medium text-[16px] mt-5">
        Our team is full of vanlife enthusiasts who know firsthand the magic
        of touring the world on 4 wheels.
      </p>
    </div>
  </div>

  <div className="bg-[#FFCC8D] rounded-2xl mx-6 md:mx-auto max-w-3xl my-12 p-10 text-center shadow-md">
        <h3 className="text-2xl md:text-3xl font-bold text-[#161616] mb-4">
          Your destination is waiting.  
          <br /> Your van is ready.
        </h3>
        <Link
          to="/vans"
          className="inline-block bg-black text-white font-semibold px-6 py-3 rounded-lg text-base md:text-lg transition hover:bg-gray-900"
        >
          Explore Our Vans
        </Link>
      </div>
</div>

  );
};

export default About;
