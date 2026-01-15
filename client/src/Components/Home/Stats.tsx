import React from "react";

const Stats = () => {
  const stats = [
    {
      icon: "👥",
      number: "50K+",
      label: "Happy Customers",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: "🍽️",
      number: "500+",
      label: "Partner Restaurants",
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: "⚡",
      number: "30min",
      label: "Average Delivery",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      icon: "⭐",
      number: "4.8/5",
      label: "User Rating",
      color: "from-pink-500 to-pink-600",
    },
  ];

  return (
    <div className="w-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-20">
      <div className="max-w-[1640px] mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            By The Numbers
          </h2>
          <p className="text-gray-400 text-lg">
            Join millions of satisfied users worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`group bg-gradient-to-br ${stat.color} p-1 rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2`}
            >
              <div className="bg-gray-900 rounded-2xl p-8 text-center h-full backdrop-blur-sm group-hover:bg-opacity-50 transition-all">
                <div
                  className="text-6xl mb-4 animate-bounce"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {stat.icon}
                </div>
                <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </h2>
                <p className="text-gray-300 text-lg font-semibold">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
