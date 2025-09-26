import React, { useState } from "react";
import { 
  Crown, 
  Users, 
  Heart, 
  BarChart3, 
  Settings, 
  Eye, 
  Edit, 
  Download, 
  Share, 
  RefreshCw,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Pill,
  Stethoscope,
  Calendar,
  Plus,
  Search,
  Filter,
  ArrowRight,
  ChevronRight,
  Star,
  Award,
  Target,
  DollarSign,
  Activity,
  Home,
  Building,
  MapPin,
  Phone,
  Mail,
  MessageCircle
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";

import { EnhancedKPI, EnhancedKPIGrid } from "../common/EnhancedKPI";
import { HierarchicalCard } from "../common/HierarchicalCard";
import { BreadcrumbNavigation, BreadcrumbProvider, useBreadcrumb } from "../common/BreadcrumbNavigation";
import { ProgressiveDisclosure, QuickActionsDisclosure, DataDrilldown } from "../common/ProgressiveDisclosure";
import { ContextualActions, QuickActionsToolbar, getStandardActions } from "../common/ContextualActions";
import { Section } from "../common/Section";

export function FunctionalDepthDemo() {
  const [activeDemo, setActiveDemo] = useState("kpi-drilldown");
  const { pushItem, popItem, clear } = useBreadcrumb();

  // Demo data for Enhanced KPIs with deep drill-down
  const demoKPIs = [
    {
      label: "System Performance",
      value: 94.8,
      unit: '%',
      description: "Overall system health and performance metrics",
      icon: <Activity className="h-5 w-5" />,
      trend: 'up' as const,
      trendValue: '+2.3% this week',
      status: 'good' as const,
      target: 95,
      progress: 94.8,
      breakdown: [
        {
          id: 'response-time',
          label: 'Response Time',
          value: '150ms',
          percentage: 95,
          trend: 'up' as const,
          status: 'good' as const,
          children: [
            { id: 'api-response', label: 'API Response', value: '120ms', percentage: 96, status: 'good' as const },
            { id: 'db-query', label: 'Database Queries', value: '30ms', percentage: 94, status: 'good' as const }
          ]
        },
        {
          id: 'uptime',
          label: 'System Uptime',
          value: '99.9%',
          percentage: 99.9,
          trend: 'stable' as const,
          status: 'good' as const,
          children: [
            { id: 'web-server', label: 'Web Server', value: '100%', percentage: 100, status: 'good' as const },
            { id: 'database', label: 'Database', value: '99.8%', percentage: 99.8, status: 'good' as const },
            { id: 'cache', label: 'Cache Layer', value: '99.9%', percentage: 99.9, status: 'good' as const }
          ]
        },
        {
          id: 'error-rate',
          label: 'Error Rate',
          value: '0.1%',
          percentage: 5,
          trend: 'down' as const,
          status: 'good' as const,
          children: [
            { id: 'client-errors', label: '4xx Errors', value: '0.05%', percentage: 2.5, status: 'good' as const },
            { id: 'server-errors', label: '5xx Errors', value: '0.05%', percentage: 2.5, status: 'good' as const }
          ]
        }
      ],
      onDrillDown: (path: string[]) => {
        console.log('Drilling down into System Performance:', path);
        pushItem({
          id: 'performance-detail',
          label: 'System Performance Details',
          description: 'Detailed performance metrics and analysis'
        });
      }
    },
    {
      label: "User Engagement",
      value: 87.5,
      unit: '%',
      description: "User activity and engagement metrics",
      icon: <Users className="h-5 w-5" />,
      trend: 'up' as const,
      trendValue: '+5.2% vs last month',
      status: 'good' as const,
      breakdown: [
        {
          id: 'daily-active',
          label: 'Daily Active Users',
          value: '1,247',
          percentage: 89,
          status: 'good' as const
        },
        {
          id: 'session-duration',
          label: 'Average Session Duration',
          value: '12.5 min',
          percentage: 85,
          status: 'good' as const
        },
        {
          id: 'feature-adoption',
          label: 'Feature Adoption Rate',
          value: '78%',
          percentage: 78,
          status: 'warning' as const
        }
      ]
    },
    {
      label: "Revenue Impact",
      value: "£2.4M",
      description: "Monthly recurring revenue and growth",
      icon: <DollarSign className="h-5 w-5" />,
      trend: 'up' as const,
      trendValue: '+12% MoM',
      status: 'good' as const,
      breakdown: [
        {
          id: 'new-revenue',
          label: 'New Customer Revenue',
          value: '£340K',
          percentage: 14,
          status: 'good' as const
        },
        {
          id: 'expansion-revenue',
          label: 'Expansion Revenue',
          value: '£180K',
          percentage: 8,
          status: 'good' as const
        },
        {
          id: 'recurring-revenue',
          label: 'Recurring Revenue',
          value: '£1.88M',
          percentage: 78,
          status: 'good' as const
        }
      ]
    }
  ];

  // Demo data for Hierarchical Cards
  const organizationHierarchy = [
    {
      id: 'headquarters',
      title: 'AEGIS Headquarters',
      description: 'Main administrative center',
      value: '450 staff',
      status: 'active' as const,
      badge: 'HQ',
      children: [
        {
          id: 'executive',
          title: 'Executive Team',
          description: 'Senior leadership and decision makers',
          value: '12 members',
          status: 'active' as const,
          children: [
            { id: 'ceo', title: 'Chief Executive Officer', value: 'Sarah Williams', status: 'active' as const },
            { id: 'cto', title: 'Chief Technology Officer', value: 'Michael Chen', status: 'active' as const },
            { id: 'coo', title: 'Chief Operating Officer', value: 'Emma Thompson', status: 'active' as const }
          ]
        },
        {
          id: 'technology',
          title: 'Technology Division',
          description: 'Software development and IT operations',
          value: '85 staff',
          status: 'active' as const,
          children: [
            { id: 'dev-team', title: 'Development Team', value: '45 developers', status: 'active' as const },
            { id: 'qa-team', title: 'Quality Assurance', value: '20 analysts', status: 'active' as const },
            { id: 'devops', title: 'DevOps Team', value: '20 engineers', status: 'active' as const }
          ]
        },
        {
          id: 'operations',
          title: 'Operations Division',
          description: 'Business operations and support',
          value: '120 staff',
          status: 'active' as const,
          children: [
            { id: 'customer-success', title: 'Customer Success', value: '35 specialists', status: 'active' as const },
            { id: 'support', title: 'Technical Support', value: '25 agents', status: 'active' as const },
            { id: 'sales', title: 'Sales Team', value: '40 representatives', status: 'active' as const },
            { id: 'marketing', title: 'Marketing Team', value: '20 professionals', status: 'active' as const }
          ]
        }
      ],
      actions: [
        {
          id: 'view-org-chart',
          label: 'View Org Chart',
          icon: <Eye size={16} />,
          onClick: () => console.log('View organization chart')
        },
        {
          id: 'contact-hq',
          label: 'Contact HQ',
          icon: <Phone size={16} />,
          onClick: () => console.log('Contact headquarters')
        }
      ]
    },
    {
      id: 'care-facilities',
      title: 'Care Facilities Network',
      description: 'Residential and community care locations',
      value: '8 facilities',
      status: 'active' as const,
      badge: 'Network',
      children: [
        {
          id: 'oak-house',
          title: 'Oak House Care Home',
          description: 'Residential care facility - Yorkshire',
          value: '45 residents',
          status: 'active' as const,
          children: [
            { id: 'oak-nursing', title: 'Nursing Staff', value: '12 nurses', status: 'active' as const },
            { id: 'oak-care', title: 'Care Assistants', value: '18 assistants', status: 'active' as const },
            { id: 'oak-admin', title: 'Administrative', value: '3 staff', status: 'active' as const }
          ]
        },
        {
          id: 'maple-lodge',
          title: 'Maple Lodge',
          description: 'Specialist dementia care - Lancashire',
          value: '32 residents',
          status: 'active' as const,
          children: [
            { id: 'maple-nursing', title: 'Nursing Staff', value: '10 nurses', status: 'active' as const },
            { id: 'maple-care', title: 'Care Assistants', value: '15 assistants', status: 'active' as const },
            { id: 'maple-therapy', title: 'Therapy Team', value: '4 therapists', status: 'active' as const }
          ]
        },
        {
          id: 'community-services',
          title: 'Community Support Services',
          description: 'Home care and community outreach',
          value: '156 clients',
          status: 'active' as const,
          children: [
            { id: 'home-care', title: 'Home Care Team', value: '28 carers', status: 'active' as const },
            { id: 'day-services', title: 'Day Services', value: '12 staff', status: 'active' as const },
            { id: 'outreach', title: 'Community Outreach', value: '8 coordinators', status: 'active' as const }
          ]
        }
      ]
    }
  ];

  // Demo data for Progressive Disclosure
  const systemFeatures = [
    {
      id: 'care-management',
      title: 'Care Management System',
      description: 'Comprehensive care planning and delivery',
      icon: <Heart className="h-4 w-4" />,
      badge: 'Core',
      status: 'active' as const,
      content: (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Advanced care planning tools with AI-powered insights and real-time monitoring capabilities.
          </p>
          <div className="flex gap-2">
            <Badge variant="secondary">Care Plans</Badge>
            <Badge variant="secondary">Risk Assessment</Badge>
            <Badge variant="secondary">Progress Tracking</Badge>
          </div>
        </div>
      ),
      children: [
        {
          id: 'care-plans',
          title: 'Individual Care Plans',
          description: 'Personalized care planning for each service user',
          badge: '247 active',
          status: 'active' as const,
          expandable: false
        },
        {
          id: 'risk-assessment',
          title: 'Risk Assessment Tools',
          description: 'Comprehensive risk evaluation and mitigation',
          badge: '89% completion',
          status: 'active' as const,
          expandable: false
        },
        {
          id: 'progress-monitoring',
          title: 'Progress Monitoring',
          description: 'Real-time tracking of care outcomes',
          badge: 'Live data',
          status: 'active' as const,
          expandable: false
        }
      ]
    },
    {
      id: 'medication-management',
      title: 'Electronic Medication Records (eMAR)',
      description: 'Digital medication administration and tracking',
      icon: <Pill className="h-4 w-4" />,
      badge: 'Critical',
      status: 'active' as const,
      content: (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Fully integrated eMAR system with barcode scanning, drug interaction checks, and compliance reporting.
          </p>
          <div className="flex gap-2">
            <Badge variant="secondary">98.5% Compliance</Badge>
            <Badge variant="secondary">Drug Interactions</Badge>
            <Badge variant="secondary">Audit Trail</Badge>
          </div>
        </div>
      ),
      children: [
        {
          id: 'medication-rounds',
          title: 'Medication Rounds',
          description: 'Scheduled medication administration cycles',
          badge: '3 daily rounds',
          status: 'active' as const,
          expandable: false
        },
        {
          id: 'prescription-management',
          title: 'Prescription Management',
          description: 'Digital prescription handling and renewals',
          badge: '12 pending',
          status: 'warning' as const,
          expandable: false
        }
      ]
    },
    {
      id: 'ai-analytics',
      title: 'AI-Powered Analytics',
      description: 'Machine learning insights and predictions',
      icon: <BarChart3 className="h-4 w-4" />,
      badge: 'Premium',
      status: 'active' as const,
      content: (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Advanced analytics using machine learning to predict care needs, identify risks, and optimize operations.
          </p>
          <div className="flex gap-2">
            <Badge variant="secondary">Predictive Models</Badge>
            <Badge variant="secondary">Risk Prediction</Badge>
            <Badge variant="secondary">Resource Optimization</Badge>
          </div>
        </div>
      ),
      children: [
        {
          id: 'predictive-models',
          title: 'Predictive Care Models',
          description: 'AI models for predicting care needs and outcomes',
          badge: '15 active models',
          status: 'active' as const,
          expandable: false
        },
        {
          id: 'risk-prediction',
          title: 'Risk Prediction Engine',
          description: 'Early warning system for health deterioration',
          badge: '94% accuracy',
          status: 'active' as const,
          expandable: false
        }
      ]
    }
  ];

  // Quick Actions Demo
  const quickActionsDemo = [
    {
      id: 'emergency-protocol',
      title: 'Emergency Protocol',
      description: 'Activate emergency response procedures',
      icon: <AlertTriangle className="h-4 w-4" />,
      onClick: () => console.log('Emergency protocol activated'),
      status: 'error' as const
    },
    {
      id: 'staff-alert',
      title: 'Staff Alert System',
      description: 'Send alerts to on-duty staff members',
      icon: <Users className="h-4 w-4" />,
      onClick: () => console.log('Staff alert sent'),
      status: 'warning' as const
    },
    {
      id: 'quality-audit',
      title: 'Quality Audit',
      description: 'Start a comprehensive quality assessment',
      icon: <Award className="h-4 w-4" />,
      onClick: () => console.log('Quality audit initiated'),
      status: 'default' as const
    },
    {
      id: 'report-generation',
      title: 'Generate Reports',
      description: 'Create management and compliance reports',
      icon: <BarChart3 className="h-4 w-4" />,
      onClick: () => console.log('Report generation started'),
      status: 'default' as const
    }
  ];

  return (
    <BreadcrumbProvider>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold aegis-text-primary flex items-center justify-center gap-3">
            <Target className="h-8 w-8 text-primary" />
            Functional Depth Demonstration
          </h1>
          <p className="text-lg text-muted-foreground aegis-text-secondary max-w-3xl mx-auto">
            Experience AEGIS's hierarchical navigation, progressive disclosure, and contextual actions 
            that provide deep functional capabilities similar to NourishCare's interface patterns.
          </p>
        </div>

        {/* Breadcrumb Navigation */}
        <BreadcrumbNavigation
          items={[
            { id: 'demo', label: 'Functional Depth Demo', description: 'Interactive demonstration of hierarchical features' }
          ]}
          showHome={true}
        />

        {/* Demo Tabs */}
        <Tabs value={activeDemo} onValueChange={setActiveDemo} className="space-y-6">
          <TabsList className="aegis-card-glass grid grid-cols-4 w-full">
            <TabsTrigger value="kpi-drilldown" className="aegis-tab-text">
              <BarChart3 className="h-4 w-4 mr-2" />
              KPI Drill-down
            </TabsTrigger>
            <TabsTrigger value="hierarchical-data" className="aegis-tab-text">
              <Building className="h-4 w-4 mr-2" />
              Hierarchical Data
            </TabsTrigger>
            <TabsTrigger value="progressive-disclosure" className="aegis-tab-text">
              <ChevronRight className="h-4 w-4 mr-2" />
              Progressive Disclosure
            </TabsTrigger>
            <TabsTrigger value="contextual-actions" className="aegis-tab-text">
              <Settings className="h-4 w-4 mr-2" />
              Contextual Actions
            </TabsTrigger>
          </TabsList>

          {/* KPI Drill-down Demo */}
          <TabsContent value="kpi-drilldown" className="space-y-6">
            <Section
              title="Enhanced KPI with Drill-down"
              description="Click on any KPI to expand and explore hierarchical data breakdowns"
            >
              <EnhancedKPIGrid
                kpis={demoKPIs}
                columns={3}
                compact={false}
              />
            </Section>

            <Card className="aegis-card-glass">
              <CardHeader>
                <CardTitle className="aegis-text-primary">How it Works</CardTitle>
                <CardDescription className="aegis-text-secondary">
                  Each KPI provides multiple layers of drill-down functionality
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  <span className="text-sm">Click the expansion arrow to reveal breakdown data</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  <span className="text-sm">Use contextual actions menu for additional operations</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                  <span className="text-sm">Navigate through multiple levels of data hierarchy</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Hierarchical Data Demo */}
          <TabsContent value="hierarchical-data" className="space-y-6">
            <Section
              title="Hierarchical Organization Structure"
              description="Explore the multi-level organization structure with expandable sections"
            >
              <div className="space-y-4">
                {organizationHierarchy.map((item) => (
                  <HierarchicalCard
                    key={item.id}
                    title={item.title}
                    description={item.description}
                    value={item.value}
                    status={item.status}
                    badge={item.badge}
                    children={item.children}
                    actions={item.actions}
                    expandable={true}
                    onNavigate={(path) => console.log('Navigate to:', path)}
                  />
                ))}
              </div>
            </Section>
          </TabsContent>

          {/* Progressive Disclosure Demo */}
          <TabsContent value="progressive-disclosure" className="space-y-6">
            <Section
              title="System Features with Progressive Disclosure"
              description="Expand sections to reveal detailed information and functionality"
            >
              <ProgressiveDisclosure
                items={systemFeatures}
                title="AEGIS Core Features"
                description="Comprehensive feature set with detailed breakdowns"
                allowMultiple={true}
              />
            </Section>

            <Section
              title="Quick Actions Panel"
              description="Frequently used actions with instant access"
            >
              <QuickActionsDisclosure
                actions={quickActionsDemo}
                title="Emergency & Administrative Actions"
              />
            </Section>
          </TabsContent>

          {/* Contextual Actions Demo */}
          <TabsContent value="contextual-actions" className="space-y-6">
            <Section
              title="Contextual Actions Demonstration"
              description="Right-click or use action menus to access context-aware functionality"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Context Menu Demo */}
                <Card className="aegis-card-glass">
                  <CardHeader>
                    <CardTitle className="text-lg aegis-text-primary">Context Menu Actions</CardTitle>
                    <CardDescription className="aegis-text-secondary">
                      Right-click on this card to see contextual actions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ContextualActions
                      triggerType="context"
                      actions={getStandardActions('document')}
                    >
                      <div className="p-6 border-2 border-dashed border-border/40 rounded-lg text-center hover:border-primary/40 transition-colors">
                        <div className="space-y-2">
                          <Eye className="h-8 w-8 text-muted-foreground mx-auto" />
                          <p className="text-sm text-muted-foreground">
                            Right-click here to access contextual actions
                          </p>
                        </div>
                      </div>
                    </ContextualActions>
                  </CardContent>
                </Card>

                {/* Action Toolbar Demo */}
                <Card className="aegis-card-glass">
                  <CardHeader>
                    <CardTitle className="text-lg aegis-text-primary">Quick Actions Toolbar</CardTitle>
                    <CardDescription className="aegis-text-secondary">
                      Common actions available at a glance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <QuickActionsToolbar
                        actions={[
                          {
                            id: 'view',
                            label: 'View',
                            icon: <Eye className="h-4 w-4" />,
                            onClick: () => console.log('View action'),
                            keyboard: 'V'
                          },
                          {
                            id: 'edit',
                            label: 'Edit',
                            icon: <Edit className="h-4 w-4" />,
                            onClick: () => console.log('Edit action'),
                            keyboard: 'E'
                          },
                          {
                            id: 'share',
                            label: 'Share',
                            icon: <Share className="h-4 w-4" />,
                            onClick: () => console.log('Share action')
                          },
                          {
                            id: 'download',
                            label: 'Download',
                            icon: <Download className="h-4 w-4" />,
                            onClick: () => console.log('Download action')
                          },
                          {
                            id: 'refresh',
                            label: 'Refresh',
                            icon: <RefreshCw className="h-4 w-4" />,
                            onClick: () => console.log('Refresh action')
                          }
                        ]}
                        maxVisible={3}
                      />
                      <p className="text-xs text-muted-foreground">
                        First 3 actions visible, remaining in overflow menu
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </Section>
          </TabsContent>
        </Tabs>

        {/* Summary */}
        <Card className="aegis-card-glass border-l-4 border-l-primary">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Crown className="h-6 w-6 text-primary mt-1" />
              <div className="space-y-2">
                <h3 className="font-semibold aegis-text-primary">Functional Depth Achievement</h3>
                <p className="text-sm text-muted-foreground aegis-text-secondary">
                  AEGIS now provides comprehensive functional depth with hierarchical navigation, 
                  progressive disclosure, contextual actions, and deep drill-down capabilities that 
                  match and exceed the interaction patterns found in professional healthcare management systems.
                </p>
                <div className="flex gap-2 mt-3">
                  <Badge variant="secondary">Hierarchical Navigation</Badge>
                  <Badge variant="secondary">Progressive Disclosure</Badge>
                  <Badge variant="secondary">Contextual Actions</Badge>
                  <Badge variant="secondary">Deep Drill-down</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </BreadcrumbProvider>
  );
}