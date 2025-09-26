import React, { useState, useCallback, useEffect } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Progress } from "../ui/progress";
import { 
  Bot, Calculator, Stethoscope, Users, Award, Settings, History, Zap,
  MessageSquare, Activity, FileText, Clock, Send, TrendingUp, 
  AlertCircle, CheckCircle, Target, Sparkles, Brain, Cpu, Eye,
  Download, Upload, Minimize2, Maximize2, X, Play, Pause, RotateCcw,
  Terminal, Code, Database, Wifi, WifiOff, ChevronRight, Monitor,
  Layers, Globe, Shield, Lock, Unlock, RefreshCw
} from "lucide-react";
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

// AI Agent Window Component
function AIAgentWindow({ 
  title, 
  icon: Icon, 
  model, 
  status = 'online',
  children,
  onMinimize,
  onMaximize,
  onClose,
  isMinimized = false,
  className = ''
}: {
  title: string;
  icon: any;
  model: string;
  status?: 'online' | 'processing' | 'offline';
  children: React.ReactNode;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
  isMinimized?: boolean;
  className?: string;
}) {
  const statusColors = {
    online: 'bg-green-500',
    processing: 'bg-yellow-500',
    offline: 'bg-red-500'
  };

  return (
    <Card className={`aegis-ceremonial-card ${isMinimized ? 'h-16' : 'h-auto'} ${className}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon className="w-5 h-5 text-primary" />
            <div>
              <CardTitle className="text-sm font-bold">{title}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <div className={`w-2 h-2 rounded-full ${statusColors[status]}`}></div>
                <span className="text-xs text-muted-foreground">{model} • {status}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={onMinimize} className="w-6 h-6 p-0">
              <Minimize2 className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onMaximize} className="w-6 h-6 p-0">
              <Maximize2 className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose} className="w-6 h-6 p-0">
              <X className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      {!isMinimized && (
        <CardContent className="pt-0">
          {children}
        </CardContent>
      )}
    </Card>
  );
}

// LLM Model Configuration
const LLM_MODELS = {
  'gpt-4o': {
    name: 'GPT-4o',
    provider: 'OpenAI',
    status: 'online',
    capabilities: ['Text', 'Vision', 'Code', 'Analysis'],
    cost: '$0.03/1K tokens',
    speed: '~2s',
    accuracy: '98.5%'
  },
  'claude-3-sonnet': {
    name: 'Claude 3 Sonnet',
    provider: 'Anthropic',
    status: 'online',
    capabilities: ['Text', 'Analysis', 'Code', 'Reasoning'],
    cost: '$0.015/1K tokens',
    speed: '~1.8s',
    accuracy: '97.2%'
  },
  'gemini-pro': {
    name: 'Gemini Pro',
    provider: 'Google',
    status: 'online',
    capabilities: ['Text', 'Vision', 'Code', 'Multimodal'],
    cost: '$0.0025/1K tokens',
    speed: '~1.5s',
    accuracy: '96.8%'
  },
  'claude-3-haiku': {
    name: 'Claude 3 Haiku',
    provider: 'Anthropic',
    status: 'online',
    capabilities: ['Text', 'Fast Response', 'Analysis'],
    cost: '$0.00025/1K tokens',
    speed: '~0.8s',
    accuracy: '95.1%'
  },
  'llama-3-70b': {
    name: 'Llama 3 70B',
    provider: 'Meta',
    status: 'online',
    capabilities: ['Text', 'Code', 'Open Source'],
    cost: '$0.001/1K tokens',
    speed: '~2.2s',
    accuracy: '94.7%'
  },
  'gpt-3.5-turbo': {
    name: 'GPT-3.5 Turbo',
    provider: 'OpenAI',
    status: 'online',
    capabilities: ['Text', 'Fast', 'Cost Effective'],
    cost: '$0.001/1K tokens',
    speed: '~1.2s',
    accuracy: '93.8%'
  }
};

export function AegisAIHubDomain({ activeTab = 'ae-copilot' }: AegisAIHubDomainProps) {
  const [chatMessage, setChatMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gpt-4o");
  const [activeAgents, setActiveAgents] = useState<string[]>(['finance', 'clinical']);
  const [minimizedWindows, setMinimizedWindows] = useState<string[]>([]);
  const [systemLoad, setSystemLoad] = useState(45);
  const [tokensUsed, setTokensUsed] = useState(2847291);
  const [costToday, setCostToday] = useState(156.73);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemLoad(prev => Math.max(20, Math.min(90, prev + (Math.random() - 0.5) * 10)));
      setTokensUsed(prev => prev + Math.floor(Math.random() * 100));
      setCostToday(prev => prev + Math.random() * 0.5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Enhanced chat history with realistic AI responses
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      type: "user",
      message: "Show me today's critical alerts",
      timestamp: "10:30 AM"
    },
    {
      id: 2,
      type: "assistant",
      message: "I found 3 critical alerts requiring immediate attention:\n\n🔴 **Medication Alert**: Mrs. Johnson's evening medication is 2 hours overdue\n🟡 **Staffing Alert**: Night shift is understaffed by 1 RN\n🔧 **Equipment Alert**: Hoist in Room 12 requires maintenance inspection\n\nWould you like me to help resolve any of these?",
      timestamp: "10:30 AM"
    },
    {
      id: 3,
      type: "user", 
      message: "Yes, help with the medication alert",
      timestamp: "10:32 AM"
    },
    {
      id: 4,
      type: "assistant",
      message: "I've initiated the following actions for Mrs. Johnson's medication alert:\n\n✅ Notified duty nurse Sarah Chen via secure message\n✅ Updated medication schedule with delay reason\n✅ Set 15-minute reminder for medication administration\n✅ Documented incident in patient care record\n\nExpected resolution: 5 minutes. Would you like me to monitor and update you?",
      timestamp: "10:32 AM"
    }
  ]);

  // Real-time AI metrics
  const aiMetrics = [
    { label: "Queries Today", value: "1,247", change: "+18%", trend: "up" },
    { label: "Avg Response Time", value: `${(0.8 + Math.random() * 0.4).toFixed(1)}s`, change: "-12%", trend: "down" },
    { label: "Accuracy Rate", value: `${(94.5 + Math.random() * 2).toFixed(1)}%`, change: "+2.1%", trend: "up" },
    { label: "Cost Today", value: `£${costToday.toFixed(0)}`, change: "+24%", trend: "up" }
  ];

  // Live agent activities
  const [recentActivities, setRecentActivities] = useState([
    { id: 1, action: "Care plan optimization", user: "Clinical Agent", time: "2 min ago", status: "completed", agent: "clinical" },
    { id: 2, action: "Budget variance analysis", user: "Finance Agent", time: "4 min ago", status: "completed", agent: "finance" },
    { id: 3, action: "Staff shift optimization", user: "Workforce Agent", time: "6 min ago", status: "processing", agent: "workforce" },
    { id: 4, action: "Quality audit preparation", user: "Quality Agent", time: "8 min ago", status: "completed", agent: "quality" }
  ]);

  // Agent status and configurations
  const agentConfigs = {
    finance: {
      name: 'Finance Agent',
      model: 'claude-3-sonnet',
      status: 'online',
      activeTask: 'Budget Analysis',
      tasksCompleted: 23,
      efficiency: 94.2
    },
    clinical: {
      name: 'Clinical Agent', 
      model: 'gpt-4o',
      status: 'processing',
      activeTask: 'Care Plan Review',
      tasksCompleted: 18,
      efficiency: 96.8
    },
    workforce: {
      name: 'Workforce Agent',
      model: 'gemini-pro', 
      status: 'online',
      activeTask: 'Shift Optimization',
      tasksCompleted: 31,
      efficiency: 92.5
    },
    quality: {
      name: 'Quality Agent',
      model: 'claude-3-haiku',
      status: 'online', 
      activeTask: 'Compliance Check',
      tasksCompleted: 15,
      efficiency: 98.1
    }
  };

  const handleSendMessage = useCallback(() => {
    if (!chatMessage.trim() || isProcessing) return;
    
    const newMessage = {
      id: chatHistory.length + 1,
      type: "user" as const,
      message: chatMessage.trim(),
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatHistory(prev => [...prev, newMessage]);
    setIsProcessing(true);
    setChatMessage("");
    
    // Simulate AI response with realistic delay
    setTimeout(() => {
      const responses = [
        "I'm analyzing that request and cross-referencing it with current patient data...",
        "Based on the latest clinical protocols, I recommend the following approach...",
        "I've processed your query and found several relevant insights in the system...",
        "Let me check the compliance requirements and generate a suitable response..."
      ];
      
      const aiResponse = {
        id: chatHistory.length + 2,
        type: "assistant" as const,
        message: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      
      setChatHistory(prev => [...prev, aiResponse]);
      setIsProcessing(false);
    }, 1500 + Math.random() * 1000);
  }, [chatMessage, isProcessing, chatHistory.length]);

  const toggleAgent = (agentId: string) => {
    setActiveAgents(prev => 
      prev.includes(agentId) 
        ? prev.filter(id => id !== agentId)
        : [...prev, agentId]
    );
  };

  const minimizeWindow = (windowId: string) => {
    setMinimizedWindows(prev => [...prev, windowId]);
  };

  const restoreWindow = (windowId: string) => {
    setMinimizedWindows(prev => prev.filter(id => id !== windowId));
  };

  return (
    <div className="p-6 space-y-8 min-h-screen aegis-tab-home">
      {/* Header with Real-time System Status */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary tracking-tight">
            AEGIS AI Hub
          </h1>
          <p className="text-muted-foreground mt-1">
            Multi-LLM AI Command Center • {Object.keys(LLM_MODELS).length} Models Available
          </p>
        </div>
        
        <div className="text-right space-y-2">
          <div className="flex items-center gap-4">
            <div className="text-sm">
              <span className="text-muted-foreground">System Load:</span>
              <span className="ml-2 font-mono text-primary">{systemLoad.toFixed(0)}%</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Tokens Today:</span>
              <span className="ml-2 font-mono text-primary">{tokensUsed.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-foreground/80">
              {activeAgents.length} Agents Active • {selectedModel} Primary
            </span>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-8 bg-card/50 backdrop-blur-sm text-xs">
          <TabsTrigger value="ae-copilot" className="text-xs flex items-center gap-2">
            <Bot className="w-4 h-4" />
            AE Co-Pilot
          </TabsTrigger>
          <TabsTrigger value="finance-agent" className="text-xs flex items-center gap-2">
            <Calculator className="w-4 h-4" />
            Finance Agent
          </TabsTrigger>
          <TabsTrigger value="clinical-agent" className="text-xs flex items-center gap-2">
            <Stethoscope className="w-4 h-4" />
            Clinical Agent
          </TabsTrigger>
          <TabsTrigger value="workforce-agent" className="text-xs flex items-center gap-2">
            <Users className="w-4 h-4" />
            Workforce Agent
          </TabsTrigger>
          <TabsTrigger value="quality-agent" className="text-xs flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Quality Agent
          </TabsTrigger>
          <TabsTrigger value="llm-selector" className="text-xs flex items-center gap-2">
            <Settings className="w-4 h-4" />
            LLM Selector
          </TabsTrigger>
          <TabsTrigger value="audit-trail" className="text-xs flex items-center gap-2">
            <History className="w-4 h-4" />
            Audit Trail
          </TabsTrigger>
          <TabsTrigger value="quick-actions" className="text-xs flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Quick Actions
          </TabsTrigger>
        </TabsList>

        {/* AE Co-Pilot Main Interface */}
        <TabsContent value="ae-copilot" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* System Metrics */}
            <div className="lg:col-span-1">
              <Card className="aegis-ceremonial-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Monitor className="w-5 h-5 text-blue-500" />
                    System Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {aiMetrics.map((metric, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{metric.label}</span>
                        <span className={`text-xs ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                          {metric.change}
                        </span>
                      </div>
                      <div className="text-lg font-bold font-mono">{metric.value}</div>
                    </div>
                  ))}
                  
                  <div className="mt-4 pt-4 border-t border-border/20">
                    <div className="text-sm text-muted-foreground mb-2">System Load</div>
                    <Progress value={systemLoad} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-1">{systemLoad.toFixed(0)}% utilization</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Chat Interface */}
            <div className="lg:col-span-3">
              <Card className="aegis-ceremonial-card h-[600px] flex flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-green-500" />
                      AEGIS Co-Pilot Chat
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Select value={selectedModel} onValueChange={setSelectedModel}>
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(LLM_MODELS).map(([key, model]) => (
                            <SelectItem key={key} value={key}>
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                {model.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  {/* Chat History with Enhanced Styling */}
                  <div className="flex-1 space-y-4 overflow-y-auto mb-4 p-4 bg-muted/30 rounded-lg institutional-scroll">
                    {chatHistory.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-lg ${ 
                          msg.type === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-card border border-border shadow-sm'
                        }`}>
                          <div className="text-sm whitespace-pre-wrap">{msg.message}</div>
                          <div className="text-xs opacity-70 mt-1 flex items-center gap-2">
                            {msg.timestamp}
                            {msg.type === 'assistant' && (
                              <Badge variant="outline" className="text-xs px-1 py-0">
                                {LLM_MODELS[selectedModel as keyof typeof LLM_MODELS].name}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {isProcessing && (
                      <div className="flex justify-start">
                        <div className="bg-card border border-border p-3 rounded-lg shadow-sm">
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                            <span className="text-sm">
                              {LLM_MODELS[selectedModel as keyof typeof LLM_MODELS].name} is processing...
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Enhanced Chat Input */}
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        placeholder={`Ask ${LLM_MODELS[selectedModel as keyof typeof LLM_MODELS].name} anything about AEGIS...`}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        disabled={isProcessing}
                        className="flex-1"
                      />
                      <Button onClick={handleSendMessage} disabled={isProcessing || !chatMessage.trim()}>
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center justify-between">
                      <span>
                        Model: {LLM_MODELS[selectedModel as keyof typeof LLM_MODELS].name} • 
                        Cost: {LLM_MODELS[selectedModel as keyof typeof LLM_MODELS].cost} • 
                        Speed: {LLM_MODELS[selectedModel as keyof typeof LLM_MODELS].speed}
                      </span>
                      <span>{chatMessage.length} characters</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Active AI Agents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(agentConfigs).map(([agentId, config]) => (
              <AIAgentWindow
                key={agentId}
                title={config.name}
                icon={agentId === 'finance' ? Calculator : 
                      agentId === 'clinical' ? Stethoscope :
                      agentId === 'workforce' ? Users : Award}
                model={config.model}
                status={config.status as 'online' | 'processing' | 'offline'}
                isMinimized={minimizedWindows.includes(agentId)}
                onMinimize={() => minimizeWindow(agentId)}
                onMaximize={() => restoreWindow(agentId)}
                onClose={() => toggleAgent(agentId)}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Current Task:</span>
                    <Badge variant="outline" className="text-xs">
                      {config.activeTask}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <div className="text-muted-foreground">Completed</div>
                      <div className="font-bold">{config.tasksCompleted}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Efficiency</div>
                      <div className="font-bold">{config.efficiency}%</div>
                    </div>
                  </div>
                  
                  <Progress value={config.efficiency} className="h-1" />
                  
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" className="flex-1 text-xs">
                      <Play className="w-3 h-3 mr-1" />
                      Start
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 text-xs">
                      <RotateCcw className="w-3 h-3 mr-1" />
                      Reset
                    </Button>
                  </div>
                </div>
              </AIAgentWindow>
            ))}
          </div>

          {/* Recent Activities with Enhanced Detail */}
          <Card className="aegis-ceremonial-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-orange-500" />
                Live AI Activity Stream
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border/50">
                    <div className="flex items-center gap-3">
                      {activity.status === 'completed' ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <div className="w-4 h-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
                      )}
                      <div>
                        <div className="font-medium text-sm">{activity.action}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-2">
                          {activity.user}
                          <Badge variant="outline" className="text-xs">
                            {agentConfigs[activity.agent as keyof typeof agentConfigs]?.model || 'system'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">{activity.time}</div>
                      <div className={`text-xs font-medium ${
                        activity.status === 'completed' ? 'text-green-500' : 'text-yellow-500'
                      }`}>
                        {activity.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* LLM Selector Tab */}
        <TabsContent value="llm-selector" className="space-y-6">
          <Card className="aegis-ceremonial-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                LLM Model Configuration & Selection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(LLM_MODELS).map(([modelId, model]) => (
                  <Card 
                    key={modelId}
                    className={`p-4 cursor-pointer transition-all duration-200 ${
                      selectedModel === modelId 
                        ? 'border-primary bg-primary/5 shadow-lg' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedModel(modelId)}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{model.name}</h3>
                          <p className="text-xs text-muted-foreground">{model.provider}</p>
                        </div>
                        <div className={`w-3 h-3 rounded-full ${
                          model.status === 'online' ? 'bg-green-500' : 'bg-red-500'
                        }`}></div>
                      </div>
                      
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Cost:</span>
                          <span className="font-mono">{model.cost}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Speed:</span>
                          <span className="font-mono">{model.speed}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Accuracy:</span>
                          <span className="font-mono">{model.accuracy}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {model.capabilities.map((cap) => (
                          <Badge key={cap} variant="outline" className="text-xs">
                            {cap}
                          </Badge>
                        ))}
                      </div>
                      
                      {selectedModel === modelId && (
                        <Badge className="w-full justify-center bg-primary text-primary-foreground">
                          Currently Selected
                        </Badge>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tabs with placeholder content */}
        <TabsContent value="finance-agent" className="space-y-6">
          <Card className="aegis-ceremonial-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-green-500" />
                Finance AI Agent
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-8">
                <Calculator className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Finance AI Agent</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced financial analysis and automation features are fully operational.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clinical-agent" className="space-y-6">
          <Card className="aegis-ceremonial-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-red-500" />
                Clinical AI Agent
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-8">
                <Stethoscope className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Clinical AI Agent</h3>
                <p className="text-sm text-muted-foreground">
                  Healthcare-specific AI analysis and clinical decision support features.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workforce-agent" className="space-y-6">
          <Card className="aegis-ceremonial-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
                Workforce AI Agent
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-8">
                <Users className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Workforce AI Agent</h3>
                <p className="text-sm text-muted-foreground">
                  AI-powered workforce optimization and HR management features.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quality-agent" className="space-y-6">
          <QualityAIAgent selectedModel={selectedModel} onModelChange={setSelectedModel} />
        </TabsContent>

        <TabsContent value="audit-trail" className="space-y-6">
          <Card className="aegis-ceremonial-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="w-5 h-5 text-primary" />
                AI Audit Trail
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-8">
                <History className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Audit Trail</h3>
                <p className="text-sm text-muted-foreground">
                  Complete log of all AI interactions and decisions for compliance and audit purposes.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quick-actions" className="space-y-6">
          <Card className="aegis-ceremonial-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-8">
                <Zap className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Quick Actions</h3>
                <p className="text-sm text-muted-foreground">
                  Rapid AI-powered shortcuts for common tasks across all AEGIS domains.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}