import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Anderson",
      role: "Frequent User",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      text: "Amazing experience! The food always arrives hot and fresh. Best food delivery app by far.",
      rating: 5,
      gradient: "from-blue-400 to-blue-600",
    },
    {
      name: "John Mitchell",
      role: "Foodie & Traveler",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      text: "Incredible variety and lightning-fast delivery. Great discounts and excellent support team!",
      rating: 5,
      gradient: "from-purple-400 to-purple-600",
    },
    {
      name: "Emma Davis",
      role: "Working Professional",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      text: "Lifesaver for busy days! Perfect app interface and reliable service. Highly recommended!",
      rating: 5,
      gradient: "from-pink-400 to-pink-600",
    },
    {
      name: "Michael Chen",
      role: "Student",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      text: "Affordable prices and amazing offers. Definitely my go-to app for late-night cravings!",
      rating: 5,
      gradient: "from-green-400 to-green-600",
    },
    {
      name: "Lisa Wong",
      role: "Family Parent",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      text: "Super reliable and family-friendly. Love the hygiene standards and restaurant variety.",
      rating: 5,
      gradient: "from-yellow-400 to-yellow-600",
    },
    {
      name: "David Kumar",
      role: "Business Owner",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      text: "Professional service and consistent quality. Perfect for team lunches and client meetings!",
      rating: 5,
      gradient: "from-red-400 to-red-600",
    },
  ];

  return (
    <div className="w-full bg-gradient-to-b from-gray-900 to-gray-800 py-20">
      <div className="max-w-[1640px] mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h4 className="text-orange-500 text-lg font-bold tracking-widest uppercase mb-2">
            Social Proof
          </h4>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
            Loved by Customers
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Join thousands of happy customers enjoying our service
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`group bg-gradient-to-br ${testimonial.gradient} p-1 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 transform hover:-translate-y-2`}
            >
              <div className="bg-gray-800 rounded-2xl p-8 h-full flex flex-col group-hover:bg-opacity-50 transition-all backdrop-blur-sm">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">
                      ★
                    </span>
                  ))}
                </div>

                {/* Quote Icon */}
                <div className="text-5xl text-gray-600 mb-4">"</div>

                {/* Testimonial Text */}
                <p className="text-gray-300 mb-8 flex-grow text-lg leading-relaxed">
                  {testimonial.text}
                </p>

                {/* Divider */}
                <div className="h-1 bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-6"></div>

                {/* Customer Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-gray-600 group-hover:border-orange-400 transition-colors"
                  />
                  <div>
                    <h3 className="font-bold text-white text-lg">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
