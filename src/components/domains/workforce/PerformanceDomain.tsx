import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  TrendingUp, Star, Award, Target, Users, BarChart3,
  Calendar, Clock, AlertTriangle, CheckCircle, Search,
  Filter, Download, Settings, Plus, FileText, Eye
} from "lucide-react";
import { Card } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Progress } from "../../ui/progress";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { mockStaffProfiles } from "../../../lib/expanded-mock-data";

interface PerformanceDomainProps {
  activeTab: string;
}

export function PerformanceDomain({ activeTab }: PerformanceDomainProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("quarter");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  // Performance data
  const performanceMetrics = [
    {
      title: "Overall Performance",
      value: "4.2/5",
      change: "+0.3",
      icon: <TrendingUp className="w-5 h-5" />,
      color: "success"
    },
    {
      title: "Goals Achieved",
      value: "87%",
      change: "+12%",
      icon: <Target className="w-5 h-5" />,
      color: "primary"
    },
    {
      title: "Reviews Due",
      value: 14,
      change: "+3",
      icon: <AlertTriangle className="w-5 h-5" />,
      color: "warning"
    },
    {
      title: "Top Performers",
      value: 23,
      change: "+7",
      icon: <Award className="w-5 h-5" />,
      color: "destructive"
    }
  ];

  // Enhanced staff performance data
  const staffPerformance = mockStaffProfiles.map(staff => ({
    ...staff,
    performanceRating: (Math.random() * 2 + 3).toFixed(1), // 3.0 - 5.0
    goalsCompleted: Math.floor(Math.random() * 5) + 3,
    goalsTotal: Math.floor(Math.random() * 3) + 8,
    lastReviewDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    nextReviewDate: new Date(Date.now() + Math.random() * 60 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    strengths: ["Communication", "Reliability", "Team Leadership", "Clinical Skills"][Math.floor(Math.random() * 4)],
    improvementAreas: ["Time Management", "Documentation", "Technology Skills"][Math.floor(Math.random() * 3)],
    feedback: Math.floor(Math.random() * 10) + 15, // 15-25 feedback items
    achievements: Math.floor(Math.random() * 8) + 2
  }));

  const performanceCategories = [
    { name: "Clinical Excellence", average: 4.3, trend: "+0.2" },
    { name: "Communication", average: 4.1, trend: "+0.1" },
    { name: "Teamwork", average: 4.5, trend: "+0.3" },
    { name: "Reliability", average: 4.2, trend: "-0.1" },
    { name: "Innovation", average: 3.8, trend: "+0.4" },
    { name: "Leadership", average: 4.0, trend: "+0.2" }
  ];

  const upcomingReviews = [
    { name: "Sarah Mitchell AE", role: "Deputy Manager", dueDate: "2024-02-15", type: "Annual", status: "scheduled" },
    { name: "James Patterson AE", role: "Clinical Lead", dueDate: "2024-02-18", type: "Quarterly", status: "overdue" },
    { name: "Emma Thompson AE", role: "Clinical Lead", dueDate: "2024-02-20", type: "Probation", status: "scheduled" },
    { name: "Michael Chen AE", role: "Support Worker", dueDate: "2024-02-22", type: "Annual", status: "pending" }
  ];

  const departments = ["Clinical Care", "Support Services", "Administration", "Management"];

  const getPerformanceColor = (rating: string) => {
    const score = parseFloat(rating);
    if (score >= 4.5) return 'success';
    if (score >= 4.0) return 'primary';
    if (score >= 3.5) return 'warning';
    return 'destructive';
  };

  const getReviewStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'scheduled': return 'success';
      case 'pending': return 'warning';
      case 'overdue': return 'destructive';
      default: return 'secondary';
    }
  };

  const filteredStaff = staffPerformance.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         staff.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || staff.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
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
          Performance Management
        </h1>
        <p className="text-muted-foreground">
          Comprehensive performance tracking and staff development analytics
        </p>
      </motion.div>

      <div className="space-y-6">
        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {performanceMetrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="aegis-glass-panel p-6 aegis-ceremonial-hover">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg bg-${metric.color}/10 text-${metric.color}`}>
                    {metric.icon}
                  </div>
                  <Badge 
                    variant={metric.change.startsWith('+') ? 'success' : 'destructive'}
                    size="sm"
                  >
                    {metric.change}
                  </Badge>
                </div>
                <div className="mt-4">
                  <h3 className="text-2xl font-bold text-foreground">{metric.value}</h3>
                  <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Controls */}
        <Card className="aegis-glass-panel p-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

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
              <Button variant="outline" size="sm" className="aegis-ceremonial-hover">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button size="sm" className="aegis-ceremonial-hover">
                <Plus className="w-4 h-4 mr-2" />
                New Review
              </Button>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Categories */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="aegis-glass-panel p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Performance Categories</h3>
                <Badge variant="outline" className="healthcare-heartbeat heartbeat-vital">
                  Avg 4.2/5
                </Badge>
              </div>
              
              <div className="space-y-4">
                {performanceCategories.map((category, index) => (
                  <motion.div
                    key={category.name}
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(category.average) 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-medium text-foreground">{category.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-foreground">
                        {category.average.toFixed(1)}
                      </span>
                      <Badge 
                        variant={category.trend.startsWith('+') ? 'success' : 'destructive'}
                        size="sm"
                      >
                        {category.trend}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Upcoming Reviews */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="aegis-glass-panel p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Upcoming Reviews</h3>
                <Button variant="outline" size="sm" className="aegis-ceremonial-hover">
                  Schedule Review
                </Button>
              </div>
              
              <div className="space-y-4">
                {upcomingReviews.map((review, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-card/30 border border-border/20 aegis-ceremonial-hover"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                          {review.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-foreground">{review.name}</div>
                        <div className="text-sm text-muted-foreground">{review.role}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className="text-sm font-medium text-foreground">
                          {review.dueDate}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {review.type}
                        </div>
                      </div>
                      <Badge variant={getReviewStatusColor(review.status)} size="sm">
                        {review.status}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Staff Performance Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="aegis-glass-panel p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Staff Performance Overview</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="aegis-ceremonial-hover">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics
                </Button>
                <Button variant="outline" size="sm" className="aegis-ceremonial-hover">
                  <Settings className="w-4 h-4 mr-2" />
                  Configure
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto institutional-scroll">
              {filteredStaff.slice(0, 12).map((staff, index) => (
                <motion.div
                  key={staff.id}
                  className="p-4 rounded-lg bg-card/50 border border-border/20 aegis-ceremonial-hover"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {staff.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground truncate">{staff.name}</div>
                      <div className="text-sm text-muted-foreground truncate">{staff.role}</div>
                    </div>
                    <Badge variant={getPerformanceColor(staff.performanceRating)} size="sm">
                      {staff.performanceRating}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Goals Progress</span>
                      <span className="font-medium text-foreground">
                        {staff.goalsCompleted}/{staff.goalsTotal}
                      </span>
                    </div>
                    <Progress 
                      value={(staff.goalsCompleted / staff.goalsTotal) * 100} 
                      className="h-2" 
                    />
                    
                    <div className="flex items-center justify-between pt-2">
                      <div className="text-xs text-muted-foreground">
                        Last review: {staff.lastReviewDate}
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-7 px-2">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 px-2">
                          <FileText className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {filteredStaff.length > 12 && (
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