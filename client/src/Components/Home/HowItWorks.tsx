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
    <div className="w-full bg-white py-20">
      <div className="max-w-[1640px] mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h4 className="text-orange-500 text-lg font-bold tracking-widest uppercase mb-2">
            How It Works
          </h4>
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
            Simple & Fast Process
          </h2>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">
            Get your favorite food delivered in just 4 simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-32 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500"></div>

          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Step Card */}
              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl h-full border-2 border-orange-200 hover:border-orange-500 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                {/* Step Number Badge */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full w-16 h-16 flex items-center justify-center font-black text-2xl shadow-lg">
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <div className="pt-8 text-center">
                  <div className="text-5xl mb-4">{step.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Arrow for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-32 -right-6 text-orange-500 text-2xl">
                  →
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
