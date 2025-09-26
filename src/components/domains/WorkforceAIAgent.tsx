import React, { useState, useEffect, useCallback } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { 
  Users, Activity, TrendingUp, AlertCircle, CheckCircle, Clock, 
  User, FileText, BarChart3, Zap, Eye, Search, Filter, Download,
  Settings, RefreshCw, Play, Pause, Cpu, Database, Wifi, Globe,
  Target, Award, Heart, Brain, Layers, Command, Scan, MessageSquare,
  Send, ArrowRight, ChevronDown, ChevronUp, Star, ThumbsUp, AlertTriangle,
  Calendar, MapPin, Phone, Mail, Building, Clipboard, Monitor,
  Plus, Minus, RotateCcw, Maximize2, Minimize2, X, Volume2, VolumeX,
  Mic, MicOff, Camera, Video, Share, Lock, Unlock, Save, Navigation,
  Home, Stethoscope, Calculator, LifeBuoy, Headphones, Bell, BookOpen,
  Archive, FolderOpen, ShoppingCart, Truck, Wrench, PieChart, LineChart,
  BarChart, GitBranch, Workflow, Briefcase, GraduationCap, CreditCard,
  DollarSign, Receipt, Package, Warehouse, Shield as ShieldCheck,
  UserCheck, UserX, UserPlus, Key, Code, Terminal, Bug, HelpCircle,
  Info, ExternalLink, Link, Copy, Edit, Trash2, MoreHorizontal,
  CalendarDays, CalendarCheck, CalendarX, ClockIcon, UserCircle,
  Trophy, Medal, School, TimerIcon, PersonStanding, UsersIcon
} from "lucide-react";
import { motion } from "motion/react";
import { mockStaffProfiles, mockClientProfiles, aeMedicationLibrary, aeTrainingModules } from "../../lib/expanded-mock-data";

interface WorkforceAIAgentProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
}

// Workforce Management Tools
const WORKFORCE_TOOLS = [
  {
    category: "Staff Scheduling",
    icon: Calendar,
    tools: [
      { name: "Rota Optimizer", description: "AI-powered staff schedule optimization", impact: "25% efficiency gain", priority: "high" },
      { name: "Shift Planner", description: "Intelligent shift planning and coverage", impact: "Reduced overtime", priority: "medium" },
      { name: "Coverage Analyzer", description: "Analyze staffing coverage gaps", impact: "100% coverage", priority: "high" },
      { name: "Float Pool Manager", description: "Manage flexible staffing resources", impact: "30% flexibility", priority: "medium" }
    ]
  },
  {
    category: "Performance Management",
    icon: TrendingUp,
    tools: [
      { name: "Performance Tracker", description: "Track and analyze staff performance", impact: "Data-driven insights", priority: "high" },
      { name: "Goal Manager", description: "Set and monitor performance goals", impact: "Clear objectives", priority: "medium" },
      { name: "360° Feedback", description: "Comprehensive feedback collection", impact: "Holistic evaluation", priority: "medium" },
      { name: "Performance Predictor", description: "Predict performance trends", impact: "Proactive management", priority: "high" }
    ]
  },
  {
    category: "Training & Development", 
    icon: GraduationCap,
    tools: [
      { name: "Skills Gap Analyzer", description: "Identify training needs and gaps", impact: "Targeted development", priority: "high" },
      { name: "Learning Path Creator", description: "Create personalized learning paths", impact: "Individual growth", priority: "medium" },
      { name: "Competency Tracker", description: "Track staff competencies", impact: "Compliance assurance", priority: "high" },
      { name: "Training ROI Calculator", description: "Calculate training effectiveness", impact: "Investment optimization", priority: "low" }
    ]
  },
  {
    category: "Recruitment & Retention",
    icon: UserPlus,
    tools: [
      { name: "Talent Sourcer", description: "AI-powered candidate sourcing", impact: "Better matches", priority: "high" },
      { name: "Retention Predictor", description: "Predict staff turnover risk", impact: "Proactive retention", priority: "high" },
      { name: "Onboarding Optimizer", description: "Streamline new staff onboarding", impact: "Faster integration", priority: "medium" },
      { name: "Exit Interview Analyzer", description: "Analyze exit interview patterns", impact: "Improvement insights", priority: "low" }
    ]
  }
];

