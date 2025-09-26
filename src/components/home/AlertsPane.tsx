import { CardGlass } from "../common/CardGlass";
import { StatusPill } from "../common/StatusPill";
import { ButtonMetal } from "../common/ButtonMetal";

interface Alert {
  id: string;
  title: string;
  message: string;
  severity: 'high' | 'medium' | 'low';
  timestamp: string;
  acknowledged?: boolean;
}

interface AlertsPaneProps {
  items: Alert[];
  onAck: (alertId: string) => void;
  className?: string;
}

export function AlertsPane({ items, onAck, className = "" }: AlertsPaneProps) {
  const severityMap = {
    high: 'bad',
    medium: 'warn', 
    low: 'neutral'
  } as const;

  return (
    <CardGlass title="System Alerts" className={className}>
      <div className="space-y-4">
        {items.length === 0 ? (
          <div className="text-center py-8 text-white/60">
            No active alerts
          </div>
        ) : (
          items.map((alert) => (
            <div 
              key={alert.id}
              className={`p-4 rounded-lg border border-white/8 ${
                alert.acknowledged ? 'opacity-50' : 'bg-white/3'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <h4 className="font-medium text-white/90">
                      {alert.title}
                    </h4>
                    <StatusPill 
                      label={alert.severity.toUpperCase()} 
                      tone={severityMap[alert.severity]} 
                    />
                  </div>
                  
                  <p className="text-sm text-white/70">
                    {alert.message}
                  </p>
                  
                  <div className="text-xs text-white/50 font-mono">
                    {alert.timestamp}
                  </div>
                </div>
                
                {!alert.acknowledged && (
                  <ButtonMetal 
                    variant="ghost" 
                    onClick={() => onAck(alert.id)}
                    className="text-xs px-3 py-1.5"
                  >
                    Acknowledge
                  </ButtonMetal>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </CardGlass>
  );
}