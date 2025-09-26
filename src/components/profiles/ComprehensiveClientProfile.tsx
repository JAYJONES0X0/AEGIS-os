import React, { useState, useEffect } from "react";
import { 
  User, 
  Home, 
  FileText, 
  Settings, 
  Heart, 
  Users, 
  ClipboardList, 
  Clock, 
  AlertTriangle,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Award,
  Activity,
  Pill,
  Stethoscope,
  Shield,
  Building,
  Camera,
  Edit,
  Save,
  Download,
  Share,
  Plus,
  Eye,
  Trash2,
  RefreshCw,
  ChevronRight,
  ChevronDown,
  Star,
  Flag,
  MessageCircle,
  Video,
  FileBarChart,
  Clipboard,
  BookOpen,
  Target,
  TrendingUp,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Progress } from "../ui/progress";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

import { HierarchicalCard } from "../common/HierarchicalCard";
import { ContextualActions } from "../common/ContextualActions";
import { BreadcrumbNavigation } from "../common/BreadcrumbNavigation";
import { Section } from "../common/Section";

import { mockClients } from "../../lib/mock-data";
import { navigationManager } from "../../lib/navigation-system";

interface ComprehensiveClientProfileProps {
  clientId: string;
  activeTab?: string;
  activeSubSection?: string;
  onNavigate?: (route: string, params?: any) => void;
}

// Assessment Categories (comprehensive list from Nourish and beyond)
const ASSESSMENT_CATEGORIES = [
  {
    id: 'current-state',
    title: 'Current State',
    description: 'Overall current condition and status',
    icon: <Activity className="h-4 w-4" />,
    status: 'completed',
    lastUpdated: '2024-01-15',
    dueDate: '2024-04-15'
  },
  {
    id: 'abilities',
    title: 'Abilities',
    description: 'Physical and cognitive abilities assessment',
    icon: <Target className="h-4 w-4" />,
    status: 'in-progress',
    lastUpdated: '2024-01-10',
    dueDate: '2024-02-10'
  },
  {
    id: 'about-me',
    title: 'About Me',
    description: 'Personal preferences and life history',
    icon: <User className="h-4 w-4" />,
    status: 'completed',
    lastUpdated: '2024-01-12',
    dueDate: '2024-07-12'
  },
  {
    id: 'adrt',
    title: 'Advance Decision to Refuse Treatment (ADRT)',
    description: 'Advanced directives and treatment preferences',
    icon: <FileText className="h-4 w-4" />,
    status: 'pending',
    lastUpdated: null,
    dueDate: '2024-02-01'
  },
  {
    id: 'allergies-intolerances',
    title: 'Allergies and Intolerances',
    description: 'Known allergies and food intolerances',
    icon: <AlertTriangle className="h-4 w-4" />,
    status: 'completed',
    lastUpdated: '2024-01-14',
    dueDate: '2024-07-14'
  },
  {
    id: 'anxiety-gad7',
    title: 'Anxiety Assessment - GAD-7',
    description: 'Generalized Anxiety Disorder assessment',
    icon: <Heart className="h-4 w-4" />,
    status: 'due',
    lastUpdated: '2023-10-15',
    dueDate: '2024-01-15'
  },
  {
    id: 'bed-rails',
    title: 'Bed Rails Risk Assessment',
    description: 'Safety assessment for bed rail usage',
    icon: <Shield className="h-4 w-4" />,
    status: 'completed',
    lastUpdated: '2024-01-08',
    dueDate: '2024-04-08'
  },
  {
    id: 'breathing',
    title: 'Breathing Assessment',
    description: 'Respiratory function and support needs',
    icon: <Activity className="h-4 w-4" />,
    status: 'completed',
    lastUpdated: '2024-01-13',
    dueDate: '2024-04-13'
  },
  {
    id: 'care-package',
    title: 'Care Package',
    description: 'Commissioned care package details',
    icon: <ClipboardList className="h-4 w-4" />,
    status: 'completed',
    lastUpdated: '2024-01-01',
    dueDate: '2024-12-31'
  },
  {
    id: 'choking-risk',
    title: 'Choking Risk Assessment',
    description: 'Swallowing and choking risk evaluation',
    icon: <AlertCircle className="h-4 w-4" />,
    status: 'completed',
    lastUpdated: '2024-01-11',
    dueDate: '2024-04-11'
  },
  {
    id: 'clinical-history',
    title: 'Clinical History and Medical Condition',
    description: 'Comprehensive medical history and current conditions',
    icon: <Stethoscope className="h-4 w-4" />,
    status: 'completed',
    lastUpdated: '2024-01-14',
    dueDate: '2024-07-14'
  },
  {
    id: 'communication',
    title: 'Communication Assessment',
    description: 'Communication abilities and support needs',
    icon: <MessageCircle className="h-4 w-4" />,
    status: 'completed',
    lastUpdated: '2024-01-09',
    dueDate: '2024-07-09'
  },
  {
    id: 'community-needs',
    title: 'Community Care Needs Assessment',
    description: 'Community-based care and support requirements',
    icon: <Building className="h-4 w-4" />,
    status: 'completed',
    lastUpdated: '2024-01-05',
    dueDate: '2024-07-05'
  },
  {
    id: 'continence',
    title: 'Continence Assessment',
    description: 'Bladder and bowel continence evaluation',
    icon: <Info className="h-4 w-4" />,
    status: 'completed',
    lastUpdated: '2024-01-12',
    dueDate: '2024-04-12'
  },
  {
    id: 'depression-phq9',
    title: 'Depression Assessment - PHQ-9',
    description: 'Patient Health Questionnaire depression screening',
    icon: <Heart className="h-4 w-4" />,
    status: 'due',
    lastUpdated: '2023-10-15',
    dueDate: '2024-01-15'
  },
  {
    id: 'dols',
    title: 'Deprivation of Liberty Safeguards (DoLS)',
    description: 'Mental capacity and liberty safeguards assessment',
    icon: <Shield className="h-4 w-4" />,
    status: 'not-applicable',
    lastUpdated: null,
    dueDate: null
  },
  {
    id: 'diet-nutrition',
    title: 'Diet and Nutrition',
    description: 'Nutritional needs and dietary requirements',
    icon: <Apple className="h-4 w-4" />,
    status: 'completed',
    lastUpdated: '2024-01-13',
    dueDate: '2024-04-13'
  },
  {
    id: 'distress',
    title: 'Distress Assessment',
    description: 'Psychological distress and coping evaluation',
    icon: <AlertTriangle className="h-4 w-4" />,
    status: 'pending',
    lastUpdated: null,
    dueDate: '2024-02-01'
  },
  {
    id: 'dnacpr',
    title: 'Do Not Attempt Cardiopulmonary Resuscitation (DNACPR) Decision',
    description: 'Resuscitation preferences and decisions',
    icon: <Heart className="h-4 w-4" />,
    status: 'not-applicable',
    lastUpdated: null,
    dueDate: null
  }
];

