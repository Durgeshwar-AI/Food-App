import React from "react";
import { Edit2, Trash2, Percent } from "lucide-react";

interface OfferItem {
  id: number;
  title: string;
  discount: number | string;
  code: string;
  validUntil: string;
  status: "active" | "inactive";
  description: string;
}

interface OfferCardProps {
  offer: OfferItem;
  onEdit: (offer: OfferItem) => void;
  onDelete: (id: number) => void;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300 p-6 border border-gray-100 group relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-100 to-red-100 rounded-full -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-300" />
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-5">
          <h3 className="font-bold text-xl text-gray-900 w-3/4">
            {offer.title}
          </h3>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
              offer.status === "active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {offer.status}
          </span>
        </div>
        <div className="mb-5 bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border-2 border-orange-200">
          <div className="flex items-baseline mb-2">
            <span className="text-4xl font-black text-orange-600">
              {offer.discount}%
            </span>
            <span className="text-gray-600 ml-2 font-semibold">OFF</span>
          </div>
          <div className="bg-gray-900 px-4 py-2.5 rounded-lg font-mono text-sm text-white font-bold tracking-wider inline-block">
            {offer.code}
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-5 font-medium line-clamp-2">
          {offer.description}
        </p>
        <p className="text-sm text-gray-500 mb-6 font-semibold">
          <span className="text-gray-400">Valid until: </span>
          {new Date(offer.validUntil).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(offer)}
            className="flex-1 flex items-center justify-center px-3 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 font-semibold text-sm"
          >
            <Edit2 className="w-4 h-4 mr-1" />
            Edit
          </button>
          <button
            onClick={() => onDelete(offer.id)}
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

export default OfferCard;
