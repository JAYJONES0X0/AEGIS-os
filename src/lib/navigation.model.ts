// AEGIS Navigation Model - Single Source of Truth

export interface NavigationChild {
  key: string;
  label: string;
  route: string;
  icon?: string;
  badge?: string | number;
  description?: string;
}

export interface NavigationModule {
  key: string;
  label: string;
  icon: string;
  description: string;
  theme?: string;
  children: NavigationChild[];
}

export const modules: NavigationModule[] = [
  {
    key: 'command-centre',
    label: 'Command Centre',
    icon: 'Crown',
    description: 'Executive Dashboard & System Control',
    theme: 'ae-dark',
    children: [
      { key: 'today', label: 'Today', route: '/command-centre/today', icon: 'Calendar', description: 'Daily Executive Summary' },
      { key: 'broadcasts', label: 'Broadcasts', route: '/command-centre/broadcasts', icon: 'Radio', badge: 3, description: 'System Communications' },
      { key: 'ai-copilot', label: 'AI Co-Pilot', route: '/command-centre/ai-copilot', icon: 'Bot', description: 'Intelligence Assistant' },
      { key: 'kpis', label: 'KPIs', route: '/command-centre/kpis', icon: 'TrendingUp', description: 'Performance Indicators' },
      { key: 'alerts', label: 'Active Alerts', route: '/command-centre/alerts', icon: 'AlertTriangle', badge: 7, description: 'System & Care Alerts' },
      { key: 'health', label: 'System Health', route: '/command-centre/health', icon: 'Activity', description: 'Platform Monitoring' }
    ]
  },
  {
    key: 'healthcare',
    label: 'Healthcare',
    icon: 'Heart',
    description: 'Clinical Care & Medical Management',
    theme: 'ae-ocean',
    children: [
      { key: 'care-support', label: 'Care & Support', route: '/healthcare/care-support', icon: 'Users', description: 'Care Planning & Delivery' },
      { key: 'medications', label: 'Medications (eMAR)', route: '/healthcare/medications', icon: 'Pill', badge: 'Due', description: 'Electronic Medication Records' },
      { key: 'referrals', label: 'Referrals & Appointments', route: '/healthcare/referrals', icon: 'Calendar', description: 'GP/eRS Integration' },
      { key: 'observations', label: 'Observations (NEWS2)', route: '/healthcare/observations', icon: 'Stethoscope', description: 'Clinical Monitoring' },
      { key: 'diagnoses', label: 'Diagnoses & Allergies', route: '/healthcare/diagnoses', icon: 'FileText', description: 'Medical History' },
      { key: 'risk-pbs', label: 'Risk & PBS', route: '/healthcare/risk-pbs', icon: 'Shield', description: 'Risk Assessment & PBS' },
      { key: 'safeguarding', label: 'Safeguarding & Incidents', route: '/healthcare/safeguarding', icon: 'AlertTriangle', description: 'Safety Management' },
      { key: 'portal', label: 'Service-User Portal', route: '/healthcare/portal', icon: 'UserCheck', description: 'Client Access Portal' }
    ]
  },
  {
    key: 'workforce',
    label: 'Workforce & HR',
    icon: 'Users',
    description: 'Human Resources & Operations',
    theme: 'ae-emerald',
    children: [
      { key: 'operations', label: 'Operations', route: '/workforce/operations', icon: 'Settings', description: 'Daily Operations' },
      { key: 'hr', label: 'Human Resources', route: '/workforce/hr', icon: 'UserCheck', description: 'HR Management' },
      { key: 'health-safety', label: 'Health & Safety', route: '/workforce/health-safety', icon: 'Shield', description: 'Workplace Safety' },
      { key: 'maintenance', label: 'Maintenance & Estates', route: '/workforce/maintenance', icon: 'Wrench', description: 'Property Management' },
      { key: 'rota', label: 'Rota & Visits', route: '/workforce/rota', icon: 'Calendar', badge: '12 gaps', description: 'Scheduling & Time' },
      { key: 'timesheets', label: 'Timesheets & Payroll', route: '/workforce/timesheets', icon: 'Clock', description: 'Time & Pay Management' },
      { key: 'training', label: 'Training Matrix', route: '/workforce/training', icon: 'GraduationCap', description: 'Learning & Development' },
      { key: 'staff-files', label: 'Staff Files', route: '/workforce/staff-files', icon: 'FolderOpen', description: 'Personnel Records' },
      { key: 'departments', label: 'Department Views', route: '/workforce/departments', icon: 'Layers', description: 'Dept-Specific Views' }
    ]
  },
  {
    key: 'inventory',
    label: 'Inventory & Finance',
    icon: 'Package',
    description: 'Supply Chain & Financial Management',
    theme: 'ae-amber',
    children: [
      { key: 'odoo', label: 'AE Odoo', route: '/inventory/odoo', icon: 'Package2', description: 'Integrated Odoo System' },
      { key: 'stock', label: 'Stock Levels', route: '/inventory/stock', icon: 'Boxes', description: 'Inventory Management' },
      { key: 'invoicing', label: 'Invoicing & Billing', route: '/inventory/invoicing', icon: 'Receipt', description: 'Revenue Management' },
      { key: 'client-money', label: 'Client Money', route: '/inventory/client-money', icon: 'Wallet', description: 'Service User Financial' },
      { key: 'funding', label: 'Funding Packages', route: '/inventory/funding', icon: 'Package', description: 'Funding & Commissioning' },
      { key: 'payroll', label: 'Payroll Exports', route: '/inventory/payroll', icon: 'FileSpreadsheet', description: 'Payroll Management' },
      { key: 'budget', label: 'Budget Variance', route: '/inventory/budget', icon: 'TrendingUp', badge: '+7%', description: 'Financial Analysis' },
      { key: 'procurement', label: 'Procurement', route: '/inventory/procurement', icon: 'ShoppingCart', description: 'Purchase Management' },
      { key: 'analytics', label: 'Financial Analytics', route: '/inventory/analytics', icon: 'BarChart3', description: 'Financial Insights' }
    ]
  },
  {
    key: 'crm',
    label: 'CRM & Community',
    icon: 'Users2',
    description: 'Relationships & External Stakeholders',
    theme: 'ae-violet',
    children: [
      { key: 'contacts', label: 'Contacts', route: '/crm/contacts', icon: 'ContactRound', description: 'Contact Management' },
      { key: 'family', label: 'Family & Community', route: '/crm/family', icon: 'Home', description: 'External Stakeholders' },
      { key: 'commissioners', label: 'Commissioner Reports', route: '/crm/commissioners', icon: 'FileText', description: 'Stakeholder Reporting' },
      { key: 'referrers', label: 'Referrer Network', route: '/crm/referrers', icon: 'Network', description: 'Referral Relationships' },
      { key: 'marketing', label: 'Marketing & Outreach', route: '/crm/marketing', icon: 'Megaphone', description: 'Community Engagement' }
    ]
  },
  {
    key: 'quality',
    label: 'Quality & Intelligence',
    icon: 'Award',
    description: 'Quality Assurance & Regulatory Compliance',
    theme: 'ae-rose',
    children: [
      { key: 'policies', label: 'QCS Policies', route: '/quality/policies', icon: 'FileCheck', description: 'Policy Management' },
      { key: 'audits', label: 'Audits', route: '/quality/audits', icon: 'CheckSquare', description: 'Quality Auditing' },
      { key: 'risk-register', label: 'Risk Register', route: '/quality/risk-register', icon: 'AlertOctagon', description: 'Risk Management' },
      { key: 'cqc', label: 'CQC Evidence', route: '/quality/cqc', icon: 'Award', description: 'Regulatory Evidence' },
      { key: 'action-plans', label: 'Action Plans', route: '/quality/action-plans', icon: 'Target', description: 'Improvement Planning' },
      { key: 'dashboards', label: 'Analytics Dashboards', route: '/quality/dashboards', icon: 'BarChart', description: 'Quality Analytics' },
      { key: 'predictive', label: 'Predictive AI', route: '/quality/predictive', icon: 'Bot', description: 'AI-Powered Insights' }
    ]
  },
  {
    key: 'analytics',
    label: 'Analytics & Intelligence',
    icon: 'BarChart3',
    description: 'Data Analytics & Business Intelligence',
    theme: 'ae-steel',
    children: [
      { key: 'dashboards', label: 'Executive Dashboards', route: '/analytics/dashboards', icon: 'Monitor', description: 'Executive Insights' },
      { key: 'reports', label: 'Reports', route: '/analytics/reports', icon: 'FileBarChart', description: 'Analytical Reports' },
      { key: 'trends', label: 'Trend Analysis', route: '/analytics/trends', icon: 'TrendingUp', description: 'Trend Insights' },
      { key: 'forecasting', label: 'Forecasting', route: '/analytics/forecasting', icon: 'Crystal', description: 'Predictive Analytics' },
      { key: 'exports', label: 'Data Exports', route: '/analytics/exports', icon: 'Download', description: 'Export Center' }
    ]
  }
];

