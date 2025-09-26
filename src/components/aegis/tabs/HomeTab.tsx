import { Alert, AlertDescription } from "../../ui/alert";
import { KPITile } from "../KPITile";
import { ChartPlaceholder } from "../ChartPlaceholder";
import { DataGrid } from "../DataGrid";
import { Badge } from "../../ui/badge";
import { RAGIndicator } from "../RAGIndicator";
import { 
  AlertTriangle, 
  Users, 
  Calendar, 
  Pill, 
  GraduationCap,
  FileText,
  TrendingUp,
  Shield,
  Activity
} from "lucide-react";
import { mockKPIs, mockIncidents, mockAudits, mockStaff, mockClients } from "../../../lib/mock-data";
import { TabKey } from "../Navigation";

interface HomeTabProps {
  onNavigate: (tab: TabKey, filter?: string) => void;
}

export function HomeTab({ onNavigate }: HomeTabProps) {
  const todayAlerts = [
    { type: "warning", message: "1 audit overdue - Infection Control audit due 2 days ago" },
    { type: "info", message: "5 training certificates expiring within 30 days" },
    { type: "warning", message: "2 MAR omissions recorded in last 24 hours" }
  ];

  const recentIncidents = mockIncidents.slice(0, 3);
  const upcomingAudits = mockAudits.slice(0, 3);

  const incidentColumns = [
    { 
      key: "type", 
      title: "Type",
      render: (value: string) => <Badge variant="outline">{value}</Badge>
    },
    { key: "client", title: "Client" },
    { key: "date", title: "Date" },
    { 
      key: "severity", 
      title: "Severity",
      render: (value: string) => {
        const colors = {
          "Minor": "green",
          "Moderate": "amber", 
          "Major": "red"
        };
        return <RAGIndicator status={colors[value as keyof typeof colors] as any} />;
      }
    },
    { key: "status", title: "Status" }
  ];

  const auditColumns = [
    { key: "title", title: "Audit" },
    { key: "due_date", title: "Due Date" },
    { key: "assigned_to", title: "Assigned To" },
    { 
      key: "status", 
      title: "Status",
      render: (value: string) => (
        <Badge variant={value === "Overdue" ? "destructive" : "default"}>
          {value}
        </Badge>
      )
    }
  ];

  return (
    <div className="aegis-tab-home min-h-screen p-6 space-y-8">
      {/* Page Header */}
      <div className="pb-6 border-b border-border/20">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Command Centre</h1>
        <p className="text-muted-foreground mt-3 font-medium text-base">
          Real-time operational intelligence for <span className="text-primary font-semibold">AEGIS H&SC OS</span> 
          <span className="mx-2 text-border">•</span> 
          Registered Manager: <span className="text-primary font-semibold">BROOKLYN JOHN R</span>
        </p>
      </div>

      {/* Strategic Alerts */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-primary" />
          Command Priority Alerts
        </h2>
        <div className="space-y-2">
          {todayAlerts.map((alert, index) => (
            <Alert 
              key={index} 
              variant={alert.type === "warning" ? "destructive" : "default"}
              className="aegis-ceremonial-card border-l-4 border-l-primary/60"
            >
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="font-medium">{alert.message}</AlertDescription>
            </Alert>
          ))}
        </div>
      </div>

      {/* Command Intelligence Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Operational Intelligence
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPITile
            title="Today's Risks"
            value={mockKPIs.today_risks.value}
            subtitle="RAG assessments"
            status={mockKPIs.today_risks.status}
            icon={AlertTriangle}
            onClick={() => onNavigate("clients", "risks")}
          />
          <KPITile
            title="Overdue Audits"
            value={mockKPIs.overdue_audits.value}
            subtitle="Require immediate attention"
            status={mockKPIs.overdue_audits.status}
            icon={FileText}
            onClick={() => onNavigate("quality", "audits-overdue")}
          />
          <KPITile
            title="Rota Gaps"
            value={mockKPIs.rota_gaps.value}
            subtitle="Next 7 days"
            status={mockKPIs.rota_gaps.status}
            icon={Calendar}
            onClick={() => onNavigate("workforce", "rota")}
          />
          <KPITile
            title="MAR Omissions"
            value={mockKPIs.mar_omissions.value}
            subtitle="Last 24 hours"
            status={mockKPIs.mar_omissions.status}
            icon={Pill}
            onClick={() => onNavigate("emar", "omissions")}
          />
          <KPITile
            title="Training Expiries"
            value={mockKPIs.training_expiries.value}
            subtitle="Next 30 days"
            status={mockKPIs.training_expiries.status}
            icon={GraduationCap}
            onClick={() => onNavigate("workforce", "training")}
          />
          <KPITile
            title="Open Incidents"
            value={mockKPIs.incidents_open.value}
            subtitle="Under investigation"
            status={mockKPIs.incidents_open.status}
            icon={AlertTriangle}
            onClick={() => onNavigate("quality", "incidents")}
          />
          <KPITile
            title="Compliance Score"
            value={`${mockKPIs.compliance_score.value}%`}
            subtitle="Overall rating"
            status={mockKPIs.compliance_score.status}
            icon={Shield}
            trend="up"
            trendValue="+2%"
          />
          <KPITile
            title="Staff Utilisation"
            value={`${mockKPIs.staff_utilisation.value}%`}
            subtitle="Current capacity"
            status={mockKPIs.staff_utilisation.status}
            icon={Users}
            trend="stable"
            trendValue="0%"
          />
        </div>
      </div>

      {/* Strategic Analytics */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Strategic Analytics
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ChartPlaceholder
            title="MAR Compliance Trajectory"
            type="line"
            trend="up"
            trendValue="+3.2%"
            data={[
              { label: "Week 1", value: 91 },
              { label: "Week 2", value: 93 },
              { label: "Week 3", value: 94 },
              { label: "Week 4", value: 96 }
            ]}
          />
          <ChartPlaceholder
            title="Incident Distribution"
            type="pie"
            data={[
              { label: "Falls", value: 12 },
              { label: "Medication", value: 3 },
              { label: "Behaviour", value: 5 },
              { label: "Other", value: 2 }
            ]}
          />
        </div>
      </div>

      {/* Operational Command Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            Critical Incidents
          </h3>
          <div className="aegis-ceremonial-card">
            <DataGrid
              columns={incidentColumns}
              data={recentIncidents}
              searchable={false}
              filterable={false}
              exportable={false}
              pagination={false}
              onRowClick={() => onNavigate("quality", "incidents")}
              className="aegis-data-grid"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            <FileText className="h-4 w-4 text-warning" />
            Priority Audits
          </h3>
          <div className="aegis-ceremonial-card">
            <DataGrid
              columns={auditColumns}
              data={upcomingAudits}
              searchable={false}
              filterable={false}
              exportable={false}
              pagination={false}
              onRowClick={() => onNavigate("quality", "audits")}
              className="aegis-data-grid"
            />
          </div>
        </div>
      </div>
    </div>
  );
}