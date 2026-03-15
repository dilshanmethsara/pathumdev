import { useState, useEffect } from "react";
import { Users, Search, Filter, Trash2, Eye, Mail, Phone, Calendar, MapPin, Star } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
  lastOrderDate?: string;
  registrationDate: string;
  status: "active" | "inactive" | "vip";
  notes?: string;
}

const CustomersManagement = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive" | "vip">("all");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    // Load customers from localStorage or generate mock data
    const storedCustomers = JSON.parse(localStorage.getItem("customers") || "[]");
    
    // If no customers exist, create some mock data
    if (storedCustomers.length === 0) {
      const mockCustomers: Customer[] = [
        {
          id: "1",
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "+1 234-567-8900",
          address: {
            street: "123 Main St",
            city: "New York",
            state: "NY",
            zipCode: "10001",
            country: "USA"
          },
          totalOrders: 5,
          totalSpent: 1250.00,
          averageOrderValue: 250.00,
          lastOrderDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          registrationDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          status: "vip"
        },
        {
          id: "2",
          name: "Jane Smith",
          email: "jane.smith@example.com",
          phone: "+1 234-567-8901",
          address: {
            street: "456 Oak Ave",
            city: "Los Angeles",
            state: "CA",
            zipCode: "90001",
            country: "USA"
          },
          totalOrders: 3,
          totalSpent: 450.00,
          averageOrderValue: 150.00,
          lastOrderDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          registrationDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
          status: "active"
        },
        {
          id: "3",
          name: "Bob Johnson",
          email: "bob.johnson@example.com",
          totalOrders: 1,
          totalSpent: 75.00,
          averageOrderValue: 75.00,
          registrationDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
          status: "inactive"
        }
      ];
      
      localStorage.setItem("customers", JSON.stringify(mockCustomers));
      setCustomers(mockCustomers);
      setFilteredCustomers(mockCustomers);
    } else {
      setCustomers(storedCustomers);
      setFilteredCustomers(storedCustomers);
    }
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = customers;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (customer) =>
          customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (customer.phone && customer.phone.includes(searchTerm))
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((customer) => customer.status === statusFilter);
    }

    setFilteredCustomers(filtered);
  }, [customers, searchTerm, statusFilter]);

  const updateCustomerStatus = (customerId: string, newStatus: Customer["status"]) => {
    const updatedCustomers = customers.map((customer) =>
      customer.id === customerId ? { ...customer, status: newStatus } : customer
    );
    setCustomers(updatedCustomers);
    localStorage.setItem("customers", JSON.stringify(updatedCustomers));
  };

  const deleteCustomer = (customerId: string) => {
    const updatedCustomers = customers.filter((customer) => customer.id !== customerId);
    setCustomers(updatedCustomers);
    localStorage.setItem("customers", JSON.stringify(updatedCustomers));
    if (selectedCustomer?.id === customerId) {
      setSelectedCustomer(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "vip":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const statusCounts = {
    active: customers.filter((c) => c.status === "active").length,
    inactive: customers.filter((c) => c.status === "inactive").length,
    vip: customers.filter((c) => c.status === "vip").length,
  };

  const totalRevenue = customers.reduce((sum, customer) => sum + customer.totalSpent, 0);
  const averageCustomerValue = customers.length > 0 ? totalRevenue / customers.length : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600">Manage customer information and relationships</p>
        </div>
      </div>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="bg-blue-500 p-3 rounded-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-600">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="bg-green-500 p-3 rounded-lg">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-600">VIP Customers</p>
              <p className="text-2xl font-bold text-gray-900">{statusCounts.vip}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="bg-purple-500 p-3 rounded-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">{statusCounts.active}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="bg-orange-500 p-3 rounded-lg">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-600">Avg. Value</p>
              <p className="text-2xl font-bold text-gray-900">${averageCustomerValue.toFixed(0)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none cursor-text-input"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="vip">VIP</option>
          </select>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Filter className="w-4 h-4" />
            {filteredCustomers.length} of {customers.length} customers
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customers List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredCustomers.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No customers found</p>
            </div>
          ) : (
            filteredCustomers.map((customer) => (
              <div
                key={customer.id}
                className={`bg-white rounded-xl shadow-sm border p-6 cursor-pointer transition-all hover:shadow-md ${
                  selectedCustomer?.id === customer.id ? "ring-2 ring-primary/20" : "border-gray-200"
                }`}
                onClick={() => setSelectedCustomer(customer)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{customer.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(customer.status)}`}>
                        {customer.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{customer.email}</p>
                    {customer.phone && (
                      <p className="text-sm text-gray-500">{customer.phone}</p>
                    )}
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span>{customer.totalOrders} orders</span>
                      <span className="font-semibold text-gray-900">${customer.totalSpent.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteCustomer(customer.id);
                      }}
                      className="p-2 text-red-400 hover:text-red-600 transition-colors cursor-button"
                      title="Delete customer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Joined {formatDate(customer.registrationDate)}
                  </div>
                  {customer.lastOrderDate && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Last order {formatDate(customer.lastOrderDate)}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Customer Detail */}
        <div className="lg:col-span-1">
          {selectedCustomer ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Customer Details</h2>
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="p-1 text-gray-400 hover:text-gray-600 cursor-button"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Name</label>
                  <p className="font-semibold text-gray-900">{selectedCustomer.name}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <p className="text-gray-600">{selectedCustomer.email}</p>
                </div>

                {selectedCustomer.phone && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Phone</label>
                    <p className="text-gray-600">{selectedCustomer.phone}</p>
                  </div>
                )}

                {selectedCustomer.address && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Address</label>
                    <p className="text-gray-900">
                      {selectedCustomer.address.street}<br />
                      {selectedCustomer.address.city}, {selectedCustomer.address.state} {selectedCustomer.address.zipCode}<br />
                      {selectedCustomer.address.country}
                    </p>
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium text-gray-700">Status</label>
                  <div className="mt-2">
                    <select
                      value={selectedCustomer.status}
                      onChange={(e) => updateCustomerStatus(selectedCustomer.id, e.target.value as any)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none cursor-pointer"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="vip">VIP</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Total Orders</label>
                    <p className="text-xl font-bold text-gray-900">{selectedCustomer.totalOrders}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Total Spent</label>
                    <p className="text-xl font-bold text-gray-900">${selectedCustomer.totalSpent.toFixed(2)}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Average Order Value</label>
                  <p className="text-xl font-bold text-gray-900">${selectedCustomer.averageOrderValue.toFixed(2)}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Registration Date</label>
                  <p className="text-gray-600">{formatDate(selectedCustomer.registrationDate)}</p>
                </div>

                {selectedCustomer.lastOrderDate && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Last Order</label>
                    <p className="text-gray-600">{formatDate(selectedCustomer.lastOrderDate)}</p>
                  </div>
                )}

                {selectedCustomer.notes && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Notes</label>
                    <p className="text-gray-900 mt-1">{selectedCustomer.notes}</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Select a customer to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomersManagement;
