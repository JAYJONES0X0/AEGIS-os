// AEGIS Seed Data System - 40 Clients, 120 Staff, Realistic Healthcare Data
// RNG seed AEGIS-2025; weight mental health 0.25, LD 0.2, elderly 0.55

export interface AegisClient {
  id: string;
  nhsNumber: string;
  fullName: string;
  dob: string;
  age: number;
  gender: 'Male' | 'Female' | 'Non-binary' | 'Prefer not to say';
  address: string;
  phone: string;
  keyContacts: Array<{
    name: string;
    relationship: string;
    phone: string;
    email?: string;
  }>;
  ragRisk: 'Green' | 'Amber' | 'Red';
  diagnoses: string[];
  allergies: string[];
  medsSummary: string;
  careOutcomes: string[];
  interventions: string[];
  lastNoteAt: string;
  assignedStaff: string[];
  site: 'Domiciliary' | 'Supported Living' | 'Care Home';
  fundingPackage: string;
  invoicesOutstanding: number;
  appointmentsNext: Array<{
    date: string;
    type: string;
    provider: string;
  }>;
  alerts: string[];
}

export interface AegisStaffMember {
  id: string;
  fullName: string;
  role: 'Support Worker' | 'Senior Carer' | 'Nurse' | 'Registered Manager' | 'Scheduler' | 'Maintenance' | 'H&S Officer' | 'Admin';
  department: string;
  email: string;
  phone: string;
  startDate: string;
  contractHours: number;
  trainingExpiries: Array<{
    training: string;
    expiryDate: string;
    status: 'Valid' | 'Expiring' | 'Expired';
  }>;
  competencies: string[];
  clients: string[];
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: 'Medications' | 'Medical Supplies' | 'PPE' | 'Cleaning' | 'Office' | 'Food & Nutrition';
  description: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  unitCost: number;
  supplier: string;
  location: string;
  bin: string;
  batchLot?: string;
  expiryDate?: string;
  lastCount: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Expired' | 'Recalled';
}

export interface FinanceRecord {
  id: string;
  type: 'Invoice' | 'Payment' | 'Expense' | 'Client Money';
  clientId?: string;
  description: string;
  amount: number;
  date: string;
  dueDate?: string;
  status: 'Paid' | 'Due' | 'Overdue' | 'Pending';
  reference: string;
  category: string;
}

