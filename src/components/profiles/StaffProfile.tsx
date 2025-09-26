import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Phone, Mail, MapPin, Calendar, Clock, Award, AlertTriangle, CheckCircle, Users, TrendingUp } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';
import { mockStaffProfiles } from '../../lib/expanded-mock-data';

interface StaffProfileProps {
  staffId: string;
  onBack: () => void;
}

export function StaffProfile({ staffId, onBack }: StaffProfileProps) {
  const staff = mockStaffProfiles.find(s => s.id === staffId);

  if (!staff) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold text-foreground">Staff Member Not Found</h2>
        <Button onClick={onBack} variant="outline" className="mt-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Staff List
        </Button>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    return status === 'On Duty' ? 'success' : 'secondary';
  };

  const getTrainingStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'overdue': return 'destructive';
      case 'required': return 'warning';
      default: return 'secondary';
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-background p-6 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Header */}
      <motion.div 
        className="flex items-center gap-4 mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Button onClick={onBack} variant="outline" size="sm" className="aegis-ceremonial-hover">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Workforce
        </Button>
        <div className="h-6 w-px bg-border"></div>
        <h1 className="text-2xl font-bold text-foreground">Staff Profile</h1>
      </motion.div>

      {/* Profile Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="aegis-glass-panel p-6">
          <div className="flex items-start gap-6">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary border-2 border-primary/20">
                {staff.initials}
              </div>
              <motion.div 
                className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-background ${
                  staff.status === 'On Duty' ? 'bg-success' : 'bg-secondary'
                }`}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </motion.div>
            
            <div className="flex-1 space-y-3">
              <div>
                <h2 className="text-xl font-bold text-foreground">{staff.name}</h2>
                <p className="text-muted-foreground">{staff.role}</p>
              </div>
              
              <div className="flex items-center gap-4 flex-wrap">
                <Badge variant={getStatusColor(staff.status)} className="healthcare-heartbeat heartbeat-vital">
                  {staff.status}
                </Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  Started {staff.startDate}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  Next: {staff.nextShift}
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <motion.div 
                  className="flex items-center gap-1 text-muted-foreground hover:text-primary cursor-pointer transition-colors"
                  whileHover={{ x: 2 }}
                >
                  <Phone className="w-4 h-4" />
                  {staff.mobile}
                </motion.div>
                <motion.div 
                  className="flex items-center gap-1 text-muted-foreground hover:text-primary cursor-pointer transition-colors"
                  whileHover={{ x: 2 }}
                >
                  <Mail className="w-4 h-4" />
                  {staff.email}
                </motion.div>
                <motion.div 
                  className="flex items-center gap-1 text-muted-foreground"
                  whileHover={{ x: 2 }}
                >
                  <MapPin className="w-4 h-4" />
                  {staff.travelMethod}
                </motion.div>
              </div>
            </div>

            <div className="text-right space-y-2">
              <div className="text-2xl font-bold text-primary">{staff.performance.rating}/5.0</div>
              <div className="text-sm text-muted-foreground">Performance Rating</div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-success" />
                <span className="text-sm text-success">Excellent</span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Hours & Schedule */}
        <motion.div 
          className="lg:col-span-2 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Hours Summary */}
          <Card className="aegis-glass-panel p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Hours Summary
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <motion.div 
                className="text-center p-4 rounded-lg bg-primary/5 border border-primary/10"
                whileHover={{ scale: 1.02, backgroundColor: "rgba(212, 175, 55, 0.1)" }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-2xl font-bold text-primary">{staff.hoursThisWeek}</div>
                <div className="text-sm text-muted-foreground">This Week</div>
              </motion.div>
              <motion.div 
                className="text-center p-4 rounded-lg bg-success/5 border border-success/10"
                whileHover={{ scale: 1.02, backgroundColor: "rgba(22, 163, 74, 0.1)" }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-2xl font-bold text-success">{staff.hoursThisMonth}</div>
                <div className="text-sm text-muted-foreground">This Month</div>
              </motion.div>
              <motion.div 
                className="text-center p-4 rounded-lg bg-cyan/5 border border-cyan/10"
                whileHover={{ scale: 1.02, backgroundColor: "rgba(58, 174, 216, 0.1)" }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-2xl font-bold text-cyan">{staff.hoursYearToDate}</div>
                <div className="text-sm text-muted-foreground">Year to Date</div>
              </motion.div>
            </div>
          </Card>

          {/* Weekly Schedule */}
          <Card className="aegis-glass-panel p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Weekly Schedule
            </h3>
            <div className="space-y-3">
              {staff.weekSchedule.map((day, index) => (
                <motion.div 
                  key={day.day}
                  className="flex items-center justify-between p-3 rounded-lg bg-card border border-border/50 aegis-ceremonial-hover"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-20 font-medium text-foreground">{day.day}</div>
                    <div className="text-muted-foreground">{day.shift || 'Off'}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    {day.location && (
                      <div className="text-sm text-muted-foreground">{day.location}</div>
                    )}
                    <Badge variant={day.hours > 0 ? "default" : "secondary"}>
                      {day.hours}h
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Sidebar */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          {/* Performance Metrics */}
          <Card className="aegis-glass-panel p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Performance
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Reliability</span>
                  <span className="font-medium">{staff.performance.reliability}%</span>
                </div>
                <Progress value={staff.performance.reliability} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Client Satisfaction</span>
                  <span className="font-medium">{staff.performance.clientSatisfaction}%</span>
                </div>
                <Progress value={staff.performance.clientSatisfaction} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Team Feedback</span>
                  <span className="font-medium">{staff.performance.teamFeedback}/5.0</span>
                </div>
                <Progress value={(staff.performance.teamFeedback / 5) * 100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Punctuality</span>
                  <span className="font-medium">{staff.performance.punctuality}%</span>
                </div>
                <Progress value={staff.performance.punctuality} className="h-2" />
              </div>
            </div>
          </Card>

          {/* Training Status */}
          <Card className="aegis-glass-panel p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Training Status
            </h3>
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Completed</span>
                <Badge variant="success">{staff.training.completed}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Required</span>
                <Badge variant="warning">{staff.training.required}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Overdue</span>
                <Badge variant="destructive">{staff.training.overdue}</Badge>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-3">
              {staff.training.modules.map((module, index) => (
                <motion.div 
                  key={module.name}
                  className="flex items-center justify-between p-2 rounded bg-card/50"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <div className="flex items-center gap-2">
                    {module.status === 'completed' && <CheckCircle className="w-4 h-4 text-success" />}
                    {module.status === 'overdue' && <AlertTriangle className="w-4 h-4 text-destructive" />}
                    {module.status === 'required' && <Clock className="w-4 h-4 text-warning" />}
                    <span className="text-sm font-medium">{module.name.replace('AE ', '')}</span>
                  </div>
                  <Badge variant={getTrainingStatusColor(module.status)} size="sm">
                    {module.status}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Certifications */}
          <Card className="aegis-glass-panel p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Certifications
            </h3>
            <div className="space-y-2">
              {staff.certifications.map((cert, index) => (
                <motion.div
                  key={cert}
                  className="flex items-center gap-2 p-2 rounded bg-success/5 border border-success/10"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm">{cert}</span>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Regions */}
          <Card className="aegis-glass-panel p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Assigned Regions
            </h3>
            <div className="space-y-2">
              {staff.regions.map((region, index) => (
                <motion.div
                  key={region}
                  className="p-2 rounded bg-primary/5 border border-primary/10 text-sm"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  {region}
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}