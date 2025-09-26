import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ClipboardList, Brain, Heart, Eye, Ear, Activity, TrendingUp,
  CheckCircle, AlertTriangle, Clock, User, Calendar, FileText,
  Target, Award, ChevronRight, Plus, Settings, Download, Upload,
  Search, Filter, Star, Shield, Zap, BarChart3, Users, Bell,
  Stethoscope, Thermometer, Headphones, Video, MessageSquare,
  Camera, Mic, MapPin, Navigation, Compass, Smartphone
} from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { mockClientProfiles } from '../../lib/expanded-mock-data';
import { toast } from 'sonner@2.0.3';

interface AssessmentData {
  id: string;
  clientId: string;
  assessmentType: string;
  assessor: string;
  dateCompleted: Date;
  status: 'draft' | 'completed' | 'reviewed' | 'expired';
  scores: Record<string, number>;
  recommendations: string[];
  nextReview: Date;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

interface AdvancedClinicalAssessmentsProps {
  selectedClient?: string;
  onClientChange?: (clientId: string) => void;
}

export function AdvancedClinicalAssessments({ selectedClient, onClientChange }: AdvancedClinicalAssessmentsProps) {
  const [activeAssessment, setActiveAssessment] = useState<string>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [assessmentData, setAssessmentData] = useState<AssessmentData[]>([]);
  const [isCreatingAssessment, setIsCreatingAssessment] = useState(false);
  const [selectedAssessmentType, setSelectedAssessmentType] = useState('');

  // Enhanced assessment types with AI-powered analysis
  const assessmentTypes = [
    {
      id: 'barthel-index',
      name: 'Barthel Index',
      description: 'Activities of Daily Living Assessment',
      category: 'Functional',
      icon: Activity,
      color: 'primary',
      duration: '15-20 min',
      frequency: 'Monthly',
      aiEnabled: true
    },
    {
      id: 'mmse',
      name: 'Mini-Mental State Exam',
      description: 'Cognitive function assessment',
      category: 'Cognitive',
      icon: Brain,
      color: 'secondary',
      duration: '10-15 min',
      frequency: 'Quarterly',
      aiEnabled: true
    },
    {
      id: 'waterlow',
      name: 'Waterlow Score',
      description: 'Pressure ulcer risk assessment',
      category: 'Clinical Risk',
      icon: Shield,
      color: 'warning',
      duration: '5-10 min',
      frequency: 'Weekly',
      aiEnabled: true
    },
    {
      id: 'news2',
      name: 'NEWS2 Score',
      description: 'National Early Warning Score',
      category: 'Vital Signs',
      icon: TrendingUp,
      color: 'destructive',
      duration: '5 min',
      frequency: 'Daily',
      aiEnabled: true
    },
    {
      id: 'morse-falls',
      name: 'Morse Falls Scale',
      description: 'Fall risk assessment',
      category: 'Safety',
      icon: AlertTriangle,
      color: 'warning',
      duration: '5-10 min',
      frequency: 'Monthly',
      aiEnabled: true
    },
    {
      id: 'phq9',
      name: 'PHQ-9',
      description: 'Depression screening tool',
      category: 'Mental Health',
      icon: Heart,
      color: 'secondary',
      duration: '5-10 min',
      frequency: 'Quarterly',
      aiEnabled: true
    },
    {
      id: 'gad7',
      name: 'GAD-7',
      description: 'Generalized Anxiety Disorder assessment',
      category: 'Mental Health',
      icon: Heart,
      color: 'secondary',
      duration: '5-10 min',
      frequency: 'Quarterly',
      aiEnabled: true
    },
    {
      id: 'pain-scale',
      name: 'Comprehensive Pain Assessment',
      description: 'Multi-dimensional pain evaluation',
      category: 'Comfort',
      icon: Stethoscope,
      color: 'destructive',
      duration: '10-15 min',
      frequency: 'Weekly',
      aiEnabled: true
    }
  ];

  // Generate sample assessment data
  useEffect(() => {
    const sampleData: AssessmentData[] = [];
    mockClientProfiles.forEach(client => {
      assessmentTypes.forEach((type, index) => {
        sampleData.push({
          id: `assessment_${client.id}_${type.id}`,
          clientId: client.id,
          assessmentType: type.name,
          assessor: `Staff Member ${index + 1}`,
          dateCompleted: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
          status: ['completed', 'reviewed', 'draft'][Math.floor(Math.random() * 3)] as any,
          scores: {
            total: Math.floor(Math.random() * 100),
            risk: Math.floor(Math.random() * 10)
          },
          recommendations: [
            'Continue current care plan',
            'Increase monitoring frequency',
            'Review medication regimen'
          ].slice(0, Math.floor(Math.random() * 3) + 1),
          nextReview: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000),
          priority: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as any
        });
      });
    });
    setAssessmentData(sampleData);
  }, []);

