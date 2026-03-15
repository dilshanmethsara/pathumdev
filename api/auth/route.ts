import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    
    // Verify admin password
    if (password === process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ 
        success: true, 
        token: generateAdminToken(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
      });
    }
    
    return NextResponse.json({ success: false, error: 'Invalid password' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Authentication failed' }, { status: 500 });
  }
}

function generateAdminToken(): string {
  // Simple token generation - use JWT in production
  return Buffer.from(`${Date.now()}-${Math.random()}`).toString('base64');
}
