// AEGIS Expanded Mock Data with AE Branding - Interactive Care Management System

export const mockUser = {
  id: "usr_001",
  name: "Marcus Sterling AE",
  role: "Registered Manager", 
  avatar: "/api/placeholder/40/40",
  email: "m.sterling@aegiscare.co.uk",
  location: "Hazelbury House",
  shift: "Day Shift",
  permissions: ["all_access"],
  lastLogin: "2024-12-30 09:15:00"
};

// Enhanced Staff Data with AE Branding - Interactive Profiles
export const mockStaffProfiles = [
  {
    id: "staff_001",
    initials: "BR",
    name: "Brooklyn Rodriguez AE",
    role: "Registered Manager",
    status: "On Duty",
    statusColor: "success" as const,
    avatar: "/api/placeholder/80/80",
    email: "b.rodriguez@aegiscare.co.uk", 
    mobile: "07123 456789",
    landline: "01234 567890",
    address: "317 Two Mile Hill Road, Kingswood, BS15 1AP",
    startDate: "29/04/2024",
    jobTitle: "Registered Manager",
    travelMethod: "Driving",
    regions: ["Hazelbury House", "Station House", "Laurel House"],
    
    // Hours & Schedule
    hoursThisWeek: 37.5,
    hoursThisMonth: 152,
    hoursYearToDate: 1825,
    nextShift: "Tomorrow 8:00 AM - 6:00 PM",
    lastWorked: "Today 8:00 AM - 6:00 PM",
    
    // Certifications & Training
    certifications: ["Level 5 Management", "Safeguarding Adults", "First Aid", "Fire Safety"],
    training: {
      completed: 12,
      required: 15,
      overdue: 1,
      modules: [
        { name: "AE Safeguarding Adults", status: "completed", expiryDate: "2025-03-15" },
        { name: "AE Leadership Excellence", status: "completed", expiryDate: "2025-01-20" },
        { name: "AE Manual Handling", status: "overdue", expiryDate: "2024-11-30" },
        { name: "AE Medication Management", status: "required", dueDate: "2025-02-15" }
      ]
    },
    
    // Performance Metrics
    performance: {
      rating: 4.8,
      reliability: 98,
      clientSatisfaction: 95,
      teamFeedback: 4.7,
      punctuality: 99
    },
    
    // Schedule Details
    weekSchedule: [
      { day: "Monday", shift: "8:00 AM - 6:00 PM", hours: 10, location: "Hazelbury House" },
      { day: "Tuesday", shift: "8:00 AM - 6:00 PM", hours: 10, location: "Station House" },
      { day: "Wednesday", shift: "Off", hours: 0, location: "" },
      { day: "Thursday", shift: "8:00 AM - 6:00 PM", hours: 10, location: "Hazelbury House" },
      { day: "Friday", shift: "8:00 AM - 1:00 PM", hours: 5, location: "Laurel House" },
      { day: "Saturday", shift: "Off", hours: 0, location: "" },
      { day: "Sunday", shift: "2:30 PM - 6:00 PM", hours: 3.5, location: "On Call" }
    ]
  },
  {
    id: "staff_002", 
    initials: "SM",
    name: "Sarah Mitchell AE",
    role: "Deputy Manager",
    status: "On Duty",
    statusColor: "success" as const,
    avatar: "/api/placeholder/80/80",
    email: "s.mitchell@aegiscare.co.uk",
    mobile: "07234 567890",
    landline: "01234 678901",
    address: "45 Park Avenue, Bristol, BS7 8QR",
    startDate: "15/02/2024",
    jobTitle: "Deputy Manager",
    travelMethod: "Public Transport",
    regions: ["Hazelbury House", "Cottrell House"],
    
    hoursThisWeek: 40,
    hoursThisMonth: 160,
    hoursYearToDate: 1520,
    nextShift: "Today 2:00 PM - 10:00 PM",
    lastWorked: "Yesterday 2:00 PM - 10:00 PM",
    
    certifications: ["Level 4 Health & Social Care", "Medication Management", "Mental Health First Aid"],
    training: {
      completed: 14,
      required: 15,
      overdue: 0,
      modules: [
        { name: "AE Deputy Management", status: "completed", expiryDate: "2025-04-10" },
        { name: "AE Clinical Governance", status: "completed", expiryDate: "2025-02-28" },
        { name: "AE Team Leadership", status: "required", dueDate: "2025-01-30" }
      ]
    },
    
    performance: {
      rating: 4.6,
      reliability: 96,
      clientSatisfaction: 93,
      teamFeedback: 4.4,
      punctuality: 97
    },
    
    weekSchedule: [
      { day: "Monday", shift: "2:00 PM - 10:00 PM", hours: 8, location: "Hazelbury House" },
      { day: "Tuesday", shift: "2:00 PM - 10:00 PM", hours: 8, location: "Cottrell House" },
      { day: "Wednesday", shift: "2:00 PM - 10:00 PM", hours: 8, location: "Hazelbury House" },
      { day: "Thursday", shift: "2:00 PM - 10:00 PM", hours: 8, location: "Cottrell House" },
      { day: "Friday", shift: "2:00 PM - 10:00 PM", hours: 8, location: "Hazelbury House" },
      { day: "Saturday", shift: "Off", hours: 0, location: "" },
      { day: "Sunday", shift: "Off", hours: 0, location: "" }
    ]
  },
  {
    id: "staff_003",
    initials: "JP",
    name: "James Patterson AE", 
    role: "Clinical Lead",
    status: "On Duty",
    statusColor: "success" as const,
    avatar: "/api/placeholder/80/80",
    email: "j.patterson@aegiscare.co.uk",
    mobile: "07345 678901",
    landline: "01234 789012",
    address: "22 Gloucester Road, Bath, BA1 7BH",
    startDate: "08/01/2024",
    jobTitle: "Clinical Lead",
    travelMethod: "Driving",
    regions: ["Newton House", "Glenfrome House", "Woburn House"],
    
    hoursThisWeek: 42,
    hoursThisMonth: 168,
    hoursYearToDate: 2016,
    nextShift: "Today 10:00 PM - 8:00 AM",
    lastWorked: "Today 6:00 AM - 2:00 PM",
    
    certifications: ["RGN", "Tissue Viability", "Palliative Care", "Clinical Leadership"],
    training: {
      completed: 18,
      required: 20,
      overdue: 0,
      modules: [
        { name: "AE Advanced Clinical Practice", status: "completed", expiryDate: "2025-06-15" },
        { name: "AE Wound Care Specialist", status: "completed", expiryDate: "2025-03-20" },
        { name: "AE End of Life Care", status: "required", dueDate: "2025-02-10" },
        { name: "AE Clinical Research", status: "required", dueDate: "2025-03-05" }
      ]
    },
    
    performance: {
      rating: 4.9,
      reliability: 99,
      clientSatisfaction: 97,
      teamFeedback: 4.8,
      punctuality: 100
    },
    
    weekSchedule: [
      { day: "Monday", shift: "10:00 PM - 8:00 AM", hours: 10, location: "Newton House" },
      { day: "Tuesday", shift: "Off", hours: 0, location: "" },
      { day: "Wednesday", shift: "6:00 AM - 2:00 PM", hours: 8, location: "Glenfrome House" },
      { day: "Thursday", shift: "6:00 AM - 2:00 PM", hours: 8, location: "Woburn House" },
      { day: "Friday", shift: "6:00 AM - 2:00 PM", hours: 8, location: "Newton House" },
      { day: "Saturday", shift: "10:00 PM - 8:00 AM", hours: 10, location: "Glenfrome House" },
      { day: "Sunday", shift: "Off", hours: 0, location: "" }
    ]
  },
  {
    id: "staff_004",
    initials: "ET",
    name: "Emma Thompson AE",
    role: "Registered Nurse", 
    status: "On Duty",
    statusColor: "success" as const,
    avatar: "/api/placeholder/80/80",
    email: "e.thompson@aegiscare.co.uk",
    mobile: "07456 789012",
    landline: "01234 890123",
    address: "156 Wells Road, Bath, BA2 3AL",
    startDate: "12/03/2024",
    jobTitle: "Registered Nurse",
    travelMethod: "Driving",
    regions: ["Church House", "Tyndale House"],
    
    hoursThisWeek: 36,
    hoursThisMonth: 144,
    hoursYearToDate: 1296,
    nextShift: "Tomorrow 6:00 AM - 2:00 PM",
    lastWorked: "Yesterday 6:00 AM - 2:00 PM",
    
    certifications: ["RGN", "Infection Control", "Wound Care", "Diabetes Management"],
    training: {
      completed: 16,
      required: 18,
      overdue: 1,
      modules: [
        { name: "AE Nursing Excellence", status: "completed", expiryDate: "2025-05-12" },
        { name: "AE Infection Prevention", status: "completed", expiryDate: "2025-04-08" },
        { name: "AE Medication Safety", status: "overdue", expiryDate: "2024-12-15" },
        { name: "AE Patient Assessment", status: "required", dueDate: "2025-02-20" }
      ]
    },
    
    performance: {
      rating: 4.7,
      reliability: 97,
      clientSatisfaction: 94,
      teamFeedback: 4.5,
      punctuality: 98
    },
    
    weekSchedule: [
      { day: "Monday", shift: "6:00 AM - 2:00 PM", hours: 8, location: "Church House" },
      { day: "Tuesday", shift: "6:00 AM - 2:00 PM", hours: 8, location: "Tyndale House" },
      { day: "Wednesday", shift: "Off", hours: 0, location: "" },
      { day: "Thursday", shift: "6:00 AM - 2:00 PM", hours: 8, location: "Church House" },
      { day: "Friday", shift: "6:00 AM - 2:00 PM", hours: 8, location: "Tyndale House" },
      { day: "Saturday", shift: "6:00 AM - 10:00 AM", hours: 4, location: "Church House" },
      { day: "Sunday", shift: "Off", hours: 0, location: "" }
    ]
  },
  {
    id: "staff_005",
    initials: "MR", 
    name: "Michael Roberts AE",
    role: "Registered Nurse",
    status: "Off Duty",
    statusColor: "secondary" as const,
    avatar: "/api/placeholder/80/80",
    email: "m.roberts@aegiscare.co.uk",
    mobile: "07567 890123",
    landline: "01234 901234",
    address: "78 Roman Road, Bath, BA1 3QG",
    startDate: "25/05/2024",
    jobTitle: "Registered Nurse",
    travelMethod: "Bicycle",
    regions: ["Hazelbury Lodge", "Canterbury House"],
    
    hoursThisWeek: 0,
    hoursThisMonth: 120,
    hoursYearToDate: 840,
    nextShift: "Monday 7:00 AM - 3:00 PM",
    lastWorked: "Friday 7:00 AM - 3:00 PM",
    
    certifications: ["RGN", "Diabetes Care", "Moving & Handling", "Mental Health"],
    training: {
      completed: 15,
      required: 18,
      overdue: 2,
      modules: [
        { name: "AE Nursing Practice", status: "completed", expiryDate: "2025-07-18" },
        { name: "AE Manual Handling", status: "overdue", expiryDate: "2024-10-30" },
        { name: "AE Fire Safety", status: "overdue", expiryDate: "2024-11-15" },
        { name: "AE Safeguarding", status: "required", dueDate: "2025-01-25" }
      ]
    },
    
    performance: {
      rating: 4.4,
      reliability: 91,
      clientSatisfaction: 89,
      teamFeedback: 4.2,
      punctuality: 94
    },
    
    weekSchedule: [
      { day: "Monday", shift: "7:00 AM - 3:00 PM", hours: 8, location: "Hazelbury Lodge" },
      { day: "Tuesday", shift: "7:00 AM - 3:00 PM", hours: 8, location: "Canterbury House" },
      { day: "Wednesday", shift: "7:00 AM - 3:00 PM", hours: 8, location: "Hazelbury Lodge" },
      { day: "Thursday", shift: "Off", hours: 0, location: "" },
      { day: "Friday", shift: "7:00 AM - 3:00 PM", hours: 8, location: "Canterbury House" },
      { day: "Saturday", shift: "Off", hours: 0, location: "" },
      { day: "Sunday", shift: "Off", hours: 0, location: "" }
    ]
  },
  {
    id: "staff_006",
    initials: "LA",
    name: "Lisa Anderson AE",
    role: "Senior Nurse",
    status: "On Duty", 
    statusColor: "success" as const,
    avatar: "/api/placeholder/80/80",
    email: "l.anderson@aegiscare.co.uk",
    mobile: "07678 901234",
    landline: "01234 012345",
    address: "92 Churchill Way, Bristol, BS5 7HJ",
    startDate: "03/06/2024",
    jobTitle: "Senior Nurse",
    travelMethod: "Driving",
    regions: ["Lingfield House", "Old Bakery Flats"],
    
    hoursThisWeek: 39,
    hoursThisMonth: 156,
    hoursYearToDate: 1092,
    nextShift: "Today 6:00 PM - 10:00 PM",
    lastWorked: "Yesterday 2:00 PM - 10:00 PM",
    
    certifications: ["RGN", "Team Leadership", "Clinical Governance", "Quality Assurance"],
    training: {
      completed: 17,
      required: 18,
      overdue: 0,
      modules: [
        { name: "AE Senior Nursing", status: "completed", expiryDate: "2025-08-20" },
        { name: "AE Leadership Excellence", status: "completed", expiryDate: "2025-06-10" },
        { name: "AE Quality Management", status: "required", dueDate: "2025-03-15" }
      ]
    },
    
    performance: {
      rating: 4.8,
      reliability: 98,
      clientSatisfaction: 96,
      teamFeedback: 4.9,
      punctuality: 99
    },
    
    weekSchedule: [
      { day: "Monday", shift: "2:00 PM - 10:00 PM", hours: 8, location: "Lingfield House" },
      { day: "Tuesday", shift: "2:00 PM - 10:00 PM", hours: 8, location: "Old Bakery Flats" },
      { day: "Wednesday", shift: "2:00 PM - 10:00 PM", hours: 8, location: "Lingfield House" },
      { day: "Thursday", shift: "6:00 PM - 10:00 PM", hours: 4, location: "Old Bakery Flats" },
      { day: "Friday", shift: "2:00 PM - 10:00 PM", hours: 8, location: "Lingfield House" },
      { day: "Saturday", shift: "6:00 AM - 9:00 AM", hours: 3, location: "Lingfield House" },
      { day: "Sunday", shift: "Off", hours: 0, location: "" }
    ]
  }
];

