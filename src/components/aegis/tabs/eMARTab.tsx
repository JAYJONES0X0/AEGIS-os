import { useState } from "react";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { DataGrid } from "../DataGrid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { 
  Scan, 
  Users, 
  Package, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Camera,
  UserCheck
} from "lucide-react";
import { mockMedications, mockClients } from "../../../lib/mock-data";

interface eMARTabProps {
  filter?: string;
}

export function eMARTab({ filter }: eMARTabProps) {
  const [activeRound, setActiveRound] = useState<string | null>(null);
  const [scanMode, setScanMode] = useState(false);

  const medicationColumns = [
    { key: "client", title: "Client" },
    { key: "medication", title: "Medication" },
    { key: "schedule", title: "Schedule" },
    { key: "due_time", title: "Due Time" },
    { 
      key: "status", 
      title: "Status",
      render: (value: string) => {
        const colors = {
          "Due": "destructive",
          "Given": "default",
          "Omitted": "secondary",
          "Refused": "outline"
        };
        return <Badge variant={colors[value as keyof typeof colors] as any}>{value}</Badge>;
      }
    },
    { 
      key: "type", 
      title: "Type",
      render: (value: string) => (
        <Badge variant={value === "Controlled Drug" ? "destructive" : "outline"}>
          {value}
        </Badge>
      )
    }
  ];

  const filteredMedications = filter === "omissions" 
    ? mockMedications.filter(m => m.status === "Omitted")
    : mockMedications;

  if (activeRound) {
    return <MARRoundView roundId={activeRound} onBack={() => setActiveRound(null)} />;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Electronic MAR</h1>
          <p className="text-muted-foreground">
            {filter === "omissions" 
              ? "Medication omissions requiring attention"
              : "Medication administration records and rounds"
            }
          </p>
        </div>
        <Button onClick={() => setActiveRound("current")}>
          <Scan className="mr-2 h-4 w-4" />
          Start MAR Round
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Due Now</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {mockMedications.filter(m => m.status === "Due").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Given Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {mockMedications.filter(m => m.status === "Given").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Omissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {mockMedications.filter(m => m.status === "Omitted").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Compliance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="rounds">
        <TabsList>
          <TabsTrigger value="rounds">Rounds</TabsTrigger>
          <TabsTrigger value="stock">Stock</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="rounds">
          <DataGrid
            columns={medicationColumns}
            data={filteredMedications}
            onRowClick={() => setActiveRound("current")}
          />
        </TabsContent>

        <TabsContent value="stock">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stock Management</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Low Stock Alert</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Metformin 500mg</span>
                      <Badge variant="destructive">12 left</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Warfarin 2mg</span>
                      <Badge variant="outline">25 left</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Expiry Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Paracetamol</span>
                      <Badge variant="destructive">5 days</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Order Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Pending Orders</span>
                      <Badge>3</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivered Today</span>
                      <Badge variant="outline">1</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reports">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">MAR Reports</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Compliance Report</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>This Week</span>
                      <span className="font-semibold">94%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Week</span>
                      <span>91%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Target</span>
                      <span>95%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Error Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Omissions</span>
                      <span>2</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Late Admin</span>
                      <span>1</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Wrong Dose</span>
                      <span>0</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// MAR Round View Component
function MARRoundView({ roundId, onBack }: { roundId: string; onBack: () => void }) {
  const [currentStep, setCurrentStep] = useState("select-client");
  const [selectedClient, setSelectedClient] = useState("");
  const [scanResult, setScanResult] = useState("");
  const [witnessRequired, setWitnessRequired] = useState(false);
  const [witnessId, setWitnessId] = useState("");
  const [outcome, setOutcome] = useState("");
  const [notes, setNotes] = useState("");

  const handleScan = () => {
    // Simulate barcode scan
    setTimeout(() => {
      setScanResult("Metformin 500mg - Batch: MET2024A - Exp: 15/06/2024");
      setCurrentStep("confirm-medication");
    }, 1000);
  };

  const handleConfirm = () => {
    if (outcome === "given" && witnessRequired && !witnessId) {
      alert("Witness required for Controlled Drug");
      return;
    }
    setCurrentStep("complete");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          ← Back to eMAR
        </Button>
        <div>
          <h1 className="text-2xl font-bold">MAR Round</h1>
          <p className="text-muted-foreground">Evening Round - 18:00</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-4">
        <div className={`flex items-center gap-2 ${currentStep === "select-client" ? "text-primary" : "text-muted-foreground"}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === "select-client" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
            1
          </div>
          <span>Select Client</span>
        </div>
        <div className="h-px bg-border flex-1" />
        <div className={`flex items-center gap-2 ${currentStep === "scan-medication" ? "text-primary" : "text-muted-foreground"}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${["scan-medication", "confirm-medication"].includes(currentStep) ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
            2
          </div>
          <span>Scan Medication</span>
        </div>
        <div className="h-px bg-border flex-1" />
        <div className={`flex items-center gap-2 ${currentStep === "confirm-medication" ? "text-primary" : "text-muted-foreground"}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${["confirm-medication", "complete"].includes(currentStep) ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
            3
          </div>
          <span>Confirm & Record</span>
        </div>
      </div>

      {/* Step Content */}
      <Card>
        <CardContent className="p-6">
          {currentStep === "select-client" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Select Client</h3>
              <Select value={selectedClient} onValueChange={setSelectedClient}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose client for medication round..." />
                </SelectTrigger>
                <SelectContent>
                  {mockClients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name} - {client.nhs_number}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                onClick={() => setCurrentStep("scan-medication")} 
                disabled={!selectedClient}
                className="w-full"
              >
                Continue to Medication Scan
              </Button>
            </div>
          )}

          {currentStep === "scan-medication" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Scan Medication</h3>
              <div className="text-center space-y-4">
                <div className="w-32 h-32 mx-auto bg-muted rounded-lg flex items-center justify-center">
                  <Camera className="h-12 w-12 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">
                  Position barcode within the scanning frame
                </p>
                <Button onClick={handleScan} size="lg">
                  <Scan className="mr-2 h-4 w-4" />
                  Simulate Scan
                </Button>
              </div>
            </div>
          )}

          {currentStep === "confirm-medication" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Confirm Medication</h3>
              
              <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex items-center gap-2 text-green-800 dark:text-green-200">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Scan Successful</span>
                </div>
                <div className="mt-2 text-sm text-green-700 dark:text-green-300">
                  {scanResult}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Outcome</Label>
                  <Select value={outcome} onValueChange={(value) => {
                    setOutcome(value);
                    setWitnessRequired(value === "given" && scanResult.includes("Controlled"));
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select outcome..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="given">Given</SelectItem>
                      <SelectItem value="refused">Refused</SelectItem>
                      <SelectItem value="omitted">Omitted</SelectItem>
                      <SelectItem value="withheld">Withheld</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {witnessRequired && (
                  <div>
                    <Label>Witness (Required for Controlled Drug)</Label>
                    <Select value={witnessId} onValueChange={setWitnessId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select witness..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="alice">Alice Cooper - Senior Nurse</SelectItem>
                        <SelectItem value="bob">Bob Wilson - Support Worker</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div>
                  <Label>Notes (Optional)</Label>
                  <Textarea 
                    placeholder="Any additional notes..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                <Button onClick={handleConfirm} className="w-full" disabled={!outcome}>
                  Record Administration
                </Button>
              </div>
            </div>
          )}

          {currentStep === "complete" && (
            <div className="text-center space-y-4">
              <CheckCircle className="h-16 w-16 mx-auto text-green-600" />
              <h3 className="text-lg font-semibold">Administration Recorded</h3>
              <p className="text-muted-foreground">
                Medication administration has been successfully recorded
              </p>
              <div className="space-y-2">
                <Button onClick={() => setCurrentStep("select-client")} variant="outline">
                  Record Next Medication
                </Button>
                <Button onClick={onBack} className="w-full">
                  Complete Round
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}