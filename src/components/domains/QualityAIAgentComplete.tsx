import React, { useState, useEffect, useCallback } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { 
  Shield, Activity, TrendingUp, AlertCircle, CheckCircle, Clock, 
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
  ChevronLeft, ChevronRight, SkipForward, SkipBack, FastForward,
  Rewind, Square, Circle, Triangle, Hexagon, Octagon, Star as StarIcon,
  Flag, Bookmark, Tag, Hash, AtSign, Percent, Slash, Ampersand,
  PenTool, Paintbrush, Palette, Image, Video as VideoIcon, Music,
  Volume1, VolumeX as MuteIcon, Power, Plug, Battery, BatteryLow,
  Signal, SignalHigh, SignalLow, WifiOff, Bluetooth, Radio,
  Satellite, Radar, Telescope, Microscope, FlaskConical, Atom,
  Dna, Zap as Lightning, Sun, Moon, CloudRain, Snowflake, Flame,
  Droplets, Wind, Compass, Map, Route, Car, Plane, Ship, Train,
  Bike, Footprints, Timer, Stopwatch, AlarmClock, Hourglass,
  CalendarDays, CalendarCheck, CalendarX, CalendarPlus, CalendarMinus
} from "lucide-react";
import { motion } from "motion/react";
import { mockStaffProfiles, mockClientProfiles, aeMedicationLibrary, aeTrainingModules } from "../../lib/expanded-mock-data";

interface QualityAIAgentProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
}

// Comprehensive System Navigation Map
const SYSTEM_NAVIGATION_MAP = {
  // Main Palace Gates
  'command-centre': { gate: 'command-centre', tab: 'dashboard', title: 'Command Centre Dashboard', description: 'Main system overview and KPIs' },
  'healthcare': { gate: 'healthcare', tab: 'overview', title: 'Healthcare Overview', description: 'Patient care and clinical management' },
  'workforce': { gate: 'workforce', tab: 'overview', title: 'Workforce Management', description: 'Staff scheduling and HR' },
  'finance-operations': { gate: 'finance-operations', tab: 'overview', title: 'Finance & Operations', description: 'Financial management and operations' },
  'quality-intelligence': { gate: 'quality-intelligence', tab: 'overview', title: 'Quality & Intelligence', description: 'Quality assurance and analytics' },
  'ai-hub': { gate: 'ai-hub', tab: 'ae-copilot', title: 'AEGIS AI Hub', description: 'AI agents and automation' },
  
  // Healthcare Sub-tabs
  'emar': { gate: 'healthcare', tab: 'emar', title: 'Electronic Medication Administration', description: 'Medication management system' },
  'care-plans': { gate: 'healthcare', tab: 'care-plans', title: 'Care Plans', description: 'Patient care planning and tracking' },
  'referrals': { gate: 'healthcare', tab: 'referrals', title: 'Referrals & Appointments', description: 'External referrals and appointments' },
  'clinical-notes': { gate: 'healthcare', tab: 'clinical-notes', title: 'Clinical Documentation', description: 'Patient records and notes' },
  
  // Workforce Sub-tabs
  'rota': { gate: 'workforce', tab: 'rota', title: 'Staff Rota Scheduler', description: '3D rota scheduling system' },
  'staff-profiles': { gate: 'workforce', tab: 'staff', title: 'Staff Profiles', description: 'Staff management and profiles' },
  'training': { gate: 'workforce', tab: 'training', title: 'Training & Development', description: 'Staff training and certifications' },
  'performance': { gate: 'workforce', tab: 'performance', title: 'Performance Management', description: 'Staff performance tracking' },
  
  // Finance & Operations Sub-tabs
  'ae-inventory': { gate: 'finance-operations', tab: 'ae-inventory', title: 'AE Inventory Management', description: 'Stock and supply management' },
  'financial-reports': { gate: 'finance-operations', tab: 'reports', title: 'Financial Reports', description: 'Financial analytics and reporting' },
  'billing': { gate: 'finance-operations', tab: 'billing', title: 'Billing & Invoicing', description: 'Client billing and invoicing' },
  'procurement': { gate: 'finance-operations', tab: 'procurement', title: 'Procurement', description: 'Purchasing and vendor management' },
  
  // Quality & Intelligence Sub-tabs
  'quality-audits': { gate: 'quality-intelligence', tab: 'audits', title: 'Quality Audits', description: 'Quality assurance audits' },
  'compliance': { gate: 'quality-intelligence', tab: 'compliance', title: 'Regulatory Compliance', description: 'CQC and regulatory compliance' },
  'analytics': { gate: 'quality-intelligence', tab: 'analytics', title: 'Business Intelligence', description: 'Advanced analytics and insights' },
  'incident-management': { gate: 'quality-intelligence', tab: 'incidents', title: 'Incident Management', description: 'Incident reporting and tracking' },
  
  // AI Hub Sub-tabs
  'ai-copilot': { gate: 'ai-hub', tab: 'ae-copilot', title: 'AE Co-Pilot', description: 'Main AI assistant' },
  'quality-agent': { gate: 'ai-hub', tab: 'quality-agent', title: 'Quality AI Agent', description: 'Quality-focused AI agent' },
  'finance-agent': { gate: 'ai-hub', tab: 'finance-agent', title: 'Finance AI Agent', description: 'Financial AI assistant' },
  'clinical-agent': { gate: 'ai-hub', tab: 'clinical-agent', title: 'Clinical AI Agent', description: 'Clinical decision support' },
  'workforce-agent': { gate: 'ai-hub', tab: 'workforce-agent', title: 'Workforce AI Agent', description: 'HR and workforce AI' },
  
  // Admin Functions
  'admin': { gate: 'admin', tab: 'overview', title: 'System Administration', description: 'System settings and administration' },
  'user-management': { gate: 'admin', tab: 'users', title: 'User Management', description: 'User accounts and permissions' },
  'system-settings': { gate: 'admin', tab: 'settings', title: 'System Settings', description: 'Global system configuration' },
  'backups': { gate: 'admin', tab: 'backups', title: 'Data Backups', description: 'System backup management' },
  
  // Quick Actions
  'new-client': { action: 'new-client', title: 'Add New Client', description: 'Register a new client' },
  'new-staff': { action: 'new-staff', title: 'Add New Staff Member', description: 'Register a new staff member' },
  'emergency-alert': { action: 'emergency', title: 'Emergency Alert', description: 'Trigger emergency alert system' },
  'medication-alert': { action: 'medication', title: 'Medication Alert', description: 'Medication-related alerts' },
  'incident-report': { action: 'incident', title: 'Report Incident', description: 'Create incident report' },
  'quality-audit': { action: 'audit', title: 'Start Quality Audit', description: 'Initiate quality audit process' }
};

