import React, { useLayoutEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const [width, setWidth] = useState(true);
  useLayoutEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth >= 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSearch = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div
      className={`max-w-[1640px] m-auto px-4 py-2 flex items-center ${
        !width ? "justify-center" : "justify-between"
      } z-10 relative bg-transparent `}
    >
      <div className="text-4xl font-extrabold">
        <span className="text-black">F</span>
        <span className="text-orange-600">O</span>
        <span className="text-orange-600">O</span>
        <span className="text-black">D</span>
      </div>
      {width && (
        <>
          <div>
            <ul className="flex space-x-6 text-lg">
              <li className="cursor-pointer">Home</li>
              <li className="cursor-pointer">Menu</li>
              <li className="cursor-pointer">Services</li>
              <li className="cursor-pointer">Contact</li>
            </ul>
          </div>
          <div className="flex items-center space-x-4">
            <div className="search-container relative inline-block mx-1 my-0.5 h-12 w-12 align-bottom">
              <input
                id="searchright"
                type="search"
                name="q"
                placeholder="Search"
                className={`search absolute right-0 h-full z-10 bg-white outline-none border border-gray-300 rounded-full transition-all duration-300 pl-4 pr-10 ${
                  isExpanded ? "w-64" : "w-12 pl-0 opacity-0"
                }`}
                onFocus={() => setIsExpanded(true)}
                onBlur={() => setIsExpanded(false)}
              />
              <label
                htmlFor="searchright"
                className="absolute inset-0 flex items-center justify-center cursor-pointer text-xl text-gray-600 z-20"
                onClick={toggleSearch}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </label>
            </div>

            <FaShoppingCart className="text-2xl cursor-pointer" />
            <button className="rounded-full px-4 py-2 text-white bg-orange-600 cursor-pointer">
              Sign In -&gt;
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
