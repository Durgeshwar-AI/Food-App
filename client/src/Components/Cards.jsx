import React from "react";

const cardData=[
    {
        img:{},
        title:"Easy To Order",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, quisquam reiciendis. Facilis quia sequi corporis repellendus doloribus alias debitis, laudantium harum ratione quos! Aut reiciendis quas in fugit quasi eum."
    },
    {
        img:{},
        title:"Fastest Delivery",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, quisquam reiciendis. Facilis quia sequi corporis repellendus doloribus alias debitis, laudantium harum ratione quos! Aut reiciendis quas in fugit quasi eum."
    },
    {
        img:{},
        title:"Best Quality",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, quisquam reiciendis. Facilis quia sequi corporis repellendus doloribus alias debitis, laudantium harum ratione quos! Aut reiciendis quas in fugit quasi eum."
    },
]

const Cards = () => {
  return (
    <div className="w-full bg-[#FBF2F2] flex flex-col justify-center items-center p-[10vw]">
      <div className="text-center mb-8">
        <h4 className="text-[#F08279] text-lg font-semibold">What we serve</h4>
        <h1 className="text-4xl font-bold">Your Favorite Food</h1>
        <h1 className="text-4xl font-bold ">Delivery Partner</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cardData.map((card,index)=>(
            <div key={index} className="rounded-xl min-h-[300px] bg-white w-full p-8">
            <img src={card.img} alt="" className="rounded-xl w-[90%] h-[30%] max-h-[100px]"/>
            <h2 className="text-2xl font-semibold">{card.title}</h2>
            <h3 className="text-gray-600">{card.description}</h3>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
