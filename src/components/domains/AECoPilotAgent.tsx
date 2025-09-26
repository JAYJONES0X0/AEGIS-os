import React, { useState, useEffect, useCallback } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { 
  Bot, Activity, TrendingUp, AlertCircle, CheckCircle, Clock, 
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

interface AECoPilotAgentProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
}

// AE Co-Pilot Conversation Templates
const CONVERSATION_TEMPLATES = [
  {
    category: "Healthcare Management",
    icon: Stethoscope,
    templates: [
      { title: "Medication Review", query: "Review all medications for high-risk clients and flag any interactions" },
      { title: "Care Plan Analysis", query: "Analyze care plans for compliance with CQC standards" },
      { title: "Clinical Risk Assessment", query: "Identify clients who need urgent clinical review" },
      { title: "Health Monitoring Report", query: "Generate daily health monitoring summary" }
    ]
  },
  {
    category: "Quality & Compliance",
    icon: Award,
    templates: [
      { title: "Compliance Audit", query: "Conduct a comprehensive compliance audit across all domains" },
      { title: "Quality Metrics", query: "Analyze quality metrics and identify improvement areas" },
      { title: "Incident Analysis", query: "Review recent incidents and suggest prevention strategies" },
      { title: "CQC Preparation", query: "Prepare comprehensive CQC inspection readiness report" }
    ]
  },
  {
    category: "Financial Operations",
    icon: Calculator,
    templates: [
      { title: "Budget Analysis", query: "Analyze current budget performance and forecast" },
      { title: "Cost Optimization", query: "Identify cost reduction opportunities across operations" },
      { title: "Revenue Analysis", query: "Review revenue streams and billing efficiency" },
      { title: "Financial Reporting", query: "Generate comprehensive financial dashboard" }
    ]
  },
  {
    category: "Workforce Management",
    icon: Users,
    templates: [
      { title: "Staff Scheduling", query: "Optimize staff rota for next month considering skills and availability" },
      { title: "Training Analysis", query: "Identify training needs and compliance gaps" },
      { title: "Performance Review", query: "Analyze staff performance metrics and trends" },
      { title: "Recruitment Planning", query: "Assess staffing needs and recruitment priorities" }
    ]
  },
  {
    category: "Operations & Efficiency",
    icon: Workflow,
    templates: [
      { title: "Process Optimization", query: "Analyze workflows and suggest efficiency improvements" },
      { title: "Resource Management", query: "Optimize resource allocation across all departments" },
      { title: "System Performance", query: "Review system performance and identify bottlenecks" },
      { title: "Automation Opportunities", query: "Identify processes suitable for automation" }
    ]
  }
];

// AI Assistant Capabilities
const AI_CAPABILITIES = [
  {
    category: "Data Analysis",
    icon: BarChart3,
    capabilities: [
      "Real-time data processing across all AEGIS modules",
      "Predictive analytics for client health outcomes",
      "Financial trend analysis and forecasting",
      "Staff performance pattern recognition",
      "Quality metrics correlation analysis"
    ]
  },
  {
    category: "Automated Tasks",
    icon: Zap,
    capabilities: [
      "Automated report generation",
      "Smart alert prioritization",
      "Compliance monitoring and alerts",
      "Document summarization and analysis",
      "Task scheduling and reminders"
    ]
  },
  {
    category: "Decision Support",
    icon: Target,
    capabilities: [
      "Clinical decision recommendations",
      "Resource allocation optimization",
      "Risk assessment and mitigation",
      "Policy compliance guidance",
      "Strategic planning assistance"
    ]
  },
  {
    category: "Communication",
    icon: MessageSquare,
    capabilities: [
      "Multi-language support",
      "Professional report writing",
      "Meeting summary generation",
      "Email drafting assistance",
      "Documentation creation"
    ]
  }
];

