import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import FoodCards from "../Components/Home/FoodCards";

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

const SearchPage = () => {
  const [searchResult, setSearchResult] = useState<Food[] | null>(null);
  return (
    <>
      <Navbar />
      <div className="mt-16">
        <h1>Search Results</h1>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          {searchResult ? (
            searchResult.map((food) => (
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
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No results found
            </p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SearchPage;
