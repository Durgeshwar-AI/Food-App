import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

const Navbar = () => {
  return (
    <div className="max-w-[1640px] m-auto px-4 py-2 flex items-center justify-between z-10 relative ">
      <div className="text-4xl font-extrabold">
        <span className="text-black">F</span>
        <span className="text-orange-600">O</span>
        <span className="text-orange-600">O</span>
        <span className="text-black">D</span>
      </div>
      <div>
        <ul className="flex space-x-6 text-lg">
          <li className="cursor-pointer">Home</li>
          <li className="cursor-pointer">Menu</li>
          <li className="cursor-pointer">Services</li>
          <li className="cursor-pointer">Contact</li>
        </ul>
      </div>
      <div className="flex items-center space-x-4">
        <CiSearch className="text-2xl cursor-pointer" />
        <FaShoppingCart className="text-2xl cursor-pointer" />
        <button className="rounded-full px-4 py-2 text-white bg-orange-600 cursor-pointer">
          Sign In -&gt;
        </button>
      </div>
    </div>
  );
};

export default Navbar;
