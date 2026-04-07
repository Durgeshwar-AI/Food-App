import React from "react";
import { 
  CheckCircle, 
  Clock, 
  XCircle, 
  Truck, 
  ChevronRight,
  User,
  Phone,
  CreditCard,
  AlertCircle,
  ShoppingBag
} from "lucide-react";

interface OrderItem {
  name: string;
  quantity: number;
}

interface Order {
  _id: string;
  userName: string;
  phone: string;
  food: any[]; // Depends on how food is stored, usually an array of objects
  payment: string;
  amount: number;
  status: string;
  createdAt: string;
}

interface OrderManagementProps {
  orders: Order[];
  onUpdateStatus: (id: string, status: string) => void;
  loading: boolean;
}

const OrderManagement: React.FC<OrderManagementProps> = ({
  orders,
  onUpdateStatus,
  loading,
}) => {
  const [activeTab, setActiveTab] = React.useState<"active" | "history">("active");

  const activeOrders = orders.filter(
    (o) => o.status !== "Delivered" && o.status !== "Cancelled"
  );
  const historyOrders = orders.filter(
    (o) => o.status === "Delivered" || o.status === "Cancelled"
  );

  const currentOrders = activeTab === "active" ? activeOrders : historyOrders;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "ordered":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "preparing":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "ready":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "delivered":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "cancelled":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "ordered":
        return <Clock className="w-4 h-4" />;
      case "preparing":
        return <ChevronRight className="w-4 h-4" />;
      case "ready":
        return <AlertCircle className="w-4 h-4" />;
      case "delivered":
        return <CheckCircle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-2">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">Orders</h2>
            <div className="px-3 py-1 bg-white rounded-xl border border-gray-100 shadow-sm">
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{orders.length} TOTAL</span>
            </div>
          </div>
          <p className="text-gray-500 font-medium max-w-md">
            {activeTab === "active" 
                ? "Manage and track real-time customer orders from preparation to delivery." 
                : "Review and manage your completed and cancelled order history."}
          </p>
        </div>

        {/* Sub-Tab Control */}
        <div className="flex bg-gray-100/50 p-1.5 rounded-[1.5rem] border border-gray-200/50 backdrop-blur-sm self-start lg:self-auto">
            <button
                onClick={() => setActiveTab("active")}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-[1.25rem] text-sm font-black transition-all duration-300 ${
                    activeTab === "active" 
                    ? "bg-white text-orange-600 shadow-lg shadow-orange-500/5 scale-100" 
                    : "text-gray-400 hover:text-gray-600 hover:bg-white/50 scale-95"
                }`}
            >
                <Clock className="w-4 h-4" />
                Live Orders
                <span className={`ml-1 px-2 py-0.5 rounded-full text-[10px] ${activeTab === "active" ? "bg-orange-100 text-orange-600" : "bg-gray-200 text-gray-500"}`}>
                    {activeOrders.length}
                </span>
            </button>
            <button
                onClick={() => setActiveTab("history")}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-[1.25rem] text-sm font-black transition-all duration-300 ${
                    activeTab === "history" 
                    ? "bg-white text-gray-900 shadow-lg shadow-gray-500/5 scale-100" 
                    : "text-gray-400 hover:text-gray-600 hover:bg-white/50 scale-95"
                }`}
            >
                <CheckCircle className="w-4 h-4" />
                Order History
                <span className={`ml-1 px-2 py-0.5 rounded-full text-[10px] ${activeTab === "history" ? "bg-gray-100 text-gray-600" : "bg-gray-200 text-gray-500"}`}>
                    {historyOrders.length}
                </span>
            </button>
        </div>
      </div>

      {currentOrders.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-gray-100 shadow-sm">
          <div className="inline-flex items-center justify-center p-6 bg-gray-50 rounded-full mb-6">
            <ShoppingBag className="w-12 h-12 text-gray-300" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No {activeTab} orders found</h3>
          <p className="text-gray-500 max-w-xs mx-auto">
            {activeTab === "active" 
                ? "New orders from customers will appear here automatically." 
                : "Delivered or cancelled orders will be archived here for your records."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {currentOrders.map((order) => (
          <div 
            key={order._id}
            className="group bg-white rounded-[2rem] border border-gray-100 hover:border-orange-500/30 shadow-sm hover:shadow-2xl hover:shadow-orange-500/5 transition-all duration-300 overflow-hidden"
          >
            <div className="p-6 md:p-8">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                {/* Order Info */}
                <div className="flex-1 space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-4 py-1.5 bg-gray-900 text-white text-xs font-black uppercase tracking-widest rounded-full">
                      ID: {order._id.slice(-6)}
                    </span>
                    <div className={`flex items-center gap-2 px-4 py-1.5 border rounded-full text-xs font-black uppercase tracking-widest ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </div>
                    <span className="text-sm text-gray-400 font-medium ml-auto lg:ml-0">
                      {order.createdAt 
                        ? new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
                        : "Just Now"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                      <div className="p-2 bg-white rounded-xl shadow-sm">
                        <User className="w-5 h-5 text-orange-500" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Customer</p>
                        <p className="font-bold text-gray-900">{order.userName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                      <div className="p-2 bg-white rounded-xl shadow-sm">
                        <Phone className="w-5 h-5 text-green-500" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Phone</p>
                        <p className="font-bold text-gray-900">{order.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-50/50 rounded-3xl p-6 border border-orange-100">
                    <h4 className="text-xs font-black text-orange-900 uppercase tracking-widest mb-4">Order Details</h4>
                    <div className="space-y-3">
                      {order.food.map((item: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between py-2 border-b border-orange-200/50 last:border-0">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-orange-600 font-black text-xs shadow-sm">
                              {item.qty || item.quantity || 1}x
                            </div>
                            <span className="font-bold text-gray-900">{item.name}</span>
                          </div>
                          <span className="text-sm font-bold text-orange-600">₹{item.price * (item.qty || item.quantity || 1)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="lg:w-80 space-y-4">
                  <div className="p-6 bg-gray-900 rounded-3xl text-white shadow-xl shadow-gray-900/20">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-orange-500" />
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Total Amount</span>
                      </div>
                      <span className="text-xs font-bold px-2 py-1 bg-white/10 rounded-lg">{order.payment}</span>
                    </div>
                    <p className="text-4xl font-black">₹{order.amount}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {order.status === "Ordered" && (
                      <button 
                        onClick={() => onUpdateStatus(order._id, "Preparing")}
                        className="col-span-2 py-4 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-2xl transition-all active:scale-95 shadow-lg shadow-orange-500/20"
                      >
                        Accept & Prepare
                      </button>
                    )}
                    {order.status === "Preparing" && (
                      <button 
                        onClick={() => onUpdateStatus(order._id, "Ready")}
                        className="col-span-2 py-4 bg-purple-500 hover:bg-purple-600 text-white font-black rounded-2xl transition-all active:scale-95 shadow-lg shadow-purple-500/20"
                      >
                        Mark as Ready
                      </button>
                    )}
                    {order.status === "Ready" && (
                      <button 
                        onClick={() => onUpdateStatus(order._id, "Delivered")}
                        className="col-span-2 py-4 bg-green-500 hover:bg-green-600 text-white font-black rounded-2xl transition-all active:scale-95 shadow-lg shadow-green-500/20"
                      >
                        Mark as Delivered
                      </button>
                    )}
                    {order.status !== "Delivered" && order.status !== "Cancelled" && (
                      <button 
                        onClick={() => onUpdateStatus(order._id, "Cancelled")}
                        className="col-span-2 py-4 bg-white border-2 border-red-100 text-red-500 hover:bg-red-50 font-black rounded-2xl transition-all active:scale-95"
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
