import React from "react";
import { Section } from "../common/Section";

import { KpiGrid } from "../home/KpiGrid";
import { FunctionalKPI, FunctionalKPIGrid } from "../common/FunctionalKPI";
import { SimpleHierarchy } from "../common/SimpleHierarchy";
import { CriticalFlowsDemo } from "../demos/CriticalFlowsDemo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { mockKPIs, mockClients, mockStaff } from "../../lib/mock-data";
import { 
  Shield, Calendar, Radio, Bot, TrendingUp, AlertTriangle, 
  Activity, Play, Users, FileText, Settings, Heart, Pill,
  DollarSign, Award, Clock, ArrowUp, ArrowDown, CheckCircle,
  XCircle, AlertCircle, Eye, Zap, Star, Target,
  BarChart3, PieChart, UserCheck, Building, MapPin, Phone,
  Mail, Stethoscope, Clipboard, BookOpen, GraduationCap,
  Package, Truck, Wrench, Database, Server, Cloud, Home,
  Thermometer, Wifi, HardDrive, Cpu, Monitor, Lock,
  Globe, MessageCircle, Video, FileBarChart, Briefcase,
  Search, Filter, Download, Upload, RefreshCw, Bell,
  AlertOctagon, AlertHexagon, Headphones, Mic, Camera,
  MapPin as Location, Compass, Navigation, Route,
  Coffee, Utensils, Bed, Shower, Car, Bus, Train,
  Smartphone, Tablet, Laptop, Tv, Gamepad2, Music,
  Book, Newspaper, Magazine, Image, Film, Headphones as Audio,
  Scissors, Paintbrush, Palette, Pencil, Edit, Save,
  Copy, Paste, Cut, Undo, Redo, ZoomIn, ZoomOut,
  RotateCcw, RotateCw, FlipHorizontal, FlipVertical,
  Maximize, Minimize, Square, Circle, Triangle,
  Hexagon, Octagon, Pentagon, Diamond, Plus, Minus,
  X, Check, ChevronUp, ChevronDown, ChevronLeft, ChevronRight,
  ArrowLeft, ArrowRight, ArrowUpDown, ArrowLeftRight,
  Move, MousePointer, Hand, Grab, MoreHorizontal, MoreVertical,
  Brain, Target
} from "lucide-react";

interface CommandCentreDomainProps {
  activeTab?: string;
  onNavigate?: (gateId: string, subTabId?: string) => void;
}

