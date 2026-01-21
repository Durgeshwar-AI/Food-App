import React, { useLayoutEffect, useState } from "react";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxhooks";
import { logout } from "../reducers/authReducer";
import axios from "axios";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const [desktop, setDesktop] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMobNav, setShowMobNav] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileSearchExpanded, setMobileSearchExpanded] = useState(false);
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

  const handleLogout = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL;
      await axios.post(`${URL}/user/logout`, {}, { withCredentials: true });
    } catch (err) {
      // Ignore errors; still clear client state
    } finally {
      dispatch(logout());
      localStorage.clear();
      setShowMobNav(false);
      navigate("/");
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-full bg-gradient-to-r from-gray-900 via-gray-800 to-black border-b-2 border-orange-500/30 shadow-2xl z-50 h-16 cursor-default"
      id="navbar"
    >
      <div className="max-w-[1640px] m-auto px-4 md:px-16 py-2 flex items-center justify-between">
        {desktop ? (
          <>
            <Link to="/" className="cursor-pointer">
              <div className="text-4xl font-black bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                🍕 Foodie
              </div>
            </Link>
            <div>
              <ul className="flex space-x-8 text-lg">
                <li
                  className={`cursor-pointer group ${
                    location.pathname == "/"
                      ? "text-orange-400 font-bold"
                      : "text-gray-300 hover:text-orange-400"
                  } transition-colors`}
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
                      : "text-gray-300 hover:text-orange-400"
                  } transition-colors`}
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
                      : "text-gray-300 hover:text-orange-400"
                  } transition-colors`}
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
                      : "text-gray-300 hover:text-orange-400"
                  } transition-colors`}
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
                  className={`search absolute right-0 h-full z-10 bg-gray-700 outline-none border-2 border-orange-500/30 rounded-full transition-all duration-300 pl-4 pr-10 text-white placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 ${
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
                  className="absolute inset-0 flex items-center justify-center cursor-pointer text-xl text-orange-400 hover:text-orange-300 z-20 transition-colors"
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
                  <FaShoppingCart className="text-2xl cursor-pointer text-orange-400 hover:text-orange-300 transition-colors" />
                </Link>
              )}
              {isAuthenticated ? (
                <button
                  className="bg-red-600 text-white font-bold text-base border-0 outline-none cursor-pointer px-6 py-2 rounded-lg shadow-lg hover:bg-red-700 transition duration-300 transform hover:scale-105"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-base border-0 outline-none cursor-pointer px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
                  <Link to="/register">Register</Link>
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            <FaBars
              className="h-full text-orange-400 hover:text-orange-300 cursor-pointer text-2xl transition-colors"
              onClick={toggleNav}
            />
            <Link to="/" className="cursor-pointer">
              <div className="text-3xl font-black bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                🍕 Foodie
              </div>
            </Link>
            {isAuthenticated && (
              <div className="flex items-center space-x-4">
                <div className="search-container relative inline-block h-10 w-10 align-bottom">
                  <input
                    type="search"
                    placeholder="Search"
                    className={`search absolute right-0 h-full z-10 bg-gray-700 outline-none border-2 border-orange-500/30 rounded-full transition-all duration-300 pl-4 pr-10 text-white placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 ${
                      mobileSearchExpanded ? "w-48" : "w-10 pl-0 opacity-0"
                    }`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setMobileSearchExpanded(true)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        submitSearch();
                        setMobileSearchExpanded(false);
                      }
                    }}
                  />
                  <label
                    htmlFor="searchmobile"
                    className="absolute inset-0 flex items-center justify-center cursor-pointer text-lg text-orange-400 hover:text-orange-300 z-20 transition-colors"
                    onClick={() => {
                      if (!mobileSearchExpanded) {
                        setMobileSearchExpanded(true);
                      } else {
                        submitSearch();
                        setMobileSearchExpanded(false);
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
                <Link to="/cart">
                  <FaShoppingCart className="text-2xl cursor-pointer text-orange-400 hover:text-orange-300 transition-colors" />
                </Link>
              </div>
            )}
          </>
        )}
        <div
          className={`fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-gray-800 to-gray-900 shadow-2xl border-r-2 border-orange-500/30 transform transition-transform z-50 ${
            showMobNav ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div
            className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-gray-800 to-gray-900 shadow-2xl border-r-2 border-orange-500/30 transform transition-transform z-50 flex flex-col justify-between`}
          >
            {/* Top Section: Logo and Menu */}
            <div>
              <div className="p-4 flex justify-between items-center border-b-2 border-orange-500/20">
                <Link to="/" className="cursor-pointer">
                  <div className="text-2xl font-black bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                    🍕 Foodie
                  </div>
                </Link>
                <FaTimes
                  className="text-2xl cursor-pointer text-orange-400 hover:text-orange-300 transition-colors"
                  onClick={toggleNav}
                />
              </div>

              <ul className="flex flex-col p-6 text-lg space-y-6 font-medium">
                <li
                  className={`cursor-pointer group ${
                    location.pathname == "/"
                      ? "font-bold text-orange-400"
                      : "text-gray-700 hover:text-orange-500"
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
                      : "text-gray-700 hover:text-orange-500"
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
                      : "text-gray-700 hover:text-orange-500"
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
                      : "text-gray-700 hover:text-orange-500"
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
            <div className="p-6 border-t-2 border-orange-500/20">
              {isAuthenticated ? (
                <button
                  className="w-full bg-red-600 text-white font-bold text-base border-0 outline-none cursor-pointer px-5 py-3 rounded-lg shadow-lg hover:bg-red-700 transition duration-300"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-base border-0 outline-none cursor-pointer px-5 py-3 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
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
