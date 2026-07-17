// Mock data for Renewal Dashboard — all 8 sections

export const RENEWALS = [
  { id: "RNW-001", contractId: "CTR-003", name: "Commercial Lease — HQ Tower A", owner: "Lisa Torres", initials: "LT", dept: "Operations", type: "Lease", renewalDate: "May 31, 2024", daysRemaining: -3, status: "Expired", priority: "Critical", assignedTo: "Lisa Torres", value: "$1,800,000/yr" },
  { id: "RNW-002", contractId: "CTR-006", name: "APAC Distribution Agreement", owner: "James Lee", initials: "JL", dept: "Procurement", type: "Vendor", renewalDate: "Jun 30, 2024", daysRemaining: 27, status: "Due Soon", priority: "High", assignedTo: "Sarah Chen", value: "$450,000/yr" },
  { id: "RNW-003", contractId: "CTR-004", name: "Enterprise SaaS License — Salesforce CRM", owner: "Mark Johnson", initials: "MJ", dept: "IT", type: "Software", renewalDate: "Dec 31, 2024", daysRemaining: 211, status: "Upcoming", priority: "Medium", assignedTo: "Mark Johnson", value: "$120,000/yr" },
  { id: "RNW-004", contractId: "CTR-007", name: "Legal Advisory Consulting Agreement", owner: "Lisa Torres", initials: "LT", dept: "Legal", type: "Services", renewalDate: "Aug 14, 2024", daysRemaining: 72, status: "In Progress", priority: "High", assignedTo: "David Park", value: "$250,000/yr" },
  { id: "RNW-005", contractId: "CTR-010", name: "Marketing Agency Retainer Agreement", owner: "Sarah Chen", initials: "SC", dept: "Marketing", type: "Services", renewalDate: "Dec 31, 2024", daysRemaining: 211, status: "Upcoming", priority: "Medium", assignedTo: "Sarah Chen", value: "$180,000/yr" },
  { id: "RNW-006", contractId: "CTR-001", name: "Master Services Agreement — Accenture LLP", owner: "Sarah Chen", initials: "SC", dept: "Legal", type: "Vendor", renewalDate: "Jan 14, 2026", daysRemaining: 590, status: "Upcoming", priority: "Low", assignedTo: "Sarah Chen", value: "$2,500,000/yr" },
  { id: "RNW-007", contractId: "CTR-005", name: "Mutual NDA — TechVenture Group", owner: "Sarah Chen", initials: "SC", dept: "Legal", type: "NDA", renewalDate: "Apr 9, 2025", daysRemaining: 310, status: "Upcoming", priority: "Low", assignedTo: "James Lee", value: "$0" },
  { id: "RNW-008", contractId: "CTR-008", name: "GDPR Data Processing Agreement", owner: "David Park", initials: "DP", dept: "Compliance", type: "Compliance", renewalDate: "Dec 31, 2025", daysRemaining: 576, status: "Renewed", priority: "High", assignedTo: "David Park", value: "$150,000/yr" },
  { id: "RNW-009", contractId: "CTR-009", name: "Cloud Infrastructure Agreement — AWS", owner: "Mark Johnson", initials: "MJ", dept: "IT", type: "Software", renewalDate: "Feb 28, 2026", daysRemaining: 635, status: "Upcoming", priority: "Medium", assignedTo: "Mark Johnson", value: "$800,000/yr" },
];

export const RENEWAL_TREND = [
  { month: "Jan", renewed: 8, pending: 5, expired: 2 },
  { month: "Feb", renewed: 11, pending: 7, expired: 1 },
  { month: "Mar", renewed: 9, pending: 4, expired: 3 },
  { month: "Apr", renewed: 14, pending: 6, expired: 2 },
  { month: "May", renewed: 12, pending: 8, expired: 4 },
  { month: "Jun", renewed: 7, pending: 11, expired: 3 },
];