// Quick Action Commands
const QUICK_ACTIONS = [
  {
    category: "Emergency",
    icon: LifeBuoy,
    color: "text-red-500",
    actions: [
      { title: "Emergency Alert", command: "/emergency", description: "Trigger emergency response protocol" },
      { title: "Critical Incident", command: "/incident critical", description: "Report critical incident" },
      { title: "Medical Emergency", command: "/medical emergency", description: "Medical emergency response" },
      { title: "Fire Alert", command: "/fire", description: "Fire safety protocol activation" }
    ]
  },
  {
    category: "Daily Operations",
    icon: Calendar,
    color: "text-blue-500",
    actions: [
      { title: "Daily Briefing", command: "/briefing", description: "Generate daily operations briefing" },
      { title: "Staff Handover", command: "/handover", description: "Create staff handover notes" },
      { title: "Medication Round", command: "/medication round", description: "Medication administration reminder" },
      { title: "Quality Check", command: "/quality check", description: "Perform quality assessment" }
    ]
  },
  {
    category: "Reports & Analytics",
    icon: FileText,
    color: "text-green-500",
    actions: [
      { title: "Generate Report", command: "/report", description: "Create custom report" },
      { title: "Data Analysis", command: "/analyze", description: "Perform data analysis" },
      { title: "Trend Analysis", command: "/trends", description: "Analyze trends and patterns" },
      { title: "Performance Metrics", command: "/metrics", description: "Review performance indicators" }
    ]
  },
  {
    category: "Client Care",
    icon: Heart,
    color: "text-pink-500",
    actions: [
      { title: "Client Review", command: "/client review", description: "Comprehensive client assessment" },
      { title: "Care Plan Update", command: "/care plan", description: "Update care plan" },
      { title: "Risk Assessment", command: "/risk assessment", description: "Conduct risk evaluation" },
      { title: "Health Monitoring", command: "/health monitor", description: "Review health indicators" }
    ]
  }
];

// 3D Holographic Interface Component
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

