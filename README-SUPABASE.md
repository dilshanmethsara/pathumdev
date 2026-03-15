# Supabase Integration Guide

## 🗄️ **Supabase Setup for PathumDev**

### **Problem Solved**
- ❌ Removed serverless functions (complex setup)
- ✅ Added Supabase (real-time database)
- ✅ Simplified deployment (no backend needed)
- ✅ Better performance (managed PostgreSQL)

## 🚀 **Setup Steps**

### **1. Create Supabase Project**
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose organization or create new one
4. Set project name: `pathumdev-prod`
5. Choose database password
6. Wait for project creation

### **2. Get Project Credentials**
After creation, you'll get:
```
Project URL: https://xxx.supabase.co
Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### **3. Update Environment Variables**
Add to your `.env` file:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_ADMIN_PASSWORD=your_secure_admin_password
```

## 📁 **Database Schema**

Supabase will automatically create tables based on your types:

### **customer_messages Table**
```sql
CREATE TABLE customer_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  priority TEXT DEFAULT 'low' CHECK (priority IN ('low', 'medium', 'high'))
);
```

### **customer_orders Table**
```sql
CREATE TABLE customer_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  items JSONB,
  total DECIMAL NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  shipping_address JSONB,
  payment_method TEXT NOT NULL,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  notes TEXT
);
```

### **customers Table**
```sql
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  address JSONB,
  total_orders INTEGER DEFAULT 0,
  total_spent DECIMAL DEFAULT 0,
  average_order_value DECIMAL DEFAULT 0,
  last_order_date TIMESTAMP WITH TIME ZONE,
  registration_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'vip')),
  notes TEXT
);
```

## 🔧 **Installation**

### **Install Dependencies**
```bash
npm install @supabase/supabase-js
```

### **Update Types**
The `src/types/database.ts` file contains all TypeScript interfaces that match your Supabase schema.

## 📱 **Files Updated**

### **New Files**
- `src/lib/supabase.ts` - Supabase client and service
- `src/types/database.ts` - Database type definitions
- `README-SUPABASE.md` - This setup guide

### **Modified Files**
- `src/lib/apiService.ts` - Updated to use Supabase
- `src/components/ContactSection.tsx` - Uses Supabase API
- `src/pages/Admin.tsx` - Uses Supabase API
- `package.json` - Added Supabase dependency

## 🔄 **How It Works**

### **Development**
- Uses Supabase directly (real-time)
- No serverless functions needed
- Automatic table creation

### **Production**
- Uses Supabase (managed PostgreSQL)
- Better performance and scalability
- Real-time subscriptions available

## 🎯 **Benefits**

✅ **Real-time database** with PostgreSQL  
✅ **No server management** needed  
✅ **Automatic backups** handled by Supabase  
✅ **Better security** with RLS policies  
✅ **Scalable** infrastructure  
✅ **Easy deployment** to Vercel  

## 🚀 **Next Steps**

1. **Set up Supabase project** (above)
2. **Update environment variables** (above)
3. **Install dependencies** (above)
4. **Deploy to Vercel** (same as before)

## 📊 **Data Flow**

1. **User submits form** → Supabase stores message
2. **Admin logs in** → Token generated locally
3. **Admin views data** → Real-time from Supabase
4. **Real-time updates** → Automatic across all users

## 🔐 **Security Features**

- **Row Level Security (RLS)** policies
- **Authentication** with JWT tokens (future)
- **API Keys** for secure access
- **HTTPS** enforced connections

Your website now has a professional, scalable backend with Supabase!