// Care Plan Categories  
const CARE_PLAN_CATEGORIES = [
  {
    id: 'accommodation',
    title: 'Accommodation Cleanliness and Comfort',
    description: 'Living environment and comfort needs',
    icon: <Home className="h-4 w-4" />,
    status: 'active',
    lastReviewed: '2024-01-10',
    nextReview: '2024-04-10'
  },
  {
    id: 'breathing',
    title: 'Breathing',
    description: 'Respiratory care and support',
    icon: <Activity className="h-4 w-4" />,
    status: 'active',
    lastReviewed: '2024-01-12',
    nextReview: '2024-04-12'
  },
  {
    id: 'communication-senses',
    title: 'Communication and Senses',
    description: 'Communication support and sensory needs',
    icon: <MessageCircle className="h-4 w-4" />,
    status: 'active',
    lastReviewed: '2024-01-08',
    nextReview: '2024-04-08'
  },
  {
    id: 'companionship',
    title: 'Companionship, Social Interaction and Recreation',
    description: 'Social engagement and recreational activities',
    icon: <Users className="h-4 w-4" />,
    status: 'active',
    lastReviewed: '2024-01-15',
    nextReview: '2024-04-15'
  },
  {
    id: 'daily-routine',
    title: 'Daily Routine',
    description: 'Daily activities and routine management',
    icon: <Clock className="h-4 w-4" />,
    status: 'active',
    lastReviewed: '2024-01-14',
    nextReview: '2024-04-14'
  },
  {
    id: 'eating-drinking',
    title: 'Eating and Drinking',
    description: 'Nutritional support and meal assistance',
    icon: <Info className="h-4 w-4" />,
    status: 'active',
    lastReviewed: '2024-01-13',
    nextReview: '2024-04-13'
  },
  {
    id: 'elimination',
    title: 'Elimination',
    description: 'Continence care and support',
    icon: <Info className="h-4 w-4" />,
    status: 'active',
    lastReviewed: '2024-01-11',
    nextReview: '2024-04-11'
  },
  {
    id: 'environment',
    title: 'Environment',
    description: 'Environmental safety and accessibility',
    icon: <Building className="h-4 w-4" />,
    status: 'active',
    lastReviewed: '2024-01-09',
    nextReview: '2024-04-09'
  },
  {
    id: 'equality-diversity',
    title: 'Equality, Diversity and Inclusion',
    description: 'Cultural and diversity considerations',
    icon: <Star className="h-4 w-4" />,
    status: 'active',
    lastReviewed: '2024-01-07',
    nextReview: '2024-07-07'
  },
  {
    id: 'expressing-sexuality',
    title: 'Expressing Sexuality',
    description: 'Sexual health and intimate relationship support',
    icon: <Heart className="h-4 w-4" />,
    status: 'active',
    lastReviewed: '2024-01-05',
    nextReview: '2024-07-05'
  },
  {
    id: 'financial',
    title: 'Financial',
    description: 'Financial management and support',
    icon: <Info className="h-4 w-4" />,
    status: 'active',
    lastReviewed: '2024-01-06',
    nextReview: '2024-07-06'
  },
  {
    id: 'health-wellbeing',
    title: 'Health and Wellbeing',
    description: 'Overall health maintenance and promotion',
    icon: <Heart className="h-4 w-4" />,
    status: 'active',
    lastReviewed: '2024-01-15',
    nextReview: '2024-04-15'
  },
  {
    id: 'infection-control',
    title: 'Infection Prevention and Control',
    description: 'Infection prevention and safety measures',
    icon: <Shield className="h-4 w-4" />,
    status: 'active',
    lastReviewed: '2024-01-12',
    nextReview: '2024-04-12'
  },
  {
    id: 'medication',
    title: 'Medication',
    description: 'Medication management and administration',
    icon: <Pill className="h-4 w-4" />,
    status: 'active',
    lastReviewed: '2024-01-14',
    nextReview: '2024-02-14'
  },
  {
    id: 'mental-health-cognition',
    title: 'Mental Health and Cognition',
    description: 'Mental health support and cognitive care',
    icon: <Heart className="h-4 w-4" />,
    status: 'active',
    lastReviewed: '2024-01-13',
    nextReview: '2024-04-13'
  },
  {
    id: 'mobility',
    title: 'Mobility',
    description: 'Mobility support and movement assistance',
    icon: <Activity className="h-4 w-4" />,
    status: 'active',
    lastReviewed: '2024-01-11',
    nextReview: '2024-04-11'
  },
  {
    id: 'pain',
    title: 'Pain',
    description: 'Pain management and comfort measures',
    icon: <AlertTriangle className="h-4 w-4" />,
    status: 'active',
    lastReviewed: '2024-01-10',
    nextReview: '2024-04-10'
  },
  {
    id: 'personal-care',
    title: 'Personal Care and Dressing',
    description: 'Personal hygiene and dressing support',
    icon: <User className="h-4 w-4" />,
    status: 'active',
    lastReviewed: '2024-01-15',
    nextReview: '2024-04-15'
  },
  {
    id: 'skin-integrity',
    title: 'Skin Integrity',
    description: 'Skin care and pressure prevention',
    icon: <Info className="h-4 w-4" />,
    status: 'active',
    lastReviewed: '2024-01-12',
    nextReview: '2024-04-12'
  },
  {
    id: 'sleeping',
    title: 'Sleeping',
    description: 'Sleep support and rest promotion',
    icon: <Clock className="h-4 w-4" />,
    status: 'active',
    lastReviewed: '2024-01-09',
    nextReview: '2024-04-09'
  },
  {
    id: 'spirituality',
    title: 'Spirituality, Religion and Culture',
    description: 'Spiritual and cultural support',
    icon: <Star className="h-4 w-4" />,
    status: 'active',
    lastReviewed: '2024-01-08',
    nextReview: '2024-07-08'
  },
  {
    id: 'personalised-interactions',
    title: 'Personalised Interactions',
    description: 'Individualized engagement and interaction',
    icon: <Users className="h-4 w-4" />,
    status: 'active',
    lastReviewed: '2024-01-14',
    nextReview: '2024-04-14'
  }
];

