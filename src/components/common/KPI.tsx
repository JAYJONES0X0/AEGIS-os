import { ReactNode } from "react";

interface KPIProps {
  label: string;
  value: number | string;
  onDrill?: () => void;
  onExport?: () => void;
  onClick?: () => void;
  className?: string;
}

export function KPI({ label, value, onDrill, onExport, onClick, className = "" }: KPIProps) {
  const isClickable = onClick || onDrill;
  
  return (
    <div 
      className={`
        aegis-kpi aegis-breathe ${className}
        ${isClickable ? 'cursor-pointer aegis-ceremonial-hover transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg focus:scale-[1.02] focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50 active:scale-[0.98]' : 'transition-all duration-200'}
      `}
      onClick={onClick || onDrill}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={(e) => {
        if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          (onClick || onDrill)?.();
        }
      }}
      onMouseEnter={(e) => {
        if (isClickable) {
          e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15), 0 0 30px rgba(212, 175, 55, 0.2)';
        }
      }}
      onMouseLeave={(e) => {
        if (isClickable) {
          e.currentTarget.style.transform = '';
          e.currentTarget.style.boxShadow = '';
        }
      }}
    >
      <div className="space-y-2">
        {/* Label: Body/Default, Core/text-2 */}
        <div className="text-sm aegis-text-secondary text-[rgba(0,0,0,1)] font-normal font-bold bg-[rgba(255,255,255,0)]">
          {label}
        </div>
        {/* Value: H1, 48pt */}
        <div className="text-5xl font-bold aegis-card-value tracking-tight">
          {value}
        </div>
      </div>
      
      {/* Buttons */}
      {(onDrill || onExport) && (
        <div className="flex gap-2 mt-4">
          {onDrill && (
            <button
              onClick={onDrill}
              className="aegis-button-primary-metal text-xs font-medium text-foreground"
            >
              Drill Down
            </button>
          )}
          {onExport && (
            <button
              onClick={onExport}
              className="aegis-button-primary-metal text-xs font-medium text-foreground"
            >
              Export
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// Add the breathing animation to globals.css if not already present
const breatheAnimation = `
@keyframes aegis-breathe {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.03); }
}

.aegis-breathe {
  animation: aegis-breathe 6s cubic-bezier(0.19, 1, 0.22, 1) infinite;
}
`;