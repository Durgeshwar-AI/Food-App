import React, { useLayoutEffect, useState } from "react";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [desktop, setDesktop] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMobNav, setShowMobNav] = useState(false);
  useLayoutEffect(() => {
    if(window.innerWidth<750){
      setDesktop(false)
      setShowMobNav(false)
    }
    const handleResize = () => {
      setDesktop(window.innerWidth >= 750);
      setShowMobNav(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSearch = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleNav = () => {
    setShowMobNav(!showMobNav);
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50 h-16">
      <div className="max-w-[1640px] m-auto px-16 py-2 flex items-center justify-between">
        {desktop ? (
          <>
            <Link to="/" className="cursor-pointer">
              <div className="text-4xl font-extrabold">
                <span className="text-black">F</span>
                <span className="text-orange-600">O</span>
                <span className="text-orange-600">O</span>
                <span className="text-black">D</span>
              </div>
            </Link>
            <div>
              <ul className="flex space-x-6 text-lg">
                <li className="cursor-pointer">Home</li>
                <li className="cursor-pointer">Menu</li>
                <li className="cursor-pointer">Services</li>
                <li className="cursor-pointer"><Link to="/contact">Contact</Link></li>
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
              <button className="text-orange-600 bg-white font-semibold text-base border border-gray-300 outline-none cursor-pointer px-5 py-2 rounded-md shadow-sm hover:bg-gray-100 transition duration-300">
                <Link to="/register">Register</Link>
              </button>
            </div>
          </>
        ) : (
          <>
            <FaBars className="h-full" onClick={toggleNav} />
            <Link to="/" className="cursor-pointer">
              <div className="text-4xl font-extrabold">
                <span className="text-black">F</span>
                <span className="text-orange-600">O</span>
                <span className="text-orange-600">O</span>
                <span className="text-black">D</span>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <FaShoppingCart className="text-2xl cursor-pointer" />
            </div>
          </>
        )}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md transform transition-transform z-50 ${
            showMobNav ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div
            className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md transform transition-transform z-50 flex flex-col justify-between`}
          >
            {/* Top Section: Logo and Menu */}
            <div>
              <div className="p-4 flex justify-between items-center border-b">
                <Link to="/" className="cursor-pointer">
                  <div className="text-3xl font-bold">
                    <span className="text-black">F</span>
                    <span className="text-orange-600">O</span>
                    <span className="text-orange-600">O</span>
                    <span className="text-black">D</span>
                  </div>
                </Link>
                <FaTimes
                  className="text-2xl cursor-pointer"
                  onClick={toggleNav}
                />
              </div>

              <ul className="flex flex-col p-6 text-lg space-y-6 font-medium">
                <li className="cursor-pointer hover:text-orange-600 transition">
                  Home
                </li>
                <li className="cursor-pointer hover:text-orange-600 transition">
                  Menu
                </li>
                <li className="cursor-pointer hover:text-orange-600 transition">
                  Services
                </li>
                <li className="cursor-pointer hover:text-orange-600 transition">
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>

            {/* Bottom Section: Register Button */}
            <div className="p-6">
              <button className="w-full text-orange-600 bg-white font-semibold text-base border border-gray-300 outline-none cursor-pointer px-5 py-2 rounded-md shadow-sm hover:bg-gray-100 transition duration-300">
                <Link to="/register">Register</Link>
              </button>
            </div>
          </div>
        </div>

        {/* Background overlay when sidebar is open */}
        {showMobNav && (
          <div
            className="fixed inset-0 bg-black opacity-30 z-40"
            onClick={toggleNav}
          ></div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
