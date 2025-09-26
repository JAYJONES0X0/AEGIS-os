import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Calendar, Clock, Users, MapPin, AlertTriangle, CheckCircle,
  Plus, Filter, Search, RefreshCw, Download, Settings,
  ChevronLeft, ChevronRight, User, Phone, MessageSquare
} from "lucide-react";
import { Card } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { mockStaffProfiles } from "../../../lib/expanded-mock-data";

interface SchedulingDomainProps {
  activeTab: string;
}

export function SchedulingDomain({ activeTab }: SchedulingDomainProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('week');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");

  // Sample scheduling data
  const shifts = [
    {
      id: "shift_1",
      staffId: "staff_001",
      staffName: "Brooklyn Rodriguez AE",
      startTime: "08:00",
      endTime: "16:00",
      date: "2024-01-15",
      location: "Hazelbury House",
      type: "Regular",
      status: "Confirmed",
      clientCount: 8,
      priority: "normal"
    },
    {
      id: "shift_2",
      staffId: "staff_002",
      staffName: "Sarah Mitchell AE", 
      startTime: "14:00",
      endTime: "22:00",
      date: "2024-01-15",
      location: "Station House",
      type: "Evening",
      status: "Confirmed",
      clientCount: 6,
      priority: "normal"
    },
    {
      id: "shift_3",
      staffId: "staff_003",
      staffName: "James Patterson AE",
      startTime: "22:00",
      endTime: "07:00",
      date: "2024-01-15",
      location: "Newton House",
      type: "Night",
      status: "Pending",
      clientCount: 12,
      priority: "high"
    },
    {
      id: "shift_4",
      staffId: "staff_004",
      staffName: "Emma Thompson AE",
      startTime: "09:00",
      endTime: "17:00",
      date: "2024-01-16",
      location: "Hazelbury House",
      type: "Training",
      status: "Confirmed",
      clientCount: 0,
      priority: "normal"
    }
  ];

  const locations = [
    "Hazelbury House",
    "Station House", 
    "Newton House",
    "Windsor Lodge",
    "Community Outreach"
  ];

  const schedulingStats = [
    {
      title: "Total Shifts",
      value: 156,
      change: "+12",
      icon: <Calendar className="w-5 h-5" />,
      color: "primary"
    },
    {
      title: "Coverage Rate",
      value: "98.5%",
      change: "+2.3%",
      icon: <CheckCircle className="w-5 h-5" />,
      color: "success"
    },
    {
      title: "Staff Hours",
      value: "1,248",
      change: "+156",
      icon: <Clock className="w-5 h-5" />,
      color: "warning"
    },
    {
      title: "Open Shifts",
      value: 8,
      change: "-3",
      icon: <AlertTriangle className="w-5 h-5" />,
      color: "destructive"
    }
  ];

  const getShiftStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'cancelled': return 'destructive';
      default: return 'secondary';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      case 'low': return 'secondary';
      default: return 'primary';
    }
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (viewMode === 'day') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    } else {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  const filteredShifts = shifts.filter(shift => {
    const matchesSearch = shift.staffName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         shift.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = selectedLocation === 'all' || shift.location === selectedLocation;
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="p-6 min-h-screen aegis-tab-home">
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Staff Scheduling
        </h1>
        <p className="text-muted-foreground">
          Advanced staff scheduling and shift management system
        </p>
      </motion.div>

      <div className="space-y-6">
        {/* Scheduling Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {schedulingStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="aegis-glass-panel p-6 aegis-ceremonial-hover">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg bg-${stat.color}/10 text-${stat.color}`}>
                    {stat.icon}
                  </div>
                  <Badge 
                    variant={stat.change.startsWith('+') ? 'success' : 'destructive'}
                    size="sm"
                  >
                    {stat.change}
                  </Badge>
                </div>
                <div className="mt-4">
                  <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Schedule Controls */}
        <Card className="aegis-glass-panel p-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateDate('prev')}
                  className="aegis-ceremonial-hover"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <h2 className="text-lg font-semibold text-foreground min-w-[200px] text-center">
                  {currentDate.toLocaleDateString('en-GB', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateDate('next')}
                  className="aegis-ceremonial-hover"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              
              <Select value={viewMode} onValueChange={(value: 'day' | 'week' | 'month') => setViewMode(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Day View</SelectItem>
                  <SelectItem value="week">Week View</SelectItem>
                  <SelectItem value="month">Month View</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Input
                placeholder="Search shifts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48"
              />
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="aegis-ceremonial-hover">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button size="sm" className="aegis-ceremonial-hover">
                <Plus className="w-4 h-4 mr-2" />
                Add Shift
              </Button>
            </div>
          </div>
        </Card>

        {/* Shift Grid */}
        <Card className="aegis-glass-panel p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Active Shifts</h3>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="aegis-ceremonial-hover">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm" className="aegis-ceremonial-hover">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm" className="aegis-ceremonial-hover">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto institutional-scroll">
            {filteredShifts.map((shift, index) => (
              <motion.div
                key={shift.id}
                className="flex items-center justify-between p-4 rounded-lg bg-card/50 border border-border/20 aegis-ceremonial-hover"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {shift.staffName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <div className="font-medium text-foreground">{shift.staffName}</div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {shift.startTime} - {shift.endTime}
                      <MapPin className="w-4 h-4 ml-2" />
                      {shift.location}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-sm font-medium text-foreground">{shift.type}</div>
                    <div className="text-xs text-muted-foreground">
                      {shift.clientCount} clients
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant={getShiftStatusColor(shift.status)} size="sm">
                      {shift.status}
                    </Badge>
                    <Badge variant={getPriorityColor(shift.priority)} size="sm">
                      {shift.priority}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <User className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="aegis-glass-panel p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="aegis-ceremonial-hover justify-start h-auto p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-primary/10 text-primary">
                  <Plus className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Create Shift Template</div>
                  <div className="text-sm text-muted-foreground">Save time with templates</div>
                </div>
              </div>
            </Button>
            
            <Button variant="outline" className="aegis-ceremonial-hover justify-start h-auto p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-success/10 text-success">
                  <Users className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Auto-Fill Gaps</div>
                  <div className="text-sm text-muted-foreground">AI-powered scheduling</div>
                </div>
              </div>
            </Button>
            
            <Button variant="outline" className="aegis-ceremonial-hover justify-start h-auto p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-warning/10 text-warning">
                  <Download className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Generate Report</div>
                  <div className="text-sm text-muted-foreground">Weekly schedule summary</div>
                </div>
              </div>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}