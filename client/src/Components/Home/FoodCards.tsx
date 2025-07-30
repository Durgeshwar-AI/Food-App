import React, { useState } from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";

// ✅ Define the type for props
interface FoodCardProps {
  img: string;
  offer: number;
  original: number;
  name: string;
  description: string;
  category: string;
}

// ✅ Use the type in the component
const FoodCards: React.FC<FoodCardProps> = ({
  img,
  offer,
  original,
  description,
  name,
  category,
}) => {
  const [liked, setLiked] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const discounted = Math.round(original - (original * offer) / 100);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col cursor-default border border-gray-100 hover:border-gray-200">
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Gradient overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Like Button */}
        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full shadow-lg transition-all duration-200 z-10 hover:scale-110"
          aria-label={liked ? "Unlike" : "Like"}
        >
          {liked ? (
            <Heart className="w-5 h-5 text-red-500" fill="currentColor" />
          ) : (
            <Heart className="w-5 h-5 text-gray-600" />
          )}
        </button>

        {/* Offer Badge */}
        {offer > 0 && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1.5 rounded-full font-bold text-sm shadow-lg">
            {offer}% OFF
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
          {category}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <h3
            className="text-xl font-bold text-gray-900 line-clamp-1 flex-1"
            title={name}
          >
            {name}
          </h3>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Price Section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-baseline gap-2">
            {offer > 0 && (
              <span className="text-gray-400 text-lg line-through font-medium">
                ₹{original}
              </span>
            )}
            <span className="text-2xl font-bold text-gray-900">
              ₹{offer > 0 ? discounted : original}
            </span>
          </div>
          {offer > 0 && (
            <div className="text-green-600 font-semibold text-sm">
              Save ₹{original - discounted}
            </div>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={addedToCart}
          className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
            addedToCart
              ? "bg-green-500 text-white cursor-default"
              : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          }`}
        >
          <ShoppingCart className="w-5 h-5" />
          {addedToCart ? "Added to Cart!" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default FoodCards;