  const renderAssessmentOverview = () => (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Assessment Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Assessments", value: assessmentData.filter(a => a.status !== 'expired').length.toString(), icon: ClipboardList, trend: "+12" },
          { label: "Due This Week", value: "23", icon: Clock, trend: "+5" },
          { label: "High Priority", value: assessmentData.filter(a => a.priority === 'high').length.toString(), icon: AlertTriangle, trend: "-2" },
          { label: "AI Insights", value: "47", icon: Brain, trend: "+8" }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              className="p-4 transition-all duration-500 ease-in-out aegis-ceremonial-hover cursor-pointer"
              style={{
                background: 'rgba(18, 22, 28, 0.6)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: '12px',
                boxShadow: 'inset 0 1px 0 rgba(212, 175, 55, 0.2), 0 4px 16px rgba(0, 0, 0, 0.4)',
                backdropFilter: 'none'
              }}
              onClick={() => toast.info(`Viewing ${stat.label} details`)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-foreground">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
                <Badge variant="secondary" size="sm" className="text-xs">
                  {stat.trend}
                </Badge>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Assessment Types Grid */}
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
          <div className="flex items-center gap-3">
            <ClipboardList className="w-6 h-6 text-primary" />
            <div>
              <h3 className="text-lg font-semibold text-foreground">Clinical Assessment Tools</h3>
              <p className="text-sm text-muted-foreground">AI-enhanced standardized assessment instruments</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="aegis-ceremonial-hover">
              <Settings className="w-4 h-4 mr-2" />
              Configure
            </Button>
            <Button size="sm" className="aegis-ceremonial-hover" onClick={() => setIsCreatingAssessment(true)}>
              <Plus className="w-4 h-4 mr-2" />
              New Assessment
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {assessmentTypes.map((assessment, index) => (
            <motion.div
              key={assessment.id}
              className="p-4 rounded-lg aegis-ceremonial-hover cursor-pointer"
              style={{
                background: 'rgba(212, 175, 55, 0.05)',
                border: '1px solid rgba(212, 175, 55, 0.15)',
                backdropFilter: 'none'
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setActiveAssessment(assessment.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <assessment.icon className={`w-6 h-6 text-${assessment.color}`} />
                <div className="flex items-center gap-1">
                  {assessment.aiEnabled && (
                    <Badge variant="secondary" size="sm" className="text-xs">
                      <Brain className="w-3 h-3 mr-1" />
                      AI
                    </Badge>
                  )}
                  <Badge variant={assessment.color as any} size="sm" className="text-xs">
                    {assessment.category}
                  </Badge>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-foreground">{assessment.name}</h4>
                <p className="text-xs text-muted-foreground">{assessment.description}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {assessment.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {assessment.frequency}
                    </div>
                  </div>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Recent Assessments */}
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
          <h3 className="text-lg font-semibold text-foreground">Recent Assessment Results</h3>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search assessments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-48"
            />
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Functional">Functional</SelectItem>
                <SelectItem value="Cognitive">Cognitive</SelectItem>
                <SelectItem value="Clinical Risk">Clinical Risk</SelectItem>
                <SelectItem value="Mental Health">Mental Health</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <ScrollArea className="h-96">
          <div className="space-y-3">
            {assessmentData
              .filter(assessment => 
                assessment.assessmentType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                mockClientProfiles.find(c => c.id === assessment.clientId)?.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .slice(0, 10)
              .map((assessment, index) => {
                const client = mockClientProfiles.find(c => c.id === assessment.clientId);
                const assessmentType = assessmentTypes.find(t => t.name === assessment.assessmentType);
                
                return (
                  <motion.div
                    key={assessment.id}
                    className="flex items-center justify-between p-4 rounded-lg aegis-ceremonial-hover cursor-pointer"
                    style={{
                      background: 'rgba(212, 175, 55, 0.03)',
                      border: '1px solid rgba(212, 175, 55, 0.08)',
                      backdropFilter: 'none'
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => toast.info(`Opening assessment for ${client?.name}`)}
                  >
                    <div className="flex items-center gap-4">
                      {assessmentType && (
                        <assessmentType.icon className={`w-5 h-5 text-${assessmentType.color}`} />
                      )}
                      <div>
                        <div className="font-medium text-sm text-foreground">{client?.name}</div>
                        <div className="text-xs text-muted-foreground">{assessment.assessmentType}</div>
                        <div className="text-xs text-muted-foreground">
                          Completed by {assessment.assessor} • {assessment.dateCompleted.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-sm font-medium text-foreground">{assessment.scores.total}</div>
                        <div className="text-xs text-muted-foreground">Score</div>
                      </div>
                      <Badge 
                        variant={
                          assessment.status === 'completed' ? 'default' :
                          assessment.status === 'reviewed' ? 'secondary' :
                          assessment.status === 'draft' ? 'warning' : 'destructive'
                        } 
                        size="sm"
                      >
                        {assessment.status}
                      </Badge>
                      <Badge 
                        variant={
                          assessment.priority === 'urgent' ? 'destructive' :
                          assessment.priority === 'high' ? 'warning' :
                          'secondary'
                        } 
                        size="sm"
                      >
                        {assessment.priority}
                      </Badge>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </motion.div>
                );
              })}
          </div>
        </ScrollArea>
      </Card>
    </motion.div>
  );

  const renderAssessmentForm = (assessmentType: string) => {
    const assessment = assessmentTypes.find(a => a.id === assessmentType);
    if (!assessment) return null;

    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setActiveAssessment('overview')}
            className="aegis-ceremonial-hover"
          >
            ← Back to Overview
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <div className="flex items-center gap-3">
            <assessment.icon className={`w-6 h-6 text-${assessment.color}`} />
            <div>
              <h2 className="text-xl font-bold text-foreground">{assessment.name}</h2>
              <p className="text-sm text-muted-foreground">{assessment.description}</p>
            </div>
          </div>
        </div>

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
          <div className="space-y-6">
            {/* Client Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-foreground">Select Client</Label>
              <Select value={selectedClient} onValueChange={onClientChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a client..." />
                </SelectTrigger>
                <SelectContent>
                  {mockClientProfiles.map(client => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name} - {client.room}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* AI-Powered Pre-Assessment Analysis */}
            {assessment.aiEnabled && selectedClient && (
              <div 
                className="p-4 rounded-lg"
                style={{
                  background: 'rgba(59, 130, 246, 0.1)',
                  border: '1px solid rgba(59, 130, 246, 0.2)'
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Brain className="w-5 h-5 text-blue-500" />
                  <span className="font-medium text-sm text-foreground">AI Pre-Assessment Analysis</span>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Previous assessment scores show improving trend (+12% over 3 months)</p>
                  <p>• Recommend focusing on mobility and cognitive sections</p>
                  <p>• Consider environmental factors based on recent incident reports</p>
                </div>
              </div>
            )}

            {/* Dynamic Assessment Form based on type */}
            <div className="space-y-6">
              {assessment.id === 'barthel-index' && renderBarthelIndexForm()}
              {assessment.id === 'mmse' && renderMMSEForm()}
              {assessment.id === 'waterlow' && renderWaterlowForm()}
              {assessment.id === 'news2' && renderNEWS2Form()}
              {assessment.id === 'morse-falls' && renderMorseFallsForm()}
              {assessment.id === 'phq9' && renderPHQ9Form()}
              {assessment.id === 'gad7' && renderGAD7Form()}
              {assessment.id === 'pain-scale' && renderPainScaleForm()}
            </div>

            {/* Assessment Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-border/20">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="aegis-ceremonial-hover">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm" className="aegis-ceremonial-hover">
                  <Upload className="w-4 h-4 mr-2" />
                  Import Data
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="aegis-ceremonial-hover">
                  Save Draft
                </Button>
                <Button className="aegis-ceremonial-hover">
                  Complete Assessment
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  };

  // Sample assessment forms (simplified for demo)
  const renderBarthelIndexForm = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Activities of Daily Living</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          'Feeding', 'Bathing', 'Grooming', 'Dressing', 'Bowels', 'Bladder',
          'Toilet Use', 'Transfers', 'Mobility', 'Stairs'
        ].map((activity, index) => (
          <div key={activity} className="space-y-3">
            <Label className="text-sm font-medium text-foreground">{activity}</Label>
            <RadioGroup defaultValue="0">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="0" id={`${activity}-0`} />
                <Label htmlFor={`${activity}-0`} className="text-sm">Unable (0)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="5" id={`${activity}-5`} />
                <Label htmlFor={`${activity}-5`} className="text-sm">Needs help (5)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="10" id={`${activity}-10`} />
                <Label htmlFor={`${activity}-10`} className="text-sm">Independent (10)</Label>
              </div>
            </RadioGroup>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMMSEForm = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Mini-Mental State Examination</h3>
      <div className="space-y-4">
        {[
          { section: 'Orientation to Time', maxScore: 5 },
          { section: 'Orientation to Place', maxScore: 5 },
          { section: 'Registration', maxScore: 3 },
          { section: 'Attention and Calculation', maxScore: 5 },
          { section: 'Recall', maxScore: 3 },
          { section: 'Language', maxScore: 9 }
        ].map((section, index) => (
          <div key={section.section} className="flex items-center justify-between p-4 rounded-lg"
               style={{ background: 'rgba(212, 175, 55, 0.05)', border: '1px solid rgba(212, 175, 55, 0.1)' }}>
            <div>
              <Label className="text-sm font-medium text-foreground">{section.section}</Label>
              <p className="text-xs text-muted-foreground">Max score: {section.maxScore}</p>
            </div>
            <Input 
              type="number" 
              min="0" 
              max={section.maxScore} 
              className="w-20" 
              placeholder="0"
            />
          </div>
        ))}
      </div>
    </div>
  );

  const renderWaterlowForm = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Waterlow Pressure Sore Risk Assessment</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { factor: 'Build/Weight for Height', options: ['Average', 'Above Average', 'Obese', 'Below Average'] },
          { factor: 'Continence', options: ['Complete', 'Occasional Incontinence', 'Catheter/Incontinence', 'Doubly Incontinent'] },
          { factor: 'Skin Type Visual Risk Areas', options: ['Healthy', 'Tissue Paper', 'Dry', 'Oedematous'] },
          { factor: 'Mobility', options: ['Fully', 'Restless/Fidgety', 'Apathetic', 'Restricted', 'Inert/Traction'] }
        ].map((factor, index) => (
          <div key={factor.factor} className="space-y-3">
            <Label className="text-sm font-medium text-foreground">{factor.factor}</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                {factor.options.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNEWS2Form = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">National Early Warning Score 2</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { parameter: 'Respiration Rate', unit: '/min', range: '12-20' },
          { parameter: 'SpO2 Scale 1', unit: '%', range: '96-100' },
          { parameter: 'Air or Oxygen', unit: '', range: 'Air/O2' },
          { parameter: 'Systolic BP', unit: 'mmHg', range: '111-219' },
          { parameter: 'Pulse', unit: '/min', range: '51-90' },
          { parameter: 'Consciousness', unit: '', range: 'Alert/CVPU' },
          { parameter: 'Temperature', unit: '°C', range: '36.1-38.0' }
        ].map((param, index) => (
          <div key={param.parameter} className="space-y-3">
            <Label className="text-sm font-medium text-foreground">{param.parameter}</Label>
            <div className="flex items-center gap-2">
              <Input 
                type={param.parameter === 'Consciousness' || param.parameter === 'Air or Oxygen' ? 'text' : 'number'}
                placeholder={param.range}
                className="flex-1"
              />
              {param.unit && <span className="text-xs text-muted-foreground">{param.unit}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMorseFallsForm = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Morse Fall Scale</h3>
      <div className="space-y-4">
        {[
          { factor: 'History of falling', scores: { 'No': 0, 'Yes': 25 } },
          { factor: 'Secondary diagnosis', scores: { 'No': 0, 'Yes': 15 } },
          { factor: 'Ambulatory aid', scores: { 'None/bed rest/nurse assist': 0, 'Crutches/cane/walker': 15, 'Furniture': 30 } },
          { factor: 'IV/Heparin Lock', scores: { 'No': 0, 'Yes': 20 } },
          { factor: 'Gait/Transferring', scores: { 'Normal/bed rest/immobile': 0, 'Weak': 10, 'Impaired': 20 } },
          { factor: 'Mental status', scores: { 'Oriented to own ability': 0, 'Forgets limitations': 15 } }
        ].map((factor, index) => (
          <div key={factor.factor} 
               className="p-4 rounded-lg"
               style={{ background: 'rgba(212, 175, 55, 0.05)', border: '1px solid rgba(212, 175, 55, 0.1)' }}>
            <Label className="text-sm font-medium text-foreground mb-3 block">{factor.factor}</Label>
            <RadioGroup>
              {Object.entries(factor.scores).map(([option, score]) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`${factor.factor}-${option}`} />
                  <Label htmlFor={`${factor.factor}-${option}`} className="text-sm">
                    {option} ({score} points)
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPHQ9Form = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Patient Health Questionnaire-9</h3>
      <p className="text-sm text-muted-foreground">
        Over the last 2 weeks, how often have you been bothered by any of the following problems?
      </p>
      <div className="space-y-4">
        {[
          'Little interest or pleasure in doing things',
          'Feeling down, depressed, or hopeless',
          'Trouble falling or staying asleep, or sleeping too much',
          'Feeling tired or having little energy',
          'Poor appetite or overeating',
          'Feeling bad about yourself',
          'Trouble concentrating on things',
          'Moving or speaking slowly or being restless',
          'Thoughts that you would be better off dead'
        ].map((question, index) => (
          <div key={index} 
               className="p-4 rounded-lg"
               style={{ background: 'rgba(212, 175, 55, 0.05)', border: '1px solid rgba(212, 175, 55, 0.1)' }}>
            <Label className="text-sm font-medium text-foreground mb-3 block">{question}</Label>
            <RadioGroup className="flex gap-4">
              {[
                { label: 'Not at all', value: '0' },
                { label: 'Several days', value: '1' },
                { label: 'More than half the days', value: '2' },
                { label: 'Nearly every day', value: '3' }
              ].map(option => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`q${index}-${option.value}`} />
                  <Label htmlFor={`q${index}-${option.value}`} className="text-sm">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGAD7Form = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Generalized Anxiety Disorder 7</h3>
      <p className="text-sm text-muted-foreground">
        Over the last 2 weeks, how often have you been bothered by the following problems?
      </p>
      <div className="space-y-4">
        {[
          'Feeling nervous, anxious or on edge',
          'Not being able to stop or control worrying',
          'Worrying too much about different things',
          'Trouble relaxing',
          'Being so restless that it is hard to sit still',
          'Becoming easily annoyed or irritable',
          'Feeling afraid as if something awful might happen'
        ].map((question, index) => (
          <div key={index} 
               className="p-4 rounded-lg"
               style={{ background: 'rgba(212, 175, 55, 0.05)', border: '1px solid rgba(212, 175, 55, 0.1)' }}>
            <Label className="text-sm font-medium text-foreground mb-3 block">{question}</Label>
            <RadioGroup className="flex gap-4">
              {[
                { label: 'Not at all', value: '0' },
                { label: 'Several days', value: '1' },
                { label: 'More than half the days', value: '2' },
                { label: 'Nearly every day', value: '3' }
              ].map(option => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`gad${index}-${option.value}`} />
                  <Label htmlFor={`gad${index}-${option.value}`} className="text-sm">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPainScaleForm = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Comprehensive Pain Assessment</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-3">
            <Label className="text-sm font-medium text-foreground">Pain Intensity (0-10)</Label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">0</span>
              <Input type="range" min="0" max="10" className="flex-1" />
              <span className="text-sm text-muted-foreground">10</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <Label className="text-sm font-medium text-foreground">Pain Location</Label>
            <Textarea placeholder="Describe location of pain..." rows={3} />
          </div>
          
          <div className="space-y-3">
            <Label className="text-sm font-medium text-foreground">Pain Quality</Label>
            <div className="grid grid-cols-2 gap-2">
              {['Sharp', 'Dull', 'Burning', 'Aching', 'Stabbing', 'Throbbing'].map(quality => (
                <div key={quality} className="flex items-center space-x-2">
                  <Checkbox id={quality} />
                  <Label htmlFor={quality} className="text-sm">{quality}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-3">
            <Label className="text-sm font-medium text-foreground">Aggravating Factors</Label>
            <Textarea placeholder="What makes the pain worse?" rows={3} />
          </div>
          
          <div className="space-y-3">
            <Label className="text-sm font-medium text-foreground">Relieving Factors</Label>
            <Textarea placeholder="What helps relieve the pain?" rows={3} />
          </div>
          
          <div className="space-y-3">
            <Label className="text-sm font-medium text-foreground">Impact on Daily Activities</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select impact level..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No impact</SelectItem>
                <SelectItem value="mild">Mild impact</SelectItem>
                <SelectItem value="moderate">Moderate impact</SelectItem>
                <SelectItem value="severe">Severe impact</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2 aegis-text-enhanced">
            Advanced Clinical Assessments
          </h1>
          <p className="text-muted-foreground aegis-text-secondary">
            AI-enhanced standardized assessment tools for comprehensive patient evaluation
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="aegis-ceremonial-hover">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </Button>
          <Button size="sm" className="aegis-ceremonial-hover">
            <Plus className="w-4 h-4 mr-2" />
            Quick Assessment
          </Button>
        </div>
      </motion.div>

      <Tabs value={activeAssessment} onValueChange={setActiveAssessment} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-9 gap-1">
          <TabsTrigger value="overview" className="aegis-tab-text">Overview</TabsTrigger>
          <TabsTrigger value="barthel-index" className="aegis-tab-text">Barthel</TabsTrigger>
          <TabsTrigger value="mmse" className="aegis-tab-text">MMSE</TabsTrigger>
          <TabsTrigger value="waterlow" className="aegis-tab-text">Waterlow</TabsTrigger>
          <TabsTrigger value="news2" className="aegis-tab-text">NEWS2</TabsTrigger>
          <TabsTrigger value="morse-falls" className="aegis-tab-text">Falls</TabsTrigger>
          <TabsTrigger value="phq9" className="aegis-tab-text">PHQ-9</TabsTrigger>
          <TabsTrigger value="gad7" className="aegis-tab-text">GAD-7</TabsTrigger>
          <TabsTrigger value="pain-scale" className="aegis-tab-text">Pain</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          {renderAssessmentOverview()}
        </TabsContent>

        {assessmentTypes.map(assessment => (
          <TabsContent key={assessment.id} value={assessment.id} className="mt-6">
            {renderAssessmentForm(assessment.id)}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}