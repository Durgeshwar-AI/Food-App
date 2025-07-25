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
      status: "Ordered"
    });
    await order.save()
    res.status(201).json({message:"Order placed"})
  } catch (err) {
    res.status(500).json({message:"Error in creating order"})
  }
};

export const orderDelivered = async (req, res) => {
  try {
    const orderId = req.params.id;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: "Delivered" },
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order marked as delivered",
      order: updatedOrder,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const orderCanceled = async (req,res)=>{
  try {
    const orderId = req.params.id;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: "Cancelled" },
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order marked as cancelled",
      order: updatedOrder,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const orderHistory = async (req, res) => {
  try {
    const history = await Order.find({ status: { $in: ["Delivered", "Cancelled"] } });

    if (history.length === 0) {
      return res.status(200).json({ message: "No history available" });
    }

    return res.status(200).json({ history });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
