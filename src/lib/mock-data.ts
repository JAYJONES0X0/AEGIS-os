// AEGIS Mock Data - Realistic Health & Social Care Demo Dataset
// Expanded to include 40 clients and 102 staff members for investor demo

export const mockUser = {
  name: "Brooklyn R.J",
  role: "Registered Manager",
  avatar: null
};

// 40 Realistic Care Home Clients with diverse backgrounds
export const mockClients = [
  {
    id: "1", nhs_number: "1234567890", name: "Margaret Thompson", dob: "1935-03-15", 
    rag: "green" as const, care_plan: "Residential Care", risk_level: "Low", 
    last_note: "2024-01-17 14:30", status: "Active", room: "Room 1A"
  },
  {
    id: "2", nhs_number: "1234567891", name: "John Williams", dob: "1942-07-22", 
    rag: "amber" as const, care_plan: "Dementia Care", risk_level: "Medium", 
    last_note: "2024-01-17 13:15", status: "Active", room: "Room 2B"
  },
  {
    id: "3", nhs_number: "1234567892", name: "Dorothy Evans", dob: "1938-11-08", 
    rag: "red" as const, care_plan: "Nursing Care", risk_level: "High", 
    last_note: "2024-01-17 12:45", status: "Active", room: "Room 3C"
  },
  {
    id: "4", nhs_number: "1234567893", name: "Arthur Davies", dob: "1940-01-12", 
    rag: "green" as const, care_plan: "Supported Living", risk_level: "Low", 
    last_note: "2024-01-17 11:20", status: "Active", room: "Room 4A"
  },
  {
    id: "5", nhs_number: "1234567894", name: "Elizabeth Brown", dob: "1943-05-30", 
    rag: "amber" as const, care_plan: "Residential Care", risk_level: "Medium", 
    last_note: "2024-01-17 10:15", status: "Active", room: "Room 5B"
  },
  {
    id: "6", nhs_number: "1234567895", name: "Robert Johnson", dob: "1936-09-18", 
    rag: "green" as const, care_plan: "Day Care", risk_level: "Low", 
    last_note: "2024-01-17 09:45", status: "Active", room: "Day Centre"
  },
  {
    id: "7", nhs_number: "1234567896", name: "Mary Wilson", dob: "1941-12-03", 
    rag: "amber" as const, care_plan: "Respite Care", risk_level: "Medium", 
    last_note: "2024-01-17 15:30", status: "Active", room: "Room 7A"
  },
  {
    id: "8", nhs_number: "1234567897", name: "James Miller", dob: "1944-04-25", 
    rag: "red" as const, care_plan: "End of Life Care", risk_level: "High", 
    last_note: "2024-01-17 16:00", status: "Active", room: "Room 8C"
  },
  {
    id: "9", nhs_number: "1234567898", name: "Patricia Davis", dob: "1939-08-14", 
    rag: "green" as const, care_plan: "Independent Living", risk_level: "Low", 
    last_note: "2024-01-17 08:30", status: "Active", room: "Flat 9"
  },
  {
    id: "10", nhs_number: "1234567899", name: "Charles Garcia", dob: "1937-06-07", 
    rag: "amber" as const, care_plan: "Mental Health Support", risk_level: "Medium", 
    last_note: "2024-01-17 14:45", status: "Active", room: "Room 10B"
  },
  {
    id: "11", nhs_number: "1234567800", name: "Jennifer Rodriguez", dob: "1946-10-29", 
    rag: "green" as const, care_plan: "Physical Disability Support", risk_level: "Low", 
    last_note: "2024-01-17 13:00", status: "Active", room: "Room 11A"
  },
  {
    id: "12", nhs_number: "1234567801", name: "Michael Martinez", dob: "1940-02-16", 
    rag: "red" as const, care_plan: "Complex Care", risk_level: "High", 
    last_note: "2024-01-17 17:15", status: "Active", room: "Room 12C"
  },
  {
    id: "13", nhs_number: "1234567802", name: "Linda Anderson", dob: "1945-07-11", 
    rag: "green" as const, care_plan: "Learning Disability Support", risk_level: "Low", 
    last_note: "2024-01-17 12:30", status: "Active", room: "Room 13A"
  },
  {
    id: "14", nhs_number: "1234567803", name: "Christopher Taylor", dob: "1942-12-28", 
    rag: "amber" as const, care_plan: "Stroke Recovery", risk_level: "Medium", 
    last_note: "2024-01-17 11:45", status: "Active", room: "Room 14B"
  },
  {
    id: "15", nhs_number: "1234567804", name: "Barbara Thomas", dob: "1938-03-05", 
    rag: "green" as const, care_plan: "Diabetes Management", risk_level: "Low", 
    last_note: "2024-01-17 10:00", status: "Active", room: "Room 15A"
  },
  {
    id: "16", nhs_number: "1234567805", name: "Daniel Jackson", dob: "1941-09-22", 
    rag: "red" as const, care_plan: "COPD Management", risk_level: "High", 
    last_note: "2024-01-17 16:30", status: "Active", room: "Room 16C"
  },
  {
    id: "17", nhs_number: "1234567806", name: "Nancy White", dob: "1944-01-17", 
    rag: "amber" as const, care_plan: "Parkinson's Care", risk_level: "Medium", 
    last_note: "2024-01-17 09:15", status: "Active", room: "Room 17B"
  },
  {
    id: "18", nhs_number: "1234567807", name: "Mark Harris", dob: "1943-11-04", 
    rag: "green" as const, care_plan: "Cardiac Care", risk_level: "Low", 
    last_note: "2024-01-17 14:00", status: "Active", room: "Room 18A"
  },
  {
    id: "19", nhs_number: "1234567808", name: "Sandra Clark", dob: "1939-05-13", 
    rag: "amber" as const, care_plan: "Arthritis Management", risk_level: "Medium", 
    last_note: "2024-01-17 13:30", status: "Active", room: "Room 19B"
  },
  {
    id: "20", nhs_number: "1234567809", name: "Kenneth Lewis", dob: "1936-08-26", 
    rag: "red" as const, care_plan: "Kidney Disease Care", risk_level: "High", 
    last_note: "2024-01-17 15:45", status: "Active", room: "Room 20C"
  },
  {
    id: "21", nhs_number: "1234567810", name: "Lisa Robinson", dob: "1947-04-02", 
    rag: "green" as const, care_plan: "Cancer Recovery", risk_level: "Low", 
    last_note: "2024-01-17 11:30", status: "Active", room: "Room 21A"
  },
  {
    id: "22", nhs_number: "1234567811", name: "Steven Walker", dob: "1940-10-19", 
    rag: "amber" as const, care_plan: "Alcohol Recovery", risk_level: "Medium", 
    last_note: "2024-01-17 12:00", status: "Active", room: "Room 22B"
  },
  {
    id: "23", nhs_number: "1234567812", name: "Karen Hall", dob: "1945-06-08", 
    rag: "green" as const, care_plan: "Depression Support", risk_level: "Low", 
    last_note: "2024-01-17 10:45", status: "Active", room: "Room 23A"
  },
  {
    id: "24", nhs_number: "1234567813", name: "Brian Allen", dob: "1942-01-31", 
    rag: "red" as const, care_plan: "Multiple Sclerosis Care", risk_level: "High", 
    last_note: "2024-01-17 17:00", status: "Active", room: "Room 24C"
  },
  {
    id: "25", nhs_number: "1234567814", name: "Helen Young", dob: "1941-07-24", 
    rag: "amber" as const, care_plan: "Osteoporosis Management", risk_level: "Medium", 
    last_note: "2024-01-17 08:45", status: "Active", room: "Room 25B"
  },
  {
    id: "26", nhs_number: "1234567815", name: "Edward Hernandez", dob: "1938-12-15", 
    rag: "green" as const, care_plan: "Visual Impairment Support", risk_level: "Low", 
    last_note: "2024-01-17 13:45", status: "Active", room: "Room 26A"
  },
  {
    id: "27", nhs_number: "1234567816", name: "Deborah King", dob: "1944-03-28", 
    rag: "amber" as const, care_plan: "Hearing Impairment Support", risk_level: "Medium", 
    last_note: "2024-01-17 14:15", status: "Active", room: "Room 27B"
  },
  {
    id: "28", nhs_number: "1234567817", name: "Ronald Wright", dob: "1937-09-06", 
    rag: "red" as const, care_plan: "Mobility Assistance", risk_level: "High", 
    last_note: "2024-01-17 16:45", status: "Active", room: "Room 28C"
  },
  {
    id: "29", nhs_number: "1234567818", name: "Donna Lopez", dob: "1946-11-13", 
    rag: "green" as const, care_plan: "Social Isolation Support", risk_level: "Low", 
    last_note: "2024-01-17 09:30", status: "Active", room: "Room 29A"
  },
  {
    id: "30", nhs_number: "1234567819", name: "George Hill", dob: "1939-04-20", 
    rag: "amber" as const, care_plan: "Anxiety Management", risk_level: "Medium", 
    last_note: "2024-01-17 15:15", status: "Active", room: "Room 30B"
  },
  {
    id: "31", nhs_number: "1234567820", name: "Carol Scott", dob: "1943-08-09", 
    rag: "green" as const, care_plan: "Rehabilitation Support", risk_level: "Low", 
    last_note: "2024-01-17 11:15", status: "Active", room: "Room 31A"
  },
  {
    id: "32", nhs_number: "1234567821", name: "Joseph Green", dob: "1940-05-27", 
    rag: "red" as const, care_plan: "Wound Care Management", risk_level: "High", 
    last_note: "2024-01-17 17:30", status: "Active", room: "Room 32C"
  },
  {
    id: "33", nhs_number: "1234567822", name: "Sharon Adams", dob: "1945-02-14", 
    rag: "amber" as const, care_plan: "Nutrition Support", risk_level: "Medium", 
    last_note: "2024-01-17 12:15", status: "Active", room: "Room 33B"
  },
  {
    id: "34", nhs_number: "1234567823", name: "Thomas Baker", dob: "1941-10-01", 
    rag: "green" as const, care_plan: "Exercise Programme", risk_level: "Low", 
    last_note: "2024-01-17 10:30", status: "Active", room: "Room 34A"
  },
  {
    id: "35", nhs_number: "1234567824", name: "Betty Gonzalez", dob: "1942-06-18", 
    rag: "amber" as const, care_plan: "Medication Management", risk_level: "Medium", 
    last_note: "2024-01-17 13:15", status: "Active", room: "Room 35B"
  },
  {
    id: "36", nhs_number: "1234567825", name: "Paul Nelson", dob: "1938-12-05", 
    rag: "red" as const, care_plan: "Palliative Care", risk_level: "High", 
    last_note: "2024-01-17 18:00", status: "Active", room: "Room 36C"
  },
  {
    id: "37", nhs_number: "1234567826", name: "Dorothy Carter", dob: "1944-07-23", 
    rag: "green" as const, care_plan: "Community Integration", risk_level: "Low", 
    last_note: "2024-01-17 09:00", status: "Active", room: "Room 37A"
  },
  {
    id: "38", nhs_number: "1234567827", name: "Richard Mitchell", dob: "1940-03-16", 
    rag: "amber" as const, care_plan: "Fall Prevention", risk_level: "Medium", 
    last_note: "2024-01-17 14:30", status: "Active", room: "Room 38B"
  },
  {
    id: "39", nhs_number: "1234567828", name: "Ruth Perez", dob: "1943-09-07", 
    rag: "green" as const, care_plan: "Memory Care", risk_level: "Low", 
    last_note: "2024-01-17 11:00", status: "Active", room: "Room 39A"
  },
  {
    id: "40", nhs_number: "1234567829", name: "Frank Roberts", dob: "1937-01-29", 
    rag: "red" as const, care_plan: "Intensive Care", risk_level: "High", 
    last_note: "2024-01-17 18:15", status: "Active", room: "Room 40C"
  }
];

