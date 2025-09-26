import { SubTabKey } from "../HierarchicalNavigation";
import { WorkforceTab } from "../tabs/WorkforceTab";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { 
  Calendar, 
  DollarSign, 
  Clock, 
  GraduationCap, 
  Users,
  FileCheck,
  Plus,
  Download,
  TrendingUp,
  AlertTriangle
} from "lucide-react";

interface WorkforceDomainProps {
  activeSubTab: SubTabKey;
  filter?: string;
}

export function WorkforceDomain({ activeSubTab, filter }: WorkforceDomainProps) {
  const renderSubTab = () => {
    switch (activeSubTab) {
      case "rota":
        return <WorkforceTab filter={filter} />;
        
      case "payroll":
        return (
          <div className="p-6 space-y-6 aegis-tab-workforce min-h-screen">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">Payroll</h2>
                <p className="text-sm text-muted-foreground">Timesheets, mileage, and payroll processing</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="bg-muted/30">
                  <Download className="w-4 h-4 mr-2" />
                  Export RTI
                </Button>
                <Button className="bg-[#3AAED8] hover:bg-[#3AAED8]/90 text-white">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Process Payroll
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <Card className="aegis-ceremonial-card">
                  <CardHeader>
                    <CardTitle className="text-foreground">Current Pay Period</CardTitle>
                    <CardDescription>1st - 15th September 2024</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aegis-data-grid">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left p-3">Employee</th>
                            <th className="text-left p-3">Role</th>
                            <th className="text-right p-3">Hours</th>
                            <th className="text-right p-3">Overtime</th>
                            <th className="text-right p-3">Mileage</th>
                            <th className="text-right p-3">Gross Pay</th>
                            <th className="text-center p-3">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { name: "Sarah Mitchell", role: "Senior Support Worker", hours: 72.5, overtime: 4.5, mileage: 45.2, gross: 1825.50, status: "approved" },
                            { name: "James Patterson", role: "Night Support Worker", hours: 75.0, overtime: 8.0, mileage: 38.7, gross: 1950.75, status: "pending" },
                            { name: "Emily Rodriguez", role: "Team Leader", hours: 70.0, overtime: 2.0, mileage: 62.3, gross: 2156.30, status: "approved" },
                            { name: "Michael Chen", role: "Support Worker", hours: 68.5, overtime: 0.0, mileage: 28.5, gross: 1542.25, status: "approved" },
                            { name: "Lucy Thompson", role: "Senior Support Worker", hours: 74.0, overtime: 6.0, mileage: 55.8, gross: 1945.80, status: "pending" }
                          ].map((employee, index) => (
                            <tr key={index} className="border-b border-border/50 hover:bg-muted/20">
                              <td className="p-3 font-medium">{employee.name}</td>
                              <td className="p-3 text-muted-foreground">{employee.role}</td>
                              <td className="p-3 text-right">{employee.hours}</td>
                              <td className="p-3 text-right">{employee.overtime}</td>
                              <td className="p-3 text-right">£{employee.mileage}</td>
                              <td className="p-3 text-right font-medium">£{employee.gross.toFixed(2)}</td>
                              <td className="p-3 text-center">
                                <Badge 
                                  variant={employee.status === 'approved' ? 'default' : 'secondary'}
                                  className={employee.status === 'approved' ? 'bg-success/20 text-success border-success/30' : 'bg-warning/20 text-warning border-warning/30'}
                                >
                                  {employee.status}
                                </Badge>
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
                    <CardTitle className="text-foreground">Pay Period Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Hours</span>
                      <span className="font-medium">360.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Overtime Hours</span>
                      <span className="font-medium">20.5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Mileage</span>
                      <span className="font-medium">£230.50</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span className="font-medium">Gross Pay</span>
                      <span className="font-bold text-[#3AAED8]">£9,420.60</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="aegis-ceremonial-card">
                  <CardHeader>
                    <CardTitle className="text-foreground">Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start bg-muted/30">
                      <Clock className="w-4 h-4 mr-2" />
                      Timesheet Review
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-muted/30">
                      <Download className="w-4 h-4 mr-2" />
                      Export to Sage
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-muted/30">
                      <FileCheck className="w-4 h-4 mr-2" />
                      Approve All
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );
        
      case "training":
        return (
          <div className="p-6 space-y-6 aegis-tab-workforce min-h-screen">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">Training Matrix</h2>
                <p className="text-sm text-muted-foreground">Progress bars and certification tracking</p>
              </div>
              <Button className="bg-[#3AAED8] hover:bg-[#3AAED8]/90 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Schedule Training
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="aegis-ceremonial-card">
                  <CardHeader>
                    <CardTitle className="text-foreground">Training Compliance Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { course: "Safeguarding Adults", completed: 18, total: 23, expiring: 2, urgent: 0 },
                        { course: "Manual Handling", completed: 21, total: 23, expiring: 5, urgent: 2 },
                        { course: "Medication Administration", completed: 15, total: 18, expiring: 1, urgent: 0 },
                        { course: "First Aid", completed: 12, total: 23, expiring: 3, urgent: 1 },
                        { course: "Fire Safety", completed: 20, total: 23, expiring: 0, urgent: 0 },
                        { course: "Food Hygiene", completed: 16, total: 20, expiring: 4, urgent: 1 }
                      ].map((training, index) => {
                        const percentage = (training.completed / training.total) * 100;
                        return (
                          <div key={index} className="p-4 rounded-lg bg-muted/30 border border-border/50">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-foreground">{training.course}</h4>
                              <div className="flex items-center gap-2">
                                {training.urgent > 0 && (
                                  <Badge variant="destructive" className="text-xs">
                                    {training.urgent} Urgent
                                  </Badge>
                                )}
                                {training.expiring > 0 && (
                                  <Badge variant="secondary" className="text-xs bg-warning/20 text-warning border-warning/30">
                                    {training.expiring} Expiring
                                  </Badge>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-muted-foreground">
                                {training.completed}/{training.total} completed
                              </span>
                              <span className="text-sm font-medium">{percentage.toFixed(0)}%</span>
                            </div>
                            
                            <div className="w-full bg-border rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full transition-all duration-500 ${
                                  percentage >= 90 ? 'bg-success' :
                                  percentage >= 70 ? 'bg-[#3AAED8]' :
                                  percentage >= 50 ? 'bg-warning' :
                                  'bg-destructive'
                                }`}
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-4">
                <Card className="aegis-ceremonial-card">
                  <CardHeader>
                    <CardTitle className="text-foreground">Urgent Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                      <div className="flex items-center gap-2 mb-1">
                        <AlertTriangle className="w-4 h-4 text-destructive" />
                        <span className="font-medium text-destructive">4 Expired</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Immediate action required</p>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-4 h-4 text-warning" />
                        <span className="font-medium text-warning">15 Expiring</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Within next 30 days</p>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                      <div className="flex items-center gap-2 mb-1">
                        <GraduationCap className="w-4 h-4 text-success" />
                        <span className="font-medium text-success">3 Completed</span>
                      </div>
                      <p className="text-xs text-muted-foreground">This week</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="aegis-ceremonial-card">
                  <CardHeader>
                    <CardTitle className="text-foreground">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start bg-muted/30">
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Training
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-muted/30">
                      <Download className="w-4 h-4 mr-2" />
                      Export Matrix
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-muted/30">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Progress Report
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );
        
      default:
        return <WorkforceTab filter={filter} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderSubTab()}
    </div>
  );
}