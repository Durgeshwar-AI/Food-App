import Order from "../Models/order.model.js";

export const newOrder = async (req, res) => {
  const { userName, phone, food, payment, amount, additional } = req.body;
  try {
    const order = new Order({
      userName,
      phone,
      food,
      payment,
      amount,
      additional,
    });
    await order.save()
    res.status(201).json({message:"Order placed"})
  } catch (err) {
    res.status(500).json({message:"Error in creating order"})
  }
};

export const orderDelivered = async (req,res)=>{
  
}