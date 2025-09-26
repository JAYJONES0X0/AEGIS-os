import { useState } from "react";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { DataGrid } from "../DataGrid";
import { RAGIndicator } from "../RAGIndicator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Plus, UserPlus, Calendar, FileText, AlertTriangle } from "lucide-react";
import { mockClients } from "../../../lib/mock-data";

interface ClientsTabProps {
  filter?: string;
}

export function ClientsTab({ filter }: ClientsTabProps) {
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  
  const clientColumns = [
    { 
      key: "rag", 
      title: "RAG",
      render: (value: string) => <RAGIndicator status={value as any} />
    },
    { key: "name", title: "Name" },
    { key: "dob", title: "Date of Birth" },
    { key: "care_plan", title: "Care Plan" },
    { key: "risk_level", title: "Risk Level" },
    { key: "last_note", title: "Last Note" },
    { 
      key: "status", 
      title: "Status",
      render: (value: string) => (
        <Badge variant={value === "Active" ? "default" : "secondary"}>
          {value}
        </Badge>
      )
    }
  ];

  const filteredClients = filter === "risks" 
    ? mockClients.filter(c => c.rag === "red" || c.rag === "amber")
    : mockClients;

  if (selectedClient) {
    return <ClientDetailView clientId={selectedClient} onBack={() => setSelectedClient(null)} />;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Client Management</h1>
          <p className="text-muted-foreground">
            {filter === "risks" 
              ? "Clients with elevated risk levels" 
              : "Manage client records and care plans"
            }
          </p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Client
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockClients.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">High Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {mockClients.filter(c => c.rag === "red").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Medium Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {mockClients.filter(c => c.rag === "amber").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Low Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {mockClients.filter(c => c.rag === "green").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Clients Table */}
      <DataGrid
        columns={clientColumns}
        data={filteredClients}
        onRowClick={(client) => setSelectedClient(client.id)}
      />
    </div>
  );
}

// Client Detail View Component
function ClientDetailView({ clientId, onBack }: { clientId: string; onBack: () => void }) {
  const client = mockClients.find(c => c.id === clientId);
  
  if (!client) return null;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          ← Back to Clients
        </Button>
        <div className="flex items-center gap-3">
          <RAGIndicator status={client.rag} size="lg" />
          <div>
            <h1 className="text-2xl font-bold">{client.name}</h1>
            <p className="text-muted-foreground">NHS: {client.nhs_number}</p>
          </div>
        </div>
      </div>

      {/* Client Tabs */}
      <Tabs defaultValue="summary">
        <TabsList>
          <TabsTrigger value="summary">Overview</TabsTrigger>
          <TabsTrigger value="care-plan">Care Plan</TabsTrigger>
          <TabsTrigger value="notes">Daily Notes</TabsTrigger>
          <TabsTrigger value="risks">Risks & PBS</TabsTrigger>
          <TabsTrigger value="health">Health</TabsTrigger>
          <TabsTrigger value="meds">Medications</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div><strong>Date of Birth:</strong> {client.dob}</div>
                <div><strong>Care Plan:</strong> {client.care_plan}</div>
                <div><strong>Risk Level:</strong> {client.risk_level}</div>
                <div><strong>Status:</strong> {client.status}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span className="text-sm">Last note: {client.last_note}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">Next appointment: 22 Jan 2024</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-sm">Risk review due: 1 Feb 2024</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="care-plan">
          <Card>
            <CardHeader>
              <CardTitle>Care Plan Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Outcomes</h4>
                  <p className="text-sm text-muted-foreground">
                    Maintain independence in personal care with minimal support
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Interventions</h4>
                  <ul className="text-sm text-muted-foreground list-disc pl-4">
                    <li>Daily medication administration</li>
                    <li>Weekly physiotherapy exercises</li>
                    <li>Social activities participation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium">Next Review</h4>
                  <p className="text-sm text-muted-foreground">1 February 2024</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Daily Notes</h3>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Note
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base">Daily Care Note</CardTitle>
                    <p className="text-sm text-muted-foreground">17 Jan 2024 14:30 - Alice Cooper</p>
                  </div>
                  <div className="flex gap-1">
                    <Badge variant="outline">mobility</Badge>
                    <Badge variant="outline">social</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div><strong>Mood:</strong> Good</div>
                  <div><strong>Nutrition:</strong> Ate full breakfast and lunch</div>
                  <div><strong>Activities:</strong> Participated in group activities, watched TV</div>
                  <div><strong>Concerns:</strong> None</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risks">
          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment & PBS</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <RAGIndicator status={client.rag} />
                  <span className="font-medium">Overall Risk: {client.risk_level}</span>
                </div>
                <div>
                  <h4 className="font-medium">Identified Risks</h4>
                  <ul className="text-sm text-muted-foreground list-disc pl-4 mt-2">
                    <li>Falls risk - requires mobility aid</li>
                    <li>Medication compliance - daily prompting needed</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium">Mitigation Strategies</h4>
                  <ul className="text-sm text-muted-foreground list-disc pl-4 mt-2">
                    <li>Quarterly falls assessment</li>
                    <li>Electronic medication monitoring</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Add more tab contents as needed */}
      </Tabs>
    </div>
  );
}