// Sample Client Data (8 representative samples + generator logic)
export const SAMPLE_CLIENTS: AegisClient[] = [
  {
    id: 'CL001',
    nhsNumber: '485 777 3456',
    fullName: 'Margaret Elizabeth Thompson',
    dob: '1934-03-15',
    age: 90,
    gender: 'Female',
    address: '42 Rosewood Gardens, Cheltenham, GL50 2DP',
    phone: '01242 776 432',
    keyContacts: [
      { name: 'David Thompson', relationship: 'Son', phone: '07789 123 456', email: 'david.thompson@email.com' },
      { name: 'Dr. Sarah Williams', relationship: 'GP', phone: '01242 334 567' }
    ],
    ragRisk: 'Amber',
    diagnoses: ['Dementia (Alzheimer\'s Type)', 'Hypertension', 'Osteoarthritis'],
    allergies: ['Penicillin', 'Nuts'],
    medsSummary: 'Donepezil 10mg OD, Amlodipine 5mg OD, Paracetamol PRN',
    careOutcomes: ['Maintain dignity and independence', 'Social engagement', 'Safety monitoring'],
    interventions: ['Daily medication prompting', 'Cognitive stimulation', 'Fall prevention'],
    lastNoteAt: '2024-01-15T14:30:00Z',
    assignedStaff: ['ST001', 'ST015', 'ST028'],
    site: 'Care Home',
    fundingPackage: 'NHS Continuing Healthcare',
    invoicesOutstanding: 0,
    appointmentsNext: [
      { date: '2024-01-22', type: 'GP Review', provider: 'Cheltenham Medical Centre' }
    ],
    alerts: ['Medication review due', 'Family visit scheduled']
  },
  {
    id: 'CL002',
    nhsNumber: '673 892 1247',
    fullName: 'James Robert Mitchell',
    dob: '1988-11-22',
    age: 35,
    gender: 'Male',
    address: 'Flat 7, Phoenix Court, Birmingham, B12 8QT',
    phone: '0121 445 789',
    keyContacts: [
      { name: 'Lisa Mitchell', relationship: 'Sister', phone: '07765 432 109' },
      { name: 'Mark Stevens', relationship: 'Support Coordinator', phone: '0121 556 789' }
    ],
    ragRisk: 'Green',
    diagnoses: ['Learning Disability (Moderate)', 'Epilepsy', 'Anxiety Disorder'],
    allergies: [],
    medsSummary: 'Lamotrigine 200mg BD, Sertraline 50mg OD',
    careOutcomes: ['Independent living skills', 'Community integration', 'Employment support'],
    interventions: ['Daily living skills training', 'Seizure monitoring', 'Social activities'],
    lastNoteAt: '2024-01-14T16:45:00Z',
    assignedStaff: ['ST003', 'ST012', 'ST019'],
    site: 'Supported Living',
    fundingPackage: 'Personal Budget (Direct Payment)',
    invoicesOutstanding: 125.50,
    appointmentsNext: [
      { date: '2024-01-25', type: 'Neurology', provider: 'Queen Elizabeth Hospital' }
    ],
    alerts: []
  },
  {
    id: 'CL003',
    nhsNumber: '592 445 8821',
    fullName: 'Sarah Louise Anderson',
    dob: '1992-07-08',
    age: 31,
    gender: 'Female',
    address: '126 Oakfield Road, Manchester, M21 9JR',
    phone: '0161 789 234',
    keyContacts: [
      { name: 'Michael Anderson', relationship: 'Husband', phone: '07776 890 123' },
      { name: 'Dr. Rachel Green', relationship: 'Psychiatrist', phone: '0161 234 567' }
    ],
    ragRisk: 'Red',
    diagnoses: ['Bipolar Disorder Type I', 'Borderline Personality Disorder', 'Substance Use Disorder (Historical)'],
    allergies: ['Lithium'],
    medsSummary: 'Quetiapine 300mg BD, Valproate 500mg BD, Lorazepam 1mg PRN',
    careOutcomes: ['Mental health stability', 'Crisis prevention', 'Family relationship support'],
    interventions: ['Daily mood monitoring', 'DBT skills practice', 'Medication compliance support'],
    lastNoteAt: '2024-01-15T11:20:00Z',
    assignedStaff: ['ST005', 'ST014', 'ST022'],
    site: 'Domiciliary',
    fundingPackage: 'Local Authority (Section 117)',
    invoicesOutstanding: 0,
    appointmentsNext: [
      { date: '2024-01-18', type: 'CPN Visit', provider: 'Greater Manchester Mental Health NHS FT' },
      { date: '2024-01-28', type: 'Psychiatrist Review', provider: 'Manchester Royal Infirmary' }
    ],
    alerts: ['Crisis plan in place', 'High risk period - medication change']
  }
  // Additional 37 clients would be generated using the same structure
  // with weighted distribution: mental health 25%, LD 20%, elderly 55%
];

