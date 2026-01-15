import React from "react";

const DashboardHeader: React.FC = () => {
  return (
    <div className="mb-12">
      <div className="inline-block mb-4">
        <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-full text-sm font-bold uppercase tracking-widest shadow-lg">
          ⚙️ Management Panel
        </span>
      </div>
      <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-3 tracking-tight">
        Admin Dashboard
      </h1>
      <p className="text-xl text-gray-300 max-w-2xl font-medium">
        Manage your food app menu and create promotional offers with ease
      </p>
    </div>
  );
};

export default DashboardHeader;
