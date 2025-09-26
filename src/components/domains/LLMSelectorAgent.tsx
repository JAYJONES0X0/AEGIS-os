import React, { useState, useEffect, useCallback } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { 
  Settings, Activity, TrendingUp, AlertCircle, CheckCircle, Clock, 
  Users, FileText, BarChart3, Zap, Eye, Search, Filter, Download,
  RefreshCw, Play, Pause, Cpu, Database, Wifi, Globe,
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
  Gauge, TestTube, Lightbulb, Sparkles, Rocket, FlaskConical
} from "lucide-react";
import { motion } from "motion/react";

interface LLMSelectorAgentProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
}

// Available AI Models
const AI_MODELS = [
  {
    id: "gpt-4-turbo",
    name: "GPT-4 Turbo",
    provider: "OpenAI",
    version: "1106-preview",
    description: "Most capable model for complex reasoning and analysis",
    strengths: ["Complex reasoning", "Code generation", "Analysis"],
    pricing: "$0.01/1K tokens",
    contextWindow: "128K tokens",
    latency: "~2.5s",
    accuracy: 94,
    speed: 78,
    cost: 85,
    status: "active",
    specialty: ["Healthcare", "Finance", "General"]
  },
  {
    id: "claude-3-opus",
    name: "Claude 3 Opus",
    provider: "Anthropic",
    version: "3.0",
    description: "Exceptional performance for complex tasks and careful reasoning",
    strengths: ["Safety", "Nuanced responses", "Long context"],
    pricing: "$0.015/1K tokens",
    contextWindow: "200K tokens",
    latency: "~3.2s",
    accuracy: 96,
    speed: 72,
    cost: 70,
    status: "active",
    specialty: ["Quality", "Compliance", "Clinical"]
  },
  {
    id: "claude-3-sonnet",
    name: "Claude 3 Sonnet",
    provider: "Anthropic", 
    version: "3.0",
    description: "Balanced performance and speed for most tasks",
    strengths: ["Balance", "Reliability", "Efficiency"],
    pricing: "$0.003/1K tokens",
    contextWindow: "200K tokens",
    latency: "~1.8s",
    accuracy: 91,
    speed: 88,
    cost: 92,
    status: "active",
    specialty: ["Workforce", "Operations", "General"]
  },
  {
    id: "gpt-4",
    name: "GPT-4",
    provider: "OpenAI",
    version: "0613",
    description: "Reliable performance for complex tasks",
    strengths: ["Reasoning", "Creativity", "Code"],
    pricing: "$0.03/1K tokens",
    contextWindow: "8K tokens",
    latency: "~3.8s",
    accuracy: 92,
    speed: 65,
    cost: 60,
    status: "active",
    specialty: ["Finance", "Analysis", "Reports"]
  },
  {
    id: "gemini-pro",
    name: "Gemini Pro",
    provider: "Google",
    version: "1.0",
    description: "Multimodal capabilities with strong reasoning",
    strengths: ["Multimodal", "Speed", "Integration"],
    pricing: "$0.0005/1K tokens",
    contextWindow: "32K tokens", 
    latency: "~1.2s",
    accuracy: 89,
    speed: 95,
    cost: 98,
    status: "active",
    specialty: ["Search", "Analysis", "Automation"]
  },
  {
    id: "llama-2-70b",
    name: "Llama 2 70B",
    provider: "Meta",
    version: "Chat",
    description: "Open-source model with strong performance",
    strengths: ["Open source", "Cost effective", "Privacy"],
    pricing: "$0.0007/1K tokens",
    contextWindow: "4K tokens",
    latency: "~2.1s", 
    accuracy: 87,
    speed: 82,
    cost: 95,
    status: "active",
    specialty: ["General", "Research", "Development"]
  }
];

// Model Performance Categories
const PERFORMANCE_CATEGORIES = [
  {
    name: "Healthcare Tasks",
    icon: Stethoscope,
    models: [
      { id: "claude-3-opus", score: 96, reason: "Exceptional safety and clinical reasoning" },
      { id: "gpt-4-turbo", score: 94, reason: "Complex medical analysis capabilities" },
      { id: "claude-3-sonnet", score: 91, reason: "Reliable clinical documentation" },
      { id: "gpt-4", score: 89, reason: "Strong medical knowledge base" }
    ]
  },
  {
    name: "Financial Analysis", 
    icon: Calculator,
    models: [
      { id: "gpt-4-turbo", score: 95, reason: "Advanced mathematical reasoning" },
      { id: "claude-3-opus", score: 93, reason: "Careful financial calculations" },
      { id: "gpt-4", score: 91, reason: "Strong analytical capabilities" },
      { id: "claude-3-sonnet", score: 88, reason: "Efficient financial reports" }
    ]
  },
  {
    name: "Quality & Compliance",
    icon: Award,
    models: [
      { id: "claude-3-opus", score: 98, reason: "Exceptional attention to safety and compliance" },
      { id: "claude-3-sonnet", score: 92, reason: "Reliable compliance monitoring" },
      { id: "gpt-4-turbo", score: 90, reason: "Comprehensive quality analysis" },
      { id: "gpt-4", score: 87, reason: "Detailed compliance reporting" }
    ]
  },
  {
    name: "Workforce Management",
    icon: Users,
    models: [
      { id: "claude-3-sonnet", score: 94, reason: "Balanced people management approach" },
      { id: "gpt-4-turbo", score: 92, reason: "Complex scheduling optimization" },
      { id: "gemini-pro", score: 89, reason: "Fast HR data processing" },
      { id: "claude-3-opus", score: 88, reason: "Thoughtful HR decision making" }
    ]
  }
];