// Staff Performance Metrics
const STAFF_METRICS = [
  {
    category: "Attendance & Punctuality",
    metrics: [
      { name: "Overall Attendance", value: "96.8%", change: "+2.1%", trend: "up", target: "95%" },
      { name: "Punctuality Rate", value: "94.2%", change: "+1.8%", trend: "up", target: "90%" },
      { name: "Sick Leave Usage", value: "3.2%", change: "-0.8%", trend: "down", target: "<5%" },
      { name: "Overtime Hours", value: "127h", change: "-15h", trend: "down", target: "<150h" }
    ]
  },
  {
    category: "Performance Indicators",
    metrics: [
      { name: "Performance Score", value: "8.7/10", change: "+0.3", trend: "up", target: "8.0+" },
      { name: "Goal Achievement", value: "89%", change: "+5%", trend: "up", target: "85%" },
      { name: "Client Satisfaction", value: "9.1/10", change: "+0.2", trend: "up", target: "8.5+" },
      { name: "Team Collaboration", value: "8.9/10", change: "+0.1", trend: "up", target: "8.0+" }
    ]
  },
  {
    category: "Training & Development",
    metrics: [
      { name: "Training Completion", value: "98.5%", change: "+3.2%", trend: "up", target: "95%" },
      { name: "Certification Rate", value: "92.1%", change: "+1.7%", trend: "up", target: "90%" },
      { name: "Skills Assessment", value: "87%", change: "+4%", trend: "up", target: "80%" },
      { name: "Learning Hours", value: "42h", change: "+8h", trend: "up", target: "40h" }
    ]
  },
  {
    category: "Retention & Satisfaction",
    metrics: [
      { name: "Staff Turnover", value: "8.2%", change: "-2.1%", trend: "down", target: "<10%" },
      { name: "Job Satisfaction", value: "8.6/10", change: "+0.4", trend: "up", target: "8.0+" },
      { name: "Engagement Score", value: "85%", change: "+3%", trend: "up", target: "80%" },
      { name: "Retention Rate", value: "91.8%", change: "+2.1%", trend: "up", target: "90%" }
    ]
  }
];

// Staff Alerts and Notifications
const WORKFORCE_ALERTS = [
  {
    id: 1,
    type: "Schedule Conflict",
    staff: "Emily Rodriguez",
    alert: "Double-booked for evening shift",
    time: "5 min ago",
    action: "Resolve scheduling conflict",
    priority: "high",
    icon: Calendar
  },
  {
    id: 2,
    type: "Training Due",
    staff: "Michael Chen",
    alert: "Mandatory training expires in 3 days",
    time: "1 hour ago",
    action: "Schedule training completion",
    priority: "medium",
    icon: GraduationCap
  },
  {
    id: 3,
    type: "Performance Review",
    staff: "Sarah Thompson",
    alert: "Annual review overdue by 2 weeks",
    time: "2 hours ago",
    action: "Schedule performance review",
    priority: "high",
    icon: Trophy
  },
  {
    id: 4,
    type: "Certification Renewal",
    staff: "David Wilson",
    alert: "First Aid certification expires next month",
    time: "4 hours ago",
    action: "Arrange certification renewal",
    priority: "medium",
    icon: Award
  },
  {
    id: 5,
    type: "Absence Alert",
    staff: "Lisa Martinez",
    alert: "Unexpected absence - shift needs coverage",
    time: "6 hours ago",
    action: "Find shift replacement",
    priority: "urgent",
    icon: AlertTriangle
  }
];

