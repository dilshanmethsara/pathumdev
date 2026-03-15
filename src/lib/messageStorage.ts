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

export interface CustomerOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  createdAt: string;
  updatedAt: string;
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

class MessageStorage {
  private readonly MESSAGES_KEY = "customerMessages";
  private readonly ORDERS_KEY = "customerOrders";
  private readonly CUSTOMERS_KEY = "customers";

  // Messages
  saveMessage(message: Omit<CustomerMessage, "id" | "createdAt" | "read" | "priority">): CustomerMessage {
    const messages = this.getMessages();
    const newMessage: CustomerMessage = {
      ...message,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      read: false,
      priority: this.determinePriority(message.subject, message.message),
    };

    messages.push(newMessage);
    localStorage.setItem(this.MESSAGES_KEY, JSON.stringify(messages));
    
    // Also create or update customer
    this.updateCustomerFromMessage(newMessage);
    
    return newMessage;
  }

  getMessages(): CustomerMessage[] {
    try {
      const messages = localStorage.getItem(this.MESSAGES_KEY);
      return messages ? JSON.parse(messages) : [];
    } catch (error) {
      console.error("Error loading messages:", error);
      return [];
    }
  }

  markMessageAsRead(messageId: string): void {
    const messages = this.getMessages();
    const updatedMessages = messages.map(msg =>
      msg.id === messageId ? { ...msg, read: true } : msg
    );
    localStorage.setItem(this.MESSAGES_KEY, JSON.stringify(updatedMessages));
  }

  markMessageAsUnread(messageId: string): void {
    const messages = this.getMessages();
    const updatedMessages = messages.map(msg =>
      msg.id === messageId ? { ...msg, read: false } : msg
    );
    localStorage.setItem(this.MESSAGES_KEY, JSON.stringify(updatedMessages));
  }

  deleteMessage(messageId: string): void {
    const messages = this.getMessages();
    const updatedMessages = messages.filter(msg => msg.id !== messageId);
    localStorage.setItem(this.MESSAGES_KEY, JSON.stringify(updatedMessages));
  }

