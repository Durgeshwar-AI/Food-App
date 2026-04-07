import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  DashboardHeader,
  DashboardTabs,
  FoodCard,
  FoodForm,
  FoodSectionHeader,
  OrderManagement,
  AnalyticsOverview,
  OfferCard,
  OfferForm,
  OfferSectionHeader,
} from "../Components/Dashboard";
import { DashboardTab } from "../Components/Dashboard/DashboardTabs";
import { useDispatch } from "react-redux";
import { logout } from "../reducers/authReducer";
import axios from "axios";
import { toast } from "react-toastify";

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

interface Order {
  _id: string;
  userName: string;
  phone: string;
  food: any[];
  payment: string;
  amount: number;
  status: string;
  createdAt: string;
}

interface DashboardStats {
  totalOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  pendingOrders: number;
  totalRevenue: number;
}

interface OfferItem {
  _id?: string;
  id?: number;
  title: string;
  discount: number | string;
  code: string;
  validUntil: string;
  status: "active" | "inactive";
  description: string;
}

type FoodFormState = {
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
  discount: string;
};

type OfferFormState = {
  title: string;
  discount: string;
  code: string;
  validUntil: string;
  status: "active" | "inactive";
  description: string;
};

const URL = import.meta.env.VITE_API_URL;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<DashboardTab>("orders");
  const [loading, setLoading] = useState<boolean>(false);
  
  // Data States
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    deliveredOrders: 0,
    cancelledOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0,
  });
  const [offers, setOffers] = useState<OfferItem[]>([]);

  // Form States
  const [showFoodForm, setShowFoodForm] = useState<boolean>(false);
  const [editingFood, setEditingFood] = useState<FoodItem | null>(null);
  const [showOfferForm, setShowOfferForm] = useState<boolean>(false);
  const [editingOffer, setEditingOffer] = useState<OfferItem | null>(null);

  const [foodForm, setFoodForm] = useState<FoodFormState>({
    name: "",
    category: "",
    price: "",
    image: "",
    description: "",
    discount: "",
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

  // --- Fetching Logic ---

  const fetchFoods = async (): Promise<void> => {
    try {
      const response = await axios.get(`${URL}/food/getFood`);
      if (response.data.success) {
        setFoods(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch foods:", error);
    }
  };

  const fetchOrders = useCallback(async (silent = false): Promise<void> => {
    if (!silent) setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(`${URL}/order/all`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      if (response.data.success) {
        setOrders(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  const fetchStats = async (): Promise<void> => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(`${URL}/order/stats`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  const fetchOffers = async (): Promise<void> => {
    try {
      const response = await axios.get(`${URL}/offer/all`);
      if (response.data.success) {
        setOffers(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch offers:", error);
    }
  };

  useEffect(() => {
    if (activeTab === "foods") fetchFoods();
    if (activeTab === "orders") fetchOrders();
    if (activeTab === "analytics") fetchStats();
    if (activeTab === "offers") fetchOffers();
  }, [activeTab, fetchOrders]);

  // Polling for orders (30s)
  useEffect(() => {
    const interval = setInterval(() => {
      fetchOrders(true);
      if (activeTab === "analytics") fetchStats();
    }, 30000);
    return () => clearInterval(interval);
  }, [activeTab, fetchOrders]);

  // --- Handlers ---

  const handleUpdateOrderStatus = async (id: string, status: string) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.patch(
        `${URL}/order/update-status/${id}`,
        { status },
        { 
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true 
        }
      );
      if (response.data.success) {
        toast.success(`Order marked as ${status}`);
        fetchOrders(true);
        fetchStats(); // Update stats in background
      }
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  const handleAddFood = async (): Promise<void> => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.post(`${URL}/food/addFood`, {
        name: foodForm.name,
        category: foodForm.category,
        price: parseFloat(foodForm.price),
        img: foodForm.image,
        description: foodForm.description,
        offer: foodForm.discount ? parseInt(foodForm.discount) : 0,
      }, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      if (response.data.success) {
        toast.success("Food added successfully");
        setFoods([...foods, response.data.data]);
        resetForms();
      }
    } catch (error) {
      toast.error("Failed to add food");
    }
  };

  const handleUpdateFood = async (): Promise<void> => {
    if (!editingFood?._id) return;
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.patch(`${URL}/food/updateFood/${editingFood._id}`, {
        name: foodForm.name,
        category: foodForm.category,
        price: parseFloat(foodForm.price),
        img: foodForm.image,
        description: foodForm.description,
        offer: foodForm.discount ? parseInt(foodForm.discount) : 0,
      }, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      if (response.data.success) {
        toast.success("Food updated successfully");
        setFoods(foods.map(f => f._id === editingFood._id ? response.data.data : f));
        resetForms();
      }
    } catch (error) {
      toast.error("Failed to update food");
    }
  };

  const handleDeleteFood = async (id: string) => {
    if (!window.confirm("Delete this food item?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${URL}/food/deleteFood/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setFoods(foods.filter(f => f._id !== id));
      toast.success("Food deleted");
    } catch (error) {
      toast.error("Failed to delete food");
    }
  };

  const handleAddOffer = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.post(`${URL}/offer/add`, {
        ...offerForm,
        discount: parseFloat(offerForm.discount),
      }, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      if (response.data.success) {
        toast.success("Offer created");
        setOffers([...offers, response.data.data]);
        resetForms();
      }
    } catch (error) {
      toast.error("Failed to create offer");
    }
  };

  const handleUpdateOffer = async () => {
    if (!editingOffer?._id) return;
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.patch(`${URL}/offer/update/${editingOffer._id}`, {
        ...offerForm,
        discount: parseFloat(offerForm.discount),
      }, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      if (response.data.success) {
        toast.success("Offer updated");
        setOffers(offers.map(o => o._id === editingOffer._id ? response.data.data : o));
        resetForms();
      }
    } catch (error) {
      toast.error("Failed to update offer");
    }
  };

  const handleDeleteOffer = async (id: string) => {
    if (!window.confirm("Delete this offer?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${URL}/offer/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setOffers(offers.filter(o => o._id !== id));
      toast.success("Offer deleted");
    } catch (error) {
      toast.error("Failed to delete offer");
    }
  };

  const resetForms = (): void => {
    setShowFoodForm(false);
    setEditingFood(null);
    setShowOfferForm(false);
    setEditingOffer(null);
    setFoodForm({ name: "", category: "", price: "", image: "", description: "", discount: "" });
    setOfferForm({ title: "", discount: "", code: "", validUntil: "", status: "active", description: "" });
  };

  const handleLogout = async (): Promise<void> => {
    try {
      await axios.post(`${URL}/admin/logout`, {}, { withCredentials: true });
      dispatch(logout());
      localStorage.clear();
      navigate("/admin/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Fallback: clear and navigate anyway
      dispatch(logout());
      localStorage.clear();
      navigate("/admin/login");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Abstract Background Blur */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-500/5 blur-[120px] rounded-full animate-pulse"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-10 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <DashboardHeader />
          <button
            onClick={handleLogout}
            className="group px-8 py-3 bg-white hover:bg-red-50 text-gray-900 hover:text-red-600 font-black rounded-2xl transition-all duration-300 border border-gray-200 hover:border-red-100 shadow-sm flex items-center justify-center gap-2"
          >
            Logout
          </button>
        </div>

        <DashboardTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Tab Content */}
        <div className="transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
            
            {activeTab === "analytics" && (
                <AnalyticsOverview stats={stats} loading={loading} />
            )}

            {activeTab === "orders" && (
                <OrderManagement 
                    orders={orders} 
                    onUpdateStatus={handleUpdateOrderStatus} 
                    loading={loading} 
                />
            )}

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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {loading && foods.length === 0 ? (
                            <div className="col-span-full py-20 text-center text-gray-500 font-bold uppercase tracking-widest animate-pulse">Loading Menu...</div>
                        ) : foods.length === 0 ? (
                            <div className="col-span-full py-20 text-center bg-white rounded-[2rem] border-2 border-dashed border-gray-200">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Your menu is empty</h3>
                                <p className="text-gray-500">Add your first food item to get started.</p>
                            </div>
                        ) : (
                            foods.map((food) => (
                                <FoodCard
                                    key={food._id}
                                    food={food}
                                    onEdit={() => {
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
                                    }}
                                    onDelete={() => handleDeleteFood(food._id || "")}
                                />
                            ))
                        )}
                    </div>
                </div>
            )}

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
                        {offers.length === 0 ? (
                            <div className="col-span-full py-20 text-center bg-white rounded-[2rem] border-2 border-dashed border-gray-200">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No active offers</h3>
                                <p className="text-gray-500">Create promos to attract more customers.</p>
                            </div>
                        ) : (
                            offers.map((offer: any) => (
                                <OfferCard
                                    key={offer._id}
                                    offer={{
                                        ...offer,
                                        id: offer._id // Compat for existing OfferCard
                                    }}
                                    onEdit={(o: any) => {
                                        setEditingOffer(offer);
                                        setOfferForm({
                                            title: offer.title,
                                            discount: offer.discount.toString(),
                                            code: offer.code,
                                            validUntil: offer.validUntil.split('T')[0],
                                            status: offer.status,
                                            description: offer.description,
                                        });
                                        setShowOfferForm(true);
                                    }}
                                    onDelete={() => handleDeleteOffer(offer._id)}
                                />
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
