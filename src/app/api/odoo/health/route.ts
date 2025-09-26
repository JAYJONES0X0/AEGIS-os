import { NextResponse } from 'next/server';

export async function GET() {
  // Mock health check for Odoo server
  // In production, this would check actual Odoo server health
  
  try {
    // Simulate health check delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Mock response - in production this would be a real health check
    const isHealthy = Math.random() > 0.1; // 90% success rate for demo
    
    if (isHealthy) {
      return NextResponse.json({ 
        status: 'healthy',
        timestamp: new Date().toISOString(),
        version: 'Odoo 16.0',
        response_time: '156ms'
      });
    } else {
      return NextResponse.json(
        { 
          status: 'unhealthy',
          timestamp: new Date().toISOString(),
          error: 'Connection timeout'
        },
        { status: 503 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error',
        timestamp: new Date().toISOString(),
        error: 'Health check failed'
      },
      { status: 500 }
    );
  }
}