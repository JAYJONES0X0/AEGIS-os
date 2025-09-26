import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { DataGrid } from "../DataGrid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Switch } from "../../ui/switch";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { 
  Building, 
  Users, 
  Link, 
  Database, 
  Settings, 
  Shield, 
  Key,
  Plus,
  Edit,
  Trash2,
  Download,
  Upload
} from "lucide-react";

export function AdminTab() {
  const siteData = [
    { id: "1", name: "Oakwood House", type: "Residential", capacity: 24, occupancy: 22 },
    { id: "2", name: "Riverside Lodge", type: "Nursing", capacity: 18, occupancy: 16 },
    { id: "3", name: "Community Hub", type: "Supported Living", capacity: 12, occupancy: 11 }
  ];

  const userData = [
    { id: "1", name: "Sarah Mitchell", email: "sarah.mitchell@oakwood.care", role: "Registered Manager", status: "Active", last_login: "2024-01-17 09:30" },
    { id: "2", name: "Alice Cooper", email: "alice.cooper@oakwood.care", role: "Senior Nurse", status: "Active", last_login: "2024-01-17 14:15" },
    { id: "3", name: "Bob Wilson", email: "bob.wilson@oakwood.care", role: "Support Worker", status: "Active", last_login: "2024-01-16 22:45" }
  ];

  const integrationData = [
    { name: "NHS Login", status: "Connected", last_sync: "2024-01-17 15:30", type: "Authentication" },
    { name: "QCS Policies", status: "Connected", last_sync: "2024-01-17 06:00", type: "Quality Management" },
    { name: "eMAR System", status: "Connected", last_sync: "2024-01-17 16:00", type: "Medication" },
    { name: "Payroll Export", status: "Configured", last_sync: "2024-01-15 09:00", type: "HR System" }
  ];

  const siteColumns = [
    { key: "name", title: "Site Name" },
    { key: "type", title: "Type" },
    { key: "capacity", title: "Capacity" },
    { key: "occupancy", title: "Current Occupancy" },
    {
      key: "utilization",
      title: "Utilization",
      render: (_: any, row: any) => {
        const util = Math.round((row.occupancy / row.capacity) * 100);
        return <Badge variant={util > 90 ? "default" : util > 70 ? "secondary" : "outline"}>{util}%</Badge>;
      }
    }
  ];

  const userColumns = [
    { key: "name", title: "Name" },
    { key: "email", title: "Email" },
    { key: "role", title: "Role" },
    { 
      key: "status", 
      title: "Status",
      render: (value: string) => (
        <Badge variant={value === "Active" ? "default" : "secondary"}>{value}</Badge>
      )
    },
    { key: "last_login", title: "Last Login" }
  ];

  const integrationColumns = [
    { key: "name", title: "Integration" },
    { key: "type", title: "Type" },
    { 
      key: "status", 
      title: "Status",
      render: (value: string) => {
        const colors = {
          "Connected": "default",
          "Configured": "secondary",
          "Error": "destructive",
          "Disconnected": "outline"
        };
        return <Badge variant={colors[value as keyof typeof colors] as any}>{value}</Badge>;
      }
    },
    { key: "last_sync", title: "Last Sync" }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">System Administration</h1>
          <p className="text-muted-foreground">
            Manage sites, users, integrations and system settings
          </p>
        </div>
        <Button variant="outline">
          <Settings className="mr-2 h-4 w-4" />
          System Health
        </Button>
      </div>

      {/* Admin Tabs */}
      <Tabs defaultValue="sites">
        <TabsList>
          <TabsTrigger value="sites">Sites & Tenancies</TabsTrigger>
          <TabsTrigger value="users">Users & Roles</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="data">Data Management</TabsTrigger>
        </TabsList>

        <TabsContent value="sites">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Sites & Locations</h3>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Site
              </Button>
            </div>

            <DataGrid
              columns={siteColumns}
              data={siteData}
            />

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Site Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label>Organization Name</Label>
                      <Input defaultValue="Oakwood Care Services Ltd" />
                    </div>
                    <div>
                      <Label>CQC Registration Number</Label>
                      <Input defaultValue="1-1234567890" />
                    </div>
                    <div>
                      <Label>Primary Contact</Label>
                      <Input defaultValue="sarah.mitchell@oakwood.care" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label>Registered Manager</Label>
                      <Input defaultValue="Sarah Mitchell" />
                    </div>
                    <div>
                      <Label>Emergency Contact</Label>
                      <Input defaultValue="+44 20 7946 0958" />
                    </div>
                    <div>
                      <Label>Out of Hours Contact</Label>
                      <Input defaultValue="+44 20 7946 0959" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">User Management</h3>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Bulk Import
                </Button>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </div>
            </div>

            <DataGrid
              columns={userColumns}
              data={userData}
            />

            {/* Role Configuration */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Registered Manager</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div>• Full system access</div>
                    <div>• User management</div>
                    <div>• Compliance oversight</div>
                    <div>• Financial reports</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Clinical Lead</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div>• Clinical records access</div>
                    <div>• eMAR administration</div>
                    <div>• Incident management</div>
                    <div>• Staff supervision</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Support Worker</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div>• Assigned client access</div>
                    <div>• Daily note creation</div>
                    <div>• Basic eMAR functions</div>
                    <div>• Policy acknowledgment</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="integrations">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">System Integrations</h3>
              <Button>
                <Link className="mr-2 h-4 w-4" />
                Add Integration
              </Button>
            </div>

            <DataGrid
              columns={integrationColumns}
              data={integrationData}
            />

            {/* Integration Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Authentication</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">NHS Login SSO</div>
                      <div className="text-sm text-muted-foreground">Single sign-on for clinical staff</div>
                    </div>
                    <Switch checked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Multi-Factor Authentication</div>
                      <div className="text-sm text-muted-foreground">Required for administrative users</div>
                    </div>
                    <Switch checked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Session Timeout</div>
                      <div className="text-sm text-muted-foreground">Auto-logout after inactivity</div>
                    </div>
                    <Switch checked />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Data Sync</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">QCS Policy Sync</div>
                      <div className="text-sm text-muted-foreground">Daily at 06:00</div>
                    </div>
                    <Switch checked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Payroll Export</div>
                      <div className="text-sm text-muted-foreground">Weekly on Sundays</div>
                    </div>
                    <Switch checked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Backup Sync</div>
                      <div className="text-sm text-muted-foreground">Continuous backup</div>
                    </div>
                    <Switch checked />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="data">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Data Management</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Data Export
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Database className="mr-2 h-4 w-4" />
                    Export All Data
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Export Client Records
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="mr-2 h-4 w-4" />
                    Export Audit Logs
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    Retention Policy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Client Records</span>
                    <span>8 years</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Incidents</span>
                    <span>10 years</span>
                  </div>
                  <div className="flex justify-between">
                    <span>MAR Records</span>
                    <span>8 years</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Audit Logs</span>
                    <span>7 years</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Key className="h-4 w-4" />
                    Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Encryption at Rest</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">TLS 1.3</span>
                    <Badge variant="default">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Audit Logging</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* System Health */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">System Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">99.9%</div>
                    <div className="text-sm text-muted-foreground">Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">2.3GB</div>
                    <div className="text-sm text-muted-foreground">Data Storage</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">127ms</div>
                    <div className="text-sm text-muted-foreground">Avg Response</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">45</div>
                    <div className="text-sm text-muted-foreground">Active Users</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}