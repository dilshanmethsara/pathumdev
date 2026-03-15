export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      customer_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          subject: string;
          message: string;
          read: boolean;
          created_at: string;
          priority: "low" | "medium" | "high";
        };
        Insert: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          subject: string;
          message: string;
          read: boolean;
          created_at: string;
          priority: "low" | "medium" | "high";
        };
        Update: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          subject: string;
          message: string;
          read: boolean;
          created_at: string;
          priority: "low" | "medium" | "high";
        };
      };
      customer_orders: {
        Row: {
          id: string;
          customer_name: string;
          customer_email: string;
          customer_phone: string | null;
          items: {
            id: string;
            name: string;
            quantity: number;
            price: number;
          }[];
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
          notes: string | null;
        };
        Insert: {
          id: string;
          customer_name: string;
          customer_email: string;
          customer_phone: string | null;
          items: {
            id: string;
            name: string;
            quantity: number;
            price: number;
          }[];
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
          notes: string | null;
        };
        Update: {
          id: string;
          customer_name: string;
          customer_email: string;
          customer_phone: string | null;
          items: {
            id: string;
            name: string;
            quantity: number;
            price: number;
          }[];
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
          notes: string | null;
        };
      };
      customers: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          address: {
            street: string;
            city: string;
            state: string;
            zip_code: string;
            country: string;
          } | null;
          total_orders: number;
          total_spent: number;
          average_order_value: number;
          last_order_date: string | null;
          registration_date: string;
          status: "active" | "inactive" | "vip";
          notes: string | null;
        };
        Insert: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          address: {
            street: string;
            city: string;
            state: string;
            zip_code: string;
            country: string;
          } | null;
          total_orders: number;
          total_spent: number;
          average_order_value: number;
          last_order_date: string | null;
          registration_date: string;
          status: "active" | "inactive" | "vip";
          notes: string | null;
        };
        Update: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          address: {
            street: string;
            city: string;
            state: string;
            zip_code: string;
            country: string;
          } | null;
          total_orders: number;
          total_spent: number;
          average_order_value: number;
          last_order_date: string | null;
          registration_date: string;
          status: "active" | "inactive" | "vip";
          notes: string | null;
        };
      };
    };
    Functions: {
      Row: {
        id: string;
        name: string;
        email: string;
        phone: string | null;
        subject: string;
        message: string;
        read: boolean;
        created_at: string;
        priority: "low" | "medium" | "high";
      };
      Insert: {
        id: string;
        name: string;
        email: string;
        phone: string | null;
        subject: string;
        message: string;
        read: boolean;
        created_at: string;
        priority: "low" | "medium" | "high";
      };
      Update: {
        id: string;
        name: string;
        email: string;
        phone: string | null;
        subject: string;
        message: string;
        read: boolean;
        created_at: string;
        priority: "low" | "medium" | "high";
      };
    };
  };
}
