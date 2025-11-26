import React from "react";
import { Plus } from "lucide-react";

interface FoodSectionHeaderProps {
  count: number;
  onAddNew: () => void;
}

const FoodSectionHeader: React.FC<FoodSectionHeaderProps> = ({
  count,
  onAddNew,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Food Items</h2>
        <p className="text-gray-600 text-sm mt-1">{count} items in inventory</p>
      </div>
      <button
        onClick={onAddNew}
        className="flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 font-semibold"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add New Food
      </button>
    </div>
  );
};

export default FoodSectionHeader;
