import React from 'react';

interface SafeComponentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  name?: string;
}

export const SafeComponent: React.FC<SafeComponentProps> = ({ 
  children, 
  fallback,
  name = 'Component'
}) => {
  try {
    return <>{children}</>;
  } catch (error) {
    console.error(`Error in ${name}:`, error);
    
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="p-4 text-center">
        <p className="text-sm text-muted-foreground">
          Error loading {name}
        </p>
      </div>
    );
  }
};

export default SafeComponent;