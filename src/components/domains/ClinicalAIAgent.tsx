import React, { useState, useEffect, useCallback } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { 
  Stethoscope, Activity, TrendingUp, AlertCircle, CheckCircle, Clock, 
  Users, FileText, BarChart3, Zap, Eye, Search, Filter, Download,
  Settings, RefreshCw, Play, Pause, Cpu, Database, Wifi, Globe,
  Target, Award, Heart, Brain, Layers, Command, Scan, MessageSquare,
  Send, ArrowRight, ChevronDown, ChevronUp, Star, ThumbsUp, AlertTriangle,
  Calendar, MapPin, Phone, Mail, User, Building, Clipboard, Monitor,
  Plus, Minus, RotateCcw, Maximize2, Minimize2, X, Volume2, VolumeX,
  Mic, MicOff, Camera, Video, Share, Lock, Unlock, Save, Navigation,
  Home, Calculator, LifeBuoy, Headphones, Bell, BookOpen,
  Archive, FolderOpen, ShoppingCart, Truck, Wrench, PieChart, LineChart,
  BarChart, GitBranch, Workflow, Briefcase, GraduationCap, CreditCard,
  DollarSign, Receipt, Package, Warehouse, Shield as ShieldCheck,
  UserCheck, UserX, UserPlus, Key, Code, Terminal, Bug, HelpCircle,
  Info, ExternalLink, Link, Copy, Edit, Trash2, MoreHorizontal,
  Pill, Siren, Thermometer, Gauge, Timer, FlaskConical, Microscope,
  HeartPulse, BrainCircuit, Wind, Bone, Bandage, Scissors
} from "lucide-react";
import { motion } from "motion/react";
import { mockStaffProfiles, mockClientProfiles, aeMedicationLibrary, aeTrainingModules } from "../../lib/expanded-mock-data";

interface ClinicalAIAgentProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
}

// Clinical Assessment Tools
const CLINICAL_TOOLS = [
  {
    category: "Patient Assessment",
    icon: Stethoscope,
    tools: [
      { name: "Vital Signs Analyzer", description: "Analyze vital signs patterns and trends", action: "vital_analysis", urgency: "routine" },
      { name: "Risk Stratification", description: "Assess patient clinical risk levels", action: "risk_assessment", urgency: "high" },
      { name: "Symptom Tracker", description: "Track and analyze patient symptoms", action: "symptom_tracking", urgency: "routine" },
      { name: "Clinical Decision Support", description: "Evidence-based clinical recommendations", action: "clinical_support", urgency: "high" }
    ]
  },
  {
    category: "Medication Management",
    icon: Pill,
    tools: [
      { name: "Drug Interaction Checker", description: "Check for medication interactions", action: "drug_interactions", urgency: "critical" },
      { name: "Dosage Calculator", description: "Calculate appropriate medication dosages", action: "dosage_calc", urgency: "high" },
      { name: "Allergy Screener", description: "Screen for medication allergies", action: "allergy_screen", urgency: "critical" },
      { name: "Medication Review", description: "Comprehensive medication review", action: "med_review", urgency: "routine" }
    ]
  },
  {
    category: "Diagnostic Support",
    icon: Microscope,
    tools: [
      { name: "Differential Diagnosis", description: "Generate differential diagnosis suggestions", action: "differential_dx", urgency: "high" },
      { name: "Lab Result Interpreter", description: "Interpret laboratory results", action: "lab_interpretation", urgency: "routine" },
      { name: "Imaging Analysis", description: "Analyze diagnostic imaging", action: "imaging_analysis", urgency: "high" },
      { name: "Clinical Guidelines", description: "Access evidence-based guidelines", action: "guidelines", urgency: "routine" }
    ]
  },
  {
    category: "Care Planning",
    icon: Clipboard,
    tools: [
      { name: "Care Plan Generator", description: "Generate comprehensive care plans", action: "care_planning", urgency: "routine" },
      { name: "Treatment Optimizer", description: "Optimize treatment protocols", action: "treatment_optimization", urgency: "high" },
      { name: "Discharge Planner", description: "Plan safe patient discharge", action: "discharge_planning", urgency: "routine" },
      { name: "Follow-up Scheduler", description: "Schedule appropriate follow-ups", action: "followup_scheduling", urgency: "routine" }
    ]
  }
];

