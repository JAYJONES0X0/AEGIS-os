import React, { useState } from 'react';
import { 
  AlertTriangle, Heart, Users, DollarSign, Award, Bot,
  ArrowRight, CheckCircle, Play, RotateCcw
} from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { InventoryReorderWorkflow } from '../workflows/InventoryReorderWorkflow';

interface CriticalFlowsDemoProps {
  className?: string;
}

export function CriticalFlowsDemo({ className }: CriticalFlowsDemoProps) {
  const [activeFlow, setActiveFlow] = useState<string | null>(null);
  
  const criticalFlows = [
    {
      id: 'incident-safeguarding',
      title: 'Command → Incident Management',
      description: 'Alert → View → Raise Safeguarding → Action Plan',
      icon: AlertTriangle,
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20',
      steps: ['Alert Triggered', 'Incident Review', 'Safeguarding Raised', 'Action Plan Created'],
      status: 'demo-ready'
    },
    {
      id: 'emar-medication',
      title: 'Healthcare → eMAR Round',
      description: 'Round due → Scan (mock) → Sign → Witness',
      icon: Heart,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      steps: ['Round Due', 'Medication Scan', 'Digital Signature', 'Witness Confirmation'],
      status: 'demo-ready'
    },
    {
      id: 'rota-vacancy',
      title: 'Workforce → Rota Management',
      description: 'Fill vacancy → Compliance OK → Notify staff',
      icon: Users,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
      steps: ['Vacancy Identified', 'Staff Available', 'Compliance Check', 'Staff Notified'],
      status: 'demo-ready'
    },
    {
      id: 'inventory-reorder',
      title: 'Finance → AE Inventory',
      description: 'Low stock alert → Reorder Proposal → Create PO',
      icon: DollarSign,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20',
      steps: ['Stock Alert', 'AI Analysis', 'Reorder Proposal', 'Purchase Order'],
      status: 'live-demo'
    },
    {
      id: 'quality-audit',
      title: 'Quality → Audit Process',
      description: 'Due audit → Checklist → Evidence attach → Close',
      icon: Award,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      steps: ['Audit Due', 'Checklist Review', 'Evidence Collection', 'Audit Closure'],
      status: 'demo-ready'
    },
    {
      id: 'ai-budget-analysis',
      title: 'AI Hub → Budget Analysis',
      description: 'Ask AEGIS Finance → "Why budget variance +7%?" → Show breakdown',
      icon: Bot,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20',
      steps: ['AI Query', 'Data Analysis', 'Variance Breakdown', 'Recommendations'],
      status: 'demo-ready'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'live-demo':
        return <Badge className="bg-green-500/20 text-green-400">Live Demo</Badge>;
      case 'demo-ready':
        return <Badge variant="secondary">Demo Ready</Badge>;
      default:
        return <Badge variant="outline">Coming Soon</Badge>;
    }
  };

  const resetDemo = () => {
    setActiveFlow(null);
  };

  if (activeFlow === 'inventory-reorder') {
    return (
      <div className={className}>
        <div className="mb-6 flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={resetDemo}
            className="gap-2"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Demo Selection
          </Button>
          <Button 
            variant="outline" 
            onClick={resetDemo}
            className="gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Demo
          </Button>
        </div>
        
        <InventoryReorderWorkflow onComplete={resetDemo} />
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Demo Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
            <Play className="w-6 h-6 text-primary" />
          </div>
          Critical Flows Demo
        </h2>
        <p className="text-sm text-muted-foreground">
          Interactive demonstration of 6 key workflows across AEGIS domains
        </p>
      </div>

      {/* Flow Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {criticalFlows.map((flow) => {
          const IconComponent = flow.icon;
          
          return (
            <Card 
              key={flow.id} 
              className={`aegis-card-glass p-6 cursor-pointer transition-all hover:scale-105 ${flow.bgColor} ${flow.borderColor} border`}
              onClick={() => flow.status === 'live-demo' ? setActiveFlow(flow.id) : null}
            >
              <div className="space-y-4">
                {/* Flow Header */}
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-lg ${flow.bgColor}`}>
                    <IconComponent className={`w-6 h-6 ${flow.color}`} />
                  </div>
                  {getStatusBadge(flow.status)}
                </div>
                
                {/* Flow Info */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">{flow.title}</h3>
                  <p className="text-sm text-muted-foreground">{flow.description}</p>
                </div>
                
                {/* Flow Steps */}
                <div className="space-y-2">
                  <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Workflow Steps
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {flow.steps.map((step, index) => (
                      <div key={index} className="flex items-center">
                        <span className="text-xs bg-card/50 px-2 py-1 rounded">
                          {step}
                        </span>
                        {index < flow.steps.length - 1 && (
                          <ArrowRight className="w-3 h-3 text-muted-foreground mx-1" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Action Button */}
                <Button 
                  variant={flow.status === 'live-demo' ? 'default' : 'outline'}
                  size="sm" 
                  className="w-full"
                  disabled={flow.status !== 'live-demo'}
                >
                  {flow.status === 'live-demo' ? (
                    <div className="flex items-center gap-2">
                      <Play className="w-4 h-4" />
                      Start Demo
                    </div>
                  ) : (
                    'Coming Soon'
                  )}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Demo Information */}
      <Card className="aegis-card-glass p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            Demo Features
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Interactive Elements</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Step-by-step workflow progression</li>
                <li>• Real-time data integration</li>
                <li>• AI assistant decision points</li>
                <li>• Cross-domain navigation</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Demonstration Scope</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• End-to-end process flows</li>
                <li>• Role-based access simulation</li>
                <li>• Compliance checkpoint validation</li>
                <li>• Audit trail generation</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-4 border-t border-border/20">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Note:</strong> These demonstrations showcase the complete 
              AEGIS workflow capabilities using realistic healthcare scenarios and data. All workflows 
              integrate with the Palace-Gate navigation system and maintain full audit compliance.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}