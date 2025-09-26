import { SubTabKey } from "../HierarchicalNavigation";
import { QualityTab } from "../tabs/QualityTab";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { 
  FileText, 
  Clipboard, 
  Shield, 
  AlertTriangle, 
  TrendingUp,
  Plus,
  Download,
  CheckCircle,
  Clock
} from "lucide-react";

interface QualityComplianceDomainProps {
  activeSubTab: SubTabKey;
  filter?: string;
}

export function QualityComplianceDomain({ activeSubTab, filter }: QualityComplianceDomainProps) {
  const renderSubTab = () => {
    switch (activeSubTab) {
      case "policies":
        return <QualityTab filter={filter} />;
        
      case "audits":
        return (
          <div className="p-6 space-y-6 aegis-tab-quality min-h-screen">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">Audits</h2>
                <p className="text-sm text-muted-foreground">Schedule, checklists, and compliance monitoring</p>
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                New Audit
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                {[
                  {
                    title: "Medication Management Audit",
                    type: "Internal",
                    dueDate: "2024-09-20",
                    status: "In Progress",
                    progress: 65,
                    auditor: "Emily Rodriguez",
                    findings: 3,
                    severity: "medium"
                  },
                  {
                    title: "Health & Safety Compliance",
                    type: "QCS",
                    dueDate: "2024-09-25",
                    status: "Scheduled",
                    progress: 0,
                    auditor: "Sarah Mitchell",
                    findings: 0,
                    severity: "none"
                  },
                  {
                    title: "Care Planning Review",
                    type: "Internal",
                    dueDate: "2024-09-15",
                    status: "Complete",
                    progress: 100,
                    auditor: "James Patterson",
                    findings: 2,
                    severity: "low"
                  },
                  {
                    title: "Safeguarding Procedures",
                    type: "External",
                    dueDate: "2024-10-01",
                    status: "Scheduled",
                    progress: 0,
                    auditor: "External Auditor",
                    findings: 0,
                    severity: "none"
                  }
                ].map((audit, index) => (
                  <Card key={index} className="aegis-ceremonial-card aegis-quality-parchment">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-foreground">{audit.title}</CardTitle>
                          <CardDescription>Due: {audit.dueDate} • Auditor: {audit.auditor}</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-muted/50">
                            {audit.type}
                          </Badge>
                          <Badge 
                            variant={audit.status === 'Complete' ? 'default' : 
                                    audit.status === 'In Progress' ? 'secondary' : 'outline'}
                            className={
                              audit.status === 'Complete' ? 'bg-success/20 text-success border-success/30' :
                              audit.status === 'In Progress' ? 'bg-primary/20 text-primary border-primary/30' :
                              'bg-muted/50'
                            }
                          >
                            {audit.status}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">Progress</span>
                            <span className="text-sm font-medium">{audit.progress}%</span>
                          </div>
                          <div className="w-full bg-border rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-500 ${
                                audit.progress === 100 ? 'bg-success' : 'bg-primary'
                              }`}
                              style={{ width: `${audit.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        {audit.findings > 0 && (
                          <div className="flex items-center justify-between p-2 rounded bg-muted/30">
                            <span className="text-sm text-muted-foreground">Findings</span>
                            <Badge 
                              variant="outline" 
                              className={`
                                ${audit.severity === 'high' ? 'bg-destructive/20 text-destructive border-destructive/30' :
                                  audit.severity === 'medium' ? 'bg-warning/20 text-warning border-warning/30' :
                                  'bg-success/20 text-success border-success/30'}
                              `}
                            >
                              {audit.findings} {audit.severity}
                            </Badge>
                          </div>
                        )}
                        
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="bg-muted/30">
                            <Clipboard className="w-4 h-4 mr-2" />
                            View Checklist
                          </Button>
                          {audit.status === 'Complete' && (
                            <Button size="sm" variant="outline" className="bg-muted/30">
                              <Download className="w-4 h-4 mr-2" />
                              Export Report
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="space-y-4">
                <Card className="aegis-ceremonial-card">
                  <CardHeader>
                    <CardTitle className="text-foreground">Audit Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">This Month</span>
                      <span className="font-medium">4 audits</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Completed</span>
                      <span className="font-medium text-success">2</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">In Progress</span>
                      <span className="font-medium text-primary">1</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Scheduled</span>
                      <span className="font-medium">1</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="aegis-ceremonial-card">
                  <CardHeader>
                    <CardTitle className="text-foreground">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start bg-muted/30">
                      <Clipboard className="w-4 h-4 mr-2" />
                      Audit Templates
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-muted/30">
                      <Clock className="w-4 h-4 mr-2" />
                      Schedule Audit
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-muted/30">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Compliance Report
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );
        
      case "cqc-evidence":
        return (
          <div className="p-6 space-y-6 aegis-tab-quality min-h-screen">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">CQC Evidence</h2>
                <p className="text-sm text-muted-foreground">Inspection mode - evidence collection and compliance</p>
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Download className="w-4 h-4 mr-2" />
                Generate Pack
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <Card className="aegis-ceremonial-card aegis-quality-parchment">
                  <CardHeader>
                    <CardTitle className="text-foreground">CQC Key Lines of Enquiry (KLOE)</CardTitle>
                    <CardDescription>Evidence readiness by regulation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { regulation: "Regulation 12: Safe Care & Treatment", evidence: 18, required: 20, status: "good" },
                        { regulation: "Regulation 13: Safeguarding", evidence: 15, required: 15, status: "complete" },
                        { regulation: "Regulation 14: Meeting Nutritional Needs", evidence: 12, required: 15, status: "attention" },
                        { regulation: "Regulation 15: Premises & Equipment", evidence: 8, required: 12, status: "concern" },
                        { regulation: "Regulation 17: Good Governance", evidence: 22, required: 25, status: "good" },
                        { regulation: "Regulation 18: Staffing", evidence: 16, required: 18, status: "good" }
                      ].map((reg, index) => {
                        const percentage = (reg.evidence / reg.required) * 100;
                        return (
                          <div key={index} className="p-4 rounded-lg bg-muted/30 border border-border/50">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-foreground">{reg.regulation}</h4>
                              <Badge 
                                variant="outline" 
                                className={`
                                  ${reg.status === 'complete' ? 'bg-success/20 text-success border-success/30' :
                                    reg.status === 'good' ? 'bg-primary/20 text-primary border-primary/30' :
                                    reg.status === 'attention' ? 'bg-warning/20 text-warning border-warning/30' :
                                    'bg-destructive/20 text-destructive border-destructive/30'}
                                `}
                              >
                                {reg.status === 'complete' ? 'Complete' :
                                 reg.status === 'good' ? 'Good' :
                                 reg.status === 'attention' ? 'Needs Attention' :
                                 'Requires Action'}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-muted-foreground">
                                {reg.evidence}/{reg.required} evidence items
                              </span>
                              <span className="text-sm font-medium">{percentage.toFixed(0)}%</span>
                            </div>
                            
                            <div className="w-full bg-border rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full transition-all duration-500 ${
                                  percentage === 100 ? 'bg-success' :
                                  percentage >= 80 ? 'bg-primary' :
                                  percentage >= 60 ? 'bg-warning' :
                                  'bg-destructive'
                                }`}
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-4">
                <Card className="aegis-ceremonial-card">
                  <CardHeader>
                    <CardTitle className="text-foreground">Inspection Readiness</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-1">82%</div>
                      <p className="text-sm text-muted-foreground">Overall Readiness</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Complete</span>
                        <span className="font-medium text-success">1</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Good Progress</span>
                        <span className="font-medium text-primary">3</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Needs Attention</span>
                        <span className="font-medium text-warning">1</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Requires Action</span>
                        <span className="font-medium text-destructive">1</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="aegis-ceremonial-card">
                  <CardHeader>
                    <CardTitle className="text-foreground">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start bg-muted/30">
                      <FileText className="w-4 h-4 mr-2" />
                      Evidence Library
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-muted/30">
                      <Shield className="w-4 h-4 mr-2" />
                      Mock Inspection
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-muted/30">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Self Assessment
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );
        
      default:
        return <QualityTab filter={filter} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderSubTab()}
    </div>
  );
}