// 102 Care Staff Members with realistic roles and qualifications
export const mockStaff = [
  // Management Team
  { id: "1", name: "Brooklyn R.J", role: "Registered Manager", shift: "Day", training_expires: "2024-12-15", dbs_expires: "2024-10-20", status: "On Duty", department: "Management", qualification: "RGN, Diploma in Management" },
  { id: "2", name: "Sarah Mitchell", role: "Deputy Manager", shift: "Day", training_expires: "2024-11-30", dbs_expires: "2024-09-15", status: "On Duty", department: "Management", qualification: "RGN, NVQ Level 5" },
  { id: "3", name: "James Patterson", role: "Clinical Lead", shift: "Day", training_expires: "2024-10-25", dbs_expires: "2024-08-30", status: "On Duty", department: "Clinical", qualification: "RGN, BSc Nursing" },
  
  // Registered Nurses (RGN/RMN)
  { id: "4", name: "Emma Thompson", role: "Registered Nurse", shift: "Day", training_expires: "2024-09-20", dbs_expires: "2024-07-10", status: "On Duty", department: "Nursing", qualification: "RGN, Dementia Specialist" },
  { id: "5", name: "Michael Roberts", role: "Registered Nurse", shift: "Night", training_expires: "2024-11-15", dbs_expires: "2024-06-25", status: "Off Duty", department: "Nursing", qualification: "RMN, Mental Health Specialist" },
  { id: "6", name: "Lisa Anderson", role: "Senior Nurse", shift: "Day", training_expires: "2024-08-30", dbs_expires: "2024-12-05", status: "On Duty", department: "Nursing", qualification: "RGN, Tissue Viability" },
  { id: "7", name: "David Wilson", role: "Registered Nurse", shift: "Evening", training_expires: "2024-10-10", dbs_expires: "2024-11-20", status: "On Duty", department: "Nursing", qualification: "RGN, Palliative Care" },
  { id: "8", name: "Jennifer Davis", role: "Registered Nurse", shift: "Night", training_expires: "2024-12-01", dbs_expires: "2024-09-30", status: "Off Duty", department: "Nursing", qualification: "RGN, Diabetes Care" },
  { id: "9", name: "Robert Johnson", role: "Senior Nurse", shift: "Day", training_expires: "2024-07-15", dbs_expires: "2024-08-15", status: "On Duty", department: "Nursing", qualification: "RGN, Wound Care Specialist" },
  { id: "10", name: "Maria Garcia", role: "Registered Nurse", shift: "Evening", training_expires: "2024-11-05", dbs_expires: "2024-10-10", status: "On Duty", department: "Nursing", qualification: "RGN, Infection Control" },

  // Senior Support Workers
  { id: "11", name: "Carol Brown", role: "Senior Support Worker", shift: "Day", training_expires: "2024-09-25", dbs_expires: "2024-07-20", status: "On Duty", department: "Care", qualification: "NVQ Level 3, Team Leader" },
  { id: "12", name: "Paul Miller", role: "Senior Support Worker", shift: "Evening", training_expires: "2024-08-20", dbs_expires: "2024-11-15", status: "On Duty", department: "Care", qualification: "NVQ Level 3, Dementia Care" },
  { id: "13", name: "Susan Taylor", role: "Senior Support Worker", shift: "Night", training_expires: "2024-10-15", dbs_expires: "2024-09-05", status: "Off Duty", department: "Care", qualification: "NVQ Level 3, Mental Health" },
  { id: "14", name: "Kevin White", role: "Senior Support Worker", shift: "Day", training_expires: "2024-07-30", dbs_expires: "2024-12-10", status: "On Duty", department: "Care", qualification: "NVQ Level 3, Moving & Handling" },
  { id: "15", name: "Helen Clark", role: "Senior Support Worker", shift: "Evening", training_expires: "2024-11-20", dbs_expires: "2024-08-25", status: "On Duty", department: "Care", qualification: "NVQ Level 3, Safeguarding" },

  // Support Workers
  { id: "16", name: "Andrew Lewis", role: "Support Worker", shift: "Day", training_expires: "2024-09-10", dbs_expires: "2024-06-30", status: "On Duty", department: "Care", qualification: "NVQ Level 2, First Aid" },
  { id: "17", name: "Michelle Robinson", role: "Support Worker", shift: "Evening", training_expires: "2024-08-15", dbs_expires: "2024-10-05", status: "On Duty", department: "Care", qualification: "NVQ Level 2, Food Hygiene" },
  { id: "18", name: "Thomas Walker", role: "Support Worker", shift: "Night", training_expires: "2024-10-05", dbs_expires: "2024-11-25", status: "Off Duty", department: "Care", qualification: "NVQ Level 2" },
  { id: "19", name: "Amanda Hall", role: "Support Worker", shift: "Day", training_expires: "2024-07-25", dbs_expires: "2024-09-10", status: "On Duty", department: "Care", qualification: "NVQ Level 2, Medication Awareness" },
  { id: "20", name: "Christopher Allen", role: "Support Worker", shift: "Evening", training_expires: "2024-12-05", dbs_expires: "2024-08-20", status: "On Duty", department: "Care", qualification: "NVQ Level 2" },
  { id: "21", name: "Patricia Young", role: "Support Worker", shift: "Day", training_expires: "2024-09-15", dbs_expires: "2024-07-15", status: "On Duty", department: "Care", qualification: "NVQ Level 2, Communication" },
  { id: "22", name: "Daniel King", role: "Support Worker", shift: "Night", training_expires: "2024-08-25", dbs_expires: "2024-12-15", status: "Off Duty", department: "Care", qualification: "NVQ Level 2" },
  { id: "23", name: "Karen Wright", role: "Support Worker", shift: "Evening", training_expires: "2024-11-10", dbs_expires: "2024-10-15", status: "On Duty", department: "Care", qualification: "NVQ Level 2, Activities" },
  { id: "24", name: "Mark Lopez", role: "Support Worker", shift: "Day", training_expires: "2024-07-05", dbs_expires: "2024-09-20", status: "On Duty", department: "Care", qualification: "NVQ Level 2" },
  { id: "25", name: "Linda Hill", role: "Support Worker", shift: "Evening", training_expires: "2024-10-20", dbs_expires: "2024-08-05", status: "On Duty", department: "Care", qualification: "NVQ Level 2, Personal Care" },
  
  // Healthcare Assistants
  { id: "26", name: "Ryan Scott", role: "Healthcare Assistant", shift: "Day", training_expires: "2024-09-30", dbs_expires: "2024-11-10", status: "On Duty", department: "Clinical", qualification: "Healthcare Assistant Certificate" },
  { id: "27", name: "Julie Green", role: "Healthcare Assistant", shift: "Evening", training_expires: "2024-08-10", dbs_expires: "2024-07-25", status: "On Duty", department: "Clinical", qualification: "Healthcare Assistant Certificate" },
  { id: "28", name: "Gary Adams", role: "Healthcare Assistant", shift: "Night", training_expires: "2024-12-10", dbs_expires: "2024-09-25", status: "Off Duty", department: "Clinical", qualification: "Healthcare Assistant Certificate" },
  { id: "29", name: "Rebecca Baker", role: "Healthcare Assistant", shift: "Day", training_expires: "2024-07-20", dbs_expires: "2024-10-30", status: "On Duty", department: "Clinical", qualification: "Healthcare Assistant Certificate" },
  { id: "30", name: "Stephen Gonzalez", role: "Healthcare Assistant", shift: "Evening", training_expires: "2024-11-25", dbs_expires: "2024-08-15", status: "On Duty", department: "Clinical", qualification: "Healthcare Assistant Certificate" },

  // Activities & Therapy Staff
  { id: "31", name: "Catherine Nelson", role: "Activities Coordinator", shift: "Day", training_expires: "2024-09-05", dbs_expires: "2024-06-15", status: "On Duty", department: "Activities", qualification: "Activities Coordination Diploma" },
  { id: "32", name: "Jonathan Carter", role: "Occupational Therapist", shift: "Day", training_expires: "2024-10-30", dbs_expires: "2024-12-20", status: "On Duty", department: "Therapy", qualification: "BSc Occupational Therapy" },
  { id: "33", name: "Angela Mitchell", role: "Physiotherapist", shift: "Day", training_expires: "2024-08-05", dbs_expires: "2024-11-05", status: "On Duty", department: "Therapy", qualification: "BSc Physiotherapy" },
  { id: "34", name: "Brian Perez", role: "Activity Assistant", shift: "Day", training_expires: "2024-11-15", dbs_expires: "2024-09-15", status: "On Duty", department: "Activities", qualification: "Activities Assistant Certificate" },

  // Kitchen Staff
  { id: "35", name: "Margaret Roberts", role: "Head Chef", shift: "Day", training_expires: "2024-07-10", dbs_expires: "2024-08-10", status: "On Duty", department: "Catering", qualification: "City & Guilds Catering Level 3" },
  { id: "36", name: "William Turner", role: "Cook", shift: "Day", training_expires: "2024-12-15", dbs_expires: "2024-10-25", status: "On Duty", department: "Catering", qualification: "Food Safety Level 2" },
  { id: "37", name: "Sandra Phillips", role: "Cook", shift: "Evening", training_expires: "2024-09-20", dbs_expires: "2024-07-30", status: "On Duty", department: "Catering", qualification: "Food Safety Level 2" },
  { id: "38", name: "Anthony Campbell", role: "Kitchen Assistant", shift: "Day", training_expires: "2024-08-30", dbs_expires: "2024-11-30", status: "On Duty", department: "Catering", qualification: "Food Hygiene Certificate" },
  { id: "39", name: "Kimberly Parker", role: "Kitchen Assistant", shift: "Evening", training_expires: "2024-10-25", dbs_expires: "2024-09-30", status: "On Duty", department: "Catering", qualification: "Food Hygiene Certificate" },

  // Domestic & Laundry Staff
  { id: "40", name: "Charles Evans", role: "Head Housekeeper", shift: "Day", training_expires: "2024-11-30", dbs_expires: "2024-08-20", status: "On Duty", department: "Domestic", qualification: "Cleaning Supervisor Certificate" },
  { id: "41", name: "Brenda Edwards", role: "Domestic Assistant", shift: "Day", training_expires: "2024-07-15", dbs_expires: "2024-12-05", status: "On Duty", department: "Domestic", qualification: "Cleaning Certificate" },
  { id: "42", name: "Frank Collins", role: "Domestic Assistant", shift: "Evening", training_expires: "2024-09-25", dbs_expires: "2024-10-20", status: "On Duty", department: "Domestic", qualification: "Cleaning Certificate" },
  { id: "43", name: "Deborah Stewart", role: "Laundry Assistant", shift: "Day", training_expires: "2024-08-20", dbs_expires: "2024-07-05", status: "On Duty", department: "Domestic", qualification: "Laundry Operations Certificate" },
  { id: "44", name: "Ronald Sanchez", role: "Maintenance Worker", shift: "Day", training_expires: "2024-12-20", dbs_expires: "2024-11-15", status: "On Duty", department: "Maintenance", qualification: "Multi-skilled Maintenance" },

  // Administration & Reception
  { id: "45", name: "Donna Morris", role: "Office Manager", shift: "Day", training_expires: "2024-10-10", dbs_expires: "2024-09-05", status: "On Duty", department: "Administration", qualification: "Business Administration Level 3" },
  { id: "46", name: "George Rogers", role: "Receptionist", shift: "Day", training_expires: "2024-07-25", dbs_expires: "2024-08-25", status: "On Duty", department: "Administration", qualification: "Customer Service Level 2" },
  { id: "47", name: "Carol Reed", role: "Admin Assistant", shift: "Day", training_expires: "2024-11-05", dbs_expires: "2024-12-25", status: "On Duty", department: "Administration", qualification: "Administration Level 2" },

  // Additional Support Workers (continuing pattern)
  { id: "48", name: "Joseph Cook", role: "Support Worker", shift: "Day", training_expires: "2024-09-12", dbs_expires: "2024-06-18", status: "On Duty", department: "Care", qualification: "NVQ Level 2" },
  { id: "49", name: "Sharon Bailey", role: "Support Worker", shift: "Night", training_expires: "2024-08-18", dbs_expires: "2024-10-08", status: "Off Duty", department: "Care", qualification: "NVQ Level 2" },
  { id: "50", name: "Thomas Rivera", role: "Support Worker", shift: "Evening", training_expires: "2024-12-08", dbs_expires: "2024-11-18", status: "On Duty", department: "Care", qualification: "NVQ Level 2" },
  
  // More Healthcare Staff
  { id: "51", name: "Betty Cooper", role: "Registered Nurse", shift: "Day", training_expires: "2024-07-28", dbs_expires: "2024-09-08", status: "On Duty", department: "Nursing", qualification: "RGN, Stroke Care" },
  { id: "52", name: "Paul Richardson", role: "Healthcare Assistant", shift: "Evening", training_expires: "2024-10-18", dbs_expires: "2024-08-28", status: "On Duty", department: "Clinical", qualification: "Healthcare Assistant Certificate" },
  { id: "53", name: "Dorothy Cox", role: "Senior Support Worker", shift: "Day", training_expires: "2024-11-28", dbs_expires: "2024-07-08", status: "On Duty", department: "Care", qualification: "NVQ Level 3" },
  { id: "54", name: "Richard Ward", role: "Support Worker", shift: "Night", training_expires: "2024-09-08", dbs_expires: "2024-12-18", status: "Off Duty", department: "Care", qualification: "NVQ Level 2" },
  { id: "55", name: "Ruth Torres", role: "Support Worker", shift: "Day", training_expires: "2024-08-28", dbs_expires: "2024-10-18", status: "On Duty", department: "Care", qualification: "NVQ Level 2, Dementia Awareness" },

  // Evening/Night Shift Focus
  { id: "56", name: "Frank Peterson", role: "Night Supervisor", shift: "Night", training_expires: "2024-10-08", dbs_expires: "2024-11-28", status: "Off Duty", department: "Care", qualification: "NVQ Level 4, Leadership" },
  { id: "57", name: "Helen Gray", role: "Senior Support Worker", shift: "Night", training_expires: "2024-07-18", dbs_expires: "2024-09-28", status: "Off Duty", department: "Care", qualification: "NVQ Level 3" },
  { id: "58", name: "Edward James", role: "Support Worker", shift: "Night", training_expires: "2024-12-28", dbs_expires: "2024-08-08", status: "Off Duty", department: "Care", qualification: "NVQ Level 2" },
  { id: "59", name: "Deborah Watson", role: "Registered Nurse", shift: "Night", training_expires: "2024-09-18", dbs_expires: "2024-06-28", status: "Off Duty", department: "Nursing", qualification: "RGN, Emergency Care" },
  { id: "60", name: "Steven Brooks", role: "Healthcare Assistant", shift: "Night", training_expires: "2024-11-08", dbs_expires: "2024-10-28", status: "Off Duty", department: "Clinical", qualification: "Healthcare Assistant Certificate" },

  // Specialist Roles
  { id: "61", name: "Karen Kelly", role: "Infection Control Nurse", shift: "Day", training_expires: "2024-08-08", dbs_expires: "2024-12-08", status: "On Duty", department: "Nursing", qualification: "RGN, Infection Prevention" },
  { id: "62", name: "Brian Sanders", role: "Tissue Viability Nurse", shift: "Day", training_expires: "2024-10-28", dbs_expires: "2024-07-18", status: "On Duty", department: "Nursing", qualification: "RGN, Wound Care Specialist" },
  { id: "63", name: "Lisa Price", role: "Dementia Specialist", shift: "Day", training_expires: "2024-07-08", dbs_expires: "2024-09-18", status: "On Duty", department: "Clinical", qualification: "Dementia Care Mapping" },
  { id: "64", name: "George Bennett", role: "Mental Health Worker", shift: "Day", training_expires: "2024-11-18", dbs_expires: "2024-08-18", status: "On Duty", department: "Clinical", qualification: "Mental Health Support Certificate" },

  // More Support Staff
  { id: "65", name: "Carol Wood", role: "Support Worker", shift: "Day", training_expires: "2024-09-28", dbs_expires: "2024-06-08", status: "On Duty", department: "Care", qualification: "NVQ Level 2" },
  { id: "66", name: "Joseph Barnes", role: "Support Worker", shift: "Evening", training_expires: "2024-08-08", dbs_expires: "2024-10-28", status: "On Duty", department: "Care", qualification: "NVQ Level 2" },
  { id: "67", name: "Sharon Ross", role: "Support Worker", shift: "Day", training_expires: "2024-12-18", dbs_expires: "2024-11-08", status: "On Duty", department: "Care", qualification: "NVQ Level 2" },
  { id: "68", name: "Thomas Henderson", role: "Support Worker", shift: "Night", training_expires: "2024-07-28", dbs_expires: "2024-09-28", status: "Off Duty", department: "Care", qualification: "NVQ Level 2" },
  { id: "69", name: "Betty Coleman", role: "Senior Support Worker", shift: "Evening", training_expires: "2024-10-18", dbs_expires: "2024-08-08", status: "On Duty", department: "Care", qualification: "NVQ Level 3" },
  { id: "70", name: "Paul Jenkins", role: "Support Worker", shift: "Day", training_expires: "2024-11-28", dbs_expires: "2024-07-28", status: "On Duty", department: "Care", qualification: "NVQ Level 2" },

  // Additional Clinical Staff
  { id: "71", name: "Dorothy Perry", role: "Registered Nurse", shift: "Evening", training_expires: "2024-09-28", dbs_expires: "2024-12-28", status: "On Duty", department: "Nursing", qualification: "RGN, Cardiac Care" },
  { id: "72", name: "Richard Powell", role: "Healthcare Assistant", shift: "Day", training_expires: "2024-08-18", dbs_expires: "2024-10-08", status: "On Duty", department: "Clinical", qualification: "Healthcare Assistant Certificate" },
  { id: "73", name: "Ruth Long", role: "Senior Support Worker", shift: "Day", training_expires: "2024-07-08", dbs_expires: "2024-11-18", status: "On Duty", department: "Care", qualification: "NVQ Level 3, Nutrition" },
  { id: "74", name: "Frank Patterson", role: "Support Worker", shift: "Evening", training_expires: "2024-12-08", dbs_expires: "2024-09-08", status: "On Duty", department: "Care", qualification: "NVQ Level 2" },
  { id: "75", name: "Helen Hughes", role: "Support Worker", shift: "Night", training_expires: "2024-10-28", dbs_expires: "2024-06-18", status: "Off Duty", department: "Care", qualification: "NVQ Level 2" },

  // Therapy & Wellness Staff
  { id: "76", name: "Edward Flores", role: "Music Therapist", shift: "Day", training_expires: "2024-09-08", dbs_expires: "2024-08-28", status: "On Duty", department: "Therapy", qualification: "Music Therapy Diploma" },
  { id: "77", name: "Deborah Washington", role: "Art Therapist", shift: "Day", training_expires: "2024-11-08", dbs_expires: "2024-07-28", status: "On Duty", department: "Therapy", qualification: "Art Therapy Certificate" },
  { id: "78", name: "Steven Butler", role: "Exercise Instructor", shift: "Day", training_expires: "2024-08-28", dbs_expires: "2024-10-18", status: "On Duty", department: "Activities", qualification: "Fitness Instructor Level 2" },

  // Additional Support & Specialist Staff
  { id: "79", name: "Karen Simmons", role: "Support Worker", shift: "Day", training_expires: "2024-07-18", dbs_expires: "2024-12-28", status: "On Duty", department: "Care", qualification: "NVQ Level 2" },
  { id: "80", name: "Brian Foster", role: "Support Worker", shift: "Evening", training_expires: "2024-12-18", dbs_expires: "2024-09-18", status: "On Duty", department: "Care", qualification: "NVQ Level 2" },
  { id: "81", name: "Lisa Gonzales", role: "Senior Support Worker", shift: "Day", training_expires: "2024-10-08", dbs_expires: "2024-11-08", status: "On Duty", department: "Care", qualification: "NVQ Level 3" },
  { id: "82", name: "George Bryant", role: "Support Worker", shift: "Night", training_expires: "2024-09-18", dbs_expires: "2024-08-18", status: "Off Duty", department: "Care", qualification: "NVQ Level 2" },
  { id: "83", name: "Carol Alexander", role: "Registered Nurse", shift: "Evening", training_expires: "2024-11-18", dbs_expires: "2024-06-28", status: "On Duty", department: "Nursing", qualification: "RGN, Respiratory Care" },
  { id: "84", name: "Joseph Russell", role: "Healthcare Assistant", shift: "Day", training_expires: "2024-08-18", dbs_expires: "2024-10-28", status: "On Duty", department: "Clinical", qualification: "Healthcare Assistant Certificate" },
  { id: "85", name: "Sharon Griffin", role: "Support Worker", shift: "Day", training_expires: "2024-07-28", dbs_expires: "2024-09-08", status: "On Duty", department: "Care", qualification: "NVQ Level 2" },

  // Final Support Staff completing the 102 total
  { id: "86", name: "Thomas Diaz", role: "Support Worker", shift: "Evening", training_expires: "2024-12-28", dbs_expires: "2024-11-28", status: "On Duty", department: "Care", qualification: "NVQ Level 2" },
  { id: "87", name: "Betty Hayes", role: "Senior Support Worker", shift: "Night", training_expires: "2024-10-18", dbs_expires: "2024-07-08", status: "Off Duty", department: "Care", qualification: "NVQ Level 3" },
  { id: "88", name: "Paul Myers", role: "Support Worker", shift: "Day", training_expires: "2024-09-08", dbs_expires: "2024-12-18", status: "On Duty", department: "Care", qualification: "NVQ Level 2" },
  { id: "89", name: "Dorothy Ford", role: "Healthcare Assistant", shift: "Evening", training_expires: "2024-08-28", dbs_expires: "2024-10-08", status: "On Duty", department: "Clinical", qualification: "Healthcare Assistant Certificate" },
  { id: "90", name: "Richard Hamilton", role: "Support Worker", shift: "Night", training_expires: "2024-11-08", dbs_expires: "2024-08-28", status: "Off Duty", department: "Care", qualification: "NVQ Level 2" },
  { id: "91", name: "Ruth Graham", role: "Support Worker", shift: "Day", training_expires: "2024-07-18", dbs_expires: "2024-09-28", status: "On Duty", department: "Care", qualification: "NVQ Level 2" },
  { id: "92", name: "Frank Sullivan", role: "Senior Support Worker", shift: "Evening", training_expires: "2024-12-08", dbs_expires: "2024-11-18", status: "On Duty", department: "Care", qualification: "NVQ Level 3" },
  { id: "93", name: "Helen Wallace", role: "Support Worker", shift: "Day", training_expires: "2024-10-28", dbs_expires: "2024-06-08", status: "On Duty", department: "Care", qualification: "NVQ Level 2" },
  { id: "94", name: "Edward Woods", role: "Registered Nurse", shift: "Night", training_expires: "2024-09-18", dbs_expires: "2024-08-08", status: "Off Duty", department: "Nursing", qualification: "RGN, Orthopaedic Care" },
  { id: "95", name: "Deborah Cole", role: "Support Worker", shift: "Evening", training_expires: "2024-08-08", dbs_expires: "2024-10-18", status: "On Duty", department: "Care", qualification: "NVQ Level 2" },
  { id: "96", name: "Steven West", role: "Healthcare Assistant", shift: "Day", training_expires: "2024-11-28", dbs_expires: "2024-07-18", status: "On Duty", department: "Clinical", qualification: "Healthcare Assistant Certificate" },
  { id: "97", name: "Karen Jordan", role: "Support Worker", shift: "Night", training_expires: "2024-07-08", dbs_expires: "2024-12-08", status: "Off Duty", department: "Care", qualification: "NVQ Level 2" },
  { id: "98", name: "Brian Harvey", role: "Senior Support Worker", shift: "Day", training_expires: "2024-12-18", dbs_expires: "2024-09-28", status: "On Duty", department: "Care", qualification: "NVQ Level 3" },
  { id: "99", name: "Lisa Freeman", role: "Support Worker", shift: "Evening", training_expires: "2024-10-08", dbs_expires: "2024-08-28", status: "On Duty", department: "Care", qualification: "NVQ Level 2" },
  { id: "100", name: "George Wells", role: "Support Worker", shift: "Day", training_expires: "2024-09-28", dbs_expires: "2024-11-08", status: "On Duty", department: "Care", qualification: "NVQ Level 2" },
  { id: "101", name: "Carol Mason", role: "Night Nurse", shift: "Night", training_expires: "2024-08-18", dbs_expires: "2024-06-18", status: "Off Duty", department: "Nursing", qualification: "RGN, Critical Care" },
  { id: "102", name: "Joseph Fox", role: "Support Worker", shift: "Day", training_expires: "2024-11-08", dbs_expires: "2024-10-28", status: "On Duty", department: "Care", qualification: "NVQ Level 2" }
];

