import { SubTabKey } from "../HierarchicalNavigation";
import { AdminTab } from "../tabs/AdminTab";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { 
  Building, 
  UserPlus, 
  Settings, 
  Database, 
  Shield,
  Plus,
  Key,
  Download,
  Upload,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

interface AdministrationDomainProps {
  activeSubTab: SubTabKey;
}

export function AdministrationDomain({ activeSubTab }: AdministrationDomainProps) {
  const renderSubTab = () => {
    switch (activeSubTab) {
      case "tenancy":
        return <AdminTab />;
        
      case "users-roles":
        return (
          <div className="p-6 space-y-6 aegis-tab-admin min-h-screen">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">Users & Roles</h2>
                <p className="text-sm text-muted-foreground">Access control and user management</p>
              </div>
              <Button className="bg-[#EA580C] hover:bg-[#EA580C]/90 text-white">
                <UserPlus className="w-4 h-4 mr-2" />
                Invite User
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <Card className="aegis-ceremonial-card">
                  <CardHeader>
                    <CardTitle className="text-foreground">Active Users</CardTitle>
                    <CardDescription>System access and role assignments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aegis-data-grid">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left p-3">Name</th>
                            <th className="text-left p-3">Email</th>
                            <th className="text-left p-3">Role</th>
                            <th className="text-center p-3">Last Login</th>
                            <th className="text-center p-3">Status</th>
                            <th className="text-center p-3">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { name: "Brooklyn John R", email: "brooklyn.john@aegis.care", role: "Registered Manager", lastLogin: "2 hours ago", status: "active" },
                            { name: "Sarah Mitchell", email: "sarah.mitchell@aegis.care", role: "Clinical Lead", lastLogin: "5 minutes ago", status: "active" },
                            { name: "James Patterson", email: "james.patterson@aegis.care", role: "Senior Support Worker", lastLogin: "1 hour ago", status: "active" },
                            { name: "Emily Rodriguez", email: "emily.rodriguez@aegis.care", role: "Team Leader", lastLogin: "3 hours ago", status: "active" },
                            { name: "Michael Chen", email: "michael.chen@aegis.care", role: "Support Worker", lastLogin: "2 days ago", status: "inactive" },
                            { name: "Lucy Thompson", email: "lucy.thompson@aegis.care", role: "Quality Lead", lastLogin: "30 minutes ago", status: "active" }
                          ].map((user, index) => (
                            <tr key={index} className="border-b border-border/50 hover:bg-muted/20">
                              <td className="p-3 font-medium">{user.name}</td>
                              <td className="p-3 text-muted-foreground font-mono text-sm">{user.email}</td>
                              <td className="p-3">{user.role}</td>
                              <td className="p-3 text-center text-sm">{user.lastLogin}</td>
                              <td className="p-3 text-center">
                                <Badge 
                                  variant={user.status === 'active' ? 'default' : 'secondary'}
                                  className={user.status === 'active' ? 'bg-success/20 text-success border-success/30' : 'bg-muted/50'}
                                >
                                  {user.status}
                                </Badge>
                              </td>
                              <td className="p-3 text-center">
                                <Button size="sm" variant="outline" className="text-xs">
                                  Manage
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-4">
                <Card className="aegis-ceremonial-card">
                  <CardHeader>
                    <CardTitle className="text-foreground">Role Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Users</span>
                      <span className="font-medium">23</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Active</span>
                      <span className="font-medium text-success">21</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Pending Approval</span>
                      <span className="font-medium text-warning">2</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Suspended</span>
                      <span className="font-medium text-destructive">0</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="aegis-ceremonial-card">
                  <CardHeader>
                    <CardTitle className="text-foreground">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start bg-muted/30">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Bulk Invite
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-muted/30">
                      <Settings className="w-4 h-4 mr-2" />
                      Role Permissions
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-muted/30">
                      <Download className="w-4 h-4 mr-2" />
                      Export Users
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );
        
      case "integrations":
        return (
          <div className="p-6 space-y-6 aegis-tab-admin min-h-screen">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">Integrations</h2>
                <p className="text-sm text-muted-foreground">API keys, toggles, and external connections</p>
              </div>
              <Button className="bg-[#EA580C] hover:bg-[#EA580C]/90 text-white">
                <Key className="w-4 h-4 mr-2" />
                Generate Key
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[
                {
                  name: "NHS e-Referral Service (eRS)",
                  type: "Healthcare",
                  status: "connected",
                  lastSync: "2 hours ago",
                  description: "Automated referral processing and appointment booking",
                  version: "v2.1",
                  endpoint: "https://api.ers.nhs.uk/v2"
                },
                {
                  name: "QCS Policy Management",
                  type: "Compliance",
                  status: "connected",
                  lastSync: "15 minutes ago",
                  description: "Policy synchronization and updates",
                  version: "v1.8",
                  endpoint: "https://api.qcs.co.uk/v1"
                },
                {
                  name: "Sage Payroll Integration",
                  type: "Finance",
                  status: "connected",
                  lastSync: "1 day ago",
                  description: "Automated payroll export and RTI submission",
                  version: "v3.2",
                  endpoint: "https://api.sage.com/payroll/v3"
                },
                {
                  name: "Xero Accounting",
                  type: "Finance",
                  status: "pending",
                  lastSync: "Never",
                  description: "Financial data synchronization",
                  version: "v2.0",
                  endpoint: "https://api.xero.com/api.xro/2.0"
                },
                {
                  name: "GP Connect",
                  type: "Healthcare",
                  status: "error",
                  lastSync: "3 days ago",
                  description: "Patient record access and sharing",
                  version: "v1.5",
                  endpoint: "https://orange.testlab.nhs.uk/"
                },
                {
                  name: "CQC Provider Portal",
                  type: "Compliance",
                  status: "connected",
                  lastSync: "6 hours ago",
                  description: "Regulatory reporting and notifications",
                  version: "v1.0",
                  endpoint: "https://api.cqc.org.uk/v1"
                }
              ].map((integration, index) => (
                <Card key={index} className={`
                  aegis-ceremonial-card border-l-4 
                  ${integration.status === 'connected' ? 'border-l-success bg-success/5' :
                    integration.status === 'pending' ? 'border-l-warning bg-warning/5' :
                    'border-l-destructive bg-destructive/5'}
                `}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-foreground">{integration.name}</CardTitle>
                        <CardDescription>{integration.description}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-muted/50 text-xs">
                          {integration.type}
                        </Badge>
                        <Badge 
                          variant={integration.status === 'connected' ? 'default' : 
                                  integration.status === 'pending' ? 'secondary' : 'destructive'}
                          className={
                            integration.status === 'connected' ? 'bg-success/20 text-success border-success/30' :
                            integration.status === 'pending' ? 'bg-warning/20 text-warning border-warning/30' :
                            'bg-destructive/20 text-destructive border-destructive/30'
                          }
                        >
                          {integration.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Version:</span>
                          <div className="font-mono">{integration.version}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Last Sync:</span>
                          <div className="font-medium">{integration.lastSync}</div>
                        </div>
                      </div>
                      
                      <div>
                        <span className="text-muted-foreground text-sm">Endpoint:</span>
                        <div className="font-mono text-xs text-muted-foreground break-all">
                          {integration.endpoint}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="bg-muted/30">
                          <Settings className="w-4 h-4 mr-2" />
                          Configure
                        </Button>
                        {integration.status === 'connected' && (
                          <Button size="sm" variant="outline" className="bg-muted/30">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Test
                          </Button>
                        )}
                        {integration.status === 'error' && (
                          <Button size="sm" variant="outline" className="bg-muted/30">
                            <AlertTriangle className="w-4 h-4 mr-2" />
                            Reconnect
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
        
      default:
        return <AdminTab />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderSubTab()}
    </div>
  );
}