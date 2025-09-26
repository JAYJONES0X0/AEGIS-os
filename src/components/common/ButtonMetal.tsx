import { ReactNode } from "react";

interface ButtonMetalProps {
  children: ReactNode;
  variant?: 'primary' | 'ghost' | 'danger';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function ButtonMetal({ 
  children, 
  variant = 'primary', 
  onClick, 
  disabled = false,
  className = "" 
}: ButtonMetalProps) {
  const isPrimary = variant === 'primary';
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        aegis-button-primary-metal
        ${isPrimary ? 'bg-primary text-primary-foreground font-semibold' : 'text-foreground/90'}
        ${variant === 'danger' ? 'border-destructive/40 hover:bg-destructive/10' : ''}
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
}