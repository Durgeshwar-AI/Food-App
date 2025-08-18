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
      allFood
        .map((item) => item.category)
        .filter((cat) => cat && cat.trim())
    );
    return ["All", ...Array.from(uniqueCategories).sort()];
  }, [allFood]);

  // Compute price after offer
  const getFinalPrice = (item: FoodProps) => item.price * (1 - item.offer / 100);

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

      <main className="mt-20 px-4 mb-6 sm:px-8 md:px-16 lg:px-24 min-h-screen">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Our Delicious Menu
          </h1>
          {!loading && !error && (
            <p className="text-gray-600">
              {filteredFoods.length} item
              {filteredFoods.length !== 1 ? "s" : ""}
              {category !== "All" && ` in ${category}`}
            </p>
          )}
        </header>

        {/* Filters and Sorting */}
        {!loading && !error && allFood.length > 0 && (
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 gap-4 bg-gray-50 p-4 rounded-lg">
            {/* Category Filter */}
            <div className="w-full lg:flex-1">
              <label
                htmlFor="category-select"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Filter by Category
              </label>
              {categories.length <= 6 ? (
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryChange(cat)}
                      className={`px-4 py-2 rounded-full border transition-all duration-200 font-medium text-sm cursor-pointer ${
                        category === cat
                          ? "bg-yellow-500 text-white border-yellow-500 shadow-md"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-yellow-50 hover:border-yellow-300"
                      }`}
                      aria-pressed={category === cat}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              ) : (
                <select
                  id="category-select"
                  value={category}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="border border-gray-300 px-4 py-2 rounded w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}{" "}
                      {cat !== "All" &&
                        `(${allFood.filter((item) => item.category === cat).length})`}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Sort Select */}
            <div className="w-full sm:w-auto lg:w-auto">
              <label
                htmlFor="sort-select"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Sort by
              </label>
              <Listbox value={sort} onChange={handleSortChange}>
  <div className="relative w-full sm:w-48">
    <Listbox.Button className="w-full rounded-3xl border border-gray-300 bg-white px-4 py-2 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500">
      {sortOptions.find((o) => o.value === sort)?.label}
    </Listbox.Button>
    <Listbox.Options className="absolute mt-2 w-full rounded-2xl bg-white shadow-lg border border-gray-200 focus:outline-none">
      {sortOptions.map((option) => (
        <Listbox.Option
          key={option.value}
          value={option.value}
          className="cursor-pointer px-4 py-2 hover:bg-yellow-100 rounded-xl"
        >
          {option.label}
        </Listbox.Option>
      ))}
    </Listbox.Options>
  </div>
</Listbox>
            </div>
          </div>
        )}

        {/* Main Content */}
        {renderContent()}
      </main>

      <Footer />
    </>
  );
};

export default MenuPage;
