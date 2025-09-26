import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Input } from "../ui/input";
import { 
  Package, AlertTriangle, CheckCircle, Clock, ArrowRight, 
  ShoppingCart, Truck, DollarSign, Target 
} from "lucide-react";

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'active' | 'completed' | 'skipped';
  icon: any;
}

interface InventoryReorderWorkflowProps {
  itemName: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  unitCost: number;
  supplier: string;
  onComplete?: () => void;
  onCancel?: () => void;
}

export function InventoryReorderWorkflow({
  itemName,
  currentStock,
  minStock,
  maxStock,
  unitCost,
  supplier,
  onComplete,
  onCancel
}: InventoryReorderWorkflowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [quantity, setQuantity] = useState(maxStock - currentStock);
  const [isProcessing, setIsProcessing] = useState(false);

  const steps: WorkflowStep[] = [
    {
      id: 'review',
      title: 'Review Item',
      description: 'Confirm item details and current stock levels',
      status: currentStep === 0 ? 'active' : currentStep > 0 ? 'completed' : 'pending',
      icon: Package
    },
    {
      id: 'calculate',
      title: 'Calculate Order',
      description: 'Determine optimal reorder quantity',
      status: currentStep === 1 ? 'active' : currentStep > 1 ? 'completed' : 'pending',
      icon: Target
    },
    {
      id: 'approve',
      title: 'Approve Order',
      description: 'Review and approve purchase order',
      status: currentStep === 2 ? 'active' : currentStep > 2 ? 'completed' : 'pending',
      icon: CheckCircle
    },
    {
      id: 'submit',
      title: 'Submit Order',
      description: 'Send order to supplier',
      status: currentStep === 3 ? 'active' : currentStep > 3 ? 'completed' : 'pending',
      icon: ShoppingCart
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = async () => {
    setIsProcessing(true);
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    onComplete?.();
  };

  const getStepStatus = (step: WorkflowStep) => {
    switch (step.status) {
      case 'completed': return 'default';
      case 'active': return 'outline';
      default: return 'secondary';
    }
  };

  const getStepIcon = (step: WorkflowStep) => {
    const IconComponent = step.icon;
    const baseClasses = "w-5 h-5";
    
    switch (step.status) {
      case 'completed': return <CheckCircle className={`${baseClasses} text-green-500`} />;
      case 'active': return <IconComponent className={`${baseClasses} text-blue-500`} />;
      default: return <IconComponent className={`${baseClasses} text-muted-foreground`} />;
    }
  };

  const totalCost = quantity * unitCost;
  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Progress Header */}
      <Card className="aegis-ceremonial-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5 text-blue-500" />
            Reorder Workflow: {itemName}
          </CardTitle>
          <div className="space-y-2">
            <Progress value={progressPercentage} className="w-full" />
            <div className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Steps Progress */}
      <Card className="aegis-ceremonial-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                    step.status === 'completed' ? 'bg-green-500 border-green-500' :
                    step.status === 'active' ? 'bg-blue-500 border-blue-500' :
                    'bg-muted border-muted-foreground'
                  }`}>
                    {getStepIcon(step)}
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-medium">{step.title}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-muted-foreground mx-4" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Step Content */}
      <Card className="aegis-ceremonial-card">
        <CardHeader>
          <CardTitle>{steps[currentStep].title}</CardTitle>
          <p className="text-sm text-muted-foreground">{steps[currentStep].description}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentStep === 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Current Stock</label>
                  <div className="text-2xl font-bold text-red-500">{currentStock}</div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Minimum Stock</label>
                  <div className="text-2xl font-bold text-yellow-500">{minStock}</div>
                </div>
              </div>
              
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <span className="font-medium">Stock Alert</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Current stock is {currentStock <= 0 ? 'out of stock' : 'below minimum threshold'}. 
                  Immediate reorder recommended.
                </p>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Reorder Quantity</label>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                  min={1}
                  max={maxStock}
                />
                <div className="text-xs text-muted-foreground">
                  Recommended: {maxStock - currentStock} (to reach maximum stock level)
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Unit Cost</label>
                  <div className="text-lg font-bold">£{unitCost.toFixed(2)}</div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Total Cost</label>
                  <div className="text-lg font-bold text-blue-500">£{totalCost.toFixed(2)}</div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Final Stock</label>
                  <div className="text-lg font-bold text-green-500">{currentStock + quantity}</div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <h3 className="font-medium mb-3">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Item:</span>
                    <span className="font-medium">{itemName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Supplier:</span>
                    <span className="font-medium">{supplier}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quantity:</span>
                    <span className="font-medium">{quantity} units</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Unit Cost:</span>
                    <span className="font-medium">£{unitCost.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-bold">
                      <span>Total:</span>
                      <span>£{totalCost.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm">Order approved and ready for submission</span>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              {isProcessing ? (
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 mx-auto animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                  <div>
                    <h3 className="font-medium">Submitting Order...</h3>
                    <p className="text-sm text-muted-foreground">
                      Sending purchase order to {supplier}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Ready to submit order to supplier</span>
                  </div>
                  
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">What happens next?</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Purchase order will be sent to {supplier}</li>
                      <li>• You'll receive confirmation within 24 hours</li>
                      <li>• Expected delivery: 5-7 business days</li>
                      <li>• Stock status will be updated to "On Order"</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onCancel} disabled={isProcessing}>
          Cancel
        </Button>
        
        <div className="flex items-center gap-2">
          {currentStep > 0 && (
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep(currentStep - 1)}
              disabled={isProcessing}
            >
              Back
            </Button>
          )}
          <Button 
            onClick={handleNext}
            disabled={isProcessing || (currentStep === 1 && quantity <= 0)}
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2"></div>
                Processing...
              </>
            ) : currentStep === steps.length - 1 ? (
              'Submit Order'
            ) : (
              'Next'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}