import React from "react";
import { 
  DollarSign, 
  ShoppingBag, 
  TrendingUp, 
  Users, 
  ArrowUpRight,
  ArrowDownRight,
  Package,
  CheckCircle2,
  XCircle,
  Clock
} from "lucide-react";

interface Stats {
  totalOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  pendingOrders: number;
  totalRevenue: number;
}

interface AnalyticsOverviewProps {
  stats: Stats;
  loading: boolean;
}

const AnalyticsOverview: React.FC<AnalyticsOverviewProps> = ({ stats, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-gray-200 rounded-3xl"></div>
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: "Total Revenue",
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "bg-emerald-500",
      trend: "+12.5%",
      isUp: true,
      description: "Lifetime earnings from delivered orders"
    },
    {
      title: "Active Orders",
      value: stats.pendingOrders,
      icon: Clock,
      color: "bg-orange-500",
      trend: "Real-time",
      isUp: true,
      description: "Orders currently being processed"
    },
    {
      title: "Completed",
      value: stats.deliveredOrders,
      icon: CheckCircle2,
      color: "bg-blue-500",
      trend: `${((stats.deliveredOrders / stats.totalOrders) * 100 || 0).toFixed(0)}%`,
      isUp: true,
      description: "Successfully delivered orders"
    },
    {
      title: "Cancellation Rate",
      value: `${((stats.cancelledOrders / stats.totalOrders) * 100 || 0).toFixed(1)}%`,
      icon: XCircle,
      color: "bg-rose-500",
      trend: stats.cancelledOrders,
      isUp: false,
      description: "Percentage of orders cancelled"
    }
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Analytics Overview</h2>
          <p className="text-gray-500 font-medium">Track your restaurant's performance and growth</p>
        </div>
        <div className="px-4 py-2 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-xs font-black text-gray-900 uppercase tracking-widest">Live Updates</span>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => (
          <div 
            key={idx} 
            className="group relative bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 ${card.color}/5 rounded-full -mr-16 -mt-16 transition-transform duration-500 group-hover:scale-150`}></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 ${card.color} text-white rounded-2xl shadow-lg shadow-${card.color.split('-')[1]}-500/20`}>
                  <card.icon className="w-6 h-6" />
                </div>
                <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black ${
                  card.isUp ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                }`}>
                  {card.isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {card.trend}
                </div>
              </div>
              
              <div className="mt-auto">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{card.title}</p>
                <div className="flex items-baseline gap-2">
                    <h3 className="text-3xl font-black text-gray-900 leading-none">{card.value}</h3>
                </div>
                <p className="text-xs text-gray-500 mt-3 font-medium line-clamp-1">{card.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Stats Section */}
      <div className="grid grid-cols-1 gap-8">
        <div className="bg-gray-900 rounded-[3rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-gray-900/30">
            <div className="absolute top-0 right-0 p-8 opacity-10">
                <TrendingUp className="w-64 h-64" />
            </div>
            <div className="relative z-10">
                <h4 className="text-xl md:text-2xl font-bold mb-2">Performance Summary</h4>
                <p className="text-gray-400 mb-8 max-w-2xl text-lg">Your revenue has increased by 12% compared to last week. Keep up the great work!</p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
                    <div>
                        <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Success Rate</p>
                        <p className="text-4xl md:text-5xl font-black">{((stats.deliveredOrders / stats.totalOrders) * 100 || 0).toFixed(0)}%</p>
                    </div>
                    <div>
                        <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Total Volume</p>
                        <p className="text-4xl md:text-5xl font-black">{stats.totalOrders}</p>
                    </div>
                    <div>
                        <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Ave. Order Value</p>
                        <p className="text-4xl md:text-5xl font-black">₹{(stats.totalRevenue / stats.deliveredOrders || 0).toFixed(0)}</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsOverview;