export const RENEWAL_HISTORY = [
  { id: "RNW-H-001", contractName: "GDPR Data Processing Agreement", version: "v3.0", renewalDate: "Dec 31, 2023", duration: "3 years", approvedBy: "David Park", status: "Renewed", notes: "Standard terms accepted" },
  { id: "RNW-H-002", contractName: "Cloud Infrastructure — AWS", version: "v2.0", renewalDate: "Mar 1, 2024", duration: "2 years", approvedBy: "Michael Grant", status: "Renewed", notes: "Enhanced SLA included" },
  { id: "RNW-H-003", contractName: "Marketing Agency Retainer", version: "v1.5", renewalDate: "Jan 1, 2024", duration: "2 years", approvedBy: "Sarah Chen", status: "Renewed", notes: "5% rate increase applied" },
  { id: "RNW-H-004", contractName: "Enterprise SaaS — Salesforce", version: "v3.0", renewalDate: "Jan 1, 2024", duration: "1 year", approvedBy: "Mark Johnson", status: "Renewed", notes: "Premium tier upgrade" },
  { id: "RNW-H-005", contractName: "Legal Advisory Agreement (2023)", version: "v1.0", renewalDate: "Feb 15, 2023", duration: "1 year", approvedBy: "Lisa Torres", status: "Expired", notes: "Not renewed — in-house team now handles" },
];

export const RENEWAL_STATUS_PIE = [
  { name: "Upcoming", value: 42, color: "#F59E0B" },
  { name: "In Progress", value: 18, color: "#3B82F6" },
  { name: "Renewed", value: 28, color: "#10B981" },
  { name: "Expired", value: 7, color: "#EF4444" },
  { name: "Cancelled", value: 5, color: "#6B7280" },
];

export const APPROVAL_STEPS = [
  { id: 1, step: "Request Submitted", person: "Lisa Torres", initials: "LT", role: "Operations Manager", status: "completed", date: "May 20, 2024", comments: "Initial renewal request submitted with supporting documents." },
  { id: 2, step: "Legal Review", person: "Sarah Chen", initials: "SC", role: "General Counsel", status: "completed", date: "May 22, 2024", comments: "Terms reviewed and approved. Minor amendments suggested." },
  { id: 3, step: "Compliance Check", person: "David Park", initials: "DP", role: "Chief Compliance Officer", status: "completed", date: "May 25, 2024", comments: "All compliance requirements met. GDPR compliant." },
  { id: 4, step: "Department Approval", person: "Michael Grant", initials: "MG", role: "CFO", status: "current", date: "Pending", comments: null },
  { id: 5, step: "Final Approval", person: "Jennifer Walsh", initials: "JW", role: "CEO", status: "pending", date: null, comments: null },
  { id: 6, step: "Contract Executed", person: "System", initials: "CQ", role: "System", status: "pending", date: null, comments: null },
];

export const REMINDER_TEMPLATES = [
  { id: 1, name: "90-Day Advance Notice", active: true, trigger: "90 days before expiry", frequency: "Once", channels: ["Email"], recipients: "Owner + Manager", lastSent: "May 28, 2024" },
  { id: 2, name: "30-Day Critical Alert", active: true, trigger: "30 days before expiry", frequency: "Once", channels: ["Email", "SMS", "In-App"], recipients: "Owner + Manager + Legal", lastSent: "May 25, 2024" },
  { id: 3, name: "7-Day Final Warning", active: true, trigger: "7 days before expiry", frequency: "Daily", channels: ["Email", "SMS"], recipients: "All Stakeholders", lastSent: "Jun 2, 2024" },
  { id: 4, name: "Weekly Digest", active: false, trigger: "Every Monday", frequency: "Weekly", channels: ["Email", "In-App"], recipients: "Management + Legal", lastSent: "Jun 3, 2024" },
];

export const statusColors = {
  "Upcoming": { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", badge: "bg-blue-100 text-blue-800" },
  "Due Soon": { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", badge: "bg-amber-100 text-amber-800" },
  "In Progress": { bg: "bg-violet-50", border: "border-violet-200", text: "text-violet-700", badge: "bg-violet-100 text-violet-800" },
  "Renewed": { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", badge: "bg-emerald-100 text-emerald-800" },
  "Expired": { bg: "bg-red-50", border: "border-red-200", text: "text-red-700", badge: "bg-red-100 text-red-800" },
};

export const priorityColors = {
  "Critical": "bg-red-100 text-red-800",
  "High": "bg-orange-100 text-orange-800",
  "Medium": "bg-yellow-100 text-yellow-800",
  "Low": "bg-gray-100 text-gray-800",
};