// Quick Workforce Commands
const WORKFORCE_COMMANDS = [
  {
    category: "Scheduling",
    icon: Calendar,
    commands: [
      { command: "/schedule", description: "View current staff schedule", color: "text-blue-500" },
      { command: "/coverage", description: "Check shift coverage", color: "text-green-500" },
      { command: "/swap", description: "Process shift swap request", color: "text-purple-500" },
      { command: "/overtime", description: "Analyze overtime patterns", color: "text-orange-500" }
    ]
  },
  {
    category: "Performance",
    icon: TrendingUp,
    commands: [
      { command: "/performance", description: "Staff performance summary", color: "text-cyan-500" },
      { command: "/goals", description: "Review performance goals", color: "text-teal-500" },
      { command: "/feedback", description: "Generate feedback report", color: "text-indigo-500" },
      { command: "/review", description: "Schedule performance review", color: "text-violet-500" }
    ]
  },
  {
    category: "Training",
    icon: GraduationCap,
    commands: [
      { command: "/training", description: "Check training status", color: "text-emerald-500" },
      { command: "/skills", description: "Skills gap analysis", color: "text-lime-500" },
      { command: "/compliance", description: "Training compliance check", color: "text-yellow-500" },
      { command: "/certifications", description: "Certification renewals", color: "text-amber-500" }
    ]
  },
  {
    category: "HR Operations",
    icon: Users,
    commands: [
      { command: "/onboard", description: "New staff onboarding", color: "text-pink-500" },
      { command: "/payroll", description: "Payroll processing", color: "text-rose-500" },
      { command: "/policies", description: "HR policy updates", color: "text-fuchsia-500" },
      { command: "/benefits", description: "Staff benefits summary", color: "text-red-500" }
    ]
  }
];

// Current Staff Overview
const CURRENT_STAFF = [
  {
    id: "ST001",
    name: "Emily Rodriguez",
    role: "Senior Care Assistant",
    shift: "Day Shift",
    status: "On Duty",
    performance: 9.2,
    alerts: 1
  },
  {
    id: "ST002", 
    name: "Michael Chen",
    role: "Registered Nurse",
    shift: "Night Shift",
    status: "Off Duty",
    performance: 8.8,
    alerts: 1
  },
  {
    id: "ST003",
    name: "Sarah Thompson",
    role: "Care Coordinator",
    shift: "Day Shift", 
    status: "On Duty",
    performance: 9.5,
    alerts: 1
  },
  {
    id: "ST004",
    name: "David Wilson",
    role: "Physiotherapist",
    shift: "Part Time",
    status: "Available",
    performance: 8.9,
    alerts: 1
  },
  {
    id: "ST005",
    name: "Lisa Martinez",
    role: "Care Assistant",
    shift: "Evening Shift",
    status: "Absent",
    performance: 8.6,
    alerts: 2
  },
  {
    id: "ST006",
    name: "James Taylor",
    role: "Activities Coordinator", 
    shift: "Day Shift",
    status: "On Duty",
    performance: 9.1,
    alerts: 0
  }
];

