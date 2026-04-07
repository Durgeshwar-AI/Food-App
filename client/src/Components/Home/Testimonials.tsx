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
    <div className="w-full bg-[#f8fafc] py-24 relative overflow-hidden">
      <div className="max-w-[1640px] mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h4 className="text-orange-500 text-sm font-semibold tracking-[0.2em] uppercase mb-4 animate-fade-in inline-block py-1 px-3 rounded-full bg-orange-500/10 border border-orange-500/20">
            Social Proof
          </h4>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-4">
            Loved by Customers
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto font-light">
            Join thousands of happy customers enjoying our service
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`group p-px rounded-[24px] bg-gradient-to-br ${testimonial.gradient} hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-500 transform hover:-translate-y-2`}
            >
              <div className="bg-white/95 rounded-[23px] p-8 h-full flex flex-col group-hover:bg-white transition-all backdrop-blur-xl relative overflow-hidden">
                {/* Decorative glow inside card */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${testimonial.gradient} opacity-5 blur-2xl rounded-full group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Stars */}
                <div className="flex gap-1 mb-6 relative z-10">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-orange-500 text-xl drop-shadow-sm">
                      ★
                    </span>
                  ))}
                </div>

                {/* Quote Icon */}
                <div className="absolute top-6 right-8 text-6xl text-gray-200 font-serif pointer-events-none group-hover:scale-110 transition-transform duration-500">"</div>

                {/* Testimonial Text */}
                <p className="text-gray-600 mb-8 flex-grow text-lg leading-relaxed font-light relative z-10">
                  "{testimonial.text}"
                </p>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6 relative z-10"></div>

                {/* Customer Info */}
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-orange-500/20 group-hover:border-orange-500 transition-colors duration-500 shadow-sm">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm font-medium text-orange-500">
                      {testimonial.role}
                    </p>
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
