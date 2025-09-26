import React, { useState, useCallback, useEffect } from "react";
import { motion } from "motion/react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { 
  Bot, Calculator, Stethoscope, Users, Award, Settings, History, Zap,
  MessageSquare, Activity, FileText, Clock, Send, TrendingUp, 
  AlertCircle, CheckCircle, Target, Sparkles, Brain, Cpu, Eye,
  Download, Upload, Minimize2, Maximize2, X, Play, Pause, RotateCcw,
  Terminal, Code, Database, Wifi, WifiOff, ChevronRight, Monitor,
  Layers, Globe, Shield, Lock, Unlock, RefreshCw, Mic, MicOff,
  Volume2, VolumeX, Network, Workflow, Lightbulb, Star, Heart,
  BarChart3, PieChart, LineChart, TrendingDown, Search, Filter,
  Plus, Edit, Trash2, Copy, Share2, BookOpen, GraduationCap,
  Briefcase, Calendar, Map, Navigation, Compass, Command, Keyboard,
  MousePointer, Headphones, Smartphone, Tablet, Laptop, Desktop
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { QualityAIAgent } from "./QualityAIAgentComplete";
import { AECoPilotAgent } from "./AECoPilotAgent";
import { FinanceAIAgent } from "./FinanceAIAgent";
import { ClinicalAIAgent } from "./ClinicalAIAgent";
import { WorkforceAIAgent } from "./WorkforceAIAgent";
import { LLMSelectorAgent } from "./LLMSelectorAgent";
import { AuditTrailAgent } from "./AuditTrailAgent";

interface AegisAIHubDomainProps {
  activeTab?: string;
}

