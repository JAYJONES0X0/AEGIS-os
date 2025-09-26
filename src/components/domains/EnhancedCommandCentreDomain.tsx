import React, { useState, useCallback } from "react";
import { 
  Crown, 
  TrendingUp, 
  Users, 
  Heart, 
  Shield, 
  DollarSign,
  Calendar,
  Bell,
  Activity,
  Bot,
  BarChart3,
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Filter,
  Search,
  RefreshCw,
  Download,
  Share,
  Plus,
  ArrowRight,
  ChevronRight,
  Home,
  Building,
  MapPin,
  Pill,
  Stethoscope,
  UserCheck,
  Award,
  Package,
  Brain,
  Zap,
  Target,
  Globe,
  Monitor,
  Database
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { EnhancedKPI, EnhancedKPIGrid, generateSampleKPIData } from "../common/EnhancedKPI";
import { HierarchicalCard } from "../common/HierarchicalCard";
import { BreadcrumbNavigation, BreadcrumbProvider, useBreadcrumb } from "../common/BreadcrumbNavigation";
import { ProgressiveDisclosure, QuickActionsDisclosure, DataDrilldown } from "../common/ProgressiveDisclosure";
import { ContextualActions, QuickActionsToolbar, getStandardActions } from "../common/ContextualActions";
import { Section } from "../common/Section";

import { mockKPIs, mockClients, mockStaff, mockAlerts } from "../../lib/mock-data";

interface EnhancedCommandCentreDomainProps {
  activeTab?: string;
  onNavigate?: (gateId: string, subTabId?: string) => void;
}

// Main Dashboard Component
function DashboardContent({ onNavigate }: { onNavigate?: (gateId: string, subTabId?: string) => void }) {
  const { pushItem, clear } = useBreadcrumb();
  const [filterQuery, setFilterQuery] = useState("");
  const [viewMode, setViewMode] = useState<'grid' | 'detailed'>('detailed');

  const handleKPIDrillDown = useCallback((kpiLabel: string, path: string[]) => {
    pushItem({
      id: 'kpi-detail',
      label: `${kpiLabel} Details`,
      description: `Detailed analysis of ${kpiLabel}`
    });
    console.log('Drilling down into KPI:', kpiLabel, 'Path:', path);
  }, [pushItem]);

  const handleSystemNavigation = useCallback((targetGate: string, subTab?: string) => {
    if (onNavigate) {
      onNavigate(targetGate, subTab);
    }
  }, [onNavigate]);

  // Enhanced KPI data with drill-down capabilities
  const enhancedKPIs = [
    {
      label: "Active Clients",
      value: mockClients.length,
      description: "Total service users across all facilities",
      icon: <Users className="h-5 w-5" />,
      trend: 'up' as const,
      trendValue: '+3 this week',
      status: 'good' as const,
      breakdown: [
        {
          id: 'residential',
          label: 'Residential Care',
          value: Math.floor(mockClients.length * 0.6),
          percentage: 60,
          trend: 'up' as const,
          status: 'good' as const,
          children: [
            { id: 'oak-house', label: 'Oak House', value: 12, percentage: 48, status: 'good' as const },
            { id: 'maple-lodge', label: 'Maple Lodge', value: 13, percentage: 52, status: 'good' as const }
          ]
        },
        {
          id: 'community',
          label: 'Community Support',
          value: Math.floor(mockClients.length * 0.4),
          percentage: 40,
          trend: 'stable' as const,
          status: 'good' as const
        }
      ],
      onClick: () => handleSystemNavigation('healthcare', 'care-support'),
      onDrillDown: (path: string[]) => handleKPIDrillDown('Active Clients', path)
    },
    {
      label: "Staff on Duty",
      value: mockStaff.filter(s => s.status === "On Duty").length,
      description: "Currently active staff members",
      icon: <UserCheck className="h-5 w-5" />,
      trend: 'stable' as const,
      status: 'warning' as const,
      breakdown: [
        {
          id: 'nurses',
          label: 'Registered Nurses',
          value: 8,
          percentage: 40,
          status: 'good' as const
        },
        {
          id: 'care-assistants',
          label: 'Care Assistants',
          value: 12,
          percentage: 60,
          status: 'warning' as const
        }
      ],
      onClick: () => handleSystemNavigation('workforce', 'rota'),
      onDrillDown: (path: string[]) => handleKPIDrillDown('Staff on Duty', path)
    },
    {
      label: "Today's Medications",
      value: 89,
      description: "Medications due for administration",
      icon: <Pill className="h-5 w-5" />,
      trend: 'down' as const,
      trendValue: '12 completed',
      status: 'good' as const,
      breakdown: [
        {
          id: 'morning',
          label: 'Morning Round',
          value: 45,
          percentage: 51,
          status: 'good' as const
        },
        {
          id: 'afternoon',
          label: 'Afternoon Round',
          value: 28,
          percentage: 31,
          status: 'warning' as const
        },
        {
          id: 'evening',
          label: 'Evening Round',
          value: 16,
          percentage: 18,
          status: 'good' as const
        }
      ],
      onClick: () => handleSystemNavigation('healthcare', 'medications'),
      onDrillDown: (path: string[]) => handleKPIDrillDown("Today's Medications", path)
    },
    {
      label: "Quality Score",
      value: 4.8,
      unit: '/5',
      description: "Overall care quality rating",
      icon: <Award className="h-5 w-5" />,
      trend: 'up' as const,
      trendValue: '+0.2 this quarter',
      status: 'good' as const,
      target: 5.0,
      progress: 96,
      breakdown: [
        {
          id: 'safety',
          label: 'Safety Standards',
          value: '4.9/5',
          percentage: 98,
          status: 'good' as const
        },
        {
          id: 'care-delivery',
          label: 'Care Delivery',
          value: '4.7/5',
          percentage: 94,
          status: 'good' as const
        },
        {
          id: 'family-satisfaction',
          label: 'Family Satisfaction',
          value: '4.8/5',
          percentage: 96,
          status: 'good' as const
        }
      ],
      onClick: () => handleSystemNavigation('quality-intelligence', 'analytics-dashboards'),
      onDrillDown: (path: string[]) => handleKPIDrillDown('Quality Score', path)
    },
    {
      label: "System Health",
      value: 99.2,
      unit: '%',
      description: "Platform uptime and performance",
      icon: <Monitor className="h-5 w-5" />,
      trend: 'stable' as const,
      status: 'good' as const,
      breakdown: [
        {
          id: 'uptime',
          label: 'System Uptime',
          value: '99.8%',
          percentage: 99.8,
          status: 'good' as const
        },
        {
          id: 'response-time',
          label: 'Response Time',
          value: '150ms avg',
          percentage: 95,
          status: 'good' as const
        },
        {
          id: 'data-integrity',
          label: 'Data Integrity',
          value: '100%',
          percentage: 100,
          status: 'good' as const
        }
      ],
      onClick: () => handleSystemNavigation('admin', 'system-monitoring'),
      onDrillDown: (path: string[]) => handleKPIDrillDown('System Health', path)
    },
    {
      label: "Revenue MTD",
      value: "£247,329",
      description: "Month-to-date revenue",
      icon: <DollarSign className="h-5 w-5" />,
      trend: 'up' as const,
      trendValue: '+8.5% vs last month',
      status: 'good' as const,
      breakdown: [
        {
          id: 'care-fees',
          label: 'Care Fees',
          value: '£198,250',
          percentage: 80,
          status: 'good' as const
        },
        {
          id: 'additional-services',
          label: 'Additional Services',
          value: '£49,079',
          percentage: 20,
          status: 'good' as const
        }
      ],
      onClick: () => handleSystemNavigation('finance-operations', 'invoicing-billing'),
      onDrillDown: (path: string[]) => handleKPIDrillDown('Revenue MTD', path)
    }
  ];

  // Quick Actions Data
  const quickActions = [
    {
      id: 'new-client',
      title: 'Add New Client',
      description: 'Register a new service user',
      icon: <Plus className="h-4 w-4" />,
      onClick: () => handleSystemNavigation('healthcare', 'care-support'),
      status: 'default' as const
    },
    {
      id: 'emergency-alert',
      title: 'Emergency Alert',
      description: 'Trigger system-wide emergency notification',
      icon: <AlertTriangle className="h-4 w-4" />,
      onClick: () => console.log('Emergency alert triggered'),
      status: 'error' as const
    },
    {
      id: 'staff-rota',
      title: 'Manage Rota',
      description: 'Update staff scheduling',
      icon: <Calendar className="h-4 w-4" />,
      onClick: () => handleSystemNavigation('workforce', 'rota'),
      status: 'default' as const
    },
    {
      id: 'quality-audit',
      title: 'Start Quality Audit',
      description: 'Begin quality assessment process',
      icon: <CheckCircle className="h-4 w-4" />,
      onClick: () => handleSystemNavigation('quality-intelligence', 'audits'),
      status: 'default' as const
    }
  ];

  // Recent Activities Data
  const recentActivities = [
    {
      id: 'medication-admin',
      title: 'Medication Administration',
      description: 'Morning medication round completed for Wing A',
      icon: <Pill className="h-4 w-4" />,
      badge: 'Completed',
      status: 'success' as const,
      children: [
        {
          id: 'med-details',
          title: 'Administration Details',
          value: '24/24 clients',
          status: 'completed' as const
        }
      ]
    },
    {
      id: 'staff-checkin',
      title: 'Staff Check-in',
      description: 'Sarah Johnson started shift in Oak House',
      icon: <UserCheck className="h-4 w-4" />,
      badge: 'Active',
      status: 'active' as const
    },
    {
      id: 'quality-review',
      title: 'Quality Review',
      description: 'Weekly quality assessment scheduled',
      icon: <Award className="h-4 w-4" />,
      badge: 'Due',
      status: 'warning' as const
    }
  ];

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold aegis-text-primary flex items-center gap-3">
            <Crown className="h-6 w-6 text-primary" />
            Executive Dashboard
          </h1>
          <Badge variant="secondary" className="text-xs">
            Real-time
          </Badge>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search dashboard..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-64"
            />
          </div>
          
          <QuickActionsToolbar
            actions={[
              {
                id: 'refresh',
                label: 'Refresh',
                icon: <RefreshCw className="h-4 w-4" />,
                onClick: () => window.location.reload(),
                keyboard: 'F5'
              },
              {
                id: 'export',
                label: 'Export',
                icon: <Download className="h-4 w-4" />,
                onClick: () => console.log('Export dashboard')
              },
              {
                id: 'share',
                label: 'Share',
                icon: <Share className="h-4 w-4" />,
                onClick: () => console.log('Share dashboard')
              }
            ]}
            maxVisible={2}
          />
        </div>
      </div>

      {/* KPI Grid */}
      <Section
        title="Key Performance Indicators"
        description="Real-time metrics and performance indicators"
      >
        <EnhancedKPIGrid
          kpis={enhancedKPIs}
          columns={3}
          compact={viewMode === 'grid'}
        />
      </Section>

      {/* System Overview Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Section
          title="Quick Actions"
          description="Frequently used system functions"
        >
          <QuickActionsDisclosure
            actions={quickActions}
            title=""
            className="border-none p-0"
          />
        </Section>

        {/* Recent Activities */}
        <Section
          title="Recent Activities"
          description="Latest system events and updates"
        >
          <HierarchicalCard
            title="Activity Feed"
            children={recentActivities.map(activity => ({
              id: activity.id,
              title: activity.title,
              description: activity.description,
              badge: activity.badge,
              status: activity.status,
              children: activity.children
            }))}
            expandable={true}
            defaultExpanded={true}
          />
        </Section>
      </div>

      {/* System Status Overview */}
      <Section
        title="System Status"
        description="Critical system components and their current status"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="aegis-card-glass">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Database className="h-4 w-4" />
                Database
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Status</span>
                <Badge variant="secondary" className="text-xs">Healthy</Badge>
              </div>
              <Progress value={98} className="mt-2 h-2" />
            </CardContent>
          </Card>

          <Card className="aegis-card-glass">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Globe className="h-4 w-4" />
                API Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Uptime</span>
                <Badge variant="secondary" className="text-xs">99.9%</Badge>
              </div>
              <Progress value={99.9} className="mt-2 h-2" />
            </CardContent>
          </Card>

          <Card className="aegis-card-glass">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Score</span>
                <Badge variant="secondary" className="text-xs">Excellent</Badge>
              </div>
              <Progress value={95} className="mt-2 h-2" />
            </CardContent>
          </Card>
        </div>
      </Section>
    </div>
  );
}

