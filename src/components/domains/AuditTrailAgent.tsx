import React, { useState, useEffect, useCallback } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { 
  Clock, Activity, TrendingUp, AlertCircle, CheckCircle, 
  Users, FileText, BarChart3, Zap, Eye, Search, Filter, Download,
  Settings, RefreshCw, Play, Pause, Cpu, Database, Wifi, Globe,
  Target, Award, Heart, Brain, Layers, Command, Scan, MessageSquare,
  Send, ArrowRight, ChevronDown, ChevronUp, Star, ThumbsUp, AlertTriangle,
  Calendar, MapPin, Phone, Mail, User, Building, Clipboard, Monitor,
  Plus, Minus, RotateCcw, Maximize2, Minimize2, X, Volume2, VolumeX,
  Mic, MicOff, Camera, Video, Share, Lock, Unlock, Save, Navigation,
  Home, Stethoscope, Calculator, LifeBuoy, Headphones, Bell, BookOpen,
  Archive, FolderOpen, ShoppingCart, Truck, Wrench, PieChart, LineChart,
  BarChart, GitBranch, Workflow, Briefcase, GraduationCap, CreditCard,
  DollarSign, Receipt, Package, Warehouse, Shield as ShieldCheck,
  UserCheck, UserX, UserPlus, Key, Code, Terminal, Bug, HelpCircle,
  Info, ExternalLink, Link, Copy, Edit, Trash2, MoreHorizontal,
  History, RotateCcw as Revert, BookOpenCheck, Fingerprint, 
  ScanLine, Database as DatabaseIcon, Server, HardDrive
} from "lucide-react";
import { motion } from "motion/react";

interface AuditTrailAgentProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
}

// AI Activity Log Entries
const ACTIVITY_LOG = [
  {
    id: "LOG_001",
    timestamp: "2024-01-18 14:23:15",
    agent: "AE Co-Pilot",
    action: "Generated comprehensive financial report",
    user: "Sarah Mitchell",
    module: "Finance",
    status: "completed",
    duration: "2.3s",
    tokens: 1247,
    model: "GPT-4 Turbo",
    confidence: 96.8,
    category: "report_generation"
  },
  {
    id: "LOG_002", 
    timestamp: "2024-01-18 14:21:42",
    agent: "Clinical AI Agent",
    action: "Analyzed medication interactions for patient ID-4567",
    user: "Dr. Michael Chen",
    module: "Healthcare",
    status: "completed",
    duration: "1.8s",
    tokens: 892,
    model: "Claude 3 Opus",
    confidence: 98.5,
    category: "clinical_analysis"
  },
  {
    id: "LOG_003",
    timestamp: "2024-01-18 14:19:33",
    agent: "Quality AI Agent",
    action: "Compliance audit scan - CQC standards verification",
    user: "System Scheduler",
    module: "Quality",
    status: "completed",
    duration: "5.7s",
    tokens: 2341,
    model: "Claude 3 Opus",
    confidence: 99.2,
    category: "compliance_check"
  },
  {
    id: "LOG_004",
    timestamp: "2024-01-18 14:17:28",
    agent: "Workforce AI Agent",
    action: "Optimized staff schedule for next week",
    user: "Lisa Rodriguez",
    module: "Workforce",
    status: "completed",
    duration: "3.1s",
    tokens: 1856,
    model: "Claude 3 Sonnet",
    confidence: 94.7,
    category: "scheduling"
  },
  {
    id: "LOG_005",
    timestamp: "2024-01-18 14:15:12",
    agent: "Finance AI Agent",
    action: "Budget variance analysis Q4 2024",
    user: "David Wilson",
    module: "Finance",
    status: "completed",
    duration: "4.2s",
    tokens: 3142,
    model: "GPT-4 Turbo",
    confidence: 97.3,
    category: "financial_analysis"
  },
  {
    id: "LOG_006",
    timestamp: "2024-01-18 14:12:45",
    agent: "AE Co-Pilot",
    action: "Emergency protocol guidance - Fire safety procedures",
    user: "Emergency System",
    module: "Safety",
    status: "completed",
    duration: "1.2s",
    tokens: 567,
    model: "Claude 3 Opus",
    confidence: 99.8,
    category: "emergency_response"
  },
  {
    id: "LOG_007",
    timestamp: "2024-01-18 14:08:21",
    agent: "Clinical AI Agent",
    action: "Risk assessment for high-priority patients",
    user: "Nurse Thompson",
    module: "Healthcare",
    status: "in_progress",
    duration: "ongoing",
    tokens: 1234,
    model: "Claude 3 Opus",
    confidence: 96.1,
    category: "risk_assessment"
  },
  {
    id: "LOG_008",
    timestamp: "2024-01-18 14:05:33",
    agent: "Quality AI Agent",
    action: "Automated incident pattern analysis",
    user: "System AI",
    module: "Quality",
    status: "failed",
    duration: "timeout",
    tokens: 0,
    model: "GPT-4",
    confidence: 0,
    category: "pattern_analysis"
  }
];

