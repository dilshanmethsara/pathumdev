import { useState } from "react";
import { ShoppingCart, CheckCircle, Trash2, Package, Eye } from "lucide-react";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface CustomerOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentMethod: string;
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  createdAt: string;
}

const OrdersManagement = () => {
  const [orders] = useState<CustomerOrder[]>([
    {
      id: "ORD-001",
      customerName: "John Smith",
      customerEmail: "john@example.com",
      customerPhone: "+1 555-1234",
      items: [
        { id: "1", name: "Website Design Package", quantity: 1, price: 1200 },
        { id: "2", name: "SEO Setup", quantity: 1, price: 300 },
      ],
      total: 1500,
      status: "pending",
      paymentMethod: "Credit Card",
      paymentStatus: "pending",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "ORD-002",
      customerName: "Sarah Johnson",
      customerEmail: "sarah@example.com",
      items: [
        { id: "3", name: "E-commerce Store", quantity: 1, price: 2500 },
      ],
      total: 2500,
      status: "processing",
      paymentMethod: "Bank Transfer",
      paymentStatus: "paid",
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "ORD-003",
      customerName: "Mike Davis",
      customerEmail: "mike@example.com",
      items: [
        { id: "4", name: "Website Maintenance", quantity: 6, price: 100 },
      ],
      total: 600,
      status: "delivered",
      paymentMethod: "PayPal",
      paymentStatus: "paid",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "processing": return "bg-blue-100 text-blue-700";
      case "shipped": return "bg-purple-100 text-purple-700";
      case "delivered": return "bg-green-100 text-green-700";
      case "cancelled": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-600">Manage customer orders and payments.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">All Orders</h2>
            <span className="text-sm text-gray-500">{orders.length} total</span>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {orders.map((order) => (
            <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Package className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-900">{order.id}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{order.customerName} • {order.customerEmail}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {order.items.length} items • ${order.total}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <CheckCircle className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-100">
        <div className="flex items-center gap-3">
          <ShoppingCart className="w-5 h-5 text-yellow-600" />
          <p className="text-yellow-700">
            This is showing static demo orders. Connect to a backend to manage real orders.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrdersManagement;
