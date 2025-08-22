import React from "react";
import { useOutletContext } from "react-router-dom";

const Pricing = () => {
  const van = useOutletContext();

  return (
    <div>
      <div className="p-5">
        <span className="font-bold text-2xl"> ${van.price.toFixed(2)}</span>{" "}
        <span className="text-[#4D4D4D] font-[500]">/day</span>
      </div>
    </div>
  );
};

export default Pricing;
