import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Users, Clock, TrendingUp, Award, AlertTriangle, CheckCircle,
  Calendar, User, MapPin, ArrowRight, Search, Filter, Plus,
  BarChart3, Activity, Shield, BookOpen
} from "lucide-react";
import { Card } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { mockStaffProfiles } from "../../../lib/expanded-mock-data";

interface OverviewDomainProps {
  activeTab: string;
}

export function OverviewDomain({ activeTab }: OverviewDomainProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Calculate workforce metrics
  const totalStaff = mockStaffProfiles.length;
  const onDutyStaff = mockStaffProfiles.filter(s => s.status === 'On Duty').length;
  const averagePerformance = mockStaffProfiles.reduce((acc, s) => acc + s.performanceScore, 0) / totalStaff;
  const staffWithTrainingDue = mockStaffProfiles.filter(s => s.trainingDue).length;

  const workforceStats = [
    {
      title: "Total Staff",
      value: totalStaff,
      change: "+12%",
      icon: <Users className="w-6 h-6" />,
      color: "primary",
      description: "Active workforce members"
    },
    {
      title: "On Duty Now",
      value: onDutyStaff,
      change: "+5%",
      icon: <Clock className="w-6 h-6" />,
      color: "success",
      description: "Currently working"
    },
    {
      title: "Avg Performance",
      value: `${averagePerformance.toFixed(1)}/5`,
      change: "+0.3",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "warning",
      description: "Performance rating"
    },
    {
      title: "Training Due",
      value: staffWithTrainingDue,
      change: "-8%",
      icon: <AlertTriangle className="w-6 h-6" />,
      color: "destructive",
      description: "Require training updates"
    }
  ];

  const departmentBreakdown = [
    { name: "Clinical Care", staff: 45, percentage: 38, color: "#3B82F6" },
    { name: "Support Services", staff: 32, percentage: 27, color: "#10B981" },
    { name: "Administration", staff: 18, percentage: 15, color: "#F59E0B" },
    { name: "Management", staff: 12, percentage: 10, color: "#8B5CF6" },
    { name: "Maintenance", staff: 8, percentage: 7, color: "#EF4444" },
    { name: "Other", staff: 5, percentage: 4, color: "#6B7280" }
  ];

  const recentActivities = [
    { type: "New Hire", message: "Emma Thompson AE started as Clinical Lead", time: "2 hours ago", icon: <Users className="w-4 h-4" /> },
    { type: "Training", message: "15 staff completed AE medication training", time: "4 hours ago", icon: <BookOpen className="w-4 h-4" /> },
    { type: "Shift Change", message: "Night shift handover completed successfully", time: "6 hours ago", icon: <Clock className="w-4 h-4" /> },
    { type: "Performance", message: "Q4 performance reviews scheduled", time: "1 day ago", icon: <Award className="w-4 h-4" /> },
    { type: "Compliance", message: "All AE security clearances updated", time: "2 days ago", icon: <Shield className="w-4 h-4" /> }
  ];

  const filteredStaff = mockStaffProfiles.filter(staff =>
    staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 min-h-screen aegis-tab-home">
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Workforce Overview
        </h1>
        <p className="text-muted-foreground">
          Comprehensive workforce analytics and staff management dashboard
        </p>
      </motion.div>

      <div className="space-y-6">
        {/* Workforce Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {workforceStats.map((stat, index) => (
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
                  <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Department Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="aegis-glass-panel p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Department Breakdown</h3>
                <Badge variant="outline" className="healthcare-heartbeat heartbeat-vital">
                  {totalStaff} Total
                </Badge>
              </div>
              
              <div className="space-y-4">
                {departmentBreakdown.map((dept, index) => (
                  <motion.div
                    key={dept.name}
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: dept.color }}
                      />
                      <div>
                        <span className="font-medium text-foreground">{dept.name}</span>
                        <span className="text-sm text-muted-foreground ml-2">
                          {dept.staff} staff
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-card rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: dept.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${dept.percentage}%` }}
                          transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                        />
                      </div>
                      <span className="text-sm font-medium text-foreground w-8">
                        {dept.percentage}%
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="aegis-glass-panel p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Recent Activities</h3>
                <Button variant="outline" size="sm" className="aegis-ceremonial-hover">
                  View All
                </Button>
              </div>
              
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-card/30 border border-border/20 aegis-ceremonial-hover"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <div className="p-2 rounded bg-primary/10 text-primary mt-1">
                      {activity.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" size="sm">
                          {activity.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {activity.time}
                        </span>
                      </div>
                      <p className="text-sm text-foreground">
                        {activity.message}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Staff Directory Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="aegis-glass-panel p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Staff Directory</h3>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Search staff..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48"
                />
                <Button variant="outline" size="sm" className="aegis-ceremonial-hover">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button size="sm" className="aegis-ceremonial-hover">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Staff
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto institutional-scroll">
              {filteredStaff.slice(0, 9).map((staff, index) => (
                <motion.div
                  key={staff.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-border/20 aegis-ceremonial-hover cursor-pointer"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                      {staff.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground truncate">
                      {staff.name}
                    </div>
                    <div className="text-sm text-muted-foreground truncate">
                      {staff.role}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge 
                        variant={staff.status === 'On Duty' ? 'success' : 'secondary'} 
                        size="sm"
                      >
                        {staff.status}
                      </Badge>
                      {staff.trainingDue && (
                        <Badge variant="warning" size="sm">
                          Training Due
                        </Badge>
                      )}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </motion.div>
              ))}
            </div>
            
            {filteredStaff.length > 9 && (
              <div className="mt-4 text-center">
                <Button variant="outline" className="aegis-ceremonial-hover">
                  View All {filteredStaff.length} Staff Members
                </Button>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
}