// Main AE Co-Pilot Agent Component
export function AECoPilotAgent({ selectedModel, onModelChange }: AECoPilotAgentProps) {
  const [activeView, setActiveView] = useState("chat");
  const [inputMessage, setInputMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      type: "assistant" as const,
      message: "👋 **Welcome to AE Co-Pilot!**\n\nI'm your comprehensive AI assistant with full access to the entire AEGIS system. I can help with:\n\n🏥 **Healthcare Management** - Clinical decisions, care plans, medications\n📊 **Quality & Compliance** - Audits, CQC preparation, incident analysis\n💰 **Financial Operations** - Budget analysis, cost optimization, reporting\n👥 **Workforce Management** - Scheduling, training, performance analysis\n⚡ **Process Optimization** - Workflow improvements, automation\n\nHow can I assist you today?",
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const handleSendMessage = useCallback(async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: chatHistory.length + 1,
      type: "user" as const,
      message: inputMessage,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsProcessing(true);

    // Simulate AI processing
    setTimeout(() => {
      const aiResponse = {
        id: chatHistory.length + 2,
        type: "assistant" as const,
        message: `🤖 **Processing your request...**\n\n✅ I've analyzed your query: "${inputMessage}"\n\n📊 **Analysis Results:**\n• Accessed relevant AEGIS modules\n• Processed current system data\n• Applied best practice guidelines\n• Considered compliance requirements\n\n💡 **Recommendations:**\n• Detailed analysis complete\n• Actions identified and prioritized\n• Full report available on request\n\nWould you like me to provide more specific details or take any actions?`,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };

      setChatHistory(prev => [...prev, aiResponse]);
      setIsProcessing(false);
    }, 2000);
  }, [inputMessage, chatHistory.length]);

  const handleTemplateSelect = (template: any) => {
    setInputMessage(template.query);
    setSelectedTemplate(template.title);
  };

  const handleQuickAction = (action: any) => {
    const message = `${action.command} - ${action.description}`;
    setInputMessage(message);
  };

  const toggleVoice = () => {
    setIsListening(!isListening);
  };

  return (
    <div className="space-y-6">
      {/* Header with Bot Logo */}
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
            <Bot className="w-12 h-12 text-primary drop-shadow-lg" />
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
              AE Co-Pilot
            </h1>
            <p className="text-muted-foreground">
              General AI Assistant • Full System Access • Advanced Decision Support
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="animate-pulse bg-green-500/10 border-green-500/30 text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
            ONLINE
          </Badge>
          <Badge variant="outline" className="bg-blue-500/10 border-blue-500/30 text-blue-500">
            {selectedModel}
          </Badge>
        </div>
      </motion.div>

      {/* Control Tabs */}
      <Tabs value={activeView} onValueChange={setActiveView} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-card/50 backdrop-blur-sm">
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            AI Chat
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="actions" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Quick Actions
          </TabsTrigger>
          <TabsTrigger value="capabilities" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Capabilities
          </TabsTrigger>
        </TabsList>

        {/* AI Chat Tab */}
        <TabsContent value="chat" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chat Interface */}
            <div className="lg:col-span-2">
              <HolographicInterface isActive={true}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    AI Conversation
                    {isProcessing && (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Cpu className="w-4 h-4 text-primary" />
                      </motion.div>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Chat History */}
                    <div className="h-96 overflow-y-auto space-y-4 institutional-scroll">
                      {chatHistory.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] p-4 rounded-lg ${
                              message.type === 'user'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted/50 border border-border/50'
                            }`}
                          >
                            <div className="text-sm whitespace-pre-wrap">{message.message}</div>
                            <div className="text-xs opacity-70 mt-2">{message.timestamp}</div>
                          </div>
                        </div>
                      ))}
                      {isProcessing && (
                        <div className="flex justify-start">
                          <div className="bg-muted/50 border border-border/50 p-4 rounded-lg">
                            <div className="flex items-center gap-2">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              >
                                <Cpu className="w-4 h-4 text-primary" />
                              </motion.div>
                              <span className="text-sm">Processing...</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Input Area */}
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <div className="flex-1 relative">
                          <Textarea
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Ask me anything about AEGIS operations..."
                            className="min-h-[80px] pr-12"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && e.ctrlKey) {
                                handleSendMessage();
                              }
                            }}
                          />
                          <Button
                            size="sm"
                            variant={isListening ? "default" : "outline"}
                            onClick={toggleVoice}
                            className="absolute right-2 bottom-2"
                          >
                            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                          </Button>
                        </div>
                        <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isProcessing}>
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Code className="w-3 h-3" />
                        Ctrl+Enter to send • Voice input available
                      </div>
                    </div>
                  </div>
                </CardContent>
              </HolographicInterface>
            </div>

            {/* System Status */}
            <HolographicInterface isActive={true}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">AI Processing Power</span>
                      <Badge variant="outline" className="bg-green-500/10 text-green-600">
                        98.7%
                      </Badge>
                    </div>
                    <Progress value={98.7} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">System Integration</span>
                      <Badge variant="outline" className="bg-green-500/10 text-green-600">
                        100%
                      </Badge>
                    </div>
                    <Progress value={100} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Response Time</span>
                      <Badge variant="outline" className="bg-green-500/10 text-green-600">
                        &lt;0.3s
                      </Badge>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>

                  <div className="space-y-3 pt-4 border-t border-border/30">
                    <h4 className="font-medium">Active Connections</h4>
                    {[
                      { name: "Healthcare Module", status: "online" },
                      { name: "Quality Intelligence", status: "online" },
                      { name: "Finance Operations", status: "online" },
                      { name: "Workforce Management", status: "online" },
                      { name: "External APIs", status: "online" }
                    ].map((connection, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{connection.name}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <span className="text-xs text-green-600">Online</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </HolographicInterface>
          </div>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {CONVERSATION_TEMPLATES.map((category, categoryIndex) => (
              <HolographicInterface key={categoryIndex} isActive={true}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <category.icon className="w-5 h-5 text-primary" />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.templates.map((template, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleTemplateSelect(template)}
                        className="w-full p-3 text-left bg-muted/30 hover:bg-primary/10 border border-border/50 hover:border-primary/30 rounded-lg transition-all duration-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="font-medium text-sm mb-1">{template.title}</div>
                        <div className="text-xs text-muted-foreground">{template.query}</div>
                      </motion.button>
                    ))}
                  </div>
                </CardContent>
              </HolographicInterface>
            ))}
          </div>
        </TabsContent>

        {/* Quick Actions Tab */}
        <TabsContent value="actions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {QUICK_ACTIONS.map((category, categoryIndex) => (
              <HolographicInterface key={categoryIndex} isActive={true}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <category.icon className={`w-5 h-5 ${category.color}`} />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.actions.map((action, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleQuickAction(action)}
                        className="w-full p-4 text-left bg-muted/30 hover:bg-primary/10 border border-border/50 hover:border-primary/30 rounded-lg transition-all duration-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-start gap-3">
                          <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                            {action.command}
                          </code>
                          <div className="flex-1">
                            <div className="font-medium text-sm">{action.title}</div>
                            <div className="text-xs text-muted-foreground mt-1">{action.description}</div>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </CardContent>
              </HolographicInterface>
            ))}
          </div>
        </TabsContent>

        {/* Capabilities Tab */}
        <TabsContent value="capabilities" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {AI_CAPABILITIES.map((capability, index) => (
              <HolographicInterface key={index} isActive={true}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <capability.icon className="w-5 h-5 text-primary" />
                    {capability.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {capability.capabilities.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start gap-3 p-3 bg-muted/20 rounded-lg">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
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