import axios from "axios";
import React, { useState, useEffect } from "react";
import { useAppSelector } from "../hooks/reduxhooks";
import { useRazorpay } from "react-razorpay";
import { toast } from "react-toastify";
import { Tag, X } from "lucide-react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  img: string;
};

type AppliedCoupon = {
  code: string;
  discount: number;
  title: string;
};

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(
    null,
  );
  const [couponLoading, setCouponLoading] = useState(false);

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

  // Validate and apply coupon
  const validateCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    setCouponLoading(true);
    try {
      const res = await axios.get(
        `${URL}/offer/validate/${couponCode.toUpperCase()}`,
      );
      if (res.data.success) {
        setAppliedCoupon({
          code: res.data.data.code,
          discount: res.data.data.discount,
          title: res.data.data.title,
        });
        toast.success(`Coupon applied! ${res.data.data.discount}% off`);
        setCouponCode("");
      }
    } catch (err: any) {
      const message = err.response?.data?.message || "Invalid coupon code";
      toast.error(message);
    } finally {
      setCouponLoading(false);
    }
  };

  // Remove applied coupon
  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    toast.info("Coupon removed");
  };

  // Checkout
  const { error: razorpayError, isLoading, Razorpay } = useRazorpay();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const discountAmount = appliedCoupon
    ? Math.round((subtotal * appliedCoupon.discount) / 100)
    : 0;

  const total = subtotal - discountAmount;

  const handlePayment = async () => {
    if (!Razorpay) {
      toast.error("Razorpay SDK not loaded yet.");
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
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(response),
        });

        const data = await verifyRes.json();
        if (data.success) {
          setCheckoutSuccess(true);
          toast.success("Payment successful and verified 🎉");
        } else {
          toast.error("Payment verification failed ❌");
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
              <div className="bg-white rounded-2xl p-8 border border-gray-200 sticky top-24 shadow-[0_8px_30px_rgb(0,0,0,0.05)] hover:border-orange-300 transition-all">
                <h3 className="text-2xl font-black text-gray-900 mb-8">
                  Order Summary
                </h3>

                {/* Coupon Section */}
                <div className="mb-8 pb-8 border-b border-gray-200">
                  {!appliedCoupon ? (
                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <Tag className="w-4 h-4 text-orange-500 flex-shrink-0" />
                        Apply Coupon Code
                      </label>
                      <div className="flex flex-col gap-2">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) =>
                            setCouponCode(e.target.value.toUpperCase())
                          }
                          placeholder="Enter coupon code"
                          className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none font-semibold text-sm sm:text-base transition-colors"
                          onKeyPress={(e) =>
                            e.key === "Enter" && validateCoupon()
                          }
                        />
                        <button
                          onClick={validateCoupon}
                          disabled={couponLoading || !couponCode.trim()}
                          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                        >
                          {couponLoading ? "..." : "Apply"}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-4">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2 flex-1">
                          <span className="text-green-600 text-xl flex-shrink-0">
                            ✓
                          </span>
                          <span className="font-bold text-gray-900 truncate">
                            {appliedCoupon.code}
                          </span>
                        </div>
                        <button
                          onClick={removeCoupon}
                          className="text-gray-600 hover:text-gray-900 transition-colors flex-shrink-0"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {appliedCoupon.title}
                      </p>
                      <p className="text-lg font-black text-green-600 mt-2">
                        {appliedCoupon.discount}% OFF
                      </p>
                    </div>
                  )}
                </div>

                {/* Items Summary */}
                <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-bold text-gray-900">
                      ₹{subtotal.toFixed(2)}
                    </span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({appliedCoupon.discount}%)</span>
                      <span className="font-bold">
                        -₹{discountAmount.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span className="font-bold text-green-500">FREE</span>
                  </div>
                </div>

                {/* Total */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl text-gray-900 font-bold">
                      Total
                    </span>
                    <span className="text-4xl font-black text-orange-500">
                      ₹{total.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 text-center">
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
                <div className="mt-6 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
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