// Clinical Alerts and Monitoring
const CLINICAL_ALERTS = [
  {
    id: 1,
    type: "Critical",
    patient: "Sarah Mitchell",
    alert: "Blood pressure critically elevated (190/110)",
    time: "2 min ago",
    action: "Immediate clinical review required",
    severity: "critical",
    icon: Siren
  },
  {
    id: 2,
    type: "Drug Interaction",
    patient: "James Wilson",
    alert: "Potential interaction: Warfarin + Aspirin",
    time: "15 min ago",
    action: "Review medication regimen",
    severity: "high",
    icon: Pill
  },
  {
    id: 3,
    type: "Vital Signs",
    patient: "Mary Johnson",
    alert: "Temperature spike detected (38.9°C)",
    time: "23 min ago",
    action: "Monitor and assess for infection",
    severity: "medium",
    icon: Thermometer
  },
  {
    id: 4,
    type: "Laboratory",
    patient: "Robert Chen",
    alert: "INR value outside therapeutic range",
    time: "1 hour ago",
    action: "Adjust anticoagulation therapy",
    severity: "high",
    icon: FlaskConical
  },
  {
    id: 5,
    type: "Care Plan",
    patient: "Emma Thompson",
    alert: "Care plan review due",
    time: "2 hours ago",
    action: "Schedule care plan review",
    severity: "low",
    icon: Clipboard
  }
];

// Clinical Decision Support
const CLINICAL_PROTOCOLS = [
  {
    category: "Emergency Protocols",
    icon: Siren,
    protocols: [
      { name: "Cardiac Arrest", steps: "CPR → AED → Emergency Services", priority: "critical" },
      { name: "Anaphylaxis", steps: "Adrenaline → Position → Emergency Services", priority: "critical" },
      { name: "Seizure Management", steps: "Safety → Recovery Position → Monitor", priority: "high" },
      { name: "Hypoglycemia", steps: "Glucose → Monitor → Medical Review", priority: "high" }
    ]
  },
  {
    category: "Medication Protocols",
    icon: Pill,
    protocols: [
      { name: "Pain Management", steps: "Assessment → WHO Ladder → Review", priority: "routine" },
      { name: "Anticoagulation", steps: "Risk Assessment → INR Monitoring → Adjustment", priority: "high" },
      { name: "Diabetes Management", steps: "BG Monitoring → Insulin Adjustment → HbA1c", priority: "routine" },
      { name: "Infection Control", steps: "Culture → Antibiotic Selection → Duration", priority: "high" }
    ]
  },
  {
    category: "Monitoring Protocols",
    icon: Activity,
    protocols: [
      { name: "Post-Operative", steps: "Vitals → Pain → Mobility → Complications", priority: "high" },
      { name: "Chronic Disease", steps: "Symptoms → Compliance → Lifestyle → Goals", priority: "routine" },
      { name: "Mental Health", steps: "Assessment → Risk → Support → Review", priority: "high" },
      { name: "Wound Care", steps: "Assessment → Cleaning → Dressing → Healing", priority: "routine" }
    ]
  }
];

