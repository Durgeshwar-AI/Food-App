import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, Package, Percent } from 'lucide-react';

// --- Type Definitions ---

interface FoodItem {
  id: number;
  name: string;
  category: string;
  price: number | string;
  image: string;
  description: string;
  status: 'active' | 'inactive';
}

interface OfferItem {
  id: number;
  title: string;
  discount: number | string;
  code: string;
  validUntil: string;
  status: 'active' | 'inactive';
  description: string;
}

type FoodFormState = Omit<FoodItem, 'id'> & { price: string }; // price as string for input
type OfferFormState = Omit<OfferItem, 'id'> & { discount: string }; // discount as string for input

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'foods' | 'offers'>('foods');
  const [foods, setFoods] = useState<FoodItem[]>([
    { id: 1, name: 'Margherita Pizza', category: 'Pizza', price: 12.99, image: '/api/placeholder/150/150', description: 'Classic pizza with tomato sauce and mozzarella', status: 'active' },
    { id: 2, name: 'Caesar Salad', category: 'Salads', price: 8.99, image: '/api/placeholder/150/150', description: 'Fresh romaine lettuce with caesar dressing', status: 'active' },
    { id: 3, name: 'Chicken Burger', category: 'Burgers', price: 14.99, image: '/api/placeholder/150/150', description: 'Grilled chicken breast with fresh vegetables', status: 'inactive' }
  ]);

  const [offers, setOffers] = useState<OfferItem[]>([
    { id: 1, title: 'Weekend Special', discount: 20, code: 'WEEKEND20', validUntil: '2025-08-15', status: 'active', description: '20% off on all orders above $25' },
    { id: 2, title: 'New Customer', discount: 15, code: 'WELCOME15', validUntil: '2025-12-31', status: 'active', description: 'Welcome discount for new customers' },
    { id: 3, title: 'Summer Sale', discount: 30, code: 'SUMMER30', validUntil: '2025-08-31', status: 'inactive', description: 'Big summer discount on selected items' }
  ]);

  const [showFoodForm, setShowFoodForm] = useState<boolean>(false);
  const [showOfferForm, setShowOfferForm] = useState<boolean>(false);
  const [editingFood, setEditingFood] = useState<FoodItem | null>(null);
  const [editingOffer, setEditingOffer] = useState<OfferItem | null>(null);

  const [foodForm, setFoodForm] = useState<FoodFormState>({
    name: '', category: '', price: '', image: '', description: '', status: 'active'
  });

  const [offerForm, setOfferForm] = useState<OfferFormState>({
    title: '', discount: '', code: '', validUntil: '', status: 'active', description: ''
  });

  const categories: string[] = ['Pizza', 'Burgers', 'Salads', 'Desserts', 'Beverages', 'Appetizers'];

  const handleAddFood = (): void => {
    if (foodForm.name && foodForm.category && foodForm.price) {
      const newFood: FoodItem = {
        id: foods.length > 0 ? Math.max(...foods.map(f => f.id)) + 1 : 1, // Generate next ID
        ...foodForm,
        price: parseFloat(foodForm.price)
      };
      setFoods([...foods, newFood]);
      setFoodForm({ name: '', category: '', price: '', image: '', description: '', status: 'active' });
      setShowFoodForm(false);
    }
  };

  const handleUpdateFood = (): void => {
    if (!editingFood) return; // Ensure editingFood is not null when updating
    setFoods(foods.map(food =>
      food.id === editingFood.id
        ? { ...editingFood, ...foodForm, price: parseFloat(foodForm.price) } as FoodItem // Explicitly cast to FoodItem
        : food
    ));
    setEditingFood(null);
    setFoodForm({ name: '', category: '', price: '', image: '', description: '', status: 'active' });
  };

  const handleDeleteFood = (id: number): void => {
    setFoods(foods.filter(food => food.id !== id));
  };

  const handleAddOffer = (): void => {
    if (offerForm.title && offerForm.discount && offerForm.code) {
      const newOffer: OfferItem = {
        id: offers.length > 0 ? Math.max(...offers.map(o => o.id)) + 1 : 1, // Generate next ID
        ...offerForm,
        discount: parseInt(offerForm.discount)
      };
      setOffers([...offers, newOffer]);
      setOfferForm({ title: '', discount: '', code: '', validUntil: '', status: 'active', description: '' });
      setShowOfferForm(false);
    }
  };

  const handleUpdateOffer = (): void => {
    if (!editingOffer) return; // Ensure editingOffer is not null when updating
    setOffers(offers.map(offer =>
      offer.id === editingOffer.id
        ? { ...editingOffer, ...offerForm, discount: parseInt(offerForm.discount) } as OfferItem // Explicitly cast to OfferItem
        : offer
    ));
    setEditingOffer(null);
    setOfferForm({ title: '', discount: '', code: '', validUntil: '', status: 'active', description: '' });
  };

  const handleDeleteOffer = (id: number): void => {
    setOffers(offers.filter(offer => offer.id !== id));
  };

  const startEditFood = (food: FoodItem): void => {
    setEditingFood(food);
    setFoodForm({
      name: food.name,
      category: food.category,
      price: food.price.toString(),
      image: food.image,
      description: food.description,
      status: food.status
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
      description: offer.description
    });
    setShowOfferForm(true); // Open the form when starting edit
  };

  const resetForms = (): void => {
    setShowFoodForm(false);
    setShowOfferForm(false);
    setEditingFood(null);
    setEditingOffer(null);
    setFoodForm({ name: '', category: '', price: '', image: '', description: '', status: 'active' });
    setOfferForm({ title: '', discount: '', code: '', validUntil: '', status: 'active', description: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your food app menu and promotional offers</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-white rounded-lg p-1 shadow-lg">
          <button
            onClick={() => setActiveTab('foods')}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'foods'
                ? 'bg-orange-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Package className="w-5 h-5 mr-2" />
            Food Management
          </button>
          <button
            onClick={() => setActiveTab('offers')}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'offers'
                ? 'bg-orange-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Percent className="w-5 h-5 mr-2" />
            Offers Management
          </button>
        </div>

        {/* Foods Tab */}
        {activeTab === 'foods' && (
          <div className="space-y-6">
            {/* Add Food Button */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-800">Food Items</h2>
              <button
                onClick={() => {
                  resetForms(); // Reset forms before opening for new entry
                  setShowFoodForm(true);
                }}
                className="flex items-center px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors shadow-lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add New Food
              </button>
            </div>

            {/* Food Form Modal */}
            {(showFoodForm || editingFood) && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-2xl">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">
                      {editingFood ? 'Edit Food Item' : 'Add New Food Item'}
                    </h3>
                    <button onClick={resetForms} className="text-gray-400 hover:text-gray-600">
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Food Name"
                      value={foodForm.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFoodForm({...foodForm, name: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />

                    <select
                      value={foodForm.category}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFoodForm({...foodForm, category: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>

                    <input
                      type="number"
                      step="0.01"
                      placeholder="Price"
                      value={foodForm.price}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFoodForm({...foodForm, price: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />

                    <input
                      type="text"
                      placeholder="Image URL"
                      value={foodForm.image}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFoodForm({...foodForm, image: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />

                    <textarea
                      placeholder="Description"
                      value={foodForm.description}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFoodForm({...foodForm, description: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent h-20 resize-none"
                    />

                    <select
                      value={foodForm.status}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFoodForm({...foodForm, status: e.target.value as 'active' | 'inactive'})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>

                    <button
                      onClick={editingFood ? handleUpdateFood : handleAddFood}
                      className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      {editingFood ? 'Update Food' : 'Add Food'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Foods Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {foods.map(food => (
                <div key={food.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    {/* In a real app, you'd use <img src={food.image} alt={food.name} /> */}
                    <Package className="w-16 h-16 text-gray-400" />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg text-gray-800">{food.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        food.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {food.status}
                      </span>
                    </div>
                    <p className="text-orange-600 font-medium mb-1">{food.category}</p>
                    <p className="text-2xl font-bold text-gray-800 mb-2">
                      ${typeof food.price === 'number' ? food.price.toFixed(2) : Number(food.price).toFixed(2)}
                    </p> {/* Format price */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{food.description}</p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEditFood(food)}
                        className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        <Edit2 className="w-4 h-4 mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteFood(food.id)}
                        className="flex-1 flex items-center justify-center px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Offers Tab */}
        {activeTab === 'offers' && (
          <div className="space-y-6">
            {/* Add Offer Button */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-800">Promotional Offers</h2>
              <button
                onClick={() => {
                  resetForms(); // Reset forms before opening for new entry
                  setShowOfferForm(true);
                }}
                className="flex items-center px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors shadow-lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add New Offer
              </button>
            </div>

            {/* Offer Form Modal */}
            {(showOfferForm || editingOffer) && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-2xl">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">
                      {editingOffer ? 'Edit Offer' : 'Add New Offer'}
                    </h3>
                    <button onClick={resetForms} className="text-gray-400 hover:text-gray-600">
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Offer Title"
                      value={offerForm.title}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOfferForm({...offerForm, title: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />

                    <input
                      type="number"
                      placeholder="Discount Percentage"
                      value={offerForm.discount}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOfferForm({...offerForm, discount: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />

                    <input
                      type="text"
                      placeholder="Promo Code"
                      value={offerForm.code}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOfferForm({...offerForm, code: e.target.value.toUpperCase()})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />

                    <input
                      type="date"
                      placeholder="Valid Until"
                      value={offerForm.validUntil}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOfferForm({...offerForm, validUntil: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />

                    <textarea
                      placeholder="Offer Description"
                      value={offerForm.description}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setOfferForm({...offerForm, description: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent h-20 resize-none"
                    />

                    <select
                      value={offerForm.status}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setOfferForm({...offerForm, status: e.target.value as 'active' | 'inactive'})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>

                    <button
                      onClick={editingOffer ? handleUpdateOffer : handleAddOffer}
                      className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      {editingOffer ? 'Update Offer' : 'Add Offer'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Offers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offers.map(offer => (
                <div key={offer.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-xl text-gray-800">{offer.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      offer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {offer.status}
                    </span>
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <span className="text-3xl font-bold text-orange-500">{offer.discount}%</span>
                      <span className="text-gray-600 ml-2">OFF</span>
                    </div>
                    <div className="bg-gray-100 px-3 py-2 rounded-lg font-mono text-sm">
                      Code: {offer.code}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{offer.description}</p>
                  <p className="text-sm text-gray-500 mb-4">Valid until: {offer.validUntil}</p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => startEditOffer(offer)}
                      className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <Edit2 className="w-4 h-4 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteOffer(offer.id)}
                      className="flex-1 flex items-center justify-center px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;