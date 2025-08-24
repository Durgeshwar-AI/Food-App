import React, { useLayoutEffect, useState } from "react";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxhooks";
import { logout } from "../reducers/authReducer";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const [desktop, setDesktop] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMobNav, setShowMobNav] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  useLayoutEffect(() => {
    if (window.innerWidth < 750) {
      setDesktop(false);
      setShowMobNav(false);
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

  const submitSearch = () => {
    const q = searchTerm.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
    setIsExpanded(false);
  };

  const toggleNav = () => {
    setShowMobNav(!showMobNav);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
  };

  return (
    <div
      className="fixed top-0 left-0 w-full bg-white/10 backdrop-blur-md border border-white/20 shadow-md z-50 h-16 cursor-default"
      id="navbar"
    >
      <div className="max-w-[1640px] m-auto px-4 md:px-16 py-2 flex items-center justify-between">
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
                <li
                  className={`cursor-pointer group ${
                    location.pathname == "/" ? "font-bold text-orange-400" : ""
                  }`}
                >
                  <Link to="/">
                    <span className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-orange-400 after:transition-all after:duration-300 group-hover:after:w-full">
                      Home
                    </span>
                  </Link>
                </li>
                <li
                  className={`cursor-pointer group ${
                    location.pathname == "/menu"
                      ? "font-bold text-orange-400"
                      : ""
                  }`}
                >
                  <Link to="/menu">
                    <span className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-orange-400 after:transition-all after:duration-300 group-hover:after:w-full">
                      Menu
                    </span>
                  </Link>
                </li>
                <li
                  className={`cursor-pointer group ${
                    location.pathname == "/service"
                      ? "font-bold text-orange-400"
                      : ""
                  }`}
                >
                  <Link to="/service">
                    <span className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-orange-400 after:transition-all after:duration-300 group-hover:after:w-full">
                      Services
                    </span>
                  </Link>
                </li>
                <li
                  className={`cursor-pointer group ${
                    location.pathname == "/contact"
                      ? "font-bold text-orange-400"
                      : ""
                  }`}
                >
                  <Link to="/contact">
                    <span className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-orange-400 after:transition-all after:duration-300 group-hover:after:w-full">
                      Contact
                    </span>
                  </Link>
                </li>
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsExpanded(true)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      submitSearch();
                    }
                  }}
                />
                <label
                  htmlFor="searchright"
                  className="absolute inset-0 flex items-center justify-center cursor-pointer text-xl text-gray-600 z-20"
                  onClick={() => {
                    if (!isExpanded) {
                      toggleSearch();
                    } else {
                      submitSearch();
                    }
                  }}
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

              {isAuthenticated && (
                <Link to="/cart">
                  <FaShoppingCart className="text-2xl cursor-pointer" />
                </Link>
              )}
              {isAuthenticated ? (
                <button
                  className="text-red-600 bg-white font-semibold text-base border border-gray-300 outline-none cursor-pointer px-5 py-2 rounded-md shadow-sm hover:bg-gray-100 transition duration-300"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <button className="text-orange-600 bg-white font-semibold text-base border border-gray-300 outline-none cursor-pointer px-5 py-2 rounded-md shadow-sm hover:bg-gray-100 transition duration-300">
                  <Link to="/register">Register</Link>
                </button>
              )}
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
            {isAuthenticated && (
              <div className="flex items-center space-x-4">
                <Link to="/cart">
                  <FaShoppingCart className="text-2xl cursor-pointer" />
                </Link>
              </div>
            )}
          </>
        )}
        <div
          className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-md transform transition-transform z-50 ${
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
                <li
                  className={`cursor-pointer group ${
                    location.pathname == "/" ? "font-bold text-orange-400" : ""
                  }`}
                >
                  <Link to="/">
                    <span className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-orange-400 after:transition-all after:duration-300 group-hover:after:w-full">
                      Home
                    </span>
                  </Link>
                </li>
                <li
                  className={`cursor-pointer group ${
                    location.pathname == "/menu"
                      ? "font-bold text-orange-400"
                      : ""
                  }`}
                >
                  <Link to="/menu">
                    <span className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-orange-400 after:transition-all after:duration-300 group-hover:after:w-full">
                      Menu
                    </span>
                  </Link>
                </li>
                <li
                  className={`cursor-pointer group ${
                    location.pathname == "/service"
                      ? "font-bold text-orange-400"
                      : ""
                  }`}
                >
                  <Link to="/service">
                    <span className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-orange-400 after:transition-all after:duration-300 group-hover:after:w-full">
                      Services
                    </span>
                  </Link>
                </li>
                <li
                  className={`cursor-pointer group ${
                    location.pathname == "/contact"
                      ? "font-bold text-orange-400"
                      : ""
                  }`}
                >
                  <Link to="/contact">
                    <span className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-orange-400 after:transition-all after:duration-300 group-hover:after:w-full">
                      Contact
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Bottom Section: Register Button */}
            <div className="p-6">
              {isAuthenticated ? (
                <button
                  className="text-red-600 bg-white font-semibold text-base border border-gray-300 outline-none cursor-pointer px-5 py-2 rounded-md shadow-sm hover:bg-gray-100 transition duration-300"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <button className="text-orange-600 bg-white font-semibold text-base border border-gray-300 outline-none cursor-pointer px-5 py-2 rounded-md shadow-sm hover:bg-gray-100 transition duration-300">
                  <Link to="/register">Register</Link>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Background overlay when sidebar is open */}
        {showMobNav && (
          <div
            className="fixed inset-0 bg-black opacity-40 z-40"
            onClick={toggleNav}
          ></div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
