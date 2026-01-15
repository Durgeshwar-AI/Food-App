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
    <div className="w-full bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="max-w-[1640px] mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h4 className="text-orange-500 text-lg font-bold tracking-widest uppercase mb-2">
            Explore
          </h4>
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
            Popular Categories
          </h2>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">
            Find exactly what you\'re craving
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={category.link}
              className={`group bg-gradient-to-br ${category.color} p-1 rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-3`}
            >
              <div className="bg-white rounded-2xl p-6 h-full flex flex-col items-center justify-center text-center group-hover:bg-opacity-50 transition-all">
                <div className="text-5xl mb-3 transition-transform group-hover:scale-125">
                  {category.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-red-500 transition-all">
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
