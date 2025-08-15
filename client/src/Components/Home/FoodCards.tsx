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
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col cursor-default border border-gray-100 hover:border-gray-200">
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
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
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
          {category}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <h3 className="text-xl font-bold text-gray-900 line-clamp-1 mb-2" title={name}>
          {name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">{description}</p>

        {/* Price Section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gray-900">
              ₹{offer > 0 ? discounted : original}
            </span>
            {offer > 0 && (
              <span className="text-sm text-gray-500 line-through">₹{original}</span>
            )}
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
          className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
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
