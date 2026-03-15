import { useState, useEffect } from "react";
import { BarChart3, TrendingUp, Users, ShoppingCart, DollarSign, Calendar, ArrowUp, ArrowDown } from "lucide-react";

interface AnalyticsData {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  averageOrderValue: number;
  revenueGrowth: number;
  orderGrowth: number;
  customerGrowth: number;
  monthlyRevenue: { month: string; revenue: number }[];
  topProducts: { name: string; sales: number; revenue: number }[];
  customerStats: {
    new: number;
    returning: number;
    vip: number;
  };
}

const Analytics = () => {
  const [data, setData] = useState<AnalyticsData>({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    averageOrderValue: 0,
    revenueGrowth: 0,
    orderGrowth: 0,
    customerGrowth: 0,
    monthlyRevenue: [],
    topProducts: [],
    customerStats: {
      new: 0,
      returning: 0,
      vip: 0,
    },
  });

  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d" | "1y">("30d");

  useEffect(() => {
    // Load data from localStorage and calculate analytics
    const orders = JSON.parse(localStorage.getItem("customerOrders") || "[]");
    const customers = JSON.parse(localStorage.getItem("customers") || "[]");
    const messages = JSON.parse(localStorage.getItem("customerMessages") || "[]");

    // Calculate basic metrics
    const totalRevenue = orders
      .filter((o: any) => o.status === "delivered" && o.paymentStatus === "paid")
      .reduce((sum: number, o: any) => sum + (o.total || 0), 0);

    const totalOrders = orders.length;
    const totalCustomers = customers.length;
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Generate mock monthly revenue data
    const monthlyRevenue = [
      { month: "Jan", revenue: 4500 },
      { month: "Feb", revenue: 5200 },
      { month: "Mar", revenue: 4800 },
      { month: "Apr", revenue: 6100 },
      { month: "May", revenue: 5900 },
      { month: "Jun", revenue: 7200 },
    ];

    // Generate mock top products
    const topProducts = [
      { name: "Website Design", sales: 15, revenue: 7500 },
      { name: "E-commerce Development", sales: 8, revenue: 12000 },
      { name: "Mobile App", sales: 5, revenue: 8500 },
      { name: "SEO Optimization", sales: 12, revenue: 3600 },
      { name: "Content Management", sales: 10, revenue: 2500 },
    ];

    // Calculate customer stats
    const newCustomers = customers.filter((c: any) => {
      const createdAt = new Date(c.registrationDate);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return createdAt > thirtyDaysAgo;
    }).length;

    const vipCustomers = customers.filter((c: any) => c.status === "vip").length;
    const returningCustomers = customers.length - newCustomers;

    setData({
      totalRevenue,
      totalOrders,
      totalCustomers,
      averageOrderValue,
      revenueGrowth: 15.3,
      orderGrowth: 8.7,
      customerGrowth: 12.5,
      monthlyRevenue,
      topProducts,
      customerStats: {
        new: newCustomers,
        returning: returningCustomers,
        vip: vipCustomers,
      },
    });
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const GrowthIndicator = ({ value }: { value: number }) => (
    <div className={`flex items-center gap-1 ${value >= 0 ? "text-green-600" : "text-red-600"}`}>
      {value >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
      <span className="font-medium">{Math.abs(value)}%</span>
    </div>
  );

  const MetricCard = ({ title, value, growth, icon: Icon, color }: {
    title: string;
    value: string | number;
    growth?: number;
    icon: any;
    color: string;
  }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`${color} p-3 rounded-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {growth !== undefined && <GrowthIndicator value={growth} />}
      </div>
      <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">Track your business performance and insights</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value as any)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none cursor-pointer"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="1y">Last year</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          value={formatCurrency(data.totalRevenue)}
          growth={data.revenueGrowth}
          icon={DollarSign}
          color="bg-green-500"
        />
        <MetricCard
          title="Total Orders"
          value={data.totalOrders}
          growth={data.orderGrowth}
          icon={ShoppingCart}
          color="bg-blue-500"
        />
        <MetricCard
          title="Total Customers"
          value={data.totalCustomers}
          growth={data.customerGrowth}
          icon={Users}
          color="bg-purple-500"
        />
        <MetricCard
          title="Avg. Order Value"
          value={formatCurrency(data.averageOrderValue)}
          icon={BarChart3}
          color="bg-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Revenue Overview</h2>
          <div className="space-y-4">
            {data.monthlyRevenue.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">{item.month}</span>
                <div className="flex items-center gap-4">
                  <div className="flex-1 mx-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${(item.revenue / Math.max(...data.monthlyRevenue.map(r => r.revenue))) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 min-w-[80px] text-right">
                    {formatCurrency(item.revenue)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Stats */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Customer Distribution</h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">New Customers</span>
                <span className="text-sm font-bold text-gray-900">{data.customerStats.new}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${(data.customerStats.new / data.totalCustomers) * 100}%`
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">Returning Customers</span>
                <span className="text-sm font-bold text-gray-900">{data.customerStats.returning}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${(data.customerStats.returning / data.totalCustomers) * 100}%`
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">VIP Customers</span>
                <span className="text-sm font-bold text-gray-900">{data.customerStats.vip}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-purple-500 h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${(data.customerStats.vip / data.totalCustomers) * 100}%`
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Top Products/Services</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Product/Service</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Sales</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Revenue</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Avg. Price</th>
              </tr>
            </thead>
            <tbody>
              {data.topProducts.map((product, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <span className="text-xs font-semibold text-primary">{index + 1}</span>
                      </div>
                      <span className="font-medium text-gray-900">{product.name}</span>
                    </div>
                  </td>
                  <td className="text-right py-3 px-4">
                    <span className="font-medium text-gray-900">{product.sales}</span>
                  </td>
                  <td className="text-right py-3 px-4">
                    <span className="font-semibold text-gray-900">{formatCurrency(product.revenue)}</span>
                  </td>
                  <td className="text-right py-3 px-4">
                    <span className="text-gray-600">{formatCurrency(product.revenue / product.sales)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Conversion Rate</p>
              <p className="text-3xl font-bold mt-1">3.2%</p>
              <p className="text-blue-100 text-sm mt-2">+0.5% from last month</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Customer Satisfaction</p>
              <p className="text-3xl font-bold mt-1">4.8/5</p>
              <p className="text-green-100 text-sm mt-2">Based on 127 reviews</p>
            </div>
            <Users className="w-8 h-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Active Projects</p>
              <p className="text-3xl font-bold mt-1">12</p>
              <p className="text-purple-100 text-sm mt-2">3 due this week</p>
            </div>
            <Calendar className="w-8 h-8 text-purple-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
