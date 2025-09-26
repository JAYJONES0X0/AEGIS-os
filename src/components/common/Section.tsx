import { ReactNode } from "react";

interface SectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ title, subtitle, children, className = "" }: SectionProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-foreground tracking-tight flex items-center gap-3 font-bold">
          <div className="w-1 h-6 bg-primary rounded-full shadow-lg shadow-primary/40"></div>
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-muted-foreground ml-7 font-medium">
            {subtitle}
          </p>
        )}
      </div>
      <div className="relative">
        {children}
      </div>
    </div>
  );
}