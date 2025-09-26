import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { BarChart3, TrendingUp, PieChart, Activity } from "lucide-react";
import { cn } from "../ui/utils";

interface ChartPlaceholderProps {
  title: string;
  type: "bar" | "line" | "pie" | "area";
  data?: { label: string; value: number; color?: string }[];
  trend?: "up" | "down" | "stable";
  trendValue?: string;
  className?: string;
}

export function ChartPlaceholder({
  title,
  type,
  data = [],
  trend,
  trendValue,
  className
}: ChartPlaceholderProps) {
  const icons = {
    bar: BarChart3,
    line: TrendingUp,
    pie: PieChart,
    area: Activity
  };

  const Icon = icons[type];

  const trendColors = {
    up: "text-success bg-success/10",
    down: "text-destructive bg-destructive/10",
    stable: "text-muted-foreground bg-muted/10"
  };

  return (
    <div className={cn("aegis-ceremonial-card p-6", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-foreground">{title}</h3>
        <div className="flex items-center gap-3">
          {trend && trendValue && (
            <div className={cn(
              "px-2 py-1 rounded text-xs font-medium tabular flex items-center gap-1",
              trendColors[trend]
            )}>
              <span className="text-sm leading-none">
                {trend === "up" ? "↗" : trend === "down" ? "↘" : "→"}
              </span>
              {trendValue}
            </div>
          )}
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
      
      <div className="h-56 flex items-center justify-center bg-muted/5 rounded-lg border border-border/10 relative overflow-hidden">
        {/* Subtle analytics gradient overlay */}
        <div className="absolute inset-0 aegis-analytics-gradient opacity-60" />
        
        <div className="relative z-10">
          {data.length > 0 ? (
            <div className="space-y-4 text-center">
              <Icon className="h-12 w-12 mx-auto text-primary/60" />
              <div className="text-sm text-muted-foreground font-medium">
                Analytics: {data.length} data points
              </div>
              <div className="grid grid-cols-2 gap-2 max-w-64">
                {data.slice(0, 4).map((item, index) => (
                  <div key={index} className="px-2 py-1 bg-card/50 rounded text-xs tabular">
                    <div className="text-muted-foreground">{item.label}</div>
                    <div className="text-foreground font-semibold">{item.value}</div>
                  </div>
                ))}
              </div>
              {data.length > 4 && (
                <div className="text-xs text-muted-foreground tabular">
                  +{data.length - 4} additional metrics
                </div>
              )}
            </div>
          ) : (
            <div className="text-center">
              <Icon className="h-12 w-12 mx-auto text-primary/40 mb-3" />
              <div className="text-sm text-muted-foreground font-medium">
                {type.charAt(0).toUpperCase() + type.slice(1)} Analytics
              </div>
            </div>
          )}
        </div>
        
        {/* Subtle grid pattern for analytics feel */}
        <div className="absolute inset-0 opacity-20" 
             style={{
               backgroundImage: `linear-gradient(var(--aegis-tab-analytics-grid) 1px, transparent 1px), 
                                linear-gradient(90deg, var(--aegis-tab-analytics-grid) 1px, transparent 1px)`,
               backgroundSize: '20px 20px'
             }} />
      </div>
    </div>
  );
}