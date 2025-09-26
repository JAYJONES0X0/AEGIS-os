import React, { useState, ReactNode } from "react";
import { ChevronRight, ChevronDown, MoreHorizontal, TrendingUp, TrendingDown, Minus, Eye, Download, Share, ExternalLink, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { HierarchicalCard, type HierarchicalCardChild } from "./HierarchicalCard";
import { ContextualActions, getStandardActions } from "./ContextualActions";
import { ProgressiveDisclosure } from "./ProgressiveDisclosure";

interface KPIBreakdownItem {
  id: string;
  label: string;
  value: string | number;
  percentage?: number;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  status?: 'good' | 'warning' | 'critical';
  children?: KPIBreakdownItem[];
}

interface EnhancedKPIProps {
  label: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  status?: 'good' | 'warning' | 'critical';
  unit?: string;
  target?: number;
  progress?: number;
  breakdown?: KPIBreakdownItem[];
  actions?: Array<{
    id: string;
    label: string;
    icon?: ReactNode;
    onClick: () => void;
  }>;
  onClick?: () => void;
  onDrillDown?: (path: string[]) => void;
  enableDrilldown?: boolean;
  compact?: boolean;
  className?: string;
}

export function EnhancedKPI({
  label,
  value,
  description,
  icon,
  trend,
  trendValue,
  status = 'good',
  unit,
  target,
  progress,
  breakdown = [],
  actions = [],
  onClick,
  onDrillDown,
  enableDrilldown = true,
  compact = false,
  className = ""
}: EnhancedKPIProps) {
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

  const standardActions = getStandardActions('kpi').map(action => ({
    ...action,
    onClick: () => {
      switch (action.id) {
        case 'view':
          onClick?.();
          break;
        case 'export':
          // Handle export
          break;
        case 'refresh':
          // Handle refresh
          break;
        default:
          action.onClick();
      }
    }
  }));

  const allActions = [...actions, ...standardActions];

  const handleDrillDown = (path: string[]) => {
    if (onDrillDown) {
      onDrillDown(path);
    }
  };

  const convertBreakdownToHierarchy = (items: KPIBreakdownItem[]): HierarchicalCardChild[] => {
    return items.map(item => ({
      id: item.id,
      title: item.label,
      value: item.value,
      status: item.status === 'good' ? 'completed' : item.status === 'warning' ? 'pending' : 'error',
      progress: item.percentage,
      badge: item.trendValue,
      children: item.children ? convertBreakdownToHierarchy(item.children) : undefined
    }));
  };

  if (compact) {
    return (
      <div 
        className={`
          aegis-kpi border-l-2 ${getStatusColor()} cursor-pointer
          transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg
          ${className}
        `}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-3">
            {icon && <div className="text-primary">{icon}</div>}
            <div>
              <div className="text-sm font-medium aegis-text-enhanced">{label}</div>
              <div className="text-lg font-bold aegis-card-value">{value}{unit}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {getTrendIcon()}
            {trendValue && (
              <span className="text-xs text-muted-foreground">{trendValue}</span>
            )}
            {isHovered && enableDrilldown && breakdown.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
              >
                <ChevronRight className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
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
            <div className="flex items-center gap-3">
              {icon && (
                <div className="text-primary">
                  {icon}
                </div>
              )}
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
            </div>
            
            {/* Actions */}
            <div className={`
              transition-opacity duration-200 
              ${isHovered ? 'opacity-100' : 'opacity-0'}
            `}>
              <div className="flex items-center gap-2">
                {enableDrilldown && breakdown.length > 0 && (
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
                
                <ContextualActions actions={allActions} />
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

          {/* Progress Bar */}
          {(progress !== undefined || target !== undefined) && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Progress</span>
                {target && <span>Target: {target}</span>}
              </div>
              <Progress 
                value={progress || ((Number(value) / (target || 100)) * 100)} 
                className="h-2" 
              />
            </div>
          )}
        </div>
      </div>

      {/* Drill-down Section */}
      {isExpanded && enableDrilldown && breakdown.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground aegis-text-enhanced px-2">
            {label} Breakdown
          </h4>
          
          <HierarchicalCard
            title="Detailed Analysis"
            children={convertBreakdownToHierarchy(breakdown)}
            onNavigate={handleDrillDown}
            className="border-l-2 border-primary/20"
          />
        </div>
      )}
    </div>
  );
}

// Grid layout component for Enhanced KPIs
interface EnhancedKPIGridProps {
  kpis: EnhancedKPIProps[];
  columns?: 1 | 2 | 3 | 4;
  compact?: boolean;
  className?: string;
}

export function EnhancedKPIGrid({ 
  kpis, 
  columns = 3, 
  compact = false, 
  className = "" 
}: EnhancedKPIGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-6 ${className}`}>
      {kpis.map((kpi, index) => (
        <EnhancedKPI
          key={index}
          {...kpi}
          compact={compact}
        />
      ))}
    </div>
  );
}

// Sample data generator for testing
export const generateSampleKPIData = (): EnhancedKPIProps[] => [
  {
    label: "Active Clients",
    value: 247,
    description: "Total number of active service users",
    trend: 'up',
    trendValue: '+12 this month',
    status: 'good',
    breakdown: [
      {
        id: 'residential',
        label: 'Residential Care',
        value: 156,
        percentage: 63,
        trend: 'up',
        status: 'good',
        children: [
          { id: 'care-home-a', label: 'Care Home A', value: 78, percentage: 50, status: 'good' },
          { id: 'care-home-b', label: 'Care Home B', value: 78, percentage: 50, status: 'good' }
        ]
      },
      {
        id: 'community',
        label: 'Community Support',
        value: 91,
        percentage: 37,
        trend: 'stable',
        status: 'good'
      }
    ]
  },
  {
    label: "Staff Utilization",
    value: 87,
    unit: '%',
    description: "Current staff utilization rate",
    trend: 'down',
    trendValue: '-3% from last week',
    status: 'warning',
    target: 90,
    progress: 87,
    breakdown: [
      {
        id: 'care-staff',
        label: 'Care Staff',
        value: '85%',
        percentage: 85,
        status: 'warning'
      },
      {
        id: 'nursing',
        label: 'Nursing Staff',
        value: '92%',
        percentage: 92,
        status: 'good'
      },
      {
        id: 'admin',
        label: 'Admin Staff',
        value: '78%',
        percentage: 78,
        status: 'critical'
      }
    ]
  },
  {
    label: "Quality Score",
    value: 4.8,
    unit: '/5',
    description: "Overall care quality rating",
    trend: 'up',
    trendValue: '+0.2 this quarter',
    status: 'good',
    breakdown: [
      {
        id: 'safety',
        label: 'Safety',
        value: '4.9/5',
        percentage: 98,
        status: 'good'
      },
      {
        id: 'care-quality',
        label: 'Care Quality',
        value: '4.7/5',
        percentage: 94,
        status: 'good'
      },
      {
        id: 'responsiveness',
        label: 'Responsiveness',
        value: '4.6/5',
        percentage: 92,
        status: 'good'
      }
    ]
  }
];