// Model Testing and Benchmarking
const BENCHMARK_TESTS = [
  {
    category: "Clinical Decision Support",
    tests: [
      { name: "Drug Interaction Detection", description: "Identify potential medication interactions" },
      { name: "Symptom Analysis", description: "Analyze patient symptoms for diagnosis support" },
      { name: "Treatment Recommendations", description: "Suggest evidence-based treatments" },
      { name: "Risk Assessment", description: "Evaluate patient clinical risks" }
    ]
  },
  {
    category: "Financial Calculations",
    tests: [
      { name: "Budget Variance Analysis", description: "Calculate and explain budget variances" },
      { name: "ROI Calculations", description: "Compute return on investment metrics" },
      { name: "Cash Flow Modeling", description: "Create cash flow projections" },
      { name: "Cost-Benefit Analysis", description: "Analyze cost-benefit scenarios" }
    ]
  },
  {
    category: "Quality Assurance",
    tests: [
      { name: "Compliance Checking", description: "Verify regulatory compliance" },
      { name: "Audit Trail Analysis", description: "Review audit trails for anomalies" },
      { name: "Policy Interpretation", description: "Interpret complex policies and procedures" },
      { name: "Incident Analysis", description: "Analyze incidents for patterns and causes" }
    ]
  },
  {
    category: "Workforce Analytics",
    tests: [
      { name: "Staff Performance Analysis", description: "Analyze staff performance metrics" },
      { name: "Schedule Optimization", description: "Optimize staff scheduling" },
      { name: "Training Needs Assessment", description: "Identify training requirements" },
      { name: "Retention Prediction", description: "Predict staff turnover risks" }
    ]
  }
];

// Model Usage Statistics
const USAGE_STATS = [
  { model: "GPT-4 Turbo", usage: 34, tasks: 1247, success: 96.8 },
  { model: "Claude 3 Opus", usage: 28, tasks: 1034, success: 98.2 },
  { model: "Claude 3 Sonnet", usage: 22, tasks: 812, success: 94.7 },
  { model: "GPT-4", usage: 12, tasks: 445, success: 93.1 },
  { model: "Gemini Pro", usage: 4, tasks: 148, success: 91.5 }
];

