import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key are required. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Database types
export interface CustomerMessage {
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

export interface CustomerOrder {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  shipping_address: {
    street: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
  };
  payment_method: string;
  payment_status: "pending" | "paid" | "failed" | "refunded";
  created_at: string;
  updated_at: string;
  notes?: string;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
  };
  total_orders: number;
  total_spent: number;
  average_order_value: number;
  last_order_date?: string;
  registration_date: string;
  status: "active" | "inactive" | "vip";
  notes?: string;
}

// Helper functions for database operations
export const supabaseService = {
  // Messages
  async sendMessage(messageData: Omit<CustomerMessage, 'id' | 'created_at' | 'read' | 'priority'>) {
    const { data, error } = await supabase
      .from('customer_messages')
      .insert([{
        ...messageData,
        created_at: new Date().toISOString(),
        read: false,
        priority: determinePriority(messageData.subject, messageData.message),
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getMessages() {
    const { data, error } = await supabase
      .from('customer_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async markMessageAsRead(messageId: string) {
    const { error } = await supabase
      .from('customer_messages')
      .update({ read: true })
      .eq('id', messageId);

    if (error) throw error;
  },

  async markMessageAsUnread(messageId: string) {
    const { error } = await supabase
      .from('customer_messages')
      .update({ read: false })
      .eq('id', messageId);

    if (error) throw error;
  },

  async deleteMessage(messageId: string) {
    const { error } = await supabase
      .from('customer_messages')
      .delete()
      .eq('id', messageId);

    if (error) throw error;
  },

  // Orders
  async saveOrder(orderData: Omit<CustomerOrder, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('customer_orders')
      .insert([{
        ...orderData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getOrders() {
    const { data, error } = await supabase
      .from('customer_orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async updateOrderStatus(orderId: string, status: CustomerOrder['status']) {
    const { error } = await supabase
      .from('customer_orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', orderId);

    if (error) throw error;
  },

  // Customers
  async getCustomers() {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('registration_date', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async updateCustomer(customerId: string, updates: Partial<Customer>) {
    const { error } = await supabase
      .from('customers')
      .update(updates)
      .eq('id', customerId);

    if (error) throw error;
  },

  // Analytics
  async getStats() {
    const [messages, orders, customers] = await Promise.all([
      supabaseService.getMessages(),
      supabaseService.getOrders(),
      supabaseService.getCustomers(),
    ]);

    const unreadMessages = messages.filter(m => !m.read).length;
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const totalRevenue = orders
      .filter(o => o.status === 'delivered' && o.payment_status === 'paid')
      .reduce((sum, order) => sum + order.total, 0);

    const newCustomers = customers.filter(customer => {
      const createdAt = new Date(customer.registration_date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return createdAt > weekAgo;
    }).length;

    return {
      totalMessages: messages.length,
      unreadMessages,
      totalOrders: orders.length,
      pendingOrders,
      totalCustomers: customers.length,
      newCustomers: newCustomers,
      totalRevenue,
      averageOrderValue: orders.length > 0 ? totalRevenue / orders.length : 0,
    };
  },
};

function determinePriority(subject: string, message: string): "low" | "medium" | "high" {
  const text = (subject + " " + message).toLowerCase();
  
  const highKeywords = ["urgent", "emergency", "asap", "immediately", "critical", "important"];
  const mediumKeywords = ["quote", "pricing", "cost", "price", "project", "development"];
  
  if (highKeywords.some(keyword => text.includes(keyword))) return "high";
  if (mediumKeywords.some(keyword => text.includes(keyword))) return "medium";
  return "low";
}
