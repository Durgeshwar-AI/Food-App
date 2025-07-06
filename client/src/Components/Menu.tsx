import React from 'react';

interface MenuItem {
  _id: number;
  name: string;
  description: string;
  price: string;
  img: string;
}

interface MenuProps {
  items: MenuItem[];
}

const Menu: React.FC<MenuProps> = ({ items }) => {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">Our Menu</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform hover:scale-105"
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-1">{item.name}</h2>
              <p className="text-sm text-gray-600 mb-2 truncate">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">${item.price}</span>
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
