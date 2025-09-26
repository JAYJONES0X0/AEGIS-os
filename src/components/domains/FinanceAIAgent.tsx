import React, { useState, useEffect, useCallback } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { 
  Calculator, Activity, TrendingUp, AlertCircle, CheckCircle, Clock, 
  Users, FileText, BarChart3, Zap, Eye, Search, Filter, Download,
  Settings, RefreshCw, Play, Pause, Cpu, Database, Wifi, Globe,
  Target, Award, Heart, Brain, Layers, Command, Scan, MessageSquare,
  Send, ArrowRight, ChevronDown, ChevronUp, Star, ThumbsUp, AlertTriangle,
  Calendar, MapPin, Phone, Mail, User, Building, Clipboard, Monitor,
  Plus, Minus, RotateCcw, Maximize2, Minimize2, X, Volume2, VolumeX,
  Mic, MicOff, Camera, Video, Share, Lock, Unlock, Save, Navigation,
  Home, Stethoscope, LifeBuoy, Headphones, Bell, BookOpen,
  Archive, FolderOpen, ShoppingCart, Truck, Wrench, PieChart, LineChart,
  BarChart, GitBranch, Workflow, Briefcase, GraduationCap, CreditCard,
  DollarSign, Receipt, Package, Warehouse, Shield as ShieldCheck,
  UserCheck, UserX, UserPlus, Key, Code, Terminal, Bug, HelpCircle,
  Info, ExternalLink, Link, Copy, Edit, Trash2, MoreHorizontal,
  TrendingDown, Banknote, Coins, Percent, CreditCard as Card,
  Wallet, PiggyBank, Building2, Factory, Store, Landmark
} from "lucide-react";
import { motion } from "motion/react";
import { mockStaffProfiles, mockClientProfiles, aeMedicationLibrary, aeTrainingModules } from "../../lib/expanded-mock-data";

interface FinanceAIAgentProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
}

// Financial Analysis Tools
const FINANCIAL_TOOLS = [
  {
    category: "Budget Management",
    icon: PiggyBank,
    tools: [
      { name: "Budget Analyzer", description: "Analyze current budget performance vs targets", action: "budget_analysis" },
      { name: "Variance Reporter", description: "Generate variance reports with explanations", action: "variance_report" },
      { name: "Forecast Modeler", description: "Create financial forecasts and scenarios", action: "financial_forecast" },
      { name: "Budget Optimizer", description: "Optimize budget allocation across departments", action: "budget_optimization" }
    ]
  },
  {
    category: "Revenue Analysis",
    icon: TrendingUp,
    tools: [
      { name: "Revenue Tracker", description: "Track revenue streams and performance", action: "revenue_tracking" },
      { name: "Billing Optimizer", description: "Optimize billing processes and timing", action: "billing_optimization" },
      { name: "Payment Analyzer", description: "Analyze payment patterns and delays", action: "payment_analysis" },
      { name: "Contract Manager", description: "Analyze contract profitability", action: "contract_analysis" }
    ]
  },
  {
    category: "Cost Management",
    icon: TrendingDown,
    tools: [
      { name: "Cost Analyzer", description: "Break down costs by category and department", action: "cost_analysis" },
      { name: "Expense Tracker", description: "Track and categorize all expenses", action: "expense_tracking" },
      { name: "Supplier Analyzer", description: "Analyze supplier costs and performance", action: "supplier_analysis" },
      { name: "Waste Identifier", description: "Identify cost reduction opportunities", action: "waste_identification" }
    ]
  },
  {
    category: "Financial Reporting",
    icon: FileText,
    tools: [
      { name: "P&L Generator", description: "Generate profit & loss statements", action: "pl_statement" },
      { name: "Cash Flow Analyst", description: "Analyze cash flow patterns and predictions", action: "cashflow_analysis" },
      { name: "KPI Dashboard", description: "Create financial KPI dashboards", action: "financial_kpis" },
      { name: "Regulatory Reporter", description: "Generate regulatory compliance reports", action: "regulatory_reports" }
    ]
  }
];

