import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, Clock, User, MapPin, ChevronLeft, ChevronRight, 
  Plus, Settings, Filter, Search, MoreVertical, AlertTriangle,
  CheckCircle, Edit3, Trash2, Copy, Share2, Users, UserCheck,
  Phone, Mail, Star, Award, Briefcase, GraduationCap, Activity,
  TrendingUp, BarChart3, Zap, Brain, Target, Shield, Download,
  Upload, Maximize2, Minimize2, RotateCcw, RefreshCw, Eye,
  Headphones, Video, MessageSquare, Wifi, Battery, Signal,
  Heart, Bell, Coffee, Moon, Sun, Sunrise, Sunset
} from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Progress } from '../ui/progress';
import { ScrollArea } from '../ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { mockStaffProfiles } from '../../lib/expanded-mock-data';
import { toast } from 'sonner@2.0.3';

interface RotaSchedulerProps {
  selectedDate?: Date;
  onDateChange?: (date: Date) => void;
}

interface ShiftBlock {
  id: string;
  staffId: string;
  startTime: string;
  endTime: string;
  location: string;
  type: 'day' | 'evening' | 'night' | 'break' | 'meeting' | 'training' | 'overtime';
  status: 'confirmed' | 'pending' | 'cancelled' | 'no-show';
  clientId?: string;
  notes?: string;
  color: string;
  skillsRequired: string[];
  certifications: string[];
}

interface StaffMetrics {
  totalHours: number;
  overtimeHours: number;
  efficiency: number;
  satisfaction: number;
  availabilityScore: number;
}

