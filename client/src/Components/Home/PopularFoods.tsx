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
    <div className="w-full bg-[#FBF2F2] flex flex-col gap-4 justify-center items-center p-[10vw]">
      <div className="text-center mb-8">
        <h4 className="text-[#F08279] text-md font-semibold">
          Crispy, Every Bite Tastes
        </h4>
        <h1 className="text-4xl font-bold">Popular Fast Foods</h1>
      </div>
      <div className=" w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        {popularFoods.map((food) => (
          <FoodCards
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
      <button className="text-white bg-red-500 hover:bg-red-800 cursor-pointer h-10 font-semibold my-5">
        <Link to="/menu">View More</Link>
      </button>
    </div>
  );
};

export default PopularFoods;
