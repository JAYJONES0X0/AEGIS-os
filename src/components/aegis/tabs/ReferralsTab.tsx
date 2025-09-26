import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { DataGrid } from "../DataGrid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  Plus,
  FileText,
  Clock,
  CheckCircle,
  XCircle
} from "lucide-react";
import { mockReferrals } from "../../../lib/mock-data";

export function ReferralsTab() {
  const referralColumns = [
    { key: "client", title: "Client" },
    { key: "service", title: "Service" },
    { key: "referral_date", title: "Referral Date" },
    { key: "appointment_date", title: "Appointment" },
    { 
      key: "status", 
      title: "Status",
      render: (value: string) => {
        const colors = {
          "Booked": "default",
          "Pending": "secondary",
          "Completed": "outline",
          "Cancelled": "destructive"
        };
        return <Badge variant={colors[value as keyof typeof colors] as any}>{value}</Badge>;
      }
    },
    { 
      key: "priority", 
      title: "Priority",
      render: (value: string) => {
        const colors = {
          "Urgent": "destructive",
          "Routine": "outline",
          "Soon": "secondary"
        };
        return <Badge variant={colors[value as keyof typeof colors] as any}>{value}</Badge>;
      }
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Referrals & Appointments</h1>
          <p className="text-muted-foreground">
            Manage external referrals, appointments and transport
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Referral
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Active Referrals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockReferrals.filter(r => r.status !== "Completed").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Pending Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {mockReferrals.filter(r => r.status === "Pending").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {mockReferrals.filter(r => r.appointment_date).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Transport Required</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="gp-pcn">
        <TabsList>
          <TabsTrigger value="gp-pcn">GP & PCN</TabsTrigger>
          <TabsTrigger value="secondary">Secondary Care</TabsTrigger>
          <TabsTrigger value="transport">Transport</TabsTrigger>
        </TabsList>

        <TabsContent value="gp-pcn">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">GP & Primary Care Network</h3>
              <div className="flex gap-2">
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Letter
                </Button>
                <Button variant="outline">Find Slots</Button>
              </div>
            </div>

            <DataGrid
              columns={referralColumns}
              data={mockReferrals}
            />

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">GP Letter Templates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      Medication Review Request
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      Health Check Referral
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      Specialist Referral
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Slot Availability</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Dr. Smith - Today</span>
                      <Badge variant="destructive">Full</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Dr. Jones - Tomorrow</span>
                      <Badge variant="outline">3 slots</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Nurse Clinic</span>
                      <Badge variant="default">Available</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Recent Outcomes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">John Smith - BP Check</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-amber-600" />
                      <span className="text-sm">Mary Johnson - Pending</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Robert Brown - Med Review</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="secondary">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Secondary Care Referrals</h3>
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Export eRS
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Specialties</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Cardiology</span>
                      <span className="font-medium">2 referrals</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Orthopedics</span>
                      <span className="font-medium">1 referral</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Mental Health</span>
                      <span className="font-medium">3 referrals</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Waiting Times</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Cardiology</span>
                      <Badge variant="outline">6 weeks</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Orthopedics</span>
                      <Badge variant="destructive">12 weeks</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Mental Health</span>
                      <Badge variant="secondary">4 weeks</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="transport">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Transport & Escorts</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Today's Transports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">John Smith</div>
                        <div className="text-sm text-muted-foreground">GP Appointment</div>
                        <div className="text-sm text-muted-foreground">14:00 - Hospital</div>
                      </div>
                      <Badge variant="outline">Booked</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Mary Johnson</div>
                        <div className="text-sm text-muted-foreground">Physiotherapy</div>
                        <div className="text-sm text-muted-foreground">10:30 - Clinic</div>
                      </div>
                      <Badge variant="default">In Progress</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Escort Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Mobility Support</span>
                      <span className="font-medium">2</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Behavioral Support</span>
                      <span className="font-medium">1</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Communication Aid</span>
                      <span className="font-medium">1</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Transport Providers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-600" />
                      <span className="text-sm">Care Transport Ltd</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-600" />
                      <span className="text-sm">NHS Patient Transport</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-600" />
                      <span className="text-sm">Accessibility Cars</span>
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