import React, { useState, ReactNode } from "react";
import { ChevronRight, ChevronDown, MoreHorizontal, ExternalLink, Download, Share, Settings, Eye, Edit, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";

interface HierarchicalAction {
  id: string;
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  variant?: 'default' | 'destructive' | 'secondary';
  disabled?: boolean;
}

interface HierarchicalCardChild {
  id: string;
  title: string;
  description?: string;
  value?: string | number;
  status?: 'active' | 'pending' | 'completed' | 'error';
  progress?: number;
  badge?: string;
  actions?: HierarchicalAction[];
  children?: HierarchicalCardChild[];
}

interface HierarchicalCardProps {
  title: string;
  description?: string;
  value?: string | number;
  icon?: ReactNode;
  status?: 'active' | 'pending' | 'completed' | 'error';
  progress?: number;
  badge?: string;
  children?: HierarchicalCardChild[];
  actions?: HierarchicalAction[];
  expandable?: boolean;
  defaultExpanded?: boolean;
  level?: number;
  className?: string;
  onNavigate?: (path: string[]) => void;
}

export function HierarchicalCard({
  title,
  description,
  value,
  icon,
  status,
  progress,
  badge,
  children,
  actions,
  expandable = children && children.length > 0,
  defaultExpanded = false,
  level = 0,
  className = "",
  onNavigate
}: HierarchicalCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [hoveredChildId, setHoveredChildId] = useState<string | null>(null);

  const handleToggle = () => {
    if (expandable) {
      setIsExpanded(!isExpanded);
    }
  };

  const handleChildClick = (child: HierarchicalCardChild, childPath: string[]) => {
    if (child.children && child.children.length > 0) {
      // Progressive disclosure - expand child
      return;
    }
    // Navigate to specific item
    if (onNavigate) {
      onNavigate([...childPath, child.id]);
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'pending': return 'text-yellow-400';
      case 'completed': return 'text-blue-400';
      case 'error': return 'text-red-400';
      default: return 'text-muted-foreground';
    }
  };

  const indentLevel = level * 1.5; // rem units for indentation

  return (
    <div className={`aegis-card-glass ${className}`} style={{ marginLeft: `${indentLevel}rem` }}>
      {/* Main Card Header */}
      <div 
        className={`
          flex items-center justify-between p-4 cursor-pointer
          ${expandable ? 'hover:bg-primary/5 transition-colors duration-200' : ''}
        `}
        onClick={handleToggle}
      >
        <div className="flex items-center gap-3 flex-grow">
          {/* Expansion Indicator */}
          {expandable && (
            <div className="text-muted-foreground hover:text-primary transition-colors">
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </div>
          )}
          
          {/* Icon */}
          {icon && (
            <div className="text-primary">
              {icon}
            </div>
          )}
          
          {/* Content */}
          <div className="flex-grow min-w-0">
            <div className="flex items-center gap-3">
              <h3 className="font-semibold text-foreground truncate aegis-text-enhanced">
                {title}
              </h3>
              {badge && (
                <Badge variant="secondary" className="text-xs">
                  {badge}
                </Badge>
              )}
              {status && (
                <div className={`w-2 h-2 rounded-full ${getStatusColor(status)}`} />
              )}
            </div>
            {description && (
              <p className="text-sm text-muted-foreground mt-1 aegis-text-secondary">
                {description}
              </p>
            )}
            {progress !== undefined && (
              <div className="mt-2">
                <Progress value={progress} className="h-2" />
                <span className="text-xs text-muted-foreground mt-1">
                  {progress}% complete
                </span>
              </div>
            )}
          </div>
          
          {/* Value */}
          {value && (
            <div className="text-right">
              <div className="text-lg font-bold text-primary aegis-card-value">
                {value}
              </div>
            </div>
          )}
        </div>
        
        {/* Actions Menu */}
        {actions && actions.length > 0 && (
          <div className="ml-3" onClick={(e) => e.stopPropagation()}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="aegis-card-glass">
                {actions.map((action, index) => (
                  <React.Fragment key={action.id}>
                    {index > 0 && index % 3 === 0 && <DropdownMenuSeparator />}
                    <DropdownMenuItem
                      onClick={action.onClick}
                      disabled={action.disabled}
                      className={action.variant === 'destructive' ? 'text-destructive' : ''}
                    >
                      {action.icon && (
                        <span className="mr-2">
                          {action.icon}
                        </span>
                      )}
                      {action.label}
                    </DropdownMenuItem>
                  </React.Fragment>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
      
      {/* Expanded Children */}
      {isExpanded && children && children.length > 0 && (
        <div className="border-t border-border/20">
          {children.map((child, index) => (
            <div
              key={child.id}
              className={`
                border-l-2 border-primary/20 ml-8 hover:border-primary/40 transition-colors
                ${hoveredChildId === child.id ? 'bg-primary/5' : ''}
              `}
              onMouseEnter={() => setHoveredChildId(child.id)}
              onMouseLeave={() => setHoveredChildId(null)}
            >
              <HierarchicalCard
                {...child}
                level={level + 1}
                className="border-none"
                onNavigate={(path) => handleChildClick(child, path)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Enhanced KPI Card with drill-down capabilities
interface DrilldownKPIProps {
  label: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  drilldownData?: HierarchicalCardChild[];
  onChange?: (value: number) => void;
  onExport?: () => void;
  className?: string;
}

export function DrilldownKPI({
  label,
  value,
  description,
  icon,
  drilldownData = [],
  onChange,
  onExport,
  className = ""
}: DrilldownKPIProps) {
  const [showDrilldown, setShowDrilldown] = useState(false);

  const defaultActions: HierarchicalAction[] = [
    {
      id: 'view',
      label: 'View Details',
      icon: <Eye size={16} />,
      onClick: () => setShowDrilldown(!showDrilldown)
    },
    ...(onExport ? [{
      id: 'export',
      label: 'Export Data',
      icon: <Download size={16} />,
      onClick: onExport
    }] : []),
    {
      id: 'share',
      label: 'Share',
      icon: <Share size={16} />,
      onClick: () => console.log('Share KPI')
    }
  ];

  return (
    <div className={className}>
      <HierarchicalCard
        title={label}
        description={description}
        value={value}
        icon={icon}
        children={drilldownData}
        actions={defaultActions}
        expandable={drilldownData.length > 0}
        defaultExpanded={showDrilldown}
      />
    </div>
  );
}