import React from "react";

const DashboardHeader: React.FC = () => {
  return (
    <div className="mb-12">
      <div className="inline-block mb-4">
        <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
          Management Panel
        </span>
      </div>
      <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-3 tracking-tight">
        Admin Dashboard
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl font-medium">
        Manage your food app menu and create promotional offers with ease
      </p>
    </div>
  );
};

export default DashboardHeader;
