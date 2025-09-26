import { useState } from "react";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { DataGrid } from "../DataGrid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Calendar } from "../../ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { 
  Calendar as CalendarIcon, 
  Users, 
  Clock, 
  AlertTriangle,
  GraduationCap,
  FileText,
  Download,
  Plus,
  Edit,
  Trash2
} from "lucide-react";
import { mockStaff, mockRotaData } from "../../../lib/mock-data";

interface WorkforceTabProps {
  filter?: string;
}

export function WorkforceTab({ filter }: WorkforceTabProps) {
  const [rotaEditorMode, setRotaEditorMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  const staffColumns = [
    { key: "name", title: "Name" },
    { key: "role", title: "Role" },
    { key: "shift", title: "Current Shift" },
    { key: "training_expires", title: "Training Expires" },
    { key: "dbs_expires", title: "DBS Expires" },
    { 
      key: "status", 
      title: "Status",
      render: (value: string) => {
        const colors = {
          "On Duty": "default",
          "Off Duty": "secondary",
          "On Leave": "outline",
          "Sick": "destructive"
        };
        return <Badge variant={colors[value as keyof typeof colors] as any}>{value}</Badge>;
      }
    }
  ];

  const trainingData = mockStaff.map(staff => ({
    ...staff,
    training_status: new Date(staff.training_expires) < new Date(Date.now() + 30*24*60*60*1000) 
      ? "Expiring Soon" : "Current",
    dbs_status: new Date(staff.dbs_expires) < new Date(Date.now() + 60*24*60*60*1000) 
      ? "Expiring Soon" : "Current"
  }));

  const filteredData = filter === "training" 
    ? trainingData.filter(s => s.training_status === "Expiring Soon")
    : mockStaff;

  if (rotaEditorMode) {
    return <RotaEditor onBack={() => setRotaEditorMode(false)} />;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Workforce Management</h1>
          <p className="text-muted-foreground">
            {filter === "training" 
              ? "Staff with expiring training certificates"
              : "Manage staff, schedules, training and compliance"
            }
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setRotaEditorMode(true)}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            Edit Rota
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Staff
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Staff</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStaff.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">On Duty</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {mockStaff.filter(s => s.status === "On Duty").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Training Expiring</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {trainingData.filter(s => s.training_status === "Expiring Soon").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Utilisation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="rota">
        <TabsList>
          <TabsTrigger value="rota">Rota</TabsTrigger>
          <TabsTrigger value="timesheets">Timesheets</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="staff-files">Staff Files</TabsTrigger>
        </TabsList>

        <TabsContent value="rota">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <h3 className="text-lg font-semibold">Weekly Rota</h3>
              <Select defaultValue="current">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Current Week</SelectItem>
                  <SelectItem value="next">Next Week</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-8 gap-2 text-sm">
                  {/* Header */}
                  <div className="font-medium">Staff</div>
                  <div className="font-medium text-center">Mon</div>
                  <div className="font-medium text-center">Tue</div>
                  <div className="font-medium text-center">Wed</div>
                  <div className="font-medium text-center">Thu</div>
                  <div className="font-medium text-center">Fri</div>
                  <div className="font-medium text-center">Sat</div>
                  <div className="font-medium text-center">Sun</div>

                  {/* Rows */}
                  {mockStaff.map((staff, index) => (
                    <div key={staff.id} className="contents">
                      <div className="py-2 font-medium">{staff.name}</div>
                      {[...Array(7)].map((_, dayIndex) => (
                        <div key={dayIndex} className="p-2 text-center border rounded">
                          {dayIndex < 5 ? (
                            <Badge variant="outline" className="text-xs">
                              {staff.shift === "Day" ? "08-16" : "16-00"}
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground">Off</span>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="timesheets">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Timesheets</h3>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export Payroll
                </Button>
                <Button variant="outline">Process Hours</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">This Week</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total Hours</span>
                      <span className="font-semibold">342.5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Overtime</span>
                      <span className="font-semibold">12.5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Breaks</span>
                      <span className="font-semibold">42.5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Mileage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total Miles</span>
                      <span className="font-semibold">287</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rate (per mile)</span>
                      <span className="font-semibold">£0.45</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Claim</span>
                      <span className="font-semibold">£129.15</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Pending Approval</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Timesheets</span>
                      <Badge>3</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Expenses</span>
                      <Badge variant="outline">1</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Overtime</span>
                      <Badge variant="destructive">2</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="training">
          <DataGrid
            columns={[
              { key: "name", title: "Name" },
              { key: "role", title: "Role" },
              { key: "training_expires", title: "Training Expires" },
              { 
                key: "training_status", 
                title: "Training Status",
                render: (value: string) => (
                  <Badge variant={value === "Expiring Soon" ? "destructive" : "default"}>
                    {value}
                  </Badge>
                )
              },
              { key: "dbs_expires", title: "DBS Expires" },
              { 
                key: "dbs_status", 
                title: "DBS Status",
                render: (value: string) => (
                  <Badge variant={value === "Expiring Soon" ? "destructive" : "default"}>
                    {value}
                  </Badge>
                )
              }
            ]}
            data={filteredData}
          />
        </TabsContent>

        <TabsContent value="staff-files">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Staff Document Management</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockStaff.map((staff) => (
                <Card key={staff.id}>
                  <CardHeader>
                    <CardTitle className="text-base">{staff.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{staff.role}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Contract</span>
                        <Badge variant="outline">Current</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">DBS</span>
                        <Badge variant="outline">Valid</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Right to Work</span>
                        <Badge variant="outline">Verified</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">References</span>
                        <Badge variant="outline">Complete</Badge>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-2">
                        <FileText className="mr-2 h-4 w-4" />
                        View Files
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Rota Editor Component
function RotaEditor({ onBack }: { onBack: () => void }) {
  const [selectedWeek, setSelectedWeek] = useState<Date>(new Date());
  const [draggedStaff, setDraggedStaff] = useState<string | null>(null);

  const timeSlots = [
    "00:00-08:00", "08:00-16:00", "16:00-00:00"
  ];

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const handleDragStart = (staffId: string) => {
    setDraggedStaff(staffId);
  };

  const handleDrop = (day: string, timeSlot: string) => {
    if (draggedStaff) {
      console.log(`Assigned ${draggedStaff} to ${day} ${timeSlot}`);
      setDraggedStaff(null);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          ← Back to Workforce
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Rota Editor</h1>
          <p className="text-muted-foreground">Drag and drop staff to assign shifts</p>
        </div>
        <div className="flex gap-2 ml-auto">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>Save Changes</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Staff Pool */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Available Staff</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockStaff.map((staff) => (
                <div
                  key={staff.id}
                  draggable
                  onDragStart={() => handleDragStart(staff.id)}
                  className="p-3 border rounded-lg cursor-move hover:bg-accent"
                >
                  <div className="font-medium">{staff.name}</div>
                  <div className="text-sm text-muted-foreground">{staff.role}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Rota Grid */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Week Commencing: {selectedWeek.toLocaleDateString()}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="grid grid-cols-8 gap-2 min-w-[800px]">
                  {/* Header Row */}
                  <div className="font-medium p-2">Shift</div>
                  {weekDays.map((day) => (
                    <div key={day} className="font-medium p-2 text-center">{day}</div>
                  ))}

                  {/* Time Slot Rows */}
                  {timeSlots.map((timeSlot) => (
                    <div key={timeSlot} className="contents">
                      <div className="font-medium p-2 text-sm">{timeSlot}</div>
                      {weekDays.map((day) => (
                        <div
                          key={`${day}-${timeSlot}`}
                          className="min-h-[80px] p-2 border-2 border-dashed border-muted-foreground/20 rounded-lg hover:border-primary/50 transition-colors"
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={() => handleDrop(day, timeSlot)}
                        >
                          <div className="text-xs text-muted-foreground text-center py-6">
                            Drop here
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Validation Alerts */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Rota Validation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-green-600">
                  <div className="w-2 h-2 rounded-full bg-green-600" />
                  <span className="text-sm">Minimum staffing levels met</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <div className="w-2 h-2 rounded-full bg-green-600" />
                  <span className="text-sm">No qualification conflicts</span>
                </div>
                <div className="flex items-center gap-2 text-amber-600">
                  <div className="w-2 h-2 rounded-full bg-amber-600" />
                  <span className="text-sm">Travel time optimization available</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}