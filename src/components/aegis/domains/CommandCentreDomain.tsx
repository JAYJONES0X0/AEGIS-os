import { SubTabKey } from "../HierarchicalNavigation";
import { HomeTab } from "../tabs/HomeTab";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { 
  AlertTriangle, 
  Clock, 
  MessageSquare, 
  Heart, 
  Users,
  Calendar,
  Activity,
  Zap
} from "lucide-react";

interface CommandCentreDomainProps {
  activeSubTab: SubTabKey;
  onNavigate?: (tab: string, filter?: string) => void;
}

export function CommandCentreDomain({ activeSubTab, onNavigate }: CommandCentreDomainProps) {
  const renderSubTab = () => {
    switch (activeSubTab) {
      case "dashboard":
        return <HomeTab onNavigate={onNavigate} />;
        
      case "shifts":
        return (
          <div className="p-6 space-y-6 aegis-tab-home">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">Active Shifts</h2>
                <p className="text-sm text-muted-foreground">Current shift status and coverage</p>
              </div>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                <Activity className="w-3 h-3 mr-1" />
                7 Active
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "Sarah Mitchell", role: "Senior Support Worker", unit: "Residential Block A", status: "On Duty", time: "07:00 - 19:00" },
                { name: "James Patterson", role: "Night Support", unit: "Residential Block B", status: "Night Shift", time: "19:00 - 07:00" },
                { name: "Emily Rodriguez", role: "Team Leader", unit: "Day Services", status: "On Duty", time: "09:00 - 17:00" },
                { name: "Michael Chen", role: "Support Worker", unit: "Residential Block A", status: "Break", time: "07:00 - 19:00" },
                { name: "Lucy Thompson", role: "Senior Support Worker", unit: "Community", status: "On Visit", time: "08:00 - 16:00" },
                { name: "David Wilson", role: "Support Worker", unit: "Day Services", status: "On Duty", time: "09:00 - 17:00" },
              ].map((shift, index) => (
                <Card key={index} className="aegis-ceremonial-card">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">{shift.name}</CardTitle>
                      <Badge 
                        variant={shift.status === "On Duty" ? "default" : 
                                shift.status === "Break" ? "secondary" : "outline"}
                        className="text-xs"
                      >
                        {shift.status}
                      </Badge>
                    </div>
                    <CardDescription className="text-xs">{shift.role}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-3 h-3" />
                        {shift.unit}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {shift.time}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
        
      case "alerts":
        return (
          <div className="p-6 space-y-6 aegis-tab-home">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">System Alerts</h2>
                <p className="text-sm text-muted-foreground">Critical notifications requiring attention</p>
              </div>
              <Badge variant="destructive" className="animate-pulse">
                <AlertTriangle className="w-3 h-3 mr-1" />
                3 Critical
              </Badge>
            </div>
            
            <div className="space-y-3">
              {[
                { type: "critical", title: "Medication Administration Overdue", message: "Client J. Smith - Insulin due 30 minutes ago", time: "2 mins ago", unit: "Block A" },
                { type: "warning", title: "Staff Coverage Alert", message: "Night shift understaffed - only 2/3 required staff", time: "15 mins ago", unit: "Block B" },
                { type: "critical", title: "Safeguarding Incident", message: "New incident reported requiring immediate review", time: "1 hour ago", unit: "Day Services" },
                { type: "info", title: "Training Expiry", message: "5 staff members have training expiring this week", time: "2 hours ago", unit: "All Units" },
                { type: "warning", title: "Equipment Maintenance", message: "Hoist inspection due in Block A Room 12", time: "3 hours ago", unit: "Block A" },
              ].map((alert, index) => (
                <Card key={index} className={`
                  aegis-ceremonial-card border-l-4 
                  ${alert.type === 'critical' ? 'border-l-destructive bg-destructive/5' : 
                    alert.type === 'warning' ? 'border-l-warning bg-warning/5' : 
                    'border-l-primary bg-primary/5'}
                `}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <AlertTriangle className={`w-4 h-4 ${
                            alert.type === 'critical' ? 'text-destructive' : 
                            alert.type === 'warning' ? 'text-warning' : 
                            'text-primary'
                          }`} />
                          <h4 className="font-semibold text-sm">{alert.title}</h4>
                          <Badge variant="outline" className="text-xs">{alert.unit}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                        <span className="text-xs text-muted-foreground">{alert.time}</span>
                      </div>
                      <Button size="sm" variant="outline" className="ml-4">
                        Acknowledge
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
        
      case "broadcasts":
        return (
          <div className="p-6 space-y-6 aegis-tab-home">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">Broadcasts</h2>
                <p className="text-sm text-muted-foreground">Team communications and announcements</p>
              </div>
              <Button className="aegis-divine-button">
                <MessageSquare className="w-4 h-4 mr-2" />
                New Broadcast
              </Button>
            </div>
            
            <div className="space-y-4">
              {[
                { 
                  from: "Brooklyn John R (Registered Manager)", 
                  title: "CQC Inspection Scheduled", 
                  message: "CQC inspection confirmed for next Tuesday. All documentation should be ready by Monday EOD.",
                  time: "1 hour ago",
                  priority: "high",
                  readBy: "12/23"
                },
                { 
                  from: "Sarah Mitchell (Clinical Lead)", 
                  title: "New Safeguarding Procedures", 
                  message: "Updated safeguarding procedures are now live in the policy section. Please review before your next shift.",
                  time: "3 hours ago",
                  priority: "normal",
                  readBy: "18/23"
                },
                { 
                  from: "System Admin", 
                  title: "Planned Maintenance", 
                  message: "System maintenance scheduled for Sunday 2AM-4AM. Offline mode will be available.",
                  time: "1 day ago",
                  priority: "low",
                  readBy: "23/23"
                }
              ].map((broadcast, index) => (
                <Card key={index} className="aegis-ceremonial-card">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge variant={broadcast.priority === 'high' ? 'destructive' : 
                                      broadcast.priority === 'normal' ? 'default' : 'secondary'}>
                          {broadcast.priority.toUpperCase()}
                        </Badge>
                        <h4 className="font-semibold text-sm">{broadcast.title}</h4>
                      </div>
                      <span className="text-xs text-muted-foreground">{broadcast.time}</span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{broadcast.message}</p>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">From: {broadcast.from}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Read by: {broadcast.readBy}</span>
                        <Button size="sm" variant="ghost" className="h-6 px-2">
                          Mark Read
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
        
      case "copilot":
        return (
          <div className="p-6 space-y-6 aegis-tab-home">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">AEGIS Co-Pilot</h2>
                <p className="text-sm text-muted-foreground">AI-powered assistance and insights</p>
              </div>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                <Zap className="w-3 h-3 mr-1" />
                Active
              </Badge>
            </div>
            
            <Card className="aegis-ceremonial-card bg-gradient-to-br from-primary/5 to-background">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <Heart className="w-12 h-12 mx-auto text-primary animate-pulse" />
                  <h3 className="text-lg font-semibold">AEGIS Co-Pilot Ready</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Your AI assistant is ready to help with care planning, compliance checks, 
                    staff scheduling, and real-time guidance.
                  </p>
                  <Button className="aegis-divine-button">
                    Start Conversation
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "Care Plan Review", desc: "AI-assisted care plan optimization", action: "Review Now" },
                { title: "Compliance Check", desc: "Real-time policy compliance scanning", action: "Run Check" },
                { title: "Staff Insights", desc: "Workload and performance analytics", action: "View Insights" },
                { title: "Risk Assessment", desc: "Predictive risk identification", action: "Assess" },
                { title: "Training Gaps", desc: "Identify training opportunities", action: "Analyze" },
                { title: "Resource Planning", desc: "Optimize resource allocation", action: "Plan" }
              ].map((feature, index) => (
                <Card key={index} className="aegis-ceremonial-card hover:shadow-[0_0_0_1px_rgba(212,175,55,0.28)] transition-all duration-350">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-sm mb-2">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground mb-3">{feature.desc}</p>
                    <Button size="sm" variant="outline" className="w-full">
                      {feature.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
        
      default:
        return <HomeTab onNavigate={onNavigate} />;
    }
  };

  return (
    <div className="min-h-screen aegis-tab-home">
      {renderSubTab()}
    </div>
  );
}