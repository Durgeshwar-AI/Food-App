import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DashboardHeader,
  DashboardTabs,
  FoodCard,
  FoodForm,
  OfferCard,
  OfferForm,
  FoodSectionHeader,
  OfferSectionHeader,
} from "../Components/Dashboard";
import { useDispatch } from "react-redux";
import { logout } from "../reducers/authReducer";

// --- Type Definitions ---

interface FoodItem {
  id: number;
  name: string;
  category: string;
  price: number | string;
  image: string;
  description: string;
  status: "active" | "inactive";
}

interface OfferItem {
  id: number;
  title: string;
  discount: number | string;
  code: string;
  validUntil: string;
  status: "active" | "inactive";
  description: string;
}

type FoodFormState = Omit<FoodItem, "id"> & { price: string };
type OfferFormState = Omit<OfferItem, "id"> & { discount: string };

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState<"foods" | "offers">("foods");
  const [foods, setFoods] = useState<FoodItem[]>([
    {
      id: 1,
      name: "Margherita Pizza",
      category: "Pizza",
      price: 12.99,
      image: "/api/placeholder/150/150",
      description: "Classic pizza with tomato sauce and mozzarella",
      status: "active",
    },
    {
      id: 2,
      name: "Caesar Salad",
      category: "Salads",
      price: 8.99,
      image: "/api/placeholder/150/150",
      description: "Fresh romaine lettuce with caesar dressing",
      status: "active",
    },
    {
      id: 3,
      name: "Chicken Burger",
      category: "Burgers",
      price: 14.99,
      image: "/api/placeholder/150/150",
      description: "Grilled chicken breast with fresh vegetables",
      status: "inactive",
    },
  ]);

  const [offers, setOffers] = useState<OfferItem[]>([
    {
      id: 1,
      title: "Weekend Special",
      discount: 20,
      code: "WEEKEND20",
      validUntil: "2025-08-15",
      status: "active",
      description: "20% off on all orders above $25",
    },
    {
      id: 2,
      title: "New Customer",
      discount: 15,
      code: "WELCOME15",
      validUntil: "2025-12-31",
      status: "active",
      description: "Welcome discount for new customers",
    },
    {
      id: 3,
      title: "Summer Sale",
      discount: 30,
      code: "SUMMER30",
      validUntil: "2025-08-31",
      status: "inactive",
      description: "Big summer discount on selected items",
    },
  ]);

  const [showFoodForm, setShowFoodForm] = useState<boolean>(false);
  const [showOfferForm, setShowOfferForm] = useState<boolean>(false);
  const [editingFood, setEditingFood] = useState<FoodItem | null>(null);
  const [editingOffer, setEditingOffer] = useState<OfferItem | null>(null);

  const [foodForm, setFoodForm] = useState<FoodFormState>({
    name: "",
    category: "",
    price: "",
    image: "",
    description: "",
    status: "active",
  });

  const [offerForm, setOfferForm] = useState<OfferFormState>({
    title: "",
    discount: "",
    code: "",
    validUntil: "",
    status: "active",
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

  const handleAddFood = (): void => {
    if (foodForm.name && foodForm.category && foodForm.price) {
      const newFood: FoodItem = {
        id: foods.length > 0 ? Math.max(...foods.map((f) => f.id)) + 1 : 1, // Generate next ID
        ...foodForm,
        price: parseFloat(foodForm.price),
      };
      setFoods([...foods, newFood]);
      setFoodForm({
        name: "",
        category: "",
        price: "",
        image: "",
        description: "",
        status: "active",
      });
      setShowFoodForm(false);
    }
  };

  const handleUpdateFood = (): void => {
    if (!editingFood) return; // Ensure editingFood is not null when updating
    setFoods(
      foods.map((food) =>
        food.id === editingFood.id
          ? ({
              ...editingFood,
              ...foodForm,
              price: parseFloat(foodForm.price),
            } as FoodItem) // Explicitly cast to FoodItem
          : food
      )
    );
    setEditingFood(null);
    setFoodForm({
      name: "",
      category: "",
      price: "",
      image: "",
      description: "",
      status: "active",
    });
  };

  const handleDeleteFood = (id: number): void => {
    setFoods(foods.filter((food) => food.id !== id));
  };

  const handleAddOffer = (): void => {
    if (offerForm.title && offerForm.discount && offerForm.code) {
      const newOffer: OfferItem = {
        id: offers.length > 0 ? Math.max(...offers.map((o) => o.id)) + 1 : 1, // Generate next ID
        ...offerForm,
        discount: parseInt(offerForm.discount),
      };
      setOffers([...offers, newOffer]);
      setOfferForm({
        title: "",
        discount: "",
        code: "",
        validUntil: "",
        status: "active",
        description: "",
      });
      setShowOfferForm(false);
    }
  };

  const handleUpdateOffer = (): void => {
    if (!editingOffer) return; // Ensure editingOffer is not null when updating
    setOffers(
      offers.map((offer) =>
        offer.id === editingOffer.id
          ? ({
              ...editingOffer,
              ...offerForm,
              discount: parseInt(offerForm.discount),
            } as OfferItem) // Explicitly cast to OfferItem
          : offer
      )
    );
    setEditingOffer(null);
    setOfferForm({
      title: "",
      discount: "",
      code: "",
      validUntil: "",
      status: "active",
      description: "",
    });
  };

  const handleDeleteOffer = (id: number): void => {
    setOffers(offers.filter((offer) => offer.id !== id));
  };

  const startEditFood = (food: FoodItem): void => {
    setEditingFood(food);
    setFoodForm({
      name: food.name,
      category: food.category,
      price: food.price.toString(),
      image: food.image,
      description: food.description,
      status: food.status,
    });
    setShowFoodForm(true); // Open the form when starting edit
  };

  const startEditOffer = (offer: OfferItem): void => {
    setEditingOffer(offer);
    setOfferForm({
      title: offer.title,
      discount: offer.discount.toString(),
      code: offer.code,
      validUntil: offer.validUntil,
      status: offer.status,
      description: offer.description,
    });
    setShowOfferForm(true); // Open the form when starting edit
  };

  const resetForms = (): void => {
    setShowFoodForm(false);
    setShowOfferForm(false);
    setEditingFood(null);
    setEditingOffer(null);
    setFoodForm({
      name: "",
      category: "",
      price: "",
      image: "",
      description: "",
      status: "active",
    });
    setOfferForm({
      title: "",
      discount: "",
      code: "",
      validUntil: "",
      status: "active",
      description: "",
    });
  };

  const handleLogout = async (): Promise<void> => {
    try {
      const response = await fetch("http://localhost:8000/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        dispatch(logout())
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
              {foods.map((food) => (
                <FoodCard
                  key={food.id}
                  food={food}
                  onEdit={startEditFood}
                  onDelete={handleDeleteFood}
                />
              ))}
            </div>
          </div>
        )}

        {/* Offers Tab */}
        {activeTab === "offers" && (
          <div className="space-y-8">
            <OfferSectionHeader
              count={offers.length}
              onAddNew={() => {
                resetForms();
                setShowOfferForm(true);
              }}
            />
            <OfferForm
              isOpen={showOfferForm || !!editingOffer}
              isEditing={!!editingOffer}
              formData={offerForm}
              onFormChange={setOfferForm}
              onSubmit={editingOffer ? handleUpdateOffer : handleAddOffer}
              onClose={resetForms}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offers.map((offer) => (
                <OfferCard
                  key={offer.id}
                  offer={offer}
                  onEdit={startEditOffer}
                  onDelete={handleDeleteOffer}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