// Enhanced Client Data with AE Branding
export const mockClientProfiles = [
  {
    id: "client_001",
    initials: "AA",
    name: "Arthur Andrews AE",
    age: 78,
    dob: "1946-03-15",
    room: "Room 12A",
    careLevel: "High Dependency",
    status: "Stable",
    statusColor: "success" as const,
    avatar: "/api/placeholder/80/80",
    address: "Hazelbury House, Bath, BA1 2AB", 
    nhsNumber: "123 456 7890",
    
    // Family & Contacts
    nextOfKin: "Margaret Andrews (Daughter)",
    nokPhone: "07123 987654",
    nokEmail: "margaret.andrews@email.com",
    gp: "Dr. Sarah Williams AE",
    gpPhone: "01234 567890",
    
    // Care Details
    careWorker: "Sarah Mitchell AE",
    careNeeds: ["Personal Care", "Medication Support", "Mobility Assistance"],
    allergies: ["AE-Penicillin", "Shellfish"],
    dietaryRequirements: ["Diabetic Diet", "Soft Food"],
    
    // Medications with AE branding
    medications: [
      { 
        name: "AE-Paracetamol", 
        dosage: "500mg", 
        frequency: "Twice daily", 
        time: "08:00, 20:00",
        prescriber: "Dr. Sarah Williams AE",
        startDate: "2024-01-15",
        reviewDate: "2025-01-15"
      },
      { 
        name: "AE-Lisinopril", 
        dosage: "10mg", 
        frequency: "Once daily", 
        time: "08:00",
        prescriber: "Dr. Sarah Williams AE", 
        startDate: "2024-02-01",
        reviewDate: "2025-02-01"
      },
      { 
        name: "AE-Metformin", 
        dosage: "850mg", 
        frequency: "Twice daily", 
        time: "08:00, 18:00",
        prescriber: "Dr. Sarah Williams AE",
        startDate: "2024-01-10", 
        reviewDate: "2025-01-10"
      }
    ],
    
    // Risk & Assessments
    riskLevel: "Medium",
    lastAssessment: "15/12/2024",
    nextAssessment: "15/03/2025",
    
    // Care Plan
    carePlanGoals: [
      "Maintain independence with mobility",
      "Stable blood sugar management", 
      "Social engagement activities"
    ],
    
    // Recent Notes
    recentNotes: [
      {
        date: "2024-12-30 14:30",
        author: "Sarah Mitchell AE",
        note: "Client cheerful today. Participated in morning activities. Blood pressure stable at 135/82."
      },
      {
        date: "2024-12-29 20:15", 
        author: "Emma Thompson AE",
        note: "Evening medications administered. Client reports feeling well. No concerns."
      }
    ]
  },
  {
    id: "client_002", 
    initials: "BC",
    name: "Betty Collins AE",
    age: 85,
    dob: "1939-07-22",
    room: "Room 8B",
    careLevel: "Standard Care",
    status: "Stable", 
    statusColor: "success" as const,
    avatar: "/api/placeholder/80/80",
    address: "Laurel House, Bath, BA2 4CD",
    nhsNumber: "234 567 8901",
    
    nextOfKin: "Robert Collins (Son)",
    nokPhone: "07234 876543",
    nokEmail: "robert.collins@email.com",
    gp: "Dr. James Morgan AE",
    gpPhone: "01234 678901",
    
    careWorker: "Emma Thompson AE",
    careNeeds: ["Medication Support", "Social Interaction", "Light Personal Care"],
    allergies: ["None Known"],
    dietaryRequirements: ["Regular Diet", "Low Salt"],
    
    medications: [
      { 
        name: "AE-Amlodipine", 
        dosage: "5mg", 
        frequency: "Once daily", 
        time: "08:00",
        prescriber: "Dr. James Morgan AE",
        startDate: "2024-03-01",
        reviewDate: "2025-03-01" 
      },
      { 
        name: "AE-Simvastatin", 
        dosage: "20mg", 
        frequency: "Once daily", 
        time: "20:00",
        prescriber: "Dr. James Morgan AE",
        startDate: "2024-03-01",
        reviewDate: "2025-03-01"
      }
    ],
    
    riskLevel: "Low",
    lastAssessment: "20/12/2024",
    nextAssessment: "20/03/2025",
    
    carePlanGoals: [
      "Continue independent living skills",
      "Regular exercise program",
      "Maintain social connections"
    ],
    
    recentNotes: [
      {
        date: "2024-12-30 10:15",
        author: "Emma Thompson AE", 
        note: "Client enjoyed craft session. Medications taken without issue. Vitals all normal."
      },
      {
        date: "2024-12-29 16:45",
        author: "Lisa Anderson AE",
        note: "Family visit went well. Client in good spirits. No health concerns reported."
      }
    ]
  }
];

