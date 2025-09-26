import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { cn } from "../ui/utils";
import { LucideIcon } from "lucide-react";

interface KPITileProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: "up" | "down" | "stable";
  trendValue?: string;
  status?: "red" | "amber" | "green";
  icon?: LucideIcon;
  onClick?: () => void;
  className?: string;
}

export function KPITile({
  title,
  value,
  subtitle,
  trend,
  trendValue,
  status,
  icon: Icon,
  onClick,
  className
}: KPITileProps) {
  const statusColors = {
    red: "border-destructive/20 bg-destructive/5",
    amber: "border-warning/20 bg-warning/5",
    green: "border-success/20 bg-success/5"
  };

  const trendColors = {
    up: "text-success",
    down: "text-destructive",
    stable: "text-muted-foreground"
  };

  return (
    <div 
      className={cn(
        "aegis-kpi-tile cursor-pointer p-4 group",
        status && statusColors[status],
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="aegis-kpi-title text-sm font-medium tracking-wide">
          {title}
        </div>
        {Icon && (
          <Icon className="h-4 w-4 text-primary group-hover:text-primary/80 transition-colors" />
        )}
      </div>
      
      <div className="aegis-kpi-value text-3xl font-bold mb-1 tabular">
        {value}
      </div>
      
      {subtitle && (
        <div className="text-xs text-muted-foreground font-medium mb-2">
          {subtitle}
        </div>
      )}
      
      {trend && trendValue && (
        <div className="flex items-center gap-2">
          <div className={cn(
            "text-xs font-medium tabular flex items-center gap-1",
            trendColors[trend]
          )}>
            <span className="text-base leading-none">
              {trend === "up" ? "↗" : trend === "down" ? "↘" : "→"}
            </span>
            {trendValue}
          </div>
        </div>
      )}
    </div>
  );
}