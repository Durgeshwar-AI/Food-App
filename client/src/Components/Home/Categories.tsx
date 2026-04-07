import React from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = [
    {
      name: "Burgers",
      icon: "🍔",
      color: "from-yellow-400 to-yellow-500",
      link: "/menu?category=burgers",
    },
    {
      name: "Pizza",
      icon: "🍕",
      color: "from-red-400 to-red-500",
      link: "/menu?category=pizza",
    },
    {
      name: "Sushi",
      icon: "🍣",
      color: "from-green-400 to-green-500",
      link: "/menu?category=sushi",
    },
    {
      name: "Biryani",
      icon: "🍚",
      color: "from-orange-400 to-orange-500",
      link: "/menu?category=biryani",
    },
    {
      name: "Desserts",
      icon: "🍰",
      color: "from-pink-400 to-pink-500",
      link: "/menu?category=desserts",
    },
    {
      name: "Drinks",
      icon: "🥤",
      color: "from-blue-400 to-blue-500",
      link: "/menu?category=drinks",
    },
  ];

  return (
    <div className="w-full bg-white py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="max-w-[1640px] mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h4 className="text-orange-500 text-sm font-semibold tracking-[0.2em] uppercase mb-4 animate-fade-in inline-block py-1 px-3 rounded-full bg-orange-500/10 border border-orange-500/20">
            Explore
          </h4>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-4">
            Popular Categories
          </h2>
          <p className="text-gray-600 text-lg md:text-xl font-light max-w-2xl mx-auto">
            Find exactly what you're craving
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={category.link}
              className={`group p-[1px] rounded-[24px] bg-gradient-to-br ${category.color} hover:shadow-[0_0_20px_rgba(249,115,22,0.2)] transition-all duration-500 transform hover:scale-105 hover:-translate-y-2`}
            >
              <div className="bg-white/90 backdrop-blur-xl rounded-[23px] p-6 h-full flex flex-col items-center justify-center text-center group-hover:bg-white/70 transition-all">
                <div className="text-5xl mb-4 transition-transform duration-500 group-hover:scale-110 drop-shadow-md">
                  {category.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-red-500 transition-all tracking-wide">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
