import React, { useState } from "react";
import { Heart, ShoppingCart } from 'lucide-react';

// ✅ Define the type for props
interface FoodCardProps {
  img: string;
  offer: number;
  original: number;
  discounted: number;
  name: string;
}

// ✅ Use the type in the component
const FoodCards: React.FC<FoodCardProps> = ({ img, offer, original, discounted, name }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-2.5 right-2.5 p-1.5 bg-black/20 hover:bg-black/40 rounded-full text-white transition-all duration-200 z-10"
          aria-label={liked ? "Unlike" : "Like"}
        >
          {liked ? (
            <Heart className="w-5 h-5 text-rose-500" fill="currentColor" />
          ) : (
            <Heart className="w-5 h-5" />
          )}
        </button>
        {offer > 0 && (
          <div className="absolute top-2.5 left-2.5 bg-green-600 text-white px-2.5 py-1 rounded-full font-semibold text-xs shadow-sm">
            {offer}% OFF
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate" title={name}>
          {name}
        </h3>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-gray-500 text-sm line-through">
            ₹{original}
          </span>
          <span className="text-lg font-bold text-green-700">₹{discounted}</span>
        </div>
        <button className="mt-auto w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md font-medium transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer">
          <ShoppingCart className="w-5 h-5" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default FoodCards;
