import React from "react";
import { ChefHat, Award, Clock, Star } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const chefs = [
  {
    id: 1,
    name: "Chef Mario Rossi",
    title: "Executive Chef",
    image:
      "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1954&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bio: "Mario brings over 20 years of culinary experience from Italy. Known for his classic pasta and passion for perfection.",
  },
  {
    id: 2,
    name: "Chef Aiko Tanaka",
    title: "Pastry Chef",
    image:
      "https://plus.unsplash.com/premium_photo-1661778091956-15dbe6e47442?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bio: "Aiko specializes in delicate pastries and desserts. Her creations blend Japanese precision with French elegance.",
  },
  {
    id: 3,
    name: "Chef Liam O'Connor",
    title: "Sous Chef",
    image:
      "https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bio: "Liam adds a modern twist to traditional Irish cuisine. A master of farm-to-table cooking.",
  },
  {
    id: 4,
    name: "Chef Isabella Martinez",
    title: "Head of Latin Cuisine",
    image:
      "https://plus.unsplash.com/premium_photo-1661778040799-8a97d72a881d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjV8fGNoZWZ8ZW58MHx8MHx8fDA%3D",
    bio: "Isabella brings vibrant Latin flavors to life. Her expertise in Mexican and South American cuisine creates unforgettable experiences.",
  },
  {
    id: 5,
    name: "Chef Rajesh Patel",
    title: "Spice Master",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bio: "Rajesh is our master of Indian and Asian spices. His aromatic curries and tandoor specialties are legendary among our guests.",
  },
  {
    id: 6,
    name: "Chef Sophie Dubois",
    title: "French Cuisine Specialist",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bio: "Sophie trained in Lyon and brings authentic French techniques. Her coq au vin and bouillabaisse are works of art.",
  },
  {
    id: 7,
    name: "Chef Marcus Thompson",
    title: "Grill Master",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bio: "Marcus specializes in BBQ and grilled perfection. His dry rubs and smoking techniques create incredible depth of flavor.",
  },
  {
    id: 8,
    name: "Chef Yuki Nakamura",
    title: "Sushi Chef",
    image:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=1978&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bio: "Yuki trained in Tokyo and brings authentic Japanese techniques. His omakase experiences are truly exceptional.",
  },
  {
    id: 9,
    name: "Chef Elena Volkov",
    title: "Seafood Specialist",
    image:
      "https://images.unsplash.com/photo-1731576089270-9e806089a40f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fGNoZWZ8ZW58MHx8MHx8fDA%3D",
    bio: "Elena's expertise with fresh seafood is unmatched. Her Mediterranean-inspired dishes celebrate the ocean's bounty.",
  },
  {
    id: 10,
    name: "Chef Oliver Hartwell",
    title: "Plant-Based Chef",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bio: "Oliver revolutionizes plant-based cuisine with innovative techniques. His vegan creations surprise and delight even the most dedicated carnivores.",
  },
];

// Main OurChefs Component
export default function OurChefs() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8 mt-16">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
            <ChefHat className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Meet Our Chefs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our talented culinary team brings passion, expertise, and creativity
            to every dish. Get to know the masters behind your favorite flavors.
          </p>
        </div>

        {/* Chefs Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-stretch">
            {chefs.map((chef, index) => (
              <div
                key={chef.id}
                className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl hover:scale-105 flex flex-col h-full"
              >
                <div className="relative mb-6">
                  <img
                    src={chef.image}
                    alt={`${chef.name} portrait`}
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-red-100 shadow-md"
                  />
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <div className="bg-red-500 rounded-full p-2">
                      <Award className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>

                <div className="text-center flex-grow flex flex-col">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-1">
                    {chef.name}
                  </h3>
                  <p className="text-red-500 font-medium text-lg mb-4">
                    {chef.title}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                    {chef.bio}
                  </p>

                  {/* Stats or additional info */}
                  <div className="flex justify-center items-center space-x-4 text-sm text-gray-500 mt-auto">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>20+ years</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>5.0 rating</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        {/* <div className="max-w-4xl mx-auto text-center mt-20">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-3xl p-12 border border-red-100">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Want to Learn from the Best?
            </h3>
            <p className="text-xl text-gray-600 mb-8">
              Join our cooking classes and masterchefs workshops to learn
              directly from our expert chefs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-red-500 text-white px-8 py-4 rounded-full font-bold hover:bg-red-600 transition-colors">
                Book a Class
              </button>
              <button className="border-2 border-red-500 text-red-500 px-8 py-4 rounded-full font-bold hover:bg-red-500 hover:text-white transition-colors">
                View Schedules
              </button>
            </div>
          </div>
        </div> */}
      </div>
      <Footer />
    </>
  );
}
