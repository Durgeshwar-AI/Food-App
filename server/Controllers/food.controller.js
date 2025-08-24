import Food from "../Models/food.model.js";

// GET /getFood - fetch all food items
export const getAllFood = async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json({ success: true, data: foods });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch food", error });
  }
};

export const getPopularFood = async (req, res) => {
  try {
    const foods = await Food.find().sort({ timesOrdered: -1 }).limit(6);
    res.status(200).json({ success: true, data: foods });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch food", error });
  }
};

// GET /search?q= - search foods by name/description/category
export const searchFood = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || String(q).trim().length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Missing search query" });
    }

    const query = String(q).trim();

    // Use a case-insensitive partial match across key fields; prefer text index but fallback to regex
    const results = await Food.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    }).limit(50);

    return res.status(200).json({ success: true, data: results });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to search food", error });
  }
};

// POST /addFood - add a new food item
export const addFood = async (req, res) => {
  console.log("REQ BODY:", req.body);
  try {
    const { img, name, description, price, offer, category } = req.body;
    console.log(img, name, description, price);

    if (!img || !name || !description || !price || !category) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const newFood = new Food({
      img,
      name,
      description,
      price,
      offer,
      category,
    });
    const savedFood = await newFood.save();

    res
      .status(201)
      .json({ success: true, message: "Food added", data: savedFood });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to add food", error });
  }
};

// DELETE /deleteFood/:id - delete food by ID
export const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const deletedFood = await Food.findByIdAndDelete(id);

    if (!deletedFood) {
      return res
        .status(404)
        .json({ success: false, message: "Food not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Food deleted", data: deletedFood });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to delete food", error });
  }
};

// PATCH /updateFood/:id - update food by ID
export const updateFood = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const updates = req.body;

    const updatedFood = await Food.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedFood) {
      return res
        .status(404)
        .json({ success: false, message: "Food not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Food updated", data: updatedFood });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update food", error });
  }
};
