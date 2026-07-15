export const metrics = [
  {
    id: 1,
    title: "Overall Compliance",
    value: "94.2%",
    trend: "+1.8% vs last quarter",
    color: "#16a34a",
  },
  {
    id: 2,
    title: "Missed Deadlines",
    value: "3",
    trend: "-2 vs last month",
    color: "#dc2626",
  },
  {
    id: 3,
    title: "Risk Flags",
    value: "5",
    trend: "Medium aggregate",
    color: "#f59e0b",
  },
  {
    id: 4,
    title: "Audits Completed",
    value: "18 / 22",
    trend: "4 pending review",
    color: "#2563eb",
  },
];

export const departments = [
  { department: "Legal", score: 98 },
  { department: "Finance", score: 91 },
  { department: "HR", score: 87 },
  { department: "IT", score: 95 },
  { department: "Operations", score: 80 },
  { department: "Procurement", score: 89 },
];

export const riskTrend = [
  { month: "Jan", risk: 85 },
  { month: "Feb", risk: 80 },
  { month: "Mar", risk: 88 },
  { month: "Apr", risk: 82 },
  { month: "May", risk: 86 },
  { month: "Jun", risk: 91 },
];

export const auditSummary = {
  total: 22,
  completed: 18,
  inProgress: 3,
  failed: 1,
};

export const audits = [
  {
    audit: "Q2 Vendor Contracts Audit",
    department: "Procurement",
    auditor: "David Park",
    status: "Completed",
    score: "97%",
  },
  {
    audit: "Employment Compliance Review",
    department: "HR",
    auditor: "Sarah Chen",
    status: "Completed",
    score: "89%",
  },
  {
    audit: "GDPR Data Processing Audit",
    department: "IT",
    auditor: "Mark Johnson",
    status: "In Progress",
    score: "--",
  },
  {
    audit: "Financial Controls Audit",
    department: "Finance",
    auditor: "David Park",
    status: "Completed",
    score: "91%",
  },
  {
    audit: "Lease Agreement Review",
    department: "Operations",
    auditor: "Lisa Torres",
    status: "Terminated",
    score: "68%",
  },
];

export const risks = [
  {
    title: "Expired contracts with active obligations",
    level: "High",
    count: 2,
  },
  {
    title: "Contracts with no designated owner",
    level: "Medium",
    count: 7,
  },
  {
    title: "Obligations past due date",
    level: "High",
    count: 3,
  },
  {
    title: "Missing compliance documentation",
    level: "Medium",
    count: 5,
  },
  {
    title: "Unreviewed renewal notices",
    level: "Low",
    count: 4,
  },
];