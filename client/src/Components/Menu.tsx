// src/app/MenuPage.tsx
import React from 'react';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Classic cheese and tomato pizza with fresh basil.",
    price: "$8.99",
    image: "https://source.unsplash.com/400x300/?pizza",
  },
  {
    id: 2,
    name: "Veggie Burger",
    description: "Grilled plant-based patty with lettuce, tomato & sauce.",
    price: "$7.49",
    image: "https://source.unsplash.com/400x300/?burger",
  },
  {
    id: 3,
    name: "Chicken Biryani",
    description: "Aromatic basmati rice with spiced chicken and herbs.",
    price: "$9.99",
    image: "https://source.unsplash.com/400x300/?biryani",
  },
];

const Menu: React.FC = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">Our Menu</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform hover:scale-105"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-1">{item.name}</h2>
              <p className="text-sm text-gray-600 mb-2">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">{item.price}</span>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded-md transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