// Theme mapping for modules
export const moduleThemes = {
  'command-centre': 'ae-dark',
  'healthcare': 'ae-ocean',
  'workforce': 'ae-emerald', 
  'inventory': 'ae-amber',
  'crm': 'ae-violet',
  'quality': 'ae-rose',
  'analytics': 'ae-steel'
} as const;

// All available themes
export const themes = [
  { id: 'ae-dark', name: 'AE Dark', primary: '#7ee0ff' },
  { id: 'ae-light', name: 'AE Light', primary: '#2563eb' },
  { id: 'ae-obsidian', name: 'AE Obsidian', primary: '#a855f7' },
  { id: 'ae-amber', name: 'AE Amber', primary: '#f59e0b' },
  { id: 'ae-ocean', name: 'AE Ocean', primary: '#06b6d4' },
  { id: 'ae-emerald', name: 'AE Emerald', primary: '#10b981' },
  { id: 'ae-rose', name: 'AE Rose', primary: '#e11d48' },
  { id: 'ae-violet', name: 'AE Violet', primary: '#8b5cf6' },
  { id: 'ae-steel', name: 'AE Steel', primary: '#6b7280' },
  { id: 'ae-copper', name: 'AE Copper', primary: '#d97706' }
] as const;

export type ThemeId = typeof themes[number]['id'];
export type ModuleKey = typeof modules[number]['key'];