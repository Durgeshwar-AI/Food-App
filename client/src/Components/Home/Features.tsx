import React from "react";

const Features = () => {
  const features = [
    {
      icon: "🚀",
      title: "Lightning Fast",
      description:
        "Average delivery in 30 minutes. Track your order in real-time.",
      gradient: "from-purple-500 to-indigo-500",
    },
    {
      icon: "💰",
      title: "Best Prices",
      description: "Daily deals and exclusive discounts up to 50% off.",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: "🛡️",
      title: "Secure Payment",
      description: "Multiple payment options with bank-level security.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: "👨‍🍳",
      title: "Quality Verified",
      description: "All restaurants are certified and quality-checked.",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: "24/7",
      title: "Always Available",
      description: "Round-the-clock customer support for your needs.",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      icon: "📍",
      title: "Live Tracking",
      description: "GPS tracking and delivery partner location updates.",
      gradient: "from-yellow-500 to-amber-500",
    },
  ];

  return (
    <div className="w-full bg-white py-20">
      <div className="max-w-[1640px] mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h4 className="text-orange-500 text-lg font-bold tracking-widest uppercase mb-2">
            Why Choose Us
          </h4>
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
            Premium Features
          </h2>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">
            Experience unmatched service and quality
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl border-2 border-gray-200 hover:border-0 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
            >
              {/* Gradient background on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              ></div>

              {/* Content */}
              <div className="relative z-10">
                <div className="text-6xl mb-6 transition-transform group-hover:scale-125 group-hover:rotate-6">
                  {feature.icon}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-red-600 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors">
                  {feature.description}
                </p>

                {/* Bottom accent line */}
                <div
                  className={`h-1 bg-gradient-to-r ${feature.gradient} w-0 group-hover:w-16 transition-all duration-300 mt-6`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
