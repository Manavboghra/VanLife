
import React, { useState } from "react";
import { X, ChevronDown } from "react-feather"; 

export default function DaysSelector({ van, onDaysChange }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempDays, setTempDays] = useState(van.days);

  const maxDays = 9;
  const daysOptions = Array.from({ length: maxDays }, (_, i) => i + 1);

  const handleDone = () => {
    onDaysChange(van.id, tempDays); 
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex items-baseline gap-2">
        <p className="text-gray-600 ">Days:</p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1 font-semibold border border-gray-300 rounded-md px-3 py-1   bg-white hover:bg-gray-50"
        >
          {van.days}
          <ChevronDown size={16} className="text-gray-500" />
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-xs flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-xs text-center">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Select Days</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-5 gap-3 mb-6">
              {daysOptions.map((qty) => (
                <button
                  key={qty}
                  onClick={() => setTempDays(qty)}
                  className={`w-12 h-12 flex items-center justify-center rounded-full font-semibold border transition-all
                    ${tempDays === qty
                      ? 'bg-orange-500 !text-white border-orange-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-gray-500' 
                    }`}
                >
                  {qty}
                </button>
              ))}
            </div>

            <button
              onClick={handleDone}
              className="w-full bg-orange-500 !text-white font-bold py-3 rounded-md hover:bg-orange-600 transition duration-200"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
}