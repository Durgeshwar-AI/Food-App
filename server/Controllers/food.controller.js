import Food from "../Models/food.model.js";

// GET /getFood - fetch all food items
export const getAllFood = async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json({ success: true, data: foods });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch food", error });
  }
};

// POST /addFood - add a new food item
export const addFood = async (req, res) => {
  try {
    const { img, name, description, price, offer } = req.body;

    if (!img || !name || !description || !price) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const newFood = new Food({ img, name, description, price, offer });
    const savedFood = await newFood.save();

    res.status(201).json({ success: true, message: "Food added", data: savedFood });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add food", error });
  }
};

// DELETE /deleteFood/:id - delete food by ID
export const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFood = await Food.findByIdAndDelete(id);

    if (!deletedFood) {
      return res.status(404).json({ success: false, message: "Food not found" });
    }

    res.status(200).json({ success: true, message: "Food deleted", data: deletedFood });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete food", error });
  }
};

// PATCH /updateFood/:id - update food by ID
export const updateFood = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedFood = await Food.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedFood) {
      return res.status(404).json({ success: false, message: "Food not found" });
    }

    res.status(200).json({ success: true, message: "Food updated", data: updatedFood });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update food", error });
  }
};
