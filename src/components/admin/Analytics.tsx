import { useState } from "react";
import { BarChart3, TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Activity } from "lucide-react";

const Analytics = () => {
  const [stats] = useState({
    revenue: 15420,
    revenueChange: 12.5,
    orders: 156,
    ordersChange: 8.3,
    customers: 89,
    customersChange: 15.2,
    conversionRate: 3.2,
    conversionChange: -2.1,
  });

  const [monthlyData] = useState([
    { month: "Jan", revenue: 1200, orders: 12 },
    { month: "Feb", revenue: 1900, orders: 19 },
    { month: "Mar", revenue: 1600, orders: 16 },
    { month: "Apr", revenue: 2100, orders: 21 },
    { month: "May", revenue: 2400, orders: 24 },
    { month: "Jun", revenue: 2800, orders: 28 },
  ]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600">Track your business performance and growth.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.revenue)}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-600">+{stats.revenueChange}%</span>
            <span className="text-sm text-gray-500">vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{stats.orders}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-600">+{stats.ordersChange}%</span>
            <span className="text-sm text-gray-500">vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">New Customers</p>
              <p className="text-2xl font-bold text-gray-900">{stats.customers}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-600">+{stats.customersChange}%</span>
            <span className="text-sm text-gray-500">vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{stats.conversionRate}%</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
              <Activity className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <TrendingDown className="w-4 h-4 text-red-600" />
            <span className="text-sm text-red-600">{stats.conversionChange}%</span>
            <span className="text-sm text-gray-500">vs last month</span>
          </div>
        </div>
      </div>

      {/* Monthly Chart */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Performance</h3>
        <div className="space-y-4">
          {monthlyData.map((data) => (
            <div key={data.month} className="flex items-center gap-4">
              <div className="w-12 text-sm font-medium text-gray-600">{data.month}</div>
              <div className="flex-1">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${(data.revenue / 3000) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-20 text-sm text-gray-600 text-right">
                    {formatCurrency(data.revenue)}
                  </div>
                  <div className="w-16 text-sm text-gray-500 text-right">
                    {data.orders} orders
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-100">
        <div className="flex items-center gap-3">
          <BarChart3 className="w-5 h-5 text-yellow-600" />
          <p className="text-yellow-700">
            This is showing static demo analytics. Connect to a backend to track real business metrics.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
