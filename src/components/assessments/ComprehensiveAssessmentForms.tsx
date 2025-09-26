import React, { useState, useEffect } from "react";
import { 
  Save, 
  RefreshCw, 
  Download, 
  Upload, 
  Eye, 
  Edit, 
  Plus, 
  Trash2, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  User, 
  Calendar, 
  FileText, 
  Clipboard, 
  Star, 
  Target, 
  TrendingUp, 
  TrendingDown, 
  Info, 
  Heart, 
  Activity, 
  Shield, 
  Home, 
  Phone, 
  Mail, 
  MessageCircle,
  ChevronDown,
  ChevronRight,
  ArrowLeft,
  ArrowRight
} from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Switch } from "../ui/switch";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

import { BreadcrumbNavigation } from "../common/BreadcrumbNavigation";
import { Section } from "../common/Section";
import { ContextualActions } from "../common/ContextualActions";

interface AssessmentFieldProps {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date' | 'number' | 'scale' | 'file';
  value?: any;
  options?: Array<{ value: string; label: string; description?: string }>;
  required?: boolean;
  description?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  onChange?: (value: any) => void;
  validation?: (value: any) => string | null;
  conditional?: {
    dependsOn: string;
    showWhen: any;
  };
}

interface AssessmentSectionProps {
  id: string;
  title: string;
  description?: string;
  fields: AssessmentFieldProps[];
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

interface AssessmentFormProps {
  assessmentId: string;
  clientId: string;
  title: string;
  description?: string;
  sections: AssessmentSectionProps[];
  onSave?: (data: any) => void;
  onCancel?: () => void;
  readonly?: boolean;
}

// Comprehensive Assessment Form Component
export function ComprehensiveAssessmentForm({
  assessmentId,
  clientId,
  title,
  description,
  sections,
  onSave,
  onCancel,
  readonly = false
}: AssessmentFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(sections.filter(s => s.defaultExpanded).map(s => s.id))
  );
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [completionPercentage, setCompletionPercentage] = useState(0);

  useEffect(() => {
    // Calculate completion percentage
    const totalFields = sections.reduce((total, section) => total + section.fields.length, 0);
    const completedFields = Object.keys(formData).length;
    setCompletionPercentage((completedFields / totalFields) * 100);
  }, [formData, sections]);

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
    
