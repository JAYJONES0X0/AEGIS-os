// Comprehensive Navigation System for AEGIS
// Every button, card, and interaction leads to a functional page

export interface NavigationRoute {
  id: string;
  path: string;
  title: string;
  description?: string;
  parent?: string;
  component: string;
  requiresAuth?: boolean;
  permissions?: string[];
  breadcrumbs?: string[];
}

export interface NavigationState {
  currentRoute: string;
  previousRoute?: string;
  routeHistory: string[];
  routeParams: Record<string, any>;
  contextData: Record<string, any>;
}

// Client/Service User Navigation Structure
export const CLIENT_NAVIGATION = {
  profile: {
    general: 'client-profile-general',
    address: 'client-profile-address', 
    biography: 'client-profile-biography',
    status: 'client-profile-status',
    additional: 'client-profile-additional',
    documents: 'client-profile-documents'
  },
  circleOfCare: {
    overview: 'client-circle-overview',
    familyContacts: 'client-circle-family',
    professionalContacts: 'client-circle-professional',
    emergencyContacts: 'client-circle-emergency',
    advocacy: 'client-circle-advocacy'
  },
  assessments: {
    overview: 'client-assessments-overview',
    current: 'client-assessments-current',
    abilities: 'client-assessments-abilities',
    aboutMe: 'client-assessments-about-me',
    adrt: 'client-assessments-adrt',
    allergies: 'client-assessments-allergies',
    anxiety: 'client-assessments-anxiety-gad7',
    bedRails: 'client-assessments-bed-rails',
    breathing: 'client-assessments-breathing',
    carePackage: 'client-assessments-care-package',
    choking: 'client-assessments-choking',
    clinical: 'client-assessments-clinical',
    communication: 'client-assessments-communication',
    communityNeeds: 'client-assessments-community-needs',
    continence: 'client-assessments-continence',
    death: 'client-assessments-death',
    depression: 'client-assessments-depression-phq9',
    dols: 'client-assessments-dols',
    dietNutrition: 'client-assessments-diet-nutrition',
    distress: 'client-assessments-distress',
    dnacpr: 'client-assessments-dnacpr',
    endOfLife: 'client-assessments-end-of-life',
    enteral: 'client-assessments-enteral',
    environmental: 'client-assessments-environmental',
    financial: 'client-assessments-financial',
    mouthcare: 'client-assessments-mouthcare',
    healthcare: 'client-assessments-healthcare',
    infection: 'client-assessments-infection',
    intimacy: 'client-assessments-intimacy',
    medication: 'client-assessments-medication',
    mentalHealth: 'client-assessments-mental-health',
    movingHandling: 'client-assessments-moving-handling',
    muac: 'client-assessments-muac',
    falls: 'client-assessments-falls',
    must: 'client-assessments-must',
    news2: 'client-assessments-news2',
    oralHealth: 'client-assessments-oral-health',
    research: 'client-assessments-research',
    personalCare: 'client-assessments-personal-care',
    peep: 'client-assessments-peep',
    pbs: 'client-assessments-pbs',
    pressureUlcer: 'client-assessments-pressure-ulcer',
    respect: 'client-assessments-respect',
    restore2: 'client-assessments-restore2',
    restore2Escalation: 'client-assessments-restore2-escalation',
    restore2Normal: 'client-assessments-restore2-normal',
    safeguarding: 'client-assessments-safeguarding',
    sleep: 'client-assessments-sleep',
    smoking: 'client-assessments-smoking',
    stoma: 'client-assessments-stoma',
    waterlow: 'client-assessments-waterlow'
  },
  timeline: {
    overview: 'client-timeline-overview',
    care: 'client-timeline-care',
    medical: 'client-timeline-medical', 
    incidents: 'client-timeline-incidents',
    assessments: 'client-timeline-assessments',
    medications: 'client-timeline-medications'
  },
  carePlan: {
    overview: 'client-careplan-overview',
    accommodation: 'client-careplan-accommodation',
    breathing: 'client-careplan-breathing',
    communication: 'client-careplan-communication',
    companionship: 'client-careplan-companionship',
    dailyRoutine: 'client-careplan-daily-routine',
    eating: 'client-careplan-eating',
    elimination: 'client-careplan-elimination',
    environment: 'client-careplan-environment',
    equality: 'client-careplan-equality',
    sexuality: 'client-careplan-sexuality',
    financial: 'client-careplan-financial',
    healthWellbeing: 'client-careplan-health-wellbeing',
    infection: 'client-careplan-infection',
    medication: 'client-careplan-medication',
    mentalHealth: 'client-careplan-mental-health',
    mobility: 'client-careplan-mobility',
    pain: 'client-careplan-pain',
    personalCare: 'client-careplan-personal-care',
    skinIntegrity: 'client-careplan-skin-integrity',
    sleeping: 'client-careplan-sleeping',
    spirituality: 'client-careplan-spirituality',
    interactions: 'client-careplan-interactions'
  },
  warnings: {
    overview: 'client-warnings-overview',
    active: 'client-warnings-active',
    resolved: 'client-warnings-resolved',
    risks: 'client-warnings-risks'
  }
};

