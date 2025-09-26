import React, { useState, useEffect } from "react";
import { ErrorBoundary } from "./components/common/ErrorBoundary";
import { BasicTest } from "./components/test/BasicTest";
import { getCurrentTheme, applyTheme } from "./lib/theme-system";

export default function MinimalApp() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const theme = getCurrentTheme();
      applyTheme(theme);
      setTimeout(() => setIsLoading(false), 100);
    } catch (error) {
      console.error('Error in minimal app:', error);
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ErrorBoundary>
        <BasicTest />
      </ErrorBoundary>
    </div>
  );
}