    // Clear validation error if field becomes valid
    if (validationErrors[fieldId]) {
      const field = sections.flatMap(s => s.fields).find(f => f.id === fieldId);
      if (field?.validation) {
        const error = field.validation(value);
        if (!error) {
          setValidationErrors(prev => {
            const { [fieldId]: removed, ...rest } = prev;
            return rest;
          });
        }
      }
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    sections.forEach(section => {
      section.fields.forEach(field => {
        const value = formData[field.id];
        
        // Required field validation
        if (field.required && (!value || value === '')) {
          errors[field.id] = `${field.label} is required`;
        }
        
        // Custom validation
        if (field.validation && value) {
          const error = field.validation(value);
          if (error) {
            errors[field.id] = error;
          }
        }
      });
    });
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      if (onSave) {
        await onSave(formData);
      }
    } catch (error) {
      console.error('Error saving assessment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const renderField = (field: AssessmentFieldProps) => {
    const value = formData[field.id];
    const error = validationErrors[field.id];
    
    // Handle conditional fields
    if (field.conditional) {
      const dependentValue = formData[field.conditional.dependsOn];
      if (dependentValue !== field.conditional.showWhen) {
        return null;
      }
    }

    const fieldWrapper = (content: React.ReactNode) => (
      <div className="space-y-2">
        <Label htmlFor={field.id} className={field.required ? 'required' : ''}>
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        {field.description && (
          <p className="text-sm text-muted-foreground">{field.description}</p>
        )}
        {content}
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
    );

    switch (field.type) {
      case 'text':
        return fieldWrapper(
          <Input
            id={field.id}
            value={value || ''}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            readOnly={readonly}
            className={error ? 'border-red-500' : ''}
          />
        );

      case 'textarea':
        return fieldWrapper(
          <Textarea
            id={field.id}
            value={value || ''}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            readOnly={readonly}
            className={error ? 'border-red-500' : ''}
            rows={4}
          />
        );

      case 'select':
        return fieldWrapper(
          <Select
            value={value || ''}
            onValueChange={(newValue) => handleFieldChange(field.id, newValue)}
            disabled={readonly}
          >
            <SelectTrigger className={error ? 'border-red-500' : ''}>
              <SelectValue placeholder={field.placeholder || 'Select an option'} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div>
                    <div>{option.label}</div>
                    {option.description && (
                      <div className="text-xs text-muted-foreground">{option.description}</div>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'checkbox':
        return fieldWrapper(
          <div className="flex items-center space-x-2">
            <Checkbox
              id={field.id}
              checked={value || false}
              onCheckedChange={(checked) => handleFieldChange(field.id, checked)}
              disabled={readonly}
            />
            <label htmlFor={field.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {field.label}
            </label>
          </div>
        );

      case 'radio':
        return fieldWrapper(
          <RadioGroup
            value={value || ''}
            onValueChange={(newValue) => handleFieldChange(field.id, newValue)}
            disabled={readonly}
          >
            {field.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={`${field.id}-${option.value}`} />
                <label htmlFor={`${field.id}-${option.value}`} className="text-sm font-medium">
                  {option.label}
                  {option.description && (
                    <div className="text-xs text-muted-foreground">{option.description}</div>
                  )}
                </label>
              </div>
            ))}
          </RadioGroup>
        );

      case 'date':
        return fieldWrapper(
          <Input
            id={field.id}
            type="date"
            value={value || ''}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            readOnly={readonly}
            className={error ? 'border-red-500' : ''}
          />
        );

      case 'number':
        return fieldWrapper(
          <Input
            id={field.id}
            type="number"
            value={value || ''}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            min={field.min}
            max={field.max}
            readOnly={readonly}
            className={error ? 'border-red-500' : ''}
          />
        );

      case 'scale':
        return fieldWrapper(
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{field.min || 0}</span>
              <span>{field.max || 10}</span>
            </div>
            <input
              id={field.id}
              type="range"
              min={field.min || 0}
              max={field.max || 10}
              value={value || field.min || 0}
              onChange={(e) => handleFieldChange(field.id, parseInt(e.target.value))}
              disabled={readonly}
              className="w-full"
            />
            <div className="text-center">
              <span className="text-lg font-medium">{value || field.min || 0}</span>
            </div>
          </div>
        );

      case 'file':
        return fieldWrapper(
          <div className="space-y-2">
            <Input
              id={field.id}
              type="file"
              onChange={(e) => handleFieldChange(field.id, e.target.files?.[0])}
              disabled={readonly}
              className={error ? 'border-red-500' : ''}
            />
            {value && (
              <p className="text-sm text-muted-foreground">
                Selected: {typeof value === 'string' ? value : value.name}
              </p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="p-6">
          <BreadcrumbNavigation
            items={[
              { id: 'client', label: 'Client Profile' },
              { id: 'assessments', label: 'Assessments' },
              { id: assessmentId, label: title }
            ]}
          />

          <div className="flex items-center justify-between mt-4">
            <div>
              <h1 className="text-2xl font-bold aegis-text-primary">{title}</h1>
              {description && (
                <p className="text-muted-foreground mt-1">{description}</p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Completion</div>
                <div className="text-lg font-bold">{Math.round(completionPercentage)}%</div>
              </div>
              <Progress value={completionPercentage} className="w-32" />
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <Badge variant={readonly ? 'outline' : 'secondary'}>
                {readonly ? 'Read-only' : 'Editable'}
              </Badge>
              <Badge variant="outline">
                Last saved: {new Date().toLocaleString()}
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              {!readonly && (
                <>
                  <Button variant="outline" size="sm" onClick={() => setFormData({})}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                  <Button onClick={handleSubmit} disabled={isSubmitting}>
                    <Save className="h-4 w-4 mr-2" />
                    {isSubmitting ? 'Saving...' : 'Save Assessment'}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6 max-w-4xl mx-auto">
        <div className="space-y-6">
          {sections.map((section, index) => {
            const isExpanded = expandedSections.has(section.id);
            const sectionCompletion = section.fields.filter(f => formData[f.id]).length / section.fields.length * 100;

            return (
              <Card key={section.id} className="aegis-card-glass">
                <CardHeader 
                  className={section.collapsible ? 'cursor-pointer' : ''}
                  onClick={() => section.collapsible && toggleSection(section.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {section.collapsible && (
                        isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
                      )}
                      <div>
                        <CardTitle className="aegis-text-primary">{section.title}</CardTitle>
                        {section.description && (
                          <CardDescription>{section.description}</CardDescription>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">Section Progress</div>
                        <div className="text-sm font-medium">{Math.round(sectionCompletion)}%</div>
                      </div>
                      <Progress value={sectionCompletion} className="w-20" />
                    </div>
                  </div>
                </CardHeader>

                {(!section.collapsible || isExpanded) && (
                  <CardContent className="pt-0">
                    <div className="grid gap-6">
                      {section.fields.map((field, fieldIndex) => (
                        <div key={field.id}>
                          {renderField(field)}
                          {fieldIndex < section.fields.length - 1 && (
                            <Separator className="mt-4" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>

        {/* Form Navigation */}
        <div className="flex items-center justify-between mt-8 p-4 bg-card/50 rounded-lg border">
          <Button variant="outline" onClick={onCancel}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          
          <div className="flex items-center gap-2">
            {Object.keys(validationErrors).length > 0 && (
              <Alert className="w-auto">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Please fix {Object.keys(validationErrors).length} validation error(s) before saving.
                </AlertDescription>
              </Alert>
            )}
          </div>

          <Button onClick={handleSubmit} disabled={isSubmitting || readonly}>
            <Save className="h-4 w-4 mr-2" />
            {isSubmitting ? 'Saving...' : 'Save Assessment'}
          </Button>
        </div>
      </div>
    </div>
  );
}

// Specific Assessment Forms
export function ClinicalHistoryAssessment({ clientId, readonly = false }: { clientId: string; readonly?: boolean }) {
  const sections: AssessmentSectionProps[] = [
    {
      id: 'basic-information',
      title: 'Basic Medical Information',
      description: 'Core medical history and current conditions',
      fields: [
        {
          id: 'primary-diagnosis',
          label: 'Primary Diagnosis',
          type: 'select',
          required: true,
          options: [
            { value: 'dementia', label: 'Dementia', description: 'Various forms of dementia' },
            { value: 'learning-disability', label: 'Learning Disability' },
            { value: 'mental-health', label: 'Mental Health Condition' },
            { value: 'physical-disability', label: 'Physical Disability' },
            { value: 'other', label: 'Other' }
          ]
        },
        {
          id: 'secondary-conditions',
          label: 'Secondary Conditions',
          type: 'textarea',
          placeholder: 'List any additional medical conditions...'
        },
        {
          id: 'medical-history',
          label: 'Significant Medical History',
          type: 'textarea',
          placeholder: 'Include surgeries, hospitalizations, major illnesses...'
        },
        {
          id: 'current-symptoms',
          label: 'Current Symptoms',
          type: 'textarea',
          placeholder: 'Describe current presenting symptoms...'
        }
      ]
    },
    {
      id: 'medications',
      title: 'Current Medications',
      description: 'All prescribed and over-the-counter medications',
      fields: [
        {
          id: 'prescribed-medications',
          label: 'Prescribed Medications',
          type: 'textarea',
          placeholder: 'List all prescribed medications with dosages...'
        },
        {
          id: 'medication-allergies',
          label: 'Known Medication Allergies',
          type: 'textarea',
          placeholder: 'List any known drug allergies and reactions...'
        },
        {
          id: 'medication-compliance',
          label: 'Medication Compliance',
          type: 'select',
          options: [
            { value: 'excellent', label: 'Excellent - Always takes as prescribed' },
            { value: 'good', label: 'Good - Occasionally misses doses' },
            { value: 'poor', label: 'Poor - Frequently misses or refuses medication' },
            { value: 'requires-assistance', label: 'Requires full assistance' }
          ]
        }
      ]
    },
    {
      id: 'family-history',
      title: 'Family Medical History',
      description: 'Relevant family medical history',
      collapsible: true,
      fields: [
        {
          id: 'family-conditions',
          label: 'Family History of Conditions',
          type: 'textarea',
          placeholder: 'Include hereditary conditions, mental health history, etc...'
        },
        {
          id: 'genetic-concerns',
          label: 'Genetic Screening Concerns',
          type: 'textarea',
          placeholder: 'Any genetic conditions of concern...'
        }
      ]
    },
    {
      id: 'functional-assessment',
      title: 'Functional Assessment',
      description: 'Activities of daily living and functional capacity',
      fields: [
        {
          id: 'mobility-level',
          label: 'Mobility Level',
          type: 'select',
          required: true,
          options: [
            { value: 'independent', label: 'Independent' },
            { value: 'walking-aid', label: 'Uses walking aid' },
            { value: 'wheelchair', label: 'Wheelchair user' },
            { value: 'bed-bound', label: 'Bed bound' }
          ]
        },
        {
          id: 'cognitive-function',
          label: 'Cognitive Function Level',
          type: 'scale',
          min: 1,
          max: 10,
          description: '1 = Severe impairment, 10 = No impairment'
        },
        {
          id: 'adl-independence',
          label: 'Activities of Daily Living Independence',
          type: 'scale',
          min: 1,
          max: 10,
          description: '1 = Requires full assistance, 10 = Completely independent'
        }
      ]
    }
  ];

  return (
    <ComprehensiveAssessmentForm
      assessmentId="clinical-history"
      clientId={clientId}
      title="Clinical History and Medical Condition"
      description="Comprehensive medical history and current health status assessment"
      sections={sections}
      readonly={readonly}
      onSave={(data) => {
        console.log('Saving clinical history assessment:', data);
        // Implement save logic
      }}
    />
  );
}

export function DietNutritionAssessment({ clientId, readonly = false }: { clientId: string; readonly?: boolean }) {
  const sections: AssessmentSectionProps[] = [
    {
      id: 'dietary-preferences',
      title: 'Dietary Preferences and Requirements',
      fields: [
        {
          id: 'diet-type',
          label: 'Diet Type',
          type: 'select',
          required: true,
          options: [
            { value: 'regular', label: 'Regular Diet' },
            { value: 'vegetarian', label: 'Vegetarian' },
            { value: 'vegan', label: 'Vegan' },
            { value: 'pescatarian', label: 'Pescatarian' },
            { value: 'halal', label: 'Halal' },
            { value: 'kosher', label: 'Kosher' },
            { value: 'therapeutic', label: 'Therapeutic Diet' }
          ]
        },
        {
          id: 'therapeutic-diet-details',
          label: 'Therapeutic Diet Details',
          type: 'textarea',
          conditional: {
            dependsOn: 'diet-type',
            showWhen: 'therapeutic'
          },
          placeholder: 'Specify therapeutic diet requirements...'
        },
        {
          id: 'food-allergies',
          label: 'Food Allergies',
          type: 'textarea',
          placeholder: 'List all known food allergies and severity...'
        },
        {
          id: 'food-intolerances',
          label: 'Food Intolerances',
          type: 'textarea',
          placeholder: 'List food intolerances and symptoms...'
        },
        {
          id: 'food-dislikes',
          label: 'Food Dislikes/Preferences',
          type: 'textarea',
          placeholder: 'Foods the client dislikes or strongly prefers...'
        }
      ]
    },
    {
      id: 'nutritional-status',
      title: 'Nutritional Status',
      fields: [
        {
          id: 'appetite-level',
          label: 'Appetite Level',
          type: 'select',
          options: [
            { value: 'excellent', label: 'Excellent - Always finishes meals' },
            { value: 'good', label: 'Good - Usually finishes meals' },
            { value: 'fair', label: 'Fair - Sometimes leaves food' },
            { value: 'poor', label: 'Poor - Frequently leaves food' },
            { value: 'very-poor', label: 'Very Poor - Rarely finishes meals' }
          ]
        },
        {
          id: 'weight-status',
          label: 'Weight Status',
          type: 'select',
          options: [
            { value: 'underweight', label: 'Underweight' },
            { value: 'normal', label: 'Normal weight' },
            { value: 'overweight', label: 'Overweight' },
            { value: 'obese', label: 'Obese' }
          ]
        },
        {
          id: 'recent-weight-change',
          label: 'Recent Weight Change',
          type: 'select',
          options: [
            { value: 'significant-loss', label: 'Significant weight loss (>5% in 6 months)' },
            { value: 'moderate-loss', label: 'Moderate weight loss (2-5% in 6 months)' },
            { value: 'stable', label: 'Weight stable' },
            { value: 'moderate-gain', label: 'Moderate weight gain' },
            { value: 'significant-gain', label: 'Significant weight gain' }
          ]
        },
        {
          id: 'nutritional-supplements',
          label: 'Nutritional Supplements',
          type: 'textarea',
          placeholder: 'List any vitamins, supplements, or nutritional drinks...'
        }
      ]
    },
    {
      id: 'eating-assistance',
      title: 'Eating and Swallowing',
      fields: [
        {
          id: 'assistance-level',
          label: 'Level of Assistance Required',
          type: 'select',
          required: true,
          options: [
            { value: 'independent', label: 'Independent' },
            { value: 'verbal-prompts', label: 'Requires verbal prompts' },
            { value: 'physical-assistance', label: 'Requires physical assistance' },
            { value: 'total-assistance', label: 'Requires total assistance' },
            { value: 'feeding-tube', label: 'Fed via feeding tube' }
          ]
        },
        {
          id: 'swallowing-difficulties',
          label: 'Swallowing Difficulties',
          type: 'checkbox',
        },
        {
          id: 'swallowing-details',
          label: 'Swallowing Assessment Details',
          type: 'textarea',
          conditional: {
            dependsOn: 'swallowing-difficulties',
            showWhen: true
          },
          placeholder: 'Describe swallowing difficulties and current management...'
        },
        {
          id: 'texture-modification',
          label: 'Texture Modification Required',
          type: 'select',
          options: [
            { value: 'none', label: 'No modification required' },
            { value: 'minced-moist', label: 'Minced and moist' },
            { value: 'soft-bite', label: 'Soft bite-sized pieces' },
            { value: 'pureed', label: 'Pureed' },
            { value: 'liquidised', label: 'Liquidised' }
          ]
        },
        {
          id: 'fluid-thickening',
          label: 'Fluid Thickening Required',
          type: 'select',
          options: [
            { value: 'none', label: 'No thickening required' },
            { value: 'slightly-thick', label: 'Slightly thick (Level 1)' },
            { value: 'mildly-thick', label: 'Mildly thick (Level 2)' },
            { value: 'moderately-thick', label: 'Moderately thick (Level 3)' },
            { value: 'extremely-thick', label: 'Extremely thick (Level 4)' }
          ]
        }
      ]
    }
  ];

  return (
    <ComprehensiveAssessmentForm
      assessmentId="diet-nutrition"
      clientId={clientId}
      title="Diet and Nutrition Assessment"
      description="Comprehensive assessment of dietary needs, preferences, and nutritional status"
      sections={sections}
      readonly={readonly}
      onSave={(data) => {
        console.log('Saving diet and nutrition assessment:', data);
        // Implement save logic
      }}
    />
  );
}

export function AllergiesIntolerancesAssessment({ clientId, readonly = false }: { clientId: string; readonly?: boolean }) {
  const sections: AssessmentSectionProps[] = [
    {
      id: 'food-allergies',
      title: 'Food Allergies',
      fields: [
        {
          id: 'has-food-allergies',
          label: 'Has known food allergies',
          type: 'checkbox'
        },
        {
          id: 'food-allergy-list',
          label: 'Food Allergies',
          type: 'textarea',
          conditional: {
            dependsOn: 'has-food-allergies',
            showWhen: true
          },
          placeholder: 'List all known food allergies with severity and symptoms...'
        },
        {
          id: 'anaphylaxis-risk',
          label: 'Anaphylaxis Risk',
          type: 'select',
          conditional: {
            dependsOn: 'has-food-allergies',
            showWhen: true
          },
          options: [
            { value: 'none', label: 'No anaphylaxis risk' },
            { value: 'low', label: 'Low risk' },
            { value: 'moderate', label: 'Moderate risk' },
            { value: 'high', label: 'High risk - carries EpiPen' }
          ]
        }
      ]
    },
    {
      id: 'medication-allergies',
      title: 'Medication Allergies',
      fields: [
        {
          id: 'has-medication-allergies',
          label: 'Has known medication allergies',
          type: 'checkbox'
        },
        {
          id: 'medication-allergy-list',
          label: 'Medication Allergies',
          type: 'textarea',
          conditional: {
            dependsOn: 'has-medication-allergies',
            showWhen: true
          },
          placeholder: 'List all known medication allergies with reactions...'
        }
      ]
    },
    {
      id: 'environmental-allergies',
      title: 'Environmental Allergies',
      fields: [
        {
          id: 'has-environmental-allergies',
          label: 'Has environmental allergies',
          type: 'checkbox'
        },
        {
          id: 'environmental-allergy-list',
          label: 'Environmental Allergies',
          type: 'textarea',
          conditional: {
            dependsOn: 'has-environmental-allergies',
            showWhen: true
          },
          placeholder: 'List environmental allergies (pollen, dust, animals, etc.)...'
        }
      ]
    },
    {
      id: 'emergency-management',
      title: 'Emergency Management',
      fields: [
        {
          id: 'emergency-medication',
          label: 'Emergency Medications Available',
          type: 'textarea',
          placeholder: 'List emergency medications (EpiPen, inhalers, etc.)...'
        },
        {
          id: 'emergency-contacts',
          label: 'Emergency Contact Instructions',
          type: 'textarea',
          placeholder: 'Special instructions for allergic reactions...'
        },
        {
          id: 'allergy-bracelet',
          label: 'Wears medical alert bracelet/jewelry',
          type: 'checkbox'
        }
      ]
    }
  ];

  return (
    <ComprehensiveAssessmentForm
      assessmentId="allergies-intolerances"
      clientId={clientId}
      title="Allergies and Intolerances Assessment"
      description="Comprehensive assessment of all known allergies and intolerances"
      sections={sections}
      readonly={readonly}
      onSave={(data) => {
        console.log('Saving allergies assessment:', data);
        // Implement save logic
      }}
    />
  );
}

// Export all assessment components
export const ASSESSMENT_FORMS = {
  'clinical-history': ClinicalHistoryAssessment,
  'diet-nutrition': DietNutritionAssessment,
  'allergies-intolerances': AllergiesIntolerancesAssessment
};

// Assessment Form Router
export function AssessmentFormRouter({ 
  assessmentType, 
  clientId, 
  readonly = false 
}: { 
  assessmentType: string; 
  clientId: string; 
  readonly?: boolean 
}) {
  const FormComponent = ASSESSMENT_FORMS[assessmentType as keyof typeof ASSESSMENT_FORMS];
  
  if (!FormComponent) {
    return (
      <div className="p-6 text-center">
        <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium">Assessment Form Not Found</h3>
        <p className="text-muted-foreground">The requested assessment form is not available.</p>
      </div>
    );
  }

  return <FormComponent clientId={clientId} readonly={readonly} />;
}