// 3D Holographic Interface Component
function HolographicInterface({ isActive, children }: { isActive: boolean; children: React.ReactNode }) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-lg border ${
        isActive ? 'border-purple-500/50 bg-purple-500/5' : 'border-border/30 bg-card/50'
      }`}
      animate={{
        boxShadow: isActive 
          ? [
              '0 0 20px rgba(147, 51, 234, 0.3)',
              '0 0 40px rgba(147, 51, 234, 0.5)',
              '0 0 20px rgba(147, 51, 234, 0.3)'
            ]
          : '0 0 0px rgba(147, 51, 234, 0)'
      }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* HR scanlines */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="h-full w-full"
          style={{
            background: 'linear-gradient(90deg, transparent 98%, rgba(147, 51, 234, 0.1) 100%)',
            backgroundSize: '35px 100%'
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 0%']
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

// Main Workforce AI Agent Component
export function WorkforceAIAgent({ selectedModel, onModelChange }: WorkforceAIAgentProps) {
  const [activeView, setActiveView] = useState("overview");
  const [selectedTool, setSelectedTool] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleToolSelect = (tool: any) => {
    setSelectedTool(tool.name);
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
    }, 2000);
  };

  const getAlertColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-500 bg-red-500/10 border-red-500/30';
      case 'high': return 'text-orange-500 bg-orange-500/10 border-orange-500/30';
      case 'medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30';
      case 'low': return 'text-blue-500 bg-blue-500/10 border-blue-500/30';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On Duty': return 'text-green-500 bg-green-500/10';
      case 'Available': return 'text-blue-500 bg-blue-500/10';
      case 'Off Duty': return 'text-gray-500 bg-gray-500/10';
      case 'Absent': return 'text-red-500 bg-red-500/10';
      default: return 'text-blue-500 bg-blue-500/10';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Users Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <motion.div
            className="relative"
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Users className="w-12 h-12 text-purple-500 drop-shadow-lg" />
            <motion.div
              className="absolute inset-0"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(147, 51, 234, 0.3)',
                  '0 0 40px rgba(147, 51, 234, 0.6)',
                  '0 0 20px rgba(147, 51, 234, 0.3)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold text-purple-500 tracking-tight">
              Workforce AI Agent
            </h1>
            <p className="text-muted-foreground">
              HR AI Specialist • Staff Management • Performance Optimization • Training & Development
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="animate-pulse bg-purple-500/10 border-purple-500/30 text-purple-600">
            <UsersIcon className="w-3 h-3 mr-1" />
            MANAGING
          </Badge>
          <Badge variant="outline" className="bg-blue-500/10 border-blue-500/30 text-blue-500">
            HR AI v2.8
          </Badge>
        </div>
      </motion.div>

      {/* Control Tabs */}
      <Tabs value={activeView} onValueChange={setActiveView} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-card/50 backdrop-blur-sm">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Staff Overview
          </TabsTrigger>
          <TabsTrigger value="metrics" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Alerts
          </TabsTrigger>
          <TabsTrigger value="tools" className="flex items-center gap-2">
            <Wrench className="w-4 h-4" />
            HR Tools
          </TabsTrigger>
          <TabsTrigger value="commands" className="flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            Commands
          </TabsTrigger>
        </TabsList>

        {/* Staff Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {CURRENT_STAFF.map((staff, index) => (
              <HolographicInterface key={index} isActive={true}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-sm">{staff.name}</CardTitle>
                      <div className="text-xs text-muted-foreground">{staff.id}</div>
                    </div>
                    <Badge className={getStatusColor(staff.status)}>
                      {staff.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-xs text-muted-foreground">{staff.role}</div>
                    <div className="text-xs">Shift: {staff.shift}</div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs">Performance Score</span>
                      <div className="flex items-center gap-2">
                        <Progress value={staff.performance * 10} className="w-16 h-2" />
                        <span className="text-xs font-mono">{staff.performance}/10</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-border/30">
                      <span className="text-xs text-muted-foreground">Active Alerts</span>
                      {staff.alerts > 0 ? (
                        <Badge variant="destructive" className="text-xs">
                          {staff.alerts}
                        </Badge>
                      ) : (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                  </div>
                </CardContent>
              </HolographicInterface>
            ))}
          </div>

          {/* Quick HR Actions */}
          <HolographicInterface isActive={true}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-500" />
                Quick HR Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {[
                  { icon: Calendar, label: "Schedule", color: "text-blue-500" },
                  { icon: TrendingUp, label: "Performance", color: "text-green-500" },
                  { icon: GraduationCap, label: "Training", color: "text-purple-500" },
                  { icon: UserPlus, label: "Recruitment", color: "text-cyan-500" },
                  { icon: DollarSign, label: "Payroll", color: "text-yellow-500" },
                  { icon: Award, label: "Recognition", color: "text-orange-500" },
                  { icon: ClockIcon, label: "Time & Attendance", color: "text-indigo-500" },
                  { icon: Briefcase, label: "Policies", color: "text-teal-500" },
                  { icon: Trophy, label: "Reviews", color: "text-pink-500" },
                  { icon: PersonStanding, label: "Wellbeing", color: "text-emerald-500" },
                  { icon: School, label: "Development", color: "text-violet-500" },
                  { icon: Medal, label: "Achievements", color: "text-amber-500" }
                ].map((action, index) => (
                  <motion.button
                    key={index}
                    className={`p-4 border border-border/50 hover:border-purple-500/30 rounded-lg transition-all duration-200 flex flex-col items-center gap-2 hover:bg-purple-500/5`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <action.icon className={`w-6 h-6 ${action.color}`} />
                    <span className="text-xs font-medium">{action.label}</span>
                  </motion.button>
                ))}
              </div>
            </CardContent>
          </HolographicInterface>
        </TabsContent>

        {/* Performance Metrics Tab */}
        <TabsContent value="metrics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {STAFF_METRICS.map((category, categoryIndex) => (
              <HolographicInterface key={categoryIndex} isActive={true}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.metrics.map((metric, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{metric.name}</span>
                          <div className={`flex items-center gap-1 ${
                            metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
                          }`}>
                            {metric.trend === 'up' ? (
                              <TrendingUp className="w-3 h-3" />
                            ) : (
                              <TrendingDown className="w-3 h-3" />
                            )}
                            <span className="text-xs">{metric.change}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold">{metric.value}</span>
                          <Badge variant="outline" className="text-xs">
                            Target: {metric.target}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </HolographicInterface>
            ))}
          </div>
        </TabsContent>

        {/* HR Alerts Tab */}
        <TabsContent value="alerts" className="space-y-6">
          <HolographicInterface isActive={true}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-purple-500" />
                Active HR Alerts
                <Badge variant="destructive" className="ml-auto">
                  {WORKFORCE_ALERTS.length} Active
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {WORKFORCE_ALERTS.map((alert) => (
                  <motion.div
                    key={alert.id}
                    className={`p-4 border rounded-lg transition-all duration-200 ${getAlertColor(alert.priority)}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: alert.id * 0.1 }}
                  >
                    <div className="flex items-start gap-4">
                      <alert.icon className="w-5 h-5 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium text-sm">{alert.staff}</div>
                          <div className="text-xs">{alert.time}</div>
                        </div>
                        <div className="text-sm mb-2">{alert.alert}</div>
                        <div className="text-xs text-muted-foreground">{alert.action}</div>
                      </div>
                      <Badge variant={alert.priority === 'urgent' ? 'destructive' : 'default'}>
                        {alert.type}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </HolographicInterface>
        </TabsContent>

        {/* HR Tools Tab */}
        <TabsContent value="tools" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {WORKFORCE_TOOLS.map((category, categoryIndex) => (
              <HolographicInterface key={categoryIndex} isActive={true}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <category.icon className="w-5 h-5 text-purple-500" />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.tools.map((tool, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleToolSelect(tool)}
                        className={`w-full p-4 text-left border border-border/50 hover:border-purple-500/30 rounded-lg transition-all duration-200 ${
                          selectedTool === tool.name ? 'bg-purple-500/10 border-purple-500/50' : 'bg-muted/20 hover:bg-purple-500/5'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            tool.priority === 'high' ? 'bg-red-500' :
                            tool.priority === 'medium' ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`} />
                          <div className="flex-1">
                            <div className="font-medium text-sm flex items-center gap-2">
                              {tool.name}
                              <Badge variant="outline" className="text-xs">
                                {tool.priority}
                              </Badge>
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">{tool.description}</div>
                            <div className="text-xs text-purple-500 mt-2 font-medium">{tool.impact}</div>
                          </div>
                          {isProcessing && selectedTool === tool.name && (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                              <Cpu className="w-4 h-4 text-purple-500" />
                            </motion.div>
                          )}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </CardContent>
              </HolographicInterface>
            ))}
          </div>
        </TabsContent>

        {/* Commands Tab */}
        <TabsContent value="commands" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {WORKFORCE_COMMANDS.map((category, categoryIndex) => (
              <HolographicInterface key={categoryIndex} isActive={true}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <category.icon className="w-5 h-5 text-purple-500" />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.commands.map((command, index) => (
                      <motion.button
                        key={index}
                        className="w-full p-3 text-left bg-muted/30 hover:bg-purple-500/10 border border-border/50 hover:border-purple-500/30 rounded-lg transition-all duration-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-3">
                          <code className={`text-xs bg-muted px-2 py-1 rounded font-mono ${command.color}`}>
                            {command.command}
                          </code>
                          <span className="text-sm">{command.description}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </CardContent>
              </HolographicInterface>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}