// Staff Navigation Structure  
export const STAFF_NAVIGATION = {
  profile: {
    general: 'staff-profile-general',
    employment: 'staff-profile-employment',
    qualifications: 'staff-profile-qualifications',
    training: 'staff-profile-training',
    performance: 'staff-profile-performance',
    schedule: 'staff-profile-schedule'
  },
  training: {
    overview: 'staff-training-overview',
    mandatory: 'staff-training-mandatory',
    professional: 'staff-training-professional',
    certificates: 'staff-training-certificates',
    cpd: 'staff-training-cpd'
  },
  performance: {
    overview: 'staff-performance-overview',
    reviews: 'staff-performance-reviews',
    objectives: 'staff-performance-objectives',
    feedback: 'staff-performance-feedback'
  },
  schedule: {
    overview: 'staff-schedule-overview',
    rota: 'staff-schedule-rota',
    availability: 'staff-schedule-availability',
    requests: 'staff-schedule-requests'
  }
};

// System-wide Navigation Routes
export const NAVIGATION_ROUTES: NavigationRoute[] = [
  // Command Centre Routes
  {
    id: 'command-centre',
    path: '/command-centre',
    title: 'Command Centre',
    component: 'CommandCentreDomain'
  },
  {
    id: 'command-centre-dashboard',
    path: '/command-centre/dashboard', 
    title: 'Executive Dashboard',
    parent: 'command-centre',
    component: 'DashboardOverview'
  },
  {
    id: 'command-centre-functional-depth',
    path: '/command-centre/functional-depth',
    title: 'Functional Depth Demo',
    parent: 'command-centre',
    component: 'FunctionalDepthDemo'
  },
  {
    id: 'command-centre-today',
    path: '/command-centre/today',
    title: 'Today\'s Summary',
    parent: 'command-centre', 
    component: 'TodaySummary'
  },
  {
    id: 'command-centre-broadcasts',
    path: '/command-centre/broadcasts',
    title: 'System Broadcasts',
    parent: 'command-centre',
    component: 'SystemBroadcasts'
  },
  {
    id: 'command-centre-ai-copilot',
    path: '/command-centre/ai-copilot',
    title: 'AI Co-Pilot',
    parent: 'command-centre',
    component: 'AICopilot'
  },
  {
    id: 'command-centre-kpis',
    path: '/command-centre/kpis',
    title: 'Key Performance Indicators',
    parent: 'command-centre',
    component: 'KPIOverview'
  },
  {
    id: 'command-centre-alerts',
    path: '/command-centre/alerts',
    title: 'Active Alerts',
    parent: 'command-centre',
    component: 'ActiveAlerts'
  },
  {
    id: 'command-centre-system-health',
    path: '/command-centre/system-health',
    title: 'System Health',
    parent: 'command-centre',
    component: 'SystemHealth'
  },

  // Healthcare Routes
  {
    id: 'healthcare',
    path: '/healthcare',
    title: 'Healthcare',
    component: 'HealthcareDomain'
  },
  {
    id: 'healthcare-care-support',
    path: '/healthcare/care-support',
    title: 'Care & Support',
    parent: 'healthcare',
    component: 'CareSupportDomain'
  },
  {
    id: 'healthcare-medications',
    path: '/healthcare/medications',
    title: 'Medications (eMAR)',
    parent: 'healthcare',
    component: 'MedicationsDomain'
  },
  {
    id: 'healthcare-referrals',
    path: '/healthcare/referrals-appointments',
    title: 'Referrals & Appointments',
    parent: 'healthcare',
    component: 'ReferralsAppointments'
  },
  {
    id: 'healthcare-observations',
    path: '/healthcare/observations',
    title: 'Health Observations',
    parent: 'healthcare',
    component: 'HealthObservations'
  },
  {
    id: 'healthcare-diagnoses',
    path: '/healthcare/diagnoses-allergies',
    title: 'Diagnoses & Allergies',
    parent: 'healthcare',
    component: 'DiagnosesAllergies'
  },
  {
    id: 'healthcare-risk-pbs',
    path: '/healthcare/risk-pbs',
    title: 'Risk & PBS',
    parent: 'healthcare',
    component: 'RiskPBS'
  },
  {
    id: 'healthcare-safeguarding',
    path: '/healthcare/safeguarding-incidents',
    title: 'Safeguarding & Incidents',
    parent: 'healthcare',
    component: 'SafeguardingIncidents'
  },
  {
    id: 'healthcare-portal',
    path: '/healthcare/service-user-portal',
    title: 'Service-User Portal',
    parent: 'healthcare',
    component: 'ServiceUserPortal'
  },
  {
    id: 'healthcare-reports',
    path: '/healthcare/reports-analytics',
    title: 'Healthcare Reports',
    parent: 'healthcare',
    component: 'HealthcareReports'
  },

  // Client Profile Routes
  {
    id: 'client-profile',
    path: '/clients/:clientId',
    title: 'Client Profile',
    component: 'ClientProfile'
  },
  {
    id: 'client-profile-general',
    path: '/clients/:clientId/profile/general',
    title: 'General Information',
    parent: 'client-profile',
    component: 'ClientProfileGeneral'
  },
  {
    id: 'client-profile-address',
    path: '/clients/:clientId/profile/address',
    title: 'Address & Room',
    parent: 'client-profile',
    component: 'ClientProfileAddress'
  },
  {
    id: 'client-profile-biography',
    path: '/clients/:clientId/profile/biography',
    title: 'Biography',
    parent: 'client-profile',
    component: 'ClientProfileBiography'
  },
  {
    id: 'client-careplan-overview',
    path: '/clients/:clientId/careplan',
    title: 'Care Plan Overview',
    parent: 'client-profile',
    component: 'ClientCarePlanOverview'
  },
  {
    id: 'client-careplan-accommodation',
    path: '/clients/:clientId/careplan/accommodation',
    title: 'Accommodation Cleanliness and Comfort',
    parent: 'client-careplan-overview',
    component: 'CarePlanAccommodation'
  },
  {
    id: 'client-assessments-overview',
    path: '/clients/:clientId/assessments',
    title: 'Assessments Overview',
    parent: 'client-profile',
    component: 'ClientAssessmentsOverview'
  },
  {
    id: 'client-assessments-clinical',
    path: '/clients/:clientId/assessments/clinical',
    title: 'Clinical History and Medical Condition',
    parent: 'client-assessments-overview',
    component: 'AssessmentClinical'
  },
  {
    id: 'client-assessments-diet-nutrition',
    path: '/clients/:clientId/assessments/diet-nutrition',
    title: 'Diet and Nutrition',
    parent: 'client-assessments-overview',
    component: 'AssessmentDietNutrition'
  },
  {
    id: 'client-assessments-allergies',
    path: '/clients/:clientId/assessments/allergies',
    title: 'Allergies and Intolerances',
    parent: 'client-assessments-overview',
    component: 'AssessmentAllergies'
  },

  // Workforce Routes
  {
    id: 'workforce',
    path: '/workforce',
    title: 'Workforce & HR',
    component: 'WorkforceDomain'
  },
  {
    id: 'workforce-overview',
    path: '/workforce/overview',
    title: 'Workforce Overview',
    parent: 'workforce',
    component: 'WorkforceOverview'
  },
  {
    id: 'workforce-scheduling',
    path: '/workforce/scheduling',
    title: 'Staff Scheduling',
    parent: 'workforce',
    component: 'StaffScheduling'
  },
  {
    id: 'workforce-rota',
    path: '/workforce/rota',
    title: '3D Interactive Rota',
    parent: 'workforce',
    component: 'RotaScheduler'
  },
  {
    id: 'workforce-training',
    path: '/workforce/training',
    title: 'Training & Development',
    parent: 'workforce',
    component: 'TrainingDevelopment'
  },
  {
    id: 'workforce-performance',
    path: '/workforce/performance',
    title: 'Performance Management',
    parent: 'workforce',
    component: 'PerformanceManagement'
  },

  // Staff Profile Routes
  {
    id: 'staff-profile',
    path: '/staff/:staffId',
    title: 'Staff Profile',
    component: 'StaffProfile'
  },
  {
    id: 'staff-profile-general',
    path: '/staff/:staffId/profile/general',
    title: 'General Information',
    parent: 'staff-profile',
    component: 'StaffProfileGeneral'
  },
  {
    id: 'staff-training-overview',
    path: '/staff/:staffId/training',
    title: 'Training Overview',
    parent: 'staff-profile',
    component: 'StaffTrainingOverview'
  },

  // Finance Operations Routes
  {
    id: 'finance-operations',
    path: '/finance-operations',
    title: 'Finance & Operations',
    component: 'FinanceOperationsDomain'
  },
  {
    id: 'finance-invoicing',
    path: '/finance-operations/invoicing-billing',
    title: 'Invoicing & Billing',
    parent: 'finance-operations',
    component: 'InvoicingBilling'
  },
  {
    id: 'finance-client-money',
    path: '/finance-operations/client-money',
    title: 'Client Money Management',
    parent: 'finance-operations',
    component: 'ClientMoneyManagement'
  },
  {
    id: 'finance-funding',
    path: '/finance-operations/funding-packages',
    title: 'Funding Packages',
    parent: 'finance-operations',
    component: 'FundingPackages'
  },
  {
    id: 'finance-payroll',
    path: '/finance-operations/payroll-exports',
    title: 'Payroll Exports',
    parent: 'finance-operations',
    component: 'PayrollExports'
  },
  {
    id: 'finance-budget',
    path: '/finance-operations/budget-variance',
    title: 'Budget Variance Analysis',
    parent: 'finance-operations',
    component: 'BudgetVariance'
  },
  {
    id: 'finance-inventory',
    path: '/finance-operations/ae-inventory',
    title: 'AE Inventory System',
    parent: 'finance-operations',
    component: 'AEInventoryDomain'
  },
  {
    id: 'finance-procurement',
    path: '/finance-operations/procurement',
    title: 'Procurement Management',
    parent: 'finance-operations',
    component: 'ProcurementManagement'
  },
  {
    id: 'finance-analytics',
    path: '/finance-operations/analytics',
    title: 'Financial Analytics',
    parent: 'finance-operations',
    component: 'FinancialAnalytics'
  },

  // Quality Intelligence Routes
  {
    id: 'quality-intelligence',
    path: '/quality-intelligence',
    title: 'Quality & Intelligence',
    component: 'QualityComplianceDomain'
  },
  {
    id: 'quality-qcs-policies',
    path: '/quality-intelligence/qcs-policies',
    title: 'QCS Policies',
    parent: 'quality-intelligence',
    component: 'QCSPolicies'
  },
  {
    id: 'quality-audits',
    path: '/quality-intelligence/audits',
    title: 'Quality Audits',
    parent: 'quality-intelligence',
    component: 'QualityAudits'
  },
  {
    id: 'quality-risk-register',
    path: '/quality-intelligence/risk-register',
    title: 'Risk Register',
    parent: 'quality-intelligence',
    component: 'RiskRegister'
  },
  {
    id: 'quality-cqc-evidence',
    path: '/quality-intelligence/cqc-evidence',
    title: 'CQC Evidence Packs',
    parent: 'quality-intelligence',
    component: 'CQCEvidence'
  },
  {
    id: 'quality-action-plans',
    path: '/quality-intelligence/action-plans',
    title: 'Action Plans',
    parent: 'quality-intelligence',
    component: 'ActionPlans'
  },
  {
    id: 'quality-analytics',
    path: '/quality-intelligence/analytics-dashboards',
    title: 'Quality Analytics',
    parent: 'quality-intelligence',
    component: 'QualityAnalytics'
  },
  {
    id: 'quality-predictive-ai',
    path: '/quality-intelligence/predictive-ai',
    title: 'Predictive AI',
    parent: 'quality-intelligence',
    component: 'PredictiveAI'
  },
  {
    id: 'quality-commissioner-reports',
    path: '/quality-intelligence/commissioner-reports',
    title: 'Commissioner Reports',
    parent: 'quality-intelligence',
    component: 'CommissionerReports'
  },
  {
    id: 'quality-community-family',
    path: '/quality-intelligence/community-family',
    title: 'Community & Family',
    parent: 'quality-intelligence',
    component: 'CommunityFamily'
  },

  // Admin Routes
  {
    id: 'admin',
    path: '/admin',
    title: 'Administration',
    component: 'AdminDomain'
  },
  {
    id: 'admin-overview',
    path: '/admin/overview',
    title: 'Admin Overview',
    parent: 'admin',
    component: 'AdminOverview'
  },
  {
    id: 'admin-general',
    path: '/admin/general',
    title: 'General Settings',
    parent: 'admin',
    component: 'AdminGeneral'
  },
  {
    id: 'admin-carers',
    path: '/admin/carers',
    title: 'Staff Management',
    parent: 'admin',
    component: 'AdminStaff'
  },
  {
    id: 'admin-clients',
    path: '/admin/clients',
    title: 'Client Management',
    parent: 'admin',
    component: 'AdminClients'
  },
  {
    id: 'admin-audit',
    path: '/admin/audit',
    title: 'Audit Trails',
    parent: 'admin',
    component: 'AdminAudit'
  },
  {
    id: 'admin-appointments',
    path: '/admin/appointments',
    title: 'Appointment Settings',
    parent: 'admin',
    component: 'AdminAppointments'
  },

  // AI Hub Routes
  {
    id: 'ai-hub',
    path: '/ai-hub',
    title: 'AEGIS AI Hub',
    component: 'AegisAIHubDomain'
  },
  {
    id: 'ai-hub-copilot',
    path: '/ai-hub/ae-copilot',
    title: 'AE Co-Pilot',
    parent: 'ai-hub',
    component: 'AECoPilotAgent'
  },
  {
    id: 'ai-hub-finance',
    path: '/ai-hub/finance-agent',
    title: 'Finance AI Agent',
    parent: 'ai-hub',
    component: 'FinanceAIAgent'
  },
  {
    id: 'ai-hub-clinical',
    path: '/ai-hub/clinical-agent',
    title: 'Clinical AI Agent',
    parent: 'ai-hub',
    component: 'ClinicalAIAgent'
  },
  {
    id: 'ai-hub-workforce',
    path: '/ai-hub/workforce-agent',
    title: 'Workforce AI Agent',
    parent: 'ai-hub',
    component: 'WorkforceAIAgent'
  },
  {
    id: 'ai-hub-quality',
    path: '/ai-hub/quality-agent',
    title: 'Quality AI Agent',
    parent: 'ai-hub',
    component: 'QualityAIAgent'
  },
  {
    id: 'ai-hub-llm-selector',
    path: '/ai-hub/llm-selector',
    title: 'LLM Selector',
    parent: 'ai-hub',
    component: 'LLMSelectorAgent'
  },
  {
    id: 'ai-hub-audit-trail',
    path: '/ai-hub/audit-trail',
    title: 'AI Audit Trail',
    parent: 'ai-hub',
    component: 'AuditTrailAgent'
  },
  {
    id: 'ai-hub-quick-actions',
    path: '/ai-hub/quick-actions',
    title: 'AI Quick Actions',
    parent: 'ai-hub',
    component: 'AIQuickActions'
  }
];

