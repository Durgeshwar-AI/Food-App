import React from "react";

const Offers = () => {
  const offers = [
    "https://cdn.grabon.in/gograbon/images/web-images/uploads/1618575517942/food-coupons.jpg",
    "https://cdn.grabon.in/gograbon/images/web-images/uploads/1618575517942/food-coupons.jpg",
    "https://cdn.grabon.in/gograbon/images/web-images/uploads/1618575517942/food-coupons.jpg",
  ];

  return (
    <div className="w-full bg-[#FBF2F2] flex flex-col justify-center items-center px-[5vw] py-10">
      <h1 className="font-bold text-4xl text-center mb-6">
        Today&apos;s Offers
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {offers.map((src, index) => (
          <a key={index} href="#">
            <img
              src={src}
              alt={`Offer ${index + 1}`}
              className="rounded-xl hover:scale-105 transition-transform duration-200 ease-in-out w-full object-cover"
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Offers;