// 3D Holographic Interface Component
function HolographicInterface({ isActive, children }: { isActive: boolean; children: React.ReactNode }) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-lg border ${
        isActive ? 'border-cyan-500/50 bg-cyan-500/5' : 'border-border/30 bg-card/50'
      }`}
      animate={{
        boxShadow: isActive 
          ? [
              '0 0 20px rgba(6, 182, 212, 0.3)',
              '0 0 40px rgba(6, 182, 212, 0.5)',
              '0 0 20px rgba(6, 182, 212, 0.3)'
            ]
          : '0 0 0px rgba(6, 182, 212, 0)'
      }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* AI scanlines */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="h-full w-full"
          style={{
            background: 'linear-gradient(90deg, transparent 98%, rgba(6, 182, 212, 0.1) 100%)',
            backgroundSize: '40px 100%'
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 0%']
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

// Main LLM Selector Agent Component
export function LLMSelectorAgent({ selectedModel, onModelChange }: LLMSelectorAgentProps) {
  const [activeView, setActiveView] = useState("models");
  const [testingModel, setTestingModel] = useState("");
  const [runningBenchmark, setRunningBenchmark] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Healthcare Tasks");

  const handleModelSelect = (modelId: string) => {
    onModelChange(modelId);
  };

  const handleBenchmarkTest = (category: string) => {
    setRunningBenchmark(true);
    
    // Simulate benchmark testing
    setTimeout(() => {
      setRunningBenchmark(false);
    }, 3000);
  };

  const getModelById = (id: string) => {
    return AI_MODELS.find(model => model.id === id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-500 bg-green-500/10';
      case 'testing': return 'text-orange-500 bg-orange-500/10';
      case 'inactive': return 'text-gray-500 bg-gray-500/10';
      default: return 'text-blue-500 bg-blue-500/10';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Settings Logo */}
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
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            <Settings className="w-12 h-12 text-cyan-500 drop-shadow-lg" />
            <motion.div
              className="absolute inset-0"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(6, 182, 212, 0.3)',
                  '0 0 40px rgba(6, 182, 212, 0.6)',
                  '0 0 20px rgba(6, 182, 212, 0.3)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold text-cyan-500 tracking-tight">
              LLM Selector
            </h1>
            <p className="text-muted-foreground">
              Model Selection • Performance Testing • Optimization • AI Model Management
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="animate-pulse bg-cyan-500/10 border-cyan-500/30 text-cyan-600">
            <Brain className="w-3 h-3 mr-1" />
            OPTIMIZING
          </Badge>
          <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-600">
            {AI_MODELS.length} Models Available
          </Badge>
        </div>
      </motion.div>

      {/* Control Tabs */}
      <Tabs value={activeView} onValueChange={setActiveView} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-card/50 backdrop-blur-sm">
          <TabsTrigger value="models" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Available Models
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="testing" className="flex items-center gap-2">
            <TestTube className="w-4 h-4" />
            Benchmarking
          </TabsTrigger>
          <TabsTrigger value="usage" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Usage Stats
          </TabsTrigger>
          <TabsTrigger value="optimization" className="flex items-center gap-2">
            <Rocket className="w-4 h-4" />
            Optimization
          </TabsTrigger>
        </TabsList>

        {/* Available Models Tab */}
        <TabsContent value="models" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {AI_MODELS.map((model, index) => (
              <HolographicInterface key={index} isActive={selectedModel === model.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{model.name}</CardTitle>
                      <div className="text-sm text-muted-foreground">{model.provider} • {model.version}</div>
                    </div>
                    <Badge className={getStatusColor(model.status)}>
                      {model.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">{model.description}</p>
                    
                    {/* Performance Metrics */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs">Accuracy</span>
                        <span className="text-xs font-mono">{model.accuracy}%</span>
                      </div>
                      <Progress value={model.accuracy} className="h-1" />
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs">Speed</span>
                        <span className="text-xs font-mono">{model.speed}%</span>
                      </div>
                      <Progress value={model.speed} className="h-1" />
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs">Cost Efficiency</span>
                        <span className="text-xs font-mono">{model.cost}%</span>
                      </div>
                      <Progress value={model.cost} className="h-1" />
                    </div>

                    {/* Model Details */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-muted-foreground">Context:</span>
                        <div className="font-mono">{model.contextWindow}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Latency:</span>
                        <div className="font-mono">{model.latency}</div>
                      </div>
                      <div className="col-span-2">
                        <span className="text-muted-foreground">Pricing:</span>
                        <div className="font-mono">{model.pricing}</div>
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-1">
                      {model.specialty.map((spec, specIndex) => (
                        <Badge key={specIndex} variant="outline" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>

                    {/* Action Button */}
                    <Button 
                      className="w-full" 
                      variant={selectedModel === model.id ? "default" : "outline"}
                      onClick={() => handleModelSelect(model.id)}
                    >
                      {selectedModel === model.id ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Currently Selected
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Select Model
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </HolographicInterface>
            ))}
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Selector */}
            <HolographicInterface isActive={true}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-cyan-500" />
                  Performance Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {PERFORMANCE_CATEGORIES.map((category, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`w-full p-3 text-left border border-border/50 hover:border-cyan-500/30 rounded-lg transition-all duration-200 ${
                        selectedCategory === category.name ? 'bg-cyan-500/10 border-cyan-500/50' : 'bg-muted/20 hover:bg-cyan-500/5'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3">
                        <category.icon className="w-5 h-5 text-cyan-500" />
                        <span className="font-medium text-sm">{category.name}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </CardContent>
            </HolographicInterface>

            {/* Performance Results */}
            <HolographicInterface isActive={true}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-cyan-500" />
                  {selectedCategory} Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {PERFORMANCE_CATEGORIES.find(cat => cat.name === selectedCategory)?.models.map((modelPerf, index) => {
                    const model = getModelById(modelPerf.id);
                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-sm">{model?.name}</div>
                            <div className="text-xs text-muted-foreground">{modelPerf.reason}</div>
                          </div>
                          <div className="text-lg font-bold text-cyan-500">{modelPerf.score}%</div>
                        </div>
                        <Progress value={modelPerf.score} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </HolographicInterface>
          </div>
        </TabsContent>

        {/* Benchmarking Tab */}
        <TabsContent value="testing" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {BENCHMARK_TESTS.map((category, categoryIndex) => (
              <HolographicInterface key={categoryIndex} isActive={true}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TestTube className="w-5 h-5 text-cyan-500" />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.tests.map((test, index) => (
                      <motion.div
                        key={index}
                        className="p-3 bg-muted/30 hover:bg-cyan-500/10 border border-border/50 hover:border-cyan-500/30 rounded-lg transition-all duration-200"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-start gap-3">
                          <FlaskConical className="w-4 h-4 text-cyan-500 mt-1" />
                          <div className="flex-1">
                            <div className="font-medium text-sm">{test.name}</div>
                            <div className="text-xs text-muted-foreground mt-1">{test.description}</div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleBenchmarkTest(category.category)}
                            disabled={runningBenchmark}
                          >
                            {runningBenchmark ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              >
                                <Cpu className="w-3 h-3" />
                              </motion.div>
                            ) : (
                              <Play className="w-3 h-3" />
                            )}
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </HolographicInterface>
            ))}
          </div>
        </TabsContent>

        {/* Usage Statistics Tab */}
        <TabsContent value="usage" className="space-y-6">
          <HolographicInterface isActive={true}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-cyan-500" />
                Model Usage Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {USAGE_STATS.map((stat, index) => (
                  <div key={index} className="p-4 bg-muted/20 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-medium">{stat.model}</div>
                      <Badge variant="outline">{stat.usage}% usage</Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Total Tasks</div>
                        <div className="font-mono font-bold">{stat.tasks.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Success Rate</div>
                        <div className="font-mono font-bold text-green-500">{stat.success}%</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Usage Share</div>
                        <div className="font-mono font-bold text-cyan-500">{stat.usage}%</div>
                      </div>
                    </div>
                    
                    <Progress value={stat.usage} className="mt-3 h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </HolographicInterface>
        </TabsContent>

        {/* Optimization Tab */}
        <TabsContent value="optimization" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Auto Optimization */}
            <HolographicInterface isActive={true}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="w-5 h-5 text-cyan-500" />
                  Auto Optimization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-muted/20 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <Sparkles className="w-5 h-5 text-yellow-500" />
                      <span className="font-medium">Smart Model Selection</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Automatically select the best model for each task based on performance data and requirements.
                    </p>
                    <Button className="w-full">
                      <Zap className="w-4 h-4 mr-2" />
                      Enable Auto Selection
                    </Button>
                  </div>

                  <div className="p-4 bg-muted/20 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <Gauge className="w-5 h-5 text-blue-500" />
                      <span className="font-medium">Performance Monitoring</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Continuously monitor model performance and automatically switch to better alternatives.
                    </p>
                    <Button className="w-full" variant="outline">
                      <Monitor className="w-4 h-4 mr-2" />
                      Configure Monitoring
                    </Button>
                  </div>

                  <div className="p-4 bg-muted/20 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <DollarSign className="w-5 h-5 text-green-500" />
                      <span className="font-medium">Cost Optimization</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Balance performance and cost by selecting the most cost-effective models for each task type.
                    </p>
                    <Button className="w-full" variant="outline">
                      <Target className="w-4 h-4 mr-2" />
                      Optimize Costs
                    </Button>
                  </div>
                </div>
              </CardContent>
            </HolographicInterface>

            {/* Model Recommendations */}
            <HolographicInterface isActive={true}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-cyan-500" />
                  AI Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border border-green-500/30 bg-green-500/10 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="font-medium text-sm">Recommendation</span>
                    </div>
                    <p className="text-sm mb-2">
                      For healthcare tasks, switch to <strong>Claude 3 Opus</strong> to improve safety scores by 8%.
                    </p>
                    <Button size="sm" className="text-xs">Apply Recommendation</Button>
                  </div>

                  <div className="p-4 border border-orange-500/30 bg-orange-500/10 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-orange-500" />
                      <span className="font-medium text-sm">Cost Alert</span>
                    </div>
                    <p className="text-sm mb-2">
                      Current model usage could save 32% on costs by using <strong>Gemini Pro</strong> for simple queries.
                    </p>
                    <Button size="sm" variant="outline" className="text-xs">Review Suggestion</Button>
                  </div>

                  <div className="p-4 border border-blue-500/30 bg-blue-500/10 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="w-4 h-4 text-blue-500" />
                      <span className="font-medium text-sm">Performance Insight</span>
                    </div>
                    <p className="text-sm mb-2">
                      <strong>GPT-4 Turbo</strong> shows 15% better performance for complex financial calculations.
                    </p>
                    <Button size="sm" variant="outline" className="text-xs">Learn More</Button>
                  </div>

                  <div className="p-4 border border-purple-500/30 bg-purple-500/10 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-purple-500" />
                      <span className="font-medium text-sm">New Model Available</span>
                    </div>
                    <p className="text-sm mb-2">
                      <strong>Claude 3.5 Sonnet</strong> is now available with improved reasoning capabilities.
                    </p>
                    <Button size="sm" variant="outline" className="text-xs">Add Model</Button>
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