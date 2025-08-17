import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import ContactPage from "./pages/ContactPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OurChefs from "./Components/OurChefs";
import CartPage from "./pages/CartPage";
import ServicesPage from "./pages/Services";
import MenuPage from "./pages/MenuPage";
import PrivacyPolicy from "./Components/Privacy";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/Dashboard";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks/reduxhooks";
import { loginSuccess } from "./reducers/authReducer";
import axios from "axios";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  console.log(pathname, hash)
  useEffect(() => {
    if (hash) {
      // Wait for DOM to update, then scroll to the element
      const el = document.getElementById(hash.replace("#", ""));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

const App = () => {
  const dispatch = useAppDispatch();
  const URL = import.meta.env.VITE_API_URL;

  function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  }

  useEffect(() => {
    // 1️⃣ Check if token exists in localStorage
    const localToken = localStorage.getItem("token");
    const localUser = localStorage.getItem("user");

    if (localToken && localUser) {
      dispatch(loginSuccess({ user: localUser, token: localToken }));
    }
    const refreshUser = async () => {
      try {
        const res = await axios.get(`${URL}/user/refreshToken`, {
          withCredentials: true,
        });
        // Save to redux
        dispatch(loginSuccess({ user: res.data.name, token: res.data.token }));

        // Also save to localStorage for future
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", res.data.name);
      } catch (error) {
        console.error("Error refreshing token:", error);
      }
    };

    refreshUser();
  }, []);

  useEffect(() => {
    const refreshToken = getCookie("refreshToken");
    if (!refreshToken) return;
    const refreshUser = async () => {
      try {
        const res = await axios.get(`${URL}/user/refreshToken`, {
          withCredentials: true,
        });
        dispatch(loginSuccess({ user: res.data.name, token: res.data.token }));
      } catch (error) {
        console.error("Error refreshing token:", error);
      }
    };
    refreshUser();
  }, []);
  return (
    <>
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chefs" element={<OurChefs />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/service" element={<ServicesPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/admin" element={<Dashboard />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
