import { SubTabKey } from "../HierarchicalNavigation";
import { EMARTab } from "../tabs/EMARTab";
import { ReferralsTab } from "../tabs/ReferralsTab";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { 
  Calendar, 
  Send, 
  Eye, 
  Shield, 
  FileText,
  Clock,
  User,
  AlertTriangle,
  CheckCircle,
  Plus
} from "lucide-react";

interface HealthcareDomainProps {
  activeSubTab: SubTabKey;
  filter?: string;
}

export function HealthcareDomain({ activeSubTab, filter }: HealthcareDomainProps) {
  const renderSubTab = () => {
    switch (activeSubTab) {
      case "medications":
        return <EMARTab filter={filter} />;
        
      case "referrals":
        return <ReferralsTab />;
        
      case "appointments":
        return (
          <div className="p-6 space-y-6 bg-white min-h-screen">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Appointments</h2>
                <p className="text-sm text-slate-600">NHS slots, GP visits, and specialist consultations</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Book Appointment
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Today's Appointments */}
              <div className="lg:col-span-2">
                <Card className="border border-slate-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-slate-900">Today's Schedule</CardTitle>
                    <CardDescription>Wednesday, 17th September 2025</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { time: "09:30", client: "John Smith", type: "GP Consultation", location: "Meadowview Practice", status: "confirmed" },
                      { time: "11:00", client: "Emma Johnson", type: "Physiotherapy", location: "Community Centre", status: "in-progress" },
                      { time: "14:30", client: "Michael Brown", type: "Dental Check-up", location: "High Street Dental", status: "confirmed" },
                      { time: "16:00", client: "Sarah Davis", type: "Cardiology Review", location: "General Hospital", status: "pending" }
                    ].map((appointment, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                        <div className="flex items-center gap-3">
                          <div className="text-sm font-mono text-slate-600">{appointment.time}</div>
                          <div>
                            <div className="font-medium text-slate-900">{appointment.client}</div>
                            <div className="text-sm text-slate-600">{appointment.type} • {appointment.location}</div>
                          </div>
                        </div>
                        <Badge 
                          variant={appointment.status === 'confirmed' ? 'default' : 
                                  appointment.status === 'in-progress' ? 'secondary' : 'outline'}
                          className={
                            appointment.status === 'confirmed' ? 'bg-green-100 text-green-800 border-green-200' :
                            appointment.status === 'in-progress' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                            'bg-yellow-100 text-yellow-800 border-yellow-200'
                          }
                        >
                          {appointment.status}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
              
              {/* Quick Actions */}
              <div className="space-y-4">
                <Card className="border border-slate-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-slate-900">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start border-slate-200">
                      <Calendar className="w-4 h-4 mr-2" />
                      NHS e-Referral
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-slate-200">
                      <Clock className="w-4 h-4 mr-2" />
                      Emergency Booking
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-slate-200">
                      <FileText className="w-4 h-4 mr-2" />
                      Appointment History
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="border border-slate-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-slate-900">Upcoming This Week</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Tomorrow</span>
                        <span className="font-medium">3 appointments</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Friday</span>
                        <span className="font-medium">2 appointments</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Next Week</span>
                        <span className="font-medium">8 appointments</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );
        
      case "observations":
        return (
          <div className="p-6 space-y-6 bg-white min-h-screen">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Clinical Observations</h2>
                <p className="text-sm text-slate-600">NEWS2 charts, vital signs, and health monitoring</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Record Observation
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[
                { 
                  client: "John Smith", 
                  lastObservation: "2 hours ago", 
                  news2Score: 3, 
                  status: "stable",
                  vitals: { bp: "135/82", hr: "78", temp: "36.8°C", spo2: "98%" }
                },
                { 
                  client: "Emma Johnson", 
                  lastObservation: "45 mins ago", 
                  news2Score: 1, 
                  status: "good",
                  vitals: { bp: "122/76", hr: "68", temp: "36.5°C", spo2: "99%" }
                },
                { 
                  client: "Michael Brown", 
                  lastObservation: "4 hours ago", 
                  news2Score: 6, 
                  status: "concern",
                  vitals: { bp: "158/94", hr: "92", temp: "37.2°C", spo2: "95%" }
                },
                { 
                  client: "Sarah Davis", 
                  lastObservation: "1 hour ago", 
                  news2Score: 2, 
                  status: "stable",
                  vitals: { bp: "128/78", hr: "74", temp: "36.6°C", spo2: "97%" }
                }
              ].map((observation, index) => (
                <Card key={index} className="border border-slate-200 shadow-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-slate-900">{observation.client}</CardTitle>
                      <Badge 
                        variant={observation.status === 'good' ? 'default' : 
                                observation.status === 'stable' ? 'secondary' : 'destructive'}
                        className={
                          observation.status === 'good' ? 'bg-green-100 text-green-800 border-green-200' :
                          observation.status === 'stable' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                          'bg-red-100 text-red-800 border-red-200'
                        }
                      >
                        NEWS2: {observation.news2Score}
                      </Badge>
                    </div>
                    <CardDescription>Last observation: {observation.lastObservation}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-600">Blood Pressure:</span>
                        <div className="font-mono font-medium">{observation.vitals.bp}</div>
                      </div>
                      <div>
                        <span className="text-slate-600">Heart Rate:</span>
                        <div className="font-mono font-medium">{observation.vitals.hr} bpm</div>
                      </div>
                      <div>
                        <span className="text-slate-600">Temperature:</span>
                        <div className="font-mono font-medium">{observation.vitals.temp}</div>
                      </div>
                      <div>
                        <span className="text-slate-600">SpO2:</span>
                        <div className="font-mono font-medium">{observation.vitals.spo2}</div>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" variant="outline" className="border-slate-200">
                        View Chart
                      </Button>
                      <Button size="sm" variant="outline" className="border-slate-200">
                        New Reading
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
        
      case "safeguarding":
        return (
          <div className="p-6 space-y-6 bg-white min-h-screen">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Safeguarding</h2>
                <p className="text-sm text-slate-600">Alerts, incidents, and protection measures</p>
              </div>
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Report Incident
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                {[
                  { 
                    id: "SG-2024-0342", 
                    client: "Confidential - Client A", 
                    type: "Allegation", 
                    severity: "High", 
                    status: "Under Investigation",
                    reportedBy: "Sarah Mitchell",
                    date: "2024-09-15",
                    description: "Concern raised regarding potential financial abuse..."
                  },
                  { 
                    id: "SG-2024-0341", 
                    client: "Confidential - Client B", 
                    type: "Neglect Concern", 
                    severity: "Medium", 
                    status: "Action Plan Active",
                    reportedBy: "James Patterson",
                    date: "2024-09-12",
                    description: "Observation of deteriorating personal care standards..."
                  },
                  { 
                    id: "SG-2024-0340", 
                    client: "Confidential - Client C", 
                    type: "Self-Harm Risk", 
                    severity: "High", 
                    status: "Monitoring Active",
                    reportedBy: "Emily Rodriguez",
                    date: "2024-09-10",
                    description: "Increased risk indicators identified during assessment..."
                  }
                ].map((incident, index) => (
                  <Card key={index} className={`border-l-4 ${
                    incident.severity === 'High' ? 'border-l-red-500 bg-red-50/50' :
                    incident.severity === 'Medium' ? 'border-l-yellow-500 bg-yellow-50/50' :
                    'border-l-blue-500 bg-blue-50/50'
                  } border-t border-r border-b border-slate-200 shadow-sm`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-sm font-medium text-slate-900">{incident.id}</span>
                            <Badge variant="outline" className={
                              incident.severity === 'High' ? 'border-red-200 text-red-800 bg-red-100' :
                              incident.severity === 'Medium' ? 'border-yellow-200 text-yellow-800 bg-yellow-100' :
                              'border-blue-200 text-blue-800 bg-blue-100'
                            }>
                              {incident.severity}
                            </Badge>
                          </div>
                          <h4 className="font-semibold text-slate-900">{incident.type}</h4>
                          <p className="text-sm text-slate-600">{incident.client}</p>
                        </div>
                        <Badge variant="secondary" className="bg-slate-100 text-slate-700">
                          {incident.status}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-slate-600 mb-3">{incident.description}</p>
                      
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>Reported by: {incident.reportedBy}</span>
                        <span>{incident.date}</span>
                      </div>
                      
                      <div className="mt-3 flex gap-2">
                        <Button size="sm" variant="outline" className="border-slate-200">
                          View Details
                        </Button>
                        <Button size="sm" variant="outline" className="border-slate-200">
                          Update Status
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="space-y-4">
                <Card className="border border-slate-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-slate-900">Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Active Cases</span>
                      <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200">3</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">This Month</span>
                      <span className="font-medium">8 reports</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Resolved</span>
                      <span className="font-medium text-green-600">12 cases</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border border-slate-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-slate-900">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start border-slate-200">
                      <Shield className="w-4 h-4 mr-2" />
                      Safeguarding Policy
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-slate-200">
                      <FileText className="w-4 h-4 mr-2" />
                      Incident Forms
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-slate-200">
                      <User className="w-4 h-4 mr-2" />
                      Training Records
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );
        
      case "documents":
        return (
          <div className="p-6 space-y-6 bg-white min-h-screen">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Healthcare Documents</h2>
                <p className="text-sm text-slate-600">Medical records, discharge summaries, and GP letters</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Upload Document
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <Card className="border border-slate-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-slate-900">Recent Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { name: "Discharge Summary - John Smith", type: "PDF", date: "15/09/2024", source: "General Hospital", size: "234 KB" },
                        { name: "GP Letter - Emma Johnson", type: "PDF", date: "14/09/2024", source: "Meadowview Practice", size: "89 KB" },
                        { name: "Blood Test Results - Michael Brown", type: "PDF", date: "12/09/2024", source: "Pathology Lab", size: "156 KB" },
                        { name: "Medication Review - Sarah Davis", type: "PDF", date: "10/09/2024", source: "Community Pharmacy", size: "78 KB" },
                        { name: "X-Ray Report - John Smith", type: "PDF", date: "08/09/2024", source: "Radiology Dept", size: "1.2 MB" }
                      ].map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-slate-400" />
                            <div>
                              <div className="font-medium text-slate-900">{doc.name}</div>
                              <div className="text-sm text-slate-600">{doc.source} • {doc.date}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-slate-500">{doc.size}</span>
                            <Button size="sm" variant="outline" className="border-slate-200">
                              View
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-4">
                <Card className="border border-slate-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-slate-900">Categories</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">GP Letters</span>
                      <span className="font-medium">24</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Discharge Summaries</span>
                      <span className="font-medium">18</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Test Results</span>
                      <span className="font-medium">31</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Imaging</span>
                      <span className="font-medium">12</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );
        
      default:
        return <EMARTab filter={filter} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderSubTab()}
    </div>
  );
}