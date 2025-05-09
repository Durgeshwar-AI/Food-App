import React from "react";

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
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-8">Meet Our Chefs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {chefs.map((chef) => (
            <div
              key={chef.id}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300"
            >
              <img
                src={chef.image}
                alt={chef.name}
                className="w-32 h-32 rounded-full mx-auto object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">{chef.name}</h3>
              <p className="text-sm text-red-500">{chef.title}</p>
              <p className="mt-2 text-gray-600 text-sm">{chef.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
