import React from "react";
import { Plus } from "lucide-react";

interface OfferSectionHeaderProps {
  count: number;
  onAddNew: () => void;
}

const OfferSectionHeader: React.FC<OfferSectionHeaderProps> = ({
  count,
  onAddNew,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Promotional Offers</h2>
        <p className="text-gray-600 text-sm mt-1">{count} active offers</p>
      </div>
      <button
        onClick={onAddNew}
        className="flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 font-semibold"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add New Offer
      </button>
    </div>
  );
};

export default OfferSectionHeader;
