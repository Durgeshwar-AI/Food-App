import React from "react";
import Contact from "../Components/Contact";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const ContactPage = () => {
  return (
    <>
      <Navbar />
      <div className="mt-16">
        <Contact />
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
