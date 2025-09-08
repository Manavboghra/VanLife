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

  <div className="w-[500px] mx-auto my-10 rounded-sm h-48 gap-4 bg-[#FFCC8D] p-8 items-start  flex flex-col">
    <div className="font-bold text-2xl leading-2">
      <p>Your destination is waiting</p>
      <p>Your van is ready</p>
    </div>
    <div className="text-white">
  <Link to={"/vans"}  className="bg-black  font-medium px-4 py-2 rounded-lg text-sm">
    Explore our vans
  </Link>
  </div>
  </div>
</div>

  );
};

export default About;
