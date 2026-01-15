import axios from "axios";
import React, { useState, useEffect } from "react";
import { useAppSelector } from "../hooks/reduxhooks";
import { useRazorpay } from "react-razorpay";

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
  const { error: razorpayError, isLoading, Razorpay } = useRazorpay();

  const handlePayment = async () => {
    if (!Razorpay) {
      alert("Razorpay SDK not loaded yet.");
      return;
    }

    // 1️⃣ Get order from backend
    const response = await fetch(`${URL}/cart/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: total, currency: "INR" }),
    });

    const orderData = await response.json();

    // 2️⃣ Razorpay options
    const options = {
      key: import.meta.env.VITE_RAZOR_ID, // ✅ correct env variable
      amount: orderData.amount,
      currency: orderData.currency,
      name: "Your Company Name",
      description: "Order Payment",
      order_id: orderData.id,
      handler: async (response: any) => {
        // 3️⃣ Send details to backend for verification
        const verifyRes = await fetch(`${URL}/cart/verify-payment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response),
        });

        const data = await verifyRes.json();
        if (data.success) {
          setCheckoutSuccess(true);
          alert("Payment successful and verified 🎉");
        } else {
          alert("Payment verification failed ❌");
        }
      },
      prefill: {
        name: "John Doe",
        email: "john@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399CC",
      },
    };

    // 4️⃣ Open Razorpay
    const rzp1 = new Razorpay(options);
    rzp1.open();
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
            Shopping Cart
          </h1>
          <p className="text-gray-600 text-lg">
            Review your delicious items before checkout
          </p>
        </div>

        {isLoading && !Razorpay && (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-8 text-center">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-500 mb-4"></div>
            </div>
            <p className="text-blue-700 font-semibold">Loading Razorpay...</p>
          </div>
        )}

        {razorpayError && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center">
            <p className="text-red-700 font-semibold">
              Error loading Razorpay: {(razorpayError as any).message}
            </p>
          </div>
        )}

        {loading ? (
          <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-12 text-center">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-orange-500 mb-4"></div>
            </div>
            <p className="text-gray-600 font-semibold">Loading your cart...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center">
            <p className="text-red-700 font-semibold text-lg mb-4">{error}</p>
            <button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold">
              Retry
            </button>
          </div>
        ) : checkoutSuccess ? (
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-12 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <p className="text-green-700 font-black text-2xl">
              Order Placed Successfully!
            </p>
            <p className="text-green-600 mt-2">
              Your food will be delivered shortly
            </p>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-dashed border-orange-300 rounded-2xl p-16 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <p className="text-gray-700 font-bold text-xl mb-6">
              Your cart is empty
            </p>
            <p className="text-gray-600 mb-8">
              Add some delicious items to get started!
            </p>
            <a
              href="/menu"
              className="inline-block px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:shadow-lg transition-all transform hover:scale-105"
            >
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-orange-300 hover:shadow-lg transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex flex-col sm:flex-row gap-6">
                      {/* Image */}
                      <div className="sm:w-24 sm:h-24 w-full h-32">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                          {item.name}
                        </h2>
                        <p className="text-gray-600 mb-4">
                          ₹{item.price.toFixed(2)} per item
                        </p>
                        <div className="flex items-center gap-3">
                          <span className="text-gray-600 font-semibold">
                            Qty:
                          </span>
                          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                            <button
                              className="px-3 py-2 hover:bg-gray-200 rounded transition-colors font-bold disabled:opacity-50"
                              onClick={() => updateQuantity(item.id, -1)}
                              disabled={item.quantity <= 1}
                            >
                              −
                            </button>
                            <span className="w-8 text-center font-bold text-lg">
                              {item.quantity}
                            </span>
                            <button
                              className="px-3 py-2 hover:bg-gray-200 rounded transition-colors font-bold"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Price & Actions */}
                      <div className="flex flex-col items-end justify-between">
                        <div className="text-right">
                          <p className="text-gray-600 text-sm mb-1">Subtotal</p>
                          <p className="text-3xl font-black text-orange-600">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        <button
                          className="px-6 py-2 bg-red-50 text-red-600 font-bold rounded-lg hover:bg-red-100 transition-colors border-2 border-red-200 hover:border-red-300"
                          onClick={() => removeItem(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border-2 border-orange-500/30 sticky top-24 shadow-2xl">
                <h3 className="text-2xl font-black text-white mb-8">
                  Order Summary
                </h3>

                {/* Items Summary */}
                <div className="space-y-4 mb-6 pb-6 border-b border-gray-700">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span className="font-bold">₹{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Delivery Fee</span>
                    <span className="font-bold text-green-400">FREE</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Taxes</span>
                    <span className="font-bold">
                      ₹{(total * 0.05).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl text-white font-bold">Total</span>
                    <span className="text-4xl font-black text-orange-400">
                      ₹{(total * 1.05).toFixed(2)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 text-center">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                    items
                  </p>
                </div>

                {/* Checkout Button */}
                <button
                  className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-black rounded-xl hover:shadow-2xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                  onClick={handlePayment}
                  disabled={checkoutLoading || cartItems.length === 0}
                >
                  {checkoutLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      Processing...
                    </span>
                  ) : (
                    "Proceed to Checkout"
                  )}
                </button>

                {/* Trust Badge */}
                <div className="mt-6 pt-6 border-t border-gray-700 text-center text-gray-400 text-sm">
                  <p>🔒 Secure payment with Razorpay</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
