import { 
  Bell, User, Settings, LogOut, Shield, Database, Key, 
  Server, Code, Terminal, Users, Lock, Globe, Activity,
  Cog, FileText, BarChart3, Zap, AlertTriangle, Eye,
  Wrench, CloudCog, HardDrive, Network, Cpu, Monitor,
  Calendar, Mail, Phone, MapPin, Building, Award,
  Clipboard, Heart, Stethoscope, Pill, UserCheck,
  TrendingUp, DollarSign, PieChart, Calculator,
  BookOpen, GraduationCap, Target, CheckCircle,
  Layers, Boxes, Package, Truck, Warehouse,
  Sparkles, Bot, Brain, Lightbulb, Rocket
} from "lucide-react";
import aegisLogo from 'figma:asset/d9dc6d6d68a082dabbe0bfc1f4c1a58c6ea8f3b9.png';
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger,
  DropdownMenuLabel 
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ScrollArea } from "../ui/scroll-area";
import { useState } from "react";

interface SessionBarProps {
  user: {
    name: string;
    role: string;
    avatar?: string;
  };
  notifications?: number;
}

// Administrative sections with access levels and system codes
const ADMIN_SECTIONS = {
  // Core System Administration
  systemCore: {
    title: "System Core",
    accessLevel: "L1-CRITICAL",
    code: "SYS-001",
    color: "#DC2626",
    items: [
      { icon: Database, label: "Database Management", code: "DB-001", status: "active" },
      { icon: Server, label: "Server Configuration", code: "SRV-001", status: "secure" },
      { icon: Network, label: "Network Security", code: "NET-001", status: "monitored" },
      { icon: HardDrive, label: "Storage Systems", code: "STG-001", status: "optimal" },
      { icon: Cpu, label: "Performance Tuning", code: "CPU-001", status: "active" }
    ]
  },
  
  // Security & Access Control
  security: {
    title: "Security & Access",
    accessLevel: "L1-SECURE",
    code: "SEC-001",
    color: "#D97706",
    items: [
      { icon: Shield, label: "Access Control Matrix", code: "ACM-001", status: "protected" },
      { icon: Key, label: "API Key Management", code: "API-001", status: "encrypted" },
      { icon: Lock, label: "User Permissions", code: "USR-001", status: "active" },
      { icon: Eye, label: "Audit Logs", code: "AUD-001", status: "logging" },
      { icon: AlertTriangle, label: "Security Alerts", code: "ALT-001", status: "monitoring" }
    ]
  },
  
  // Healthcare Operations
  healthcare: {
    title: "Healthcare Operations", 
    accessLevel: "L2-CLINICAL",
    code: "HLT-001",
    color: "#059669",
    items: [
      { icon: Heart, label: "Patient Records", code: "PAT-001", status: "gdpr" },
      { icon: Stethoscope, label: "Clinical Workflows", code: "CLN-001", status: "active" },
      { icon: Pill, label: "Medication Management", code: "MED-001", status: "controlled" },
      { icon: UserCheck, label: "Care Plans", code: "CAR-001", status: "monitored" },
      { icon: Activity, label: "Vital Signs Integration", code: "VIT-001", status: "realtime" }
    ]
  },
  
  // Financial Operations
  finance: {
    title: "Financial Operations",
    accessLevel: "L2-FINANCE", 
    code: "FIN-001",
    color: "#0284C7",
    items: [
      { icon: DollarSign, label: "Budget Management", code: "BDG-001", status: "secure" },
      { icon: Calculator, label: "Invoice Processing", code: "INV-001", status: "automated" },
      { icon: PieChart, label: "Financial Analytics", code: "FAN-001", status: "reporting" },
      { icon: TrendingUp, label: "Revenue Tracking", code: "REV-001", status: "active" },
      { icon: BarChart3, label: "Cost Center Analysis", code: "CST-001", status: "analyzing" }
    ]
  },
  
  // Quality & Compliance
  quality: {
    title: "Quality & Compliance",
    accessLevel: "L2-COMPLIANCE",
    code: "QAL-001", 
    color: "#7C2D12",
    items: [
      { icon: Award, label: "CQC Compliance", code: "CQC-001", status: "certified" },
      { icon: Clipboard, label: "Quality Metrics", code: "QTY-001", status: "tracking" },
      { icon: Target, label: "Performance KPIs", code: "KPI-001", status: "measuring" },
      { icon: CheckCircle, label: "Audit Compliance", code: "ADT-001", status: "compliant" },
      { icon: FileText, label: "Policy Management", code: "POL-001", status: "current" }
    ]
  },
  
  // Workforce Management
  workforce: {
    title: "Workforce Management",
    accessLevel: "L3-HR",
    code: "WRK-001",
    color: "#6366F1",
    items: [
      { icon: Users, label: "Staff Directory", code: "STF-001", status: "active" },
      { icon: Calendar, label: "Shift Management", code: "SFT-001", status: "scheduling" },
      { icon: GraduationCap, label: "Training Programs", code: "TRN-001", status: "ongoing" },
      { icon: BookOpen, label: "Competency Matrix", code: "CMP-001", status: "tracking" },
      { icon: Award, label: "Performance Reviews", code: "PRF-001", status: "reviewing" }
    ]
  },
  
  // Operations & Supply
  operations: {
    title: "Operations & Supply",
    accessLevel: "L3-OPS",
    code: "OPS-001", 
    color: "#9333EA",
    items: [
      { icon: Boxes, label: "Inventory Control", code: "INV-001", status: "tracking" },
      { icon: Package, label: "Supply Chain", code: "SUP-001", status: "optimized" },
      { icon: Truck, label: "Logistics", code: "LOG-001", status: "routing" },
      { icon: Warehouse, label: "Asset Management", code: "AST-001", status: "managed" },
      { icon: Layers, label: "Procurement", code: "PRC-001", status: "sourcing" }
    ]
  },
  
  // AI & Analytics
  aiHub: {
    title: "AI & Analytics Hub",
    accessLevel: "L1-AI",
    code: "AI-001",
    color: "#EC4899", 
    items: [
      { icon: Brain, label: "AI Models", code: "MDL-001", status: "learning" },
      { icon: Bot, label: "Copilot Configuration", code: "COP-001", status: "assisting" },
      { icon: Sparkles, label: "Predictive Analytics", code: "PRD-001", status: "forecasting" },
      { icon: Lightbulb, label: "Insights Engine", code: "INS-001", status: "analyzing" },
      { icon: Rocket, label: "Innovation Lab", code: "LAB-001", status: "experimenting" }
    ]
  },
  
  // Developer Tools
  developer: {
    title: "Developer Console",
    accessLevel: "L1-DEV",
    code: "DEV-001",
    color: "#0891B2",
    items: [
      { icon: Code, label: "API Console", code: "API-001", status: "ready" },
      { icon: Terminal, label: "System Console", code: "CMD-001", status: "available" },
      { icon: Monitor, label: "System Monitoring", code: "MON-001", status: "watching" },
      { icon: Wrench, label: "Debug Tools", code: "DBG-001", status: "tools" },
      { icon: CloudCog, label: "Cloud Services", code: "CLD-001", status: "connected" }
    ]
  }
};

