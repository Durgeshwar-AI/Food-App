import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import ContactPage from "./pages/ContactPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OurChefs from "./Components/OurChefs";
import MouseTrail from "./Components/MouseTrail";
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

const App = () => {
  const dispatch = useAppDispatch()
  const URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
  const refreshUser = async () => {
    try {
      const res = await axios.get(`${URL}/user/refreashToken`, { withCredentials: true });
      dispatch(loginSuccess({ user: res.data.name, token: res.data.token }));
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  };
  refreshUser();
}, []);
  return (
    <>
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
      <ToastContainer/>
    </>
  );
};

export default App;