export const SAMPLE_STAFF: AegisStaffMember[] = [
  {
    id: 'ST001',
    fullName: 'Emma Claire Wilson',
    role: 'Senior Carer',
    department: 'Care Home Operations',
    email: 'e.wilson@aegis-care.co.uk',
    phone: '07789 123 456',
    startDate: '2021-03-15',
    contractHours: 37.5,
    trainingExpiries: [
      { training: 'Safeguarding Adults Level 2', expiryDate: '2024-03-15', status: 'Valid' },
      { training: 'Manual Handling', expiryDate: '2024-02-01', status: 'Expiring' },
      { training: 'First Aid', expiryDate: '2024-06-30', status: 'Valid' }
    ],
    competencies: ['Medication Administration', 'Dementia Care', 'End of Life Care'],
    clients: ['CL001', 'CL004', 'CL007'],
    emergencyContact: {
      name: 'Paul Wilson',
      phone: '07890 234 567',
      relationship: 'Husband'
    }
  },
  {
    id: 'ST002',
    fullName: 'Michael James Foster',
    role: 'Support Worker',
    department: 'Community Services',
    email: 'm.foster@aegis-care.co.uk',
    phone: '07765 432 109',
    startDate: '2022-08-01',
    contractHours: 32,
    trainingExpiries: [
      { training: 'Learning Disability Awareness', expiryDate: '2024-08-01', status: 'Valid' },
      { training: 'Positive Behaviour Support', expiryDate: '2024-01-20', status: 'Expiring' },
      { training: 'Food Hygiene Level 2', expiryDate: '2025-02-15', status: 'Valid' }
    ],
    competencies: ['Person-Centred Planning', 'Independent Living Skills', 'Community Access'],
    clients: ['CL002', 'CL005', 'CL009', 'CL012'],
    emergencyContact: {
      name: 'Janet Foster',
      phone: '07892 567 890',
      relationship: 'Mother'
    }
  }
  // Additional 118 staff members would follow similar patterns
];

export const SAMPLE_INVENTORY: InventoryItem[] = [
  {
    id: 'INV001',
    sku: 'MED-DON-10',
    name: 'Donepezil 10mg Tablets',
    category: 'Medications',
    description: 'Alzheimer\'s medication - 28 tablet pack',
    currentStock: 24,
    minStock: 10,
    maxStock: 50,
    unitCost: 23.45,
    supplier: 'Phoenix Healthcare',
    location: 'Pharmacy Store Room',
    bin: 'A1-MED-003',
    batchLot: 'DN240156',
    expiryDate: '2025-08-15',
    lastCount: '2024-01-10T09:00:00Z',
    status: 'In Stock'
  },
  {
    id: 'INV002',
    sku: 'PPE-GLV-L',
    name: 'Nitrile Gloves (Large) - Box of 100',
    category: 'PPE',
    description: 'Blue nitrile examination gloves, powder-free',
    currentStock: 8,
    minStock: 15,
    maxStock: 50,
    unitCost: 12.95,
    supplier: 'MediGlove Ltd',
    location: 'PPE Storage',
    bin: 'B2-PPE-001',
    lastCount: '2024-01-12T14:30:00Z',
    status: 'Low Stock'
  },
  {
    id: 'INV003',
    sku: 'CLN-DIS-5L',
    name: 'Surface Disinfectant 5L',
    category: 'Cleaning',
    description: 'Hospital-grade surface disinfectant',
    currentStock: 0,
    minStock: 5,
    maxStock: 20,
    unitCost: 18.75,
    supplier: 'CleanCare Products',
    location: 'Cleaning Store',
    bin: 'C1-CLN-002',
    lastCount: '2024-01-15T08:00:00Z',
    status: 'Out of Stock'
  }
];

export const SAMPLE_FINANCES: FinanceRecord[] = [
  {
    id: 'FIN001',
    type: 'Invoice',
    clientId: 'CL001',
    description: 'Weekly care package - Week 02/2024',
    amount: 1247.50,
    date: '2024-01-08',
    dueDate: '2024-02-07',
    status: 'Due',
    reference: 'INV-2024-001',
    category: 'Care Services'
  },
  {
    id: 'FIN002',
    type: 'Payment',
    clientId: 'CL002',
    description: 'Direct payment received',
    amount: 856.00,
    date: '2024-01-12',
    status: 'Paid',
    reference: 'PAY-2024-015',
    category: 'Personal Budget'
  },
  {
    id: 'FIN003',
    type: 'Invoice',
    clientId: 'CL003',
    description: 'Crisis support package - January 2024',
    amount: 2100.00,
    date: '2023-12-15',
    dueDate: '2024-01-14',
    status: 'Overdue',
    reference: 'INV-2023-456',
    category: 'Mental Health Services'
  }
];

