import React from "react";
import { ChevronRight, Home, ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface BreadcrumbItem {
  id: string;
  label: string;
  description?: string;
  badge?: string | number;
  onClick?: () => void;
}

interface BreadcrumbNavigationProps {
  items: BreadcrumbItem[];
  onNavigate?: (itemId: string, index: number) => void;
  onBack?: () => void;
  showHome?: boolean;
  className?: string;
}

export function BreadcrumbNavigation({
  items,
  onNavigate,
  onBack,
  showHome = true,
  className = ""
}: BreadcrumbNavigationProps) {
  const handleItemClick = (item: BreadcrumbItem, index: number) => {
    if (item.onClick) {
      item.onClick();
    } else if (onNavigate) {
      onNavigate(item.id, index);
    }
  };

  return (
    <div className={`flex items-center gap-2 p-4 aegis-card-glass border-b border-border/20 ${className}`}>
      {/* Back Button */}
      {onBack && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="mr-2 hover:bg-primary/10"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
      )}

      {/* Home Icon */}
      {showHome && (
        <>
          <Button
            variant="ghost"
            size="sm"
            className="p-1 hover:bg-primary/10"
            onClick={() => onNavigate?.('home', -1)}
          >
            <Home className="h-4 w-4" />
          </Button>
          {items.length > 0 && (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
        </>
      )}

      {/* Breadcrumb Items */}
      <div className="flex items-center gap-2 flex-wrap">
        {items.map((item, index) => (
          <React.Fragment key={item.id}>
            <Button
              variant="ghost"
              size="sm"
              className={`
                flex items-center gap-2 px-3 py-1 h-auto min-h-8
                ${index === items.length - 1 
                  ? 'text-primary font-medium cursor-default' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-primary/10 cursor-pointer'
                }
              `}
              onClick={() => index < items.length - 1 && handleItemClick(item, index)}
              disabled={index === items.length - 1}
            >
              <span className="aegis-text-enhanced">{item.label}</span>
              {item.badge && (
                <Badge variant="secondary" className="text-xs">
                  {item.badge}
                </Badge>
              )}
            </Button>
            
            {index < items.length - 1 && (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Current Item Description */}
      {items.length > 0 && items[items.length - 1].description && (
        <div className="ml-4 text-sm text-muted-foreground aegis-text-secondary">
          {items[items.length - 1].description}
        </div>
      )}
    </div>
  );
}

// Context provider for breadcrumb state management
interface BreadcrumbContextType {
  items: BreadcrumbItem[];
  pushItem: (item: BreadcrumbItem) => void;
  popItem: () => void;
  navigateToIndex: (index: number) => void;
  clear: () => void;
}

const BreadcrumbContext = React.createContext<BreadcrumbContextType | null>(null);

export function BreadcrumbProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<BreadcrumbItem[]>([]);

  const pushItem = React.useCallback((item: BreadcrumbItem) => {
    setItems(prev => [...prev, item]);
  }, []);

  const popItem = React.useCallback(() => {
    setItems(prev => prev.slice(0, -1));
  }, []);

  const navigateToIndex = React.useCallback((index: number) => {
    setItems(prev => prev.slice(0, index + 1));
  }, []);

  const clear = React.useCallback(() => {
    setItems([]);
  }, []);

  const value = React.useMemo(() => ({
    items,
    pushItem,
    popItem,
    navigateToIndex,
    clear
  }), [items, pushItem, popItem, navigateToIndex, clear]);

  return (
    <BreadcrumbContext.Provider value={value}>
      {children}
    </BreadcrumbContext.Provider>
  );
}

export function useBreadcrumb() {
  const context = React.useContext(BreadcrumbContext);
  if (!context) {
    throw new Error('useBreadcrumb must be used within a BreadcrumbProvider');
  }
  return context;
}