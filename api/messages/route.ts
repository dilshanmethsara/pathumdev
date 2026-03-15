import { NextRequest, NextResponse } from 'next/server';

// In-memory storage (for demo - replace with database in production)
let messages: any[] = [];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const adminKey = searchParams.get('adminKey');
  
  // Simple admin authentication
  if (adminKey !== process.env.ADMIN_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  return NextResponse.json({ messages });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newMessage = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
      read: false,
      priority: determinePriority(body.subject, body.message),
    };
    
    messages.push(newMessage);
    
    // Optional: Send email notification
    await sendEmailNotification(newMessage);
    
    return NextResponse.json({ success: true, message: newMessage });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save message' }, { status: 500 });
  }
}

function determinePriority(subject: string, message: string): 'low' | 'medium' | 'high' {
  const text = (subject + " " + message).toLowerCase();
  
  const highKeywords = ["urgent", "emergency", "asap", "immediately", "critical", "important"];
  const mediumKeywords = ["quote", "pricing", "cost", "price", "project", "development"];
  
  if (highKeywords.some(keyword => text.includes(keyword))) return "high";
  if (mediumKeywords.some(keyword => text.includes(keyword))) return "medium";
  return "low";
}

async function sendEmailNotification(message: any) {
  // Use Vercel's email service or external service like Resend
  // This is a placeholder - implement based on your email service
  console.log('Email notification sent for:', message.id);
}
