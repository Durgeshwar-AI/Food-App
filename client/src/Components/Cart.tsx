import axios from "axios";
import React, { useState, useEffect } from "react";
import { useAppSelector } from "../hooks/reduxhooks";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  img: string;
};

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const URL = import.meta.env.VITE_API_URL;
  const token = useAppSelector((state) => state.auth.token);

  // Fetch cart items from backend
  useEffect(() => {
    if (!token) return;
    const fetchCart = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`${URL}/cart`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setCartItems(res.data.items || []);
      } catch (err: any) {
        setError(err.message || "Error fetching cart");
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [token]);

  // Update quantity
  const updateQuantity = async (id: number, delta: number) => {
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;
    const newQuantity = Math.max(1, item.quantity + delta);
    try {
      const res = await fetch(`${URL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({ id, quantity: newQuantity }),
      });
      if (!res.ok) throw new Error("Failed to update cart");
      const data = await res.json();
      setCartItems(data.items || []);
    } catch (err: any) {
      setError(err.message || "Error updating cart");
    }
  };

  // Remove item
  const removeItem = async (id: number) => {
    try {
      const res = await fetch(`${URL}/cart/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to remove item");
      const data = await res.json();
      setCartItems(data.items || []);
    } catch (err: any) {
      setError(err.message || "Error removing item");
    }
  };

  // Checkout
  const handleCheckout = async () => {
    setCheckoutLoading(true);
    setError("");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ items: cartItems }),
      });
      if (!res.ok) throw new Error("Checkout failed");
      setCheckoutSuccess(true);
      setCartItems([]);
    } catch (err: any) {
      setError(err.message || "Error during checkout");
    } finally {
      setCheckoutLoading(false);
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-2xl mx-auto pt-10 p-4 cursor-default">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : checkoutSuccess ? (
        <p className="text-green-600">Order placed successfully!</p>
      ) : cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 border rounded-lg gap-4"
              >
                {/* Image + Details */}
                <div className="flex gap-4 flex-1">
                  <img
                    src={item.img}
                    alt={`Image of ${item.name}`}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h2 className="text-lg font-medium">{item.name}</h2>
                    <p className="text-gray-600">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                </div>

                {/* Quantity & Actions */}
                <div className="flex items-center gap-2 justify-center sm:justify-end flex-wrap">
                  <button
                    className="px-2 py-1 border rounded disabled:opacity-50"
                    onClick={() => updateQuantity(item.id, -1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="min-w-[24px] text-center">
                    {item.quantity}
                  </span>
                  <button
                    className="px-2 py-1 border rounded"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    +
                  </button>
                  <button
                    className="px-2 py-1 border text-red-600 rounded hover:bg-red-100"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Summary */}
          <div className="border-t bg-white p-4 rounded-lg shadow-sm mt-6 sm:flex justify-between items-center">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
              <div>
                <div className="text-xl font-bold text-gray-900">
                  Total: ${total.toFixed(2)}
                </div>
                <div className="text-sm text-gray-500">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
                </div>
              </div>
            </div>

            <button
              className="w-full sm:w-auto sm:min-w-[200px] px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              onClick={handleCheckout}
              disabled={checkoutLoading || cartItems.length === 0}
            >
              {checkoutLoading ? "Processing..." : "Proceed to Checkout"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
