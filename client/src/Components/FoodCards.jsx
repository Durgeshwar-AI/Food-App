import React, { useState } from "react";

const FoodCards = ({ img, offer, original, discounted, name }) => {
  const [liked, setLiked] = useState(false);
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-64 overflow-hidden m-6">
        <div className="absolute top-2 left-2 bg-white text-black w-6 h-6 rounded-full shadow-md z-10 flex">
          <button
            onClick={() => setLiked(!liked)}
            className="text-lg transition-transform w-6 h-6 border-0 outline-0 p-0 m-0 cursor-pointer"
          >
            {liked ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-rose-600"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            )}
          </button>
        </div>
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-3 right-4 bg-green-500 text-white px-2 py-1 rounded-full font-medium text-sm">
          {offer}% OFF
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl text-center font-bold text-gray-800 mb-2 truncate">
          {name}
        </h3>
        <div className="flex items-baseline gap-2">
          <span className="text-gray-500 text-sm line-through">
            ₹{original}
          </span>
          <span className="text-xl font-bold text-green-700">₹{discounted}</span>
        </div>
        <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 cursor-pointer">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default FoodCards;