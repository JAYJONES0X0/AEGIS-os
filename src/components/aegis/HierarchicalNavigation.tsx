import { useState } from "react";
import { 
  Home, 
  Heart, 
  Users, 
  Shield, 
  DollarSign, 
  BarChart3, 
  Settings, 
  MessageSquare,
  Stethoscope,
  Calendar,
  Send,
  Eye,
  AlertTriangle,
  FileText,
  TrendingUp,
  Clock,
  GraduationCap,
  Clipboard,
  FileCheck,
  Receipt,
  CreditCard,
  PieChart,
  Building,
  UserPlus,
  Database,
  Download
} from "lucide-react";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

export type DomainKey = 
  | "command-centre" 
  | "healthcare" 
  | "care-support" 
  | "workforce" 
  | "quality-compliance" 
  | "finance-operations" 
  | "analytics-insights" 
  | "administration" 
  | "community-family";

export type SubTabKey = string;

interface SubTab {
  key: SubTabKey;
  label: string;
  icon: React.ComponentType<any>;
  description?: string;
}

interface Domain {
  key: DomainKey;
  label: string;
  icon: React.ComponentType<any>;
  theme: string;
  subTabs: SubTab[];
  description: string;
}

const domains: Domain[] = [
  {
    key: "command-centre",
    label: "Command Centre",
    icon: Home,
    theme: "aegis-tab-home",
    description: "Cathedral aura - Shifts, Alerts, Broadcasts, Co-Pilot Panel",
    subTabs: [
      { key: "dashboard", label: "Dashboard", icon: BarChart3 },
      { key: "shifts", label: "Shifts", icon: Clock },
      { key: "alerts", label: "Alerts", icon: AlertTriangle },
      { key: "broadcasts", label: "Broadcasts", icon: MessageSquare },
      { key: "copilot", label: "Co-Pilot Panel", icon: Heart }
    ]
  },
  {
    key: "healthcare",
    label: "Healthcare",
    icon: Heart,
    theme: "aegis-tab-emar",
    description: "Clean White + Controlled Blue - Clinical operations",
    subTabs: [
      { key: "medications", label: "Medications (eMAR)", icon: Stethoscope },
      { key: "appointments", label: "Appointments", icon: Calendar },
      { key: "referrals", label: "Referrals", icon: Send },
      { key: "observations", label: "Observations", icon: Eye },
      { key: "safeguarding", label: "Safeguarding", icon: Shield },
      { key: "documents", label: "Documents", icon: FileText }
    ]
  },
  {
    key: "care-support",
    label: "Care & Support",
    icon: Users,
    theme: "aegis-tab-clients",
    description: "Teal + Warm White - Daily care operations",
    subTabs: [
      { key: "daily-notes", label: "Daily Notes", icon: FileText },
      { key: "care-plans", label: "Care Plans", icon: Clipboard },
      { key: "risk-pbs", label: "Risk & PBS", icon: Shield },
      { key: "handover", label: "Handover", icon: MessageSquare },
      { key: "client-files", label: "Client Files", icon: Users }
    ]
  },
  {
    key: "workforce",
    label: "Workforce",
    icon: Users,
    theme: "aegis-tab-workforce",
    description: "Steel Grey + Cyan - Staff management",
    subTabs: [
      { key: "rota", label: "Rota", icon: Calendar },
      { key: "payroll", label: "Payroll", icon: DollarSign },
      { key: "timesheets", label: "Timesheets", icon: Clock },
      { key: "training", label: "Training", icon: GraduationCap },
      { key: "staff-files", label: "Staff Files", icon: Users },
      { key: "competency", label: "Competency", icon: FileCheck }
    ]
  },
  {
    key: "quality-compliance",
    label: "Quality & Compliance",
    icon: Shield,
    theme: "aegis-tab-quality",
    description: "Deep Navy + Antique Gold - Regulatory compliance",
    subTabs: [
      { key: "policies", label: "Policies (QCS sync)", icon: FileText },
      { key: "audits", label: "Audits", icon: Clipboard },
      { key: "cqc-evidence", label: "CQC Evidence", icon: Shield },
      { key: "risk-register", label: "Risk Register", icon: AlertTriangle },
      { key: "actions", label: "Actions", icon: TrendingUp }
    ]
  },
  {
    key: "finance-operations",
    label: "Finance & Operations",
    icon: DollarSign,
    theme: "aegis-tab-finance",
    description: "Black + Institutional Green + Signal Red - Financial operations",
    subTabs: [
      { key: "invoicing", label: "Invoicing", icon: Receipt },
      { key: "funding", label: "Funding", icon: CreditCard },
      { key: "petty-cash", label: "Petty Cash", icon: DollarSign },
      { key: "payroll-export", label: "Payroll Export", icon: Download },
      { key: "reports", label: "Reports", icon: BarChart3 }
    ]
  },
  {
    key: "analytics-insights",
    label: "Analytics & Insights",
    icon: BarChart3,
    theme: "aegis-tab-analytics",
    description: "Cosmic Indigo + Muted Gradient - Data intelligence",
    subTabs: [
      { key: "kpis", label: "KPIs", icon: BarChart3 },
      { key: "dashboards", label: "Dashboards", icon: PieChart },
      { key: "trends", label: "Trends", icon: TrendingUp },
      { key: "outcomes", label: "Outcomes", icon: Eye },
      { key: "scheduled-reports", label: "Scheduled Reports", icon: FileText }
    ]
  },
  {
    key: "administration",
    label: "Administration",
    icon: Settings,
    theme: "aegis-tab-admin",
    description: "Industrial Grey + Orange - System administration",
    subTabs: [
      { key: "tenancy", label: "Tenancy & Sites", icon: Building },
      { key: "users-roles", label: "Users & Roles", icon: UserPlus },
      { key: "integrations", label: "Integrations", icon: Settings },
      { key: "data-retention", label: "Data & Retention", icon: Database },
      { key: "backups", label: "Backups & DR", icon: Shield }
    ]
  },
  {
    key: "community-family",
    label: "Community & Family",
    icon: MessageSquare,
    theme: "aegis-tab-home",
    description: "Neutral White + Muted Violet - External engagement",
    subTabs: [
      { key: "family-portal", label: "Family Portal", icon: Users },
      { key: "messaging", label: "Messaging", icon: MessageSquare },
      { key: "commissioner-access", label: "Commissioner Access", icon: Building },
      { key: "reports", label: "Reports", icon: FileText },
      { key: "consents", label: "Consents", icon: FileCheck }
    ]
  }
];