// Status indicators with colors and pulsing effects
const STATUS_STYLES = {
  active: "bg-green-500/20 text-green-400 border-green-500/30 heartbeat-vital",
  secure: "bg-blue-500/20 text-blue-400 border-blue-500/30 heartbeat-observation", 
  protected: "bg-purple-500/20 text-purple-400 border-purple-500/30 heartbeat-medication",
  encrypted: "bg-amber-500/20 text-amber-400 border-amber-500/30 aegis-pulse",
  monitoring: "bg-red-500/20 text-red-400 border-red-500/30 heartbeat-urgent",
  logging: "bg-orange-500/20 text-orange-400 border-orange-500/30 heartbeat-wellness",
  gdpr: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30 heartbeat-critical",
  controlled: "bg-rose-500/20 text-rose-400 border-rose-500/30 heartbeat-medication",
  realtime: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30 heartbeat-vital",
  automated: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 heartbeat-wellness",
  reporting: "bg-teal-500/20 text-teal-400 border-teal-500/30 heartbeat-observation",
  analyzing: "bg-lime-500/20 text-lime-400 border-lime-500/30 heartbeat-urgent",
  certified: "bg-green-600/20 text-green-300 border-green-600/30 heartbeat-wellness",
  tracking: "bg-blue-600/20 text-blue-300 border-blue-600/30 heartbeat-observation",
  measuring: "bg-violet-500/20 text-violet-400 border-violet-500/30 heartbeat-vital",
  compliant: "bg-emerald-600/20 text-emerald-300 border-emerald-600/30 heartbeat-wellness",
  current: "bg-sky-500/20 text-sky-400 border-sky-500/30 heartbeat-observation",
  scheduling: "bg-purple-600/20 text-purple-300 border-purple-600/30 heartbeat-medication",
  ongoing: "bg-amber-600/20 text-amber-300 border-amber-600/30 heartbeat-wellness",
  reviewing: "bg-rose-600/20 text-rose-300 border-rose-600/30 heartbeat-observation",
  optimized: "bg-green-400/20 text-green-300 border-green-400/30 heartbeat-vital",
  routing: "bg-blue-400/20 text-blue-300 border-blue-400/30 heartbeat-wellness",
  managed: "bg-indigo-400/20 text-indigo-300 border-indigo-400/30 heartbeat-observation",
  sourcing: "bg-purple-400/20 text-purple-300 border-purple-400/30 heartbeat-wellness",
  learning: "bg-pink-500/20 text-pink-400 border-pink-500/30 heartbeat-urgent",
  assisting: "bg-emerald-400/20 text-emerald-300 border-emerald-400/30 heartbeat-vital",
  forecasting: "bg-orange-400/20 text-orange-300 border-orange-400/30 heartbeat-wellness",
  experimenting: "bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30 heartbeat-critical",
  ready: "bg-cyan-600/20 text-cyan-300 border-cyan-600/30 heartbeat-observation",
  available: "bg-lime-600/20 text-lime-300 border-lime-600/30 heartbeat-wellness",
  watching: "bg-red-600/20 text-red-300 border-red-600/30 heartbeat-urgent",
  tools: "bg-gray-500/20 text-gray-400 border-gray-500/30 heartbeat-observation",
  connected: "bg-blue-300/20 text-blue-200 border-blue-300/30 heartbeat-vital",
  optimal: "bg-green-300/20 text-green-200 border-green-300/30 heartbeat-wellness",
  monitored: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30 heartbeat-observation"
};