// Search suggestions based on common healthcare management tasks
const SEARCH_SUGGESTIONS = [
  // Client Management
  { query: "client profiles", category: "Clients", icon: Users, description: "View and manage client profiles" },
  { query: "medication administration", category: "Healthcare", icon: Heart, description: "eMAR medication management" },
  { query: "care plans", category: "Healthcare", icon: FileText, description: "Client care planning" },
  { query: "risk assessments", category: "Quality", icon: AlertTriangle, description: "Client risk assessments" },
  
  // Staff Management
  { query: "staff rota", category: "Workforce", icon: Calendar, description: "Staff scheduling and rota" },
  { query: "staff training", category: "Workforce", icon: GraduationCap, description: "Training and development" },
  { query: "performance reviews", category: "Workforce", icon: TrendingUp, description: "Staff performance management" },
  { query: "payroll", category: "Finance", icon: DollarSign, description: "Staff payroll management" },
  
  // Quality & Compliance
  { query: "quality audits", category: "Quality", icon: Award, description: "Quality assurance audits" },
  { query: "compliance monitoring", category: "Quality", icon: Shield, description: "Regulatory compliance" },
  { query: "incident reports", category: "Quality", icon: AlertCircle, description: "Incident management" },
  { query: "CQC requirements", category: "Quality", icon: CheckCircle, description: "CQC compliance tracking" },
  
  // Financial Operations
  { query: "financial reports", category: "Finance", icon: BarChart3, description: "Financial analytics and reports" },
  { query: "inventory management", category: "Operations", icon: Package, description: "Stock and inventory" },
  { query: "billing and invoicing", category: "Finance", icon: Receipt, description: "Client billing" },
  { query: "budget planning", category: "Finance", icon: PieChart, description: "Budget and financial planning" },
  
  // Clinical Operations
  { query: "medication reviews", category: "Healthcare", icon: Stethoscope, description: "Clinical medication reviews" },
  { query: "referrals", category: "Healthcare", icon: ExternalLink, description: "External referrals and appointments" },
  { query: "clinical notes", category: "Healthcare", icon: Clipboard, description: "Clinical documentation" },
  { query: "health monitoring", category: "Healthcare", icon: Activity, description: "Client health monitoring" },
  
  // AI & Technology
  { query: "AI agents", category: "AI Hub", icon: Brain, description: "AI assistant management" },
  { query: "system analytics", category: "Analytics", icon: LineChart, description: "System performance analytics" },
  { query: "automated workflows", category: "AI Hub", icon: Workflow, description: "Process automation" },
  { query: "predictive analytics", category: "Analytics", icon: Target, description: "Predictive insights" },
  
  // Emergency & Critical
  { query: "emergency protocols", category: "Emergency", icon: LifeBuoy, description: "Emergency response procedures" },
  { query: "critical alerts", category: "Emergency", icon: Bell, description: "Critical system alerts" },
  { query: "safeguarding", category: "Quality", icon: ShieldCheck, description: "Safeguarding procedures" },
  { query: "fire safety", category: "Safety", icon: Flame, description: "Fire safety management" },
  
  // Administration
  { query: "user permissions", category: "Admin", icon: Key, description: "User access management" },
  { query: "system settings", category: "Admin", icon: Settings, description: "System configuration" },
  { query: "data backups", category: "Admin", icon: Archive, description: "Data backup management" },
  { query: "audit trails", category: "Admin", icon: FileText, description: "System audit trails" }
];