// Enhanced medication data for realistic eMAR
export const mockMedications = [
  {
    id: "1", client: "Margaret Thompson", medication: "Metformin 500mg", 
    schedule: "08:00, 20:00", due_time: "2024-01-17 20:00", 
    status: "Due", type: "Regular", prescriber: "Dr. Smith"
  },
  {
    id: "2", client: "John Williams", medication: "Donepezil 10mg", 
    schedule: "08:00", due_time: "2024-01-18 08:00", 
    status: "Due", type: "Dementia Care", prescriber: "Dr. Brown"
  },
  {
    id: "3", client: "Dorothy Evans", medication: "Warfarin 2mg", 
    schedule: "18:00", due_time: "2024-01-17 18:00", 
    status: "Given", type: "Controlled Drug", prescriber: "Dr. Wilson"
  },
  {
    id: "4", client: "Arthur Davies", medication: "Ramipril 5mg", 
    schedule: "08:00", due_time: "2024-01-18 08:00", 
    status: "Due", type: "Blood Pressure", prescriber: "Dr. Johnson"
  },
  {
    id: "5", client: "Elizabeth Brown", medication: "Paracetamol 500mg", 
    schedule: "06:00, 14:00, 22:00", due_time: "2024-01-17 22:00", 
    status: "Due", type: "Pain Relief", prescriber: "Dr. Davis"
  }
];

