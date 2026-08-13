// Replace this module with a real API/service call, e.g.
// export const fetchContracts = () => fetch("/api/contracts").then(r => r.json());

export const summary = {
  overallScore: 87,
  totalContracts: 214,
  compliant: 176,
  atRisk: 26,
  expired: 12,
  trend: [
    { month: "Feb", score: 79 },
    { month: "Mar", score: 81 },
    { month: "Apr", score: 80 },
    { month: "May", score: 84 },
    { month: "Jun", score: 85 },
    { month: "Jul", score: 87 },
  ],
};

export const categoryBreakdown = [
  { category: "Data Privacy", compliant: 48, atRisk: 6, expired: 2 },
  { category: "Vendor SLA", compliant: 39, atRisk: 8, expired: 3 },
  { category: "Financial", compliant: 44, atRisk: 5, expired: 4 },
  { category: "Regulatory", compliant: 30, atRisk: 4, expired: 2 },
  { category: "HR / Labor", compliant: 15, atRisk: 3, expired: 1 },
];

export const kpis = [
  { label: "Compliance Score", value: "91%", tag: "+2.1%", tagTone: "up" },
  { label: "Open Risks", value: "7", tag: "\u2191 2 new", tagTone: "warn" },
  { label: "Audit Findings", value: "5", tag: "Open", tagTone: "neutral" },
  { label: "Missed Obligations", value: "3", tag: "Urgent", tagTone: "danger" },
  { label: "Dept Avg Score", value: "86%", tag: "+3% MoM", tagTone: "up" },
  { label: "Reports Ready", value: "4", tag: "Available", tagTone: "neutral" },
];

export const complianceTabs = [
  "Compliance Overview",
  "Risk Indicators",
  "Audit Summary",
  "Dept Performance",
  "Missed Obligations",
  "Compliance History",
  "Compliance Docs",
];

export const statusBreakdown = [
  { label: "Compliant", count: 142, percentage: 69, color: "#22C55E" },
  { label: "Pending", count: 28, percentage: 14, color: "#F59E0B" },
  { label: "Delayed", count: 19, percentage: 9, color: "#FB923C" },
  { label: "Non-Compliant", count: 11, percentage: 5, color: "#EF4444" },
  { label: "High Risk", count: 6, percentage: 3, color: "#8B5CF6" },
];

export const quickStats = [
  { label: "Open Risks", value: 7, caption: "\u2191 2 this week", tone: "warn" },
  { label: "Audit Findings", value: 5, caption: "Down from 8", tone: "neutral" },
  { label: "Missed Obligations", value: 3, caption: "Action needed", tone: "danger" },
  { label: "Compliant Depts", value: "5/8", caption: "3 improving", tone: "up" },
];

export const departmentScores = [
  { department: "IT", score: 92 },
  { department: "HR", score: 90 },
  { department: "Operations", score: 64 },
  { department: "Marketing", score: 75 },
];

export const topRiskIndicators = [
  { title: "Office Lease Expired", meta: "Operations \u00b7 2024-12-05", severity: "Critical" },
  { title: "GDPR Article 30 Report Overdue", meta: "Legal \u00b7 2024-11-30", severity: "High" },
  { title: "Azure SLA Documentation Gap", meta: "IT \u00b7 2024-11-25", severity: "High" },
  { title: "Inspection Report Missing", meta: "Operations \u00b7 2024-11-15", severity: "High" },
];

export const missedObligations = [
  { title: "GDPR Article 30 report", due: "Due 2024-11-30", owner: "James Park", status: "6d late" },
  { title: "Floor inspection report filing", due: "Due 2024-11-15", owner: "Tom Weston", status: "21d late" },
  { title: "Q4 financial advisory report", due: "Due 2024-12-31", owner: "Marcus Reid", status: "Due today" },
];

export const auditSummary = [
  { label: "Audits Completed", value: 14, tone: "up" },
  { label: "Findings Raised", value: 23, tone: "warn" },
  { label: "Resolved Findings", value: 18, tone: "neutral" },
  { label: "Open Findings", value: 5, tone: "danger" },
];

export const contracts = [
  {
    id: "CTR-2026-0142",
    name: "Northwind Data Processing Agreement",
    vendor: "Northwind Analytics Ltd.",
    category: "Data Privacy",
    owner: "Isra Didagur",
    status: "Compliant",
    riskScore: 12,
    expiryDate: "2027-03-15",
    lastReviewed: "2026-06-02",
  },
  {
    id: "CTR-2026-0138",
    name: "Cloud Infrastructure MSA",
    vendor: "Helios Cloud Systems",
    category: "Vendor SLA",
    owner: "Rahul Menon",
    status: "At Risk",
    riskScore: 58,
    expiryDate: "2026-08-30",
    lastReviewed: "2026-05-18",
  },
  {
    id: "CTR-2026-0119",
    name: "Payment Gateway Services",
    vendor: "Veridian Payments",
    category: "Financial",
    owner: "Anjali Rao",
    status: "Expired",
    riskScore: 91,
    expiryDate: "2026-06-01",
    lastReviewed: "2026-04-11",
  },
  {
    id: "CTR-2026-0155",
    name: "GDPR Data Transfer Addendum",
    vendor: "Northwind Analytics Ltd.",
    category: "Regulatory",
    owner: "Isra Didagur",
    status: "Compliant",
    riskScore: 8,
    expiryDate: "2027-01-20",
    lastReviewed: "2026-06-28",
  },
  {
    id: "CTR-2026-0127",
    name: "Contractor Master Agreement",
    vendor: "Bluepeak Staffing",
    category: "HR / Labor",
    owner: "David Chen",
    status: "At Risk",
    riskScore: 63,
    expiryDate: "2026-09-05",
    lastReviewed: "2026-05-02",
  },
  {
    id: "CTR-2026-0161",
    name: "SOC 2 Vendor Attestation",
    vendor: "Helios Cloud Systems",
    category: "Regulatory",
    owner: "Rahul Menon",
    status: "Compliant",
    riskScore: 15,
    expiryDate: "2026-12-11",
    lastReviewed: "2026-07-01",
  },
  {
    id: "CTR-2026-0103",
    name: "Vendor Insurance Certificate",
    vendor: "Veridian Payments",
    category: "Financial",
    owner: "Anjali Rao",
    status: "Expired",
    riskScore: 85,
    expiryDate: "2026-05-22",
    lastReviewed: "2026-03-30",
  },
  {
    id: "CTR-2026-0149",
    name: "Employee Data Handling Policy",
    vendor: "Internal",
    category: "HR / Labor",
    owner: "David Chen",
    status: "Compliant",
    riskScore: 20,
    expiryDate: "2027-02-14",
    lastReviewed: "2026-06-15",
  },
];
