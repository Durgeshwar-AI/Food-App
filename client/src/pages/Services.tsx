import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  Star,
  Clock,
  Heart,
  Award,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";

type Specialty = {
  title: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  color: string;
};

const specialties: Specialty[] = [
  {
    title: "Wood-Fired Pizza",
    icon: <Award className="w-8 h-8" />,
    description:
      "Authentic Neapolitan-style pizzas baked in our traditional wood-fired oven.",
    features: [
      "Hand-tossed dough",
      "San Marzano tomatoes",
      "Fresh mozzarella di bufala",
    ],
    color: "from-red-400 to-orange-500",
  },
  {
    title: "Fresh Pasta Daily",
    icon: <Heart className="w-8 h-8" />,
    description:
      "House-made pasta crafted fresh every morning with traditional Italian techniques.",
    features: [
      "Made from scratch",
      "Organic semolina flour",
      "Traditional recipes",
    ],
    color: "from-yellow-400 to-amber-500",
  },
  {
    title: "Signature Risottos",
    icon: <Star className="w-8 h-8" />,
    description:
      "Creamy, perfectly cooked risottos featuring seasonal ingredients and bold flavors.",
    features: [
      "Carnaroli rice",
      "Chef's special recipes",
      "Seasonal ingredients",
    ],
    color: "from-green-400 to-emerald-500",
  },
  {
    title: "Wine Selection",
    icon: <Calendar className="w-8 h-8" />,
    description:
      "Curated collection of Italian and international wines to complement every meal.",
    features: ["200+ wine varieties", "Sommelier selected", "Perfect pairings"],
    color: "from-purple-400 to-indigo-500",
  },
];

const stats = [
  {
    number: "25+",
    label: "Years Experience",
    icon: <Award className="w-6 h-6" />,
  },
  { number: "4.9", label: "Google Rating", icon: <Star className="w-6 h-6" /> },
  {
    number: "1000+",
    label: "Happy Guests",
    icon: <Heart className="w-6 h-6" />,
  },
  {
    number: "50+",
    label: "Signature Dishes",
    icon: <Clock className="w-6 h-6" />,
  },
];

const highlights = [
  {
    icon: <Award className="w-6 h-6" />,
    title: "Award Winning",
    desc: "Michelin recommended restaurant",
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Family Recipe",
    desc: "Traditional Italian cooking",
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: "Fresh Ingredients",
    desc: "Locally sourced & organic",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Open Kitchen",
    desc: "Watch our chefs at work",
  },
];

export default function RestaurantHomepage() {
  const [activeSpecialty, setActiveSpecialty] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveSpecialty((prev) => (prev + 1) % specialties.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 mt-16">
        {/* Hero Section */}
        <section className="relative pt-24 pb-20 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          {/* Animated background */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div
              className="absolute top-40 right-10 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute bottom-20 left-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "4s" }}
            ></div>
          </div>

          <div
            className={`relative max-w-7xl mx-auto px-6 text-center transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-6xl md:text-7xl font-black mb-6">
              <span className="bg-gradient-to-r from-orange-400 via-red-500 to-orange-600 bg-clip-text text-transparent">
                🍕 Foodie
              </span>
              <br />
              <span className="text-white text-4xl md:text-5xl font-bold">
                Authentic Italian Experience
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              Experience the true taste of Italy. From wood-fired pizzas to
              handmade pasta, every dish tells a story of tradition and passion
              crafted with premium ingredients.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link to="/menu">
                <button className="group bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center cursor-pointer">
                  View Menu
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <a href="tel:+911234567890">
                <button className="text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:shadow-lg transition-all duration-300 flex items-center cursor-pointer">
                  <Phone className="mr-2 w-5 h-5" />
                  Make Reservation
                </button>
              </a>
            </div>

            {/* Restaurant Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-lg border-2 border-orange-500/20 hover:border-orange-500/60 hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className="text-orange-400 mb-2 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Specialties Section */}
        <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
                Our{" "}
                <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                  Signature
                </span>{" "}
                Specialties
              </h2>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                Discover the dishes that have made Foodie a beloved destination
                for authentic Italian cuisine for over 25 years.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {specialties.map((specialty, idx) => (
                <div
                  key={idx}
                  className={`group relative bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-200 hover:border-orange-500/50 hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden ${
                    activeSpecialty === idx
                      ? "scale-105 shadow-2xl border-orange-500"
                      : ""
                  }`}
                  onMouseEnter={() => setActiveSpecialty(idx)}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${specialty.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  ></div>

                  <div className="relative">
                    <div
                      className={`inline-flex p-4 rounded-2xl mb-6 bg-gradient-to-br ${specialty.color} text-white shadow-lg`}
                    >
                      {specialty.icon}
                    </div>

                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      {specialty.title}
                    </h3>
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                      {specialty.description}
                    </p>

                    <div className="space-y-3">
                      {specialty.features.map((feature, featureIdx) => (
                        <div
                          key={featureIdx}
                          className="flex items-center text-gray-700"
                        >
                          <div
                            className={`w-2 h-2 rounded-full bg-gradient-to-r ${specialty.color} mr-3`}
                          ></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black mb-4">
                Why{" "}
                <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                  Choose Foodie?
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                More than just a restaurant - we're a celebration of authentic
                Italian culture, tradition, and the finest ingredients.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {highlights.map((highlight, idx) => (
                <div key={idx} className="text-center group">
                  <div className="bg-gradient-to-br from-orange-500 to-red-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    {highlight.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-orange-400 transition-colors">
                    {highlight.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                    {highlight.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Location & Hours Section */}
        <section className="py-20 bg-gradient-to-r from-red-500 to-orange-500 text-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Visit Us Today
                </h2>
                <p className="text-xl mb-8 opacity-90">
                  Located in the heart of downtown, Bella Vista offers an
                  authentic Italian dining experience in a warm, welcoming
                  atmosphere perfect for any occasion.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <MapPin className="w-6 h-6 mr-4" />
                    <div>
                      <p className="font-semibold">123 Italian Street</p>
                      <p className="opacity-90">
                        Downtown District, City 12345
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-6 h-6 mr-4" />
                    <div>
                      <p className="font-semibold">Open Daily</p>
                      <p className="opacity-90">11:30 AM - 10:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-6 h-6 mr-4" />
                    <div>
                      <p className="font-semibold">(555) 123-BELLA</p>
                      <p className="opacity-90">Reservations recommended</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-white text-red-500 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center hover:scale-105">
                    <Calendar className="mr-3 w-5 h-5" />
                    Make Reservation
                  </button>
                  <button className="bg-red-700 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-red-800 transition-all duration-300 flex items-center justify-center hover:scale-105">
                    <MapPin className="mr-3 w-5 h-5" />
                    Get Directions
                  </button>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
                <h3 className="text-2xl font-bold mb-6">Hours of Operation</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-white/20">
                    <span>Monday - Thursday</span>
                    <span>11:30 AM - 9:30 PM</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/20">
                    <span>Friday - Saturday</span>
                    <span>11:30 AM - 10:30 PM</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/20">
                    <span>Sunday</span>
                    <span>12:00 PM - 9:00 PM</span>
                  </div>
                </div>
                <p className="text-sm opacity-75 mt-4">
                  Kitchen closes 30 minutes before closing time
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