export function SessionBar({ user, notifications = 0 }: SessionBarProps) {
  const [notificationCount, setNotificationCount] = useState(notifications);

  return (
    <div className="navbar-blur-only flex items-center gap-3 px-4 py-2" style={{
      background: 'rgba(18, 22, 28, 0.95)',
      border: '1px solid rgba(212, 175, 55, 0.15)',
      borderRadius: '0',
      boxShadow: 'var(--shadow-deep), inset 0 1px 0 rgba(212, 175, 55, 0.06), inset 0 -1px 0 rgba(0, 0, 0, 0.3)'
    }}>
      <div className="flex items-center gap-3 flex-1">
        <img 
          src={aegisLogo} 
          alt="AEGIS Logo" 
          className="h-10 w-auto"
        />
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-foreground">
            AEGIS
          </h1>
          <p className="text-xs text-muted-foreground font-medium">
            Health & Social Care Management System
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="relative transition-all duration-[350ms] ease-[cubic-bezier(0.19,1,0.22,1)] hover:bg-primary/10"
        >
          <Bell className="h-4 w-4" />
          {notificationCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 text-xs p-0 flex items-center justify-center bg-primary text-primary-foreground"
            >
              {notificationCount > 9 ? "9+" : notificationCount}
            </Badge>
          )}
        </Button>

        {/* Settings */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="transition-all duration-[350ms] ease-[cubic-bezier(0.19,1,0.22,1)] hover:bg-primary/10"
        >
          <Settings className="h-4 w-4" />
        </Button>

        {/* Enhanced Administrative User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="flex items-center gap-2 px-2 transition-all duration-[350ms] ease-[cubic-bezier(0.19,1,0.22,1)] hover:bg-primary/10"
            >
              <Avatar className="h-8 w-8 ring-2 ring-primary/20 healthcare-heartbeat heartbeat-vital">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-xs bg-primary/20 text-primary font-semibold">
                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="text-sm font-medium tracking-wide">{user.name}</p>
                <p className="text-xs text-primary font-medium">{user.role}</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent 
            align="end" 
            className="w-[480px] max-h-[85vh] aegis-glass-panel border-0 p-0"
            sideOffset={8}
          >
            {/* Header Section */}
            <div className="px-4 py-3 border-b border-border/20 bg-gradient-to-r from-primary/5 to-transparent">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 ring-2 ring-primary/30 healthcare-heartbeat heartbeat-vital">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-sm bg-primary/20 text-primary font-bold">
                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{user.name}</p>
                  <p className="text-xs text-primary font-medium">{user.role}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="text-xs px-2 py-0 bg-primary/20 text-primary border-primary/30 healthcare-heartbeat heartbeat-wellness access-badge">
                      ADMIN-L1
                    </Badge>
                    <Badge className="text-xs px-2 py-0 bg-green-500/20 text-green-400 border-green-500/30 healthcare-heartbeat heartbeat-vital access-badge">
                      AUTHENTICATED
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Scrollable Administrative Sections */}
            <ScrollArea className="h-[600px] institutional-scroll">
              <div className="p-2 space-y-1">
                
                {/* Quick Access Section */}
                <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 py-1">
                  Quick Access
                </DropdownMenuLabel>
                <DropdownMenuItem className="aegis-ceremonial-hover">
                  <User className="mr-3 h-4 w-4" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">Profile & Settings</div>
                    <div className="text-xs text-muted-foreground">Personal configuration</div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="aegis-ceremonial-hover">
                  <Settings className="mr-3 h-4 w-4" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">System Preferences</div>
                    <div className="text-xs text-muted-foreground">Global system settings</div>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-border/20 my-2" />

                {/* Administrative Sections */}
                {Object.entries(ADMIN_SECTIONS).map(([key, section]) => (
                  <div key={key} className="space-y-1">
                    <DropdownMenuLabel className="text-xs font-semibold uppercase tracking-wider px-2 py-1 flex items-center gap-2">
                      <div 
                        className="w-2 h-2 rounded-full healthcare-heartbeat heartbeat-urgent" 
                        style={{ backgroundColor: section.color }}
                      />
                      <span className="text-muted-foreground">{section.title}</span>
                      <Badge className={`text-xs px-1.5 py-0 ml-auto access-badge ${STATUS_STYLES.secure}`}>
                        {section.accessLevel}
                      </Badge>
                    </DropdownMenuLabel>
                    
                    <div className="px-2 space-y-0.5">
                      {section.items.map((item, idx) => (
                        <DropdownMenuItem 
                          key={idx}
                          className="admin-dropdown-item aegis-ceremonial-hover flex items-center gap-3 p-2 rounded-lg cursor-pointer"
                        >
                          <div className="flex items-center gap-3 flex-1">
                            <item.icon className="w-4 h-4 text-muted-foreground" />
                            <div className="flex-1">
                              <div className="text-sm font-medium">{item.label}</div>
                              <div className="text-xs text-muted-foreground font-mono">{item.code}</div>
                            </div>
                            <Badge 
                              className={`text-xs px-2 py-0.5 border ${STATUS_STYLES[item.status as keyof typeof STATUS_STYLES] || STATUS_STYLES.active}`}
                            >
                              {item.status.toUpperCase()}
                            </Badge>
                          </div>
                        </DropdownMenuItem>
                      ))}
                    </div>
                    
                    <DropdownMenuSeparator className="bg-border/10 my-2" />
                  </div>
                ))}

                {/* System Status */}
                <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 py-1">
                  System Status
                </DropdownMenuLabel>
                <div className="px-2 py-2 space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2 system-indicator">
                      <div className="w-2 h-2 bg-green-400 rounded-full healthcare-heartbeat heartbeat-vital"></div>
                      <span>System Health</span>
                    </div>
                    <div className="flex items-center gap-2 system-indicator">
                      <div className="w-2 h-2 bg-blue-400 rounded-full healthcare-heartbeat heartbeat-observation"></div>
                      <span>DB Connected</span>
                    </div>
                    <div className="flex items-center gap-2 system-indicator">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full healthcare-heartbeat heartbeat-medication"></div>
                      <span>AI Models</span>
                    </div>
                    <div className="flex items-center gap-2 system-indicator">
                      <div className="w-2 h-2 bg-purple-400 rounded-full healthcare-heartbeat heartbeat-wellness"></div>
                      <span>Integration</span>
                    </div>
                  </div>
                </div>

                <DropdownMenuSeparator className="bg-border/10 my-2" />

                {/* Session Management */}
                <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 py-1">
                  Session Management  
                </DropdownMenuLabel>
                <DropdownMenuItem className="aegis-ceremonial-hover">
                  <Globe className="mr-3 h-4 w-4" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">Switch Organization</div>
                    <div className="text-xs text-muted-foreground">Multi-tenant access</div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="aegis-ceremonial-hover">
                  <Building className="mr-3 h-4 w-4" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">Institutional Controls</div>
                    <div className="text-xs text-muted-foreground">Enterprise management</div>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-border/20 my-3" />
                
                <DropdownMenuItem className="text-destructive hover:bg-destructive/10 transition-colors aegis-ceremonial-hover">
                  <LogOut className="mr-3 h-4 w-4" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">Sign Out</div>
                    <div className="text-xs opacity-70">End administrative session</div>
                  </div>
                </DropdownMenuItem>

                {/* Footer */}
                <div className="px-2 py-3 border-t border-border/10 mt-2">
                  <div className="text-xs text-muted-foreground text-center space-y-1">
                    <div className="font-mono">Session ID: AE-{Date.now().toString().slice(-6)}</div>
                    <div className="font-mono">Build: v2024.12.18-enterprise</div>
                    <div className="text-primary font-medium">© AEGIS Health OS</div>
                  </div>
                </div>

              </div>
            </ScrollArea>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}