import React, { useEffect, useState, useMemo, useCallback } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";
import FoodCards from "../Components/Home/FoodCards";
import { Listbox } from "@headlessui/react";

interface FoodProps {
  _id: string;
  img: string;
  name: string;
  description: string;
  price: number;
  category: string;
  offer: number; // percentage discount
  timesOrdered: number;
}

const sortOptions = [
  { value: "default", label: "Default Order" },
  { value: "lowToHigh", label: "Price: Low to High" },
  { value: "highToLow", label: "Price: High to Low" },
];

const MenuPage: React.FC = () => {
  const URL = import.meta.env.VITE_API_URL;
  const [allFood, setAllFood] = useState<FoodProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [category, setCategory] = useState<string>("All");
  const [sort, setSort] = useState<string>("default");

  // Fetch food items
  const fetchFood = useCallback(async () => {
    if (!URL) {
      setError("API URL not configured.");
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(`${URL}/food/getFood`);
      if (response.data?.data && Array.isArray(response.data.data)) {
        setAllFood(response.data.data);
      } else {
        throw new Error("Invalid data format received");
      }
    } catch (err) {
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message || "Failed to load menu."
        : "An unexpected error occurred.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [URL]);

  useEffect(() => {
    fetchFood();
  }, [fetchFood]);

  // Extract unique categories
  const categories = useMemo(() => {
    if (allFood.length === 0) return ["All"];
    const uniqueCategories = new Set(
      allFood.map((item) => item.category).filter((cat) => cat && cat.trim())
    );
    return ["All", ...Array.from(uniqueCategories).sort()];
  }, [allFood]);

  // Compute price after offer
  const getFinalPrice = (item: FoodProps) =>
    item.price * (1 - item.offer / 100);

  // Filter and sort foods
  const filteredFoods = useMemo(() => {
    let result = [...allFood];

    // Category filter
    if (category !== "All") {
      result = result.filter((item) => item.category === category);
    }

    // Sort by final price after offer
    switch (sort) {
      case "lowToHigh":
        result.sort((a, b) => getFinalPrice(a) - getFinalPrice(b));
        break;
      case "highToLow":
        result.sort((a, b) => getFinalPrice(b) - getFinalPrice(a));
        break;
      default:
        break; // keep original order
    }

    return result;
  }, [allFood, category, sort]);

  const handleCategoryChange = useCallback((newCategory: string) => {
    setCategory(newCategory);
  }, []);

  const handleSortChange = useCallback((value: string) => {
    setSort(value);
  }, []);

  // Render main content
  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
            <p className="text-lg text-gray-500">Loading delicious menu...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-20">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchFood}
            className="px-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      );
    }

    if (filteredFoods.length === 0) {
      return (
        <div className="text-center py-20">
          <p className="text-gray-600 text-lg">
            {category === "All"
              ? "No food items available."
              : `No items found in "${category}" category.`}
          </p>
          {category !== "All" && (
            <button
              onClick={() => handleCategoryChange("All")}
              className="mt-4 px-4 py-2 text-yellow-600 hover:text-yellow-800 underline"
            >
              View all items
            </button>
          )}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredFoods.map((food) => (
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
    );
  };

  return (
    <>
      <Navbar />

      <main className="mt-16 min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-orange-600 via-red-500 to-orange-600 py-16 px-4">
          <div className="max-w-[1640px] mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4">
              Explore Our Menu
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              Discover delicious dishes from our best restaurants. Fresh, fast,
              and always satisfying.
            </p>
            {!loading && !error && (
              <div className="mt-6 flex gap-4 flex-wrap">
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-white font-semibold border border-white/30">
                  📊 {allFood.length} Dishes Available
                </div>
                {category !== "All" && (
                  <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-white font-semibold border border-white/30">
                    🏷️ {category} ({filteredFoods.length} items)
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-[1640px] mx-auto px-4 sm:px-8 md:px-16 lg:px-24 py-12">
          {/* Filters and Sorting */}
          {!loading && !error && allFood.length > 0 && (
            <div className="mb-12">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Category Filter */}
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-bold text-gray-900 mb-4 uppercase tracking-widest">
                      🍽️ Filter by Category
                    </label>
                    {categories.length <= 8 ? (
                      <div className="flex flex-wrap gap-3">
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => handleCategoryChange(cat)}
                            className={`px-6 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 text-sm cursor-pointer ${
                              category === cat
                                ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/50"
                                : "bg-gray-100 text-gray-700 border-2 border-gray-200 hover:border-orange-400 hover:bg-orange-50"
                            }`}
                            aria-pressed={category === cat}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <select
                        value={category}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        className="border-2 border-gray-200 px-6 py-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white font-semibold"
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}{" "}
                            {cat !== "All" &&
                              `(${
                                allFood.filter((item) => item.category === cat)
                                  .length
                              })`}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  {/* Sort Select */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-4 uppercase tracking-widest">
                      ⭐ Sort by
                    </label>
                    <Listbox value={sort} onChange={handleSortChange}>
                      <div className="relative w-full">
                        <Listbox.Button className="w-full rounded-xl border-2 border-gray-200 bg-white px-6 py-3 text-left font-semibold text-gray-900 shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 hover:border-orange-400 transition-all">
                          {sortOptions.find((o) => o.value === sort)?.label}
                        </Listbox.Button>
                        <Listbox.Options className="absolute mt-3 w-full rounded-xl bg-white shadow-xl border-2 border-gray-200 focus:outline-none z-50">
                          {sortOptions.map((option) => (
                            <Listbox.Option
                              key={option.value}
                              value={option.value}
                              className="cursor-pointer px-6 py-3 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 font-semibold text-gray-900 border-b border-gray-100 last:border-b-0 transition-colors"
                            >
                              {option.label}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </div>
                    </Listbox>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Render Content */}
          {loading ? (
            <div className="flex justify-center items-center py-32">
              <div className="text-center">
                <div className="inline-block">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-orange-500 mb-6"></div>
                </div>
                <p className="text-xl text-gray-600 font-semibold">
                  Loading delicious menu...
                </p>
                <p className="text-gray-400 mt-2">This won't take long</p>
              </div>
            </div>
          ) : error ? (
            <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-12 text-center">
              <div className="text-5xl mb-4">⚠️</div>
              <p className="text-red-600 mb-6 font-semibold text-lg">{error}</p>
              <button
                onClick={fetchFood}
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:shadow-lg transition-all transform hover:scale-105"
              >
                Try Again
              </button>
            </div>
          ) : filteredFoods.length === 0 ? (
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-16 text-center border-2 border-dashed border-gray-300">
              <div className="text-6xl mb-4">🍽️</div>
              <p className="text-gray-700 text-xl font-semibold mb-2">
                {category === "All"
                  ? "No food items available yet."
                  : `No items found in "${category}" category.`}
              </p>
              <p className="text-gray-500 mb-6">
                Check back soon for more options!
              </p>
              {category !== "All" && (
                <button
                  onClick={() => handleCategoryChange("All")}
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:shadow-lg transition-all"
                >
                  View All Items
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredFoods.map((food, index) => (
                <div
                  key={food._id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <FoodCards
                    id={food._id}
                    name={food.name}
                    category={food.category}
                    description={food.description}
                    offer={food.offer}
                    img={food.img}
                    original={food.price}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default MenuPage;