// Quick Clinical Commands
const CLINICAL_COMMANDS = [
  {
    category: "Emergency",
    icon: Siren,
    commands: [
      { command: "/emergency", description: "Activate emergency protocol", color: "text-red-500" },
      { command: "/cardiac", description: "Cardiac emergency response", color: "text-red-600" },
      { command: "/anaphylaxis", description: "Anaphylaxis protocol", color: "text-red-500" },
      { command: "/code blue", description: "Medical emergency alert", color: "text-red-700" }
    ]
  },
  {
    category: "Assessment",
    icon: Stethoscope,
    commands: [
      { command: "/vitals", description: "Check vital signs status", color: "text-blue-500" },
      { command: "/assess", description: "Comprehensive assessment", color: "text-blue-600" },
      { command: "/risk", description: "Clinical risk assessment", color: "text-orange-500" },
      { command: "/pain", description: "Pain assessment", color: "text-purple-500" }
    ]
  },
  {
    category: "Medications",
    icon: Pill,
    commands: [
      { command: "/meds", description: "Medication review", color: "text-green-500" },
      { command: "/interactions", description: "Check drug interactions", color: "text-yellow-500" },
      { command: "/allergies", description: "Review allergies", color: "text-red-400" },
      { command: "/dosage", description: "Calculate dosage", color: "text-cyan-500" }
    ]
  },
  {
    category: "Documentation",
    icon: FileText,
    commands: [
      { command: "/notes", description: "Clinical notes summary", color: "text-indigo-500" },
      { command: "/plan", description: "Update care plan", color: "text-teal-500" },
      { command: "/report", description: "Generate clinical report", color: "text-violet-500" },
      { command: "/handover", description: "Handover notes", color: "text-pink-500" }
    ]
  }
];

// Patient Monitoring Dashboard
const PATIENT_MONITORING = [
  {
    id: "PM001",
    name: "Sarah Mitchell",
    condition: "Hypertension",
    status: "Critical",
    vitals: { bp: "190/110", hr: "88", temp: "37.2", spo2: "96%" },
    lastUpdate: "2 min ago",
    alerts: 3
  },
  {
    id: "PM002", 
    name: "James Wilson",
    condition: "Post-operative",
    status: "Stable",
    vitals: { bp: "135/85", hr: "72", temp: "36.8", spo2: "98%" },
    lastUpdate: "15 min ago",
    alerts: 1
  },
  {
    id: "PM003",
    name: "Mary Johnson", 
    condition: "Diabetes",
    status: "Monitoring",
    vitals: { bp: "128/78", hr: "76", temp: "38.9", spo2: "97%" },
    lastUpdate: "23 min ago",
    alerts: 2
  },
  {
    id: "PM004",
    name: "Robert Chen",
    condition: "Anticoagulation",
    status: "Stable",
    vitals: { bp: "142/82", hr: "68", temp: "36.9", spo2: "99%" },
    lastUpdate: "1 hour ago",
    alerts: 1
  }
];

