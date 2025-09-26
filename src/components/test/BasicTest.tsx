import React from 'react';

export function BasicTest() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-foreground mb-4">
        Basic Test Component
      </h1>
      <p className="text-muted-foreground">
        This is a simple test component to verify the application is working.
      </p>
      <div className="mt-4 p-4 bg-card/30 rounded-lg border">
        <p className="text-sm">
          If you can see this, the basic React rendering is working correctly.
        </p>
      </div>
    </div>
  );
}