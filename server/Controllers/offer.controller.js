import Offer from "../Models/offer.model.js";

export const getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: offers });
  } catch (error) {
    console.error("Error fetching offers:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch offers",
      details: error.message,
    });
  }
};

export const addOffer = async (req, res) => {
  try {
    const { title, discount, code, validUntil, description, status } = req.body;

    // Validation
    if (!title || !discount || !code || !validUntil || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if code already exists
    const existingOffer = await Offer.findOne({ code: code.toUpperCase() });
    if (existingOffer) {
      return res.status(400).json({
        success: false,
        message: "Coupon code already exists",
      });
    }

    const newOffer = new Offer({
      title,
      discount: parseFloat(discount),
      code: code.toUpperCase(),
      validUntil: new Date(validUntil),
      description,
      status: status || "active",
    });
    await newOffer.save();
    res
      .status(201)
      .json({ success: true, message: "Offer added", data: newOffer });
  } catch (error) {
    console.error("Error adding offer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add offer",
      details: error.message,
    });
  }
};

export const updateOffer = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Convert code to uppercase if present
    if (updates.code) {
      updates.code = updates.code.toUpperCase();

      // Check if the new code already exists (excluding current offer)
      const existingOffer = await Offer.findOne({
        code: updates.code,
        _id: { $ne: id },
      });
      if (existingOffer) {
        return res.status(400).json({
          success: false,
          message: "Coupon code already exists",
        });
      }
    }

    // Parse discount if it's a string
    if (updates.discount) {
      updates.discount = parseFloat(updates.discount);
    }

    // Parse validUntil if it's a string
    if (updates.validUntil) {
      updates.validUntil = new Date(updates.validUntil);
    }

    const updatedOffer = await Offer.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedOffer) {
      return res
        .status(404)
        .json({ success: false, message: "Offer not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Offer updated", data: updatedOffer });
  } catch (error) {
    console.error("Error updating offer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update offer",
      details: error.message,
    });
  }
};

export const deleteOffer = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOffer = await Offer.findByIdAndDelete(id);
    if (!deletedOffer) {
      return res
        .status(404)
        .json({ success: false, message: "Offer not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Offer deleted", data: deletedOffer });
  } catch (error) {
    console.error("Error deleting offer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete offer",
      details: error.message,
    });
  }
};

export const validateCoupon = async (req, res) => {
  try {
    const { code } = req.params;

    if (!code) {
      return res
        .status(400)
        .json({ success: false, message: "Coupon code is required" });
    }

    const offer = await Offer.findOne({ code: code.toUpperCase() });

    if (!offer) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid coupon code" });
    }

    // Check if offer is active
    if (offer.status !== "active") {
      return res
        .status(400)
        .json({ success: false, message: "This coupon is no longer active" });
    }

    // Check if offer has expired
    if (new Date() > new Date(offer.validUntil)) {
      return res
        .status(400)
        .json({ success: false, message: "This coupon has expired" });
    }

    // Return valid offer with discount percentage
    res.status(200).json({
      success: true,
      message: "Coupon is valid",
      data: {
        id: offer._id,
        code: offer.code,
        discount: offer.discount,
        title: offer.title,
        description: offer.description,
      },
    });
  } catch (error) {
    console.error("Error validating coupon:", error);
    res.status(500).json({
      success: false,
      message: "Failed to validate coupon",
      details: error.message,
    });
  }
};