// 3D Holographic Interface Component
function HolographicInterface({ isActive, children }: { isActive: boolean; children: React.ReactNode }) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-lg border ${
        isActive ? 'border-blue-500/50 bg-blue-500/5' : 'border-border/30 bg-card/50'
      }`}
      animate={{
        boxShadow: isActive 
          ? [
              '0 0 20px rgba(59, 130, 246, 0.3)',
              '0 0 40px rgba(59, 130, 246, 0.5)',
              '0 0 20px rgba(59, 130, 246, 0.3)'
            ]
          : '0 0 0px rgba(59, 130, 246, 0)'
      }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Medical scanlines */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="h-full w-full"
          style={{
            background: 'linear-gradient(90deg, transparent 98%, rgba(59, 130, 246, 0.1) 100%)',
            backgroundSize: '30px 100%'
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 0%']
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

// Main Clinical AI Agent Component
export function ClinicalAIAgent({ selectedModel, onModelChange }: ClinicalAIAgentProps) {
  const [activeView, setActiveView] = useState("monitoring");
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

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-500 bg-red-500/10 border-red-500/30';
      case 'high': return 'text-orange-500 bg-orange-500/10 border-orange-500/30';
      case 'medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30';
      case 'low': return 'text-blue-500 bg-blue-500/10 border-blue-500/30';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Critical': return 'text-red-500 bg-red-500/10';
      case 'Monitoring': return 'text-orange-500 bg-orange-500/10';
      case 'Stable': return 'text-green-500 bg-green-500/10';
      default: return 'text-blue-500 bg-blue-500/10';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Stethoscope Logo */}
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
              rotate: [0, 3, -3, 0]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Stethoscope className="w-12 h-12 text-blue-500 drop-shadow-lg" />
            <motion.div
              className="absolute inset-0"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(59, 130, 246, 0.3)',
                  '0 0 40px rgba(59, 130, 246, 0.6)',
                  '0 0 20px rgba(59, 130, 246, 0.3)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold text-blue-500 tracking-tight">
              Clinical AI Agent
            </h1>
            <p className="text-muted-foreground">
              Healthcare AI Specialist • Clinical Decision Support • Patient Safety • Evidence-Based Care
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="animate-pulse bg-blue-500/10 border-blue-500/30 text-blue-600">
            <HeartPulse className="w-3 h-3 mr-1" />
            MONITORING
          </Badge>
          <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-600">
            Clinical AI v4.1
          </Badge>
        </div>
      </motion.div>

      {/* Control Tabs */}
      <Tabs value={activeView} onValueChange={setActiveView} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-card/50 backdrop-blur-sm">
          <TabsTrigger value="monitoring" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Patient Monitor
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Clinical Alerts
          </TabsTrigger>
          <TabsTrigger value="tools" className="flex items-center gap-2">
            <Stethoscope className="w-4 h-4" />
            Clinical Tools
          </TabsTrigger>
          <TabsTrigger value="protocols" className="flex items-center gap-2">
            <Clipboard className="w-4 h-4" />
            Protocols
          </TabsTrigger>
          <TabsTrigger value="commands" className="flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            Commands
          </TabsTrigger>
        </TabsList>

        {/* Patient Monitoring Tab */}
        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {PATIENT_MONITORING.map((patient, index) => (
              <HolographicInterface key={index} isActive={true}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-sm">{patient.name}</CardTitle>
                      <div className="text-xs text-muted-foreground">{patient.id}</div>
                    </div>
                    <Badge className={getStatusColor(patient.status)}>
                      {patient.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-xs text-muted-foreground">{patient.condition}</div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex justify-between">
                        <span>BP:</span>
                        <span className="font-mono">{patient.vitals.bp}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>HR:</span>
                        <span className="font-mono">{patient.vitals.hr}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Temp:</span>
                        <span className="font-mono">{patient.vitals.temp}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>SpO2:</span>
                        <span className="font-mono">{patient.vitals.spo2}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-border/30">
                      <span className="text-xs text-muted-foreground">{patient.lastUpdate}</span>
                      {patient.alerts > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {patient.alerts} alerts
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </HolographicInterface>
            ))}
          </div>

          {/* Quick Clinical Actions */}
          <HolographicInterface isActive={true}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-500" />
                Quick Clinical Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {[
                  { icon: HeartPulse, label: "Vital Signs", color: "text-red-500" },
                  { icon: Pill, label: "Medications", color: "text-green-500" },
                  { icon: Thermometer, label: "Temperature", color: "text-orange-500" },
                  { icon: Activity, label: "ECG Monitor", color: "text-blue-500" },
                  { icon: FlaskConical, label: "Lab Results", color: "text-purple-500" },
                  { icon: Clipboard, label: "Care Plans", color: "text-cyan-500" },
                  { icon: Siren, label: "Emergency", color: "text-red-600" },
                  { icon: Microscope, label: "Diagnostics", color: "text-indigo-500" },
                  { icon: Bandage, label: "Wound Care", color: "text-pink-500" },
                  { icon: BrainCircuit, label: "Neurology", color: "text-violet-500" },
                  { icon: Wind, label: "Respiratory", color: "text-teal-500" },
                  { icon: Bone, label: "Orthopedic", color: "text-amber-500" }
                ].map((action, index) => (
                  <motion.button
                    key={index}
                    className={`p-4 border border-border/50 hover:border-blue-500/30 rounded-lg transition-all duration-200 flex flex-col items-center gap-2 hover:bg-blue-500/5`}
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

        {/* Clinical Alerts Tab */}
        <TabsContent value="alerts" className="space-y-6">
          <HolographicInterface isActive={true}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-blue-500" />
                Active Clinical Alerts
                <Badge variant="destructive" className="ml-auto">
                  {CLINICAL_ALERTS.length} Active
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {CLINICAL_ALERTS.map((alert) => (
                  <motion.div
                    key={alert.id}
                    className={`p-4 border rounded-lg transition-all duration-200 ${getAlertColor(alert.severity)}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: alert.id * 0.1 }}
                  >
                    <div className="flex items-start gap-4">
                      <alert.icon className="w-5 h-5 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium text-sm">{alert.patient}</div>
                          <div className="text-xs">{alert.time}</div>
                        </div>
                        <div className="text-sm mb-2">{alert.alert}</div>
                        <div className="text-xs text-muted-foreground">{alert.action}</div>
                      </div>
                      <Badge variant={alert.severity === 'critical' ? 'destructive' : 'default'}>
                        {alert.type}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </HolographicInterface>
        </TabsContent>

        {/* Clinical Tools Tab */}
        <TabsContent value="tools" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {CLINICAL_TOOLS.map((category, categoryIndex) => (
              <HolographicInterface key={categoryIndex} isActive={true}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <category.icon className="w-5 h-5 text-blue-500" />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.tools.map((tool, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleToolSelect(tool)}
                        className={`w-full p-4 text-left border border-border/50 hover:border-blue-500/30 rounded-lg transition-all duration-200 ${
                          selectedTool === tool.name ? 'bg-blue-500/10 border-blue-500/50' : 'bg-muted/20 hover:bg-blue-500/5'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            tool.urgency === 'critical' ? 'bg-red-500' :
                            tool.urgency === 'high' ? 'bg-orange-500' :
                            'bg-green-500'
                          }`} />
                          <div className="flex-1">
                            <div className="font-medium text-sm flex items-center gap-2">
                              {tool.name}
                              <Badge variant="outline" className="text-xs">
                                {tool.urgency}
                              </Badge>
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">{tool.description}</div>
                          </div>
                          {isProcessing && selectedTool === tool.name && (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                              <Cpu className="w-4 h-4 text-blue-500" />
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

        {/* Protocols Tab */}
        <TabsContent value="protocols" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {CLINICAL_PROTOCOLS.map((category, categoryIndex) => (
              <HolographicInterface key={categoryIndex} isActive={true}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <category.icon className="w-5 h-5 text-blue-500" />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.protocols.map((protocol, index) => (
                      <motion.div
                        key={index}
                        className="p-3 bg-muted/30 hover:bg-blue-500/10 border border-border/50 hover:border-blue-500/30 rounded-lg transition-all duration-200 cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            protocol.priority === 'critical' ? 'bg-red-500' :
                            protocol.priority === 'high' ? 'bg-orange-500' :
                            'bg-green-500'
                          }`} />
                          <div className="flex-1">
                            <div className="font-medium text-sm">{protocol.name}</div>
                            <div className="text-xs text-muted-foreground mt-1">{protocol.steps}</div>
                          </div>
                        </div>
                      </motion.div>
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
            {CLINICAL_COMMANDS.map((category, categoryIndex) => (
              <HolographicInterface key={categoryIndex} isActive={true}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <category.icon className="w-5 h-5 text-blue-500" />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.commands.map((command, index) => (
                      <motion.button
                        key={index}
                        className="w-full p-3 text-left bg-muted/30 hover:bg-blue-500/10 border border-border/50 hover:border-blue-500/30 rounded-lg transition-all duration-200"
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