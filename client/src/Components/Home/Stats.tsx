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
    <div className="w-full bg-[#fafafa] py-24 relative overflow-hidden">
      {/* Decorative center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-orange-500/5 blur-[120px] pointer-events-none rounded-[100%]"></div>

      <div className="max-w-[1640px] mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h4 className="text-orange-500 text-sm font-semibold tracking-[0.2em] uppercase mb-4 animate-fade-in inline-block py-1 px-3 rounded-full bg-orange-500/10 border border-orange-500/20">
            Our scale
          </h4>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-4">
            By The Numbers
          </h2>
          <p className="text-gray-600 text-lg md:text-xl font-light">
            Join millions of satisfied users worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`group p-px rounded-[24px] bg-gradient-to-b from-gray-200 to-transparent hover:from-${stat.color.split(" ")[0].replace('from-', '')} transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden`}
            >
              <div className="bg-white/90 rounded-[23px] p-8 text-center h-full backdrop-blur-xl transition-all group-hover:bg-white/80">
                <div
                  className="text-5xl mb-6 inline-block drop-shadow-sm group-hover:scale-110 transition-transform duration-500"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {stat.icon}
                </div>
                <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-900 to-gray-700 group-hover:from-orange-500 group-hover:to-red-500 bg-clip-text text-transparent mb-3 transition-colors duration-500">
                  {stat.number}
                </h2>
                <p className="text-gray-500 text-sm tracking-wide font-semibold uppercase group-hover:text-gray-700">
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
