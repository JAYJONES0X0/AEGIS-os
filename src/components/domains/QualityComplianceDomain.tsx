import React, { useState } from "react";
import { Section } from "../common/Section";
import { KpiGrid } from "../home/KpiGrid";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import { 
  Shield, FileCheck, AlertTriangle, TrendingUp, Clock, CheckCircle2, 
  CheckSquare, AlertOctagon, Award, Target, BarChart, Bot, FileText, Home 
} from "lucide-react";

interface QualityComplianceDomainProps {
  activeTab?: string;
}

export const QualityComplianceDomain = React.memo(function QualityComplianceDomain({ activeTab = 'qcs-policies' }: QualityComplianceDomainProps) {
  const [localTab, setLocalTab] = useState(activeTab);

  const qualityKPIs = [
    { label: "Overall Compliance", value: "96.8%" },
    { label: "Quality Score", value: "94%" },
    { label: "Audits Completed", value: "47" },
    { label: "Action Items", value: "12" },
    { label: "Certifications", value: "98%" },
    { label: "Incident Rate", value: "0.2%" }
  ];

  const complianceAreas = [
    { area: "CQC Registration", status: "Compliant", score: 100, lastAudit: "3 months ago", nextDue: "9 months" },
    { area: "Health & Safety", status: "Minor Issues", score: 92, lastAudit: "1 month ago", nextDue: "11 months" },
    { area: "Medication Management", status: "Compliant", score: 98, lastAudit: "2 weeks ago", nextDue: "6 months" },
    { area: "Safeguarding", status: "Compliant", score: 96, lastAudit: "6 weeks ago", nextDue: "10 months" },
    { area: "Fire Safety", status: "Action Required", score: 88, lastAudit: "2 months ago", nextDue: "4 months" },
    { area: "Infection Control", status: "Compliant", score: 99, lastAudit: "3 weeks ago", nextDue: "9 months" }
  ];

  const recentAudits = [
    { date: "2024-01-15", area: "Medication Management", auditor: "NHS Trust", result: "Satisfactory", score: 98 },
    { date: "2024-01-08", area: "Care Planning", auditor: "Internal", result: "Good", score: 94 },
    { date: "2023-12-20", area: "Health & Safety", auditor: "External", result: "Requires Improvement", score: 92 },
    { date: "2023-12-15", area: "Safeguarding", auditor: "Local Authority", result: "Outstanding", score: 96 }
  ];

  const actionItems = [
    { id: 1, item: "Update fire evacuation procedures", priority: "High", due: "2024-02-01", assigned: "Facilities Team", status: "In Progress" },
    { id: 2, item: "Staff training - Manual Handling", priority: "Medium", due: "2024-02-15", assigned: "HR Department", status: "Scheduled" },
    { id: 3, item: "Review medication storage protocols", priority: "High", due: "2024-01-25", assigned: "Clinical Lead", status: "Overdue" },
    { id: 4, item: "Update care plan documentation", priority: "Medium", due: "2024-02-10", assigned: "Care Team", status: "Pending" }
  ];

  const qualityMetrics = [
    { metric: "Resident Satisfaction", score: 94, trend: "+2%", target: 95 },
    { metric: "Family Satisfaction", score: 92, trend: "+5%", target: 90 },
    { metric: "Staff Satisfaction", score: 87, trend: "-1%", target: 85 },
    { metric: "Clinical Outcomes", score: 96, trend: "+3%", target: 95 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Compliant": return "text-green-500";
      case "Minor Issues": return "text-yellow-500";
      case "Action Required": return "text-red-500";
      default: return "text-gray-500";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Compliant": return "default";
      case "Minor Issues": return "secondary";
      case "Action Required": return "destructive";
      default: return "outline";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "destructive";
      case "Medium": return "secondary";
      case "Low": return "outline";
      default: return "outline";
    }
  };

  const getActionStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "text-green-500";
      case "In Progress": return "text-blue-500";
      case "Scheduled": return "text-yellow-500";
      case "Overdue": return "text-red-500";
      case "Pending": return "text-gray-500";
      default: return "text-gray-500";
    }
  };

  const getResultColor = (result: string) => {
    switch (result) {
      case "Outstanding": return "text-green-500";
      case "Good": return "text-blue-500";
      case "Satisfactory": return "text-yellow-500";
      case "Requires Improvement": return "text-red-500";
      default: return "text-gray-500";
    }
  };

  return (
    <div className="p-6 space-y-8 min-h-screen aegis-tab-home">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary tracking-tight">
            Quality & Intelligence
          </h1>
          <p className="text-muted-foreground mt-1">
            Regulatory compliance, quality assurance, and audit management
          </p>
        </div>
        
        <div className="text-right">
          <div className="text-sm text-muted-foreground">
            Last audit: Medication Management • {new Date().toLocaleDateString()}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-foreground/80">96.8% compliant</span>
          </div>
        </div>
      </div>

      <Tabs value={localTab} onValueChange={setLocalTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-9 bg-card/50 backdrop-blur-sm text-xs">
          <TabsTrigger value="qcs-policies" className="text-xs flex items-center gap-2">
            <FileCheck className="w-4 h-4" />
            QCS Policies
          </TabsTrigger>
          <TabsTrigger value="audits" className="text-xs flex items-center gap-2">
            <CheckSquare className="w-4 h-4" />
            Audits
          </TabsTrigger>
          <TabsTrigger value="risk-register" className="text-xs flex items-center gap-2">
            <AlertOctagon className="w-4 h-4" />
            Risk Register
          </TabsTrigger>
          <TabsTrigger value="cqc-evidence" className="text-xs flex items-center gap-2">
            <Award className="w-4 h-4" />
            CQC Evidence
          </TabsTrigger>
          <TabsTrigger value="action-plans" className="text-xs flex items-center gap-2">
            <Target className="w-4 h-4" />
            Action Plans
          </TabsTrigger>
          <TabsTrigger value="analytics-dashboards" className="text-xs flex items-center gap-2">
            <BarChart className="w-4 h-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="predictive-ai" className="text-xs flex items-center gap-2">
            <Bot className="w-4 h-4" />
            Predictive AI
          </TabsTrigger>
          <TabsTrigger value="commissioner-reports" className="text-xs flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Reports
          </TabsTrigger>
          <TabsTrigger value="community-family" className="text-xs flex items-center gap-2">
            <Home className="w-4 h-4" />
            Community
          </TabsTrigger>
        </TabsList>

        <TabsContent value="qcs-policies" className="space-y-6">
          <Section title="Quality & Compliance Metrics">
            <KpiGrid kpis={qualityKPIs} />
          </Section>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="aegis-ceremonial-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  Quality Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {qualityMetrics.map((metric, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{metric.metric}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold">{metric.score}%</span>
                          <span className={`text-xs ${metric.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                            {metric.trend}
                          </span>
                        </div>
                      </div>
                      <Progress value={metric.score} className="h-2" />
                      <div className="text-xs text-muted-foreground text-right">
                        Target: {metric.target}%
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="aegis-ceremonial-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  Priority Action Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {actionItems.filter(item => item.priority === "High").map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <div className="font-medium text-sm">{item.item}</div>
                        <div className="text-xs text-muted-foreground">{item.assigned}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getPriorityColor(item.priority) as any}>
                          {item.priority}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{item.due}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audits" className="space-y-6">
          <Section title="Audit History & Schedule">
            <Card className="aegis-ceremonial-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Audits</CardTitle>
                  <Button variant="outline" size="sm">
                    <FileCheck className="w-4 h-4 mr-2" />
                    Schedule Audit
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAudits.map((audit, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="font-bold text-primary">{audit.date}</div>
                          <div className="text-xs text-muted-foreground">{audit.auditor}</div>
                        </div>
                        <div>
                          <div className="font-medium">{audit.area}</div>
                          <div className={`text-sm ${getResultColor(audit.result)}`}>
                            {audit.result}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-center">
                          <div className="text-lg font-bold">{audit.score}%</div>
                          <div className="text-xs text-muted-foreground">Score</div>
                        </div>
                        <Button variant="ghost" size="sm">View Report</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Section>
        </TabsContent>

        <TabsContent value="risk-register" className="space-y-6">
          <Section title="Compliance Status by Area">
            <div className="grid gap-4">
              {complianceAreas.map((area, index) => (
                <Card key={index} className="aegis-ceremonial-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Shield className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="font-bold text-lg">{area.area}</div>
                          <div className="text-sm text-muted-foreground">
                            Last audit: {area.lastAudit} • Next due: {area.nextDue}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">{area.score}%</div>
                          <div className="text-xs text-muted-foreground">Score</div>
                        </div>
                        <Badge variant={getStatusBadge(area.status) as any} className="text-sm">
                          {area.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Section>
        </TabsContent>

        <TabsContent value="cqc-evidence" className="space-y-6">
          <Card className="aegis-ceremonial-card p-8">
            <div className="text-center space-y-4">
              <Award className="w-12 h-12 text-muted-foreground mx-auto" />
              <div>
                <h3 className="text-lg font-semibold">CQC Evidence Packs</h3>
                <p className="text-sm text-muted-foreground">Regulatory evidence management coming soon</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="action-plans" className="space-y-6">
          <Section title="Action Items & Follow-ups">
            <div className="grid gap-4">
              {actionItems.map((action) => (
                <Card key={action.id} className="aegis-ceremonial-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center">
                          <Clock className="w-6 h-6 text-yellow-500" />
                        </div>
                        <div>
                          <div className="font-bold text-lg">{action.item}</div>
                          <div className="text-sm text-muted-foreground">
                            Assigned to: {action.assigned} • Due: {action.due}
                          </div>
                          <div className={`text-sm mt-1 ${getActionStatusColor(action.status)}`}>
                            Status: {action.status}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={getPriorityColor(action.priority) as any} className="text-sm">
                          {action.priority} Priority
                        </Badge>
                        <Button variant="default" size="sm">
                          Update
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Section>
        </TabsContent>

        {/* Placeholder tabs for other modules */}
        {['analytics-dashboards', 'predictive-ai', 'commissioner-reports', 'community-family'].map((tabId) => (
          <TabsContent key={tabId} value={tabId}>
            <Card className="aegis-ceremonial-card p-8">
              <div className="text-center space-y-4">
                <Shield className="w-12 h-12 text-muted-foreground mx-auto" />
                <div>
                  <h3 className="text-lg font-semibold">
                    {tabId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Module
                  </h3>
                  <p className="text-sm text-muted-foreground">Module implementation in progress</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
});