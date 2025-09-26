import React, { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface HierarchyItem {
  id: string;
  title: string;
  description?: string;
  value?: string;
  badge?: string;
  children?: HierarchyItem[];
  onClick?: () => void;
}

interface SimpleHierarchyProps {
  items: HierarchyItem[];
  level?: number;
  className?: string;
}

export function SimpleHierarchy({ items, level = 0, className = "" }: SimpleHierarchyProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleItem = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <div className={`space-y-1 ${className}`}>
      {items.map((item) => {
        const isExpanded = expandedItems.has(item.id);
        const hasChildren = item.children && item.children.length > 0;
        const indentLevel = level * 1.5; // rem units

        return (
          <div
            key={item.id}
            className="aegis-card-glass border-l-2 border-primary/20"
            style={{ marginLeft: `${indentLevel}rem` }}
          >
            <div 
              className={`
                flex items-center justify-between p-3 cursor-pointer
                hover:bg-primary/5 transition-colors duration-200
                ${isExpanded ? 'bg-primary/10' : ''}
              `}
              onClick={() => {
                if (hasChildren) {
                  toggleItem(item.id);
                } else if (item.onClick) {
                  item.onClick();
                }
              }}
            >
              <div className="flex items-center gap-3 flex-grow">
                {/* Expansion Indicator */}
                {hasChildren && (
                  <div className="text-muted-foreground hover:text-primary transition-colors">
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </div>
                )}
                
                {/* Content */}
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-foreground truncate aegis-text-enhanced">
                      {item.title}
                    </h3>
                    {item.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-sm text-muted-foreground mt-1 aegis-text-secondary">
                      {item.description}
                    </p>
                  )}
                </div>
                
                {/* Value */}
                {item.value && (
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary aegis-card-value">
                      {item.value}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Expanded Children */}
            {isExpanded && hasChildren && (
              <div className="border-t border-border/20 pt-2 pb-2">
                <SimpleHierarchy
                  items={item.children!}
                  level={level + 1}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}