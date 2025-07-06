import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Menu from "../Components/Menu";
import Footer from "../Components/Footer";
import axios from "axios";

const MenuPage = () => {
  const URL = import.meta.env.VITE_API_URL;
  const [foodItems, setFoodItems] = useState<Array<String>>([]);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get(`${URL}/food/getFood`);
        console.log(response.data.data)
        setFoodItems(response.data.data); // Assuming the data is an array
      } catch (error) {
        console.error("Failed to fetch food items:", error);
        setFoodItems([]);
      }
    };

    fetchFood();
  }, [URL]);

  return (
    <>
      <Navbar />
      <div className="mt-16">
        {/* Pass the fetched data to Menu component */}
        <Menu items={foodItems} />
      </div>
      <Footer />
    </>
  );
};

export default MenuPage;
