import React from "react";
import { Edit2, Trash2, Package } from "lucide-react";

interface FoodItem {
  _id?: string;
  id?: number;
  name: string;
  category: string;
  price: number | string;
  img: string;
  description: string;
  status?: "active" | "inactive";
  offer?: number;
}

interface FoodCardProps {
  food: FoodItem;
  onEdit: (food: FoodItem) => void;
  onDelete: (id: string) => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ food, onEdit, onDelete }) => {
  const originalPrice =
    typeof food.price === "string" ? parseFloat(food.price) : food.price;
  const discount = food.offer || 0;
  const discountedPrice =
    discount > 0
      ? Math.round(originalPrice - (originalPrice * discount) / 100)
      : originalPrice;
  const savingsAmount = discount > 0 ? originalPrice - discountedPrice : 0;

  return (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col cursor-default border border-gray-100 hover:border-gray-200 h-full">
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        {food.img ? (
          <>
            <img
              src={food.img}
              alt={food.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-orange-100/20 to-red-100/20 group-hover:opacity-0 transition-opacity duration-300" />
            <Package className="w-16 h-16 text-gray-400 group-hover:scale-110 transition-transform duration-300" />
          </>
        )}

        {/* Offer Badge */}
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1.5 rounded-full font-bold text-sm shadow-lg">
            {discount}% OFF
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
          {food.category}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          <h3
            className="text-xl font-bold text-gray-900 line-clamp-1 mb-2"
            title={food.name}
          >
            {food.name}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
            {food.description}
          </p>
        </div>

        {/* Price Section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gray-900">
              ${discountedPrice.toFixed(2)}
            </span>
            {discount > 0 && (
              <span className="text-sm text-gray-500 line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          {discount > 0 && (
            <div className="text-green-600 font-semibold text-sm">
              Save ${savingsAmount.toFixed(2)}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(food)}
            className="flex-1 px-3 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 font-semibold text-sm"
          >
            <Edit2 className="w-4 h-4 mr-1 inline" />
            Edit
          </button>
          <button
            onClick={() => onDelete((food._id || food.id)?.toString() || "")}
            className="flex-1 px-3 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300 font-semibold text-sm"
          >
            <Trash2 className="w-4 h-4 mr-1 inline" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
