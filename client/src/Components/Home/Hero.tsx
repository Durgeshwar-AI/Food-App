import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="max-w-[1640px] mx-auto h-[100vh]">
      <div className="h-full relative overflow-hidden group">
        {/* Animated gradient overlay */}
        <div className="absolute w-full h-full bg-gradient-to-r from-black/60 via-black/50 to-black/40 flex flex-col justify-center p-8 z-10 group-hover:from-black/50 group-hover:via-black/40 group-hover:to-black/30 transition-all duration-500">
          <div className="flex flex-col justify-center h-full max-w-2xl">
            <div className="space-y-4">
              <p className="text-orange-400 text-lg font-semibold tracking-widest uppercase animate-fade-in">
                Welcome to FoodHub
              </p>

              <h1
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-2 leading-tight animate-fade-in"
                style={{ animationDelay: "0.1s" }}
              >
                The{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                  Best
                </span>
              </h1>

              <h1
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight animate-fade-in"
                style={{ animationDelay: "0.2s" }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                  Foods
                </span>{" "}
                Delivered
              </h1>

              <p
                className="text-lg sm:text-xl md:text-2xl text-gray-300 mt-6 leading-relaxed max-w-2xl animate-fade-in"
                style={{ animationDelay: "0.3s" }}
              >
                Experience restaurant-quality meals delivered hot and fresh to
                your door. Browse thousands of dishes from your favorite local
                restaurants.
              </p>

              {/* Stats Row */}
              <div
                className="flex gap-8 mt-8 pt-4 border-t border-white/20 animate-fade-in"
                style={{ animationDelay: "0.4s" }}
              >
                <div>
                  <p className="text-2xl font-bold text-orange-400">50K+</p>
                  <p className="text-gray-400 text-sm">Satisfied Customers</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange-400">500+</p>
                  <p className="text-gray-400 text-sm">Restaurants</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange-400">30min</p>
                  <p className="text-gray-400 text-sm">Avg Delivery</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div
                className="flex gap-4 pt-8 flex-wrap animate-fade-in"
                style={{ animationDelay: "0.5s" }}
              >
                <Link
                  to="/menu"
                  className="group/btn bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer flex items-center gap-2"
                >
                  <span>Order Now</span>
                  <span className="group-hover/btn:translate-x-1 transition-transform">
                    →
                  </span>
                </Link>
                <Link
                  to="/about"
                  className="border-2 border-white text-white hover:bg-white hover:text-orange-500 font-bold py-4 px-10 rounded-xl transition-all duration-300 backdrop-blur-sm hover:shadow-2xl cursor-pointer"
                >
                  Discover More
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Image with zoom effect */}
        <img
          src="https://images.pexels.com/photos/958546/pexels-photo-958546.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="hero food"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />

        {/* Floating elements for extra visual interest */}
        <div className="absolute top-20 right-20 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 left-20 w-60 h-60 bg-red-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>
    </div>
  );
};

export default Hero;
