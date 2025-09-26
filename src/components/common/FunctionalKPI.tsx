import React, { useState } from "react";
import { ChevronRight, ChevronDown, MoreHorizontal, Eye, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";

interface DrilldownItem {
  id: string;
  label: string;
  value: string | number;
  percentage?: number;
  status?: 'good' | 'warning' | 'critical';
}

interface FunctionalKPIProps {
  label: string;
  value: string | number;
  description?: string;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  status?: 'good' | 'warning' | 'critical';
  unit?: string;
  drilldownData?: DrilldownItem[];
  onClick?: () => void;
  className?: string;
}

export function FunctionalKPI({
  label,
  value,
  description,
  trend,
  trendValue,
  status = 'good',
  unit,
  drilldownData = [],
  onClick,
  className = ""
}: FunctionalKPIProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-400" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-400" />;
      case 'stable': return <Minus className="h-4 w-4 text-yellow-400" />;
      default: return null;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'good': return 'border-l-green-400 bg-green-50/5';
      case 'warning': return 'border-l-yellow-400 bg-yellow-50/5';
      case 'critical': return 'border-l-red-400 bg-red-50/5';
      default: return 'border-l-primary/40';
    }
  };

  const canExpand = drilldownData.length > 0;

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Main KPI Card */}
      <div 
        className={`
          aegis-kpi border-l-4 ${getStatusColor()} cursor-pointer
          transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg
          focus:scale-[1.02] focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50
        `}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        tabIndex={0}
        role="button"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
          }
        }}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground aegis-text-secondary">
                {label}
              </h3>
              {description && (
                <p className="text-xs text-muted-foreground mt-1">
                  {description}
                </p>
              )}
            </div>
            
            {/* Actions */}
            <div className={`
              transition-opacity duration-200 
              ${isHovered ? 'opacity-100' : 'opacity-0'}
            `}>
              <div className="flex items-center gap-2">
                {canExpand && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsExpanded(!isExpanded);
                    }}
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                )}
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('View details for:', label);
                  }}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Value and Trend */}
          <div className="flex items-end justify-between mb-4">
            <div>
              <div className="text-3xl font-bold aegis-card-value tracking-tight">
                {value}
                {unit && <span className="text-lg text-muted-foreground ml-1">{unit}</span>}
              </div>
              {trendValue && (
                <div className="flex items-center gap-2 mt-2">
                  {getTrendIcon()}
                  <span className="text-sm text-muted-foreground">{trendValue}</span>
                </div>
              )}
            </div>
            
            {/* Status Badge */}
            <Badge 
              variant={status === 'good' ? 'secondary' : status === 'warning' ? 'secondary' : 'destructive'}
              className="text-xs"
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          </div>
        </div>
      </div>

      {/* Drill-down Section */}
      {isExpanded && canExpand && (
        <div className="ml-6 space-y-2">
          <h4 className="text-sm font-medium text-foreground aegis-text-enhanced px-2">
            {label} Breakdown
          </h4>
          
          {drilldownData.map((item, index) => (
            <div 
              key={item.id}
              className="aegis-card-glass p-3 border-l-2 border-primary/20 hover:border-primary/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium aegis-text-enhanced">{item.label}</div>
                  {item.percentage && (
                    <div className="mt-1">
                      <Progress value={item.percentage} className="h-2 w-24" />
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold aegis-card-value">{item.value}</div>
                  {item.status && (
                    <div className={`w-2 h-2 rounded-full mt-1 ml-auto ${
                      item.status === 'good' ? 'bg-green-400' :
                      item.status === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
                    }`} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Grid component for multiple KPIs
interface FunctionalKPIGridProps {
  kpis: FunctionalKPIProps[];
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

export function FunctionalKPIGrid({ 
  kpis, 
  columns = 3, 
  className = "" 
}: FunctionalKPIGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-6 ${className}`}>
      {kpis.map((kpi, index) => (
        <FunctionalKPI
          key={index}
          {...kpi}
        />
      ))}
    </div>
  );
}