export function CommandCentreDomain({ activeTab = 'dashboard', onNavigate }: CommandCentreDomainProps) {
  // Enhanced KPI data with functional depth
  const functionalKPIs = [
    {
      label: "Active Clients",
      value: mockClients.length,
      description: "Total service users across all facilities",
      trend: 'up' as const,
      trendValue: '+3 this week',
      status: 'good' as const,
      drilldownData: [
        { id: 'residential', label: 'Residential Care', value: Math.floor(mockClients.length * 0.6), percentage: 60, status: 'good' as const },
        { id: 'community', label: 'Community Support', value: Math.floor(mockClients.length * 0.4), percentage: 40, status: 'good' as const }
      ],
      onClick: () => onNavigate?.('healthcare', 'care-support')
    },
    {
      label: "Staff on Duty",
      value: mockStaff.filter(s => s.status === "On Duty").length,
      description: "Currently active staff members",
      trend: 'stable' as const,
      status: 'warning' as const,
      drilldownData: [
        { id: 'nurses', label: 'Registered Nurses', value: 8, percentage: 40, status: 'good' as const },
        { id: 'care-assistants', label: 'Care Assistants', value: 12, percentage: 60, status: 'warning' as const }
      ],
      onClick: () => onNavigate?.('workforce', 'rota')
    },
    {
      label: "Quality Score",
      value: 4.8,
      unit: '/5',
      description: "Overall care quality rating",
      trend: 'up' as const,
      trendValue: '+0.2 this quarter',
      status: 'good' as const,
      drilldownData: [
        { id: 'safety', label: 'Safety Standards', value: '4.9/5', percentage: 98, status: 'good' as const },
        { id: 'care-delivery', label: 'Care Delivery', value: '4.7/5', percentage: 94, status: 'good' as const }
      ],
      onClick: () => onNavigate?.('quality-intelligence', 'analytics-dashboards')
    }
  ];

  // Hierarchical data for system overview
  const systemHierarchy = [
    {
      id: 'facilities',
      title: 'Care Facilities',
      description: 'Residential and community care locations',
      value: '3 active',
      badge: 'Network',
      children: [
        {
          id: 'oak-house',
          title: 'Oak House Care Home',
          description: 'Residential care facility',
          value: '24 residents',
          onClick: () => console.log('Navigate to Oak House')
        },
        {
          id: 'community-services',
          title: 'Community Support',
          description: 'Home care services',
          value: '16 clients',
          onClick: () => console.log('Navigate to Community Services')
        }
      ]
    },
    {
      id: 'operations',
      title: 'Daily Operations',
      description: 'Current operational status',
      value: 'Active',
      children: [
        {
          id: 'medication-rounds',
          title: 'Medication Rounds',
          description: 'Today\'s medication schedule',
          value: '89 due',
          onClick: () => onNavigate?.('healthcare', 'medications')
        },
        {
          id: 'staff-shifts',
          title: 'Staff Shifts',
          description: 'Current shift coverage',
          value: '18 on duty',
          onClick: () => onNavigate?.('workforce', 'rota')
        }
      ]
    }
  ];

  const kpiData = [
    { 
      label: "Active Clients", 
      value: mockClients.length.toString(),
      onClick: () => onNavigate?.('healthcare', 'care-support')
    },
    { 
      label: "Total Staff", 
      value: mockStaff.length.toString(),
      onClick: () => onNavigate?.('workforce', 'human-resources')
    },
    { 
      label: "Staff on Duty", 
      value: mockStaff.filter(s => s.status === "On Duty").length.toString(),
      onClick: () => onNavigate?.('workforce', 'rota-visits')
    },
    { 
      label: "Today's Risks", 
      value: mockKPIs.today_risks.value.toString(),
      onClick: () => onNavigate?.('healthcare', 'risk-pbs')
    },
    { 
      label: "Occupancy Rate", 
      value: `${mockKPIs.occupancy_rate.value}%`,
      onClick: () => onNavigate?.('healthcare', 'care-support')
    },
    { 
      label: "Compliance Score", 
      value: `${mockKPIs.compliance_score.value}%`,
      onClick: () => onNavigate?.('quality-intelligence', 'ae-policies')
    },
    { 
      label: "Revenue MTD", 
      value: "£47,329",
      onClick: () => onNavigate?.('finance-operations', 'invoicing-billing')
    },
    { 
      label: "Medication Due", 
      value: "23",
      onClick: () => onNavigate?.('healthcare', 'medications')
    },
    { 
      label: "AI Predictions", 
      value: "156",
      onClick: () => onNavigate?.('ai-hub', 'predictive-analytics')
    },
    { 
      label: "System Uptime", 
      value: "99.9%",
      onClick: () => onNavigate?.('admin', 'system-monitoring')
    },
    { 
      label: "Quality Score", 
      value: "4.8/5",
      onClick: () => onNavigate?.('quality-intelligence', 'performance-metrics')
    },
    { 
      label: "Training Due", 
      value: "12",
      onClick: () => onNavigate?.('workforce', 'training-development')
    }
  ];

  const broadcastData = [
    { 
      id: 1, 
      title: "System Maintenance Scheduled", 
      message: "Planned maintenance window: Tonight 2:00-4:00 AM",
      priority: "low",
      timestamp: "2024-01-15T08:30:00Z"
    },
    { 
      id: 2, 
      title: "New Staff Training Available", 
      message: "Safeguarding Level 2 course now available in AE Academy",
      priority: "medium",
      timestamp: "2024-01-15T09:15:00Z"
    },
    { 
      id: 3, 
      title: "AE Policy Review Notice", 
      message: "Upcoming policy review scheduled for next week - preparation materials ready",
      priority: "high",
      timestamp: "2024-01-15T10:45:00Z"
    },
    { 
      id: 4, 
      title: "Emergency Protocols Update", 
      message: "New fire evacuation procedures effective immediately",
      priority: "high",
      timestamp: "2024-01-15T11:20:00Z"
    },
    { 
      id: 5, 
      title: "Medication Stock Alert", 
      message: "Paracetamol levels below threshold - reorder required",
      priority: "medium",
      timestamp: "2024-01-15T12:00:00Z"
    },
    { 
      id: 6, 
      title: "Staff Wellness Program Launch", 
      message: "Mental health support services now available 24/7",
      priority: "low",
      timestamp: "2024-01-15T13:30:00Z"
    }
  ];

  const realtimeActivities = [
    { time: "14:32", staff: "Sarah Chen", client: "Robert Wilson", activity: "Medication Administration", status: "in-progress", type: "medication", priority: "high", duration: "15min" },
    { time: "14:28", staff: "Michael Torres", client: "Emma Davies", activity: "Personal Care", status: "completed", type: "care", priority: "medium", duration: "30min" },
    { time: "14:25", staff: "Dr. James Reid", client: "Mary Thompson", activity: "GP Visit", status: "in-progress", type: "medical", priority: "high", duration: "45min" },
    { time: "14:20", staff: "Lisa Johnson", client: "David Brown", activity: "Meal Support", status: "completed", type: "nutrition", priority: "low", duration: "20min" },
    { time: "14:15", staff: "Ahmed Hassan", client: "Patricia Miller", activity: "Mobility Exercise", status: "in-progress", type: "therapy", priority: "medium", duration: "25min" },
    { time: "14:10", staff: "Sophie Williams", client: "John Anderson", activity: "Social Interaction", status: "completed", type: "social", priority: "low", duration: "35min" },
    { time: "14:05", staff: "Mark Thompson", client: "Catherine Lee", activity: "Safety Check", status: "completed", type: "safety", priority: "high", duration: "10min" },
    { time: "14:00", staff: "Rachel Green", client: "Thomas Wilson", activity: "Medication Review", status: "scheduled", type: "medication", priority: "medium", duration: "20min" },
    { time: "13:55", staff: "Dr. Anna Roberts", client: "William Clark", activity: "Mental Health Assessment", status: "in-progress", type: "mental-health", priority: "high", duration: "60min" },
    { time: "13:50", staff: "James Morrison", client: "Susan White", activity: "Physiotherapy Session", status: "completed", type: "therapy", priority: "medium", duration: "40min" }
  ];

  const systemHealthData = [
    { system: "AEGIS Core", status: "optimal", uptime: "99.9%", load: 23, lastUpdate: "2m ago", alerts: 0 },
    { system: "Database Cluster", status: "optimal", uptime: "100%", load: 45, lastUpdate: "1m ago", alerts: 0 },
    { system: "API Gateway", status: "warning", uptime: "99.2%", load: 78, lastUpdate: "30s ago", alerts: 2 },
    { system: "eMAR System", status: "optimal", uptime: "99.8%", load: 34, lastUpdate: "1m ago", alerts: 0 },
    { system: "AI Co-Pilot", status: "optimal", uptime: "99.5%", load: 56, lastUpdate: "45s ago", alerts: 1 },
    { system: "Care Planning", status: "optimal", uptime: "99.7%", load: 42, lastUpdate: "2m ago", alerts: 0 },
    { system: "Staff Portal", status: "optimal", uptime: "99.9%", load: 28, lastUpdate: "1m ago", alerts: 0 },
    { system: "Client Records", status: "warning", uptime: "98.8%", load: 67, lastUpdate: "3m ago", alerts: 3 },
    { system: "Financial Suite", status: "optimal", uptime: "99.6%", load: 39, lastUpdate: "2m ago", alerts: 0 },
    { system: "Quality Module", status: "optimal", uptime: "99.4%", load: 52, lastUpdate: "1m ago", alerts: 1 }
  ];

  const criticalEvents = [
    { time: "13:45", type: "medication", title: "Medication Refusal", client: "John Anderson", severity: "medium", resolved: false, assignedTo: "Sarah Chen", eta: "15min" },
    { time: "12:30", type: "incident", title: "Minor Fall", client: "Mary Thompson", severity: "low", resolved: true, assignedTo: "Michael Torres", eta: "completed" },
    { time: "11:15", type: "medical", title: "GP Visit Requested", client: "Robert Wilson", severity: "high", resolved: false, assignedTo: "Dr. James Reid", eta: "30min" },
    { time: "10:20", type: "behavioral", title: "Anxiety Episode", client: "Emma Davies", severity: "medium", resolved: true, assignedTo: "Dr. Anna Roberts", eta: "completed" },
    { time: "09:45", type: "safety", title: "Equipment Check Failed", client: "N/A", severity: "low", resolved: true, assignedTo: "Mark Thompson", eta: "completed" },
    { time: "08:30", type: "medication", title: "Dosage Query", client: "David Brown", severity: "high", resolved: true, assignedTo: "Lisa Johnson", eta: "completed" }
  ];

  const topPerformers = [
    { name: "Sarah Chen", role: "Senior Carer", score: 98, tasks: 12, avatar: "/avatars/sarah.jpg", specialties: ["Medication", "Emergency"], rating: 4.9 },
    { name: "Dr. James Reid", role: "GP", score: 96, tasks: 8, avatar: "/avatars/james.jpg", specialties: ["Medical", "Diagnostics"], rating: 4.8 },
    { name: "Michael Torres", role: "Care Assistant", score: 94, tasks: 15, avatar: "/avatars/michael.jpg", specialties: ["Personal Care", "Mobility"], rating: 4.7 },
    { name: "Lisa Johnson", role: "Nurse", score: 92, tasks: 10, avatar: "/avatars/lisa.jpg", specialties: ["Clinical", "Medication"], rating: 4.8 },
    { name: "Ahmed Hassan", role: "Support Worker", score: 90, tasks: 11, avatar: "/avatars/ahmed.jpg", specialties: ["Therapy", "Social"], rating: 4.6 }
  ];

  const departmentMetrics = [
    { name: "Clinical Services", staff: 15, efficiency: 94, satisfaction: 4.8, alerts: 2, budget: 98, performance: "excellent" },
    { name: "Care Support", staff: 23, efficiency: 91, satisfaction: 4.7, alerts: 1, budget: 95, performance: "good" },
    { name: "Nursing", staff: 12, efficiency: 96, satisfaction: 4.9, alerts: 0, budget: 99, performance: "excellent" },
    { name: "Therapy Services", staff: 8, efficiency: 89, satisfaction: 4.6, alerts: 3, budget: 92, performance: "good" },
    { name: "Mental Health", staff: 6, efficiency: 93, satisfaction: 4.8, alerts: 1, budget: 97, performance: "excellent" }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-600/30 text-red-300 border-red-500/50';
      case 'high': return 'bg-red-500/20 text-red-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-blue-500/20 text-blue-400';
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Command Centre Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            DASH
          </h1>
          <p className="text-sm text-muted-foreground">
            Executive Dashboard & System Control • All Operations Overview
          </p>
        </div>
        
        <div className="text-right">
          <div className="text-sm text-muted-foreground font-mono">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-2 h-2 bg-success rounded-full shadow-lg shadow-success/40"></div>
            <span className="text-sm text-foreground font-medium">All systems operational</span>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} className="space-y-6">
        <TabsList 
          className="grid grid-cols-8 w-full border"
        >
          <TabsTrigger value="dashboard" className="flex items-center gap-2 aegis-ceremonial-hover">
            <Shield className="w-4 h-4 aegis-pulse" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="functional-depth" className="flex items-center gap-2 aegis-ceremonial-hover">
            <Target className="w-4 h-4" />
            Functional Depth
            <Badge variant="secondary" className="text-xs">New</Badge>
          </TabsTrigger>
          <TabsTrigger value="today" className="flex items-center gap-2 aegis-ceremonial-hover">
            <Calendar className="w-4 h-4" />
            Today
          </TabsTrigger>
          <TabsTrigger value="broadcasts" className="flex items-center gap-2 aegis-ceremonial-hover">
            <Radio className="w-4 h-4" />
            Broadcasts
            <Badge variant="secondary" className="text-xs aegis-pulse">{broadcastData.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="ai-copilot" className="flex items-center gap-2 aegis-ceremonial-hover">
            <Bot className="w-4 h-4" />
            AI Co-Pilot
          </TabsTrigger>
          <TabsTrigger value="kpis" className="flex items-center gap-2 aegis-ceremonial-hover">
            <TrendingUp className="w-4 h-4" />
            KPIs
          </TabsTrigger>
          <TabsTrigger value="active-alerts" className="flex items-center gap-2 aegis-ceremonial-hover">
            <AlertTriangle className="w-4 h-4 heartbeat-urgent" />
            Active Alerts
            <Badge variant="destructive" className="text-xs aegis-pulse">{criticalEvents.filter(e => !e.resolved).length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="system-health" className="flex items-center gap-2 aegis-ceremonial-hover">
            <Activity className="w-4 h-4 heartbeat-vital" />
            System Health
          </TabsTrigger>
        </TabsList>

        {/* Dashboard Tab - Main Executive Overview */}
        <TabsContent value="dashboard" className="space-y-6">
          {/* Enhanced KPI Grid with Functional Depth */}
          <Section title="Executive Overview with Drill-Down">
            <FunctionalKPIGrid kpis={functionalKPIs} columns={3} />
          </Section>

          {/* System Hierarchy Overview */}
          <Section title="System Operations Hierarchy">
            <SimpleHierarchy items={systemHierarchy} />
          </Section>

          {/* Traditional KPI Grid */}
          <Section title="Additional Metrics">
            <KpiGrid kpis={kpiData} />
          </Section>

          {/* Real-time Operations Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Live Care Activities */}
            <div className="aegis-card-glass p-6 col-span-1 lg:col-span-2">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-chart-2 heartbeat-vital" />
                Live Care Activities
                <Badge className="bg-green-500/20 text-green-400 heartbeat-vital">LIVE</Badge>
                <Badge variant="secondary" className="text-xs">{realtimeActivities.length} Active</Badge>
              </h3>
              <div className="space-y-3 max-h-64 overflow-y-auto institutional-scroll">
                {realtimeActivities.map((activity, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-accent/5 border border-border/10 aegis-ceremonial-hover">
                    <div className="flex items-center gap-3">
                      <div className="text-xs font-mono text-muted-foreground bg-card p-1 rounded">
                        {activity.time}
                      </div>
                      <div className="flex items-center gap-2">
                        {activity.type === 'medication' && <Pill className="w-4 h-4 text-blue-400" />}
                        {activity.type === 'care' && <Heart className="w-4 h-4 text-red-400" />}
                        {activity.type === 'medical' && <Stethoscope className="w-4 h-4 text-green-400" />}
                        {activity.type === 'nutrition' && <Utensils className="w-4 h-4 text-orange-400" />}
                        {activity.type === 'therapy' && <Activity className="w-4 h-4 text-purple-400" />}
                        {activity.type === 'social' && <Star className="w-4 h-4 text-pink-400" />}
                        {activity.type === 'safety' && <Shield className="w-4 h-4 text-yellow-400" />}
                        {activity.type === 'mental-health' && <Brain className="w-4 h-4 text-indigo-400" />}
                        <div>
                          <p className="text-sm font-medium text-foreground">{activity.activity}</p>
                          <p className="text-xs text-muted-foreground">{activity.staff} → {activity.client}</p>
                          <p className="text-xs text-muted-foreground">{activity.duration} • {activity.priority} priority</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {activity.status === 'completed' && <CheckCircle className="w-4 h-4 text-green-400" />}
                      {activity.status === 'in-progress' && <Clock className="w-4 h-4 text-yellow-400 heartbeat-urgent" />}
                      {activity.status === 'scheduled' && <Calendar className="w-4 h-4 text-blue-400" />}
                      <Badge 
                        variant={activity.status === 'completed' ? 'default' : 'secondary'}
                        className={activity.status === 'in-progress' ? 'heartbeat-vital' : ''}
                      >
                        {activity.status.replace('-', ' ')}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Health Monitoring */}
            <div className="aegis-card-glass p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Server className="w-5 h-5 text-blue-400 heartbeat-observation" />
                System Health
                <Badge variant="secondary" className="text-xs">{systemHealthData.length} Services</Badge>
              </h3>
              <div className="space-y-4">
                {systemHealthData.map((system, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{system.system}</span>
                      <div className="flex items-center gap-2">
                        {system.status === 'optimal' && <div className="w-2 h-2 bg-green-400 rounded-full heartbeat-vital"></div>}
                        {system.status === 'warning' && <div className="w-2 h-2 bg-yellow-400 rounded-full heartbeat-urgent"></div>}
                        {system.status === 'critical' && <div className="w-2 h-2 bg-red-400 rounded-full heartbeat-critical"></div>}
                        <span className="text-xs text-muted-foreground">{system.uptime}</span>
                      </div>
                    </div>
                    <Progress 
                      value={system.load} 
                      className="h-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Load: {system.load}%</span>
                      <span>{system.lastUpdate} • {system.alerts} alerts</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Metrics Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Financial Overview */}
            <div className="aegis-card-glass p-6">
              <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-400" />
                Financial Health
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Monthly Revenue</span>
                  <div className="flex items-center gap-1">
                    <ArrowUp className="w-3 h-3 text-green-400" />
                    <span className="text-sm font-medium text-green-400">£47,329</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Costs</span>
                  <div className="flex items-center gap-1">
                    <ArrowDown className="w-3 h-3 text-red-400" />
                    <span className="text-sm font-medium text-red-400">£32,156</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Profit Margin</span>
                  <span className="text-sm font-medium text-primary">32%</span>
                </div>
                <div className="flex items-center justify-between border-t border-border/10 pt-2">
                  <span className="text-sm font-medium text-foreground">Net Profit</span>
                  <span className="text-sm font-bold text-green-400">£15,173</span>
                </div>
                <Progress value={68} className="h-2" />
                <p className="text-xs text-muted-foreground">68% to monthly target</p>
              </div>
            </div>

            {/* Quality Metrics */}
            <div className="aegis-card-glass p-6">
              <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-400" />
                Quality Score
              </h3>
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">94%</div>
                  <div className="text-xs text-muted-foreground">Overall Rating</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">AE Policy Compliance</span>
                    <span className="text-green-400">98%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Care Standards</span>
                    <span className="text-green-400">96%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Staff Training</span>
                    <span className="text-yellow-400">89%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Safety Record</span>
                    <span className="text-green-400">99%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Staff Performance */}
            <div className="aegis-card-glass p-6">
              <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-400" />
                Staff Performance
              </h3>
              <div className="space-y-3">
                {topPerformers.slice(0, 3).map((performer, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                      {performer.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground">{performer.name}</div>
                      <div className="text-xs text-muted-foreground">{performer.role}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-primary">{performer.score}</div>
                      <div className="text-xs text-muted-foreground">Score</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Insights */}
            <div className="aegis-card-glass p-6">
              <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                <Bot className="w-5 h-5 text-purple-400 heartbeat-urgent" />
                AI Insights
              </h3>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-accent/5 border border-border/10">
                  <div className="text-sm font-medium text-foreground">Fall Risk Alert</div>
                  <div className="text-xs text-muted-foreground">3 residents showing patterns</div>
                  <div className="text-xs text-purple-400 mt-1">89% confidence</div>
                </div>
                <div className="p-3 rounded-lg bg-accent/5 border border-border/10">
                  <div className="text-sm font-medium text-foreground">Staffing Optimization</div>
                  <div className="text-xs text-muted-foreground">15% efficiency gain possible</div>
                  <div className="text-xs text-purple-400 mt-1">94% confidence</div>
                </div>
                <div className="p-3 rounded-lg bg-accent/5 border border-border/10">
                  <div className="text-sm font-medium text-foreground">Medication Adherence</div>
                  <div className="text-xs text-muted-foreground">Up 12% this month</div>
                  <div className="text-xs text-purple-400 mt-1">97% confidence</div>
                </div>
              </div>
            </div>
          </div>

          {/* Department Performance Grid */}
          <div className="aegis-card-glass p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Building className="w-5 h-5 text-cyan-400" />
              Department Performance Overview
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {departmentMetrics.map((dept, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-accent/5 border border-border/10 aegis-ceremonial-hover">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-foreground">{dept.name}</h4>
                    <Badge 
                      variant={dept.performance === 'excellent' ? 'default' : 
                              dept.performance === 'good' ? 'secondary' : 'outline'}
                    >
                      {dept.performance}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Staff:</span>
                      <span className="ml-1 font-medium">{dept.staff}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Efficiency:</span>
                      <span className="ml-1 font-medium text-green-400">{dept.efficiency}%</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Satisfaction:</span>
                      <span className="ml-1 font-medium text-blue-400">{dept.satisfaction}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Alerts:</span>
                      <span className={`ml-1 font-medium ${dept.alerts > 0 ? 'text-yellow-400' : 'text-green-400'}`}>
                        {dept.alerts}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Events & Staff Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Critical Events */}
            <div className="aegis-card-glass p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400 heartbeat-critical" />
                Recent Critical Events
                <Badge variant="destructive" className="text-xs">{criticalEvents.filter(e => !e.resolved).length} Active</Badge>
              </h3>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {criticalEvents.map((event, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-accent/5 border border-border/10">
                    <div className="flex items-center gap-3">
                      <div className="text-xs font-mono text-muted-foreground bg-card p-1 rounded">
                        {event.time}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{event.title}</p>
                        <p className="text-xs text-muted-foreground">{event.client} • {event.assignedTo}</p>
                        <p className="text-xs text-muted-foreground">ETA: {event.eta}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={event.resolved ? 'default' : 
                                event.severity === 'critical' ? 'destructive' :
                                event.severity === 'high' ? 'destructive' :
                                event.severity === 'medium' ? 'warning' : 'secondary'}
                        className={!event.resolved && event.severity === 'critical' ? 'heartbeat-critical' : ''}
                      >
                        {event.severity}
                      </Badge>
                      {event.resolved ? 
                        <CheckCircle className="w-4 h-4 text-green-400" /> :
                        <Clock className="w-4 h-4 text-yellow-400 heartbeat-urgent" />
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Staff Performance */}
            <div className="aegis-card-glass p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                Top Staff Performance
              </h3>
              <div className="space-y-4">
                {topPerformers.map((performer, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 rounded-lg bg-accent/5 border border-border/10 aegis-ceremonial-hover">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                      {performer.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{performer.name}</div>
                      <div className="text-sm text-muted-foreground">{performer.role}</div>
                      <div className="text-xs text-muted-foreground">
                        {performer.specialties.join(', ')} • {performer.tasks} tasks • ⭐ {performer.rating}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">{performer.score}</div>
                      <div className="text-xs text-muted-foreground">Performance</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Broadcasts Tab */}
        <TabsContent value="broadcasts" className="space-y-6">
          <div className="aegis-card-glass p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Radio className="w-5 h-5" />
              System Broadcasts & Announcements
              <Badge variant="secondary" className="text-xs">{broadcastData.length} Messages</Badge>
            </h3>
            <div className="space-y-4">
              {broadcastData.map((broadcast, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-accent/5 border border-border/10 aegis-ceremonial-hover">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Badge variant={
                        broadcast.priority === 'high' ? 'destructive' :
                        broadcast.priority === 'medium' ? 'warning' : 'secondary'
                      }>
                        {broadcast.priority}
                      </Badge>
                      <h4 className="font-medium text-foreground">{broadcast.title}</h4>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(broadcast.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{broadcast.message}</p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* AI Co-Pilot Tab */}
        <TabsContent value="ai-copilot" className="space-y-6">
          <div className="aegis-card-glass p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Bot className="w-5 h-5 text-purple-400 heartbeat-urgent" />
              AEGIS AI Co-Pilot
              <Badge className="bg-purple-500/20 text-purple-400">Beta</Badge>
            </h3>
            <div className="text-center py-12">
              <Bot className="w-16 h-16 mx-auto text-purple-400 mb-4" />
              <h4 className="text-xl font-semibold text-foreground mb-2">AI Co-Pilot Dashboard</h4>
              <p className="text-muted-foreground mb-6">
                Intelligent assistance for care management, predictive analytics, and decision support.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-accent/5 border border-border/10">
                  <Brain className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <h5 className="font-medium text-foreground">Predictive Analytics</h5>
                  <p className="text-sm text-muted-foreground">AI-driven insights</p>
                </div>
                <div className="p-4 rounded-lg bg-accent/5 border border-border/10">
                  <Target className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <h5 className="font-medium text-foreground">Smart Recommendations</h5>
                  <p className="text-sm text-muted-foreground">Optimized care plans</p>
                </div>
                <div className="p-4 rounded-lg bg-accent/5 border border-border/10">
                  <Activity className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <h5 className="font-medium text-foreground">Real-time Monitoring</h5>
                  <p className="text-sm text-muted-foreground">24/7 care oversight</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Active Alerts Tab */}
        <TabsContent value="active-alerts" className="space-y-6">
          <div className="aegis-card-glass p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-400 heartbeat-critical" />
              Active Critical Alerts
              <Badge variant="destructive" className="text-xs heartbeat-critical">
                {criticalEvents.filter(e => !e.resolved).length} Unresolved
              </Badge>
            </h3>
            <div className="space-y-4">
              {criticalEvents.filter(e => !e.resolved).map((event, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-red-500/5 border border-red-500/20 aegis-ceremonial-hover">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                      <div>
                        <h4 className="font-medium text-foreground">{event.title}</h4>
                        <p className="text-sm text-muted-foreground">{event.client}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="destructive" className="mb-1">{event.severity}</Badge>
                      <div className="text-xs text-muted-foreground">{event.time}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Assigned to: {event.assignedTo}</span>
                    <span className="text-yellow-400">ETA: {event.eta}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* System Health Tab */}
        <TabsContent value="system-health" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="aegis-card-glass p-6 col-span-2">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Server className="w-5 h-5 text-blue-400" />
                System Health Overview
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {systemHealthData.map((system, idx) => (
                  <div key={idx} className="p-4 rounded-lg bg-accent/5 border border-border/10">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-foreground">{system.system}</h4>
                      <div className={`w-3 h-3 rounded-full ${
                        system.status === 'optimal' ? 'bg-green-400' :
                        system.status === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
                      }`}></div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Uptime:</span>
                        <span className="text-green-400">{system.uptime}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Load:</span>
                        <span className="text-blue-400">{system.load}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Alerts:</span>
                        <span className={system.alerts > 0 ? 'text-yellow-400' : 'text-green-400'}>
                          {system.alerts}
                        </span>
                      </div>
                    </div>
                    <Progress value={system.load} className="h-1 mt-2" />
                  </div>
                ))}
              </div>
            </div>

            <div className="aegis-card-glass p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Monitor className="w-5 h-5 text-green-400" />
                System Summary
              </h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">99.7%</div>
                  <div className="text-sm text-muted-foreground">Overall Uptime</div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Services Online:</span>
                    <span className="text-sm font-medium text-green-400">
                      {systemHealthData.filter(s => s.status === 'optimal').length}/{systemHealthData.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Warnings:</span>
                    <span className="text-sm font-medium text-yellow-400">
                      {systemHealthData.filter(s => s.status === 'warning').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Average Load:</span>
                    <span className="text-sm font-medium text-blue-400">
                      {Math.round(systemHealthData.reduce((acc, s) => acc + s.load, 0) / systemHealthData.length)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Alerts:</span>
                    <span className="text-sm font-medium text-yellow-400">
                      {systemHealthData.reduce((acc, s) => acc + s.alerts, 0)}
                    </span>
                  </div>
                </div>
                <div className="pt-4 border-t border-border/10">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-sm text-foreground">All systems operational</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Functional Depth Demo Tab */}
        <TabsContent value="functional-depth" className="space-y-6">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-xl font-bold text-foreground aegis-text-primary flex items-center justify-center gap-3">
              <Target className="w-6 h-6 text-primary" />
              Functional Depth Demonstration
            </h2>
            <p className="text-muted-foreground aegis-text-secondary max-w-2xl mx-auto">
              Experience AEGIS's hierarchical navigation, progressive disclosure, and contextual actions 
              that provide deep functional capabilities similar to professional healthcare management systems.
            </p>
          </div>

          {/* Enhanced KPIs with Drill-Down */}
          <Section title="Enhanced KPIs with Drill-Down" description="Click on KPIs to expand and explore breakdown data">
            <FunctionalKPIGrid kpis={functionalKPIs} columns={3} />
          </Section>

          {/* Hierarchical System View */}
          <Section title="Hierarchical System Navigation" description="Expandable organization structure with multiple levels">
            <SimpleHierarchy items={systemHierarchy} />
          </Section>

          {/* Features Overview */}
          <Section title="Functional Depth Features" description="Key capabilities demonstrated">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="aegis-card-glass p-6 text-center">
                <ChevronRight className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold aegis-text-enhanced mb-2">Progressive Disclosure</h3>
                <p className="text-sm text-muted-foreground aegis-text-secondary">
                  Reveal information progressively as users drill down through hierarchical data structures
                </p>
              </div>
              
              <div className="aegis-card-glass p-6 text-center">
                <TrendingUp className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold aegis-text-enhanced mb-2">Interactive KPIs</h3>
                <p className="text-sm text-muted-foreground aegis-text-secondary">
                  Click on KPIs to reveal detailed breakdowns and supporting data with visual indicators
                </p>
              </div>
              
              <div className="aegis-card-glass p-6 text-center">
                <MoreHorizontal className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold aegis-text-enhanced mb-2">Contextual Actions</h3>
                <p className="text-sm text-muted-foreground aegis-text-secondary">
                  Access relevant actions and operations based on the current context and user permissions
                </p>
              </div>
            </div>
          </Section>

          <div className="aegis-card-glass p-6 border-l-4 border-l-primary">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-primary mt-1" />
              <div className="space-y-2">
                <h3 className="font-semibold aegis-text-primary">Functional Depth Achievement</h3>
                <p className="text-sm text-muted-foreground aegis-text-secondary">
                  AEGIS now provides comprehensive functional depth with hierarchical navigation, 
                  progressive disclosure, and contextual actions that match professional healthcare management systems.
                </p>
                <div className="flex gap-2 mt-3">
                  <Badge variant="secondary">Hierarchical Navigation</Badge>
                  <Badge variant="secondary">Progressive Disclosure</Badge>
                  <Badge variant="secondary">Contextual Actions</Badge>
                  <Badge variant="secondary">Deep Drill-down</Badge>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}