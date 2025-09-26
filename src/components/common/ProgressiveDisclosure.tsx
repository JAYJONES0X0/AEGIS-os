import React, { useState, ReactNode } from "react";
import { ChevronRight, ChevronDown, Info, ExternalLink, Plus, Minus } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface DisclosureItem {
  id: string;
  title: string;
  description?: string;
  content?: ReactNode;
  badge?: string | number;
  status?: 'default' | 'active' | 'warning' | 'error' | 'success';
  icon?: ReactNode;
  actions?: Array<{
    label: string;
    onClick: () => void;
    icon?: ReactNode;
    variant?: 'default' | 'secondary' | 'destructive';
  }>;
  children?: DisclosureItem[];
  defaultExpanded?: boolean;
  expandable?: boolean;
}

interface ProgressiveDisclosureProps {
  items: DisclosureItem[];
  title?: string;
  description?: string;
  allowMultiple?: boolean;
  level?: number;
  className?: string;
  onItemClick?: (item: DisclosureItem, path: string[]) => void;
}

export function ProgressiveDisclosure({
  items,
  title,
  description,
  allowMultiple = false,
  level = 0,
  className = "",
  onItemClick
}: ProgressiveDisclosureProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(
    new Set(items.filter(item => item.defaultExpanded).map(item => item.id))
  );

  const toggleItem = (itemId: string) => {
    if (!allowMultiple) {
      // Only allow one item expanded at a time
      setExpandedItems(new Set([itemId]));
    } else {
      // Allow multiple items expanded
      const newExpanded = new Set(expandedItems);
      if (newExpanded.has(itemId)) {
        newExpanded.delete(itemId);
      } else {
        newExpanded.add(itemId);
      }
      setExpandedItems(newExpanded);
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'active': return 'border-l-blue-400 bg-blue-50/10';
      case 'warning': return 'border-l-yellow-400 bg-yellow-50/10';
      case 'error': return 'border-l-red-400 bg-red-50/10';
      case 'success': return 'border-l-green-400 bg-green-50/10';
      default: return 'border-l-border/40';
    }
  };

  const getBadgeVariant = (status?: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'warning': return 'secondary';
      case 'error': return 'destructive';
      case 'success': return 'secondary';
      default: return 'outline';
    }
  };

  const handleItemClick = (item: DisclosureItem, path: string[] = []) => {
    if (onItemClick) {
      onItemClick(item, [...path, item.id]);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Header */}
      {(title || description) && level === 0 && (
        <div className="p-4 border-b border-border/20">
          {title && (
            <h2 className="text-lg font-semibold text-foreground aegis-text-primary">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-sm text-muted-foreground mt-1 aegis-text-secondary">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Items */}
      <div className="space-y-1">
        {items.map((item, index) => {
          const isExpanded = expandedItems.has(item.id);
          const hasChildren = item.children && item.children.length > 0;
          const isExpandable = item.expandable !== false && (hasChildren || item.content);

          return (
            <div
              key={item.id}
              className={`
                border-l-2 ${getStatusColor(item.status)}
                ${level > 0 ? 'ml-4' : ''}
              `}
            >
              <Collapsible open={isExpanded} onOpenChange={() => isExpandable && toggleItem(item.id)}>
                <div
                  className={`
                    group flex items-center justify-between p-3 hover:bg-primary/5 
                    transition-colors duration-200 cursor-pointer
                    ${isExpanded ? 'bg-primary/10' : ''}
                  `}
                  onClick={() => !isExpandable && handleItemClick(item)}
                >
                  <div className="flex items-center gap-3 flex-grow min-w-0">
                    {/* Expansion Trigger */}
                    {isExpandable && (
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </Button>
                      </CollapsibleTrigger>
                    )}

                    {/* Icon */}
                    {item.icon && (
                      <div className="text-primary flex-shrink-0">
                        {item.icon}
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground truncate aegis-text-enhanced">
                          {item.title}
                        </span>
                        {item.badge && (
                          <Badge variant={getBadgeVariant(item.status)} className="text-xs">
                            {item.badge}
                          </Badge>
                        )}
                        {item.description && (
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{item.description}</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  {item.actions && item.actions.length > 0 && (
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.actions.map((action, actionIndex) => (
                        <Button
                          key={actionIndex}
                          variant={action.variant || "ghost"}
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            action.onClick();
                          }}
                          className="h-6 px-2"
                        >
                          {action.icon && <span className="mr-1">{action.icon}</span>}
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Expanded Content */}
                <CollapsibleContent className="pl-6 pr-3 pb-3">
                  {item.content && (
                    <div className="p-3 bg-muted/20 rounded-md mb-3">
                      {item.content}
                    </div>
                  )}
                  
                  {hasChildren && (
                    <ProgressiveDisclosure
                      items={item.children!}
                      allowMultiple={allowMultiple}
                      level={level + 1}
                      onItemClick={(childItem, path) => 
                        handleItemClick(childItem, [item.id, ...path])
                      }
                    />
                  )}
                </CollapsibleContent>
              </Collapsible>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Specialized components for different use cases
interface QuickActionsDisclosureProps {
  actions: Array<{
    id: string;
    title: string;
    description?: string;
    icon?: ReactNode;
    onClick: () => void;
    badge?: string;
    status?: 'default' | 'active' | 'warning' | 'error' | 'success';
  }>;
  title?: string;
  className?: string;
}

export function QuickActionsDisclosure({ 
  actions, 
  title = "Quick Actions", 
  className = "" 
}: QuickActionsDisclosureProps) {
  const disclosureItems: DisclosureItem[] = actions.map(action => ({
    id: action.id,
    title: action.title,
    description: action.description,
    icon: action.icon,
    badge: action.badge,
    status: action.status,
    expandable: false,
    actions: [{
      label: "Execute",
      onClick: action.onClick,
      icon: <ExternalLink className="h-3 w-3" />
    }]
  }));

  return (
    <div className={`aegis-card-glass ${className}`}>
      <ProgressiveDisclosure
        items={disclosureItems}
        title={title}
        allowMultiple={true}
      />
    </div>
  );
}

// Data drill-down component
interface DataDrilldownProps {
  data: Array<{
    id: string;
    label: string;
    value: string | number;
    children?: Array<{
      id: string;
      label: string;
      value: string | number;
      trend?: 'up' | 'down' | 'stable';
    }>;
  }>;
  title?: string;
  className?: string;
}

export function DataDrilldown({ data, title = "Data Overview", className = "" }: DataDrilldownProps) {
  const disclosureItems: DisclosureItem[] = data.map(item => ({
    id: item.id,
    title: item.label,
    badge: item.value.toString(),
    children: item.children?.map(child => ({
      id: child.id,
      title: child.label,
      badge: child.value.toString(),
      status: child.trend === 'up' ? 'success' : child.trend === 'down' ? 'error' : 'default',
      expandable: false
    }))
  }));

  return (
    <div className={`aegis-card-glass ${className}`}>
      <ProgressiveDisclosure
        items={disclosureItems}
        title={title}
        allowMultiple={false}
      />
    </div>
  );
}