import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function App() {
    const navigate = useNavigate()
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-gray-800 bg-opacity-50 shadow-2xl rounded-2xl overflow-hidden backdrop-blur-lg">
          <div className="grid md:grid-cols-2 items-center">
            
            <div className="hidden md:block">
              <img
                src="https://i.imgur.com/qIufhof.png"
                alt="A lost astronaut floating in space"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src='https://placehold.co/600x800/1F2937/FFFFFF?text=Image+Not+Found';
                }}
              />
            </div>

            <div className="p-8 md:p-12 text-center md:text-left">
              <h1 className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400 mb-4 leading-tight">
                404
              </h1>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-100 mb-3">
                Houston, we have a problem.
              </h2>
              <p className="text-md text-gray-400 mb-8">
                It seems you've ventured into uncharted territory. The page you're looking for has either been moved or doesn't exist.
              </p>
              
              <button
                onClick={() => navigate("/")}
                className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 transform hover:scale-105 transition-transform duration-300 ease-in-out"
              >
                Go Back Home
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
