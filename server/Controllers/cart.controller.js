const User = require("../Models/user.model");
const Food = require("../Models/food.model.js");

// Helper: get cart from user doc
const getCartFromUser = (user) => user.cart || [];

exports.getCart = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ items: getCartFromUser(user) });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.addOrUpdateItem = async (req, res) => {
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
    if (idx > -1) {
      cart[idx].quantity = quantity;
    } else {
      cart.push({ id, name: food.name, price: food.price, quantity });
    }
    user.cart = cart;
    await user.save();
    res.json({ items: cart });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.removeItem = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    let cart = getCartFromUser(user);
    cart = cart.filter((item) => item.id !== id && item.id !== Number(id));
    user.cart = cart;
    await user.save();
    res.json({ items: cart });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
