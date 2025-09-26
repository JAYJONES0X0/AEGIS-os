import React, { useState } from "react";
import { motion } from "motion/react";
import { Users, Calendar, Clock, Award, AlertTriangle, UserCheck, TrendingUp, Search, Filter, Plus, ArrowRight } from "lucide-react";
import { KPI } from "../common/KPI";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ScrollArea } from "../ui/scroll-area";
import { StaffProfile } from "../profiles/StaffProfile";
import { mockStaffProfiles } from "../../lib/expanded-mock-data";

interface WorkforceDomainProps {
  activeTab: string;
}

export function WorkforceDomain({ activeTab }: WorkforceDomainProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null);

  // If a staff member is selected, show their profile
  if (selectedStaff) {
    return (
      <StaffProfile
        staffId={selectedStaff}
        onBack={() => setSelectedStaff(null)}
      />
    );
  }

  // Enhanced workforce KPIs with real-time data
  const workforceKPIs = [
    { 
      label: "Total Staff", 
      value: mockStaffProfiles.length.toString(), 
      trend: "+2", 
      icon: <Users className="w-5 h-5" />,
      description: "Active team members"
    },
    { 
      label: "On Duty Now", 
      value: mockStaffProfiles.filter(s => s.status === 'On Duty').length.toString(), 
      trend: "+1", 
      icon: <UserCheck className="w-5 h-5" />,
      description: "Currently working"
    },
    { 
      label: "Training Due", 
      value: mockStaffProfiles.reduce((acc, s) => acc + s.training.overdue + s.training.required, 0).toString(), 
      trend: "-3", 
      icon: <AlertTriangle className="w-5 h-5" />,
      description: "Requires attention"
    },
    { 
      label: "Avg Performance", 
      value: "4.7/5", 
      trend: "+0.2", 
      icon: <Award className="w-5 h-5" />,
      description: "Team average rating"
    },
  ];

  const getStatusColor = (status: string) => {
    return status === 'On Duty' ? 'success' : 'secondary';
  };

  const getPerformanceColor = (rating: number) => {
    if (rating >= 4.5) return 'success';
    if (rating >= 4.0) return 'warning';
    return 'destructive';
  };

  const renderOverview = () => (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Enhanced KPIs with animations */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {workforceKPIs.map((kpi, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <KPI
              label={kpi.label}
              value={kpi.value}
              trend={kpi.trend}
              icon={kpi.icon}
              className="aegis-ceremonial-hover healthcare-heartbeat heartbeat-vital"
            />
          </motion.div>
        ))}
      </div>

      {/* Interactive Staff Overview with 3D Scroll Effects */}
      <Card 
        className="p-6 transition-all duration-500 ease-in-out aegis-ceremonial-hover"
        style={{
          background: 'rgba(18, 22, 28, 0.6)',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          borderRadius: '16px',
          boxShadow: 'inset 0 1px 0 rgba(212, 175, 55, 0.2), 0 4px 20px rgba(0, 0, 0, 0.4)',
          backdropFilter: 'none'
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <motion.h3 
            className="text-lg font-semibold text-foreground"
            style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)' }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            Staff Overview - Interactive Profiles
          </motion.h3>
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Input
                placeholder="Search staff members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64"
              />
            </motion.div>
            <Button variant="outline" size="sm" className="aegis-ceremonial-hover">
              <Filter className="w-4 h-4" />
            </Button>
            <Button size="sm" className="aegis-ceremonial-hover">
              <Plus className="w-4 h-4 mr-2" />
              Add Staff
            </Button>
          </div>
        </div>

        {/* 3D Scrollable Staff List */}
        <ScrollArea className="h-[600px] institutional-scroll">
          <div className="space-y-3 pr-4">
            {mockStaffProfiles
              .filter(staff => 
                staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                staff.role.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((staff, index) => (
                <motion.div
                  key={staff.id}
                  className="group relative"
                  initial={{ opacity: 0, y: 20, rotateX: 15 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ 
                    delay: index * 0.05, 
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    y: -5, 
                    rotateX: -2,
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div
                    className="flex items-center justify-between p-4 rounded-lg transition-all duration-200 cursor-pointer aegis-ceremonial-hover"
                    style={{
                      background: 'rgba(212, 175, 55, 0.03)',
                      border: '1px solid rgba(212, 175, 55, 0.08)',
                      backdropFilter: 'none'
                    }}
                    onClick={() => setSelectedStaff(staff.id)}
                  >
                    <div className="flex items-center space-x-4">
                      <motion.div 
                        className="relative"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary border-2 border-primary/20">
                          {staff.initials}
                        </div>
                        <motion.div 
                          className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${
                            staff.status === 'On Duty' ? 'bg-success healthcare-heartbeat heartbeat-vital' : 'bg-secondary'
                          }`}
                          animate={staff.status === 'On Duty' ? { scale: [1, 1.2, 1] } : {}}
                          transition={{ repeat: Infinity, duration: 2 }}
                        />
                      </motion.div>
                      <div className="space-y-1">
                        <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {staff.name}
                        </div>
                        <div className="text-sm text-muted-foreground">{staff.role}</div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          Next: {staff.nextShift}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <Badge variant={getStatusColor(staff.status)} size="sm">
                          {staff.status}
                        </Badge>
                        <div className="text-xs text-muted-foreground mt-1">Status</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-sm font-medium">{staff.hoursThisWeek}h</div>
                        <div className="text-xs text-muted-foreground">This Week</div>
                      </div>
                      
                      <div className="text-center">
                        <Badge variant={getPerformanceColor(staff.performance.rating)} size="sm">
                          {staff.performance.rating}/5
                        </Badge>
                        <div className="text-xs text-muted-foreground mt-1">Performance</div>
                      </div>
                      
                      <div className="text-center">
                        <div className={`text-sm font-medium ${
                          staff.training.overdue > 0 ? 'text-destructive' : 'text-success'
                        }`}>
                          {staff.training.completed}/{staff.training.required}
                        </div>
                        <div className="text-xs text-muted-foreground">Training</div>
                      </div>

                      <motion.div
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        whileHover={{ x: 5 }}
                      >
                        <ArrowRight className="w-4 h-4 text-primary" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Hover effect glow */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </motion.div>
              ))}
          </div>
        </ScrollArea>

        <motion.div 
          className="mt-4 text-sm text-muted-foreground text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          💡 Click on any staff member to view their detailed profile, schedule, and performance metrics
        </motion.div>
      </Card>
    </motion.div>
  );

  const renderScheduling = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className="p-6 transition-all duration-500 ease-in-out aegis-ceremonial-hover"
        style={{
          background: 'rgba(18, 22, 28, 0.6)',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          borderRadius: '16px',
          boxShadow: 'inset 0 1px 0 rgba(212, 175, 55, 0.2), 0 4px 20px rgba(0, 0, 0, 0.4)',
          backdropFilter: 'none'
        }}
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)' }}>
          <Calendar className="w-5 h-5 text-primary drop-shadow-sm" />
          Schedule Management
        </h3>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Advanced scheduling and rota management system with automatic shift allocation, 
            holiday planning, and compliance monitoring.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
              <div className="text-2xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Coverage</div>
            </div>
            <div className="p-4 rounded-lg bg-success/5 border border-success/10">
              <div className="text-2xl font-bold text-success">98%</div>
              <div className="text-sm text-muted-foreground">Compliance</div>
            </div>
            <div className="p-4 rounded-lg bg-warning/5 border border-warning/10">
              <div className="text-2xl font-bold text-warning">3</div>
              <div className="text-sm text-muted-foreground">Pending Requests</div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );

  const renderTraining = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className="p-6 transition-all duration-500 ease-in-out aegis-ceremonial-hover"
        style={{
          background: 'rgba(18, 22, 28, 0.6)',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          borderRadius: '16px',
          boxShadow: 'inset 0 1px 0 rgba(212, 175, 55, 0.2), 0 4px 20px rgba(0, 0, 0, 0.4)',
          backdropFilter: 'none'
        }}
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)' }}>
          <Award className="w-5 h-5 text-primary drop-shadow-sm" />
          Training Management
        </h3>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Comprehensive training tracking, certification management, and compliance monitoring 
            with automatic renewal reminders and progress tracking.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-success/5 border border-success/10">
              <div className="text-2xl font-bold text-success">156</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div className="p-4 rounded-lg bg-warning/5 border border-warning/10">
              <div className="text-2xl font-bold text-warning">23</div>
              <div className="text-sm text-muted-foreground">Due Soon</div>
            </div>
            <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/10">
              <div className="text-2xl font-bold text-destructive">7</div>
              <div className="text-sm text-muted-foreground">Overdue</div>
            </div>
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
              <div className="text-2xl font-bold text-primary">94%</div>
              <div className="text-sm text-muted-foreground">Compliance</div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );

  const renderPerformance = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className="p-6 transition-all duration-500 ease-in-out aegis-ceremonial-hover"
        style={{
          background: 'rgba(18, 22, 28, 0.6)',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          borderRadius: '16px',
          boxShadow: 'inset 0 1px 0 rgba(212, 175, 55, 0.2), 0 4px 20px rgba(0, 0, 0, 0.4)',
          backdropFilter: 'none'
        }}
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)' }}>
          <TrendingUp className="w-5 h-5 text-primary drop-shadow-sm" />
          Performance Analytics
        </h3>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Advanced performance analytics with real-time metrics, trend analysis, 
            and personalized development plans for each team member.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-success/5 border border-success/10">
              <div className="text-2xl font-bold text-success">4.7</div>
              <div className="text-sm text-muted-foreground">Avg Rating</div>
            </div>
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
              <div className="text-2xl font-bold text-primary">97%</div>
              <div className="text-sm text-muted-foreground">Reliability</div>
            </div>
            <div className="p-4 rounded-lg bg-cyan/5 border border-cyan/10">
              <div className="text-2xl font-bold text-cyan">93%</div>
              <div className="text-sm text-muted-foreground">Client Satisfaction</div>
            </div>
            <div className="p-4 rounded-lg bg-warning/5 border border-warning/10">
              <div className="text-2xl font-bold text-warning">+12%</div>
              <div className="text-sm text-muted-foreground">Improvement</div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return renderOverview();
      case "scheduling":
        return renderScheduling();
      case "training":
        return renderTraining();
      case "performance":
        return renderPerformance();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="p-6 min-h-screen aegis-tab-home">
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold text-foreground mb-2">Workforce & HR Management</h1>
        <p className="text-muted-foreground">
          Interactive staff management with detailed profiles, real-time scheduling, and comprehensive performance tracking
        </p>
      </motion.div>

      <Tabs value={activeTab} className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <TabsList className="grid w-full grid-cols-4 aegis-glass-panel">
            <TabsTrigger value="overview" className="aegis-ceremonial-hover">Overview</TabsTrigger>
            <TabsTrigger value="scheduling" className="aegis-ceremonial-hover">Scheduling</TabsTrigger>
            <TabsTrigger value="training" className="aegis-ceremonial-hover">Training</TabsTrigger>
            <TabsTrigger value="performance" className="aegis-ceremonial-hover">Performance</TabsTrigger>
          </TabsList>
        </motion.div>

        <TabsContent value={activeTab} className="space-y-6">
          {renderContent()}
        </TabsContent>
      </Tabs>
    </div>
  );
}