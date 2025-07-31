import React, { useState, useEffect } from "react";
import { ChevronRight, Star, Clock, Shield, Zap, Award, CreditCard, MapPin } from "lucide-react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";


type Service = {
  title: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  color: string;
};

const services: Service[] = [
  {
    title: "Lightning Delivery",
    icon: <Zap className="w-8 h-8" />,
    description: "Ultra-fast delivery in 15-30 minutes with real-time tracking.",
    features: ["GPS tracking", "15-30 min delivery", "Hot & fresh guarantee"],
    color: "from-yellow-400 to-orange-500"
  },
  {
    title: "Smart Pre-Orders",
    icon: <Clock className="w-8 h-8" />,
    description: "Schedule meals up to 7 days in advance with AI-powered recommendations.",
    features: ["7-day scheduling", "AI suggestions", "Meal planning"],
    color: "from-blue-400 to-purple-500"
  },
  {
    title: "Group Feasts",
    icon: <MapPin className="w-8 h-8" />,
    description: "Coordinate orders for teams, families, and events effortlessly.",
    features: ["Split payments", "Bulk discounts", "Event catering"],
    color: "from-green-400 to-teal-500"
  },
  {
    title: "Skip-the-Line Pickup",
    icon: <Award className="w-8 h-8" />,
    description: "Reserve your spot and pickup without any waiting time.",
    features: ["QR code pickup", "Priority queue", "Loyalty rewards"],
    color: "from-purple-400 to-pink-500"
  },
];

const stats = [
  { number: "50K+", label: "Happy Customers", icon: <Star className="w-6 h-6" /> },
  { number: "15 min", label: "Avg Delivery", icon: <Zap className="w-6 h-6" /> },
  { number: "500+", label: "Restaurant Partners", icon: <Award className="w-6 h-6" /> },
  { number: "99.8%", label: "Success Rate", icon: <Shield className="w-6 h-6" /> },
];

const benefits = [
  { icon: <Zap className="w-6 h-6" />, title: "Lightning Fast", desc: "Average delivery in 15 minutes" },
  { icon: <Award className="w-6 h-6" />, title: "Premium Quality", desc: "Top-rated restaurants only" },
  { icon: <Shield className="w-6 h-6" />, title: "Live Tracking", desc: "Real-time order updates" },
  { icon: <CreditCard className="w-6 h-6" />, title: "Secure Payments", desc: "Multiple payment options" },
];

export default function ServicesPage() {
  const [activeService, setActiveService] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section with Animated Background */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-orange-200 to-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-gradient-to-r from-red-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
        </div>
        
        <div className={`relative max-w-7xl mx-auto px-6 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            <span className="bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 bg-clip-text text-transparent">
              Delicious Food,
            </span>
            <br />
            <span className="text-gray-800">Delivered in Minutes</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Experience the future of food delivery with our cutting-edge services designed for speed, convenience, and satisfaction.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="group bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center">
              Explore Menu
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:shadow-lg transition-all duration-300">
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-orange-500 mb-2 flex justify-center">{stat.icon}</div>
                <div className="text-3xl font-bold text-gray-800 mb-1">{stat.number}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section with Interactive Cards */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Our <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Premium</span> Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover how we're revolutionizing food delivery with innovative features and unmatched convenience.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <div
                key={idx}
                className={`group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden ${
                  activeService === idx ? 'scale-105 shadow-2xl' : ''
                }`}
                onMouseEnter={() => setActiveService(idx)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                <div className="relative">
                  <div className={`inline-flex p-4 rounded-2xl mb-6 bg-gradient-to-br ${service.color} text-white shadow-lg`}>
                    {service.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">{service.description}</p>
                  
                  <div className="space-y-3">
                    {service.features.map((feature, featureIdx) => (
                      <div key={featureIdx} className="flex items-center text-gray-700">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color} mr-3`}></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button className="mt-6 text-orange-500 font-semibold hover:text-orange-600 transition flex items-center group-hover:translate-x-2 transition-transform duration-300">
                    Learn More
                    <ChevronRight className="ml-1 w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">FoodFast</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              We're not just another food delivery service. We're your gateway to a faster, smarter dining experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="text-center group">
                <div className="bg-gradient-to-br from-orange-500 to-red-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Dining?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands who've already discovered the future of food delivery. Download now and get your first meal in minutes!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button className="bg-black text-white px-8 py-4 rounded-2xl font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center hover:scale-105">
              <span className="mr-3">📱</span>
              Download for iOS
            </button>
            <button className="bg-green-600 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-green-700 transition-all duration-300 flex items-center hover:scale-105">
              <span className="mr-3">🤖</span>
              Get on Android
            </button>
          </div>

          <p className="text-sm opacity-75">
            Free download • No subscription required • Instant setup
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}