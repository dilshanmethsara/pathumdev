import { supabase, CustomerMessage, CustomerOrder, Customer } from './supabase';

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
  customer_id: string;
  order_date: string;
  total: number;
  status: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  expiresAt?: string;
  error?: string;
}

class ApiService {
  private adminToken: string | null = null;

  constructor() {
    // No baseUrl needed for Supabase
  }

  // Authentication
  async login(password: string): Promise<AuthResponse> {
    try {
      // Simple password verification - in production, use proper authentication
      if (password === process.env.VITE_ADMIN_PASSWORD || 'admin123') {
        const token = this.generateAdminToken();
        this.adminToken = token;
        localStorage.setItem('adminToken', token);
        localStorage.setItem('tokenExpires', new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString());
        
        return { 
          success: true, 
          token, 
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        };
      }
      
      return { success: false, error: 'Invalid password' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Authentication failed' };
    }
  }

  logout() {
    this.adminToken = null;
    localStorage.removeItem('adminToken');
    localStorage.removeItem('tokenExpires');
  }

  isAuthenticated(): boolean {
    if (!this.adminToken) {
      this.adminToken = localStorage.getItem('adminToken');
    }
    
    if (!this.adminToken) return false;
    
    const expires = localStorage.getItem('tokenExpires');
    if (expires && new Date(expires) < new Date()) {
      this.logout();
      return false;
    }
    
    return true;
  }

  // Messages
  async sendMessage(messageData: Omit<CustomerMessage, 'id' | 'created_at' | 'read' | 'priority'>): Promise<CustomerMessage> {
    try {
      const result = await supabase.sendMessage(messageData);
      console.log('Message sent via Supabase:', result);
      return result;
    } catch (error) {
      console.error('Send message error:', error);
      throw error;
    }
  }

  async getMessages(): Promise<CustomerMessage[]> {
    if (!this.isAuthenticated()) {
      throw new Error('Not authenticated');
    }

    try {
      const messages = await supabase.getMessages();
      return messages;
    } catch (error) {
      console.error('Get messages error:', error);
      throw error;
    }
  }

  async markMessageAsRead(messageId: string): Promise<void> {
    if (!this.isAuthenticated()) {
      throw new Error('Not authenticated');
    }

    try {
      await supabase.markMessageAsRead(messageId);
    } catch (error) {
      console.error('Mark message as read error:', error);
      throw error;
    }
  }

  async markMessageAsUnread(messageId: string): Promise<void> {
    if (!this.isAuthenticated()) {
      throw new Error('Not authenticated');
    }

    try {
      await supabase.markMessageAsUnread(messageId);
    } catch (error) {
      console.error('Mark message as unread error:', error);
      throw error;
    }
  }

  async deleteMessage(messageId: string): Promise<void> {
    if (!this.isAuthenticated()) {
      throw new Error('Not authenticated');
    }

    try {
      await supabase.deleteMessage(messageId);
    } catch (error) {
      console.error('Delete message error:', error);
      throw error;
    }
  }

  // Orders
  async saveOrder(orderData: Omit<CustomerOrder, 'id' | 'created_at' | 'updated_at'>): Promise<CustomerOrder> {
    try {
      const result = await supabase.saveOrder(orderData);
      console.log('Order saved via Supabase:', result);
      return result;
    } catch (error) {
      console.error('Save order error:', error);
      throw error;
    }
  }

  async getOrders(): Promise<CustomerOrder[]> {
    if (!this.isAuthenticated()) {
      throw new Error('Not authenticated');
    }

    try {
      const orders = await supabase.getOrders();
      return orders;
    } catch (error) {
      console.error('Get orders error:', error);
      throw error;
    }
  }

  async updateOrderStatus(orderId: string, status: CustomerOrder['status']): Promise<void> {
    if (!this.isAuthenticated()) {
      throw new Error('Not authenticated');
    }

    try {
      await supabase.updateOrderStatus(orderId, status);
    } catch (error) {
      console.error('Update order status error:', error);
      throw error;
    }
  }

  // Customers
  async getCustomers(): Promise<Customer[]> {
    if (!this.isAuthenticated()) {
      throw new Error('Not authenticated');
    }

    try {
      const customers = await supabase.getCustomers();
      return customers;
    } catch (error) {
      console.error('Get customers error:', error);
      throw error;
    }
  }

  async updateCustomer(customerId: string, updates: Partial<Customer>): Promise<void> {
    if (!this.isAuthenticated()) {
      throw new Error('Not authenticated');
    }

    try {
      await supabase.updateCustomer(customerId, updates);
    } catch (error) {
      console.error('Update customer error:', error);
      throw error;
    }
  }

  // Analytics
  async getStats() {
    try {
      const stats = await supabase.getStats();
      return stats;
    } catch (error) {
      console.error('Get stats error:', error);
      throw error;
    }
  }

  private generateAdminToken(): string {
    // Simple token generation - use JWT in production
    return Buffer.from(`${Date.now()}-${Math.random()}`).toString('base64');
  }
}

// Export singleton instance
export const apiService = new ApiService();