export function AegisAIHubDomain({ activeTab = 'ai-dashboard' }: AegisAIHubDomainProps) {
  const [selectedModel, setSelectedModel] = useState("gpt-4o");
  const [aiMetrics, setAiMetrics] = useState({
    activeAgents: 7,
    totalQueries: 2847,
    avgResponseTime: 1.2,
    successRate: 98.5,
    tokensUsed: 156890,
    costToday: 23.45
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // Simulate real-time AI metrics updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAiMetrics(prev => ({
        ...prev,
        totalQueries: prev.totalQueries + Math.floor(Math.random() * 5),
        tokensUsed: prev.tokensUsed + Math.floor(Math.random() * 100),
        avgResponseTime: Math.max(0.5, prev.avgResponseTime + (Math.random() - 0.5) * 0.2),
        costToday: prev.costToday + Math.random() * 0.1
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const renderAIDashboard = () => (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* AI System Status & Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { 
            label: "Active AI Agents", 
            value: aiMetrics.activeAgents.toString(), 
            trend: "+2", 
            icon: <Bot className="w-5 h-5" />,
            description: "Running concurrently",
            status: "success"
          },
          { 
            label: "Total Queries Today", 
            value: aiMetrics.totalQueries.toLocaleString(), 
            trend: "+15%", 
            icon: <MessageSquare className="w-5 h-5" />,
            description: "AI interactions",
            status: "success"
          },
          { 
            label: "Avg Response Time", 
            value: `${aiMetrics.avgResponseTime.toFixed(1)}s`, 
            trend: "-0.2s", 
            icon: <Zap className="w-5 h-5" />,
            description: "Lightning fast",
            status: aiMetrics.avgResponseTime < 2 ? "success" : "warning"
          },
          { 
            label: "Success Rate", 
            value: `${aiMetrics.successRate}%`, 
            trend: "+0.5%", 
            icon: <CheckCircle className="w-5 h-5" />,
            description: "Query success",
            status: "success"
          },
          { 
            label: "Tokens Used", 
            value: aiMetrics.tokensUsed.toLocaleString(), 
            trend: "+2.3K", 
            icon: <Cpu className="w-5 h-5" />,
            description: "Processing power",
            status: "primary"
          },
          { 
            label: "AI Cost Today", 
            value: `${aiMetrics.costToday.toFixed(2)}`, 
            trend: "+$1.24", 
            icon: <Calculator className="w-5 h-5" />,
            description: "Operational cost",
            status: "primary"
          }
        ].map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              className="p-4 transition-all duration-500 ease-in-out aegis-ceremonial-hover cursor-pointer"
              style={{
                background: 'rgba(18, 22, 28, 0.6)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: '12px',
                boxShadow: 'inset 0 1px 0 rgba(212, 175, 55, 0.2), 0 4px 16px rgba(0, 0, 0, 0.4)',
                backdropFilter: 'none'
              }}
              onClick={() => toast.info(`Analyzing ${metric.label} metrics`)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    metric.status === 'success' ? 'bg-success/10 text-success' :
                    metric.status === 'warning' ? 'bg-warning/10 text-warning' :
                    'bg-primary/10 text-primary'
                  }`}>
                    {metric.icon}
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">{metric.label}</div>
                    <div className="text-lg font-bold text-foreground">{metric.value}</div>
                    <div className="text-xs text-muted-foreground">{metric.description}</div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" size="sm" className="text-xs">
                    {metric.trend}
                  </Badge>
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    metric.status === 'success' ? 'bg-success animate-pulse' :
                    metric.status === 'warning' ? 'bg-warning animate-pulse' :
                    'bg-primary animate-pulse'
                  }`} />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* AI Agent Fleet Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card 
          className="p-6 transition-all duration-500 ease-in-out aegis-ceremonial-hover"
          style={{
            background: 'rgba(18, 22, 28, 0.6)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            borderRadius: '16px',
            boxShadow: 'inset 0 1px 0 rgba(212, 175, 55, 0.2), 0 4px 20px rgba(0, 0, 0, 0.4)',
            backdropFilter: 'none'
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Network className="w-6 h-6 text-primary" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">AI Agent Fleet</h3>
                <p className="text-sm text-muted-foreground">Specialized AI agents working across domains</p>
              </div>
            </div>
            <Badge variant="secondary" className="animate-pulse">
              <Wifi className="w-3 h-3 mr-1" />
              Live
            </Badge>
          </div>

          <ScrollArea className="h-80">
            <div className="space-y-3">
              {[
                { name: "AE CoPilot", domain: "Universal Assistant", status: "active", load: 85, queries: 234, icon: Bot },
                { name: "Clinical AI", domain: "Healthcare", status: "active", load: 72, queries: 89, icon: Stethoscope },
                { name: "Finance Agent", domain: "Financial Operations", status: "active", load: 58, queries: 67, icon: Calculator },
                { name: "Workforce AI", domain: "HR & Scheduling", status: "active", load: 43, queries: 45, icon: Users },
                { name: "Quality Agent", domain: "Compliance & Audit", status: "active", load: 61, queries: 78, icon: Award },
                { name: "Analytics AI", domain: "Business Intelligence", status: "active", load: 39, queries: 23, icon: BarChart3 },
                { name: "Security Agent", domain: "Cybersecurity", status: "standby", load: 12, queries: 8, icon: Shield }
              ].map((agent, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg aegis-ceremonial-hover cursor-pointer"
                  style={{
                    background: agent.status === 'active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(212, 175, 55, 0.03)',
                    border: agent.status === 'active' ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid rgba(212, 175, 55, 0.08)',
                    backdropFilter: 'none'
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => toast.success(`Accessing ${agent.name} controls`)}
                >
                  <div className="flex items-center gap-3">
                    <agent.icon className={`w-5 h-5 ${agent.status === 'active' ? 'text-success' : 'text-muted-foreground'}`} />
                    <div>
                      <div className="font-medium text-sm text-foreground">{agent.name}</div>
                      <div className="text-xs text-muted-foreground">{agent.domain}</div>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant={agent.status === 'active' ? 'default' : 'secondary'} size="sm">
                        {agent.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{agent.queries} queries</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Load</span>
                        <span>{agent.load}%</span>
                      </div>
                      <Progress value={agent.load} className="h-1" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Real-time AI Insights */}
        <Card 
          className="p-6 transition-all duration-500 ease-in-out aegis-ceremonial-hover"
          style={{
            background: 'rgba(18, 22, 28, 0.6)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            borderRadius: '16px',
            boxShadow: 'inset 0 1px 0 rgba(212, 175, 55, 0.2), 0 4px 20px rgba(0, 0, 0, 0.4)',
            backdropFilter: 'none'
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Brain className="w-6 h-6 text-primary" />
            <div>
              <h3 className="text-lg font-semibold text-foreground">AI Insights & Predictions</h3>
              <p className="text-sm text-muted-foreground">Real-time intelligence across your organization</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              {
                insight: "Predictive Care Alert",
                description: "AI detected potential health decline risk for 2 clients in next 48 hours",
                confidence: 94,
                action: "Review care plans",
                urgency: "high",
                icon: Stethoscope
              },
              {
                insight: "Resource Optimization",
                description: "Staff scheduling can be optimized to save 12% on operational costs",
                confidence: 87,
                action: "Apply recommendations",
                urgency: "medium",
                icon: TrendingUp
              },
              {
                insight: "Quality Improvement",
                description: "Identified 3 process improvements to enhance care satisfaction by 8%",
                confidence: 91,
                action: "Implement changes",
                urgency: "medium",
                icon: Star
              },
              {
                insight: "Financial Anomaly",
                description: "Unusual spending pattern detected in medical supplies category",
                confidence: 96,
                action: "Investigate immediately",
                urgency: "high",
                icon: AlertCircle
              }
            ].map((insight, index) => (
              <motion.div
                key={index}
                className="p-4 rounded-lg aegis-ceremonial-hover cursor-pointer"
                style={{
                  background: insight.urgency === 'high' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                  border: insight.urgency === 'high' ? '1px solid rgba(239, 68, 68, 0.2)' : '1px solid rgba(59, 130, 246, 0.2)',
                  backdropFilter: 'none'
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => toast.info(`Acting on: ${insight.insight}`)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <insight.icon className={`w-4 h-4 ${insight.urgency === 'high' ? 'text-destructive' : 'text-primary'}`} />
                    <div>
                      <div className="font-medium text-sm text-foreground">{insight.insight}</div>
                      <div className="text-xs text-muted-foreground mt-1">{insight.description}</div>
                    </div>
                  </div>
                  <Badge variant={insight.urgency === 'high' ? 'destructive' : 'default'} size="sm">
                    {insight.confidence}% confident
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <Button 
                    size="sm" 
                    variant={insight.urgency === 'high' ? 'destructive' : 'default'}
                    className="h-6 text-xs"
                  >
                    {insight.action}
                  </Button>
                  <ChevronRight className="w-3 h-3 text-muted-foreground" />
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      {/* AI Model Performance & Configuration */}
      <Card 
        className="p-6 transition-all duration-500 ease-in-out aegis-ceremonial-hover"
        style={{
          background: 'rgba(18, 22, 28, 0.6)',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          borderRadius: '16px',
          boxShadow: 'inset 0 1px 0 rgba(212, 175, 55, 0.2), 0 4px 20px rgba(0, 0, 0, 0.4)',
          backdropFilter: 'none'
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Cpu className="w-6 h-6 text-primary" />
            <div>
              <h3 className="text-lg font-semibold text-foreground">AI Model Configuration</h3>
              <p className="text-sm text-muted-foreground">Advanced model settings and performance monitoring</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="aegis-ceremonial-hover">
              <Settings className="w-4 h-4 mr-2" />
              Configure
            </Button>
            <Button size="sm" className="aegis-ceremonial-hover">
              <Play className="w-4 h-4 mr-2" />
              Auto-Tune
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Model Selection */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm text-foreground">Primary Models</h4>
            {[
              { name: "GPT-4o", provider: "OpenAI", status: "active", performance: 98 },
              { name: "Claude-3.5", provider: "Anthropic", status: "backup", performance: 96 },
              { name: "Gemini Pro", provider: "Google", status: "testing", performance: 94 }
            ].map((model, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg"
                style={{
                  background: model.status === 'active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(212, 175, 55, 0.03)',
                  border: model.status === 'active' ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid rgba(212, 175, 55, 0.08)',
                  backdropFilter: 'none'
                }}
              >
                <div>
                  <div className="font-medium text-sm text-foreground">{model.name}</div>
                  <div className="text-xs text-muted-foreground">{model.provider}</div>
                </div>
                <div className="text-right">
                  <Badge variant={model.status === 'active' ? 'default' : 'secondary'} size="sm">
                    {model.status}
                  </Badge>
                  <div className="text-xs text-muted-foreground mt-1">{model.performance}% accuracy</div>
                </div>
              </div>
            ))}
          </div>

          {/* Performance Metrics */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm text-foreground">Performance Metrics</h4>
            {[
              { metric: "Response Accuracy", value: 98.5, target: 95 },
              { metric: "Processing Speed", value: 92, target: 90 },
              { metric: "Context Retention", value: 96, target: 95 },
              { metric: "Error Rate", value: 1.5, target: 5, inverse: true }
            ].map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground">{metric.metric}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-foreground">
                      {metric.value}{metric.inverse ? '% errors' : '%'}
                    </span>
                    <Badge variant={
                      metric.inverse ? 
                        (metric.value <= metric.target ? 'default' : 'destructive') :
                        (metric.value >= metric.target ? 'default' : 'warning')
                    } size="sm">
                      {metric.inverse ? 
                        (metric.value <= metric.target ? '✓' : '!') :
                        (metric.value >= metric.target ? '✓' : '!')
                      }
                    </Badge>
                  </div>
                </div>
                <Progress 
                  value={metric.inverse ? 100 - metric.value : metric.value} 
                  className="h-2" 
                />
              </div>
            ))}
          </div>

          {/* System Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm text-foreground">System Resources</h4>
            {[
              { resource: "GPU Utilization", usage: 67, limit: 80, unit: "%" },
              { resource: "Memory Usage", usage: 54, limit: 70, unit: "%" },
              { resource: "API Rate Limit", usage: 234, limit: 1000, unit: "/min" },
              { resource: "Token Budget", usage: 78, limit: 100, unit: "%" }
            ].map((resource, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground">{resource.resource}</span>
                  <span className="text-foreground">
                    {resource.usage}{resource.unit === "%" ? "%" : ""} / {resource.limit}{resource.unit}
                  </span>
                </div>
                <Progress 
                  value={(resource.usage / resource.limit) * 100} 
                  className="h-2" 
                />
              </div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "ai-dashboard":
        return renderAIDashboard();
      case "ae-copilot":
        return (
          <div className="p-6">
            <AECoPilotAgent selectedModel={selectedModel} onModelChange={setSelectedModel} />
          </div>
        );
      case "finance-agent":
        return (
          <div className="p-6">
            <FinanceAIAgent selectedModel={selectedModel} onModelChange={setSelectedModel} />
          </div>
        );
      case "clinical-agent":
        return (
          <div className="p-6">
            <ClinicalAIAgent selectedModel={selectedModel} onModelChange={setSelectedModel} />
          </div>
        );
      case "workforce-agent":
        return (
          <div className="p-6">
            <WorkforceAIAgent selectedModel={selectedModel} onModelChange={setSelectedModel} />
          </div>
        );
      case "quality-agent":
        return (
          <div className="p-6">
            <QualityAIAgent selectedModel={selectedModel} onModelChange={setSelectedModel} />
          </div>
        );
      case "llm-selector":
        return (
          <div className="p-6">
            <LLMSelectorAgent selectedModel={selectedModel} onModelChange={setSelectedModel} />
          </div>
        );
      case "audit-trail":
        return (
          <div className="p-6">
            <AuditTrailAgent selectedModel={selectedModel} onModelChange={setSelectedModel} />
          </div>
        );
      case "quick-actions":
        return (
          <div className="p-6 space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-primary mb-2">Quick Actions</h2>
              <p className="text-muted-foreground">Rapid AI-powered system operations</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { icon: MessageSquare, label: "AI Chat", color: "text-blue-500" },
                { icon: Brain, label: "Analysis", color: "text-purple-500" },
                { icon: FileText, label: "Reports", color: "text-green-500" },
                { icon: AlertCircle, label: "Alerts", color: "text-red-500" },
                { icon: Activity, label: "Monitoring", color: "text-cyan-500" },
                { icon: Settings, label: "Config", color: "text-orange-500" },
                { icon: Download, label: "Export", color: "text-indigo-500" },
                { icon: Upload, label: "Import", color: "text-pink-500" },
                { icon: Target, label: "Optimize", color: "text-teal-500" },
                { icon: Sparkles, label: "Enhance", color: "text-yellow-500" },
                { icon: Shield, label: "Security", color: "text-red-600" },
                { icon: Zap, label: "Automate", color: "text-violet-500" }
              ].map((action, index) => (
                <Card key={index} className="p-4 cursor-pointer hover:bg-primary/5 transition-colors">
                  <div className="flex flex-col items-center gap-2">
                    <action.icon className={`w-8 h-8 ${action.color}`} />
                    <span className="text-sm font-medium">{action.label}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="p-6">
            <AECoPilotAgent selectedModel={selectedModel} onModelChange={setSelectedModel} />
          </div>
        );
    }
  };

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2 aegis-text-enhanced">
            AEGIS AI Hub - Intelligent Automation Center
          </h1>
          <p className="text-muted-foreground aegis-text-secondary">
            Advanced AI agents and machine learning systems for healthcare excellence
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="aegis-ceremonial-hover">
            <Brain className="w-4 h-4 mr-2" />
            Train Models
          </Button>
          <Button size="sm" className="aegis-ceremonial-hover">
            <Plus className="w-4 h-4 mr-2" />
            New Agent
          </Button>
        </div>
      </motion.div>

      <Tabs value={activeTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 gap-1">
          <TabsTrigger value="ai-dashboard" className="aegis-tab-text">AI Dashboard</TabsTrigger>
          <TabsTrigger value="ae-copilot" className="aegis-tab-text">AE CoPilot</TabsTrigger>
          <TabsTrigger value="clinical-agent" className="aegis-tab-text">Clinical AI</TabsTrigger>
          <TabsTrigger value="finance-agent" className="aegis-tab-text">Finance AI</TabsTrigger>
          <TabsTrigger value="workforce-agent" className="aegis-tab-text">Workforce AI</TabsTrigger>
          <TabsTrigger value="quality-agent" className="aegis-tab-text">Quality AI</TabsTrigger>
          <TabsTrigger value="llm-selector" className="aegis-tab-text">Model Hub</TabsTrigger>
          <TabsTrigger value="audit-trail" className="aegis-tab-text">AI Audit</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {renderTabContent()}
        </TabsContent>
      </Tabs>
    </div>
  );
}