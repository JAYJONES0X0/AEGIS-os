import React, { useState, useCallback } from "react";
import { 
  Heart, 
  Users, 
  Pill, 
  Calendar, 
  Stethoscope, 
  FileText, 
  Shield, 
  AlertTriangle,
  UserCheck,
  BarChart3,
  Plus,
  Search,
  Filter,
  Download,
  Share,
  RefreshCw,
  Eye,
  Edit,
  Phone,
  Mail,
  MessageCircle,
  Star,
  Clock,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertCircle,
  Activity,
  Thermometer,
  Target,
  ClipboardList,
  Bed,
  Home,
  ArrowRight,
  ChevronRight
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { EnhancedKPI, EnhancedKPIGrid } from "../common/EnhancedKPI";
import { HierarchicalCard } from "../common/HierarchicalCard";
import { BreadcrumbNavigation, BreadcrumbProvider, useBreadcrumb } from "../common/BreadcrumbNavigation";
import { ProgressiveDisclosure, QuickActionsDisclosure, DataDrilldown } from "../common/ProgressiveDisclosure";
import { ContextualActions, QuickActionsToolbar, getStandardActions } from "../common/ContextualActions";
import { Section } from "../common/Section";

import { mockClients, mockStaff } from "../../lib/mock-data";

interface EnhancedHealthcareDomainProps {
  activeTab?: string;
  onNavigate?: (gateId: string, subTabId?: string) => void;
}

// Client Management with Functional Depth
function ClientManagementContent({ onNavigate }: { onNavigate?: (gateId: string, subTabId?: string) => void }) {
  const { pushItem } = useBreadcrumb();
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [filterQuery, setFilterQuery] = useState("");

  const handleClientDrillDown = useCallback((clientId: string) => {
    setSelectedClient(clientId);
    const client = mockClients.find(c => c.id === clientId);
    pushItem({
      id: clientId,
      label: client?.name || 'Client Details',
      description: 'Individual client care record'
    });
  }, [pushItem]);

  // Enhanced client data with hierarchical structure
  const clientsWithHierarchy = mockClients.map(client => ({
    id: client.id,
    title: client.name,
    description: `Age ${client.age} • ${client.careType}`,
    value: client.riskLevel,
    status: client.riskLevel === 'Low' ? 'completed' as const : 
           client.riskLevel === 'Medium' ? 'pending' as const : 'error' as const,
    badge: client.status,
    children: [
      {
        id: `${client.id}-care-plan`,
        title: 'Care Plan',
        description: 'Current care planning and goals',
        value: 'Active',
        status: 'active' as const,
        children: [
          { id: `${client.id}-daily-activities`, title: 'Daily Activities', value: '8 tasks', status: 'completed' as const },
          { id: `${client.id}-medical-needs`, title: 'Medical Needs', value: '3 conditions', status: 'pending' as const },
          { id: `${client.id}-social-goals`, title: 'Social Goals', value: '5 objectives', status: 'active' as const }
        ]
      },
      {
        id: `${client.id}-medications`,
        title: 'Medications',
        description: 'Current medication regime',
        value: '4 active',
        status: 'active' as const,
        children: [
          { id: `${client.id}-morning-meds`, title: 'Morning Medications', value: '2 items', status: 'completed' as const },
          { id: `${client.id}-evening-meds`, title: 'Evening Medications', value: '2 items', status: 'pending' as const }
        ]
      },
      {
        id: `${client.id}-observations`,
        title: 'Health Observations',
        description: 'Recent vital signs and assessments',
        value: 'Within normal',
        status: 'completed' as const,
        children: [
          { id: `${client.id}-vitals`, title: 'Vital Signs', value: 'Normal', status: 'completed' as const },
          { id: `${client.id}-mood`, title: 'Mood Assessment', value: 'Stable', status: 'completed' as const },
          { id: `${client.id}-mobility`, title: 'Mobility Check', value: 'Independent', status: 'completed' as const }
        ]
      },
      {
        id: `${client.id}-incidents`,
        title: 'Incident Reports',
        description: 'Safety incidents and follow-ups',
        value: client.riskLevel === 'High' ? '2 this month' : '0 this month',
        status: client.riskLevel === 'High' ? 'error' as const : 'completed' as const
      }
    ],
    actions: [
      {
        id: 'view-profile',
        label: 'View Full Profile',
        icon: <Eye size={16} />,
        onClick: () => handleClientDrillDown(client.id)
      },
      {
        id: 'edit-care-plan',
        label: 'Edit Care Plan',
        icon: <Edit size={16} />,
        onClick: () => console.log('Edit care plan', client.id)
      },
      {
        id: 'contact-family',
        label: 'Contact Family',
        icon: <Phone size={16} />,
        onClick: () => console.log('Contact family', client.id),
        group: 'Contact'
      },
      {
        id: 'send-message',
        label: 'Send Message',
        icon: <MessageCircle size={16} />,
        onClick: () => console.log('Send message', client.id),
        group: 'Contact'
      }
    ]
  }));

  const filteredClients = clientsWithHierarchy.filter(client =>
    client.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
    client.description.toLowerCase().includes(filterQuery.toLowerCase())
  );

  // Healthcare KPIs with drill-down
  const healthcareKPIs = [
    {
      label: "Active Care Plans",
      value: mockClients.length,
      description: "Currently active individual care plans",
      icon: <ClipboardList className="h-5 w-5" />,
      trend: 'up' as const,
      trendValue: '+2 this week',
      status: 'good' as const,
      breakdown: [
        {
          id: 'new-plans',
          label: 'New Plans This Week',
          value: 2,
          percentage: 8,
          status: 'good' as const
        },
        {
          id: 'reviewed-plans',
          label: 'Plans Under Review',
          value: 5,
          percentage: 20,
          status: 'warning' as const
        },
        {
          id: 'standard-plans',
          label: 'Standard Care Plans',
          value: 18,
          percentage: 72,
          status: 'good' as const
        }
      ]
    },
    {
      label: "Medication Adherence",
      value: 98.5,
      unit: '%',
      description: "Medication administration compliance rate",
      icon: <Pill className="h-5 w-5" />,
      trend: 'stable' as const,
      status: 'good' as const,
      target: 99,
      progress: 98.5,
      breakdown: [
        {
          id: 'on-time',
          label: 'On-Time Administration',
          value: '95%',
          percentage: 95,
          status: 'good' as const
        },
        {
          id: 'delayed',
          label: 'Delayed (< 30min)',
          value: '3.5%',
          percentage: 3.5,
          status: 'warning' as const
        },
        {
          id: 'missed',
          label: 'Missed Doses',
          value: '1.5%',
          percentage: 1.5,
          status: 'critical' as const
        }
      ]
    },
    {
      label: "Health Observations",
      value: 156,
      description: "Completed health checks today",
      icon: <Stethoscope className="h-5 w-5" />,
      trend: 'up' as const,
      trendValue: '+12 vs yesterday',
      status: 'good' as const,
      breakdown: [
        {
          id: 'vital-signs',
          label: 'Vital Signs',
          value: 89,
          percentage: 57,
          status: 'good' as const
        },
        {
          id: 'mood-assessment',
          label: 'Mood Assessments',
          value: 45,
          percentage: 29,
          status: 'good' as const
        },
        {
          id: 'mobility-checks',
          label: 'Mobility Checks',
          value: 22,
          percentage: 14,
          status: 'good' as const
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold aegis-text-primary flex items-center gap-3">
            <Users className="h-5 w-5 text-primary" />
            Client Care Management
          </h2>
          <Badge variant="secondary" className="text-xs">
            {mockClients.length} Active Clients
          </Badge>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search clients..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-64"
            />
          </div>
          
          <QuickActionsToolbar
            actions={[
              {
                id: 'add-client',
                label: 'Add Client',
                icon: <Plus className="h-4 w-4" />,
                onClick: () => console.log('Add new client')
              },
              {
                id: 'export-data',
                label: 'Export',
                icon: <Download className="h-4 w-4" />,
                onClick: () => console.log('Export client data')
              }
            ]}
          />
        </div>
      </div>

      {/* Healthcare KPIs */}
      <Section
        title="Healthcare Metrics"
        description="Key healthcare performance indicators"
      >
        <EnhancedKPIGrid
          kpis={healthcareKPIs}
          columns={3}
          compact={false}
        />
      </Section>

      {/* Client List with Hierarchical Drill-down */}
      <Section
        title="Client Portfolio"
        description="Comprehensive view of all service users"
      >
        <div className="space-y-4">
          {filteredClients.map((client) => (
            <HierarchicalCard
              key={client.id}
              title={client.title}
              description={client.description}
              value={client.value}
              status={client.status}
              badge={client.badge}
              children={client.children}
              actions={client.actions}
              expandable={true}
              onNavigate={(path) => console.log('Navigate to:', path)}
            />
          ))}
        </div>
      </Section>
    </div>
  );
}

// Medication Management with Progressive Disclosure
function MedicationManagementContent() {
  const medicationRounds = [
    {
      id: 'morning-round',
      title: 'Morning Medication Round',
      description: 'Due: 8:00 AM - 10:00 AM',
      badge: '12 clients',
      status: 'active' as const,
      content: (
        <div className="space-y-3">
          <div className="text-sm text-muted-foreground">
            Progress: 8/12 clients completed
          </div>
          <Progress value={66.7} className="h-2" />
        </div>
      ),
      children: [
        {
          id: 'completed-meds',
          title: 'Completed Administrations',
          badge: '8 clients',
          status: 'success' as const,
          expandable: false
        },
        {
          id: 'pending-meds',
          title: 'Pending Administrations',
          badge: '4 clients',
          status: 'warning' as const,
          expandable: false,
          actions: [
            {
              label: 'View Details',
              onClick: () => console.log('View pending medications'),
              icon: <Eye className="h-3 w-3" />
            }
          ]
        }
      ]
    },
    {
      id: 'afternoon-round',
      title: 'Afternoon Medication Round',
      description: 'Due: 2:00 PM - 4:00 PM',
      badge: '8 clients',
      status: 'default' as const,
      children: [
        {
          id: 'scheduled-afternoon',
          title: 'Scheduled Medications',
          badge: '8 clients',
          status: 'default' as const,
          expandable: false
        }
      ]
    },
    {
      id: 'evening-round',
      title: 'Evening Medication Round',
      description: 'Due: 6:00 PM - 8:00 PM',
      badge: '15 clients',
      status: 'default' as const,
      children: [
        {
          id: 'scheduled-evening',
          title: 'Scheduled Medications',
          badge: '15 clients',
          status: 'default' as const,
          expandable: false
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Pill className="h-6 w-6 text-primary" />
        <h2 className="text-xl font-semibold aegis-text-primary">Medication Management (eMAR)</h2>
      </div>

      <ProgressiveDisclosure
        items={medicationRounds}
        title="Daily Medication Rounds"
        description="Track and manage medication administration throughout the day"
        allowMultiple={true}
      />

      {/* Medication Alerts */}
      <Section
        title="Medication Alerts"
        description="Important medication-related notifications"
      >
        <div className="space-y-3">
          <Card className="aegis-card-glass border-l-4 border-l-yellow-400">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                <div className="flex-grow">
                  <h4 className="font-medium aegis-text-enhanced">Prescription Renewal Due</h4>
                  <p className="text-sm text-muted-foreground">3 clients require prescription renewals within 7 days</p>
                </div>
                <Button variant="outline" size="sm">
                  Review
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="aegis-card-glass border-l-4 border-l-blue-400">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-blue-400" />
                <div className="flex-grow">
                  <h4 className="font-medium aegis-text-enhanced">Delayed Administration</h4>
                  <p className="text-sm text-muted-foreground">2 medications administered late this morning</p>
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>
    </div>
  );
}

// Main Enhanced Healthcare Domain Component
export function EnhancedHealthcareDomain({ 
  activeTab = 'care-support', 
  onNavigate 
}: EnhancedHealthcareDomainProps) {
  return (
    <BreadcrumbProvider>
      <div className="p-6 space-y-6">
        {/* Breadcrumb Navigation */}
        <BreadcrumbNavigation
          items={[
            { id: 'healthcare', label: 'Healthcare', description: 'Clinical Care & Medical Management' }
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
            <TabsTrigger value="care-support" className="aegis-tab-text">
              <Users className="h-4 w-4 mr-2" />
              Care & Support
            </TabsTrigger>
            <TabsTrigger value="medications" className="aegis-tab-text">
              <Pill className="h-4 w-4 mr-2" />
              Medications (eMAR)
            </TabsTrigger>
            <TabsTrigger value="observations" className="aegis-tab-text">
              <Stethoscope className="h-4 w-4 mr-2" />
              Health Observations
            </TabsTrigger>
            <TabsTrigger value="appointments" className="aegis-tab-text">
              <Calendar className="h-4 w-4 mr-2" />
              Appointments
            </TabsTrigger>
            <TabsTrigger value="incidents" className="aegis-tab-text">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Incidents
            </TabsTrigger>
          </TabsList>

          <TabsContent value="care-support" className="space-y-6">
            <ClientManagementContent onNavigate={onNavigate} />
          </TabsContent>

          <TabsContent value="medications" className="space-y-6">
            <MedicationManagementContent />
          </TabsContent>

          <TabsContent value="observations" className="space-y-6">
            <div className="text-center py-12">
              <Stethoscope className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium aegis-text-primary">Health Observations</h3>
              <p className="text-muted-foreground aegis-text-secondary">Clinical monitoring and vital signs tracking</p>
            </div>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium aegis-text-primary">Appointments & Referrals</h3>
              <p className="text-muted-foreground aegis-text-secondary">GP appointments and healthcare referrals</p>
            </div>
          </TabsContent>

          <TabsContent value="incidents" className="space-y-6">
            <div className="text-center py-12">
              <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium aegis-text-primary">Incident Management</h3>
              <p className="text-muted-foreground aegis-text-secondary">Safety incidents and follow-up actions</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </BreadcrumbProvider>
  );
}