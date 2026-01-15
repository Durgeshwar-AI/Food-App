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
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 mt-16">
        {/* Hero Section */}
        <div className="relative py-16 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>

          <div className="relative z-10 max-w-7xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-black text-white mb-3">
              Search Results
            </h1>
            <p className="text-xl text-gray-300">
              Discover the perfect dishes from our menu
            </p>
          </div>
        </div>

        {/* Results Section */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          {loading && (
            <div className="flex flex-col items-center justify-center min-h-96">
              <div className="relative w-16 h-16 mb-4">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-spin"
                  style={{
                    maskImage:
                      "radial-gradient(circle at 30% 30%, transparent 30%, black 70%)",
                  }}
                ></div>
              </div>
              <p className="text-gray-600 text-lg">Searching…</p>
            </div>
          )}
          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center">
              <p className="text-red-600 text-lg font-semibold">{error}</p>
              <p className="text-red-500 mt-2">
                Try searching for something else
              </p>
            </div>
          )}
          {!loading && !error && searchResult && searchResult.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-8">
                <h2 className="text-3xl font-black text-gray-900">
                  Found {searchResult.length} Result
                  {searchResult.length !== 1 ? "s" : ""}
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {searchResult.map((food) => (
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
            </div>
          )}
          {!loading && !error && searchResult && searchResult.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-3xl font-black text-gray-900 mb-3">
                No Results Found
              </h2>
              <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                We couldn't find any dishes matching your search. Try different
                keywords or browse our menu.
              </p>
              <a href="/menu" className="inline-block">
                <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-4 px-8 rounded-xl hover:shadow-2xl transition-all transform hover:scale-105">
                  Browse Menu
                </button>
              </a>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SearchPage;
