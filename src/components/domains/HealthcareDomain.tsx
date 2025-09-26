import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Heart, Calendar, Pill, Users, AlertTriangle, TrendingUp, Activity, Clock, ArrowRight, Search, Filter, Plus, CheckCircle, FileText, Shield, Stethoscope, UserCheck, BarChart3, Download, Eye, Settings, Share2, Brain, Zap, Target, Bell, CheckSquare, MessageSquare, ChevronRight, Thermometer, Headphones, Video, MapPin, Wifi, X, Clipboard, PhoneCall, Camera, Monitor, AlertCircle, Beaker, ClipboardList, UserPlus, Send, Save, RefreshCw, ExternalLink, Building, Laptop } from "lucide-react";
import { KPI } from "../common/KPI";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ScrollArea } from "../ui/scroll-area";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { ClientProfile } from "../profiles/ClientProfile";
import { mockClientProfiles, aeMedicationLibrary } from "../../lib/expanded-mock-data";
import { HealthcareHeartbeat, VitalSignPulse, MedicationPulse } from "../common/HealthcareHeartbeat";
import { toast } from "sonner@2.0.3";

interface HealthcareDomainProps {
  activeTab: string;
}

// Modal states and forms
interface VirtualRoundsState {
  isOpen: boolean;
  selectedWard?: string;
  participants: string[];
  duration: string;
  type: string;
}

interface NewAssessmentState {
  isOpen: boolean;
  clientId?: string;
  assessmentType: string;
  priority: string;
  assignedTo: string;
  notes: string;
}

interface AlertDetailsState {
  isOpen: boolean;
  alertId?: string;
  alertType?: string;
  clientName?: string;
  details?: string;
}

interface MedicationAdminState {
  isOpen: boolean;
  medicationId?: string;
  clientId?: string;
  dosage?: string;
  administered: boolean;
  administeredBy?: string;
  notes: string;
}

interface VitalsMonitoringState {
  isOpen: boolean;
  clientId?: string;
  vitalsType?: string;
  currentReading?: string;
  trending?: 'up' | 'down' | 'stable';
}

