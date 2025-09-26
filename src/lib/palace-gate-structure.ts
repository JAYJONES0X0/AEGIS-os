// AEGIS Palace-Gate Navigation Structure
// 5 Main Tabs + AI Hub with complete hierarchical sub-navigation

export interface SubTab {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  badge?: string | number;
  href?: string;
}

export interface PalaceGate {
  id: string;
  name: string;
  description: string;
  icon: string;
  themeId: 'royal-gold' | 'arctic-silver' | 'ember-glass' | 'midnight-navy' | 'verdant-jade';
  subTabs: SubTab[];
  special?: boolean; // For AI Hub special styling
}

export const PALACE_GATES: PalaceGate[] = [
  {
    id: 'command-centre',
    name: 'DASH',
    description: 'Executive Dashboard & System Control',
    icon: 'Crown',
    themeId: 'royal-gold',
    subTabs: [
      { id: 'dashboard', name: 'Dashboard', description: 'Executive Command Dashboard', icon: 'Crown' },
      { id: 'functional-depth', name: 'Functional Depth', description: 'Interactive Drill-Down Demo', icon: 'Target', badge: 'New' },
      { id: 'today', name: 'Today', description: 'Daily Executive Summary', icon: 'Calendar' },
      { id: 'broadcasts', name: 'Broadcasts', description: 'System-Wide Communications', icon: 'Radio', badge: 3 },
      { id: 'ai-copilot', name: 'AI Co-Pilot', description: 'Integrated Intelligence Assistant', icon: 'Bot' },
      { id: 'kpis', name: 'KPIs', description: 'Key Performance Indicators', icon: 'TrendingUp' },
      { id: 'active-alerts', name: 'Active Alerts', description: 'System & Care Alerts', icon: 'AlertTriangle', badge: 7 },
      { id: 'system-health', name: 'System Health', description: 'Platform Monitoring', icon: 'Activity' }
    ]
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'Clinical Care & Medical Management',
    icon: 'Heart',
    themeId: 'arctic-silver',
    subTabs: [
      { id: 'care-support', name: 'Care & Support', description: 'Care Planning & Delivery', icon: 'Users' },
      { id: 'medications', name: 'Medications (eMAR)', description: 'Electronic Medication Records', icon: 'Pill', badge: 'Due' },
      { id: 'referrals-appointments', name: 'Referrals & Appointments', description: 'GP/eRS Integration', icon: 'Calendar' },
      { id: 'observations', name: 'Observations (NEWS2)', description: 'Clinical Monitoring', icon: 'Stethoscope' },
      { id: 'diagnoses-allergies', name: 'Diagnoses & Allergies', description: 'Medical History', icon: 'FileText' },
      { id: 'risk-pbs', name: 'Risk & PBS', description: 'Risk Assessment & Positive Behaviour Support', icon: 'Shield' },
      { id: 'safeguarding-incidents', name: 'Safeguarding & Incidents', description: 'Safety Management', icon: 'AlertTriangle' },
      { id: 'service-user-portal', name: 'Service-User Portal', description: 'Client Access Portal', icon: 'UserCheck' },
      { id: 'reports-analytics', name: 'Reports & Analytics', description: 'Healthcare Reports & BI', icon: 'BarChart3' }
    ]
  },
  {
    id: 'workforce',
    name: 'Workforce & HR',
    description: 'Human Resources & Operations',
    icon: 'Users',
    themeId: 'verdant-jade',
    subTabs: [
      { id: 'overview', name: 'Overview', description: 'Workforce Analytics', icon: 'BarChart3' },
      { id: 'scheduling', name: 'Scheduling', description: 'Staff Scheduling', icon: 'Calendar' },
      { id: 'rota', name: 'Interactive Rota', description: '3D Drag & Drop Rota Management', icon: 'CalendarDays', badge: '12 gaps' },
      { id: 'training', name: 'Training', description: 'Staff Development', icon: 'GraduationCap' },
      { id: 'performance', name: 'Performance', description: 'Performance Management', icon: 'TrendingUp' }
    ]
  },
  {
    id: 'finance-operations',
    name: 'Finance & Operations',
    description: 'Financial Management & Supply Chain',
    icon: 'DollarSign',
    themeId: 'ember-glass',
    subTabs: [
      { id: 'invoicing-billing', name: 'Invoicing & Billing', description: 'Revenue Management', icon: 'Receipt' },
      { id: 'client-money', name: 'Client Money', description: 'Service User Financial Management', icon: 'Wallet' },
      { id: 'funding-packages', name: 'Funding Packages', description: 'Funding & Commissioning', icon: 'Package' },
      { id: 'payroll-exports', name: 'Payroll Exports & Reports', description: 'Payroll Management', icon: 'FileSpreadsheet' },
      { id: 'budget-variance', name: 'Budget Variance', description: 'Financial Analysis', icon: 'TrendingUp', badge: '+7%' },
      { id: 'ae-inventory', name: 'AE Inventory', description: 'Inventory Management System', icon: 'Package2' },
      { id: 'procurement', name: 'Procurement', description: 'Purchase Management', icon: 'ShoppingCart' },
      { id: 'analytics', name: 'Analytics', description: 'Financial Analytics', icon: 'BarChart3' }
    ]
  },
  {
    id: 'quality-intelligence',
    name: 'Quality & Intelligence',
    description: 'Quality Assurance & Regulatory Compliance',
    icon: 'Award',
    themeId: 'royal-gold',
    subTabs: [
      { id: 'qcs-policies', name: 'QCS Policies', description: 'Policy Management', icon: 'FileCheck' },
      { id: 'audits', name: 'Audits', description: 'Quality Auditing', icon: 'CheckSquare' },
      { id: 'risk-register', name: 'Risk Register', description: 'Risk Management', icon: 'AlertOctagon' },
      { id: 'cqc-evidence', name: 'CQC Evidence', description: 'Regulatory Evidence Packs', icon: 'Award' },
      { id: 'action-plans', name: 'Action Plans', description: 'Improvement Planning', icon: 'Target' },
      { id: 'analytics-dashboards', name: 'Analytics Dashboards', description: 'Quality Analytics', icon: 'BarChart' },
      { id: 'predictive-ai', name: 'Predictive AI', description: 'AI-Powered Insights', icon: 'Bot' },
      { id: 'commissioner-reports', name: 'Commissioner Reports', description: 'Stakeholder Reporting', icon: 'FileText' },
      { id: 'community-family', name: 'Community & Family', description: 'External Stakeholder Management', icon: 'Home' }
    ]
  },
  {
    id: 'admin',
    name: 'Admin',
    description: 'System Administration & Configuration',
    icon: 'Settings',
    themeId: 'midnight-navy',
    subTabs: [
      { id: 'overview', name: 'Admin Overview', description: 'Administration Dashboard', icon: 'Settings' },
      { id: 'general', name: 'General', description: 'System Configuration', icon: 'Cog' },
      { id: 'carers', name: 'Staff Management', description: 'Staff Configuration', icon: 'Users' },
      { id: 'clients', name: 'Client Management', description: 'Client Configuration', icon: 'UserCheck' },
      { id: 'audit', name: 'Audit Trails', description: 'System Auditing', icon: 'Eye' },
      { id: 'appointments', name: 'Appointments', description: 'Appointment Configuration', icon: 'Calendar' },
      { id: 'functional-depth-demo', name: 'Functional Depth Demo', description: 'Interactive Feature Demonstration', icon: 'Target', badge: 'New' }
    ]
  },

  {
    id: 'ai-hub',
    name: 'AEGIS AI Hub',
    description: 'AI-powered intelligence and automation center',
    icon: 'Bot',
    themeId: 'midnight-navy',
    special: true,
    subTabs: [
      { id: 'ae-copilot', name: 'AE Co-Pilot', description: 'General AI Assistant', icon: 'Bot' },
      { id: 'finance-agent', name: 'Finance Agent', description: 'Financial AI Specialist', icon: 'Calculator' },
      { id: 'clinical-agent', name: 'Clinical Agent', description: 'Healthcare AI Specialist', icon: 'Stethoscope' },
      { id: 'workforce-agent', name: 'Workforce Agent', description: 'HR AI Specialist', icon: 'Users' },
      { id: 'quality-agent', name: 'Quality Agent', description: 'Compliance AI Specialist', icon: 'Award' },
      { id: 'llm-selector', name: 'LLM Selector', description: 'Model Selection (GPT-5, Claude, Grok, Gemini)', icon: 'Settings' },
      { id: 'audit-trail', name: 'Audit Trail', description: 'AI Activity Log', icon: 'History' },
      { id: 'quick-actions', name: 'Quick Actions', description: 'AI-Powered Shortcuts', icon: 'Zap' }
    ]
  }
];

