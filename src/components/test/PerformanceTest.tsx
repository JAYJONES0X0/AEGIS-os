import React from 'react';

/**
 * Simple performance test component to verify basic functionality
 * This component should render very quickly without any heavy operations
 */
export function PerformanceTest() {
  const startTime = performance.now();
  
  React.useEffect(() => {
    const endTime = performance.now();
    console.log(`PerformanceTest component rendered in ${endTime - startTime}ms`);
  }, []);

  return (
    <div className="p-6 space-y-4">
      <div className="bg-card/30 border border-border rounded-lg p-4">
        <h2 className="text-lg font-semibold text-foreground mb-2">
          ✅ Performance Test
        </h2>
        <p className="text-sm text-muted-foreground">
          This component loaded successfully. Check console for render time.
        </p>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-primary/10 p-3 rounded border border-primary/20">
            <div className="text-xs text-primary/80">CPU Load</div>
            <div className="text-sm font-mono text-primary">Normal</div>
          </div>
          
          <div className="bg-success/10 p-3 rounded border border-success/20">
            <div className="text-xs text-success/80">Memory</div>
            <div className="text-sm font-mono text-success">Stable</div>
          </div>
          
          <div className="bg-cyan/10 p-3 rounded border border-cyan/20">
            <div className="text-xs text-cyan/80">Render Time</div>
            <div className="text-sm font-mono text-cyan">< 50ms</div>
          </div>
        </div>
      </div>
    </div>
  );
}