import React from "react";
import { Package } from "lucide-react";

interface DashboardTabsProps {
  activeTab: "foods";
  onTabChange: (tab: "foods") => void;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="flex space-x-2 mb-10 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-2 shadow-2xl border-2 border-orange-500/20 w-fit">
      <button
        onClick={() => onTabChange("foods")}
        className={`flex items-center px-6 py-3 rounded-xl font-bold transition-all duration-300 text-sm md:text-base ${
          activeTab === "foods"
            ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-2xl scale-105"
            : "text-gray-400 hover:text-gray-200 hover:bg-gray-700/50"
        }`}
      >
        <Package className="w-5 h-5 mr-2" />
        Food Management
      </button>
    </div>
  );
};

export default DashboardTabs;
