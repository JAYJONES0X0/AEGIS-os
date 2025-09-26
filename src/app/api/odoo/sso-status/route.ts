import { NextResponse } from 'next/server';

export async function GET() {
  // Mock SSO status check
  // In production, this would verify JWT tokens and Odoo session
  
  try {
    // Simulate SSO check delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Mock SSO status - in production this would validate actual tokens
    const isAuthenticated = Math.random() > 0.3; // 70% authenticated for demo
    
    if (isAuthenticated) {
      return NextResponse.json({
        authenticated: true,
        user: {
          id: 'user_123',
          email: 'admin@aegis.health',
          name: 'AEGIS Administrator'
        },
        session: {
          expires: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(), // 8 hours
          odoo_session_id: 'session_456'
        }
      });
    } else {
      return NextResponse.json(
        {
          authenticated: false,
          error: 'Session expired or invalid'
        },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        authenticated: false,
        error: 'SSO check failed'
      },
      { status: 500 }
    );
  }
}