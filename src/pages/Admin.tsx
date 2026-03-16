import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MessageSquare, ShoppingCart, Users, BarChart3, LogOut, Menu, X, Lock, FileText } from "lucide-react";
import AdminDashboard from "../components/admin/AdminDashboard";
import MessagesManagement from "../components/admin/MessagesManagement";
import OrdersManagement from "../components/admin/OrdersManagement";
import CustomersManagement from "../components/admin/CustomersManagement";
import Analytics from "../components/admin/Analytics";
import BlogManagement from "../components/admin/BlogManagement";

type AdminSection = "dashboard" | "messages" | "orders" | "customers" | "analytics" | "blog";

const Admin = () => {
  const [activeSection, setActiveSection] = useState<AdminSection>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Simple authentication check - just check localStorage
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple password check - no backend needed
    if (password === "pathum1234") {
      localStorage.setItem("adminToken", "simple-token");
      setIsAuthenticated(true);
    } else {
      alert("Invalid password. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
    navigate("/");
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "customers", label: "Customers", icon: Users },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "blog", label: "Blog Posts", icon: FileText },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <AdminDashboard />;
      case "messages":
        return <MessagesManagement />;
      case "orders":
        return <OrdersManagement />;
      case "customers":
        return <CustomersManagement />;
      case "analytics":
        return <Analytics />;
      case "blog":
        return <BlogManagement />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {!isAuthenticated ? (
        // Login Form
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Access</h1>
              <p className="text-gray-600 mt-2">Enter password to access the admin panel</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                Access Admin Panel
              </button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-4">
              <a href="/" className="hover:text-primary transition-colors">← Back to Website</a>
            </p>
          </div>
        </div>
      ) : (
        // Admin Dashboard
        <>
          {/* Header */}
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 cursor-button"
                  >
                    {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                  <h1 className="ml-4 text-xl font-semibold text-gray-900">Admin Panel</h1>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors cursor-button"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          </header>

          <div className="flex">
            {/* Sidebar */}
            <aside className={`
              fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 mt-16 lg:mt-0
              ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
              <nav className="p-4 space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveSection(item.id as AdminSection);
                        setSidebarOpen(false);
                      }}
                      className={`
                        w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors cursor-button
                        ${activeSection === item.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                        }
                      `}
                    >
                      <Icon size={18} />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </aside>

            {/* Overlay for mobile */}
            {sidebarOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}

            {/* Main Content */}
            <main className="flex-1 p-6 lg:p-8">
              <div className="max-w-7xl mx-auto">
                {renderContent()}
              </div>
            </main>
          </div>
        </>
      )}
    </div>
  );
};

export default Admin;