export const AI_HUB_FEATURES = [
  { id: 'ae-copilot', name: 'AE Co-Pilot', description: 'General AI Assistant', icon: 'Bot' },
  { id: 'finance-agent', name: 'Finance Agent', description: 'Financial AI Specialist', icon: 'Calculator' },
  { id: 'clinical-agent', name: 'Clinical Agent', description: 'Healthcare AI Specialist', icon: 'Stethoscope' },
  { id: 'workforce-agent', name: 'Workforce Agent', description: 'HR AI Specialist', icon: 'Users' },
  { id: 'quality-agent', name: 'Quality Agent', description: 'Compliance AI Specialist', icon: 'Award' },
  { id: 'llm-selector', name: 'LLM Selector', description: 'Model Selection (GPT-5, Claude, Grok, Gemini)', icon: 'Settings' },
  { id: 'audit-trail', name: 'Audit Trail Viewer', description: 'AI Activity Log', icon: 'History' },
  { id: 'quick-actions', name: 'Quick Actions', description: 'AI-Powered Shortcuts', icon: 'Zap' }
];

export interface QuickAction {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'care' | 'clinical' | 'finance' | 'quality' | 'workforce';
}

export const QUICK_ACTIONS: QuickAction[] = [
  { id: 'draft-care-plan', name: 'Draft Care Plan', description: 'AI-Generated Care Planning', icon: 'FileEdit', category: 'care' },
  { id: 'book-gp', name: 'Book GP', description: 'Schedule GP Appointment', icon: 'Calendar', category: 'clinical' },
  { id: 'reconcile-payroll', name: 'Reconcile Payroll', description: 'Financial Reconciliation', icon: 'Calculator', category: 'finance' },
  { id: 'generate-audit', name: 'Generate Audit', description: 'Create Quality Audit', icon: 'FileCheck', category: 'quality' },
  { id: 'create-rota', name: 'Create Rota', description: 'Generate Staff Schedule', icon: 'Calendar', category: 'workforce' }
];