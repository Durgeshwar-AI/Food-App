import React from "react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Browse Restaurants",
      description:
        "Explore thousands of restaurants and cuisines available in your area.",
      icon: "🔍",
    },
    {
      number: "02",
      title: "Select Your Food",
      description:
        "Choose your favorite dishes with detailed descriptions and ratings.",
      icon: "🍔",
    },
    {
      number: "03",
      title: "Place Your Order",
      description: "Quickly add items to cart and proceed to secure checkout.",
      icon: "🛒",
    },
    {
      number: "04",
      title: "Track Delivery",
      description:
        "Real-time tracking of your order from restaurant to your door.",
      icon: "📍",
    },
  ];

  return (
    <div className="w-full bg-white py-24 relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1640px] mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h4 className="text-orange-500 text-sm font-semibold tracking-[0.2em] uppercase mb-4 animate-fade-in inline-block py-1 px-3 rounded-full bg-orange-500/10 border border-orange-500/20">
            How It Works
          </h4>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-4">
            Simple & Fast Process
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto font-light">
            Get your favorite food delivered in just 4 simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 relative mt-8">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-[5.5rem] left-0 right-0 h-[2px] bg-gradient-to-r from-orange-500/20 via-orange-500/50 to-orange-500/20"></div>

          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Step Card */}
              <div className="bg-white/80 backdrop-blur-md p-8 pt-12 rounded-[24px] h-full border border-gray-100 group-hover:border-orange-500/30 transition-all duration-500 transform group-hover:-translate-y-2 group-hover:shadow-[0_8px_30px_rgba(249,115,22,0.1)] mt-6">
                
                {/* Step Number Badge */}
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-b from-orange-400 to-red-500 text-white rounded-full w-[4.5rem] h-[4.5rem] flex items-center justify-center font-black text-2xl shadow-[0_4px_20px_rgba(249,115,22,0.3)] border-4 border-white group-hover:scale-110 transition-transform duration-500">
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <div className="pt-4 text-center">
                  <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-500 drop-shadow-sm">
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-wide">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Arrow for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-[5rem] -right-6 text-orange-500 text-3xl font-light">
                  <span className="bg-white px-2">›</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
