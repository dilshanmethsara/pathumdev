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
    // Apply filters
    let filtered = messages;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (message) =>
          message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          message.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter === "read") {
      filtered = filtered.filter((message) => message.read);
    } else if (statusFilter === "unread") {
      filtered = filtered.filter((message) => !message.read);
    }

    // Priority filter
    if (priorityFilter !== "all") {
      filtered = filtered.filter((message) => message.priority === priorityFilter);
    }

    setFilteredMessages(filtered);
  }, [messages, searchTerm, statusFilter, priorityFilter]);

  const markAsRead = (messageId: string) => {
    messageStorage.markMessageAsRead(messageId);
    const updatedMessages = messageStorage.getMessages();
    setMessages(updatedMessages);
  };

  const markAsUnread = (messageId: string) => {
    messageStorage.markMessageAsUnread(messageId);
    const updatedMessages = messageStorage.getMessages();
    setMessages(updatedMessages);
  };

  const deleteMessage = (messageId: string) => {
    messageStorage.deleteMessage(messageId);
    const updatedMessages = messageStorage.getMessages();
    setMessages(updatedMessages);
    if (selectedMessage?.id === messageId) {
      setSelectedMessage(null);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600">
            Manage customer messages and inquiries
            {unreadCount > 0 && (
              <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {unreadCount} unread
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search messages..."
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
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none cursor-pointer"
          >
            <option value="all">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Filter className="w-4 h-4" />
            {filteredMessages.length} of {messages.length} messages
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredMessages.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No messages found</p>
            </div>
          ) : (
            filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`bg-white rounded-xl shadow-sm border p-6 cursor-pointer transition-all hover:shadow-md ${
                  !message.read ? "border-primary/50 bg-primary/5" : "border-gray-200"
                } ${selectedMessage?.id === message.id ? "ring-2 ring-primary/20" : ""}`}
                onClick={() => {
                  setSelectedMessage(message);
                  if (!message.read) {
                    markAsRead(message.id);
                  }
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{message.name}</h3>
                      {!message.read && (
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                      )}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(message.priority)}`}>
                        {message.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{message.subject}</p>
                    <p className="text-sm text-gray-500 line-clamp-2">{message.message}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        message.read ? markAsUnread(message.id) : markAsRead(message.id);
                      }}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors cursor-button"
                      title={message.read ? "Mark as unread" : "Mark as read"}
                    >
                      {message.read ? <Mail className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteMessage(message.id);
                      }}
                      className="p-2 text-red-400 hover:text-red-600 transition-colors cursor-button"
                      title="Delete message"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    {message.email}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(message.createdAt)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-1">
          {selectedMessage ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Message Details</h2>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="p-1 text-gray-400 hover:text-gray-600 cursor-button"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">From</label>
                  <p className="font-semibold text-gray-900">{selectedMessage.name}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <p className="text-gray-600">{selectedMessage.email}</p>
                </div>

                {selectedMessage.phone && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Phone</label>
                    <p className="text-gray-600">{selectedMessage.phone}</p>
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium text-gray-700">Subject</label>
                  <p className="text-gray-900">{selectedMessage.subject}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Priority</label>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(selectedMessage.priority)}`}>
                    {selectedMessage.priority}
                  </span>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Message</label>
                  <p className="text-gray-900 mt-2 leading-relaxed">{selectedMessage.message}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Received</label>
                  <p className="text-gray-600">{formatDate(selectedMessage.createdAt)}</p>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <button className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors cursor-button">
                    <Reply className="w-4 h-4" />
                    Reply to Message
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Select a message to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesManagement;