export function ComprehensiveClientProfile({ 
  clientId, 
  activeTab = 'profile', 
  activeSubSection = 'general',
  onNavigate 
}: ComprehensiveClientProfileProps) {
  const [client, setClient] = useState(mockClients.find(c => c.id === clientId));
  const [isEditing, setIsEditing] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  if (!client) {
    return (
      <div className="p-6 text-center">
        <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium">Client Not Found</h3>
        <p className="text-muted-foreground">The requested client profile could not be found.</p>
      </div>
    );
  }

  const handleNavigate = (route: string, params?: any) => {
    if (onNavigate) {
      onNavigate(route, { clientId, ...params });
    }
  };

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'active':
        return 'text-green-400';
      case 'in-progress':
      case 'due':
        return 'text-yellow-400';
      case 'pending':
        return 'text-orange-400';
      case 'overdue':
        return 'text-red-400';
      case 'not-applicable':
        return 'text-gray-400';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="secondary" className="bg-green-500/20 text-green-400">Completed</Badge>;
      case 'active':
        return <Badge variant="secondary" className="bg-green-500/20 text-green-400">Active</Badge>;
      case 'in-progress':
        return <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400">In Progress</Badge>;
      case 'due':
        return <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400">Due</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-orange-500/20 text-orange-400">Pending</Badge>;
      case 'overdue':
        return <Badge variant="destructive">Overdue</Badge>;
      case 'not-applicable':
        return <Badge variant="outline" className="text-gray-400">N/A</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="p-6">
          <BreadcrumbNavigation
            items={[
              { id: 'healthcare', label: 'Healthcare' },
              { id: 'clients', label: 'Clients' },
              { id: clientId, label: client.name }
            ]}
            onNavigate={(itemId) => {
              if (itemId === 'healthcare') handleNavigate('healthcare');
              if (itemId === 'clients') handleNavigate('healthcare-care-support');
            }}
          />

          <div className="flex items-start gap-6 mt-4">
            {/* Client Avatar and Basic Info */}
            <div className="flex-shrink-0">
              <Avatar className="h-24 w-24">
                <AvatarImage src={client.avatar} alt={client.name} />
                <AvatarFallback className="text-2xl">
                  {client.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Client Details */}
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold aegis-text-primary">{client.name}</h1>
                <Badge variant={client.status === 'Active' ? 'secondary' : 'outline'}>
                  {client.status}
                </Badge>
                {client.riskLevel !== 'Low' && (
                  <Badge variant={client.riskLevel === 'High' ? 'destructive' : 'secondary'}>
                    {client.riskLevel} Risk
                  </Badge>
                )}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Age:</span>
                  <div className="font-medium">{client.age} years</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Care Type:</span>
                  <div className="font-medium">{client.careType}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Location:</span>
                  <div className="font-medium">{client.location}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Assigned Carer:</span>
                  <div className="font-medium">{client.assignedCarer}</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex-shrink-0">
              <ContextualActions
                actions={[
                  {
                    id: 'edit-profile',
                    label: 'Edit Profile',
                    icon: <Edit size={16} />,
                    onClick: () => setIsEditing(!isEditing)
                  },
                  {
                    id: 'view-timeline',
                    label: 'View Timeline',
                    icon: <Clock size={16} />,
                    onClick: () => handleNavigate('client-timeline-overview')
                  },
                  {
                    id: 'contact-family',
                    label: 'Contact Family',
                    icon: <Phone size={16} />,
                    onClick: () => console.log('Contact family')
                  },
                  {
                    id: 'send-message',
                    label: 'Send Message',
                    icon: <MessageCircle size={16} />,
                    onClick: () => console.log('Send message')
                  },
                  {
                    id: 'video-call',
                    label: 'Video Call',
                    icon: <Video size={16} />,
                    onClick: () => console.log('Video call')
                  },
                  {
                    id: 'generate-report',
                    label: 'Generate Report',
                    icon: <FileBarChart size={16} />,
                    onClick: () => console.log('Generate report')
                  },
                  {
                    id: 'export-data',
                    label: 'Export Data',
                    icon: <Download size={16} />,
                    onClick: () => console.log('Export data')
                  },
                  {
                    id: 'share-profile',
                    label: 'Share Profile',
                    icon: <Share size={16} />,
                    onClick: () => console.log('Share profile')
                  }
                ]}
              />
            </div>
          </div>

          {/* Critical Information Bar */}
          <div className="mt-4 p-4 bg-card/80 rounded-lg border">
            <h3 className="font-medium mb-3 aegis-text-primary">Critical Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-red-400" />
                <div>
                  <div className="text-xs text-muted-foreground">HIGH RISK</div>
                  <div className="text-sm font-medium">Severe</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-400" />
                <div>
                  <div className="text-xs text-muted-foreground">ALLERGIES</div>
                  <div className="text-sm font-medium">Assessment Not Yet Completed</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-400" />
                <div>
                  <div className="text-xs text-muted-foreground">INTOLERANCE</div>
                  <div className="text-sm font-medium">Assessment Not Yet Completed</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-green-400" />
                <div>
                  <div className="text-xs text-muted-foreground">CLIENT TYPE</div>
                  <div className="text-sm font-medium">Community Care</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* Left Sidebar Navigation */}
        <div className="w-80 border-r border-border/20 bg-card/30 min-h-screen">
          <div className="p-4">
            <nav className="space-y-2">
              {/* Profile Section */}
              <div>
                <Button
                  variant={activeTab === 'profile' ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => handleNavigate('client-profile-general')}
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
                {activeTab === 'profile' && (
                  <div className="ml-6 mt-2 space-y-1">
                    <Button variant="ghost" size="sm" className="w-full justify-start text-xs"
                            onClick={() => handleNavigate('client-profile-general')}>
                      General Info
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-xs"
                            onClick={() => handleNavigate('client-profile-address')}>
                      Address / Room
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-xs"
                            onClick={() => handleNavigate('client-profile-biography')}>
                      Biography
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-xs"
                            onClick={() => handleNavigate('client-profile-status')}>
                      Status in Organisation
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-xs"
                            onClick={() => handleNavigate('client-profile-additional')}>
                      Additional Info
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-xs"
                            onClick={() => handleNavigate('client-profile-documents')}>
                      Documents
                    </Button>
                  </div>
                )}
              </div>

              {/* Circle of Care */}
              <Button
                variant={activeTab === 'circle-of-care' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => handleNavigate('client-circle-overview')}
              >
                <Users className="h-4 w-4 mr-2" />
                Circle of Care
              </Button>

              {/* Assessments */}
              <Button
                variant={activeTab === 'assessments' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => handleNavigate('client-assessments-overview')}
              >
                <ClipboardList className="h-4 w-4 mr-2" />
                Assessments
              </Button>

              {/* Timeline */}
              <Button
                variant={activeTab === 'timeline' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => handleNavigate('client-timeline-overview')}
              >
                <Clock className="h-4 w-4 mr-2" />
                Timeline
              </Button>

              {/* Care Plan */}
              <Button
                variant={activeTab === 'care-plan' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => handleNavigate('client-careplan-overview')}
              >
                <Clipboard className="h-4 w-4 mr-2" />
                Care Plan
              </Button>

              {/* Warnings */}
              <Button
                variant={activeTab === 'warnings' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => handleNavigate('client-warnings-overview')}
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Warnings
              </Button>
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6">
          {activeTab === 'profile' && (
            <ClientProfileContent 
              client={client} 
              activeSubSection={activeSubSection}
              isEditing={isEditing}
              onNavigate={handleNavigate}
            />
          )}
          
          {activeTab === 'assessments' && (
            <ClientAssessmentsContent 
              client={client}
              assessments={ASSESSMENT_CATEGORIES}
              onNavigate={handleNavigate}
            />
          )}
          
          {activeTab === 'care-plan' && (
            <ClientCarePlanContent 
              client={client}
              carePlanCategories={CARE_PLAN_CATEGORIES}
              onNavigate={handleNavigate}
            />
          )}
          
          {activeTab === 'circle-of-care' && (
            <CircleOfCareContent client={client} onNavigate={handleNavigate} />
          )}
          
          {activeTab === 'timeline' && (
            <TimelineContent client={client} onNavigate={handleNavigate} />
          )}
          
          {activeTab === 'warnings' && (
            <WarningsContent client={client} onNavigate={handleNavigate} />
          )}
        </div>
      </div>
    </div>
  );
}

