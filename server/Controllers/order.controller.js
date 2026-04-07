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
      status: "Ordered",
    });
    await order.save();
    res.status(201).json({ success: true, message: "Order placed", data: order });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error in creating order" });
  }
};

export const getDashboardOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      message: `Order status updated to ${status}`,
      data: updatedOrder,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const orderDelivered = async (req, res) => {
  try {
    const orderId = req.params.id;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: "Delivered" },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      message: "Order marked as delivered",
      data: updatedOrder,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const orderCanceled = async (req, res) => {
  try {
    const orderId = req.params.id;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: "Cancelled" },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      message: "Order marked as cancelled",
      data: updatedOrder,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const orderHistory = async (req, res) => {
  try {
    const history = await Order.find({
      status: { $in: ["Delivered", "Cancelled"] },
    }).sort({ createdAt: -1 });

    return res.status(200).json({ success: true, history });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const deliveredOrders = await Order.countDocuments({ status: "Delivered" });
    const cancelledOrders = await Order.countDocuments({ status: "Cancelled" });
    const pendingOrders = totalOrders - deliveredOrders - cancelledOrders;

    const revenueResult = await Order.aggregate([
      { $match: { status: "Delivered" } },
      { $group: { _id: null, totalRevenue: { $sum: "$amount" } } },
    ]);

    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

    // Last 7 days orders for chart
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const stats = {
      totalOrders,
      deliveredOrders,
      cancelledOrders,
      pendingOrders,
      totalRevenue,
    };

    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch stats" });
  }
};
