import { MessageSquare, ShoppingCart, Users, TrendingUp, Eye, Clock, CheckCircle, AlertCircle } from "lucide-react";

interface DashboardStats {
  totalMessages: number;
  unreadMessages: number;
  totalOrders: number;
  pendingOrders: number;
  totalCustomers: number;
  newCustomers: number;
  revenue: number;
  growth: number;
}

interface RecentActivity {
  id: string;
  type: "message" | "order" | "customer";
  title: string;
  description: string;
  time: string;
  status: "new" | "pending" | "completed";
}

const AdminDashboard = () => {
  // Simple static stats - no backend needed
  const stats: DashboardStats = {
    totalMessages: 12,
    unreadMessages: 3,
    totalOrders: 8,
    pendingOrders: 2,
    totalCustomers: 15,
    newCustomers: 4,
    revenue: 2500,
    growth: 15,
  };

  const recentActivity: RecentActivity[] = [
    { 
      id: "1", 
      type: "message", 
      title: "New Message", 
      description: "John asked about web design services", 
      time: "2 hours ago", 
      status: "new" 
    },
    { 
      id: "2", 
      type: "order", 
      title: "New Order", 
      description: "E-commerce website package ordered", 
      time: "5 hours ago", 
      status: "pending" 
    },
    { 
      id: "3", 
      type: "customer", 
      title: "New Customer", 
      description: "Sarah registered as a new customer", 
      time: "1 day ago", 
      status: "completed" 
    },
  ];

  const statCards = [
    {
      title: "Total Messages",
      value: stats.totalMessages,
      change: stats.unreadMessages,
      changeLabel: "unread",
      icon: MessageSquare,
      color: "bg-blue-500",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      change: stats.pendingOrders,
      changeLabel: "pending",
      icon: ShoppingCart,
      color: "bg-green-500",
    },
    {
      title: "Customers",
      value: stats.totalCustomers,
      change: stats.newCustomers,
      changeLabel: "new this week",
      icon: Users,
      color: "bg-purple-500",
    },
    {
      title: "Revenue",
      value: `$${stats.revenue.toFixed(2)}`,
      change: `+${stats.growth}%`,
      changeLabel: "growth",
      icon: TrendingUp,
      color: "bg-orange-500",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "new":
        return <AlertCircle className="w-4 h-4 text-blue-500" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Eye className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your business.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-500">{stat.changeLabel}</span>
                <span className="text-sm font-medium text-gray-900">{stat.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    {activity.type === "message" && <MessageSquare className="w-5 h-5 text-blue-500" />}
                    {activity.type === "order" && <ShoppingCart className="w-5 h-5 text-green-500" />}
                    {activity.type === "customer" && <Users className="w-5 h-5 text-purple-500" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {getStatusIcon(activity.status)}
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Info Message */}
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Welcome to Admin Panel</h3>
        <p className="text-blue-700">
          This is a simplified admin dashboard with static demo data. 
          Connect to a backend service like Supabase or Firebase to enable real data storage and management.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