// Enhanced audit data
export const mockAudits = [
  {
    id: "1", title: "Medication Management", due_date: "2024-01-20", 
    assigned_to: "Emma Thompson", status: "In Progress", compliance: 85
  },
  {
    id: "2", title: "Infection Control", due_date: "2024-01-25", 
    assigned_to: "Michael Roberts", status: "Overdue", compliance: 72
  },
  {
    id: "3", title: "Moving & Handling", due_date: "2024-01-30", 
    assigned_to: "Carol Brown", status: "Completed", compliance: 94
  },
  {
    id: "4", title: "Safeguarding", due_date: "2024-02-05", 
    assigned_to: "Sarah Mitchell", status: "Scheduled", compliance: 0
  }
];

// Enhanced incidents data
export const mockIncidents = [
  {
    id: "1", type: "Fall", client: "Dorothy Evans", date: "2024-01-16 15:30", 
    severity: "Minor", status: "Under Investigation", reporter: "Lisa Anderson"
  },
  {
    id: "2", type: "Medication Error", client: "John Williams", date: "2024-01-15 08:00", 
    severity: "Moderate", status: "Closed", reporter: "Emma Thompson"
  },
  {
    id: "3", type: "Skin Integrity", client: "Frank Roberts", date: "2024-01-14 12:30", 
    severity: "High", status: "Open", reporter: "Brian Perez"
  }
];

