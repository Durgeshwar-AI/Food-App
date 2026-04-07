import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import axios from "axios";
import { useAppSelector } from "../../hooks/reduxhooks";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // fixed import
import "react-toastify/dist/ReactToastify.css";

interface FoodCardProps {
  id: string;
  img: string;
  offer: number;
  original: number;
  name: string;
  description: string;
  category: string;
}

const FoodCards: React.FC<FoodCardProps> = ({
  id,
  img,
  offer,
  original,
  description,
  name,
  category,
}) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const { token } = useAppSelector((state) => state.auth);
  const URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const discounted = Math.round(original - (original * offer) / 100);

  const handleAddToCart = async () => {
    if (!token) {
      toast.error("Please login first to add items to cart!"); // proper toast
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        `${URL}/cart`,
        { id, quantity: 1 },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      setAddedToCart(true);
      toast.success("Item added to cart!");
      setTimeout(() => setAddedToCart(false), 2000);
    } catch (err) {
      console.log(err);
      toast.error("Failed to add item to cart");
    }
  };

  return (
    <div className="group bg-white/80 backdrop-blur-md rounded-[24px] shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)] transition-all duration-500 flex flex-col cursor-default border border-gray-100 h-full relative">
      {/* Decorative gradient border effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"></div>
      
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 z-10">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Offer Badge */}
        {offer > 0 && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1.5 rounded-full font-bold text-sm shadow-lg">
            {offer}% OFF
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md border border-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold shadow-sm uppercase tracking-wider">
          {category}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow justify-between z-10 relative bg-gradient-to-b from-transparent to-white">
        <h3
          className="text-2xl font-bold text-gray-900 line-clamp-1 mb-2 group-hover:text-orange-500 transition-colors"
          title={name}
        >
          {name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed font-light">
          {description}
        </p>

        {/* Price Section */}
        <div className="flex items-center justify-between mb-5 bg-gray-50 px-4 py-3 rounded-2xl border border-gray-100">
          <div className="flex flex-col">
            <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
              ₹{offer > 0 ? discounted : original}
            </span>
            {offer > 0 && (
              <span className="text-sm text-gray-400 line-through font-medium">
                ₹{original}
              </span>
            )}
          </div>
          {offer > 0 && (
            <div className="text-green-600 font-bold text-sm bg-green-50 px-2 py-1 rounded-md border border-green-100">
              Save ₹{original - discounted}
            </div>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={addedToCart}
          className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer relative overflow-hidden group/btn ${
            addedToCart
              ? "bg-green-50 text-green-600 border border-green-200 cursor-default"
              : "bg-transparent border border-orange-500/50 text-orange-500 hover:border-orange-500 hover:text-white"
          }`}
        >
          {/* Hover fill effect */}
          {!addedToCart && (
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
          )}
          <ShoppingCart className="w-5 h-5 relative z-10" />
          <span className="relative z-10 tracking-wide">{addedToCart ? "Added to Cart!" : "Add to Cart"}</span>
        </button>
      </div>
    </div>
  );
};

export default FoodCards;
