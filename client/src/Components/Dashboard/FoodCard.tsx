import React from "react";
import { Edit2, Trash2, Package } from "lucide-react";

interface FoodItem {
  id: number;
  name: string;
  category: string;
  price: number | string;
  image: string;
  description: string;
  status: "active" | "inactive";
}

interface FoodCardProps {
  food: FoodItem;
  onEdit: (food: FoodItem) => void;
  onDelete: (id: number) => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ food, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden border border-gray-100 group">
      <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100/20 to-red-100/20 group-hover:opacity-0 transition-opacity duration-300" />
        <Package className="w-16 h-16 text-gray-400 group-hover:scale-110 transition-transform duration-300" />
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-lg text-gray-900">{food.name}</h3>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              food.status === "active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {food.status}
          </span>
        </div>
        <p className="text-orange-600 font-semibold text-sm mb-2">
          {food.category}
        </p>
        <p className="text-3xl font-black text-gray-900 mb-2">
          $
          {typeof food.price === "number"
            ? food.price.toFixed(2)
            : Number(food.price).toFixed(2)}
        </p>
        <p className="text-gray-600 text-sm mb-5 line-clamp-2 h-10">
          {food.description}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(food)}
            className="flex-1 flex items-center justify-center px-3 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 font-semibold text-sm"
          >
            <Edit2 className="w-4 h-4 mr-1" />
            Edit
          </button>
          <button
            onClick={() => onDelete(food.id)}
            className="flex-1 flex items-center justify-center px-3 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300 font-semibold text-sm"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