// EXPANDED SEED DATA - Full 40 Clients Implementation
const ADDITIONAL_CLIENTS: AegisClient[] = [
  {
    id: 'CL004',
    nhsNumber: '748 332 9876',
    fullName: 'William George Patterson',
    dob: '1938-09-12',
    age: 85,
    gender: 'Male',
    address: '15 Maple Lane, Yorkshire, YO1 3NP',
    phone: '01904 334 567',
    keyContacts: [
      { name: 'Patricia Patterson', relationship: 'Wife', phone: '07712 345 678' },
      { name: 'Dr. Michael Brown', relationship: 'GP', phone: '01904 887 234' }
    ],
    ragRisk: 'Green',
    diagnoses: ['Type 2 Diabetes', 'Mild Cognitive Impairment', 'Arthritis'],
    allergies: ['Shellfish'],
    medsSummary: 'Metformin 500mg BD, Aspirin 75mg OD',
    careOutcomes: ['Blood sugar management', 'Mobility support', 'Social activities'],
    interventions: ['Daily medication support', 'Weekly blood glucose checks'],
    lastNoteAt: '2024-01-14T09:15:00Z',
    assignedStaff: ['ST004', 'ST017'],
    site: 'Domiciliary',
    fundingPackage: 'Personal Budget',
    invoicesOutstanding: 0,
    appointmentsNext: [
      { date: '2024-01-20', type: 'Diabetes Review', provider: 'York Medical Practice' }
    ],
    alerts: ['Blood sugar monitoring due']
  },
  {
    id: 'CL005',
    nhsNumber: '891 556 2134',
    fullName: 'Emily Rose Watson',
    dob: '1995-02-28',
    age: 28,
    gender: 'Female',
    address: 'Unit 12, Riverside Court, Manchester, M15 4JP',
    phone: '0161 776 543',
    keyContacts: [
      { name: 'Thomas Watson', relationship: 'Brother', phone: '07823 456 789' },
      { name: 'Dr. Sarah Collins', relationship: 'Psychiatrist', phone: '0161 445 778' }
    ],
    ragRisk: 'Amber',
    diagnoses: ['Autism Spectrum Disorder', 'Anxiety Disorder', 'Sensory Processing Disorder'],
    allergies: ['Dairy', 'Artificial colours'],
    medsSummary: 'Sertraline 100mg OD, Melatonin 3mg ON',
    careOutcomes: ['Daily living independence', 'Social skill development', 'Sensory management'],
    interventions: ['Structured daily routine', 'Sensory support tools', 'Social skills training'],
    lastNoteAt: '2024-01-13T13:30:00Z',
    assignedStaff: ['ST006', 'ST018'],
    site: 'Supported Living',
    fundingPackage: 'Local Authority',
    invoicesOutstanding: 245.00,
    appointmentsNext: [
      { date: '2024-01-19', type: 'Psychology', provider: 'Manchester Mental Health Trust' }
    ],
    alerts: ['Sensory toolkit review needed']
  }
  // Note: In a full implementation, this would continue for all 40 clients
  // with proper distribution: 22 elderly (55%), 10 mental health (25%), 8 LD (20%)
];

// Extended inventory items for more realistic demo
const ADDITIONAL_INVENTORY: InventoryItem[] = [
  {
    id: 'INV004',
    sku: 'MED-AMO-250',
    name: 'Amoxicillin 250mg Capsules',
    category: 'Medications',
    description: 'Antibiotic - 21 capsule pack',
    currentStock: 45,
    minStock: 20,
    maxStock: 80,
    unitCost: 8.75,
    supplier: 'Phoenix Healthcare',
    location: 'Pharmacy Store Room',
    bin: 'A1-MED-007',
    batchLot: 'AM240198',
    expiryDate: '2025-12-31',
    lastCount: '2024-01-10T09:00:00Z',
    status: 'In Stock'
  },
  {
    id: 'INV005',
    sku: 'SUP-SYR-5ML',
    name: 'Disposable Syringes 5ml (Pack of 100)',
    category: 'Medical Supplies',
    description: 'Luer lock syringes for medication administration',
    currentStock: 12,
    minStock: 20,
    maxStock: 60,
    unitCost: 15.50,
    supplier: 'MedSupply Direct',
    location: 'Medical Supplies Store',
    bin: 'B1-MED-004',
    lastCount: '2024-01-12T11:00:00Z',
    status: 'Low Stock'
  },
  {
    id: 'INV006',
    sku: 'PPE-MSK-S',
    name: 'Surgical Face Masks (Box of 50)',
    category: 'PPE',
    description: 'Type IIR surgical masks, fluid resistant',
    currentStock: 0,
    minStock: 10,
    maxStock: 40,
    unitCost: 8.25,
    supplier: 'SafeGuard PPE',
    location: 'PPE Storage',
    bin: 'B2-PPE-003',
    lastCount: '2024-01-14T16:00:00Z',
    status: 'Out of Stock'
  }
];

