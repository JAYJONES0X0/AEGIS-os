import { useState } from "react";
import { Section } from "../common/Section";
import { KpiGrid } from "../home/KpiGrid";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Avatar, AvatarFallback, AvatarInitials } from "../ui/avatar";
import { Settings, Users, Shield, Database, Bell, Lock } from "lucide-react";

export function AdministrationDomain() {
  const [activeTab, setActiveTab] = useState("overview");

  const adminKPIs = [
    { label: "Active Users", value: "156" },
    { label: "System Uptime", value: "99.8%" },
    { label: "Data Backup", value: "Complete" },
    { label: "Security Alerts", value: "2" },
    { label: "License Usage", value: "87%" },
    { label: "System Health", value: "Excellent" }
  ];

  const systemUsers = [
    { name: "Dr. Sarah Johnson", role: "Clinical Director", status: "Active", lastLogin: "2 hours ago", permissions: "Full" },
    { name: "Michael Brown", role: "Registered Manager", status: "Active", lastLogin: "30 minutes ago", permissions: "Full" },
    { name: "Emma Wilson", role: "Quality Lead", status: "Active", lastLogin: "1 hour ago", permissions: "Quality" },
    { name: "David Thompson", role: "HR Manager", status: "Active", lastLogin: "4 hours ago", permissions: "HR" },
    { name: "Lisa Roberts", role: "Finance Manager", status: "Active", lastLogin: "1 day ago", permissions: "Finance" }
  ];

  const securityAlerts = [
    { id: 1, alert: "Multiple failed login attempts", severity: "Medium", time: "2 hours ago", status: "Investigating" },
    { id: 2, alert: "Unusual data access pattern", severity: "Low", time: "1 day ago", status: "Resolved" },
    { id: 3, alert: "Password policy violation", severity: "Low", time: "3 days ago", status: "Resolved" }
  ];

  const systemSettings = [
    { category: "User Management", description: "Manage user accounts and permissions", status: "Configured" },
    { category: "Data Backup", description: "Automated backup configuration", status: "Active" },
    { category: "Security Policies", description: "Password and access policies", status: "Configured" },
    { category: "Audit Logging", description: "System activity tracking", status: "Active" },
    { category: "Integration Settings", description: "Third-party integrations", status: "Configured" },
    { category: "Notification Rules", description: "Alert and notification setup", status: "Active" }
  ];

  const auditLogs = [
    { timestamp: "2024-01-15 14:30", user: "Dr. Sarah Johnson", action: "Updated patient record", resource: "Patient ID: 12345" },
    { timestamp: "2024-01-15 14:15", user: "Michael Brown", action: "Generated quality report", resource: "QR-2024-001" },
    { timestamp: "2024-01-15 13:45", user: "Emma Wilson", action: "Modified care plan", resource: "Care Plan: CP-789" },
    { timestamp: "2024-01-15 13:30", user: "System", action: "Automated backup completed", resource: "Daily Backup" }
  ];

  const licenseUsage = [
    { license: "Clinical Users", used: 45, total: 50, percentage: 90 },
    { license: "Care Workers", used: 78, total: 100, percentage: 78 },
    { license: "Administrative", used: 23, total: 30, percentage: 77 },
    { license: "Family Portal", used: 156, total: 200, percentage: 78 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "text-green-500";
      case "Configured": return "text-blue-500";
      case "Investigating": return "text-yellow-500";
      case "Resolved": return "text-green-500";
      case "Inactive": return "text-gray-500";
      default: return "text-gray-500";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active": return "default";
      case "Configured": return "secondary";
      case "Investigating": return "secondary";
      case "Resolved": return "outline";
      case "Inactive": return "outline";
      default: return "outline";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High": return "destructive";
      case "Medium": return "secondary";
      case "Low": return "outline";
      default: return "outline";
    }
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return "text-red-500";
    if (percentage >= 80) return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <div className="p-6 space-y-8 min-h-screen aegis-tab-home">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary tracking-tight">
            Administration
          </h1>
          <p className="text-muted-foreground mt-1">
            System administration, user management, and security oversight
          </p>
        </div>
        
        <div className="text-right">
          <div className="text-sm text-muted-foreground">
            System Status: Operational • {new Date().toLocaleTimeString()}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-foreground/80">All systems normal</span>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-card/50 backdrop-blur-sm">
          <TabsTrigger value="overview" className="text-sm">Overview</TabsTrigger>
          <TabsTrigger value="users" className="text-sm">Users</TabsTrigger>
          <TabsTrigger value="security" className="text-sm">Security</TabsTrigger>
          <TabsTrigger value="system" className="text-sm">System</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Section title="Administration Overview">
            <KpiGrid kpis={adminKPIs} />
          </Section>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="aegis-ceremonial-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-red-500" />
                  Security Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {securityAlerts.slice(0, 3).map((alert) => (
                    <div key={alert.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <div className="font-medium text-sm">{alert.alert}</div>
                        <div className="text-xs text-muted-foreground">{alert.time}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getSeverityColor(alert.severity) as any}>
                          {alert.severity}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="aegis-ceremonial-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-blue-500" />
                  License Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {licenseUsage.map((license, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{license.license}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold">{license.used}/{license.total}</span>
                          <span className={`text-xs ${getUsageColor(license.percentage)}`}>
                            {license.percentage}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Section title="User Management">
            <Card className="aegis-ceremonial-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>System Users</CardTitle>
                  <Button variant="outline" size="sm">
                    <Users className="w-4 h-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemUsers.map((user, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback>
                            <AvatarInitials name={user.name} />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.role}</div>
                          <div className="text-xs text-muted-foreground">
                            Permissions: {user.permissions}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={getStatusBadge(user.status) as any}>
                          {user.status}
                        </Badge>
                        <div className="text-xs text-muted-foreground mt-1">
                          Last login: {user.lastLogin}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Section>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Section title="Security & Audit">
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
              <Card className="aegis-ceremonial-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5 text-yellow-500" />
                    Recent Security Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {securityAlerts.map((alert) => (
                      <div key={alert.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-yellow-500/10 rounded-full flex items-center justify-center">
                            <Shield className="w-5 h-5 text-yellow-500" />
                          </div>
                          <div>
                            <div className="font-medium">{alert.alert}</div>
                            <div className="text-sm text-muted-foreground">{alert.time}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant={getSeverityColor(alert.severity) as any}>
                            {alert.severity}
                          </Badge>
                          <Badge variant="outline">{alert.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="aegis-ceremonial-card">
              <CardHeader>
                <CardTitle>Audit Log</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {auditLogs.map((log, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <div className="font-medium text-sm">{log.action}</div>
                        <div className="text-xs text-muted-foreground">
                          {log.user} • {log.timestamp}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground text-right">
                        {log.resource}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Section>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Section title="System Configuration">
            <div className="grid gap-4">
              {systemSettings.map((setting, index) => (
                <Card key={index} className="aegis-ceremonial-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Settings className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="font-bold text-lg">{setting.category}</div>
                          <div className="text-muted-foreground">{setting.description}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={getStatusBadge(setting.status) as any} className="text-sm">
                          {setting.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Section>
        </TabsContent>
      </Tabs>
    </div>
  );
}