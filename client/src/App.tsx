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

const App = () => {
  return (
    <>
      <MouseTrail />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chefs" element={<OurChefs />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/service" element={<ServicesPage />} />
      </Routes>
    </>
  );
};

export default App;
