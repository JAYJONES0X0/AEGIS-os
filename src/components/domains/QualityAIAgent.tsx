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

// AI-Powered Search Interface Component
function AISearchInterface({ onNavigate }: { onNavigate?: (gate: string, tab?: string) => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Filter suggestions based on search query
  const filteredSuggestions = searchQuery 
    ? SEARCH_SUGGESTIONS.filter(suggestion => 
        suggestion.query.toLowerCase().includes(searchQuery.toLowerCase()) ||
        suggestion.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        suggestion.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 8)
    : SEARCH_SUGGESTIONS.slice(0, 6);

  // Search navigation map
  const searchNavigation = Object.entries(SYSTEM_NAVIGATION_MAP).filter(([key, nav]) =>
    key.toLowerCase().includes(searchQuery.toLowerCase()) ||
    nav.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    nav.description.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setIsSearching(true);
      setShowSuggestions(true);
      
      // Simulate AI processing
      setTimeout(() => {
        setSearchResults([...filteredSuggestions, ...searchNavigation.map(([key, nav]) => ({
          ...nav,
          query: nav.title,
          category: "Navigation",
          icon: Navigation,
          key
        }))]);
        setIsSearching(false);
      }, 300);
    } else {
      setShowSuggestions(false);
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearch = (suggestion: any) => {
    setSearchQuery(suggestion.query);
    setShowSuggestions(false);
    
    // Navigate if it's a navigation item
    if (suggestion.gate && onNavigate) {
      onNavigate(suggestion.gate, suggestion.tab);
    }
    
    // Trigger action if it's an action item
    if (suggestion.action) {
      // Handle action triggers here
      console.log("Triggering action:", suggestion.action);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, searchResults.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (searchResults[selectedIndex]) {
        handleSearch(searchResults[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative">
      <HolographicInterface isActive={isSearching || showSuggestions}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5 text-primary" />
            AI-Powered System Search
            {isSearching && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Brain className="w-4 h-4 text-primary" />
              </motion.div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Search anything in AEGIS... (AI-powered suggestions)"
                className="pl-10 pr-4 h-12 text-sm"
              />
              {searchQuery && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setSearchQuery("");
                    setShowSuggestions(false);
                  }}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-3 gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleSearch({ query: "emergency protocols", action: "emergency" })}
                className="flex items-center gap-2 text-xs"
              >
                <LifeBuoy className="w-3 h-3 text-red-500" />
                Emergency
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleSearch({ query: "quality audits", gate: "quality-intelligence", tab: "audits" })}
                className="flex items-center gap-2 text-xs"
              >
                <Award className="w-3 h-3 text-yellow-500" />
                Quality
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleSearch({ query: "AI agents", gate: "ai-hub", tab: "ae-copilot" })}
                className="flex items-center gap-2 text-xs"
              >
                <Brain className="w-3 h-3 text-blue-500" />
                AI Hub
              </Button>
            </div>
          </div>
        </CardContent>
      </HolographicInterface>

      {/* Search Results Dropdown */}
      {showSuggestions && searchResults.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 z-50 mt-2 bg-card border border-border rounded-lg shadow-lg max-h-96 overflow-y-auto"
        >
          {searchResults.map((result, index) => (
            <motion.button
              key={index}
              onClick={() => handleSearch(result)}
              className={`w-full p-3 text-left hover:bg-muted/50 border-b border-border/30 last:border-b-0 transition-colors ${
                index === selectedIndex ? 'bg-primary/10 border-primary/20' : ''
              }`}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-center gap-3">
                <result.icon className="w-4 h-4 text-primary" />
                <div className="flex-1">
                  <div className="font-medium text-sm">{result.query}</div>
                  <div className="text-xs text-muted-foreground">{result.description}</div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {result.category}
                </Badge>
              </div>
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  );
}

// System Command Center Component
function SystemCommandCenter({ onNavigate }: { onNavigate?: (gate: string, tab?: string) => void }) {
  const [activeCategory, setActiveCategory] = useState("navigation");

  const commandCategories = {
    navigation: {
      title: "Navigation & Access",
      icon: Navigation,
      commands: [
        { title: "Command Centre", icon: Home, action: () => onNavigate?.("command-centre", "dashboard") },
        { title: "Healthcare Hub", icon: Stethoscope, action: () => onNavigate?.("healthcare", "overview") },
        { title: "Workforce Management", icon: Users, action: () => onNavigate?.("workforce", "overview") },
        { title: "Finance & Operations", icon: Calculator, action: () => onNavigate?.("finance-operations", "overview") },
        { title: "Quality Intelligence", icon: Shield, action: () => onNavigate?.("quality-intelligence", "overview") },
        { title: "AI Hub", icon: Brain, action: () => onNavigate?.("ai-hub", "ae-copilot") },
        { title: "System Admin", icon: Settings, action: () => onNavigate?.("admin", "overview") },
        { title: "3D Rota Scheduler", icon: Calendar, action: () => onNavigate?.("workforce", "rota") }
      ]
    },
    clinical: {
      title: "Clinical Operations",
      icon: Stethoscope,
      commands: [
        { title: "eMAR System", icon: Heart, action: () => onNavigate?.("healthcare", "emar") },
        { title: "Care Plans", icon: FileText, action: () => onNavigate?.("healthcare", "care-plans") },
        { title: "Clinical Notes", icon: Clipboard, action: () => onNavigate?.("healthcare", "clinical-notes") },
        { title: "Referrals & Appointments", icon: ExternalLink, action: () => onNavigate?.("healthcare", "referrals") },
        { title: "Health Monitoring", icon: Activity, action: () => console.log("Health monitoring") },
        { title: "Risk Assessments", icon: AlertTriangle, action: () => console.log("Risk assessments") },
        { title: "Medication Reviews", icon: Stethoscope, action: () => console.log("Medication reviews") },
        { title: "Clinical AI Agent", icon: Brain, action: () => onNavigate?.("ai-hub", "clinical-agent") }
      ]
    },
    quality: {
      title: "Quality & Compliance",
      icon: Award,
      commands: [
        { title: "Quality Audits", icon: Award, action: () => onNavigate?.("quality-intelligence", "audits") },
        { title: "Compliance Monitoring", icon: Shield, action: () => onNavigate?.("quality-intelligence", "compliance") },
        { title: "Incident Management", icon: AlertCircle, action: () => onNavigate?.("quality-intelligence", "incidents") },
        { title: "CQC Requirements", icon: CheckCircle, action: () => console.log("CQC requirements") },
        { title: "Safeguarding", icon: ShieldCheck, action: () => console.log("Safeguarding") },
        { title: "Fire Safety", icon: Flame, action: () => console.log("Fire safety") },
        { title: "Quality Analytics", icon: BarChart3, action: () => onNavigate?.("quality-intelligence", "analytics") },
        { title: "Quality AI Agent", icon: Brain, action: () => onNavigate?.("ai-hub", "quality-agent") }
      ]
    },
    workforce: {
      title: "Workforce & HR",
      icon: Users,
      commands: [
        { title: "Staff Profiles", icon: User, action: () => onNavigate?.("workforce", "staff") },
        { title: "Rota Management", icon: Calendar, action: () => onNavigate?.("workforce", "rota") },
        { title: "Training & Development", icon: GraduationCap, action: () => onNavigate?.("workforce", "training") },
        { title: "Performance Management", icon: TrendingUp, action: () => onNavigate?.("workforce", "performance") },
        { title: "Payroll", icon: DollarSign, action: () => console.log("Payroll") },
        { title: "HR Policies", icon: BookOpen, action: () => console.log("HR policies") },
        { title: "Workforce Analytics", icon: BarChart3, action: () => console.log("Workforce analytics") },
        { title: "Workforce AI Agent", icon: Brain, action: () => onNavigate?.("ai-hub", "workforce-agent") }
      ]
    },
    financial: {
      title: "Financial Operations",
      icon: Calculator,
      commands: [
        { title: "Financial Reports", icon: BarChart3, action: () => onNavigate?.("finance-operations", "reports") },
        { title: "AE Inventory", icon: Package, action: () => onNavigate?.("finance-operations", "ae-inventory") },
        { title: "Billing & Invoicing", icon: Receipt, action: () => onNavigate?.("finance-operations", "billing") },
        { title: "Procurement", icon: ShoppingCart, action: () => onNavigate?.("finance-operations", "procurement") },
        { title: "Budget Planning", icon: PieChart, action: () => console.log("Budget planning") },
        { title: "Cost Analysis", icon: LineChart, action: () => console.log("Cost analysis") },
        { title: "Vendor Management", icon: Truck, action: () => console.log("Vendor management") },
        { title: "Finance AI Agent", icon: Brain, action: () => onNavigate?.("ai-hub", "finance-agent") }
      ]
    },
    emergency: {
      title: "Emergency & Critical",
      icon: LifeBuoy,
      commands: [
        { title: "Emergency Alert", icon: Bell, action: () => console.log("Emergency alert") },
        { title: "Critical Alerts", icon: AlertTriangle, action: () => console.log("Critical alerts") },
        { title: "Fire Safety", icon: Flame, action: () => console.log("Fire safety") },
        { title: "Evacuation", icon: LifeBuoy, action: () => console.log("Evacuation") },
        { title: "Emergency Contacts", icon: Phone, action: () => console.log("Emergency contacts") },
        { title: "Incident Response", icon: Target, action: () => console.log("Incident response") },
        { title: "Crisis Management", icon: Shield, action: () => console.log("Crisis management") },
        { title: "System Recovery", icon: RefreshCw, action: () => console.log("System recovery") }
      ]
    },
    automation: {
      title: "AI & Automation",
      icon: Brain,
      commands: [
        { title: "AE Co-Pilot", icon: Bot, action: () => onNavigate?.("ai-hub", "ae-copilot") },
        { title: "Quality AI Agent", icon: Award, action: () => onNavigate?.("ai-hub", "quality-agent") },
        { title: "Clinical AI Agent", icon: Stethoscope, action: () => onNavigate?.("ai-hub", "clinical-agent") },
        { title: "Finance AI Agent", icon: Calculator, action: () => onNavigate?.("ai-hub", "finance-agent") },
        { title: "Workforce AI Agent", icon: Users, action: () => onNavigate?.("ai-hub", "workforce-agent") },
        { title: "Automated Workflows", icon: Workflow, action: () => console.log("Automated workflows") },
        { title: "Predictive Analytics", icon: Target, action: () => console.log("Predictive analytics") },
        { title: "AI Model Management", icon: Cpu, action: () => onNavigate?.("ai-hub", "llm-selector") }
      ]
    },
    system: {
      title: "System Administration",
      icon: Settings,
      commands: [
        { title: "User Management", icon: UserCheck, action: () => onNavigate?.("admin", "users") },
        { title: "System Settings", icon: Settings, action: () => onNavigate?.("admin", "settings") },
        { title: "Data Backups", icon: Archive, action: () => onNavigate?.("admin", "backups") },
        { title: "Audit Trails", icon: FileText, action: () => onNavigate?.("ai-hub", "audit-trail") },
        { title: "System Monitoring", icon: Monitor, action: () => console.log("System monitoring") },
        { title: "Performance Analytics", icon: Activity, action: () => console.log("Performance analytics") },
        { title: "Security Management", icon: Lock, action: () => console.log("Security management") },
        { title: "System Updates", icon: Download, action: () => console.log("System updates") }
      ]
    }
  };

  return (
    <HolographicInterface isActive={true}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Command className="w-5 h-5 text-primary" />
          System Command Center
          <Badge variant="outline" className="ml-auto">
            {Object.keys(commandCategories).length} Categories
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Category Selector */}
          <div className="grid grid-cols-4 gap-2">
            {Object.entries(commandCategories).map(([key, category]) => (
              <Button
                key={key}
                size="sm"
                variant={activeCategory === key ? "default" : "outline"}
                onClick={() => setActiveCategory(key)}
                className="flex flex-col items-center gap-1 h-auto py-2"
              >
                <category.icon className="w-4 h-4" />
                <span className="text-xs">{category.title.split(' ')[0]}</span>
              </Button>
            ))}
          </div>

          {/* Commands Grid */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto institutional-scroll"
          >
            {commandCategories[activeCategory as keyof typeof commandCategories].commands.map((command, index) => (
              <motion.button
                key={index}
                onClick={command.action}
                className="p-3 text-left bg-muted/30 hover:bg-primary/10 border border-border/50 hover:border-primary/30 rounded-lg transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-2">
                  <command.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{command.title}</span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </CardContent>
    </HolographicInterface>
  );
}

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

// JARVIS-like Voice Interface Component
function VoiceInterface({ 
  isListening, 
  isProcessing, 
  onToggleListening,
  currentResponse 
}: {
  isListening: boolean;
  isProcessing: boolean;
  onToggleListening: () => void;
  currentResponse: string;
}) {
  return (
    <motion.div
      className="relative p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30"
      animate={{
        scale: isListening ? [1, 1.02, 1] : 1,
        borderColor: isListening 
          ? ['rgba(212, 175, 55, 0.3)', 'rgba(212, 175, 55, 0.8)', 'rgba(212, 175, 55, 0.3)']
          : 'rgba(212, 175, 55, 0.3)'
      }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      {/* Central Voice Orb */}
      <div className="flex flex-col items-center space-y-4">
        <motion.div
          className="relative w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center cursor-pointer"
          onClick={onToggleListening}
          animate={{
            scale: isListening ? [1, 1.1, 1] : [1, 1.05, 1],
            boxShadow: isListening
              ? [
                  '0 0 30px rgba(212, 175, 55, 0.5)',
                  '0 0 60px rgba(212, 175, 55, 0.8)',
                  '0 0 30px rgba(212, 175, 55, 0.5)'
                ]
              : [
                  '0 0 20px rgba(212, 175, 55, 0.3)',
                  '0 0 40px rgba(212, 175, 55, 0.5)',
                  '0 0 20px rgba(212, 175, 55, 0.3)'
                ]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {isProcessing ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Cpu className="w-8 h-8 text-primary-foreground" />
            </motion.div>
          ) : isListening ? (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              <Mic className="w-8 h-8 text-primary-foreground" />
            </motion.div>
          ) : (
            <MicOff className="w-8 h-8 text-primary-foreground/70" />
          )}
          
          {/* Voice activity indicator */}
          {isListening && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary-foreground/30"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.7, 0.3, 0.7]
              }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </motion.div>

        {/* Status Text */}
        <div className="text-center space-y-2">
          <h3 className="font-semibold text-lg text-primary">
            {isProcessing ? "Processing..." : isListening ? "Listening..." : "Voice Command Ready"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {isProcessing 
              ? "Analyzing your request..." 
              : isListening 
                ? "Speak your command now"
                : "Click to activate voice control"
            }
          </p>
        </div>

        {/* Response Display */}
        {currentResponse && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md text-center p-4 bg-card/80 rounded-lg border border-border/50"
          >
            <p className="text-sm">{currentResponse}</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// Live System Monitor Component
function LiveSystemMonitor() {
  const [metrics, setMetrics] = useState({
    qualityScore: 97.8,
    complianceRate: 99.2,
    alertsActive: 3,
    auditsPending: 7,
    staffCompliance: 96.5,
    incidentRate: 0.12,
    clientSatisfaction: 98.4,
    systemHealth: 99.7
  });

  const [activeAlerts] = useState([
    { id: 1, type: 'urgent', title: 'Medication Review Overdue', client: 'Arthur Andrews AE', priority: 'High', time: '2 min ago' },
    { id: 2, type: 'warning', title: 'Training Expiry Notice', staff: 'Michael Roberts AE', module: 'Manual Handling', time: '15 min ago' },
    { id: 3, type: 'info', title: 'Quality Audit Scheduled', location: 'Hazelbury House', date: 'Tomorrow 10:00 AM', time: '1 hour ago' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        qualityScore: Math.max(95, Math.min(100, prev.qualityScore + (Math.random() - 0.5) * 0.5)),
        complianceRate: Math.max(97, Math.min(100, prev.complianceRate + (Math.random() - 0.5) * 0.3)),
        clientSatisfaction: Math.max(95, Math.min(100, prev.clientSatisfaction + (Math.random() - 0.5) * 0.4)),
        systemHealth: Math.max(98, Math.min(100, prev.systemHealth + (Math.random() - 0.5) * 0.2))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <HolographicInterface isActive={true}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          Live System Monitor
          <Badge variant="outline" className="ml-auto animate-pulse">
            ONLINE
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {/* Key Metrics */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Quality Score</span>
                <span className="text-lg font-bold text-green-500">{metrics.qualityScore.toFixed(1)}%</span>
              </div>
              <Progress value={metrics.qualityScore} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Compliance Rate</span>
                <span className="text-lg font-bold text-green-500">{metrics.complianceRate.toFixed(1)}%</span>
              </div>
              <Progress value={metrics.complianceRate} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Client Satisfaction</span>
                <span className="text-lg font-bold text-blue-500">{metrics.clientSatisfaction.toFixed(1)}%</span>
              </div>
              <Progress value={metrics.clientSatisfaction} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">System Health</span>
                <span className="text-lg font-bold text-primary">{metrics.systemHealth.toFixed(1)}%</span>
              </div>
              <Progress value={metrics.systemHealth} className="h-2" />
            </div>
          </div>

          {/* Active Alerts */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Active Alerts ({activeAlerts.length})
            </h4>
            
            {activeAlerts.map((alert) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`p-3 rounded-lg border text-xs space-y-1 ${
                  alert.type === 'urgent' ? 'bg-red-500/10 border-red-500/30' :
                  alert.type === 'warning' ? 'bg-yellow-500/10 border-yellow-500/30' :
                  'bg-blue-500/10 border-blue-500/30'
                }`}
              >
                <div className="font-medium">{alert.title}</div>
                <div className="text-muted-foreground">
                  {alert.client && `Client: ${alert.client}`}
                  {alert.staff && `Staff: ${alert.staff}`}
                  {alert.location && `Location: ${alert.location}`}
                </div>
                <div className="text-xs opacity-70">{alert.time}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </HolographicInterface>
  );
}

// Interactive Data Fetcher Component
function InteractiveDataFetcher({ onDataFetch }: { onDataFetch: (data: any) => void }) {
  const [isScanning, setIsScanning] = useState(false);
  const [lastScan, setLastScan] = useState<string | null>(null);

  const dataCategories = [
    { id: 'clients', label: 'Client Data', icon: Users, count: mockClientProfiles.length },
    { id: 'staff', label: 'Staff Records', icon: User, count: mockStaffProfiles.length },
    { id: 'medications', label: 'Medication Library', icon: Heart, count: aeMedicationLibrary.length },
    { id: 'training', label: 'Training Modules', icon: Brain, count: aeTrainingModules.length },
    { id: 'compliance', label: 'Compliance Reports', icon: Shield, count: 23 },
    { id: 'incidents', label: 'Incident Reports', icon: AlertTriangle, count: 5 },
    { id: 'audits', label: 'Quality Audits', icon: CheckCircle, count: 12 },
    { id: 'analytics', label: 'Performance Analytics', icon: BarChart3, count: 156 }
  ];

  const handleDataFetch = useCallback(async (categoryId: string) => {
    setIsScanning(true);
    setLastScan(categoryId);

    // Simulate data fetching with realistic delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    let fetchedData = {};
    switch (categoryId) {
      case 'clients':
        fetchedData = {
          category: 'Client Data',
          data: mockClientProfiles,
          insights: [
            'Average age: 81.5 years',
            'High dependency: 50%',
            'Medication compliance: 98.2%',
            'Risk assessments up to date: 100%'
          ]
        };
        break;
      case 'staff':
        fetchedData = {
          category: 'Staff Records',
          data: mockStaffProfiles,
          insights: [
            'Total active staff: 120',
            'Average efficiency: 95.8%',
            'Training compliance: 96.3%',
            'Performance rating: 4.7/5'
          ]
        };
        break;
      case 'medications':
        fetchedData = {
          category: 'Medication Library',
          data: aeMedicationLibrary,
          insights: [
            'Total medications: 847',
            'AE-branded formulations: 100%',
            'Interaction alerts: 12 active',
            'Dosage accuracy: 99.8%'
          ]
        };
        break;
      case 'training':
        fetchedData = {
          category: 'Training Modules',
          data: aeTrainingModules,
          insights: [
            'Completion rate: 94.2%',
            'Overdue modules: 15',
            'Average score: 87.3%',
            'Certification rate: 98.1%'
          ]
        };
        break;
      default:
        fetchedData = {
          category: categoryId,
          data: [],
          insights: ['Data fetched successfully']
        };
    }

    onDataFetch(fetchedData);
    setIsScanning(false);
  }, [onDataFetch]);

  return (
    <HolographicInterface isActive={isScanning}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="w-5 h-5 text-primary" />
          Interactive Data Access
          {isScanning && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <RefreshCw className="w-4 h-4 text-primary" />
            </motion.div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {dataCategories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => handleDataFetch(category.id)}
              disabled={isScanning}
              className={`p-4 rounded-lg border transition-all duration-200 text-left ${
                lastScan === category.id
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50 hover:bg-primary/5'
              } ${isScanning ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              whileHover={{ scale: isScanning ? 1 : 1.02 }}
              whileTap={{ scale: isScanning ? 1 : 0.98 }}
            >
              <div className="flex items-center gap-3">
                <category.icon className="w-5 h-5 text-primary" />
                <div className="flex-1">
                  <div className="font-medium text-sm">{category.label}</div>
                  <div className="text-xs text-muted-foreground">{category.count} records</div>
                </div>
                {isScanning && lastScan === category.id && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Scan className="w-4 h-4 text-primary" />
                  </motion.div>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        {lastScan && !isScanning && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg"
          >
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Data scan complete</span>
            </div>
          </motion.div>
        )}
      </CardContent>
    </HolographicInterface>
  );
}

// 3D Analytics Visualization Component
function Analytics3DVisualization() {
  const [activeView, setActiveView] = useState('performance');
  const [isRotating, setIsRotating] = useState(true);

  const analyticsViews = {
    performance: {
      title: 'Performance Analytics',
      icon: TrendingUp,
      data: [
        { metric: 'Overall Quality Score', value: 97.8, trend: '+2.3%', status: 'excellent' },
        { metric: 'Compliance Rating', value: 99.2, trend: '+0.8%', status: 'excellent' },
        { metric: 'Client Satisfaction', value: 98.4, trend: '+1.2%', status: 'excellent' },
        { metric: 'Staff Performance', value: 95.7, trend: '+3.1%', status: 'good' }
      ]
    },
    risks: {
      title: 'Risk Assessment',
      icon: AlertTriangle,
      data: [
        { metric: 'High Risk Clients', value: 12, trend: '-2', status: 'warning' },
        { metric: 'Incident Rate', value: 0.12, trend: '-0.05%', status: 'good' },
        { metric: 'Safety Compliance', value: 99.8, trend: '+0.3%', status: 'excellent' },
        { metric: 'Risk Mitigation', value: 94.6, trend: '+5.2%', status: 'good' }
      ]
    },
    efficiency: {
      title: 'Operational Efficiency',
      icon: Zap,
      data: [
        { metric: 'Process Efficiency', value: 96.3, trend: '+2.7%', status: 'excellent' },
        { metric: 'Resource Utilization', value: 92.8, trend: '+1.4%', status: 'good' },
        { metric: 'Time Management', value: 94.1, trend: '+3.8%', status: 'good' },
        { metric: 'Cost Effectiveness', value: 97.5, trend: '+1.9%', status: 'excellent' }
      ]
    }
  };

  return (
    <HolographicInterface isActive={isRotating}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          3D Analytics Hub
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsRotating(!isRotating)}
            className="ml-auto"
          >
            {isRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* View Selector */}
          <div className="flex gap-2">
            {Object.entries(analyticsViews).map(([key, view]) => (
              <Button
                key={key}
                size="sm"
                variant={activeView === key ? "default" : "outline"}
                onClick={() => setActiveView(key)}
                className="flex items-center gap-2"
              >
                <view.icon className="w-4 h-4" />
                {view.title}
              </Button>
            ))}
          </div>

          {/* 3D Visualization Area */}
          <motion.div
            className="relative h-64 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg border border-primary/20 overflow-hidden"
            animate={{
              background: isRotating
                ? [
                    'linear-gradient(45deg, rgba(212, 175, 55, 0.05), rgba(212, 175, 55, 0.1))',
                    'linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(212, 175, 55, 0.05))',
                    'linear-gradient(225deg, rgba(212, 175, 55, 0.05), rgba(212, 175, 55, 0.1))',
                    'linear-gradient(315deg, rgba(212, 175, 55, 0.1), rgba(212, 175, 55, 0.05))'
                  ]
                : 'linear-gradient(45deg, rgba(212, 175, 55, 0.05), rgba(212, 175, 55, 0.1))'
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            {/* 3D Grid Effect */}
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-full h-px bg-primary/20"
                  style={{ top: `${(i + 1) * 12.5}%` }}
                  animate={{
                    opacity: isRotating ? [0.2, 0.6, 0.2] : 0.2,
                    scaleX: isRotating ? [0.8, 1.2, 0.8] : 1
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                />
              ))}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`v-${i}`}
                  className="absolute h-full w-px bg-primary/20"
                  style={{ left: `${(i + 1) * 12.5}%` }}
                  animate={{
                    opacity: isRotating ? [0.2, 0.6, 0.2] : 0.2,
                    scaleY: isRotating ? [0.8, 1.2, 0.8] : 1
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </div>

            {/* Data Visualization */}
            <div className="relative z-10 p-6 h-full flex items-center justify-center">
              <motion.div
                className="grid grid-cols-2 gap-4 w-full"
                animate={{
                  rotateY: isRotating ? [0, 360] : 0
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                {analyticsViews[activeView as keyof typeof analyticsViews].data.map((item, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-3 bg-card/80 rounded-lg border border-border/50"
                    animate={{
                      scale: isRotating ? [0.9, 1.1, 0.9] : 1,
                      y: isRotating ? [0, -5, 0] : 0
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                  >
                    <div className="text-sm font-medium">{item.metric}</div>
                    <div className={`text-lg font-bold ${
                      item.status === 'excellent' ? 'text-green-500' :
                      item.status === 'good' ? 'text-blue-500' :
                      'text-yellow-500'
                    }`}>
                      {typeof item.value === 'number' && item.value < 10 ? item.value.toFixed(2) : item.value}
                      {typeof item.value === 'number' && item.value >= 10 ? '%' : ''}
                    </div>
                    <div className="text-xs text-muted-foreground">{item.trend}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </CardContent>
    </HolographicInterface>
  );
}

// Main Quality AI Agent Component
export function QualityAIAgent({ selectedModel, onModelChange }: QualityAIAgentProps) {
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentResponse, setCurrentResponse] = useState("");
  const [fetchedData, setFetchedData] = useState<any>(null);
  const [activeView, setActiveView] = useState("overview");
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      type: "assistant",
      message: "🛡️ **AEGIS Quality AI Agent Online**\n\nGreetings. I am your Quality AI Agent, equipped with comprehensive access to all AEGIS systems. I can:\n\n✅ Monitor real-time compliance across all facilities\n✅ Analyze staff performance and training data\n✅ Predict and prevent quality incidents\n✅ Generate instant audit reports\n✅ Access complete client and medication records\n\nHow may I assist you with quality assurance today?",
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const toggleVoiceListening = useCallback(() => {
    if (isProcessing) return;
    
    if (!isVoiceActive) {
      setIsVoiceActive(true);
      setCurrentResponse("");
      
      // Simulate voice recognition
      setTimeout(() => {
        setIsVoiceActive(false);
        setIsProcessing(true);
        setCurrentResponse("Processing voice command...");
        
        setTimeout(() => {
          const responses = [
            "Voice command received. Initiating system-wide quality scan...",
            "Analyzing voice input. Accessing compliance databases...",
            "Voice recognition complete. Generating quality insights...",
            "Processing voice request. Cross-referencing all quality metrics..."
          ];
          
          setCurrentResponse(responses[Math.floor(Math.random() * responses.length)]);
          setIsProcessing(false);
        }, 2000);
      }, 3000);
    }
  }, [isVoiceActive, isProcessing]);

  const handleSendMessage = useCallback(() => {
    if (!inputMessage.trim() || isProcessing) return;
    
    const newMessage = {
      id: chatHistory.length + 1,
      type: "user" as const,
      message: inputMessage.trim(),
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatHistory(prev => [...prev, newMessage]);
    setIsProcessing(true);
    setInputMessage("");
    
    // Simulate advanced AI processing
    setTimeout(() => {
      const qualityResponses = [
        "🔍 **Quality Analysis Complete**\n\nI've analyzed your request across all AEGIS systems:\n\n📊 **Current Status:**\n• Overall Quality Score: 97.8% (+2.3% this month)\n• Compliance Rate: 99.2% across all facilities\n• 0 critical incidents in last 30 days\n\n🎯 **Recommendations:**\n• Continue excellence in Hazelbury House (98.9% quality)\n• Minor training refresh needed for 3 staff members\n• Medication audit due for AE-Metformin protocols\n\nShall I generate a detailed report or take specific action?",
        
        "🛡️ **Real-Time System Scan Initiated**\n\nAccessing all AEGIS quality databases...\n\n✅ **Compliance Check:**\n• CQC standards: 100% compliant\n• Staff certifications: 96.3% current\n• Safety protocols: All green\n• Client care plans: 100% up to date\n\n⚠️ **Attention Required:**\n• Michael Roberts AE: Manual Handling training overdue\n• Arthur Andrews AE: Medication review due tomorrow\n• Station House: Fire safety drill scheduled\n\nWould you like me to automatically schedule these items?",
        
        "🧠 **AI Predictive Analysis**\n\nBased on current data patterns, I predict:\n\n📈 **Quality Trends:**\n• 99.5% client satisfaction by month-end\n• 15% reduction in incident likelihood\n• Staff efficiency increase of 3.2%\n\n🎯 **Proactive Recommendations:**\n• Schedule proactive medication reviews for 12 clients\n• Implement new staff rotation pattern for optimal coverage\n• Deploy preventive maintenance for Room 12 hoist\n\nShall I implement these optimizations automatically?",
        
        "💡 **Advanced Quality Insights**\n\nI've cross-referenced your query with:\n• 1,247 client records\n• 120 staff profiles\n• 847 medication protocols\n• 156 quality metrics\n\n🏆 **Excellence Indicators:**\n• Zero medication errors this week\n• 98.4% client satisfaction (industry leading)\n• Staff retention rate: 94.7%\n• Regulatory compliance: Perfect record\n\nWhat specific quality aspect would you like me to investigate further?"
      ];
      
      const aiResponse = {
        id: chatHistory.length + 2,
        type: "assistant" as const,
        message: qualityResponses[Math.floor(Math.random() * qualityResponses.length)],
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      
      setChatHistory(prev => [...prev, aiResponse]);
      setIsProcessing(false);
    }, 2000 + Math.random() * 1000);
  }, [inputMessage, isProcessing, chatHistory.length]);

  const handleDataFetch = useCallback((data: any) => {
    setFetchedData(data);
    
    // Add fetched data to chat
    const dataMessage = {
      id: chatHistory.length + 1,
      type: "assistant" as const,
      message: `📊 **${data.category} Retrieved**\n\n✅ Successfully accessed ${data.data.length} records\n\n🔍 **Key Insights:**\n${data.insights.map((insight: string) => `• ${insight}`).join('\n')}\n\nData is now available for analysis. What would you like me to investigate?`,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatHistory(prev => [...prev, dataMessage]);
  }, [chatHistory.length]);

  // Navigation handler for system-wide navigation
  const handleNavigation = useCallback((gate: string, tab?: string) => {
    // In a real implementation, this would trigger navigation
    // For now, we'll simulate the action
    const navigationMessage = {
      id: chatHistory.length + 1,
      type: "assistant" as const,
      message: `🎯 **Navigation Request Processed**\n\n✅ Directing you to: ${gate}${tab ? ` → ${tab}` : ''}\n\n📱 In a live system, this would seamlessly navigate you to the requested section with full context preservation.`,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatHistory(prev => [...prev, navigationMessage]);
    
    // Log for demonstration
    console.log(`Navigating to: ${gate}${tab ? ` → ${tab}` : ''}`);
  }, [chatHistory.length]);

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
        <TabsList className="grid w-full grid-cols-5 bg-card/50 backdrop-blur-sm">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="search" className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            AI Search
          </TabsTrigger>
          <TabsTrigger value="command" className="flex items-center gap-2">
            <Command className="w-4 h-4" />
            Command Center
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            AI Chat
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Main Interface Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Voice Interface */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <VoiceInterface
            isListening={isVoiceActive}
            isProcessing={isProcessing}
            onToggleListening={toggleVoiceListening}
            currentResponse={currentResponse}
          />
        </motion.div>

        {/* Live System Monitor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <LiveSystemMonitor />
        </motion.div>

        {/* Interactive Data Fetcher */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <InteractiveDataFetcher onDataFetch={handleDataFetch} />
        </motion.div>
      </div>

      {/* Advanced Chat Interface */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <HolographicInterface isActive={isProcessing}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              JARVIS-like Command Interface
              <Select value={selectedModel} onValueChange={onModelChange}>
                <SelectTrigger className="w-40 ml-auto">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4o">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      GPT-4o
                    </div>
                  </SelectItem>
                  <SelectItem value="claude-3-sonnet">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      Claude 3 Sonnet
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Chat History */}
            <div className="h-96 overflow-y-auto mb-4 p-4 bg-muted/30 rounded-lg space-y-4 institutional-scroll">
              {chatHistory.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-lg ${
                    msg.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card border border-border shadow-sm'
                  }`}>
                    <div className="text-sm whitespace-pre-wrap">{msg.message}</div>
                    <div className="text-xs opacity-70 mt-2 flex items-center gap-2">
                      {msg.timestamp}
                      {msg.type === 'assistant' && (
                        <Badge variant="outline" className="text-xs px-1 py-0">
                          Quality AI
                        </Badge>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isProcessing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-card border border-border p-4 rounded-lg shadow-sm">
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Cpu className="w-5 h-5 text-primary" />
                      </motion.div>
                      <span className="text-sm">Quality AI is analyzing your request...</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Command Input */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask me anything about quality, compliance, staff, clients, or system status..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={isProcessing}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isProcessing || !inputMessage.trim()}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <div className="text-xs text-muted-foreground flex items-center justify-between">
                <span>Powered by {selectedModel} • Full AEGIS System Access</span>
                <span>{inputMessage.length} characters</span>
              </div>
            </div>
          </CardContent>
        </HolographicInterface>
      </motion.div>

      {/* 3D Analytics Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Analytics3DVisualization />
      </motion.div>

      {/* Fetched Data Display */}
      {fetchedData && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <HolographicInterface isActive={true}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5 text-primary" />
                Retrieved Data: {fetchedData.category}
                <Badge variant="outline" className="ml-auto">
                  {fetchedData.data.length} Records
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Insights */}
                <div className="grid grid-cols-2 gap-4">
                  {fetchedData.insights.map((insight: string, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-3 bg-primary/5 border border-primary/20 rounded-lg"
                    >
                      <div className="text-sm font-medium text-primary">{insight}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Sample Data Preview */}
                {fetchedData.data.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-medium">Sample Records:</h4>
                    <div className="grid gap-3 max-h-60 overflow-y-auto">
                      {fetchedData.data.slice(0, 3).map((item: any, index: number) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-3 bg-card border border-border rounded-lg"
                        >
                          <div className="font-medium text-sm">
                            {item.name || item.title || item.client || `Record ${index + 1}`}
                          </div>
                          {item.role && <div className="text-xs text-muted-foreground">Role: {item.role}</div>}
                          {item.status && <div className="text-xs text-muted-foreground">Status: {item.status}</div>}
                          {item.efficiency && <div className="text-xs text-muted-foreground">Efficiency: {item.efficiency}%</div>}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </HolographicInterface>
        </motion.div>
      )}
    </div>
  );
}