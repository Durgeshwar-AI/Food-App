import React from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

type Service = {
  title: string;
  icon: string;
  description: string;
};

const services: Service[] = [
  {
    title: "On-Demand Delivery",
    icon: "🚴",
    description: "Get food fast from your favorite restaurants.",
  },
  {
    title: "Pre-Order Meals",
    icon: "🕒",
    description: "Schedule your meals ahead for convenience.",
  },
  {
    title: "Group Orders",
    icon: "👨‍👩‍👧‍👦",
    description: "Perfect for sharing meals with others.",
  },
  {
    title: "Pickup Option",
    icon: "🛍️",
    description: "Pick up your food without waiting in line.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <div className="px-6 py-12 md:px-16 mt-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Delicious Food, Delivered Fast
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
            Explore our range of services tailored to satisfy your cravings
            quickly and conveniently.
          </p>
          <button className="mt-6 bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition">
            Explore Menu
          </button>
        </section>

        {/* Services Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </section>

        {/* Why Choose Us */}
        <section className="bg-gray-50 p-8 rounded-2xl text-center mb-16">
          <h2 className="text-2xl font-bold mb-6">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <p className="bg-white p-4 rounded-xl shadow-sm">
              ⚡ Fast Delivery within 30 minutes
            </p>
            <p className="bg-white p-4 rounded-xl shadow-sm">
              🏆 Top-rated local restaurants
            </p>
            <p className="bg-white p-4 rounded-xl shadow-sm">
              🛡️ Real-time order tracking
            </p>
            <p className="bg-white p-4 rounded-xl shadow-sm">
              💳 Secure payments & discounts
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Eat?</h2>
          <p className="text-gray-600 mb-6">
            Download the app and get started with your first order today!
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-black text-white px-5 py-2 rounded-lg">
              App Store
            </button>
            <button className="bg-green-500 text-white px-5 py-2 rounded-lg">
              Google Play
            </button>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
