import { useState } from "react";
import { Section } from "../common/Section";
import { KpiGrid } from "../home/KpiGrid";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Avatar, AvatarFallback, AvatarInitials } from "../ui/avatar";
import { Progress } from "../ui/progress";
import { Users, Calendar, MessageCircle, Heart, Phone, Mail } from "lucide-react";

export function CommunityFamilyDomain() {
  const [activeTab, setActiveTab] = useState("overview");

  const communityKPIs = [
    { label: "Family Members", value: "342" },
    { label: "Active Visitors", value: "89" },
    { label: "Communication Rate", value: "94%" },
    { label: "Satisfaction Score", value: "4.7/5" },
    { label: "Events This Month", value: "23" },
    { label: "Feedback Responses", value: "187" }
  ];

  const upcomingEvents = [
    { date: "2024-01-18", time: "14:00", event: "Family Tea Afternoon", attendees: 45, type: "Social" },
    { date: "2024-01-20", time: "10:30", event: "Care Plan Review Meeting", attendees: 12, type: "Clinical" },
    { date: "2024-01-22", time: "15:00", event: "Music Therapy Session", attendees: 28, type: "Therapy" },
    { date: "2024-01-25", time: "11:00", event: "Quarterly Family Forum", attendees: 78, type: "Forum" }
  ];

  const recentCommunications = [
    { id: 1, family: "Thompson Family", resident: "Margaret Thompson", type: "Update", time: "2 hours ago", content: "Daily care update shared" },
    { id: 2, family: "Wilson Family", resident: "Robert Wilson", type: "Message", time: "4 hours ago", content: "Family inquiry about visiting hours" },
    { id: 3, family: "Davies Family", resident: "Sarah Davies", type: "Call", time: "1 day ago", content: "Scheduled care discussion completed" },
    { id: 4, family: "Brown Family", resident: "John Brown", type: "Update", time: "1 day ago", content: "Weekly progress report sent" }
  ];

  const familyFeedback = [
    { family: "Johnson Family", rating: 5, comment: "Excellent care and communication", date: "2024-01-15", category: "General" },
    { family: "Smith Family", rating: 4, comment: "Very satisfied with the facilities", date: "2024-01-14", category: "Facilities" },
    { family: "Davis Family", rating: 5, comment: "Staff are wonderful and caring", date: "2024-01-13", category: "Staff" },
    { family: "Wilson Family", rating: 4, comment: "Good progress in therapy sessions", date: "2024-01-12", category: "Clinical" }
  ];

  const engagementMetrics = [
    { metric: "Family Portal Usage", current: 87, target: 90, trend: "+5%" },
    { metric: "Event Attendance", current: 73, target: 75, trend: "+8%" },
    { metric: "Communication Response", current: 94, target: 85, trend: "+12%" },
    { metric: "Satisfaction Rating", current: 94, target: 90, trend: "+3%" }
  ];

  const visitorSchedule = [
    { time: "09:00 - 11:00", visitor: "Thompson Family", resident: "Margaret Thompson", purpose: "Social Visit" },
    { time: "11:30 - 12:30", visitor: "Dr. Roberts", resident: "Multiple", purpose: "Medical Consultation" },
    { time: "14:00 - 16:00", visitor: "Wilson Family", resident: "Robert Wilson", purpose: "Care Planning" },
    { time: "16:30 - 17:30", visitor: "Davies Family", resident: "Sarah Davies", purpose: "Social Visit" }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Social": return "text-blue-500";
      case "Clinical": return "text-green-500";
      case "Therapy": return "text-purple-500";
      case "Forum": return "text-orange-500";
      default: return "text-gray-500";
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "Social": return "secondary";
      case "Clinical": return "default";
      case "Therapy": return "outline";
      case "Forum": return "destructive";
      default: return "outline";
    }
  };

  const getCommunicationType = (type: string) => {
    switch (type) {
      case "Update": return "default";
      case "Message": return "secondary";
      case "Call": return "outline";
      default: return "outline";
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 5) return "text-green-500";
    if (rating >= 4) return "text-blue-500";
    if (rating >= 3) return "text-yellow-500";
    return "text-red-500";
  };

  const getTrendColor = (trend: string) => {
    return trend.startsWith('+') ? "text-green-500" : "text-red-500";
  };

  return (
    <div className="p-6 space-y-8 min-h-screen aegis-tab-home">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary tracking-tight">
            Community & Family
          </h1>
          <p className="text-muted-foreground mt-1">
            Family engagement, community events, and communication management
          </p>
        </div>
        
        <div className="text-right">
          <div className="text-sm text-muted-foreground">
            Active visitors today: 12 • {new Date().toLocaleTimeString()}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-foreground/80">Community active</span>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-card/50 backdrop-blur-sm">
          <TabsTrigger value="overview" className="text-sm">Overview</TabsTrigger>
          <TabsTrigger value="events" className="text-sm">Events</TabsTrigger>
          <TabsTrigger value="communication" className="text-sm">Communication</TabsTrigger>
          <TabsTrigger value="feedback" className="text-sm">Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Section title="Community & Family Metrics">
            <KpiGrid kpis={communityKPIs} />
          </Section>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="aegis-ceremonial-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  Today's Visitors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {visitorSchedule.map((visit, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <div className="font-medium text-sm">{visit.visitor}</div>
                        <div className="text-xs text-muted-foreground">
                          {visit.resident} • {visit.purpose}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{visit.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="aegis-ceremonial-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-green-500" />
                  Recent Communications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentCommunications.slice(0, 4).map((comm) => (
                    <div key={comm.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <div className="font-medium text-sm">{comm.family}</div>
                        <div className="text-xs text-muted-foreground">{comm.content}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getCommunicationType(comm.type) as any}>
                          {comm.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{comm.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <Section title="Community Events">
            <Card className="aegis-ceremonial-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Upcoming Events</CardTitle>
                  <Button variant="outline" size="sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Event
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="font-bold text-primary">{event.date}</div>
                          <div className="text-sm text-muted-foreground">{event.time}</div>
                        </div>
                        <div>
                          <div className="font-medium">{event.event}</div>
                          <div className="text-sm text-muted-foreground">
                            {event.attendees} expected attendees
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={getTypeBadge(event.type) as any}>
                          {event.type}
                        </Badge>
                        <Button variant="ghost" size="sm">Manage</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Section>
        </TabsContent>

        <TabsContent value="communication" className="space-y-6">
          <Section title="Family Communication">
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
              <Card className="aegis-ceremonial-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-blue-500" />
                    Communication Log
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentCommunications.map((comm) => (
                      <div key={comm.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
                            {comm.type === "Call" ? <Phone className="w-5 h-5 text-blue-500" /> : 
                             comm.type === "Message" ? <MessageCircle className="w-5 h-5 text-green-500" /> :
                             <Mail className="w-5 h-5 text-purple-500" />}
                          </div>
                          <div>
                            <div className="font-medium">{comm.family}</div>
                            <div className="text-sm text-muted-foreground">
                              {comm.resident} • {comm.content}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant={getCommunicationType(comm.type) as any}>
                            {comm.type}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{comm.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="aegis-ceremonial-card">
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {engagementMetrics.map((metric, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{metric.metric}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold">{metric.current}%</span>
                          <span className={`text-xs ${getTrendColor(metric.trend)}`}>
                            {metric.trend}
                          </span>
                        </div>
                      </div>
                      <Progress value={metric.current} className="h-2" />
                      <div className="text-xs text-muted-foreground text-right">
                        Target: {metric.target}%
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Section>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6">
          <Section title="Family Feedback">
            <div className="grid gap-4">
              {familyFeedback.map((feedback, index) => (
                <Card key={index} className="aegis-ceremonial-card">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                          <Heart className="w-6 h-6 text-green-500" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="font-bold text-lg">{feedback.family}</div>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={`text-lg ${i < feedback.rating ? 'text-yellow-500' : 'text-gray-300'}`}>
                                  ★
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="text-muted-foreground mb-2">"{feedback.comment}"</div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-muted-foreground">
                              Category: {feedback.category}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {feedback.date}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className={`text-2xl font-bold ${getRatingColor(feedback.rating)}`}>
                          {feedback.rating}/5
                        </div>
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