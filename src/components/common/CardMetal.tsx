import { ReactNode } from "react";

interface CardMetalProps {
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function CardMetal({ title, children, footer, className = "" }: CardMetalProps) {
  return (
    <div className={`aegis-card-metal ${className}`}>
      {title && (
        <div className="p-6 pb-0">
          <h3 className="text-lg font-semibold text-foreground tracking-tight">
            {title}
          </h3>
        </div>
      )}
      
      <div className={title ? "p-6 pt-4" : "p-6"}>
        {children}
      </div>
      
      {footer && (
        <div className="px-6 pb-6 pt-0">
          {footer}
        </div>
      )}
    </div>
  );
}