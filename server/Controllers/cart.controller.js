import User from "../Models/user.model.js";
import Food from "../Models/food.model.js";
import Order from "../Models/order.model.js";
import crypto from "crypto";
import { razorpay } from "../index.js";

// Helper: get cart from user doc
const getCartFromUser = (user) => user.cart || [];

export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ items: getCartFromUser(user) });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const addOrUpdateItem = async (req, res) => {
  const { id, quantity } = req.body;
  if (!id || !quantity)
    return res.status(400).json({ message: "Invalid data" });
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    const food = await Food.findById(id);
    if (!food) return res.status(404).json({ message: "Food not found" });
    let cart = getCartFromUser(user);
    const idx = cart.findIndex((item) => String(item.id) === String(id));

    // Calculate discounted price
    const discountedPrice = food.offer > 0 
      ? Math.round(food.price - (food.price * food.offer) / 100) 
      : food.price;

    if (idx > -1) {
      cart[idx].quantity = quantity;
      cart[idx].price = discountedPrice; // Update price in case offer changed
    } else {
      cart.push({
        id,
        name: food.name,
        price: discountedPrice,
        quantity,
        img: food.img,
      });
    }
    user.cart = cart;
    await user.save();
    res.json({ items: cart });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const removeItem = async (req, res) => {
  const { id } = req.params; // this will be a string
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    let cart = getCartFromUser(user);

    cart = cart.filter((item) => item.id.toString() !== id.toString());

    user.cart = cart;
    await user.save();

    res.json({ items: cart });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { amount, currency } = req.body;

    const options = {
      amount: amount * 100, // Razorpay expects paise
      currency: currency || "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Verify payment
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      if (!req.userId) {
        return res.json({
          success: true,
          message: "Payment verified successfully, but no user ID found to process order",
        });
      }

      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      if (user.cart.length === 0) {
        return res.json({
          success: true,
          message: "Payment verified, but cart was already empty",
        });
      }

      // Calculate total amount from cart items
      const totalAmount = user.cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      // Create new order record for dashboard
      const newOrder = new Order({
        userName: user.name,
        phone: user.phone,
        food: user.cart,
        payment: "Online",
        amount: totalAmount,
        status: "Ordered",
      });

      await newOrder.save();

      // Clear the user's cart
      user.cart = [];
      await user.save();

      return res.json({
        success: true,
        message: "Payment verified, order created, and cart cleared",
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid signature" });
    }
  } catch (err) {
    console.error("Verify payment error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
