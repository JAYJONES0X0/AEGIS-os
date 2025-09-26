import { useState } from "react";
import { Section } from "../common/Section";
import { KpiGrid } from "../home/KpiGrid";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import { mockClients, mockStaff, mockKPIs } from "../../lib/mock-data";
import { Heart, Users, Activity, Clock, CheckCircle2, AlertCircle } from "lucide-react";

interface CareSupportDomainProps {
  activeTab?: string;
}

export function CareSupportDomain({ activeTab = 'overview' }: CareSupportDomainProps) {
  const [localTab, setLocalTab] = useState(activeTab);

  const careSupportKPIs = [
    { label: "Active Care Plans", value: mockClients.length.toString() },
    { label: "Support Workers", value: mockStaff.filter(s => s.role.includes('Support Worker')).length.toString() },
    { label: "Daily Activities", value: "156" },
    { label: "Wellness Score", value: "92%" },
    { label: "Family Engagement", value: "87%" },
    { label: "Med Compliance", value: `${mockKPIs.medication_compliance.value}%` }
  ];

  const dailyActivities = [
    { time: "08:00", activity: "Morning Care Routine", residents: 45, status: "Completed", progress: 100 },
    { time: "09:30", activity: "Breakfast & Medication", residents: 52, status: "In Progress", progress: 75 },
    { time: "11:00", activity: "Social Activities", residents: 28, status: "Starting", progress: 25 },
    { time: "14:00", activity: "Afternoon Care", residents: 38, status: "Scheduled", progress: 0 },
    { time: "16:30", activity: "Family Visits", residents: 15, status: "Scheduled", progress: 0 },
    { time: "19:00", activity: "Evening Routine", residents: 48, status: "Scheduled", progress: 0 }
  ];

  const careAlerts = [
    { id: 1, resident: mockClients[0].name, alert: "Assistance needed with mobility", priority: "Medium", time: "10:15" },
    { id: 2, resident: mockClients[1].name, alert: "Medication reminder due", priority: "High", time: "10:30" },
    { id: 3, resident: mockClients[2].name, alert: "Family visit scheduled", priority: "Low", time: "14:00" }
  ];

  const recentActivities = [
    { resident: "John Smith", activity: "Physical Therapy", worker: "Emma Johnson", time: "09:45", status: "Completed" },
    { resident: "Mary Wilson", activity: "Social Hour", worker: "David Brown", time: "10:30", status: "In Progress" },
    { resident: "Robert Davis", activity: "Personal Care", worker: "Lisa Thompson", time: "11:15", status: "Starting" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "text-green-400";
      case "In Progress": return "text-blue-400";
      case "Starting": return "text-yellow-400";
      case "Scheduled": return "text-gray-400";
      default: return "text-gray-400";
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

  const getProgressColor = (progress: number) => {
    if (progress === 100) return "bg-green-500";
    if (progress > 50) return "bg-blue-500";
    if (progress > 0) return "bg-yellow-500";
    return "bg-gray-300";
  };

  return (
    <div className="p-6 space-y-8 min-h-screen aegis-tab-home">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary tracking-tight">
            Care & Support
          </h1>
          <p className="text-muted-foreground mt-1">
            Resident care coordination and daily support activities
          </p>
        </div>
        
        <div className="text-right">
          <div className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-foreground/80">Care systems active</span>
          </div>
        </div>
      </div>

      <Tabs value={localTab} onValueChange={setLocalTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-card/50 backdrop-blur-sm">
          <TabsTrigger value="overview" className="text-sm">Overview</TabsTrigger>
          <TabsTrigger value="activities" className="text-sm">Daily Activities</TabsTrigger>
          <TabsTrigger value="alerts" className="text-sm">Care Alerts</TabsTrigger>
          <TabsTrigger value="wellness" className="text-sm">Wellness</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Section title="Care & Support Metrics">
            <KpiGrid kpis={careSupportKPIs} />
          </Section>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="aegis-ceremonial-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-500" />
                  Daily Activity Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dailyActivities.slice(0, 4).map((activity, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm">{activity.activity}</div>
                          <div className="text-xs text-muted-foreground">
                            {activity.time} • {activity.residents} residents
                          </div>
                        </div>
                        <Badge variant={activity.status === "Completed" ? "default" : "outline"}>
                          {activity.status}
                        </Badge>
                      </div>
                      <Progress value={activity.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="aegis-ceremonial-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-500" />
                  Active Care Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {careAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <div className="font-medium text-sm">{alert.resident}</div>
                        <div className="text-xs text-muted-foreground">{alert.alert}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getPriorityColor(alert.priority) as any}>
                          {alert.priority}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{alert.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activities" className="space-y-6">
          <Section title="Daily Activity Schedule">
            <Card className="aegis-ceremonial-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Today's Activities</CardTitle>
                  <Button variant="outline" size="sm">
                    <Clock className="w-4 h-4 mr-2" />
                    Schedule Activity
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dailyActivities.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="font-bold text-primary">{activity.time}</div>
                          <div className={`text-xs ${getStatusColor(activity.status)}`}>
                            {activity.status}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{activity.activity}</div>
                          <div className="text-sm text-muted-foreground">
                            {activity.residents} residents participating
                          </div>
                          <div className="mt-2">
                            <Progress value={activity.progress} className="h-2" />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium">{activity.progress}%</span>
                        <Button variant="ghost" size="sm">Manage</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Section>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Section title="Care Alerts & Notifications">
            <div className="grid gap-4">
              {careAlerts.map((alert) => (
                <Card key={alert.id} className="aegis-ceremonial-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center">
                          <AlertCircle className="w-6 h-6 text-yellow-500" />
                        </div>
                        <div>
                          <div className="font-bold text-lg">{alert.resident}</div>
                          <div className="text-muted-foreground">{alert.alert}</div>
                          <div className="text-sm text-muted-foreground mt-1">Time: {alert.time}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={getPriorityColor(alert.priority) as any} className="text-sm">
                          {alert.priority} Priority
                        </Badge>
                        <Button variant="default" size="sm">
                          Address
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Section>
        </TabsContent>

        <TabsContent value="wellness" className="space-y-6">
          <Section title="Resident Wellness Overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="aegis-ceremonial-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    Wellness Indicators
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { metric: "Physical Health", score: 92, trend: "+2%" },
                      { metric: "Mental Wellbeing", score: 88, trend: "+5%" },
                      { metric: "Social Engagement", score: 85, trend: "-1%" },
                      { metric: "Nutritional Status", score: 94, trend: "+3%" }
                    ].map((wellness, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{wellness.metric}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold">{wellness.score}%</span>
                            <span className={`text-xs ${wellness.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                              {wellness.trend}
                            </span>
                          </div>
                        </div>
                        <Progress value={wellness.score} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="aegis-ceremonial-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-500" />
                    Recent Care Activities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <div className="font-medium text-sm">{activity.resident}</div>
                          <div className="text-xs text-muted-foreground">
                            {activity.activity} • {activity.worker}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{activity.time}</div>
                          <div className={`text-xs ${getStatusColor(activity.status)}`}>
                            {activity.status}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </Section>
        </TabsContent>
      </Tabs>
    </div>
  );
}