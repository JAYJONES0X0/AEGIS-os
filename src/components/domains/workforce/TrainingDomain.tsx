import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  BookOpen, GraduationCap, Award, Clock, Users, TrendingUp,
  CheckCircle, AlertTriangle, Calendar, Play, Pause, Download,
  Search, Filter, Plus, Settings, FileCheck, Star
} from "lucide-react";
import { Card } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Progress } from "../../ui/progress";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { mockStaffProfiles } from "../../../lib/expanded-mock-data";

interface TrainingDomainProps {
  activeTab: string;
}

export function TrainingDomain({ activeTab }: TrainingDomainProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<'courses' | 'staff' | 'compliance'>('courses');

  // Training courses data
  const trainingCourses = [
    {
      id: "course_001",
      title: "AE Medication Administration",
      category: "Clinical",
      duration: "4 hours",
      enrolled: 45,
      completed: 38,
      completionRate: 84,
      priority: "high",
      dueDate: "2024-02-15",
      status: "active",
      description: "Comprehensive medication management and eMAR system training"
    },
    {
      id: "course_002", 
      title: "Safeguarding Fundamentals",
      category: "Compliance",
      duration: "6 hours",
      enrolled: 52,
      completed: 49,
      completionRate: 94,
      priority: "critical",
      dueDate: "2024-01-30",
      status: "active",
      description: "Essential safeguarding procedures and reporting protocols"
    },
    {
      id: "course_003",
      title: "Manual Handling Techniques",
      category: "Health & Safety",
      duration: "3 hours",
      enrolled: 38,
      completed: 35,
      completionRate: 92,
      priority: "medium",
      dueDate: "2024-03-01",
      status: "active",
      description: "Safe manual handling and mobility assistance techniques"
    },
    {
      id: "course_004",
      title: "AEGIS System Advanced",
      category: "Technology",
      duration: "2 hours",
      enrolled: 28,
      completed: 15,
      completionRate: 54,
      priority: "medium",
      dueDate: "2024-02-28",
      status: "active",
      description: "Advanced features and workflows in the AEGIS platform"
    },
    {
      id: "course_005",
      title: "Mental Health First Aid",
      category: "Clinical",
      duration: "8 hours",
      enrolled: 25,
      completed: 22,
      completionRate: 88,
      priority: "high",
      dueDate: "2024-03-15",
      status: "active",
      description: "Mental health crisis intervention and support techniques"
    }
  ];

  const trainingCategories = ["Clinical", "Compliance", "Health & Safety", "Technology", "Leadership"];

  const trainingStats = [
    {
      title: "Active Courses",
      value: trainingCourses.length,
      change: "+3",
      icon: <BookOpen className="w-5 h-5" />,
      color: "primary"
    },
    {
      title: "Total Enrolled",
      value: trainingCourses.reduce((sum, course) => sum + course.enrolled, 0),
      change: "+24",
      icon: <Users className="w-5 h-5" />,
      color: "success"
    },
    {
      title: "Avg Completion",
      value: `${Math.round(trainingCourses.reduce((sum, course) => sum + course.completionRate, 0) / trainingCourses.length)}%`,
      change: "+5%",
      icon: <TrendingUp className="w-5 h-5" />,
      color: "warning"
    },
    {
      title: "Overdue Items",
      value: 12,
      change: "-3",
      icon: <AlertTriangle className="w-5 h-5" />,
      color: "destructive"
    }
  ];

  const staffTrainingProgress = mockStaffProfiles.map(staff => ({
    ...staff,
    coursesCompleted: Math.floor(Math.random() * 8) + 2,
    coursesEnrolled: Math.floor(Math.random() * 5) + 8,
    complianceScore: Math.floor(Math.random() * 30) + 70,
    lastTraining: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    trainingHours: Math.floor(Math.random() * 40) + 10
  }));

  const upcomingDeadlines = [
    { course: "Safeguarding Fundamentals", staff: 8, dueDate: "2024-01-30", priority: "critical" },
    { course: "AE Medication Administration", staff: 12, dueDate: "2024-02-15", priority: "high" },
    { course: "Manual Handling Techniques", staff: 5, dueDate: "2024-03-01", priority: "medium" },
    { course: "AEGIS System Advanced", staff: 15, dueDate: "2024-02-28", priority: "medium" }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'critical': return 'destructive';
      case 'high': return 'warning';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const filteredCourses = trainingCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderCoursesView = () => (
    <div className="space-y-4">
      {filteredCourses.map((course, index) => (
        <motion.div
          key={course.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="aegis-glass-panel p-6 aegis-ceremonial-hover">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-lg font-semibold text-foreground">{course.title}</h4>
                  <Badge variant={getPriorityColor(course.priority)} size="sm">
                    {course.priority}
                  </Badge>
                  <Badge variant="outline" size="sm">
                    {course.category}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">
                  {course.description}
                </p>
                
                <div className="flex items-center gap-6 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    {course.enrolled} enrolled
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    Due: {course.dueDate}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-foreground">
                      {course.completed}/{course.enrolled} ({course.completionRate}%)
                    </span>
                  </div>
                  <Progress value={course.completionRate} className="h-2" />
                </div>
              </div>

              <div className="flex flex-col items-end gap-2 ml-6">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="aegis-ceremonial-hover">
                    <FileCheck className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <Button size="sm" className="aegis-ceremonial-hover">
                    <Play className="w-4 h-4 mr-2" />
                    Launch
                  </Button>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">
                    {course.completionRate}% Complete
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {course.enrolled - course.completed} pending
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );

  const renderStaffView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {staffTrainingProgress.slice(0, 9).map((staff, index) => (
        <motion.div
          key={staff.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="aegis-glass-panel p-4 aegis-ceremonial-hover">
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
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Compliance Score</span>
                <span className="font-medium text-foreground">{staff.complianceScore}%</span>
              </div>
              <Progress value={staff.complianceScore} className="h-2" />
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="text-center">
                  <div className="text-lg font-bold text-foreground">{staff.coursesCompleted}</div>
                  <div className="text-xs text-muted-foreground">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-foreground">{staff.trainingHours}h</div>
                  <div className="text-xs text-muted-foreground">Training Time</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <Badge 
                  variant={staff.complianceScore >= 90 ? 'success' : staff.complianceScore >= 70 ? 'warning' : 'destructive'} 
                  size="sm"
                >
                  {staff.complianceScore >= 90 ? 'Compliant' : staff.complianceScore >= 70 ? 'Needs Update' : 'Overdue'}
                </Badge>
                <Button variant="ghost" size="sm" className="h-7 px-2">
                  <Star className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );

  const renderComplianceView = () => (
    <div className="space-y-6">
      <Card className="aegis-glass-panel p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Upcoming Deadlines</h3>
        <div className="space-y-3">
          {upcomingDeadlines.map((deadline, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-card/50 border border-border/20"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded ${
                  deadline.priority === 'critical' ? 'bg-destructive/10 text-destructive' :
                  deadline.priority === 'high' ? 'bg-warning/10 text-warning' :
                  'bg-primary/10 text-primary'
                }`}>
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-medium text-foreground">{deadline.course}</div>
                  <div className="text-sm text-muted-foreground">
                    {deadline.staff} staff members • Due: {deadline.dueDate}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={getPriorityColor(deadline.priority)} size="sm">
                  {deadline.priority}
                </Badge>
                <Button variant="outline" size="sm" className="aegis-ceremonial-hover">
                  Remind All
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="aegis-glass-panel p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Training Categories</h3>
          <div className="space-y-3">
            {trainingCategories.map((category, index) => {
              const categoryProgress = Math.floor(Math.random() * 40) + 60;
              return (
                <motion.div
                  key={category}
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="font-medium text-foreground">{category}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-card rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${categoryProgress}%` }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                      />
                    </div>
                    <span className="text-sm font-medium text-foreground w-10">
                      {categoryProgress}%
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Card>

        <Card className="aegis-glass-panel p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Progress</h3>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">847</div>
              <div className="text-sm text-muted-foreground">Training Hours This Month</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 rounded-lg bg-success/5 border border-success/10">
                <div className="text-lg font-bold text-success">156</div>
                <div className="text-xs text-muted-foreground">Courses Completed</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-warning/5 border border-warning/10">
                <div className="text-lg font-bold text-warning">23</div>
                <div className="text-xs text-muted-foreground">In Progress</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
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
          Training & Development
        </h1>
        <p className="text-muted-foreground">
          Comprehensive staff training management and compliance tracking
        </p>
      </motion.div>

      <div className="space-y-6">
        {/* Training Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainingStats.map((stat, index) => (
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

        {/* Training Controls */}
        <Card className="aegis-glass-panel p-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Select value={viewMode} onValueChange={(value: 'courses' | 'staff' | 'compliance') => setViewMode(value)}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="courses">Training Courses</SelectItem>
                  <SelectItem value="staff">Staff Progress</SelectItem>
                  <SelectItem value="compliance">Compliance View</SelectItem>
                </SelectContent>
              </Select>
              
              {viewMode === 'courses' && (
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {trainingCategories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Input
                placeholder="Search training..."
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
                Add Course
              </Button>
            </div>
          </div>
        </Card>

        {/* Dynamic Content Based on View Mode */}
        <motion.div
          key={viewMode}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {viewMode === 'courses' && renderCoursesView()}
          {viewMode === 'staff' && renderStaffView()}
          {viewMode === 'compliance' && renderComplianceView()}
        </motion.div>
      </div>
    </div>
  );
}