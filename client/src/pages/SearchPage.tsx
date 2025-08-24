import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import FoodCards from "../Components/Home/FoodCards";
import axios from "axios";
import { useLocation } from "react-router-dom";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const URL = import.meta.env.VITE_API_URL as string;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q");
    if (!q) {
      setSearchResult(null);
      return;
    }
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${URL}/food/search`, {
          params: { q },
          withCredentials: true,
        });
        setSearchResult(res.data?.data || []);
      } catch (e: any) {
        setError(e?.response?.data?.message || "Failed to search");
        setSearchResult([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [location.search]);
  return (
    <>
      <Navbar />
      <div className="m-8 mt-16">
        <h1 className="text-xl md:text-4xl font-semibold mb-4 p-4">Search Results</h1>
        {loading && <p className="px-4 text-gray-500">Searching…</p>}
        {error && <p className="px-4 text-red-500">{error}</p>}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4 md:px-16">
          {searchResult && searchResult.length > 0 ? (
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