// Navigation State Management
export class NavigationManager {
  private state: NavigationState = {
    currentRoute: 'command-centre',
    routeHistory: [],
    routeParams: {},
    contextData: {}
  };

  private listeners: ((state: NavigationState) => void)[] = [];

  navigate(routeId: string, params?: Record<string, any>, contextData?: Record<string, any>) {
    const route = NAVIGATION_ROUTES.find(r => r.id === routeId);
    if (!route) {
      console.warn(`Route not found: ${routeId}`);
      return;
    }

    this.state = {
      currentRoute: routeId,
      previousRoute: this.state.currentRoute,
      routeHistory: [...this.state.routeHistory, this.state.currentRoute],
      routeParams: params || {},
      contextData: contextData || {}
    };

    this.notifyListeners();
  }

  goBack() {
    if (this.state.routeHistory.length > 0) {
      const previousRoute = this.state.routeHistory.pop()!;
      this.navigate(previousRoute);
    }
  }

  getCurrentRoute() {
    return NAVIGATION_ROUTES.find(r => r.id === this.state.currentRoute);
  }

  getBreadcrumbs() {
    const currentRoute = this.getCurrentRoute();
    if (!currentRoute) return [];

    const breadcrumbs: NavigationRoute[] = [];
    let route = currentRoute;

    while (route) {
      breadcrumbs.unshift(route);
      if (route.parent) {
        route = NAVIGATION_ROUTES.find(r => r.id === route.parent);
      } else {
        break;
      }
    }

    return breadcrumbs;
  }

  getState() {
    return this.state;
  }

  subscribe(listener: (state: NavigationState) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.state));
  }
}

export const navigationManager = new NavigationManager();

// Navigation Utilities
export function buildRoute(routeId: string, params?: Record<string, any>): string {
  const route = NAVIGATION_ROUTES.find(r => r.id === routeId);
  if (!route) return '/';

  let path = route.path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      path = path.replace(`:${key}`, value.toString());
    });
  }
  return path;
}

export function getRouteByPath(path: string): NavigationRoute | undefined {
  return NAVIGATION_ROUTES.find(route => {
    const routePattern = route.path.replace(/:[^/]+/g, '[^/]+');
    const regex = new RegExp(`^${routePattern}$`);
    return regex.test(path);
  });
}

export function extractRouteParams(routePath: string, actualPath: string): Record<string, string> {
  const routeParts = routePath.split('/');
  const actualParts = actualPath.split('/');
  const params: Record<string, string> = {};

  routeParts.forEach((part, index) => {
    if (part.startsWith(':')) {
      const paramName = part.substring(1);
      params[paramName] = actualParts[index];
    }
  });

  return params;
}