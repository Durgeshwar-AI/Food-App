import React, { useState } from "react";
// Import icons from lucide-react
import { Heart, ShoppingCart } from 'lucide-react';

const FoodCards = ({ img, offer, original, discounted, name }) => {
  const [liked, setLiked] = useState(false);

  return (
    // Added 'group' class for hover effects on children
    <div className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">

      {/* Image Section */}
      <div className="relative aspect-video overflow-hidden"> {/* Use aspect ratio for consistent image shape */}
        <img
          src={img}
          alt={name}
          // Slightly zoom image on card hover
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Like Button - Using Lucide Heart */}
        <button
          onClick={() => setLiked(!liked)}
          // Added subtle background on hover for visibility
          className="absolute top-2.5 right-2.5 p-1.5 bg-black/20 hover:bg-black/40 rounded-full text-white transition-all duration-200 z-10"
          aria-label={liked ? "Unlike" : "Like"} // Accessibility improvement
        >
          {liked ? (
            // Lucide Heart: use fill="currentColor" and text color class for solid effect
            <Heart className="w-5 h-5 text-rose-500" fill="currentColor" />
          ) : (
            // Lucide Heart: default is outline
            <Heart className="w-5 h-5" />
          )}
        </button>

        {/* Offer Badge - Slightly refined style */}
        {offer > 0 && ( // Conditionally render only if there's an offer
           <div className="absolute top-2.5 left-2.5 bg-green-600 text-white px-2.5 py-1 rounded-full font-semibold text-xs shadow-sm">
             {offer}% OFF
           </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow"> {/* Added flex-grow to push button down */}
        {/* Product Name - Left aligned, slightly larger */}
        <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate" title={name}> {/* Added title for full name on hover if truncated */}
          {name}
        </h3>

        {/* Price Section */}
        <div className="flex items-baseline gap-2 mb-3">
          {/* Original Price - Slightly muted */}
          <span className="text-gray-500 text-sm line-through">
            ₹{original}
          </span>
          {/* Discounted Price - More prominent */}
          <span className="text-lg font-bold text-green-700">₹{discounted}</span>
        </div>

        {/* Add to Cart Button - Using Lucide ShoppingCart */}
        <button className="mt-auto w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md font-medium transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer">
          {/* Lucide ShoppingCart */}
          <ShoppingCart className="w-5 h-5" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default FoodCards;