  // Orders
  saveOrder(order: Omit<CustomerOrder, "id" | "createdAt" | "updatedAt">): CustomerOrder {
    const orders = this.getOrders();
    const newOrder: CustomerOrder = {
      ...order,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    orders.push(newOrder);
    localStorage.setItem(this.ORDERS_KEY, JSON.stringify(orders));
    
    // Update customer
    this.updateCustomerFromOrder(newOrder);
    
    return newOrder;
  }

  getOrders(): CustomerOrder[] {
    try {
      const orders = localStorage.getItem(this.ORDERS_KEY);
      return orders ? JSON.parse(orders) : [];
    } catch (error) {
      console.error("Error loading orders:", error);
      return [];
    }
  }

  updateOrderStatus(orderId: string, status: CustomerOrder["status"]): void {
    const orders = this.getOrders();
    const updatedOrders = orders.map(order =>
      order.id === orderId
        ? { ...order, status, updatedAt: new Date().toISOString() }
        : order
    );
    localStorage.setItem(this.ORDERS_KEY, JSON.stringify(updatedOrders));
  }

  updatePaymentStatus(orderId: string, paymentStatus: CustomerOrder["paymentStatus"]): void {
    const orders = this.getOrders();
    const updatedOrders = orders.map(order =>
      order.id === orderId
        ? { ...order, paymentStatus, updatedAt: new Date().toISOString() }
        : order
    );
    localStorage.setItem(this.ORDERS_KEY, JSON.stringify(updatedOrders));
  }

  deleteOrder(orderId: string): void {
    const orders = this.getOrders();
    const updatedOrders = orders.filter(order => order.id !== orderId);
    localStorage.setItem(this.ORDERS_KEY, JSON.stringify(updatedOrders));
  }

  // Customers
  getCustomers(): Customer[] {
    try {
      const customers = localStorage.getItem(this.CUSTOMERS_KEY);
      return customers ? JSON.parse(customers) : [];
    } catch (error) {
      console.error("Error loading customers:", error);
      return [];
    }
  }

  updateCustomer(customerId: string, updates: Partial<Customer>): void {
    const customers = this.getCustomers();
    const updatedCustomers = customers.map(customer =>
      customer.id === customerId ? { ...customer, ...updates } : customer
    );
    localStorage.setItem(this.CUSTOMERS_KEY, JSON.stringify(updatedCustomers));
  }

  deleteCustomer(customerId: string): void {
    const customers = this.getCustomers();
    const updatedCustomers = customers.filter(customer => customer.id !== customerId);
    localStorage.setItem(this.CUSTOMERS_KEY, JSON.stringify(updatedCustomers));
  }

  // Helper methods
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private determinePriority(subject: string, message: string): "low" | "medium" | "high" {
    const text = (subject + " " + message).toLowerCase();
    
    // High priority keywords
    const highKeywords = ["urgent", "emergency", "asap", "immediately", "critical", "important"];
    // Medium priority keywords
    const mediumKeywords = ["quote", "pricing", "cost", "price", "project", "development"];
    
    if (highKeywords.some(keyword => text.includes(keyword))) {
      return "high";
    }
    if (mediumKeywords.some(keyword => text.includes(keyword))) {
      return "medium";
    }
    
    return "low";
  }

  private updateCustomerFromMessage(message: CustomerMessage): void {
    const customers = this.getCustomers();
    const existingCustomer = customers.find(c => c.email === message.email);
    
    if (existingCustomer) {
      // Update existing customer
      this.updateCustomer(existingCustomer.id, {
        lastOrderDate: new Date().toISOString(),
      });
    } else {
      // Create new customer
      const newCustomer: Customer = {
        id: this.generateId(),
        name: message.name,
        email: message.email,
        phone: message.phone,
        totalOrders: 0,
        totalSpent: 0,
        averageOrderValue: 0,
        registrationDate: new Date().toISOString(),
        status: "active",
      };
      
      customers.push(newCustomer);
      localStorage.setItem(this.CUSTOMERS_KEY, JSON.stringify(customers));
    }
  }

  private updateCustomerFromOrder(order: CustomerOrder): void {
    const customers = this.getCustomers();
    const existingCustomer = customers.find(c => c.email === order.customerEmail);
    
    if (existingCustomer) {
      // Update existing customer
      const newTotalOrders = existingCustomer.totalOrders + 1;
      const newTotalSpent = existingCustomer.totalSpent + order.total;
      const newAverageOrderValue = newTotalSpent / newTotalOrders;
      
      // Determine VIP status
      let status: Customer["status"] = existingCustomer.status;
      if (newTotalSpent > 5000 || newTotalOrders > 5) {
        status = "vip";
      } else if (newTotalOrders > 0) {
        status = "active";
      }
      
      this.updateCustomer(existingCustomer.id, {
        totalOrders: newTotalOrders,
        totalSpent: newTotalSpent,
        averageOrderValue: newAverageOrderValue,
        lastOrderDate: order.createdAt,
        status,
      });
    } else {
      // Create new customer from order
      const newCustomer: Customer = {
        id: this.generateId(),
        name: order.customerName,
        email: order.customerEmail,
        phone: order.customerPhone,
        address: order.shippingAddress,
        totalOrders: 1,
        totalSpent: order.total,
        averageOrderValue: order.total,
        lastOrderDate: order.createdAt,
        registrationDate: order.createdAt,
        status: order.total > 2000 ? "vip" : "active",
      };
      
      customers.push(newCustomer);
      localStorage.setItem(this.CUSTOMERS_KEY, JSON.stringify(customers));
    }
  }

  // Analytics
  getStats() {
    const messages = this.getMessages();
    const orders = this.getOrders();
    const customers = this.getCustomers();
    
    const unreadMessages = messages.filter(m => !m.read).length;
    const pendingOrders = orders.filter(o => o.status === "pending").length;
    const totalRevenue = orders
      .filter(o => o.status === "delivered" && o.paymentStatus === "paid")
      .reduce((sum, order) => sum + order.total, 0);
    
    return {
      totalMessages: messages.length,
      unreadMessages,
      totalOrders: orders.length,
      pendingOrders,
      totalCustomers: customers.length,
      totalRevenue,
      averageOrderValue: orders.length > 0 ? totalRevenue / orders.length : 0,
    };
  }
}

// Export singleton instance
export const messageStorage = new MessageStorage();
