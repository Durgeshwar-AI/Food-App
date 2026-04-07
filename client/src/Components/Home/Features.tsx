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
    <div className="w-full bg-[#f8fafc] py-24 relative overflow-hidden">
      <div className="max-w-[1640px] mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h4 className="text-orange-500 text-sm font-semibold tracking-[0.2em] uppercase mb-4 animate-fade-in inline-block py-1 px-3 rounded-full bg-orange-500/10 border border-orange-500/20">
            Why Choose Us
          </h4>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-4">
            Premium Features
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto font-light">
            Experience unmatched service and quality
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white p-8 rounded-3xl border border-gray-100 hover:border-orange-500/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all duration-500 transform hover:-translate-y-2 overflow-hidden backdrop-blur-sm"
            >
              {/* Gradient background on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`}
              ></div>

              {/* Content */}
              <div className="relative z-10">
                <div className="text-5xl mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 inline-block drop-shadow-sm">
                  {feature.icon}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-red-500 group-hover:bg-clip-text transition-all tracking-wide">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed font-light group-hover:text-gray-800 transition-colors">
                  {feature.description}
                </p>

                {/* Bottom accent line */}
                <div
                  className={`h-[2px] bg-gradient-to-r ${feature.gradient} w-0 group-hover:w-full transition-all duration-500 mt-8 rounded-full`}
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
