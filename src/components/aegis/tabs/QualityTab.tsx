import { useState } from "react";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { DataGrid } from "../DataGrid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Progress } from "../../ui/progress";
import { Checkbox } from "../../ui/checkbox";
import { 
  FileText, 
  Download, 
  Plus, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Package,
  Users,
  Shield
} from "lucide-react";
import { mockAudits, mockIncidents } from "../../../lib/mock-data";

interface QualityTabProps {
  filter?: string;
}

export function QualityTab({ filter }: QualityTabProps) {
  const [auditPackMode, setAuditPackMode] = useState(false);
  
  const auditColumns = [
    { key: "title", title: "Audit Type" },
    { key: "due_date", title: "Due Date" },
    { key: "assigned_to", title: "Assigned To" },
    { 
      key: "status", 
      title: "Status",
      render: (value: string) => {
        const colors = {
          "Completed": "default",
          "In Progress": "secondary",
          "Overdue": "destructive",
          "Scheduled": "outline"
        };
        return <Badge variant={colors[value as keyof typeof colors] as any}>{value}</Badge>;
      }
    },
    { 
      key: "compliance", 
      title: "Score",
      render: (value: number) => `${value}%`
    }
  ];

  const incidentColumns = [
    { 
      key: "type", 
      title: "Type",
      render: (value: string) => <Badge variant="outline">{value}</Badge>
    },
    { key: "client", title: "Client" },
    { key: "date", title: "Date" },
    { key: "severity", title: "Severity" },
    { 
      key: "status", 
      title: "Status",
      render: (value: string) => {
        const colors = {
          "Closed": "default",
          "Under Investigation": "secondary",
          "Open": "destructive"
        };
        return <Badge variant={colors[value as keyof typeof colors] as any}>{value}</Badge>;
      }
    }
  ];

  const filteredAudits = filter === "audits-overdue" 
    ? mockAudits.filter(a => a.status === "Overdue")
    : mockAudits;

  if (auditPackMode) {
    return <QCSAuditPackBuilder onBack={() => setAuditPackMode(false)} />;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Quality Management</h1>
          <p className="text-muted-foreground">
            {filter === "audits-overdue" 
              ? "Overdue audits requiring immediate attention"
              : "Manage policies, audits, incidents and CQC evidence"
            }
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setAuditPackMode(true)}>
            <Package className="mr-2 h-4 w-4" />
            Build CQC Pack
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Audit
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Active Audits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockAudits.filter(a => a.status === "In Progress").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {mockAudits.filter(a => a.status === "Overdue").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Open Incidents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {mockIncidents.filter(i => i.status !== "Closed").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Compliance Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">92%</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="policies">
        <TabsList>
          <TabsTrigger value="policies">Policies</TabsTrigger>
          <TabsTrigger value="audits">Audits</TabsTrigger>
          <TabsTrigger value="incidents">Incidents</TabsTrigger>
          <TabsTrigger value="cqc">CQC Evidence</TabsTrigger>
        </TabsList>

        <TabsContent value="policies">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">QCS Policies</h3>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Sync QCS
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "Medication Management", version: "v3.2", ack: 87, status: "Current" },
                { title: "Infection Control", version: "v2.1", ack: 94, status: "Current" },
                { title: "Safeguarding Adults", version: "v4.0", ack: 76, status: "Updated" },
                { title: "Health & Safety", version: "v1.8", ack: 89, status: "Current" },
                { title: "Data Protection", version: "v2.5", ack: 92, status: "Current" },
                { title: "Mental Capacity Act", version: "v3.0", ack: 83, status: "Current" }
              ].map((policy, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-base">{policy.title}</CardTitle>
                      <Badge variant={policy.status === "Updated" ? "destructive" : "outline"}>
                        {policy.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">{policy.version}</div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Acknowledgements</span>
                          <span>{policy.ack}%</span>
                        </div>
                        <Progress value={policy.ack} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="audits">
          <DataGrid
            columns={auditColumns}
            data={filteredAudits}
          />
        </TabsContent>

        <TabsContent value="incidents">
          <DataGrid
            columns={incidentColumns}
            data={mockIncidents}
          />
        </TabsContent>

        <TabsContent value="cqc">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">CQC Key Lines of Enquiry (KLOE)</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { domain: "Safe", score: 94, evidence: 12, gaps: 2 },
                { domain: "Effective", score: 89, evidence: 8, gaps: 1 },
                { domain: "Caring", score: 96, evidence: 15, gaps: 0 },
                { domain: "Responsive", score: 87, evidence: 10, gaps: 3 },
                { domain: "Well-led", score: 91, evidence: 14, gaps: 1 }
              ].map((domain, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-base">{domain.domain}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Readiness Score</span>
                          <span>{domain.score}%</span>
                        </div>
                        <Progress value={domain.score} />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Evidence Items</span>
                        <span className="font-medium">{domain.evidence}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Gaps</span>
                        <span className={`font-medium ${domain.gaps > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {domain.gaps}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// QCS Audit Pack Builder Component
function QCSAuditPackBuilder({ onBack }: { onBack: () => void }) {
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [packProgress, setPackProgress] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const domains = [
    { id: "safe", name: "Safe", evidence: 12, description: "Safety policies, incidents, risk assessments" },
    { id: "effective", name: "Effective", evidence: 8, description: "Care plans, outcomes, clinical governance" },
    { id: "caring", name: "Caring", evidence: 15, description: "Person-centred care, dignity, respect" },
    { id: "responsive", name: "Responsive", evidence: 10, description: "Individual needs, complaints, feedback" },
    { id: "well-led", name: "Well-led", evidence: 14, description: "Leadership, culture, governance" }
  ];

  const handleDomainToggle = (domainId: string) => {
    setSelectedDomains(prev => 
      prev.includes(domainId) 
        ? prev.filter(id => id !== domainId)
        : [...prev, domainId]
    );
  };

  const handleGeneratePack = () => {
    setIsGenerating(true);
    setPackProgress(0);
    
    // Simulate pack generation
    const interval = setInterval(() => {
      setPackProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          ← Back to Quality
        </Button>
        <div>
          <h1 className="text-2xl font-bold">CQC Evidence Pack Builder</h1>
          <p className="text-muted-foreground">Generate comprehensive evidence packs for inspection</p>
        </div>
      </div>

      {/* Pack Builder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Domain Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select CQC Domains</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {domains.map((domain) => (
              <div key={domain.id} className="flex items-start space-x-3">
                <Checkbox
                  id={domain.id}
                  checked={selectedDomains.includes(domain.id)}
                  onCheckedChange={() => handleDomainToggle(domain.id)}
                />
                <div className="grid gap-1.5 leading-none flex-1">
                  <label
                    htmlFor={domain.id}
                    className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {domain.name}
                  </label>
                  <p className="text-sm text-muted-foreground">
                    {domain.description} ({domain.evidence} evidence items)
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Pack Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Evidence Pack Contents</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDomains.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                Select domains to see pack contents
              </p>
            ) : (
              <div className="space-y-4">
                {selectedDomains.map((domainId) => {
                  const domain = domains.find(d => d.id === domainId);
                  return (
                    <div key={domainId} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{domain?.name}</h4>
                        <Badge variant="outline">{domain?.evidence} items</Badge>
                      </div>
                      <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                        <li>• Policies and procedures</li>
                        <li>• Audit reports and action plans</li>
                        <li>• Training records</li>
                        <li>• Incident reports and analysis</li>
                      </ul>
                    </div>
                  );
                })}
                
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Total Evidence Items</span>
                    <span className="font-bold">
                      {selectedDomains.reduce((total, domainId) => {
                        const domain = domains.find(d => d.id === domainId);
                        return total + (domain?.evidence || 0);
                      }, 0)}
                    </span>
                  </div>
                  
                  {isGenerating ? (
                    <div className="space-y-2">
                      <Progress value={packProgress} />
                      <p className="text-sm text-center text-muted-foreground">
                        Generating pack... {packProgress}%
                      </p>
                    </div>
                  ) : packProgress === 100 ? (
                    <div className="text-center space-y-2">
                      <CheckCircle className="h-8 w-8 mx-auto text-green-600" />
                      <p className="font-medium">Pack generated successfully!</p>
                      <Button>
                        <Download className="mr-2 h-4 w-4" />
                        Download ZIP
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      onClick={handleGeneratePack}
                      disabled={selectedDomains.length === 0}
                      className="w-full"
                    >
                      <Package className="mr-2 h-4 w-4" />
                      Generate Evidence Pack
                    </Button>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Additional Options */}
      <Card>
        <CardHeader>
          <CardTitle>Export Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <FileText className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <h4 className="font-medium">PDF Report</h4>
                <p className="text-sm text-muted-foreground">Executive summary with key metrics</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Package className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <h4 className="font-medium">Complete Pack</h4>
                <p className="text-sm text-muted-foreground">All evidence files and documentation</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Shield className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <h4 className="font-medium">Inspector Portal</h4>
                <p className="text-sm text-muted-foreground">Secure online access for inspectors</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}