// System Performance Metrics
const PERFORMANCE_METRICS = [
  {
    category: "AI Agent Performance",
    metrics: [
      { name: "Total AI Requests", value: "12,847", change: "+23.4%", trend: "up" },
      { name: "Average Response Time", value: "2.3s", change: "-0.4s", trend: "down" },
      { name: "Success Rate", value: "98.7%", change: "+1.2%", trend: "up" },
      { name: "Token Usage", value: "2.8M", change: "+18.9%", trend: "up" }
    ]
  },
  {
    category: "Security & Compliance",
    metrics: [
      { name: "Security Scans", value: "1,247", change: "+5.2%", trend: "up" },
      { name: "Compliance Checks", value: "456", change: "+12.1%", trend: "up" },
      { name: "Audit Events", value: "89", change: "-3.4%", trend: "down" },
      { name: "Access Violations", value: "2", change: "-8", trend: "down" }
    ]
  },
  {
    category: "Data Processing",
    metrics: [
      { name: "Records Processed", value: "45,123", change: "+31.7%", trend: "up" },
      { name: "Data Accuracy", value: "99.4%", change: "+0.3%", trend: "up" },
      { name: "Processing Speed", value: "1.2ms", change: "-0.3ms", trend: "down" },
      { name: "Error Rate", value: "0.02%", change: "-0.01%", trend: "down" }
    ]
  }
];

// Security and Compliance Events
const SECURITY_EVENTS = [
  {
    id: "SEC_001",
    type: "Access Control",
    event: "Successful multi-factor authentication",
    user: "Dr. Michael Chen",
    timestamp: "2024-01-18 14:23:45",
    severity: "info",
    source: "Healthcare Module"
  },
  {
    id: "SEC_002",
    type: "Data Access",
    event: "Sensitive patient data accessed",
    user: "Nurse Sarah Thompson", 
    timestamp: "2024-01-18 14:19:23",
    severity: "medium",
    source: "Clinical Records"
  },
  {
    id: "SEC_003",
    type: "Compliance Check",
    event: "GDPR compliance verification completed",
    user: "System AI",
    timestamp: "2024-01-18 14:15:12",
    severity: "info",
    source: "Quality System"
  },
  {
    id: "SEC_004",
    type: "Audit Trail",
    event: "Medication administration logged",
    user: "Care Assistant Martinez",
    timestamp: "2024-01-18 14:12:33",
    severity: "info",
    source: "eMAR System"
  },
  {
    id: "SEC_005",
    type: "Failed Access",
    event: "Invalid login attempt detected",
    user: "Unknown",
    timestamp: "2024-01-18 13:45:22",
    severity: "high",
    source: "Authentication System"
  }
];

// Data Categories for Audit
const AUDIT_CATEGORIES = [
  {
    name: "AI Agent Activity",
    icon: Brain,
    count: 1247,
    description: "All AI agent interactions and decisions",
    retention: "2 years"
  },
  {
    name: "User Actions",
    icon: Users,
    count: 3456,
    description: "User interactions with the system",
    retention: "7 years"
  },
  {
    name: "Clinical Data Access",
    icon: Stethoscope,
    count: 892,
    description: "Access to patient clinical information",
    retention: "Indefinite"
  },
  {
    name: "Financial Transactions",
    icon: Calculator,
    count: 234,
    description: "Financial data access and modifications",
    retention: "7 years"
  },
  {
    name: "Security Events",
    icon: ShieldCheck,
    count: 156,
    description: "Security-related system events",
    retention: "5 years"
  },
  {
    name: "System Changes",
    icon: Settings,
    count: 78,
    description: "Configuration and system modifications",
    retention: "10 years"
  }
];

