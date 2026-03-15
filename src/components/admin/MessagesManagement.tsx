import { useState } from "react";
import { MessageSquare, CheckCircle, Trash2, Mail, Eye } from "lucide-react";

interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
  priority: "low" | "medium" | "high";
}

const MessagesManagement = () => {
  const [messages] = useState<Message[]>([
    {
      id: "1",
      name: "John Smith",
      email: "john@example.com",
      phone: "+1 555-1234",
      subject: "Website Design Inquiry",
      message: "I'm interested in getting a website designed for my business. Can you help?",
      read: false,
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      priority: "high",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      subject: "E-commerce Store",
      message: "I need an online store for my handmade jewelry business.",
      read: true,
      created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      priority: "medium",
    },
    {
      id: "3",
      name: "Mike Davis",
      email: "mike@example.com",
      subject: "Website Maintenance",
      message: "Can you help maintain my existing WordPress website?",
      read: true,
      created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      priority: "low",
    },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-600">Manage customer inquiries and messages.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">All Messages</h2>
            <span className="text-sm text-gray-500">{messages.length} total</span>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-6 hover:bg-gray-50 transition-colors ${
                !message.read ? "bg-blue-50/50" : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    message.read ? "bg-gray-100" : "bg-blue-100"
                  }`}>
                    <Mail className={`w-5 h-5 ${message.read ? "text-gray-500" : "text-blue-600"}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-900">{message.name}</h3>
                      {!message.read && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                          New
                        </span>
                      )}
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        message.priority === "high"
                          ? "bg-red-100 text-red-700"
                          : message.priority === "medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}>
                        {message.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{message.email}</p>
                    <p className="text-sm font-medium text-gray-900 mt-2">{message.subject}</p>
                    <p className="text-sm text-gray-600 mt-1">{message.message}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(message.created_at).toLocaleString()}
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
          <MessageSquare className="w-5 h-5 text-yellow-600" />
          <p className="text-yellow-700">
            This is showing static demo messages. Connect to a backend to manage real messages.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessagesManagement;
