import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Phone, Mail, MapPin, Calendar, Clock, Heart, AlertTriangle, CheckCircle, User, Pill, Activity } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Separator } from '../ui/separator';
import { mockClientProfiles } from '../../lib/expanded-mock-data';

interface ClientProfileProps {
  clientId: string;
  onBack: () => void;
}

export function ClientProfile({ clientId, onBack }: ClientProfileProps) {
  const client = mockClientProfiles.find(c => c.id === clientId);

  if (!client) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold text-foreground">Client Not Found</h2>
        <Button onClick={onBack} variant="outline" className="mt-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Client List
        </Button>
      </div>
    );
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'destructive';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
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
          Back to Healthcare
        </Button>
        <div className="h-6 w-px bg-border"></div>
        <h1 className="text-2xl font-bold text-foreground">Client Profile</h1>
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
                {client.initials}
              </div>
              <motion.div 
                className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-background ${
                  client.status === 'Stable' ? 'bg-success' : 'bg-warning'
                } healthcare-heartbeat heartbeat-vital`}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </motion.div>
            
            <div className="flex-1 space-y-3">
              <div>
                <h2 className="text-xl font-bold text-foreground">{client.name}</h2>
                <p className="text-muted-foreground">Age {client.age} • {client.room}</p>
              </div>
              
              <div className="flex items-center gap-4 flex-wrap">
                <Badge variant={client.statusColor} className="healthcare-heartbeat heartbeat-vital">
                  {client.status}
                </Badge>
                <Badge variant={getRiskColor(client.riskLevel)}>
                  {client.riskLevel} Risk
                </Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  Care Worker: {client.careWorker}
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <motion.div 
                  className="flex items-center gap-1 text-muted-foreground"
                  whileHover={{ x: 2 }}
                >
                  <MapPin className="w-4 h-4" />
                  {client.address}
                </motion.div>
                <motion.div 
                  className="flex items-center gap-1 text-muted-foreground"
                  whileHover={{ x: 2 }}
                >
                  <Heart className="w-4 h-4" />
                  NHS: {client.nhsNumber}
                </motion.div>
              </div>
            </div>

            <div className="text-right space-y-2">
              <div className="text-lg font-bold text-primary">{client.careLevel}</div>
              <div className="text-sm text-muted-foreground">Care Level</div>
              <div className="text-xs text-muted-foreground">
                Assessment: {client.lastAssessment}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Content */}
        <motion.div 
          className="lg:col-span-2 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Medications */}
          <Card className="aegis-glass-panel p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Pill className="w-5 h-5 text-primary" />
              Current Medications
            </h3>
            <div className="space-y-4">
              {client.medications.map((medication, index) => (
                <motion.div 
                  key={medication.name}
                  className="p-4 rounded-lg bg-card border border-border/50 aegis-ceremonial-hover"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="font-medium text-foreground">{medication.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {medication.dosage} • {medication.frequency}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Administration times: {medication.time}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Prescribed by: {medication.prescriber}
                      </div>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <div>Started: {medication.startDate}</div>
                      <div>Review: {medication.reviewDate}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Care Plan */}
          <Card className="aegis-glass-panel p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Care Plan Goals
            </h3>
            <div className="space-y-3">
              {client.carePlanGoals.map((goal, index) => (
                <motion.div
                  key={goal}
                  className="flex items-center gap-3 p-3 rounded-lg bg-success/5 border border-success/10"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span className="text-sm">{goal}</span>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Recent Notes */}
          <Card className="aegis-glass-panel p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Recent Care Notes
            </h3>
            <div className="space-y-4">
              {client.recentNotes.map((note, index) => (
                <motion.div 
                  key={note.date}
                  className="p-4 rounded-lg bg-card border border-border/50"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">{note.author}</span>
                    <span className="text-sm text-muted-foreground">{note.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{note.note}</p>
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
          {/* Emergency Contacts */}
          <Card className="aegis-glass-panel p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary" />
              Emergency Contacts
            </h3>
            <div className="space-y-4">
              <div>
                <div className="font-medium text-foreground">Next of Kin</div>
                <div className="text-sm text-muted-foreground">{client.nextOfKin}</div>
                <motion.div 
                  className="text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors mt-1"
                  whileHover={{ x: 2 }}
                >
                  📞 {client.nokPhone}
                </motion.div>
                <motion.div 
                  className="text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors"
                  whileHover={{ x: 2 }}
                >
                  ✉️ {client.nokEmail}
                </motion.div>
              </div>
              
              <Separator />
              
              <div>
                <div className="font-medium text-foreground">GP</div>
                <div className="text-sm text-muted-foreground">{client.gp}</div>
                <motion.div 
                  className="text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors mt-1"
                  whileHover={{ x: 2 }}
                >
                  📞 {client.gpPhone}
                </motion.div>
              </div>
            </div>
          </Card>

          {/* Care Requirements */}
          <Card className="aegis-glass-panel p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary" />
              Care Requirements
            </h3>
            <div className="space-y-3">
              {client.careNeeds.map((need, index) => (
                <motion.div
                  key={need}
                  className="p-2 rounded bg-primary/5 border border-primary/10 text-sm"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  {need}
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Allergies & Dietary */}
          <Card className="aegis-glass-panel p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Allergies & Diet
            </h3>
            <div className="space-y-4">
              <div>
                <div className="font-medium text-foreground mb-2">Allergies</div>
                <div className="space-y-1">
                  {client.allergies.map((allergy, index) => (
                    <motion.div
                      key={allergy}
                      className="p-2 rounded bg-destructive/10 border border-destructive/20 text-sm text-destructive"
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                    >
                      ⚠️ {allergy}
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="font-medium text-foreground mb-2">Dietary Requirements</div>
                <div className="space-y-1">
                  {client.dietaryRequirements.map((req, index) => (
                    <motion.div
                      key={req}
                      className="p-2 rounded bg-success/10 border border-success/20 text-sm text-success"
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                    >
                      🍽️ {req}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Assessment Schedule */}
          <Card className="aegis-glass-panel p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Assessment Schedule
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Last Assessment</span>
                <span className="text-sm font-medium">{client.lastAssessment}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Next Assessment</span>
                <Badge variant="warning" size="sm">{client.nextAssessment}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Risk Level</span>
                <Badge variant={getRiskColor(client.riskLevel)} size="sm">
                  {client.riskLevel}
                </Badge>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}