// 3D Holographic Interface Component
function HolographicInterface({ isActive, children }: { isActive: boolean; children: React.ReactNode }) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-lg border ${
        isActive ? 'border-orange-500/50 bg-orange-500/5' : 'border-border/30 bg-card/50'
      }`}
      animate={{
        boxShadow: isActive 
          ? [
              '0 0 20px rgba(249, 115, 22, 0.3)',
              '0 0 40px rgba(249, 115, 22, 0.5)',
              '0 0 20px rgba(249, 115, 22, 0.3)'
            ]
          : '0 0 0px rgba(249, 115, 22, 0)'
      }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Audit scanlines */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="h-full w-full"
          style={{
            background: 'linear-gradient(90deg, transparent 98%, rgba(249, 115, 22, 0.1) 100%)',
            backgroundSize: '45px 100%'
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 0%']
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

// Main Audit Trail Agent Component
export function AuditTrailAgent({ selectedModel, onModelChange }: AuditTrailAgentProps) {
  const [activeView, setActiveView] = useState("activity");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterAgent, setFilterAgent] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-500 bg-green-500/10 border-green-500/30';
      case 'in_progress': return 'text-blue-500 bg-blue-500/10 border-blue-500/30';
      case 'failed': return 'text-red-500 bg-red-500/10 border-red-500/30';
      case 'pending': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/30';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-500 bg-red-500/10';
      case 'medium': return 'text-orange-500 bg-orange-500/10';
      case 'low': return 'text-yellow-500 bg-yellow-500/10';
      case 'info': return 'text-blue-500 bg-blue-500/10';
      default: return 'text-gray-500 bg-gray-500/10';
    }
  };

  const formatDuration = (duration: string) => {
    if (duration === 'ongoing' || duration === 'timeout') return duration;
    return duration;
  };

  const filteredActivity = ACTIVITY_LOG.filter(log => {
    const matchesStatus = filterStatus === 'all' || log.status === filterStatus;
    const matchesAgent = filterAgent === 'all' || log.agent === filterAgent;
    const matchesSearch = !searchQuery || 
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.module.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesAgent && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header with Clock Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <motion.div
            className="relative"
            animate={{
              rotate: [0, 360]
            }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            <Clock className="w-12 h-12 text-orange-500 drop-shadow-lg" />
            <motion.div
              className="absolute inset-0"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(249, 115, 22, 0.3)',
                  '0 0 40px rgba(249, 115, 22, 0.6)',
                  '0 0 20px rgba(249, 115, 22, 0.3)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold text-orange-500 tracking-tight">
              Audit Trail
            </h1>
            <p className="text-muted-foreground">
              AI Activity Log • System Monitoring • Compliance Tracking • Security Auditing
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="animate-pulse bg-orange-500/10 border-orange-500/30 text-orange-600">
            <History className="w-3 h-3 mr-1" />
            LOGGING
          </Badge>
          <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-600">
            {ACTIVITY_LOG.length} Events Today
          </Badge>
        </div>
      </motion.div>

      {/* Control Tabs */}
      <Tabs value={activeView} onValueChange={setActiveView} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-card/50 backdrop-blur-sm">
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            AI Activity
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            Security Events
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex items-center gap-2">
            <BookOpenCheck className="w-4 h-4" />
            Compliance
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <ScanLine className="w-4 h-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* AI Activity Log Tab */}
        <TabsContent value="activity" className="space-y-6">
          {/* Filter Controls */}
          <HolographicInterface isActive={true}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-orange-500" />
                Activity Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search activity..."
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Status</label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Agent</label>
                  <Select value={filterAgent} onValueChange={setFilterAgent}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Agents</SelectItem>
                      <SelectItem value="AE Co-Pilot">AE Co-Pilot</SelectItem>
                      <SelectItem value="Clinical AI Agent">Clinical AI Agent</SelectItem>
                      <SelectItem value="Quality AI Agent">Quality AI Agent</SelectItem>
                      <SelectItem value="Finance AI Agent">Finance AI Agent</SelectItem>
                      <SelectItem value="Workforce AI Agent">Workforce AI Agent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-end">
                  <Button className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Export Log
                  </Button>
                </div>
              </div>
            </CardContent>
          </HolographicInterface>

          {/* Activity Log Entries */}
          <HolographicInterface isActive={true}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="w-5 h-5 text-orange-500" />
                Recent AI Activity
                <Badge variant="outline" className="ml-auto">
                  {filteredActivity.length} entries
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredActivity.map((log, index) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 border border-border/50 rounded-lg hover:border-orange-500/30 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <Brain className="w-5 h-5 text-orange-500 mt-0.5" />
                        <div>
                          <div className="font-medium text-sm mb-1">{log.action}</div>
                          <div className="text-xs text-muted-foreground">
                            {log.agent} • {log.user} • {log.module}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(log.status)}>
                          {log.status}
                        </Badge>
                        <div className="text-xs text-muted-foreground mt-1">{log.timestamp}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs">
                      <div>
                        <span className="text-muted-foreground">Duration:</span>
                        <div className="font-mono">{formatDuration(log.duration)}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Tokens:</span>
                        <div className="font-mono">{log.tokens.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Model:</span>
                        <div className="font-mono">{log.model}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Confidence:</span>
                        <div className="font-mono">{log.confidence}%</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Category:</span>
                        <div className="font-mono">{log.category}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </HolographicInterface>
        </TabsContent>

        {/* Security Events Tab */}
        <TabsContent value="security" className="space-y-6">
          <HolographicInterface isActive={true}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-orange-500" />
                Security & Access Events
                <Badge variant="destructive" className="ml-auto">
                  {SECURITY_EVENTS.filter(e => e.severity === 'high').length} High Priority
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {SECURITY_EVENTS.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 border border-border/50 rounded-lg hover:border-orange-500/30 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <Fingerprint className="w-5 h-5 text-orange-500 mt-0.5" />
                        <div>
                          <div className="font-medium text-sm mb-1">{event.event}</div>
                          <div className="text-xs text-muted-foreground">
                            {event.user} • {event.source}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getSeverityColor(event.severity)}>
                          {event.severity}
                        </Badge>
                        <div className="text-xs text-muted-foreground mt-1">{event.timestamp}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {event.type}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Eye className="w-3 h-3 mr-1" />
                        Details
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </HolographicInterface>
        </TabsContent>

        {/* Performance Metrics Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {PERFORMANCE_METRICS.map((category, categoryIndex) => (
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
                        <div className="text-xl font-bold">{metric.value}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </HolographicInterface>
            ))}
          </div>
        </TabsContent>

        {/* Compliance Tab */}
        <TabsContent value="compliance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {AUDIT_CATEGORIES.map((category, index) => (
              <HolographicInterface key={index} isActive={true}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <category.icon className="w-5 h-5 text-orange-500" />
                    {category.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                      <div className="text-2xl font-bold text-orange-500">{category.count.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Events Today</div>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">{category.description}</div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Retention:</span>
                      <Badge variant="outline">{category.retention}</Badge>
                    </div>
                    
                    <Button className="w-full" variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </HolographicInterface>
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <HolographicInterface isActive={true}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ScanLine className="w-5 h-5 text-orange-500" />
                Audit Trail Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: "Pattern Analysis", description: "Identify unusual activity patterns", icon: BarChart3 },
                  { title: "Compliance Report", description: "Generate compliance audit report", icon: BookOpenCheck },
                  { title: "Security Summary", description: "Security events summary", icon: ShieldCheck },
                  { title: "Performance Trends", description: "System performance analysis", icon: TrendingUp },
                  { title: "User Activity", description: "User behavior analysis", icon: Users },
                  { title: "Data Access", description: "Data access patterns", icon: DatabaseIcon },
                  { title: "System Health", description: "Overall system health", icon: Monitor },
                  { title: "Predictive Insights", description: "Predictive analytics", icon: Target }
                ].map((item, index) => (
                  <motion.button
                    key={index}
                    className="p-4 text-left bg-muted/30 hover:bg-orange-500/10 border border-border/50 hover:border-orange-500/30 rounded-lg transition-all duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <item.icon className="w-8 h-8 text-orange-500 mb-3" />
                    <div className="font-medium text-sm mb-1">{item.title}</div>
                    <div className="text-xs text-muted-foreground">{item.description}</div>
                  </motion.button>
                ))}
              </div>
            </CardContent>
          </HolographicInterface>
        </TabsContent>
      </Tabs>
    </div>
  );
}