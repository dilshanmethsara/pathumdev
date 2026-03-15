import { useState } from "react";
import { Users, Mail, Phone, ShoppingBag, Eye, Edit, Trash2 } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  totalOrders: number;
  totalSpent: number;
  status: "active" | "inactive" | "vip";
  registrationDate: string;
}

const CustomersManagement = () => {
  const [customers] = useState<Customer[]>([
    {
      id: "CUST-001",
      name: "John Smith",
      email: "john@example.com",
      phone: "+1 555-1234",
      totalOrders: 3,
      totalSpent: 1500,
      status: "active",
      registrationDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "CUST-002",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      totalOrders: 5,
      totalSpent: 3200,
      status: "vip",
      registrationDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "CUST-003",
      name: "Mike Davis",
      email: "mike@example.com",
      phone: "+1 555-5678",
      totalOrders: 1,
      totalSpent: 600,
      status: "active",
      registrationDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-700";
      case "inactive": return "bg-gray-100 text-gray-700";
      case "vip": return "bg-purple-100 text-purple-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
        <p className="text-gray-600">Manage your customer base.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">All Customers</h2>
            <span className="text-sm text-gray-500">{customers.length} total</span>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {customers.map((customer) => (
            <div key={customer.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-900">{customer.name}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(customer.status)}`}>
                        {customer.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                      <span className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {customer.email}
                      </span>
                      {customer.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {customer.phone}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                      <span className="flex items-center gap-1">
                        <ShoppingBag className="w-4 h-4" />
                        {customer.totalOrders} orders
                      </span>
                      <span>${customer.totalSpent} spent</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Joined {new Date(customer.registrationDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <Edit className="w-4 h-4" />
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
          <Users className="w-5 h-5 text-yellow-600" />
          <p className="text-yellow-700">
            This is showing static demo customers. Connect to a backend to manage real customers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomersManagement;