// AI Co-Pilot Tab Content
function AICopilotContent() {
  const aiAgents = [
    {
      id: 'clinical-agent',
      title: 'Clinical AI Agent',
      description: 'Healthcare and medical assistance',
      icon: <Stethoscope className="h-4 w-4" />,
      status: 'active' as const,
      badge: 'Online'
    },
    {
      id: 'finance-agent',
      title: 'Finance AI Agent',
      description: 'Financial analysis and reporting',
      icon: <DollarSign className="h-4 w-4" />,
      status: 'active' as const,
      badge: 'Online'
    },
    {
      id: 'workforce-agent',
      title: 'Workforce AI Agent',
      description: 'HR and staff management',
      icon: <Users className="h-4 w-4" />,
      status: 'default' as const,
      badge: 'Idle'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Bot className="h-6 w-6 text-primary" />
        <h2 className="text-xl font-semibold aegis-text-primary">AI Co-Pilot Center</h2>
      </div>

      <ProgressiveDisclosure
        items={aiAgents.map(agent => ({
          id: agent.id,
          title: agent.title,
          description: agent.description,
          icon: agent.icon,
          badge: agent.badge,
          status: agent.status,
          actions: [
            {
              label: 'Chat',
              onClick: () => console.log(`Starting chat with ${agent.title}`),
              icon: <ArrowRight className="h-3 w-3" />
            }
          ]
        }))}
        title="Available AI Agents"
        description="Specialized AI assistants for different domains"
        allowMultiple={true}
      />
    </div>
  );
}

// Main Enhanced Command Centre Component
export function EnhancedCommandCentreDomain({ 
  activeTab = 'dashboard', 
  onNavigate 
}: EnhancedCommandCentreDomainProps) {
  return (
    <BreadcrumbProvider>
      <div className="p-6 space-y-6">
        {/* Breadcrumb Navigation */}
        <BreadcrumbNavigation
          items={[
            { id: 'command-centre', label: 'Command Centre', description: 'Executive Dashboard & System Control' }
          ]}
          showHome={true}
          onNavigate={(itemId) => {
            if (itemId === 'home') {
              onNavigate?.('command-centre', 'dashboard');
            }
          }}
        />

        {/* Main Content Tabs */}
        <Tabs value={activeTab} className="space-y-6">
          <TabsList className="aegis-card-glass">
            <TabsTrigger value="dashboard" className="aegis-tab-text">
              <Crown className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="ai-copilot" className="aegis-tab-text">
              <Bot className="h-4 w-4 mr-2" />
              AI Co-Pilot
            </TabsTrigger>
            <TabsTrigger value="system-health" className="aegis-tab-text">
              <Activity className="h-4 w-4 mr-2" />
              System Health
            </TabsTrigger>
            <TabsTrigger value="analytics" className="aegis-tab-text">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <DashboardContent onNavigate={onNavigate} />
          </TabsContent>

          <TabsContent value="ai-copilot" className="space-y-6">
            <AICopilotContent />
          </TabsContent>

          <TabsContent value="system-health" className="space-y-6">
            <div className="text-center py-12">
              <Monitor className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium aegis-text-primary">System Health Dashboard</h3>
              <p className="text-muted-foreground aegis-text-secondary">Coming soon with real-time monitoring</p>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="text-center py-12">
              <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium aegis-text-primary">Advanced Analytics</h3>
              <p className="text-muted-foreground aegis-text-secondary">Deep dive analytics and insights</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </BreadcrumbProvider>
  );
}