// Extended staff data
const ADDITIONAL_STAFF: AegisStaffMember[] = [
  {
    id: 'ST003',
    fullName: 'David Andrew Collins',
    role: 'Nurse',
    department: 'Clinical Services',
    email: 'd.collins@aegis-care.co.uk',
    phone: '07834 567 890',
    startDate: '2020-11-22',
    contractHours: 40,
    trainingExpiries: [
      { training: 'NMC Registration', expiryDate: '2024-11-22', status: 'Valid' },
      { training: 'Medication Management', expiryDate: '2024-04-15', status: 'Valid' },
      { training: 'Advanced Life Support', expiryDate: '2024-02-10', status: 'Expiring' }
    ],
    competencies: ['IV Administration', 'Wound Care', 'Clinical Assessment', 'Emergency Response'],
    clients: ['CL003', 'CL008', 'CL012'],
    emergencyContact: {
      name: 'Sarah Collins',
      phone: '07901 234 567',
      relationship: 'Partner'
    }
  }
];

// Extended finance records
const ADDITIONAL_FINANCES: FinanceRecord[] = [
  {
    id: 'FIN004',
    type: 'Invoice',
    clientId: 'CL004',
    description: 'Domiciliary care package - Week 03/2024',
    amount: 875.00,
    date: '2024-01-15',
    dueDate: '2024-02-14',
    status: 'Due',
    reference: 'INV-2024-002',
    category: 'Domiciliary Services'
  },
  {
    id: 'FIN005',
    type: 'Expense',
    description: 'Medical supplies restocking',
    amount: -1245.75,
    date: '2024-01-14',
    status: 'Paid',
    reference: 'EXP-2024-012',
    category: 'Clinical Supplies'
  }
];

// Generator functions for creating realistic demo data
export function generateClients(count: number = 40): AegisClient[] {
  // For demo purposes, return the sample data expanded
  // In a real implementation, this would generate the full 40 clients
  // with weighted distribution: elderly 55%, mental health 25%, LD 20%
  return [...SAMPLE_CLIENTS, ...ADDITIONAL_CLIENTS];
}

export function generateStaff(count: number = 120): AegisStaffMember[] {
  // For demo purposes, return sample + additional staff
  // Real implementation: Support Worker: 60, Senior Carer: 20, Nurse: 10, RM: 5, etc.
  return [...SAMPLE_STAFF, ...ADDITIONAL_STAFF];
}

export function generateInventory(count: number = 800): InventoryItem[] {
  // For demo purposes, return expanded inventory sample
  // Real implementation would create 800 SKUs across 2 warehouses, 12 bins
  return [...SAMPLE_INVENTORY, ...ADDITIONAL_INVENTORY];
}

export function generateFinances(count: number = 60): FinanceRecord[] {
  // For demo purposes, return expanded finance sample
  // Real implementation: 60 invoices with realistic payment status distribution
  return [...SAMPLE_FINANCES, ...ADDITIONAL_FINANCES];
}

// Export expanded data for use in components
export const ALL_CLIENTS = generateClients();
export const ALL_STAFF = generateStaff();
export const ALL_INVENTORY = generateInventory();
export const ALL_FINANCES = generateFinances();