// AE Medication Library
export const aeMedicationLibrary = [
  { id: "med_001", name: "AE-Paracetamol", category: "Pain Relief", strengths: ["500mg", "1000mg"], indication: "Pain & Fever" },
  { id: "med_002", name: "AE-Ibuprofen", category: "Anti-inflammatory", strengths: ["200mg", "400mg"], indication: "Pain & Inflammation" },
  { id: "med_003", name: "AE-Lisinopril", category: "ACE Inhibitor", strengths: ["2.5mg", "5mg", "10mg"], indication: "Hypertension" },
  { id: "med_004", name: "AE-Metformin", category: "Diabetes", strengths: ["500mg", "850mg", "1000mg"], indication: "Type 2 Diabetes" },
  { id: "med_005", name: "AE-Amlodipine", category: "Calcium Channel Blocker", strengths: ["2.5mg", "5mg", "10mg"], indication: "Hypertension" },
  { id: "med_006", name: "AE-Simvastatin", category: "Statin", strengths: ["10mg", "20mg", "40mg"], indication: "High Cholesterol" },
  { id: "med_007", name: "AE-Warfarin", category: "Anticoagulant", strengths: ["1mg", "3mg", "5mg"], indication: "Blood Clotting Prevention" },
  { id: "med_008", name: "AE-Digoxin", category: "Cardiac Glycoside", strengths: ["62.5mcg", "125mcg", "250mcg"], indication: "Heart Conditions" },
  { id: "med_009", name: "AE-Furosemide", category: "Diuretic", strengths: ["20mg", "40mg", "80mg"], indication: "Fluid Retention" },
  { id: "med_010", name: "AE-Omeprazole", category: "PPI", strengths: ["10mg", "20mg", "40mg"], indication: "Acid Reflux" }
];