export function EnhancedRotaScheduler({ selectedDate = new Date(), onDateChange }: RotaSchedulerProps) {
  const [currentDate, setCurrentDate] = useState(selectedDate);
  const [viewMode, setViewMode] = useState<'week' | 'month' | '3d-roster'>('week');
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [shifts, setShifts] = useState<ShiftBlock[]>([]);
  const [staffMetrics, setStaffMetrics] = useState<Record<string, StaffMetrics>>({});
  const [realTimeUpdates, setRealTimeUpdates] = useState(true);
  const [autoOptimize, setAutoOptimize] = useState(false);

  // Enhanced shift types with smart scheduling
  const shiftTypes = [
    { id: 'day', label: 'Day Shift', time: '07:00-15:00', color: '#10B981', icon: Sun },
    { id: 'evening', label: 'Evening Shift', time: '15:00-23:00', color: '#F59E0B', icon: Sunset },
    { id: 'night', label: 'Night Shift', time: '23:00-07:00', color: '#6366F1', icon: Moon },
    { id: 'break', label: 'Break Cover', time: 'Variable', color: '#8B5CF6', icon: Coffee },
    { id: 'training', label: 'Training', time: 'Variable', color: '#EF4444', icon: GraduationCap },
    { id: 'meeting', label: 'Meeting', time: 'Variable', color: '#06B6D4', icon: Users }
  ];

  // Time slots for 24-hour coverage
  const timeSlots = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    time: `${i.toString().padStart(2, '0')}:00`,
    label: i === 0 ? '12:00 AM' : i < 12 ? `${i}:00 AM` : i === 12 ? '12:00 PM' : `${i - 12}:00 PM`,
    period: i < 6 ? 'night' : i < 14 ? 'morning' : i < 22 ? 'evening' : 'night'
  }));

  // Generate sample shifts with realistic patterns
  useEffect(() => {
    const generateShifts = () => {
      const newShifts: ShiftBlock[] = [];
      const departments = ['Nursing', 'Care', 'Admin', 'Maintenance', 'Kitchen'];
      
      mockStaffProfiles.forEach(staff => {
        // Generate shifts for the week
        for (let day = 0; day < 7; day++) {
          const date = new Date(currentDate);
          date.setDate(date.getDate() - date.getDay() + day);
          
          // Smart shift assignment based on staff role and preferences
          const shiftType = staff.department === 'Nursing' ? 
            ['day', 'evening', 'night'][Math.floor(Math.random() * 3)] :
            staff.department === 'Care' ?
            ['day', 'evening'][Math.floor(Math.random() * 2)] :
            'day';
          
          const shift: ShiftBlock = {
            id: `shift_${staff.id}_${day}`,
            staffId: staff.id,
            startTime: shiftType === 'day' ? '07:00' : shiftType === 'evening' ? '15:00' : '23:00',
            endTime: shiftType === 'day' ? '15:00' : shiftType === 'evening' ? '23:00' : '07:00',
            location: staff.location || 'Main Building',
            type: shiftType as any,
            status: Math.random() > 0.9 ? 'pending' : 'confirmed',
            color: shiftTypes.find(t => t.id === shiftType)?.color || '#10B981',
            skillsRequired: staff.specializations || [],
            certifications: staff.certifications || []
          };
          
          newShifts.push(shift);
        }
      });
      
      setShifts(newShifts);
    };

    const generateMetrics = () => {
      const metrics: Record<string, StaffMetrics> = {};
      mockStaffProfiles.forEach(staff => {
        metrics[staff.id] = {
          totalHours: 35 + Math.random() * 10,
          overtimeHours: Math.random() * 5,
          efficiency: 85 + Math.random() * 15,
          satisfaction: 4.2 + Math.random() * 0.8,
          availabilityScore: 90 + Math.random() * 10
        };
      });
      setStaffMetrics(metrics);
    };

    generateShifts();
    generateMetrics();
  }, [currentDate]);

  // Real-time updates simulation
  useEffect(() => {
    if (!realTimeUpdates) return;

    const interval = setInterval(() => {
      // Simulate shift status changes
      setShifts(prev => prev.map(shift => {
        if (Math.random() > 0.95) {
          const statuses = ['confirmed', 'pending', 'cancelled'];
          return {
            ...shift,
            status: statuses[Math.floor(Math.random() * statuses.length)] as any
          };
        }
        return shift;
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, [realTimeUpdates]);

  const getWeekDates = () => {
    const week = [];
    const start = new Date(currentDate);
    start.setDate(start.getDate() - start.getDay());
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      week.push(date);
    }
    return week;
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentDate(newDate);
    onDateChange?.(newDate);
  };

  const getShiftsForDay = (date: Date) => {
    return shifts.filter(shift => {
      // For simplicity, showing shifts for all days in view
      return true;
    });
  };

  const getStaffShiftsForDay = (staffId: string, date: Date) => {
    return shifts.filter(shift => shift.staffId === staffId);
  };

  const renderWeekView = () => {
    const weekDates = getWeekDates();
    const filteredStaff = mockStaffProfiles.filter(staff => 
      (filterDepartment === 'all' || staff.department === filterDepartment) &&
      (staff.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
       staff.role.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
      <div className="space-y-4">
        {/* Week Header */}
        <div className="grid grid-cols-8 gap-2">
          <div className="p-4 font-semibold text-foreground">Staff</div>
          {weekDates.map((date, index) => (
            <motion.div
              key={index}
              className="p-4 text-center"
              style={{
                background: 'rgba(212, 175, 55, 0.05)',
                border: '1px solid rgba(212, 175, 55, 0.1)',
                borderRadius: '8px'
              }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="font-semibold text-foreground">
                {date.toLocaleDateString('en', { weekday: 'short' })}
              </div>
              <div className="text-sm text-muted-foreground">
                {date.getDate()}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Staff Rows */}
        <ScrollArea className="h-[600px]">
          <div className="space-y-2">
            {filteredStaff.map((staff, staffIndex) => (
              <motion.div
                key={staff.id}
                className="grid grid-cols-8 gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: staffIndex * 0.05 }}
              >
                {/* Staff Info */}
                <Card 
                  className="p-4 cursor-pointer aegis-ceremonial-hover"
                  style={{
                    background: selectedStaff === staff.id ? 'rgba(212, 175, 55, 0.15)' : 'rgba(18, 22, 28, 0.6)',
                    border: selectedStaff === staff.id ? '1px solid rgba(212, 175, 55, 0.4)' : '1px solid rgba(212, 175, 55, 0.2)',
                    borderRadius: '8px'
                  }}
                  onClick={() => setSelectedStaff(staff.id === selectedStaff ? null : staff.id)}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-xs bg-primary/10 text-primary">
                        {staff.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-sm text-foreground truncate">
                        {staff.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {staff.role}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <Badge variant="secondary" size="sm" className="text-xs">
                          {staff.department}
                        </Badge>
                        {staff.certifications && (
                          <Award className="w-3 h-3 text-warning" />
                        )}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Daily Shifts */}
                {weekDates.map((date, dayIndex) => {
                  const dayShifts = getStaffShiftsForDay(staff.id, date);
                  return (
                    <div
                      key={dayIndex}
                      className="min-h-[120px] p-2 rounded-lg"
                      style={{
                        background: 'rgba(18, 22, 28, 0.3)',
                        border: '1px solid rgba(212, 175, 55, 0.1)'
                      }}
                    >
                      <div className="space-y-1">
                        {dayShifts.map((shift, shiftIndex) => (
                          <motion.div
                            key={shift.id}
                            className="p-2 rounded cursor-pointer text-white text-xs"
                            style={{
                              backgroundColor: shift.color,
                              opacity: shift.status === 'cancelled' ? 0.5 : 1
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => toast.info(`${shift.type} shift: ${shift.startTime}-${shift.endTime}`)}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium">{shift.type}</span>
                              <div className="flex items-center gap-1">
                                {shift.status === 'confirmed' && <CheckCircle className="w-3 h-3" />}
                                {shift.status === 'pending' && <Clock className="w-3 h-3" />}
                                {shift.status === 'cancelled' && <AlertTriangle className="w-3 h-3" />}
                              </div>
                            </div>
                            <div className="text-xs opacity-90">
                              {shift.startTime} - {shift.endTime}
                            </div>
                            <div className="text-xs opacity-75">
                              {shift.location}
                            </div>
                          </motion.div>
                        ))}
                        
                        {/* Add Shift Button */}
                        <motion.button
                          className="w-full p-2 rounded border-2 border-dashed border-primary/30 text-primary/70 hover:border-primary/50 hover:text-primary text-xs flex items-center justify-center gap-1"
                          whileHover={{ scale: 1.02 }}
                          onClick={() => toast.success(`Adding shift for ${staff.name}`)}
                        >
                          <Plus className="w-3 h-3" />
                          Add Shift
                        </motion.button>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </div>
    );
  };

  const render3DRosterView = () => (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* 3D Roster Visualization */}
      <Card 
        className="p-8 transition-all duration-500 ease-in-out aegis-ceremonial-hover"
        style={{
          background: 'rgba(18, 22, 28, 0.6)',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          borderRadius: '16px',
          boxShadow: 'inset 0 1px 0 rgba(212, 175, 55, 0.2), 0 4px 20px rgba(0, 0, 0, 0.4)',
          backdropFilter: 'none'
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-6 h-6 text-primary" />
            <div>
              <h3 className="text-lg font-semibold text-foreground">3D Roster Analytics</h3>
              <p className="text-sm text-muted-foreground">Multi-dimensional workforce visualization</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button size="sm">
              <Brain className="w-4 h-4 mr-2" />
              AI Optimize
            </Button>
          </div>
        </div>

        {/* Department Coverage Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Department Coverage</h4>
            {['Nursing', 'Care Support', 'Administration', 'Maintenance', 'Kitchen'].map((dept, index) => {
              const coverage = 85 + Math.random() * 15;
              return (
                <motion.div
                  key={dept}
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground">{dept}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-foreground">{coverage.toFixed(1)}%</span>
                      <Badge variant={coverage > 90 ? 'default' : coverage > 80 ? 'secondary' : 'destructive'} size="sm">
                        {coverage > 90 ? 'Optimal' : coverage > 80 ? 'Good' : 'Low'}
                      </Badge>
                    </div>
                  </div>
                  <Progress value={coverage} className="h-2" />
                </motion.div>
              );
            })}
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Shift Distribution</h4>
            {shiftTypes.slice(0, 3).map((shift, index) => {
              const count = Math.floor(15 + Math.random() * 10);
              return (
                <motion.div
                  key={shift.id}
                  className="flex items-center justify-between p-3 rounded-lg"
                  style={{
                    background: `${shift.color}20`,
                    border: `1px solid ${shift.color}40`
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-3">
                    <shift.icon className="w-5 h-5" style={{ color: shift.color }} />
                    <div>
                      <div className="font-medium text-sm text-foreground">{shift.label}</div>
                      <div className="text-xs text-muted-foreground">{shift.time}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-foreground">{count}</div>
                    <div className="text-xs text-muted-foreground">staff assigned</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* AI Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {[
            {
              title: "Optimization Opportunity",
              description: "Redistribute 3 evening shifts to reduce overtime by 12%",
              impact: "High",
              action: "Apply AI Suggestion",
              icon: Target,
              color: "text-success"
            },
            {
              title: "Staff Wellness Alert",
              description: "4 staff members approaching maximum weekly hours",
              impact: "Medium",
              action: "Review Workload",
              icon: Heart,
              color: "text-warning"
            },
            {
              title: "Skills Gap Detected",
              description: "Night shift needs additional certified nurse coverage",
              impact: "High",
              action: "Schedule Training",
              icon: Shield,
              color: "text-destructive"
            }
          ].map((insight, index) => (
            <motion.div
              key={index}
              className="p-4 rounded-lg aegis-ceremonial-hover cursor-pointer"
              style={{
                background: 'rgba(212, 175, 55, 0.05)',
                border: '1px solid rgba(212, 175, 55, 0.15)'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => toast.info(`Acting on: ${insight.title}`)}
            >
              <div className="flex items-start justify-between mb-3">
                <insight.icon className={`w-5 h-5 ${insight.color}`} />
                <Badge variant={insight.impact === 'High' ? 'destructive' : insight.impact === 'Medium' ? 'secondary' : 'default'} size="sm">
                  {insight.impact}
                </Badge>
              </div>
              <div className="space-y-2">
                <h5 className="font-medium text-sm text-foreground">{insight.title}</h5>
                <p className="text-xs text-muted-foreground">{insight.description}</p>
                <Button size="sm" variant="outline" className="w-full text-xs h-6">
                  {insight.action}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );

  const renderStaffMetrics = () => (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {selectedStaff && mockStaffProfiles.find(s => s.id === selectedStaff) && (
        <Card 
          className="lg:col-span-4 p-6 transition-all duration-500 ease-in-out aegis-ceremonial-hover"
          style={{
            background: 'rgba(18, 22, 28, 0.6)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            borderRadius: '16px',
            boxShadow: 'inset 0 1px 0 rgba(212, 175, 55, 0.2), 0 4px 20px rgba(0, 0, 0, 0.4)',
            backdropFilter: 'none'
          }}
        >
          {(() => {
            const staff = mockStaffProfiles.find(s => s.id === selectedStaff)!;
            const metrics = staffMetrics[selectedStaff] || {};
            
            return (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarFallback className="text-lg bg-primary/10 text-primary">
                        {staff.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{staff.name}</h3>
                      <p className="text-muted-foreground">{staff.role} • {staff.department}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="default">{staff.employeeId}</Badge>
                        <Badge variant="secondary">{staff.location}</Badge>
                        {staff.certifications && <Award className="w-4 h-4 text-warning" />}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Phone className="w-4 h-4 mr-2" />
                      Contact
                    </Button>
                    <Button variant="outline" size="sm">
                      <Mail className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                    <Button size="sm">
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit Schedule
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {[
                    { label: "Total Hours", value: `${metrics.totalHours?.toFixed(1) || 0}h`, icon: Clock, trend: "+2.5h" },
                    { label: "Overtime", value: `${metrics.overtimeHours?.toFixed(1) || 0}h`, icon: AlertTriangle, trend: "-0.5h" },
                    { label: "Efficiency", value: `${metrics.efficiency?.toFixed(0) || 0}%`, icon: TrendingUp, trend: "+3%" },
                    { label: "Satisfaction", value: `${metrics.satisfaction?.toFixed(1) || 0}/5`, icon: Star, trend: "+0.2" },
                    { label: "Availability", value: `${metrics.availabilityScore?.toFixed(0) || 0}%`, icon: CheckCircle, trend: "+5%" }
                  ].map((metric, index) => (
                    <motion.div
                      key={index}
                      className="p-4 rounded-lg text-center"
                      style={{
                        background: 'rgba(212, 175, 55, 0.05)',
                        border: '1px solid rgba(212, 175, 55, 0.15)'
                      }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <metric.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                      <div className="text-lg font-bold text-foreground">{metric.value}</div>
                      <div className="text-xs text-muted-foreground">{metric.label}</div>
                      <Badge variant="secondary" size="sm" className="mt-1 text-xs">
                        {metric.trend}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })()}
        </Card>
      )}
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2 aegis-text-enhanced">
            Advanced Workforce Scheduling
          </h1>
          <p className="text-muted-foreground aegis-text-secondary">
            AI-powered 3D roster management with real-time optimization
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="aegis-ceremonial-hover">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm" className="aegis-ceremonial-hover">
            <Brain className="w-4 h-4 mr-2" />
            AI Optimize
          </Button>
        </div>
      </motion.div>

      {/* Controls */}
      <Card 
        className="p-4 transition-all duration-500 ease-in-out aegis-ceremonial-hover"
        style={{
          background: 'rgba(18, 22, 28, 0.4)',
          border: '1px solid rgba(212, 175, 55, 0.2)',
          borderRadius: '12px',
          boxShadow: 'inset 0 1px 0 rgba(212, 175, 55, 0.15), 0 4px 16px rgba(0, 0, 0, 0.3)',
          backdropFilter: 'none'
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateWeek('prev')}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="text-center min-w-[200px]">
                <div className="font-semibold text-foreground">
                  {currentDate.toLocaleDateString('en', { 
                    month: 'long', 
                    year: 'numeric',
                    day: 'numeric'
                  })}
                </div>
                <div className="text-sm text-muted-foreground">
                  Week {Math.ceil(currentDate.getDate() / 7)}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateWeek('next')}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            <Separator orientation="vertical" className="h-8" />

            <div className="flex items-center gap-2">
              <Input
                placeholder="Search staff..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48"
              />
              <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Nursing">Nursing</SelectItem>
                  <SelectItem value="Care">Care Support</SelectItem>
                  <SelectItem value="Admin">Administration</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)}>
              <TabsList>
                <TabsTrigger value="week">Week View</TabsTrigger>
                <TabsTrigger value="3d-roster">3D Roster</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </Card>

      {/* Content */}
      <Tabs value={viewMode} className="w-full">
        <TabsContent value="week">
          {renderWeekView()}
        </TabsContent>
        <TabsContent value="3d-roster">
          {render3DRosterView()}
        </TabsContent>
      </Tabs>

      {/* Staff Metrics */}
      {renderStaffMetrics()}
    </div>
  );
}

export { EnhancedRotaScheduler as RotaScheduler };