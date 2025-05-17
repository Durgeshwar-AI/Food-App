import React from "react";

const cardData=[
    {
        img:"https://plus.unsplash.com/premium_photo-1709901922298-0a3eb89b7e79?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
        title:"Easy To Order",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, quisquam reiciendis. Facilis quia sequi corporis repellendus doloribus alias debitis, laudantium harum ratione quos! Aut reiciendis quas in fugit quasi eum."
    },
    {
        img:"https://plus.unsplash.com/premium_photo-1709901922298-0a3eb89b7e79?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
        title:"Fastest Delivery",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, quisquam reiciendis. Facilis quia sequi corporis repellendus doloribus alias debitis, laudantium harum ratione quos! Aut reiciendis quas in fugit quasi eum."
    },
    {
        img:"https://plus.unsplash.com/premium_photo-1709901922298-0a3eb89b7e79?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
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
      {cardData.map((card, index) => (
    <div
      key={index}
      className="rounded-xl bg-white w-full p-6 shadow-md hover:shadow-lg transition-shadow flex flex-col cursor-default"
    >
      <img
        src={card.img}
        alt={card.title}
        className="rounded-xl w-full h-64 object-cover mb-4"
      />
      <h2 className="text-2xl font-semibold mb-2">{card.title}</h2>
      <p className="text-gray-600 text-sm flex-grow">{card.description}</p>
    </div>
  ))}
      </div>
    </div>
  );
};

export default Cards;
