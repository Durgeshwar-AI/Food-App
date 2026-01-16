import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  DashboardHeader,
  DashboardTabs,
  FoodCard,
  FoodForm,
  FoodSectionHeader,
} from "../Components/Dashboard";
import { useDispatch } from "react-redux";
import { logout } from "../reducers/authReducer";

// --- Type Definitions ---

interface FoodItem {
  _id?: string;
  id?: number;
  name: string;
  category: string;
  price: number | string;
  img: string;
  description: string;
  offer?: number;
}

type FoodFormState = {
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
  discount: string;
};

const URL = import.meta.env.VITE_API_URL;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<"foods">("foods");
  const [loading, setLoading] = useState<boolean>(false);
  const [foods, setFoods] = useState<FoodItem[]>([]);

  const [showFoodForm, setShowFoodForm] = useState<boolean>(false);
  const [editingFood, setEditingFood] = useState<FoodItem | null>(null);

  const [foodForm, setFoodForm] = useState<FoodFormState>({
    name: "",
    category: "",
    price: "",
    image: "",
    description: "",
    discount: "",
  });

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await fetch(`${URL}/food/getFood`);
      const result = await response.json();
      if (result.success) {
        setFoods(result.data);
        console.log(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch foods:", error);
    } finally {
      setLoading(false);
    }
  };

  const [offerForm, setOfferForm] = useState({
    title: "",
    discount: "",
    code: "",
    validUntil: "",
    description: "",
  });

  const categories: string[] = [
    "Pizza",
    "Burgers",
    "Salads",
    "Desserts",
    "Beverages",
    "Appetizers",
  ];

  const handleAddFood = async (): Promise<void> => {
    if (
      !foodForm.name ||
      !foodForm.category ||
      !foodForm.price ||
      !foodForm.image
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${URL}/food/addFood`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({
          name: foodForm.name,
          category: foodForm.category,
          price: parseFloat(String(foodForm.price)),
          img: foodForm.image,
          description: foodForm.description,
          offer: foodForm.discount ? parseInt(String(foodForm.discount)) : 0,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setFoods([...foods, result.data]);
        setFoodForm({
          name: "",
          category: "",
          price: "",
          image: "",
          description: "",
          discount: "",
        });
        setShowFoodForm(false);
        alert("Food added successfully");
      } else {
        alert("Failed to add food: " + result.message);
      }
    } catch (error) {
      console.error("Error adding food:", error);
      alert("Error adding food");
    }
  };

  const handleUpdateFood = async (): Promise<void> => {
    if (!editingFood || !editingFood._id) return;

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        `${URL}/food/updateFood/${editingFood._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify({
            name: foodForm.name,
            category: foodForm.category,
            price: parseFloat(String(foodForm.price)),
            img: foodForm.image,
            description: foodForm.description,
            offer: foodForm.discount ? parseInt(String(foodForm.discount)) : 0,
          }),
        }
      );

      const result = await response.json();
      if (result.success) {
        setFoods(
          foods.map((food) =>
            food._id === editingFood._id ? result.data : food
          )
        );
        setEditingFood(null);
        setFoodForm({
          name: "",
          category: "",
          price: "",
          image: "",
          description: "",
          discount: "",
        });
        alert("Food updated successfully");
      } else {
        alert("Failed to update food: " + result.message);
      }
    } catch (error) {
      console.error("Error updating food:", error);
      alert("Error updating food");
    }
  };

  const handleDeleteFood = async (foodId: string): Promise<void> => {
    if (!window.confirm("Are you sure you want to delete this food?")) return;

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        `${URL}/food/deleteFood/${foodId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      const result = await response.json();
      if (result.success) {
        setFoods(foods.filter((food) => food._id !== foodId));
        alert("Food deleted successfully");
      } else {
        alert("Failed to delete food: " + result.message);
      }
    } catch (error) {
      console.error("Error deleting food:", error);
      alert("Error deleting food");
    }
  };

  const handleAddOffer = (): void => {};

  const handleUpdateOffer = (): void => {};

  const handleDeleteOffer = (id: number): void => {};

  const startEditFood = (food: FoodItem): void => {
    setEditingFood(food);
    setFoodForm({
      name: food.name,
      category: food.category,
      price: food.price.toString(),
      image: food.img,
      description: food.description,
      discount: food.offer?.toString() || "",
    });
    setShowFoodForm(true);
  };

  const startEditOffer = (): void => {};

  const resetForms = (): void => {
    setShowFoodForm(false);
    setEditingFood(null);
    setFoodForm({
      name: "",
      category: "",
      price: "",
      image: "",
      description: "",
      discount: "",
    });
  };

  const handleLogout = async (): Promise<void> => {
    try {
      const response = await fetch("http://localhost:8000/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        dispatch(logout());
        localStorage.clear();
        navigate("/admin/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <DashboardHeader />
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
          >
            Logout
          </button>
        </div>
        <DashboardTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Foods Tab */}
        {activeTab === "foods" && (
          <div className="space-y-8">
            <FoodSectionHeader
              count={foods.length}
              onAddNew={() => {
                resetForms();
                setShowFoodForm(true);
              }}
            />
            <FoodForm
              isOpen={showFoodForm || !!editingFood}
              isEditing={!!editingFood}
              formData={foodForm}
              categories={categories}
              onFormChange={setFoodForm}
              onSubmit={editingFood ? handleUpdateFood : handleAddFood}
              onClose={resetForms}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <p className="text-white">Loading foods...</p>
              ) : foods.length === 0 ? (
                <p className="text-white">No foods added yet</p>
              ) : (
                foods.map((food) => (
                  <FoodCard
                    key={food._id}
                    food={food}
                    onEdit={() => startEditFood(food)}
                    onDelete={() => handleDeleteFood(food._id || "")}
                  />
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
