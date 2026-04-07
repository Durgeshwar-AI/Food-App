import Offer from "../Models/offer.model.js";

export const getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: offers });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch offers" });
  }
};

export const addOffer = async (req, res) => {
  try {
    const { title, discount, code, validUntil, description, status } = req.body;
    const newOffer = new Offer({
      title,
      discount,
      code,
      validUntil,
      description,
      status,
    });
    await newOffer.save();
    res.status(201).json({ success: true, message: "Offer added", data: newOffer });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add offer", error });
  }
};

export const updateOffer = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedOffer = await Offer.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedOffer) {
      return res.status(404).json({ success: false, message: "Offer not found" });
    }
    res.status(200).json({ success: true, message: "Offer updated", data: updatedOffer });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update offer" });
  }
};

export const deleteOffer = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOffer = await Offer.findByIdAndDelete(id);
    if (!deletedOffer) {
      return res.status(404).json({ success: false, message: "Offer not found" });
    }
    res.status(200).json({ success: true, message: "Offer deleted", data: deletedOffer });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete offer" });
  }
};