// Component for Profile Content
function ClientProfileContent({ client, activeSubSection, isEditing, onNavigate }: any) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold aegis-text-primary">Profile Information</h2>
        <Button onClick={() => console.log('Edit profile')}>
          <Edit className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      {activeSubSection === 'general' && (
        <Card className="aegis-card-glass">
          <CardHeader>
            <CardTitle>General Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Full Name</Label>
                <Input value={client.name} readOnly={!isEditing} />
              </div>
              <div>
                <Label>Preferred Name</Label>
                <Input value={client.name.split(' ')[0]} readOnly={!isEditing} />
              </div>
              <div>
                <Label>Date of Birth</Label>
                <Input value="1980-03-15" readOnly={!isEditing} />
              </div>
              <div>
                <Label>Age</Label>
                <Input value={client.age} readOnly={!isEditing} />
              </div>
              <div>
                <Label>Gender</Label>
                <Select disabled={!isEditing}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>NHS Number</Label>
                <Input value="123 456 7890" readOnly={!isEditing} />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add more profile sections as needed */}
    </div>
  );
}

// Component for Assessments Content
function ClientAssessmentsContent({ client, assessments, onNavigate }: any) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold aegis-text-primary">Assessments</h2>
        <Button onClick={() => console.log('Add assessment')}>
          <Plus className="h-4 w-4 mr-2" />
          New Assessment
        </Button>
      </div>

      <div className="grid gap-4">
        {assessments.map((assessment: any) => (
          <Card 
            key={assessment.id} 
            className="aegis-card-glass cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onNavigate(`client-assessments-${assessment.id}`)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {assessment.icon}
                  <div>
                    <h3 className="font-medium aegis-text-enhanced">{assessment.title}</h3>
                    <p className="text-sm text-muted-foreground">{assessment.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {assessment.status && getStatusBadge(assessment.status)}
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              
              {assessment.lastUpdated && (
                <div className="mt-2 text-xs text-muted-foreground">
                  Last updated: {assessment.lastUpdated}
                  {assessment.dueDate && ` • Due: ${assessment.dueDate}`}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Component for Care Plan Content
function ClientCarePlanContent({ client, carePlanCategories, onNavigate }: any) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold aegis-text-primary">Care Plan</h2>
        <Button onClick={() => console.log('Review care plan')}>
          <Clipboard className="h-4 w-4 mr-2" />
          Review Plan
        </Button>
      </div>

      <div className="grid gap-4">
        {carePlanCategories.map((category: any) => (
          <Card 
            key={category.id} 
            className="aegis-card-glass cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onNavigate(`client-careplan-${category.id}`)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {category.icon}
                  <div>
                    <h3 className="font-medium aegis-text-enhanced">{category.title}</h3>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(category.status)}
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              
              <div className="mt-2 text-xs text-muted-foreground">
                Last reviewed: {category.lastReviewed} • Next review: {category.nextReview}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Component for Circle of Care Content
function CircleOfCareContent({ client, onNavigate }: any) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold aegis-text-primary">Circle of Care</h2>
      <p className="text-muted-foreground">Family, professional contacts, and support network information.</p>
      {/* Implementation details for circle of care */}
    </div>
  );
}

// Component for Timeline Content  
function TimelineContent({ client, onNavigate }: any) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold aegis-text-primary">Timeline</h2>
      <p className="text-muted-foreground">Chronological view of care activities, assessments, and incidents.</p>
      {/* Implementation details for timeline */}
    </div>
  );
}

// Component for Warnings Content
function WarningsContent({ client, onNavigate }: any) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold aegis-text-primary">Warnings & Alerts</h2>
      <p className="text-muted-foreground">Active warnings, risks, and safety alerts for this client.</p>
      {/* Implementation details for warnings */}
    </div>
  );
}