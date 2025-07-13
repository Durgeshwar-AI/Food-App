import React, { useState, useEffect } from "react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [checkoutLoading, setCheckoutLoading] = useState<boolean>(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState<boolean>(false);

  // Fetch cart items from backend
  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/cart", { credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch cart");
        const data = await res.json();
        setCartItems(data.items || []);
      } catch (err: any) {
        setError(err.message || "Error fetching cart");
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  // Update quantity in backend
  const updateQuantity = async (id: number, delta: number) => {
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;
    const newQuantity = Math.max(1, item.quantity + delta);
    try {
      const res = await fetch(`/api/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

  // Remove item in backend
  const removeItem = async (id: number) => {
    try {
      const res = await fetch(`/api/cart/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to remove item");
      const data = await res.json();
      setCartItems(data.items || []);
    } catch (err: any) {
      setError(err.message || "Error removing item");
    }
  };

  // Checkout handler
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
    <div className="max-w-2xl mx-auto pt-10 p-4 h-[calc(100vh-64px)] cursor-default">
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
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-4 border rounded-lg"
            >
              <div>
                <h2 className="text-lg font-medium">{item.name}</h2>
                <p>
                  ${item.price.toFixed(2)} x {item.quantity}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="px-2 py-1 border rounded"
                  onClick={() => updateQuantity(item.id, -1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="px-2 py-1 border rounded"
                  onClick={() => updateQuantity(item.id, 1)}
                >
                  +
                </button>
                <button
                  className="px-2 py-1 border text-red-600 rounded"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="text-right text-xl font-semibold">
            Total: ${total.toFixed(2)}
          </div>
          <button
            className="w-full mt-4 py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleCheckout}
            disabled={checkoutLoading}
          >
            {checkoutLoading ? "Processing..." : "Proceed to Checkout"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
