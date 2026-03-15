import { useState, useEffect } from "react";
import { MessageSquare, CheckCircle, Trash2, Mail, Eye } from "lucide-react";
import { supabase } from "../../lib/supabase";

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
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data } = await supabase
        .from('customer_messages')
        .select('*')
        .order('created_at', { ascending: false }) as { data: Message[] | null };
      
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await supabase
        .from('customer_messages')
        .update({ read: true })
        .eq('id', id);
      
      setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m));
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      await supabase
        .from('customer_messages')
        .delete()
        .eq('id', id);
      
      setMessages(messages.filter(m => m.id !== id));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-600">Manage customer inquiries and messages.</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
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
                    <button 
                      onClick={() => markAsRead(message.id)}
                      className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      disabled={message.read}
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => deleteMessage(message.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-green-50 rounded-xl p-6 border border-green-100">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-5 h-5 text-green-600" />
          <p className="text-green-700">
            Connected to Supabase. Messages are now fetched from your database.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessagesManagement;