// Financial KPIs and Metrics
const FINANCIAL_KPIS = [
  {
    category: "Revenue Metrics",
    metrics: [
      { name: "Monthly Revenue", value: "£284,750", change: "+12.3%", trend: "up" },
      { name: "Client Revenue per Head", value: "£7,119", change: "+8.7%", trend: "up" },
      { name: "Revenue Growth Rate", value: "15.2%", change: "+2.1%", trend: "up" },
      { name: "Contract Renewal Rate", value: "94.8%", change: "+1.2%", trend: "up" }
    ]
  },
  {
    category: "Cost Metrics",
    metrics: [
      { name: "Total Operating Costs", value: "£198,420", change: "-3.2%", trend: "down" },
      { name: "Cost per Client", value: "£4,961", change: "-5.8%", trend: "down" },
      { name: "Staff Cost Ratio", value: "67.3%", change: "-1.9%", trend: "down" },
      { name: "Overhead Ratio", value: "18.7%", change: "-0.8%", trend: "down" }
    ]
  },
  {
    category: "Profitability",
    metrics: [
      { name: "Gross Profit Margin", value: "30.3%", change: "+4.2%", trend: "up" },
      { name: "Net Profit", value: "£86,330", change: "+18.9%", trend: "up" },
      { name: "EBITDA", value: "£94,200", change: "+16.4%", trend: "up" },
      { name: "ROI", value: "24.7%", change: "+3.8%", trend: "up" }
    ]
  },
  {
    category: "Cash Flow",
    metrics: [
      { name: "Cash Balance", value: "£342,150", change: "+7.9%", trend: "up" },
      { name: "Days Sales Outstanding", value: "28 days", change: "-4 days", trend: "down" },
      { name: "Working Capital", value: "£156,780", change: "+12.1%", trend: "up" },
      { name: "Cash Conversion Cycle", value: "32 days", change: "-3 days", trend: "down" }
    ]
  }
];

// Quick Financial Commands
const FINANCE_COMMANDS = [
  {
    category: "Instant Analysis",
    icon: BarChart3,
    commands: [
      { command: "/revenue", description: "Generate revenue analysis report", color: "text-green-500" },
      { command: "/costs", description: "Analyze cost breakdown and trends", color: "text-red-500" },
      { command: "/profit", description: "Calculate profit margins and analysis", color: "text-blue-500" },
      { command: "/cashflow", description: "Generate cash flow statement", color: "text-purple-500" }
    ]
  },
  {
    category: "Budget Operations",
    icon: PiggyBank,
    commands: [
      { command: "/budget check", description: "Check budget status across departments", color: "text-orange-500" },
      { command: "/variance", description: "Calculate budget variance analysis", color: "text-yellow-500" },
      { command: "/forecast", description: "Generate financial forecast", color: "text-cyan-500" },
      { command: "/optimize", description: "Optimize budget allocation", color: "text-teal-500" }
    ]
  },
  {
    category: "Reporting",
    icon: FileText,
    commands: [
      { command: "/pl", description: "Generate P&L statement", color: "text-indigo-500" },
      { command: "/balance", description: "Create balance sheet", color: "text-pink-500" },
      { command: "/dashboard", description: "Build financial dashboard", color: "text-emerald-500" },
      { command: "/compliance", description: "Generate compliance report", color: "text-violet-500" }
    ]
  },
  {
    category: "Alerts & Monitoring",
    icon: Bell,
    commands: [
      { command: "/alerts", description: "Check financial alerts and warnings", color: "text-red-600" },
      { command: "/overdue", description: "List overdue payments", color: "text-orange-600" },
      { command: "/budget alert", description: "Check budget overspend alerts", color: "text-amber-600" },
      { command: "/audit", description: "Run financial audit checks", color: "text-slate-600" }
    ]
  }
];

// Financial Insights and Recommendations
const FINANCIAL_INSIGHTS = [
  {
    type: "Revenue Opportunity",
    icon: TrendingUp,
    title: "Contract Renewal Optimization",
    description: "3 client contracts due for renewal next month with potential 15% increase",
    impact: "+£12,400",
    priority: "high",
    action: "Review and prepare renewal proposals"
  },
  {
    type: "Cost Reduction",
    icon: TrendingDown,
    title: "Supplier Consolidation",
    description: "Consolidating 3 suppliers could reduce costs by 8%",
    impact: "-£8,900",
    priority: "medium",
    action: "Negotiate consolidated supplier agreement"
  },
  {
    type: "Cash Flow",
    icon: Banknote,
    title: "Payment Terms Optimization",
    description: "Adjusting payment terms could improve cash flow by 12 days",
    impact: "+£45,000",
    priority: "high",
    action: "Implement new payment terms for new contracts"
  },
  {
    type: "Risk Alert",
    icon: AlertTriangle,
    title: "Budget Variance Alert",
    description: "Training budget is 23% over target for Q3",
    impact: "-£5,200",
    priority: "urgent",
    action: "Review training expenditure and adjust Q4 budget"
  }
];

