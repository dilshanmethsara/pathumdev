import { useState, useEffect } from "react";
import { MessageSquare, ShoppingCart, Users, TrendingUp, Eye, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { messageStorage, CustomerMessage, CustomerOrder, Customer } from "../../lib/messageStorage";

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
  const [stats, setStats] = useState<DashboardStats>({
    totalMessages: 0,
    unreadMessages: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalCustomers: 0,
    newCustomers: 0,
    revenue: 0,
    growth: 0,
  });

  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);

  useEffect(() => {
    // Load data from messageStorage
    const messages = messageStorage.getMessages();
    const orders = messageStorage.getOrders();
    const customers = messageStorage.getCustomers();

    const storageStats = messageStorage.getStats();

    const newCustomersCount = customers.filter((customer) => {
      const createdAt = new Date(customer.registrationDate);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return createdAt > weekAgo;
    }).length;

    setStats({
      totalMessages: storageStats.totalMessages,
      unreadMessages: storageStats.unreadMessages,
      totalOrders: storageStats.totalOrders,
      pendingOrders: storageStats.pendingOrders,
      totalCustomers: storageStats.totalCustomers,
      newCustomers: newCustomersCount,
      revenue: storageStats.totalRevenue,
      growth: 12.5, // Mock growth percentage
    });

    // Prepare recent activity
    const activity: RecentActivity[] = [
      ...messages.slice(0, 3).map((message) => ({
        id: message.id,
        type: "message" as const,
        title: `New message from ${message.name}`,
        description: message.message.substring(0, 50) + "...",
        time: new Date(message.createdAt).toLocaleString(),
        status: message.read ? ("completed" as const) : ("new" as const),
      })),
      ...orders.slice(0, 3).map((order) => ({
        id: order.id,
        type: "order" as const,
        title: `Order #${order.id}`,
        description: `${order.items?.length || 0} items - $${order.total || 0}`,
        time: new Date(order.createdAt).toLocaleString(),
        status: order.status as "pending" | "completed",
      })),
    ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
     .slice(0, 5);

    setRecentActivity(activity);
  }, []);

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
          {recentActivity.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No recent activity</p>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