export function HealthcareDomain({ activeTab }: HealthcareDomainProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [realTimeData, setRealTimeData] = useState({
    urgentAlerts: 2,
    medicationsDue: 8,
    vitalsAbnormal: 1,
    careTasksPending: 5
  });
  const [isRealTimeConnected, setIsRealTimeConnected] = useState(true);
  
  // Modal states
  const [virtualRounds, setVirtualRounds] = useState<VirtualRoundsState>({
    isOpen: false,
    participants: [],
    duration: "30",
    type: "ward-round"
  });
  
  const [newAssessment, setNewAssessment] = useState<NewAssessmentState>({
    isOpen: false,
    assessmentType: "clinical",
    priority: "routine",
    assignedTo: "",
    notes: ""
  });

  const [alertDetails, setAlertDetails] = useState<AlertDetailsState>({
    isOpen: false
  });

  const [medicationAdmin, setMedicationAdmin] = useState<MedicationAdminState>({
    isOpen: false,
    administered: false,
    notes: ""
  });

  const [vitalsMonitoring, setVitalsMonitoring] = useState<VitalsMonitoringState>({
    isOpen: false
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        urgentAlerts: prev.urgentAlerts + Math.floor(Math.random() * 3) - 1,
        medicationsDue: Math.max(0, prev.medicationsDue + Math.floor(Math.random() * 3) - 1),
        vitalsAbnormal: Math.max(0, prev.vitalsAbnormal + Math.floor(Math.random() * 2) - 1),
        careTasksPending: Math.max(0, prev.careTasksPending + Math.floor(Math.random() * 4) - 2)
      }));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // Real-time alert system
  useEffect(() => {
    if (realTimeData.urgentAlerts > 3) {
      toast.error("Critical Alert: Multiple urgent client alerts require attention", {
        duration: 5000,
        action: { 
          label: "View", 
          onClick: () => {
            setAlertDetails({
              isOpen: true,
              alertType: "critical",
              clientName: "Multiple Clients",
              details: "Multiple urgent alerts require immediate attention"
            });
          }
        }
      });
    }
  }, [realTimeData.urgentAlerts]);

  // Interactive functions
  const handleVirtualRoundsOpen = () => {
    setVirtualRounds(prev => ({ ...prev, isOpen: true }));
    toast.info("Starting Virtual Rounds...", {
      description: "Preparing video conference for clinical team"
    });
  };

  const handleNewAssessmentOpen = () => {
    setNewAssessment(prev => ({ ...prev, isOpen: true }));
  };

  const handleKPIClick = (kpiLabel: string, value: string) => {
    switch (kpiLabel) {
      case "Urgent Alerts":
        setAlertDetails({
          isOpen: true,
          alertType: "urgent",
          clientName: "Various Clients",
          details: `${value} urgent alerts requiring immediate attention`
        });
        break;
      case "Medications Due":
        toast.info(`${value} medications due in next 2 hours`, {
          action: { 
            label: "View eMAR", 
            onClick: () => {
              // Simulate tab switch to medications
              window.dispatchEvent(new CustomEvent('navigate-to-tab', { detail: 'medications' }));
            }
          }
        });
        break;
      case "Vital Signs":
        if (value.includes("abnormal")) {
          setVitalsMonitoring({
            isOpen: true,
            clientId: "client-1",
            vitalsType: "abnormal",
            currentReading: "Blood Pressure: 160/95 mmHg",
            trending: "up"
          });
        }
        break;
      case "Active Clients":
        toast.info(`${value} active clients under care`, {
          description: "Click to view client overview"
        });
        break;
      case "Care Tasks":
        toast.info(`${value} care tasks pending completion`, {
          action: { 
            label: "View Tasks", 
            onClick: () => {
              toast.success("Navigating to care task management...");
            }
          }
        });
        break;
      default:
        toast.info(`${kpiLabel}: ${value}`);
    }
  };

  const handleMedicationAdminister = (medId: string, clientId: string) => {
    setMedicationAdmin({
      isOpen: true,
      medicationId: medId,
      clientId: clientId,
      administered: false,
      notes: ""
    });
  };

  const handleVirtualRoundsSubmit = () => {
    toast.success("Virtual Rounds Started!", {
      description: `${virtualRounds.participants.length} participants joined for ${virtualRounds.duration} minutes`
    });
    setVirtualRounds(prev => ({ ...prev, isOpen: false }));
  };

  const handleNewAssessmentSubmit = () => {
    toast.success("Assessment Created!", {
      description: `${newAssessment.assessmentType} assessment assigned to ${newAssessment.assignedTo}`
    });
    setNewAssessment(prev => ({ 
      ...prev, 
      isOpen: false,
      assessmentType: "clinical",
      priority: "routine",
      assignedTo: "",
      notes: ""
    }));
  };

  const handleMedicationAdminSubmit = () => {
    if (medicationAdmin.administered) {
      toast.success("Medication Administered", {
        description: "eMAR updated with administration details"
      });
    } else {
      toast.warning("Medication Not Administered", {
        description: "Reason recorded in care notes"
      });
    }
    setMedicationAdmin({
      isOpen: false,
      administered: false,
      notes: ""
    });
  };

  // If a client is selected, show their profile
  if (selectedClient) {
    return (
      <ClientProfile
        clientId={selectedClient}
        onBack={() => setSelectedClient(null)}
      />
    );
  }

  // Helper functions
  const getConditionColor = (status: string) => {
    switch (status) {
      case 'Stable': return 'success';
      case 'Monitoring': return 'warning';
      case 'Critical': return 'destructive';
      default: return 'secondary';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'destructive';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'secondary';
    }
  };

  // Enhanced healthcare KPIs with real-time data and click handlers
  const healthcareKPIs = [
    { 
      label: "Active Clients", 
      value: mockClientProfiles.length.toString(), 
      trend: "+2", 
      icon: <Users className="w-5 h-5" />,
      description: "Under care",
      realTime: true,
      onClick: () => handleKPIClick("Active Clients", mockClientProfiles.length.toString())
    },
    { 
      label: "Urgent Alerts", 
      value: realTimeData.urgentAlerts.toString(), 
      trend: realTimeData.urgentAlerts > 2 ? "↑" : "↓", 
      icon: <AlertTriangle className="w-5 h-5" />,
      description: "Require attention",
      realTime: true,
      status: realTimeData.urgentAlerts > 2 ? 'critical' : 'normal',
      onClick: () => handleKPIClick("Urgent Alerts", realTimeData.urgentAlerts.toString())
    },
    { 
      label: "Medications Due", 
      value: realTimeData.medicationsDue.toString(), 
      trend: "+3", 
      icon: <Pill className="w-5 h-5" />,
      description: "Next 2 hours",
      realTime: true,
      status: realTimeData.medicationsDue > 10 ? 'warning' : 'normal',
      onClick: () => handleKPIClick("Medications Due", realTimeData.medicationsDue.toString())
    },
    { 
      label: "Care Tasks", 
      value: realTimeData.careTasksPending.toString(), 
      trend: "+0.1", 
      icon: <CheckSquare className="w-5 h-5" />,
      description: "Pending completion",
      realTime: true,
      onClick: () => handleKPIClick("Care Tasks", realTimeData.careTasksPending.toString())
    },
    { 
      label: "Vital Signs", 
      value: `${realTimeData.vitalsAbnormal} abnormal`, 
      trend: realTimeData.vitalsAbnormal === 0 ? "✓" : "!",
      icon: <Activity className="w-5 h-5" />,
      description: "Live monitoring",
      realTime: true,
      status: realTimeData.vitalsAbnormal > 0 ? 'warning' : 'normal',
      onClick: () => handleKPIClick("Vital Signs", `${realTimeData.vitalsAbnormal} abnormal`)
    },
    { 
      label: "Care Satisfaction", 
      value: "4.8/5", 
      trend: "+0.1", 
      icon: <Heart className="w-5 h-5" />,
      description: "Average rating",
      realTime: false,
      onClick: () => handleKPIClick("Care Satisfaction", "4.8/5")
    },
  ];

  // Render functions - defined before getTabContent to avoid hoisting issues
  const renderCareSupportOverview = () => (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Real-time Status Bar */}
      <Card 
        className="p-4 transition-all duration-500 ease-in-out aegis-ceremonial-hover"
        style={{
          background: 'rgba(18, 22, 28, 0.4)',
          border: '1px solid rgba(212, 175, 55, 0.2)',
          borderRadius: '12px',
          boxShadow: 'inset 0 1px 0 rgba(212, 175, 55, 0.15), 0 4px 16px rgba(0, 0, 0, 0.3)',
          backdropFilter: 'none'
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${isRealTimeConnected ? 'bg-success' : 'bg-destructive'} animate-pulse`} />
            <span className="text-sm font-medium text-foreground">
              {isRealTimeConnected ? 'Real-time monitoring active' : 'Connection lost'}
            </span>
            <Wifi className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>Last update: {new Date().toLocaleTimeString()}</span>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-6 px-2"
              onClick={() => toast.info("Opening monitoring settings...", {
                description: "Configure real-time alerts and thresholds"
              })}
            >
              <Settings className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Healthcare KPIs Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {healthcareKPIs.map((kpi, index) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div 
              onClick={kpi.onClick}
              className="cursor-pointer transition-transform hover:scale-105"
            >
              <KPI
                label={kpi.label}
                value={kpi.value}
                trend={kpi.trend}
                icon={kpi.icon}
                description={kpi.description}
                className="aegis-kpi"
                realTime={kpi.realTime}
                status={kpi.status}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Client Overview */}
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
          <h3 className="text-lg font-semibold text-foreground">Client Care Overview</h3>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64"
            />
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => toast.info("Opening client filters...", {
                description: "Filter by care level, condition, or status"
              })}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button 
              size="sm"
              onClick={() => toast.info("Opening new client registration...", {
                description: "Add new client to the system"
              })}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Client
            </Button>
          </div>
        </div>

        <ScrollArea className="h-[400px]">
          <div className="space-y-3 pr-4">
            {mockClientProfiles
              .filter(client => 
                client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                client.careLevel.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((client, index) => (
                <motion.div
                  key={client.id}
                  className="flex items-center justify-between p-4 rounded-lg cursor-pointer aegis-ceremonial-hover"
                  style={{
                    background: 'rgba(212, 175, 55, 0.03)',
                    border: '1px solid rgba(212, 175, 55, 0.08)',
                    backdropFilter: 'none'
                  }}
                  onClick={() => setSelectedClient(client.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -2, scale: 1.01 }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary border-2 border-primary/20">
                      {client.initials}
                    </div>
                    <div className="space-y-1">
                      <div className="font-medium text-foreground">{client.name}</div>
                      <div className="text-sm text-muted-foreground">Age {client.age} • {client.room}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant={getConditionColor(client.status)} size="sm">
                      {client.status}
                    </Badge>
                    <Badge variant={getRiskColor(client.riskLevel)} size="sm">
                      {client.riskLevel}
                    </Badge>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </motion.div>
              ))}
          </div>
        </ScrollArea>
      </Card>
    </motion.div>
  );

  const renderMedications = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
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
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Pill className="w-5 h-5 text-primary" />
          eMAR - Electronic Medication Administration Records
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {mockClientProfiles.slice(0, 4).map((client, clientIndex) => 
            client.medications.slice(0, 2).map((medication, medIndex) => (
              <motion.div
                key={`${client.id}-${medIndex}`}
                className="p-4 rounded-lg aegis-ceremonial-hover cursor-pointer"
                style={{
                  background: 'rgba(212, 175, 55, 0.03)',
                  border: '1px solid rgba(212, 175, 55, 0.08)',
                  backdropFilter: 'none'
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (clientIndex * 2 + medIndex) * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleMedicationAdminister(`${client.id}-${medIndex}`, client.id)}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm">{client.name}</div>
                    <div className="flex items-center gap-2">
                      <Badge variant="warning" size="sm">
                        Due
                      </Badge>
                      <Button size="sm" variant="outline" className="h-6 w-6 p-0">
                        <Pill className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">{medication.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {medication.dosage} • {medication.time}
                  </div>
                  <div className="text-xs text-primary">
                    Prescribed by: {medication.prescriber}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 italic">
                    Click to administer medication
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        <div className="mt-6">
          <h4 className="font-semibold mb-3">AE Medication Library</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-60 overflow-y-auto">
            {aeMedicationLibrary.slice(0, 9).map((med, index) => (
              <motion.div
                key={med.id}
                className="p-3 rounded aegis-ceremonial-hover cursor-pointer"
                style={{
                  background: 'rgba(212, 175, 55, 0.02)',
                  border: '1px solid rgba(212, 175, 55, 0.06)',
                  backdropFilter: 'none'
                }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => toast.info(`Viewing ${med.name} details`, {
                  description: `${med.category} medication for ${med.indication}`
                })}
              >
                <div className="font-medium text-sm text-primary">{med.name}</div>
                <div className="text-xs text-muted-foreground">{med.category} • {med.indication}</div>
                <div className="text-xs text-muted-foreground">Strengths: {med.strengths.join(', ')}</div>
                <div className="text-xs text-muted-foreground mt-1 italic">Click for details</div>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );

  const renderObservations = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
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
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Stethoscope className="w-5 h-5 text-primary" />
          Clinical Observations (NEWS2)
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div 
            className="cursor-pointer transition-transform hover:scale-105" 
            onClick={() => setVitalsMonitoring({ isOpen: true, clientId: "client-1", vitalsType: "heart-rate", currentReading: "72 BPM", trending: "stable" })}
          >
            <VitalSignPulse value="72" label="Heart Rate" status="normal" unit=" BPM" />
          </div>
          <div 
            className="cursor-pointer transition-transform hover:scale-105" 
            onClick={() => setVitalsMonitoring({ isOpen: true, clientId: "client-1", vitalsType: "blood-pressure", currentReading: "120/80 mmHg", trending: "stable" })}
          >
            <VitalSignPulse value="120/80" label="Blood Pressure" status="normal" unit=" mmHg" />
          </div>
          <div 
            className="cursor-pointer transition-transform hover:scale-105" 
            onClick={() => setVitalsMonitoring({ isOpen: true, clientId: "client-1", vitalsType: "respiratory", currentReading: "18/min", trending: "up" })}
          >
            <VitalSignPulse value="18" label="Respiratory Rate" status="warning" unit="/min" />
          </div>
          <div 
            className="cursor-pointer transition-transform hover:scale-105" 
            onClick={() => setVitalsMonitoring({ isOpen: true, clientId: "client-1", vitalsType: "temperature", currentReading: "36.5°C", trending: "stable" })}
          >
            <VitalSignPulse value="36.5" label="Temperature" status="normal" unit="°C" />
          </div>
        </div>
        
        <HealthcareHeartbeat type="observation" intensity="low">
          <Card 
            className="p-8 transition-all duration-500 ease-in-out aegis-ceremonial-hover"
            style={{
              background: 'rgba(18, 22, 28, 0.12)',
              border: '1px solid rgba(212, 175, 55, 0.1)',
              borderRadius: '16px',
              boxShadow: 'inset 0 1px 0 rgba(212, 175, 55, 0.08), 0 4px 20px rgba(0, 0, 0, 0.25)',
              backdropFilter: 'none'
            }}
          >
            <div className="text-center space-y-4">
              <HealthcareHeartbeat type="vital" intensity="medium">
                <Stethoscope className="w-12 h-12 text-primary mx-auto" />
              </HealthcareHeartbeat>
              <div>
                <h3 className="text-lg font-semibold">NEWS2 Clinical Monitoring</h3>
                <p className="text-sm text-muted-foreground">Real-time vital signs monitoring</p>
                <div className="flex items-center justify-center gap-2 mt-4">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-xs text-success">All systems monitoring</span>
                </div>
              </div>
            </div>
          </Card>
        </HealthcareHeartbeat>
      </Card>
    </motion.div>
  );

  // Complete tab implementations
  const renderCarePlanning = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Card className="p-6 aegis-ceremonial-card">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-primary" />
          Care Planning & Coordination
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium">Active Care Plans</h4>
            {mockClientProfiles.slice(0, 3).map((client, index) => (
              <div 
                key={client.id} 
                className="p-4 bg-muted/20 rounded-lg cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => toast.info(`Opening care plan for ${client.name}`)}
              >
                <div className="font-medium">{client.name}</div>
                <div className="text-sm text-muted-foreground">Care Level: {client.careLevel}</div>
                <div className="text-xs text-primary">Last updated: 2 hours ago</div>
              </div>
            ))}
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">Care Plan Templates</h4>
            {[
              "Post-Surgical Recovery",
              "Diabetes Management",
              "Mental Health Support",
              "Palliative Care",
              "Rehabilitation Program"
            ].map((template, index) => (
              <div 
                key={index}
                className="p-3 bg-primary/10 rounded cursor-pointer hover:bg-primary/15 transition-colors"
                onClick={() => toast.info(`Creating new care plan: ${template}`)}
              >
                <div className="text-sm font-medium">{template}</div>
                <div className="text-xs text-muted-foreground">Click to create new plan</div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );

  const renderClinicalWorkflows = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Card className="p-6 aegis-ceremonial-card">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          Clinical Workflows & Protocols
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "Admission Workflow", status: "Active", count: 3 },
            { name: "Discharge Planning", status: "In Progress", count: 7 },
            { name: "Medication Review", status: "Scheduled", count: 12 },
            { name: "Risk Assessment", status: "Overdue", count: 2 },
            { name: "Family Conference", status: "Pending", count: 4 },
            { name: "Clinical Handover", status: "Active", count: 8 }
          ].map((workflow, index) => (
            <div 
              key={index}
              className="p-4 bg-muted/20 rounded-lg cursor-pointer hover:bg-muted/30 transition-colors"
              onClick={() => toast.info(`Opening ${workflow.name} workflow`)}
            >
              <div className="font-medium">{workflow.name}</div>
              <div className="text-sm text-muted-foreground">{workflow.status}</div>
              <div className="text-sm text-primary">{workflow.count} pending tasks</div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );

  const renderTelemedicine = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Card className="p-6 aegis-ceremonial-card">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Video className="w-5 h-5 text-primary" />
          Telehealth & Remote Monitoring
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium">Active Sessions</h4>
            <div className="space-y-3">
              <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                  <span className="font-medium">Dr. Smith - Family Consultation</span>
                </div>
                <div className="text-sm text-muted-foreground mt-1">Duration: 22:35</div>
              </div>
            </div>
            
            <h4 className="font-medium mt-6">Scheduled Consultations</h4>
            {[
              { time: "14:30", patient: "Mrs. Johnson", type: "Follow-up" },
              { time: "15:15", patient: "Mr. Williams", type: "Medication Review" },
              { time: "16:00", patient: "Ms. Brown", type: "Assessment" }
            ].map((session, index) => (
              <div 
                key={index}
                className="p-3 bg-muted/20 rounded cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => toast.info(`Joining session with ${session.patient}`)}
              >
                <div className="flex justify-between">
                  <span className="font-medium">{session.time} - {session.patient}</span>
                  <Badge variant="outline">{session.type}</Badge>
                </div>
              </div>
            ))}
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                className="h-20 flex-col gap-2"
                onClick={() => toast.info("Starting new consultation...")}
              >
                <Video className="w-6 h-6" />
                Start Call
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col gap-2"
                onClick={() => toast.info("Scheduling consultation...")}
              >
                <Calendar className="w-6 h-6" />
                Schedule
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col gap-2"
                onClick={() => toast.info("Viewing remote monitoring data...")}
              >
                <Monitor className="w-6 h-6" />
                Remote Monitor
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col gap-2"
                onClick={() => toast.info("Accessing patient portal...")}
              >
                <Laptop className="w-6 h-6" />
                Patient Portal
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );

  const renderEmergencyResponse = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Card className="p-6 aegis-ceremonial-card">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-destructive" />
          Emergency Response & Crisis Management
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <h4 className="font-medium text-destructive">Emergency Contacts</h4>
              <div className="space-y-2 mt-2">
                <div className="flex justify-between text-sm">
                  <span>Emergency Services</span>
                  <Button size="sm" variant="destructive" onClick={() => toast.error("Calling Emergency Services...")}>
                    <PhoneCall className="w-3 h-3 mr-1" />
                    999
                  </Button>
                </div>
                <div className="flex justify-between text-sm">
                  <span>On-Call Doctor</span>
                  <Button size="sm" variant="outline" onClick={() => toast.info("Calling on-call doctor...")}>
                    <PhoneCall className="w-3 h-3 mr-1" />
                    Call
                  </Button>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Crisis Team</span>
                  <Button size="sm" variant="outline" onClick={() => toast.info("Alerting crisis team...")}>
                    <Bell className="w-3 h-3 mr-1" />
                    Alert
                  </Button>
                </div>
              </div>
            </div>
            
            <h4 className="font-medium">Emergency Protocols</h4>
            {[
              "Cardiac Arrest Response",
              "Mental Health Crisis",
              "Falls Prevention",
              "Medical Emergency",
              "Fire Evacuation"
            ].map((protocol, index) => (
              <div 
                key={index}
                className="p-3 bg-warning/10 border border-warning/20 rounded cursor-pointer hover:bg-warning/15 transition-colors"
                onClick={() => toast.warning(`Activating ${protocol} protocol`)}
              >
                <div className="font-medium">{protocol}</div>
                <div className="text-xs text-muted-foreground">Click to activate</div>
              </div>
            ))}
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">Recent Incidents</h4>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-muted/20 rounded">
                <div className="font-medium">Minor Fall - Room 204</div>
                <div className="text-muted-foreground">Resolved • 2 hours ago</div>
              </div>
              <div className="p-3 bg-muted/20 rounded">
                <div className="font-medium">Medication Error Alert</div>
                <div className="text-muted-foreground">Under Investigation • 6 hours ago</div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );

  const renderReportsAnalytics = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Card className="p-6 aegis-ceremonial-card">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          Reports & Clinical Analytics
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "Daily Census Report", type: "Operational", icon: <Building className="w-4 h-4" /> },
            { name: "Medication Administration", type: "Clinical", icon: <Pill className="w-4 h-4" /> },
            { name: "Incident Analysis", type: "Quality", icon: <AlertTriangle className="w-4 h-4" /> },
            { name: "Staffing Levels", type: "HR", icon: <Users className="w-4 h-4" /> },
            { name: "Patient Outcomes", type: "Clinical", icon: <TrendingUp className="w-4 h-4" /> },
            { name: "Financial Summary", type: "Finance", icon: <BarChart3 className="w-4 h-4" /> }
          ].map((report, index) => (
            <div 
              key={index}
              className="p-4 bg-muted/20 rounded-lg cursor-pointer hover:bg-muted/30 transition-colors"
              onClick={() => toast.info(`Generating ${report.name} report...`)}
            >
              <div className="flex items-center gap-2 mb-2">
                {report.icon}
                <span className="font-medium">{report.name}</span>
              </div>
              <Badge variant="outline" size="sm">{report.type}</Badge>
              <div className="text-xs text-muted-foreground mt-2">Click to generate</div>
            </div>
          ))}
        </div>
        
        <div className="flex gap-3 mt-6">
          <Button onClick={() => toast.success("Downloading all reports...")}>
            <Download className="w-4 h-4 mr-2" />
            Download All Reports
          </Button>
          <Button variant="outline" onClick={() => toast.info("Opening analytics dashboard...")}>
            <ExternalLink className="w-4 h-4 mr-2" />
            Advanced Analytics
          </Button>
        </div>
      </Card>
    </motion.div>
  );

  // Enhanced healthcare tab content with comprehensive clinical workflows
  const getTabContent = () => {
    switch (activeTab) {
      case "overview":
        return renderCareSupportOverview();
      case "medications":
        return renderMedications();
      case "observations":
        return renderObservations();
      case "care-planning":
        return renderCarePlanning();
      case "clinical-workflows":
        return renderClinicalWorkflows();
      case "telemedicine":
        return renderTelemedicine();
      case "emergency-response":
        return renderEmergencyResponse();
      case "reports":
        return renderReportsAnalytics();
      default:
        return renderCareSupportOverview();
    }
  };

  // Modal Components
  const VirtualRoundsModal = () => (
    <Dialog open={virtualRounds.isOpen} onOpenChange={(open) => setVirtualRounds(prev => ({ ...prev, isOpen: open }))}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Video className="w-5 h-5 text-primary" />
            Start Virtual Rounds
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="ward-select">Select Ward/Unit</Label>
            <Select value={virtualRounds.selectedWard} onValueChange={(value) => setVirtualRounds(prev => ({ ...prev, selectedWard: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Choose ward..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="icu">ICU - Intensive Care</SelectItem>
                <SelectItem value="medical">Medical Ward A</SelectItem>
                <SelectItem value="surgical">Surgical Ward B</SelectItem>
                <SelectItem value="geriatric">Geriatric Care</SelectItem>
                <SelectItem value="mental">Mental Health Unit</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Select value={virtualRounds.duration} onValueChange={(value) => setVirtualRounds(prev => ({ ...prev, duration: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="45">45 minutes</SelectItem>
                <SelectItem value="60">60 minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="type">Round Type</Label>
            <Select value={virtualRounds.type} onValueChange={(value) => setVirtualRounds(prev => ({ ...prev, type: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ward-round">Ward Round</SelectItem>
                <SelectItem value="multidisciplinary">Multidisciplinary Team</SelectItem>
                <SelectItem value="emergency">Emergency Consultation</SelectItem>
                <SelectItem value="family">Family Conference</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button className="flex-1" onClick={handleVirtualRoundsSubmit}>
              <Camera className="w-4 h-4 mr-2" />
              Start Meeting
            </Button>
            <Button variant="outline" onClick={() => setVirtualRounds(prev => ({ ...prev, isOpen: false }))}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const NewAssessmentModal = () => (
    <Dialog open={newAssessment.isOpen} onOpenChange={(open) => setNewAssessment(prev => ({ ...prev, isOpen: open }))}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-primary" />
            Create New Assessment
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="assessment-type">Assessment Type</Label>
              <Select value={newAssessment.assessmentType} onValueChange={(value) => setNewAssessment(prev => ({ ...prev, assessmentType: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clinical">Clinical Assessment</SelectItem>
                  <SelectItem value="mental-health">Mental Health</SelectItem>
                  <SelectItem value="nutrition">Nutritional Assessment</SelectItem>
                  <SelectItem value="mobility">Mobility Assessment</SelectItem>
                  <SelectItem value="falls-risk">Falls Risk</SelectItem>
                  <SelectItem value="cognitive">Cognitive Assessment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="priority">Priority Level</Label>
              <Select value={newAssessment.priority} onValueChange={(value) => setNewAssessment(prev => ({ ...prev, priority: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="urgent">🔴 Urgent</SelectItem>
                  <SelectItem value="high">🟡 High</SelectItem>
                  <SelectItem value="routine">🟢 Routine</SelectItem>
                  <SelectItem value="scheduled">📅 Scheduled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="assigned-to">Assign To</Label>
            <Select value={newAssessment.assignedTo} onValueChange={(value) => setNewAssessment(prev => ({ ...prev, assignedTo: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select clinician..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dr-smith">Dr. Sarah Smith - Consultant</SelectItem>
                <SelectItem value="nurse-jones">Nurse Mary Jones - Senior RN</SelectItem>
                <SelectItem value="dr-brown">Dr. Michael Brown - Registrar</SelectItem>
                <SelectItem value="therapist-wilson">Lisa Wilson - Physiotherapist</SelectItem>
                <SelectItem value="psychologist-davis">Dr. James Davis - Psychologist</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea 
              value={newAssessment.notes}
              onChange={(e) => setNewAssessment(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Enter any specific requirements or observations..."
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button className="flex-1" onClick={handleNewAssessmentSubmit}>
              <Save className="w-4 h-4 mr-2" />
              Create Assessment
            </Button>
            <Button variant="outline" onClick={() => setNewAssessment(prev => ({ ...prev, isOpen: false }))}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const AlertDetailsModal = () => (
    <Dialog open={alertDetails.isOpen} onOpenChange={(open) => setAlertDetails(prev => ({ ...prev, isOpen: open }))}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-destructive" />
            Alert Details
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div className="font-semibold text-destructive">
              {alertDetails.alertType?.toUpperCase()} ALERT
            </div>
            <div className="text-sm mt-1">{alertDetails.clientName}</div>
            <div className="text-sm text-muted-foreground mt-2">
              {alertDetails.details}
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">Recent Alerts:</h4>
            {[
              { client: "Mrs. Johnson - Room 204", alert: "Blood pressure elevated", time: "2 mins ago" },
              { client: "Mr. Williams - Room 186", alert: "Medication overdue", time: "5 mins ago" },
              { client: "Ms. Brown - Room 192", alert: "Fall risk assessment due", time: "8 mins ago" }
            ].map((alert, index) => (
              <div key={index} className="p-2 bg-muted/30 rounded text-sm">
                <div className="font-medium">{alert.client}</div>
                <div className="text-muted-foreground">{alert.alert}</div>
                <div className="text-xs text-muted-foreground">{alert.time}</div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-4">
            <Button className="flex-1" onClick={() => setAlertDetails(prev => ({ ...prev, isOpen: false }))}>
              <Eye className="w-4 h-4 mr-2" />
              View All Alerts
            </Button>
            <Button variant="outline" onClick={() => setAlertDetails(prev => ({ ...prev, isOpen: false }))}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const MedicationAdminModal = () => (
    <Dialog open={medicationAdmin.isOpen} onOpenChange={(open) => setMedicationAdmin(prev => ({ ...prev, isOpen: open }))}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Pill className="w-5 h-5 text-primary" />
            Medication Administration
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
            <div className="font-semibold">Paracetamol 500mg</div>
            <div className="text-sm text-muted-foreground">Patient: Mrs. Johnson</div>
            <div className="text-sm text-muted-foreground">Prescribed: 2 tablets, every 6 hours</div>
            <div className="text-sm text-muted-foreground">Due: {new Date().toLocaleTimeString()}</div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch 
              checked={medicationAdmin.administered}
              onCheckedChange={(checked) => setMedicationAdmin(prev => ({ ...prev, administered: checked }))}
            />
            <Label>Medication administered successfully</Label>
          </div>

          <div>
            <Label htmlFor="admin-notes">Administration Notes</Label>
            <Textarea 
              value={medicationAdmin.notes}
              onChange={(e) => setMedicationAdmin(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Enter any observations or reasons for non-administration..."
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button className="flex-1" onClick={handleMedicationAdminSubmit}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Confirm
            </Button>
            <Button variant="outline" onClick={() => setMedicationAdmin(prev => ({ ...prev, isOpen: false }))}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const VitalsMonitoringModal = () => (
    <Dialog open={vitalsMonitoring.isOpen} onOpenChange={(open) => setVitalsMonitoring(prev => ({ ...prev, isOpen: open }))}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Vital Signs Monitoring
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
              <div className="text-sm text-muted-foreground">Blood Pressure</div>
              <div className="text-lg font-semibold text-warning">160/95 mmHg</div>
              <div className="text-xs text-warning">↑ Elevated</div>
            </div>
            <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
              <div className="text-sm text-muted-foreground">Heart Rate</div>
              <div className="text-lg font-semibold text-success">72 BPM</div>
              <div className="text-xs text-success">→ Normal</div>
            </div>
          </div>

          <div className="p-4 bg-muted/20 rounded-lg">
            <h4 className="font-medium mb-2">Trending Analysis</h4>
            <div className="space-y-2 text-sm">
              <div>• Blood pressure trending upward over past 24 hours</div>
              <div>• Consider medication review</div>
              <div>• Schedule physician consultation</div>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button className="flex-1">
              <Beaker className="w-4 h-4 mr-2" />
              Request Labs
            </Button>
            <Button variant="outline">
              <PhoneCall className="w-4 h-4 mr-2" />
              Call Doctor
            </Button>
            <Button variant="outline" onClick={() => setVitalsMonitoring(prev => ({ ...prev, isOpen: false }))}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="p-6 space-y-6">
      {/* All modal components */}
      <VirtualRoundsModal />
      <NewAssessmentModal />
      <AlertDetailsModal />
      <MedicationAdminModal />
      <VitalsMonitoringModal />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2 aegis-text-enhanced">
            Healthcare & Clinical Management
          </h1>
          <p className="text-muted-foreground aegis-text-secondary">
            Comprehensive clinical care with AI-powered insights and real-time monitoring
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="aegis-ceremonial-hover"
            onClick={handleVirtualRoundsOpen}
          >
            <Video className="w-4 h-4 mr-2" />
            Virtual Rounds
          </Button>
          <Button 
            size="sm" 
            className="aegis-ceremonial-hover"
            onClick={handleNewAssessmentOpen}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Assessment
          </Button>
        </div>
      </motion.div>

      <Tabs value={activeTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 gap-1">
          <TabsTrigger value="overview" className="aegis-tab-text">Overview</TabsTrigger>
          <TabsTrigger value="medications" className="aegis-tab-text">eMAR</TabsTrigger>
          <TabsTrigger value="observations" className="aegis-tab-text">Vitals</TabsTrigger>
          <TabsTrigger value="care-planning" className="aegis-tab-text">Care Plans</TabsTrigger>
          <TabsTrigger value="clinical-workflows" className="aegis-tab-text">Workflows</TabsTrigger>
          <TabsTrigger value="telemedicine" className="aegis-tab-text">Telehealth</TabsTrigger>
          <TabsTrigger value="emergency-response" className="aegis-tab-text">Emergency</TabsTrigger>
          <TabsTrigger value="reports" className="aegis-tab-text">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {getTabContent()}
        </TabsContent>
      </Tabs>
    </div>
  );
}