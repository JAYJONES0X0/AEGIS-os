import { 
  Home, 
  Users, 
  UserCheck, 
  ClipboardCheck, 
  Pill, 
  Calendar, 
  BarChart3, 
  Settings 
} from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../ui/utils";

export type TabKey = 
  | "home" 
  | "clients" 
  | "workforce" 
  | "quality" 
  | "emar" 
  | "referrals" 
  | "analytics" 
  | "admin";

interface NavigationProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

const tabs = [
  { key: "home" as const, label: "Home", icon: Home },
  { key: "clients" as const, label: "Clients", icon: Users },
  { key: "workforce" as const, label: "Workforce", icon: UserCheck },
  { key: "quality" as const, label: "Quality", icon: ClipboardCheck },
  { key: "emar" as const, label: "eMAR", icon: Pill },
  { key: "referrals" as const, label: "Referrals", icon: Calendar },
  { key: "analytics" as const, label: "Analytics", icon: BarChart3 },
  { key: "admin" as const, label: "Admin", icon: Settings }
];

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const getTabClasses = (tabKey: TabKey, isActive: boolean) => {
    const baseClasses = "flex-shrink-0 rounded-none border-b-2 border-transparent px-6 py-3 transition-all duration-[350ms] ease-[cubic-bezier(0.19,1,0.22,1)]";
    
    if (!isActive) {
      return cn(baseClasses, "text-muted-foreground hover:text-foreground");
    }

    // Tab-specific active styling
    switch (tabKey) {
      case "home":
        return cn(baseClasses, "border-[#d4af37] bg-gradient-to-r from-transparent to-[rgba(212,175,55,0.1)] text-[#d4af37]");
      case "clients": 
        return cn(baseClasses, "border-[#2e888f] bg-gradient-to-r from-transparent to-[rgba(46,136,143,0.1)] text-[#2e888f]");
      case "workforce":
        return cn(baseClasses, "border-[#3aaed8] bg-gradient-to-r from-transparent to-[rgba(58,174,216,0.1)] text-[#3aaed8]");
      case "quality":
        return cn(baseClasses, "border-[#d4af37] bg-gradient-to-r from-transparent to-[rgba(212,175,55,0.1)] text-[#d4af37]");
      case "emar":
        return cn(baseClasses, "border-[#1d4ed8] bg-gradient-to-r from-transparent to-[rgba(29,78,216,0.1)] text-[#1d4ed8]");
      case "referrals":
        return cn(baseClasses, "border-[#3b82f6] bg-gradient-to-r from-transparent to-[rgba(59,130,246,0.1)] text-[#3b82f6]");
      case "analytics":
        return cn(baseClasses, "border-[#6366f1] bg-gradient-to-r from-transparent to-[rgba(99,102,241,0.1)] text-[#6366f1]");
      case "admin":
        return cn(baseClasses, "border-[#ea580c] bg-gradient-to-r from-transparent to-[rgba(234,88,12,0.1)] text-[#ea580c]");
      default:
        return cn(baseClasses, "border-primary text-primary");
    }
  };

  return (
    <nav className="border-b border-border/20 bg-card shadow-[0_2px_4px_0_rgba(0,0,0,0.65)]">
      <div className="flex overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          
          return (
            <Button
              key={tab.key}
              variant="ghost"
              onClick={() => onTabChange(tab.key)}
              className={getTabClasses(tab.key, isActive)}
            >
              <Icon className="mr-2 h-4 w-4" />
              <span className="font-medium tracking-wide">{tab.label}</span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
}