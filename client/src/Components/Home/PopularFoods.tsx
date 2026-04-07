import React, { useEffect, useState } from "react";
import FoodCards from "./FoodCards";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

type Food = {
  _id: string;
  img: string;
  name: string;
  description: string;
  price: number;
  category: string;
  offer: number;
  timesOrdered: number;
};

const PopularFoods = () => {
  const URL = import.meta.env.VITE_API_URL;
  const [popularFoods, setPopularFoods] = useState<Food[]>([]);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const res = await axios.get(`${URL}/food/popular`);
        console.log(res.data)
        setPopularFoods(res.data.data);
      } catch (err) {
        console.error("Failed to fetch popular foods:", err);
        toast.error("Something went wrong while fetching popular foods.");
      }
    };
    fetchFood();
  }, [URL]);

  return (
    <div className="w-full bg-[#fafafa] flex flex-col gap-6 justify-center items-center py-24 px-[5vw] relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-orange-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="text-center mb-12 relative z-10">
        <h4 className="text-orange-500 text-sm font-semibold tracking-[0.2em] uppercase mb-4 inline-block py-1 px-3 rounded-full bg-orange-500/10 border border-orange-500/20">
          Crispy, Every Bite Tastes
        </h4>
        <h1 className="text-5xl md:text-6xl font-black text-gray-900">Popular Fast Foods</h1>
      </div>
      <div className=" w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        {popularFoods.map((food) => (
          <FoodCards
            id={food._id}
            key={food._id}
            name={food.name}
            category={food.category}
            description={food.description}
            offer={food.offer}
            img={food.img}
            original={food.price}
          />
        ))}
      </div>
      <button className="group mt-8 relative px-10 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-full overflow-hidden shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer z-10">
        <Link to="/menu" className="relative z-10 flex items-center gap-2">
          <span>View Full Menu</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
      </button>
    </div>
  );
};

export default PopularFoods;
