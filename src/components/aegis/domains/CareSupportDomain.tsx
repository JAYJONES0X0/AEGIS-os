import { SubTabKey } from "../HierarchicalNavigation";
import { ClientsTab } from "../tabs/ClientsTab";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";
import { 
  FileText, 
  Clipboard, 
  Shield, 
  MessageSquare, 
  Users,
  Plus,
  Mic,
  Save,
  Clock,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

interface CareSupportDomainProps {
  activeSubTab: SubTabKey;
  filter?: string;
}

export function CareSupportDomain({ activeSubTab, filter }: CareSupportDomainProps) {
  const renderSubTab = () => {
    switch (activeSubTab) {
      case "client-files":
        return <ClientsTab filter={filter} />;
        
      case "daily-notes":
        return (
          <div className="p-6 space-y-6 aegis-tab-clients min-h-screen">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">Daily Notes</h2>
                <p className="text-sm text-muted-foreground">Grid/list view with voice-to-text capability</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="bg-muted/30">
                  <Mic className="w-4 h-4 mr-2" />
                  Voice Note
                </Button>
                <Button className="bg-[#2E888F] hover:bg-[#2E888F]/90 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  New Note
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Note Entry */}
              <div className="lg:col-span-2">
                <Card className="aegis-ceremonial-card border-[#2E888F]/20">
                  <CardHeader>
                    <CardTitle className="text-foreground">Quick Note Entry</CardTitle>
                    <CardDescription>Record care observations and activities</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Client</label>
                        <select className="w-full mt-1 px-3 py-2 bg-input border border-border rounded-md">
                          <option>Select client...</option>
                          <option>John Smith</option>
                          <option>Emma Johnson</option>
                          <option>Michael Brown</option>
                          <option>Sarah Davis</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Category</label>
                        <select className="w-full mt-1 px-3 py-2 bg-input border border-border rounded-md">
                          <option>General Care</option>
                          <option>Personal Care</option>
                          <option>Meals</option>
                          <option>Activities</option>
                          <option>Behaviour</option>
                          <option>Medication</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Note</label>
                      <Textarea 
                        className="mt-1 min-h-[120px] bg-input border-border"
                        placeholder="Enter care note details..."
                      />
                    </div>
                    
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>16:30 - 17th September 2024</span>
                      </div>
                      <Button className="bg-[#2E888F] hover:bg-[#2E888F]/90 text-white">
                        <Save className="w-4 h-4 mr-2" />
                        Save Note
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Recent Notes */}
                <div className="mt-6 space-y-3">
                  {[
                    { 
                      client: "John Smith", 
                      category: "Personal Care", 
                      note: "Assisted with shower. John was in good spirits and completed routine independently with minimal prompts.", 
                      time: "14:30", 
                      author: "Sarah Mitchell",
                      priority: "normal"
                    },
                    { 
                      client: "Emma Johnson", 
                      category: "Behaviour", 
                      note: "Emma became agitated during meal preparation. Redirected to preferred activity (reading). Settled within 10 minutes.", 
                      time: "13:45", 
                      author: "James Patterson",
                      priority: "attention"
                    },
                    { 
                      client: "Michael Brown", 
                      category: "Medication", 
                      note: "Refused afternoon medication (Paracetamol). No signs of discomfort. Will monitor and offer again later.", 
                      time: "12:15", 
                      author: "Emily Rodriguez",
                      priority: "important"
                    }
                  ].map((note, index) => (
                    <Card key={index} className={`
                      aegis-ceremonial-card border-l-4 
                      ${note.priority === 'important' ? 'border-l-warning bg-warning/5' : 
                        note.priority === 'attention' ? 'border-l-[#2E888F] bg-[#2E888F]/5' : 
                        'border-l-border'}
                    `}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-foreground">{note.client}</h4>
                              <Badge variant="outline" className="text-xs bg-muted/50">
                                {note.category}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{note.note}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{note.time} • {note.author}</span>
                          <Button size="sm" variant="ghost" className="h-6 px-2">
                            Edit
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="space-y-4">
                <Card className="aegis-ceremonial-card">
                  <CardHeader>
                    <CardTitle className="text-foreground">Today's Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Notes Written</span>
                      <span className="font-medium">18</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Voice Notes</span>
                      <span className="font-medium">5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Pending Review</span>
                      <span className="font-medium text-warning">3</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="aegis-ceremonial-card">
                  <CardHeader>
                    <CardTitle className="text-foreground">Quick Templates</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start text-xs bg-muted/30">
                      Personal Care Routine
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-xs bg-muted/30">
                      Meal Support
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-xs bg-muted/30">
                      Activity Participation
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-xs bg-muted/30">
                      Behaviour Observation
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );
        
      case "care-plans":
        return (
          <div className="p-6 space-y-6 aegis-tab-clients min-h-screen">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">Care Plans</h2>
                <p className="text-sm text-muted-foreground">Accordion view by domain - personalized care strategies</p>
              </div>
              <Button className="bg-[#2E888F] hover:bg-[#2E888F]/90 text-white">
                <Plus className="w-4 h-4 mr-2" />
                New Care Plan
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3 space-y-4">
                {[
                  {
                    client: "John Smith",
                    lastReview: "2024-09-10",
                    nextReview: "2024-12-10",
                    status: "Current",
                    domains: [
                      { name: "Personal Care", goals: 3, progress: "On Track" },
                      { name: "Communication", goals: 2, progress: "Achieved" },
                      { name: "Community Access", goals: 4, progress: "In Progress" },
                      { name: "Health & Wellbeing", goals: 2, progress: "On Track" }
                    ]
                  },
                  {
                    client: "Emma Johnson",
                    lastReview: "2024-09-05",
                    nextReview: "2024-12-05",
                    status: "Review Due",
                    domains: [
                      { name: "Behaviour Support", goals: 5, progress: "Needs Attention" },
                      { name: "Social Skills", goals: 3, progress: "On Track" },
                      { name: "Independence", goals: 4, progress: "In Progress" }
                    ]
                  }
                ].map((plan, index) => (
                  <Card key={index} className="aegis-ceremonial-card">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-foreground">{plan.client}</CardTitle>
                          <CardDescription>
                            Last Review: {plan.lastReview} • Next Review: {plan.nextReview}
                          </CardDescription>
                        </div>
                        <Badge 
                          variant={plan.status === 'Current' ? 'default' : 'secondary'}
                          className={plan.status === 'Review Due' ? 'bg-warning/20 text-warning border-warning/30' : ''}
                        >
                          {plan.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {plan.domains.map((domain, domainIndex) => (
                          <div key={domainIndex} className="p-3 rounded-lg bg-muted/30 border border-border/50">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium text-foreground">{domain.name}</h4>
                                <p className="text-sm text-muted-foreground">{domain.goals} active goals</p>
                              </div>
                              <Badge 
                                variant="outline" 
                                className={`
                                  ${domain.progress === 'Achieved' ? 'bg-success/20 text-success border-success/30' :
                                    domain.progress === 'On Track' ? 'bg-[#2E888F]/20 text-[#2E888F] border-[#2E888F]/30' :
                                    domain.progress === 'Needs Attention' ? 'bg-warning/20 text-warning border-warning/30' :
                                    'bg-muted/50'}
                                `}
                              >
                                {domain.progress}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4 flex gap-2">
                        <Button size="sm" variant="outline" className="bg-muted/30">
                          <Clipboard className="w-4 h-4 mr-2" />
                          View Full Plan
                        </Button>
                        <Button size="sm" variant="outline" className="bg-muted/30">
                          <FileText className="w-4 h-4 mr-2" />
                          Update Progress
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="space-y-4">
                <Card className="aegis-ceremonial-card">
                  <CardHeader>
                    <CardTitle className="text-foreground">Care Planning</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Active Plans</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Due Review</span>
                      <span className="font-medium text-warning">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Goals Achieved</span>
                      <span className="font-medium text-success">28</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="aegis-ceremonial-card">
                  <CardHeader>
                    <CardTitle className="text-foreground">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start bg-muted/30">
                      <Clipboard className="w-4 h-4 mr-2" />
                      Plan Templates
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-muted/30">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Goal Tracker
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-muted/30">
                      <FileText className="w-4 h-4 mr-2" />
                      Review Schedule
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );
        
      case "risk-pbs":
        return (
          <div className="p-6 space-y-6 aegis-tab-clients min-h-screen">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">Risk & PBS</h2>
                <p className="text-sm text-muted-foreground">Risk assessments and Positive Behaviour Support plans</p>
              </div>
              <Button className="bg-[#2E888F] hover:bg-[#2E888F]/90 text-white">
                <Shield className="w-4 h-4 mr-2" />
                New Assessment
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[
                {
                  client: "John Smith",
                  riskLevel: "Low",
                  lastAssessment: "2024-09-01",
                  risks: [
                    { type: "Falls", level: "Medium", controls: "Walking aid, non-slip mats" },
                    { type: "Choking", level: "Low", controls: "Soft diet, supervision" }
                  ],
                  pbsActive: false
                },
                {
                  client: "Emma Johnson",
                  riskLevel: "Medium",
                  lastAssessment: "2024-08-28",
                  risks: [
                    { type: "Self-Harm", level: "Medium", controls: "1:1 support, safety items removed" },
                    { type: "Aggression", level: "Medium", controls: "De-escalation techniques, space" }
                  ],
                  pbsActive: true
                },
                {
                  client: "Michael Brown",
                  riskLevel: "High",
                  lastAssessment: "2024-09-15",
                  risks: [
                    { type: "Wandering", level: "High", controls: "Door alarms, GPS tracker" },
                    { type: "Falls", level: "High", controls: "Helmet, crash mats, supervision" }
                  ],
                  pbsActive: true
                },
                {
                  client: "Sarah Davis",
                  riskLevel: "Low",
                  lastAssessment: "2024-08-20",
                  risks: [
                    { type: "Medication", level: "Low", controls: "Supervised administration" }
                  ],
                  pbsActive: false
                }
              ].map((assessment, index) => (
                <Card key={index} className={`
                  aegis-ceremonial-card border-l-4 
                  ${assessment.riskLevel === 'High' ? 'border-l-destructive bg-destructive/5' :
                    assessment.riskLevel === 'Medium' ? 'border-l-warning bg-warning/5' :
                    'border-l-success bg-success/5'}
                `}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-foreground">{assessment.client}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={assessment.riskLevel === 'High' ? 'destructive' : 
                                  assessment.riskLevel === 'Medium' ? 'secondary' : 'default'}
                          className={
                            assessment.riskLevel === 'High' ? 'bg-destructive/20 text-destructive border-destructive/30' :
                            assessment.riskLevel === 'Medium' ? 'bg-warning/20 text-warning border-warning/30' :
                            'bg-success/20 text-success border-success/30'
                          }
                        >
                          {assessment.riskLevel} Risk
                        </Badge>
                        {assessment.pbsActive && (
                          <Badge variant="outline" className="bg-[#2E888F]/20 text-[#2E888F] border-[#2E888F]/30">
                            PBS Active
                          </Badge>
                        )}
                      </div>
                    </div>
                    <CardDescription>Last Assessment: {assessment.lastAssessment}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {assessment.risks.map((risk, riskIndex) => (
                        <div key={riskIndex} className="p-3 rounded-lg bg-muted/30 border border-border/50">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-foreground">{risk.type}</h4>
                            <Badge 
                              variant="outline" 
                              className={`text-xs
                                ${risk.level === 'High' ? 'bg-destructive/20 text-destructive border-destructive/30' :
                                  risk.level === 'Medium' ? 'bg-warning/20 text-warning border-warning/30' :
                                  'bg-success/20 text-success border-success/30'}
                              `}
                            >
                              {risk.level}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{risk.controls}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" variant="outline" className="bg-muted/30">
                        <Shield className="w-4 h-4 mr-2" />
                        Update Risk
                      </Button>
                      {assessment.pbsActive && (
                        <Button size="sm" variant="outline" className="bg-muted/30">
                          <Clipboard className="w-4 h-4 mr-2" />
                          PBS Plan
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
        
      case "handover":
        return (
          <div className="p-6 space-y-6 aegis-tab-clients min-h-screen">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">Handover</h2>
                <p className="text-sm text-muted-foreground">Timeline scroll - shift communications and updates</p>
              </div>
              <Button className="bg-[#2E888F] hover:bg-[#2E888F]/90 text-white">
                <MessageSquare className="w-4 h-4 mr-2" />
                Add Update
              </Button>
            </div>
            
            <div className="relative">
              {/* Timeline */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
              
              <div className="space-y-6">
                {[
                  {
                    time: "16:00",
                    shift: "Day Shift",
                    author: "Sarah Mitchell",
                    type: "handover",
                    content: "Day shift handover complete. All clients settled for evening routine. Emma had a challenging afternoon but responded well to music therapy."
                  },
                  {
                    time: "15:30",
                    shift: "Day Shift",
                    author: "James Patterson",
                    type: "incident",
                    content: "Minor incident in Block A - John slipped in bathroom but no injury. Wet floor sign placed, maintenance notified about non-slip mats."
                  },
                  {
                    time: "14:45",
                    shift: "Day Shift",
                    author: "Emily Rodriguez",
                    type: "update",
                    content: "Michael's family visiting 15:00-16:30. He's very excited. Please ensure quiet space available and favorite snacks prepared."
                  },
                  {
                    time: "13:00",
                    shift: "Day Shift",
                    author: "Lucy Thompson",
                    type: "medical",
                    content: "Sarah's GP appointment confirmed for tomorrow 10:00. Transport arranged. Please ensure her medication list is printed and ready."
                  },
                  {
                    time: "08:00",
                    shift: "Night Shift",
                    author: "David Wilson",
                    type: "handover",
                    content: "Night shift handover: Quiet night overall. Emma woke at 03:00 but settled quickly with reassurance. All clients had good sleep."
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className={`
                      relative z-10 w-4 h-4 rounded-full border-2 mt-1
                      ${item.type === 'handover' ? 'bg-[#2E888F] border-[#2E888F]' :
                        item.type === 'incident' ? 'bg-warning border-warning' :
                        item.type === 'medical' ? 'bg-success border-success' :
                        'bg-primary border-primary'}
                    `}></div>
                    
                    <div className="flex-1">
                      <Card className="aegis-ceremonial-card">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-sm font-medium">{item.time}</span>
                              <Badge 
                                variant="outline" 
                                className={`text-xs
                                  ${item.type === 'handover' ? 'bg-[#2E888F]/20 text-[#2E888F] border-[#2E888F]/30' :
                                    item.type === 'incident' ? 'bg-warning/20 text-warning border-warning/30' :
                                    item.type === 'medical' ? 'bg-success/20 text-success border-success/30' :
                                    'bg-primary/20 text-primary border-primary/30'}
                                `}
                              >
                                {item.type}
                              </Badge>
                            </div>
                            <span className="text-xs text-muted-foreground">{item.shift}</span>
                          </div>
                          
                          <p className="text-sm text-foreground mb-2">{item.content}</p>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">By: {item.author}</span>
                            <Button size="sm" variant="ghost" className="h-6 px-2">
                              Reply
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      default:
        return <ClientsTab filter={filter} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderSubTab()}
    </div>
  );
}