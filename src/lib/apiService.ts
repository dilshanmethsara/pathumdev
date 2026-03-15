export interface CustomerMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
  priority: "low" | "medium" | "high";
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  expiresAt?: string;
  error?: string;
}

class ApiService {
  private baseUrl: string;
  private adminToken: string | null = null;

  constructor() {
    this.baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://your-domain.vercel.app/api' 
      : 'http://localhost:8081/api';
  }

  // Authentication
  async login(password: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const result = await response.json();
      
      if (result.success && result.token) {
        this.adminToken = result.token;
        localStorage.setItem('adminToken', result.token);
        localStorage.setItem('tokenExpires', result.expiresAt || '');
      }
      
      return result;
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
  async sendMessage(messageData: Omit<CustomerMessage, 'id' | 'createdAt' | 'read' | 'priority'>): Promise<CustomerMessage> {
    try {
      const response = await fetch(`${this.baseUrl}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const result = await response.json();
      return result.message;
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
      const response = await fetch(`${this.baseUrl}/messages?adminKey=${this.adminToken}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }

      const result = await response.json();
      return result.messages || [];
    } catch (error) {
      console.error('Get messages error:', error);
      throw error;
    }
  }

  async markMessageAsRead(messageId: string): Promise<void> {
    if (!this.isAuthenticated()) {
      throw new Error('Not authenticated');
    }

    // This would be implemented in the API
    // For now, we'll update local state
    const messages = await this.getMessages();
    const updatedMessages = messages.map(msg =>
      msg.id === messageId ? { ...msg, read: true } : msg
    );
    
    // Store locally for immediate UI update
    localStorage.setItem('adminMessages', JSON.stringify(updatedMessages));
  }

  async deleteMessage(messageId: string): Promise<void> {
    if (!this.isAuthenticated()) {
      throw new Error('Not authenticated');
    }

    // This would be implemented in the API
    // For now, we'll update local state
    const messages = await this.getMessages();
    const updatedMessages = messages.filter(msg => msg.id !== messageId);
    
    // Store locally for immediate UI update
    localStorage.setItem('adminMessages', JSON.stringify(updatedMessages));
  }

  // Fallback to localStorage for development
  private getLocalMessages(): CustomerMessage[] {
    try {
      return JSON.parse(localStorage.getItem('customerMessages') || '[]');
    } catch {
      return [];
    }
  }

  private saveLocalMessage(message: CustomerMessage): void {
    const messages = this.getLocalMessages();
    messages.push(message);
    localStorage.setItem('customerMessages', JSON.stringify(messages));
  }
}

// Export singleton instance
export const apiService = new ApiService();