// AE Training Modules
export const aeTrainingModules = [
  { 
    id: "train_001", 
    name: "AE Safeguarding Adults", 
    duration: "2 hours", 
    category: "Mandatory",
    description: "Essential safeguarding protocols for vulnerable adults",
    renewalPeriod: "Annual"
  },
  { 
    id: "train_002", 
    name: "AE Medication Management", 
    duration: "3 hours", 
    category: "Clinical",
    description: "Safe handling and administration of medications", 
    renewalPeriod: "Annual"
  },
  { 
    id: "train_003", 
    name: "AE Fire Safety", 
    duration: "1 hour", 
    category: "Health & Safety",
    description: "Fire prevention and emergency procedures",
    renewalPeriod: "Annual"
  },
  { 
    id: "train_004", 
    name: "AE Manual Handling", 
    duration: "2 hours", 
    category: "Health & Safety",
    description: "Safe moving and handling techniques",
    renewalPeriod: "Annual"
  },
  { 
    id: "train_005", 
    name: "AE Infection Control", 
    duration: "1.5 hours", 
    category: "Clinical",
    description: "Prevention and control of healthcare infections",
    renewalPeriod: "Annual"
  },
  { 
    id: "train_006", 
    name: "AE First Aid", 
    duration: "6 hours", 
    category: "Emergency",
    description: "Emergency first aid response training",
    renewalPeriod: "3 Years"
  },
  { 
    id: "train_007", 
    name: "AE Mental Health Awareness", 
    duration: "2 hours", 
    category: "Wellbeing",
    description: "Understanding and supporting mental health",
    renewalPeriod: "2 Years"
  },
  { 
    id: "train_008", 
    name: "AE GDPR & Data Protection", 
    duration: "1 hour", 
    category: "Compliance",
    description: "Data protection and privacy compliance",
    renewalPeriod: "Annual"
  }
];

export const mockNotifications = [
  {
    id: "not_001",
    type: "urgent",
    title: "Medication Due",
    message: "Client Arthur Andrews AE - Evening AE-Metformin reminder",
    timestamp: "5 minutes ago",
    read: false
  },
  {
    id: "not_002", 
    type: "info",
    title: "Staff Update",
    message: "Sarah Mitchell AE has checked in for evening shift",
    timestamp: "15 minutes ago",
    read: false
  },
  {
    id: "not_003",
    type: "warning", 
    title: "Training Reminder",
    message: "Michael Roberts AE - AE Manual Handling training overdue",
    timestamp: "1 hour ago",
    read: false
  }
];