// Enhanced referrals data
export const mockReferrals = [
  {
    id: "1", client: "Margaret Thompson", service: "Physiotherapy", 
    referral_date: "2024-01-15", appointment_date: "2024-01-22 14:00", 
    status: "Booked", priority: "Routine"
  },
  {
    id: "2", client: "John Williams", service: "Memory Clinic", 
    referral_date: "2024-01-16", appointment_date: null, 
    status: "Pending", priority: "Urgent"
  },
  {
    id: "3", client: "Dorothy Evans", service: "Cardiology", 
    referral_date: "2024-01-17", appointment_date: "2024-01-25 10:30", 
    status: "Booked", priority: "Soon"
  }
];

// Enhanced KPIs with realistic values
export const mockKPIs = {
  today_risks: { value: 8, status: "amber" as const },
  overdue_audits: { value: 1, status: "red" as const },
  rota_gaps: { value: 0, status: "green" as const },
  mar_omissions: { value: 3, status: "amber" as const },
  training_expiries: { value: 12, status: "red" as const },
  incidents_open: { value: 2, status: "amber" as const },
  compliance_score: { value: 87, status: "amber" as const },
  staff_utilisation: { value: 94, status: "green" as const },
  occupancy_rate: { value: 95, status: "green" as const },
  medication_compliance: { value: 96, status: "green" as const }
};

