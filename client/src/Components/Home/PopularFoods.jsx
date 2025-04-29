import React from "react";
import { foods } from "../../data/foods";
import FoodCards from "./FoodCards";

const PopularFoods = () => {
  return (
    <div className="w-full bg-[#FBF2F2] flex flex-col gap-4 justify-center items-center p-[10vw]">
      <div className="text-center mb-8">
        <h4 className="text-[#F08279] text-md font-semibold">Crispy, Every Bite Tastes</h4>
        <h1 className="text-4xl font-bold">Popular Fast Foods</h1>
      </div>
      <div className=" w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        {foods.map((food)=>(
            <FoodCards key={food.id} name={food.name} offer={food.offer} img={food.img} discounted={food.discounted} original={food.original} />
        ))}
      </div>
      <button className="text-white bg-red-500 hover:bg-red-800 cursor-pointer h-10 font-semibold my-5">
        View More
      </button>
    </div>
  );
};

export default PopularFoods;
