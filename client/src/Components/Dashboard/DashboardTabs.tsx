import React from "react";
import { Package, ClipboardList, Tag, BarChart3 } from "lucide-react";

export type DashboardTab = "foods" | "orders" | "offers" | "analytics";

interface DashboardTabsProps {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs = [
    { id: "foods", label: "Menu", icon: Package },
    { id: "orders", label: "Orders", icon: ClipboardList },
    { id: "offers", label: "Offers", icon: Tag },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-10 bg-gray-900/5 backdrop-blur-xl rounded-[2rem] p-2 border border-gray-200/50 w-full md:w-fit">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id as DashboardTab)}
          className={`flex items-center px-6 py-3 rounded-2xl font-black transition-all duration-500 text-sm md:text-base group ${
            activeTab === tab.id
              ? "bg-gray-900 text-white shadow-2xl shadow-gray-900/20 scale-105"
              : "text-gray-500 hover:text-gray-900 hover:bg-white transition-all"
          }`}
        >
          <tab.icon className={`w-5 h-5 mr-2 transition-transform duration-500 ${
            activeTab === tab.id ? "scale-110" : "group-hover:scale-110"
          }`} />
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default DashboardTabs;