// 3D Holographic Command Interface Component
function HolographicInterface({ isActive, children }: { isActive: boolean; children: React.ReactNode }) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-lg border ${
        isActive ? 'border-primary/50 bg-primary/5' : 'border-border/30 bg-card/50'
      }`}
      animate={{
        boxShadow: isActive 
          ? [
              '0 0 20px rgba(212, 175, 55, 0.3)',
              '0 0 40px rgba(212, 175, 55, 0.5)',
              '0 0 20px rgba(212, 175, 55, 0.3)'
            ]
          : '0 0 0px rgba(212, 175, 55, 0)'
      }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Holographic scanlines */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="h-full w-full"
          style={{
            background: 'linear-gradient(90deg, transparent 98%, rgba(212, 175, 55, 0.1) 100%)',
            backgroundSize: '20px 100%'
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 0%']
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

// Main Quality AI Agent Component
export function QualityAIAgent({ selectedModel, onModelChange }: QualityAIAgentProps) {
  const [activeView, setActiveView] = useState("search");

  // Navigation handler for system-wide navigation
  const handleNavigation = useCallback((gate: string, tab?: string) => {
    // In a real implementation, this would trigger navigation
    console.log(`Navigating to: ${gate}${tab ? ` → ${tab}` : ''}`);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header with Shield Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <motion.div
            className="relative"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Shield className="w-12 h-12 text-primary drop-shadow-lg" />
            <motion.div
              className="absolute inset-0"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(212, 175, 55, 0.3)',
                  '0 0 40px rgba(212, 175, 55, 0.6)',
                  '0 0 20px rgba(212, 175, 55, 0.3)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold text-primary tracking-tight">
              AEGIS Quality AI Agent
            </h1>
            <p className="text-muted-foreground">
              Advanced AI Quality Assurance • Full System Access • Real-time Monitoring
            </p>
          </div>
        </div>
        
        <Badge variant="outline" className="animate-pulse bg-green-500/10 border-green-500/30 text-green-600">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
          FULLY OPERATIONAL
        </Badge>
      </motion.div>

      {/* Control Tabs */}
      <Tabs value={activeView} onValueChange={setActiveView} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-card/50 backdrop-blur-sm">
          <TabsTrigger value="search" className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            AI Search & Navigation
          </TabsTrigger>
          <TabsTrigger value="command" className="flex items-center gap-2">
            <Command className="w-4 h-4" />
            System Command Center
          </TabsTrigger>
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            System Overview
          </TabsTrigger>
        </TabsList>

        {/* AI Search Tab */}
        <TabsContent value="search" className="space-y-6">
          <HolographicInterface isActive={true}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5 text-primary" />
                AI-Powered System Search & Navigation
                <Badge variant="outline" className="ml-auto">
                  {Object.keys(SYSTEM_NAVIGATION_MAP).length} Destinations
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Search Interface */}
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      placeholder="Search anything in AEGIS... (AI-powered suggestions)"
                      className="pl-12 h-14 text-base"
                    />
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                      <LifeBuoy className="w-6 h-6 text-red-500" />
                      <span className="text-sm">Emergency</span>
                    </Button>
                    <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                      <Award className="w-6 h-6 text-yellow-500" />
                      <span className="text-sm">Quality Audits</span>
                    </Button>
                    <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                      <Brain className="w-6 h-6 text-blue-500" />
                      <span className="text-sm">AI Agents</span>
                    </Button>
                    <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                      <Users className="w-6 h-6 text-green-500" />
                      <span className="text-sm">Staff Management</span>
                    </Button>
                  </div>
                </div>

                {/* Popular Searches */}
                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Popular Searches
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {SEARCH_SUGGESTIONS.slice(0, 8).map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        className="justify-start h-auto p-3"
                        onClick={() => handleNavigation(suggestion.query)}
                      >
                        <suggestion.icon className="w-4 h-4 mr-3 text-primary" />
                        <div className="text-left">
                          <div className="font-medium text-sm">{suggestion.query}</div>
                          <div className="text-xs text-muted-foreground">{suggestion.category}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* System Navigation Map */}
                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Navigation className="w-4 h-4" />
                    Direct Navigation
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {Object.entries(SYSTEM_NAVIGATION_MAP).slice(0, 12).map(([key, nav]) => (
                      <motion.button
                        key={key}
                        onClick={() => handleNavigation(nav.gate || '', nav.tab)}
                        className="p-4 text-left bg-muted/30 hover:bg-primary/10 border border-border/50 hover:border-primary/30 rounded-lg transition-all duration-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-start gap-3">
                          <Navigation className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <div className="font-medium text-sm">{nav.title}</div>
                            <div className="text-xs text-muted-foreground mt-1">{nav.description}</div>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </HolographicInterface>
        </TabsContent>

        {/* Command Center Tab */}
        <TabsContent value="command" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Primary Commands */}
            <HolographicInterface isActive={true}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Command className="w-5 h-5 text-primary" />
                  Primary System Commands
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button className="h-auto p-4 flex flex-col items-center gap-2">
                    <Home className="w-6 h-6" />
                    <span className="text-sm">Command Centre</span>
                  </Button>
                  <Button className="h-auto p-4 flex flex-col items-center gap-2">
                    <Stethoscope className="w-6 h-6" />
                    <span className="text-sm">Healthcare</span>
                  </Button>
                  <Button className="h-auto p-4 flex flex-col items-center gap-2">
                    <Users className="w-6 h-6" />
                    <span className="text-sm">Workforce</span>
                  </Button>
                  <Button className="h-auto p-4 flex flex-col items-center gap-2">
                    <Calculator className="w-6 h-6" />
                    <span className="text-sm">Finance</span>
                  </Button>
                  <Button className="h-auto p-4 flex flex-col items-center gap-2">
                    <Shield className="w-6 h-6" />
                    <span className="text-sm">Quality</span>
                  </Button>
                  <Button className="h-auto p-4 flex flex-col items-center gap-2">
                    <Brain className="w-6 h-6" />
                    <span className="text-sm">AI Hub</span>
                  </Button>
                </div>
              </CardContent>
            </HolographicInterface>

            {/* Emergency & Critical */}
            <HolographicInterface isActive={true}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LifeBuoy className="w-5 h-5 text-red-500" />
                  Emergency & Critical Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="destructive" className="w-full justify-start">
                    <Bell className="w-4 h-4 mr-2" />
                    Emergency Alert
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-orange-500 text-orange-500">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Critical System Alert
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-yellow-500 text-yellow-500">
                    <Flame className="w-4 h-4 mr-2" />
                    Fire Safety Protocol
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-blue-500 text-blue-500">
                    <Shield className="w-4 h-4 mr-2" />
                    Safeguarding Alert
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="w-4 h-4 mr-2" />
                    Emergency Contacts
                  </Button>
                </div>
              </CardContent>
            </HolographicInterface>
          </div>

          {/* Quick Actions Grid */}
          <HolographicInterface isActive={true}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Quick Actions & Controls
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {[
                  { icon: UserPlus, label: "Add Client", color: "text-green-500" },
                  { icon: UserCheck, label: "Add Staff", color: "text-blue-500" },
                  { icon: Calendar, label: "Rota", color: "text-purple-500" },
                  { icon: Heart, label: "eMAR", color: "text-red-500" },
                  { icon: FileText, label: "Incident Report", color: "text-orange-500" },
                  { icon: Award, label: "Quality Audit", color: "text-yellow-500" },
                  { icon: BarChart3, label: "Analytics", color: "text-cyan-500" },
                  { icon: Settings, label: "System Settings", color: "text-gray-500" },
                  { icon: Archive, label: "Backups", color: "text-indigo-500" },
                  { icon: Monitor, label: "System Monitor", color: "text-teal-500" },
                  { icon: Lock, label: "Security", color: "text-rose-500" },
                  { icon: Download, label: "Updates", color: "text-emerald-500" }
                ].map((action, index) => (
                  <motion.button
                    key={index}
                    className={`p-4 border border-border/50 hover:border-primary/30 rounded-lg transition-all duration-200 flex flex-col items-center gap-2 hover:bg-primary/5`}
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

        {/* System Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* System Status */}
            <HolographicInterface isActive={true}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-primary" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">System Health</span>
                    <Badge variant="outline" className="bg-green-500/10 text-green-600">
                      99.7%
                    </Badge>
                  </div>
                  <Progress value={99.7} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Quality Score</span>
                    <Badge variant="outline" className="bg-green-500/10 text-green-600">
                      97.8%
                    </Badge>
                  </div>
                  <Progress value={97.8} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Compliance Rate</span>
                    <Badge variant="outline" className="bg-green-500/10 text-green-600">
                      99.2%
                    </Badge>
                  </div>
                  <Progress value={99.2} className="h-2" />
                </div>
              </CardContent>
            </HolographicInterface>

            {/* Active Components */}
            <HolographicInterface isActive={true}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Active Components
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Healthcare Domain", status: "online", count: "247 active" },
                    { name: "Workforce Management", status: "online", count: "120 staff" },
                    { name: "Quality Intelligence", status: "online", count: "15 audits" },
                    { name: "AI Agents", status: "processing", count: "5 active" },
                    { name: "Finance Operations", status: "online", count: "23 reports" }
                  ].map((component, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                      <div>
                        <div className="text-sm font-medium">{component.name}</div>
                        <div className="text-xs text-muted-foreground">{component.count}</div>
                      </div>
                      <Badge variant={component.status === 'online' ? 'default' : 'secondary'} className="text-xs">
                        {component.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </HolographicInterface>

            {/* Quick Stats */}
            <HolographicInterface isActive={true}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  System Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-3 bg-primary/10 rounded-lg">
                    <div className="text-2xl font-bold text-primary">40+</div>
                    <div className="text-sm text-muted-foreground">Active Clients</div>
                  </div>
                  <div className="text-center p-3 bg-blue-500/10 rounded-lg">
                    <div className="text-2xl font-bold text-blue-500">120+</div>
                    <div className="text-sm text-muted-foreground">Staff Members</div>
                  </div>
                  <div className="text-center p-3 bg-green-500/10 rounded-lg">
                    <div className="text-2xl font-bold text-green-500">847</div>
                    <div className="text-sm text-muted-foreground">Medications</div>
                  </div>
                  <div className="text-center p-3 bg-orange-500/10 rounded-lg">
                    <div className="text-2xl font-bold text-orange-500">5</div>
                    <div className="text-sm text-muted-foreground">AI Agents</div>
                  </div>
                </div>
              </CardContent>
            </HolographicInterface>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}