interface HierarchicalNavigationProps {
  activeDomain: DomainKey;
  activeSubTab?: SubTabKey;
  onDomainChange: (domain: DomainKey) => void;
  onSubTabChange: (subTab: SubTabKey) => void;
}

export function HierarchicalNavigation({
  activeDomain,
  activeSubTab,
  onDomainChange,
  onSubTabChange
}: HierarchicalNavigationProps) {
  const [hoveredDomain, setHoveredDomain] = useState<DomainKey | null>(null);
  
  const currentDomain = domains.find(d => d.key === activeDomain);

  return (
    <div className="border-b border-border/20 bg-card shadow-[0_2px_4px_0_rgba(0,0,0,0.65)]">
      {/* Main Domain Navigation */}
      <div className="px-6 py-3 bg-background">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {domains.map((domain) => {
              const Icon = domain.icon;
              const isActive = activeDomain === domain.key;
              const isHovered = hoveredDomain === domain.key;
              
              return (
                <Button
                  key={domain.key}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onDomainChange(domain.key)}
                  onMouseEnter={() => setHoveredDomain(domain.key)}
                  onMouseLeave={() => setHoveredDomain(null)}
                  className={`
                    relative px-3 py-2 h-auto flex items-center gap-2 transition-all duration-350
                    ${isActive 
                      ? 'bg-primary text-primary-foreground shadow-[0_0_0_1px_rgba(212,175,55,0.28),0_6px_18px_rgba(0,0,0,0.45)]' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }
                    ${isHovered && !isActive ? 'transform translate-y-[-1px]' : ''}
                  `}
                >
                  <Icon className={`w-4 h-4 transition-transform duration-350 ${isHovered ? 'scale-110' : ''}`} />
                  <span className="font-medium text-sm">{domain.label}</span>
                  {isActive && (
                    <div className="absolute inset-0 rounded-md bg-gradient-to-r from-primary/10 to-primary/5" />
                  )}
                </Button>
              );
            })}
          </div>
          
          {/* Domain Description */}
          {currentDomain && (
            <div className="text-xs text-muted-foreground font-mono">
              {currentDomain.description}
            </div>
          )}
        </div>
      </div>

      {/* Sub-Tab Navigation */}
      {currentDomain && (
        <div className={`px-6 py-2 ${currentDomain.theme} border-t border-border/10`}>
          <Tabs value={activeSubTab} onValueChange={onSubTabChange} className="w-full">
            <TabsList className="h-auto p-1 bg-muted/30 backdrop-blur-sm">
              {currentDomain.subTabs.map((subTab) => {
                const SubIcon = subTab.icon;
                return (
                  <TabsTrigger
                    key={subTab.key}
                    value={subTab.key}
                    className="
                      px-3 py-2 gap-2 text-xs font-medium transition-all duration-350
                      data-[state=active]:bg-background data-[state=active]:text-foreground
                      data-[state=active]:shadow-[0_2px_4px_0_rgba(0,0,0,0.45)]
                      hover:bg-background/50
                    "
                  >
                    <SubIcon className="w-3.5 h-3.5" />
                    {subTab.label}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>
        </div>
      )}
    </div>
  );
}

export { domains };
export type { Domain, SubTab };