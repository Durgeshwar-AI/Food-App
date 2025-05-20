import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const chefs = [
  {
    id: 1,
    name: "Chef Mario Rossi",
    title: "Executive Chef",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1954&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bio: "Mario brings over 20 years of culinary experience from Italy. Known for his classic pasta and passion for perfection.",
  },
  {
    id: 2,
    name: "Chef Aiko Tanaka",
    title: "Pastry Chef",
    image: "https://plus.unsplash.com/premium_photo-1661778091956-15dbe6e47442?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bio: "Aiko specializes in delicate pastries and desserts. Her creations blend Japanese precision with French elegance.",
  },
  {
    id: 3,
    name: "Chef Liam O'Connor",
    title: "Sous Chef",
    image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bio: "Liam adds a modern twist to traditional Irish cuisine. A master of farm-to-table cooking.",
  },
];

export default function OurChefs() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-10">Meet Our Chefs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {chefs.map((chef) => (
              <div
                key={chef.id}
                className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl hover:scale-105"
              >
                <img
                  src={chef.image}
                  alt={`${chef.name} portrait`}
                  className="w-32 h-32 rounded-full mx-auto object-cover mb-5 border-4 border-red-100"
                />
                <h3 className="text-2xl font-semibold text-gray-800">{chef.name}</h3>
                <p className="text-red-500 font-medium">{chef.title}</p>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">{chef.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