// Enhanced care notes
export const mockNotes = [
  {
    id: "1", client_id: "1", author: "Emma Thompson", 
    timestamp: "2024-01-17 14:30", template: "Daily Care", 
    content: {
      mood: "Good spirits, chatty", nutrition: "Ate full breakfast and lunch", 
      activities: "Participated in bingo, enjoyed music session", concerns: "None"
    }, tags: ["mobility", "social", "nutrition"]
  },
  {
    id: "2", client_id: "2", author: "Carol Brown", 
    timestamp: "2024-01-17 13:15", template: "Dementia Care", 
    content: {
      mood: "Slightly agitated this morning", nutrition: "Required encouragement with lunch", 
      activities: "Preferred quiet activities today", concerns: "Monitor confusion levels"
    }, tags: ["dementia", "behaviour", "nutrition"]
  }
];

// Enhanced rota data with realistic shifts
export const mockRotaData = [
  {
    date: "2024-01-17",
    shifts: [
      { staff: "Emma Thompson", time: "07:00-15:00", role: "Registered Nurse" },
      { staff: "Carol Brown", time: "07:00-15:00", role: "Senior Support Worker" },
      { staff: "Andrew Lewis", time: "07:00-15:00", role: "Support Worker" },
      { staff: "Michelle Robinson", time: "07:00-15:00", role: "Support Worker" },
      { staff: "David Wilson", time: "15:00-23:00", role: "Registered Nurse" },
      { staff: "Paul Miller", time: "15:00-23:00", role: "Senior Support Worker" },
      { staff: "Michael Roberts", time: "23:00-07:00", role: "Registered Nurse" },
      { staff: "Susan Taylor", time: "23:00-07:00", role: "Senior Support Worker" },
      { staff: "Thomas Walker", time: "23:00-07:00", role: "Support Worker" }
    ]
  }
];

// Enhanced analytics
export const mockAnalytics = {
  mar_compliance: { current: 96, target: 95, trend: "up" },
  incident_rate: { current: 1.8, target: 2.0, trend: "down" },
  training_compliance: { current: 88, target: 90, trend: "stable" },
  audit_scores: { current: 87, target: 85, trend: "up" },
  occupancy_rate: { current: 95, target: 90, trend: "up" },
  staff_retention: { current: 89, target: 85, trend: "stable" }
};