// 3D Holographic Interface Component
function HolographicInterface({ isActive, children }: { isActive: boolean; children: React.ReactNode }) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-lg border ${
        isActive ? 'border-green-500/50 bg-green-500/5' : 'border-border/30 bg-card/50'
      }`}
      animate={{
        boxShadow: isActive 
          ? [
              '0 0 20px rgba(34, 197, 94, 0.3)',
              '0 0 40px rgba(34, 197, 94, 0.5)',
              '0 0 20px rgba(34, 197, 94, 0.3)'
            ]
          : '0 0 0px rgba(34, 197, 94, 0)'
      }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Financial scanlines */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="h-full w-full"
          style={{
            background: 'linear-gradient(90deg, transparent 98%, rgba(34, 197, 94, 0.1) 100%)',
            backgroundSize: '25px 100%'
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 0%']
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

// Main Finance AI Agent Component
export function FinanceAIAgent({ selectedModel, onModelChange }: FinanceAIAgentProps) {
  const [activeView, setActiveView] = useState("dashboard");
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

  return (
    <div className="space-y-6">
      {/* Header with Calculator Logo */}
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
            <Calculator className="w-12 h-12 text-green-500 drop-shadow-lg" />
            <motion.div
              className="absolute inset-0"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(34, 197, 94, 0.3)',
                  '0 0 40px rgba(34, 197, 94, 0.6)',
                  '0 0 20px rgba(34, 197, 94, 0.3)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold text-green-500 tracking-tight">
              Finance AI Agent
            </h1>
            <p className="text-muted-foreground">
              Financial AI Specialist • Budget Analysis • Revenue Optimization • Cost Management
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="animate-pulse bg-green-500/10 border-green-500/30 text-green-600">
            <DollarSign className="w-3 h-3 mr-1" />
            ACTIVE
          </Badge>
          <Badge variant="outline" className="bg-blue-500/10 border-blue-500/30 text-blue-500">
            Financial Model v3.2
          </Badge>
        </div>
      </motion.div>

      {/* Control Tabs */}
      <Tabs value={activeView} onValueChange={setActiveView} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-card/50 backdrop-blur-sm">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="tools" className="flex items-center gap-2">
            <Calculator className="w-4 h-4" />
            Analysis Tools
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            AI Insights
          </TabsTrigger>
          <TabsTrigger value="commands" className="flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            Commands
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Reports
          </TabsTrigger>
        </TabsList>

        {/* Financial Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {FINANCIAL_KPIS.map((category, categoryIndex) => (
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

          {/* Quick Actions */}
          <HolographicInterface isActive={true}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-green-500" />
                Quick Financial Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {[
                  { icon: BarChart3, label: "P&L Report", color: "text-blue-500" },
                  { icon: TrendingUp, label: "Revenue Analysis", color: "text-green-500" },
                  { icon: TrendingDown, label: "Cost Analysis", color: "text-red-500" },
                  { icon: PiggyBank, label: "Budget Status", color: "text-purple-500" },
                  { icon: Banknote, label: "Cash Flow", color: "text-cyan-500" },
                  { icon: Receipt, label: "Invoicing", color: "text-orange-500" },
                  { icon: CreditCard, label: "Payments", color: "text-pink-500" },
                  { icon: Building2, label: "Assets", color: "text-indigo-500" },
                  { icon: Landmark, label: "Banking", color: "text-emerald-500" },
                  { icon: Percent, label: "Tax Planning", color: "text-yellow-500" },
                  { icon: Coins, label: "Investments", color: "text-teal-500" },
                  { icon: AlertTriangle, label: "Risk Analysis", color: "text-red-600" }
                ].map((action, index) => (
                  <motion.button
                    key={index}
                    className={`p-4 border border-border/50 hover:border-green-500/30 rounded-lg transition-all duration-200 flex flex-col items-center gap-2 hover:bg-green-500/5`}
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

        {/* Analysis Tools Tab */}
        <TabsContent value="tools" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {FINANCIAL_TOOLS.map((category, categoryIndex) => (
              <HolographicInterface key={categoryIndex} isActive={true}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <category.icon className="w-5 h-5 text-green-500" />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.tools.map((tool, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleToolSelect(tool)}
                        className={`w-full p-4 text-left border border-border/50 hover:border-green-500/30 rounded-lg transition-all duration-200 ${
                          selectedTool === tool.name ? 'bg-green-500/10 border-green-500/50' : 'bg-muted/20 hover:bg-green-500/5'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-start gap-3">
                          <Calculator className="w-5 h-5 text-green-500 mt-0.5" />
                          <div className="flex-1">
                            <div className="font-medium text-sm">{tool.name}</div>
                            <div className="text-xs text-muted-foreground mt-1">{tool.description}</div>
                          </div>
                          {isProcessing && selectedTool === tool.name && (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                              <Cpu className="w-4 h-4 text-green-500" />
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

        {/* AI Insights Tab */}
        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {FINANCIAL_INSIGHTS.map((insight, index) => (
              <HolographicInterface key={index} isActive={true}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <insight.icon className={`w-5 h-5 ${
                      insight.priority === 'urgent' ? 'text-red-500' :
                      insight.priority === 'high' ? 'text-orange-500' :
                      'text-green-500'
                    }`} />
                    {insight.title}
                    <Badge variant={
                      insight.priority === 'urgent' ? 'destructive' :
                      insight.priority === 'high' ? 'default' :
                      'secondary'
                    } className="ml-auto">
                      {insight.priority}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground">{insight.type}</div>
                      <div className="text-sm mt-1">{insight.description}</div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <span className="text-sm font-medium">Financial Impact</span>
                      <span className={`font-bold ${
                        insight.impact.startsWith('+') ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {insight.impact}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <span className="text-sm font-medium">Recommended Action:</span>
                      <div className="text-sm text-muted-foreground p-3 bg-muted/20 rounded-lg">
                        {insight.action}
                      </div>
                    </div>
                    
                    <Button className="w-full" variant="outline">
                      <Play className="w-4 h-4 mr-2" />
                      Execute Analysis
                    </Button>
                  </div>
                </CardContent>
              </HolographicInterface>
            ))}
          </div>
        </TabsContent>

        {/* Commands Tab */}
        <TabsContent value="commands" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {FINANCE_COMMANDS.map((category, categoryIndex) => (
              <HolographicInterface key={categoryIndex} isActive={true}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <category.icon className="w-5 h-5 text-green-500" />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.commands.map((command, index) => (
                      <motion.button
                        key={index}
                        className="w-full p-3 text-left bg-muted/30 hover:bg-green-500/10 border border-border/50 hover:border-green-500/30 rounded-lg transition-all duration-200"
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

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <HolographicInterface isActive={true}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-green-500" />
                Financial Reports Generator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: "Profit & Loss Statement", type: "P&L", frequency: "Monthly" },
                  { name: "Balance Sheet", type: "Balance", frequency: "Quarterly" },
                  { name: "Cash Flow Statement", type: "Cash Flow", frequency: "Weekly" },
                  { name: "Budget vs Actual", type: "Variance", frequency: "Monthly" },
                  { name: "Revenue Analysis", type: "Revenue", frequency: "Weekly" },
                  { name: "Cost Analysis", type: "Costs", frequency: "Monthly" },
                  { name: "Financial KPIs", type: "KPIs", frequency: "Daily" },
                  { name: "Compliance Report", type: "Compliance", frequency: "Quarterly" },
                  { name: "Audit Trail", type: "Audit", frequency: "Monthly" }
                ].map((report, index) => (
                  <motion.button
                    key={index}
                    className="p-4 text-left bg-muted/30 hover:bg-green-500/10 border border-border/50 hover:border-green-500/30 rounded-lg transition-all duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="space-y-2">
                      <div className="font-medium text-sm">{report.name}</div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">{report.type}</Badge>
                        <span className="text-xs text-muted-foreground">{report.frequency}</span>
                      </div>
                    </div>
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