import React from "react";
import { Package, Percent } from "lucide-react";

interface DashboardTabsProps {
  activeTab: "foods" | "offers";
  onTabChange: (tab: "foods" | "offers") => void;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="flex space-x-2 mb-10 bg-white rounded-xl p-1.5 shadow-md border border-gray-100 w-fit">
      <button
        onClick={() => onTabChange("foods")}
        className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 text-sm md:text-base ${
          activeTab === "foods"
            ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg scale-105"
            : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
        }`}
      >
        <Package className="w-5 h-5 mr-2" />
        Food Management
      </button>
      <button
        onClick={() => onTabChange("offers")}
        className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 text-sm md:text-base ${
          activeTab === "offers"
            ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg scale-105"
            : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
        }`}
      >
        <Percent className="w-5 h-5 mr-2" />
        Offers Management
      </button>
    </div>
  );
};

export default DashboardTabs;
