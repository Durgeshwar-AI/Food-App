import React from "react";
import Navbar from "../Components/Navbar";
import Menu from "../Components/Menu";
import Footer from "../Components/Footer";

const MenuPage = () => {
  return (
    <>
      <Navbar />
      <div className="mt-16">
        <Menu />
      </div>
      <Footer />
    </>
  );
};

export default MenuPage;
