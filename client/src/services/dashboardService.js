import { getStoredContracts } from "./contractRepository";

const COLORS = {
  Compliant: "#10b981",
  Pending: "#3b82f6",
  Delayed: "#f59e0b",
  "Non-Compliant": "#ef4444",
};

function monthLabel(date) {
  return new Intl.DateTimeFormat("en", { month: "short" }).format(date);
}

function formatDate(value) {
  if (!value) return "Not set";
  return new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric" }).format(new Date(value));
}

function complianceFor(contract) {
  if (contract.status === "Expired" || contract.status === "Terminated") return "Non-Compliant";
  if (contract.status === "Under Review" || contract.status === "Draft") return "Pending";
  if (contract.expiryDate && new Date(contract.expiryDate) < new Date()) return "Delayed";
  return "Compliant";
}

export async function getDashboardSummary() {
  const contracts = getStoredContracts();
  if (contracts.length === 0) return INITIAL_SUMMARY;
  const today = new Date();
  const monthStarts = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(today.getFullYear(), today.getMonth() - 5 + index, 1);
    return date;
  });
  const contractVolume = monthStarts.map((month) => {
    const matching = contracts.filter((contract) => {
      const uploaded = new Date(contract.uploadedAt);
      return uploaded.getFullYear() === month.getFullYear() && uploaded.getMonth() === month.getMonth();
    });
    return {
      month: monthLabel(month),
      active: matching.filter((contract) => contract.status === "Active").length,
      new: matching.length,
      expired: matching.filter((contract) => contract.status === "Expired").length,
    };
  });

  const complianceStatus = Object.keys(COLORS).map((label) => ({
    label,
    value: contracts.filter((contract) => complianceFor(contract) === label).length,
    color: COLORS[label],
  })).filter((item) => item.value > 0);
  const activeContracts = contracts.filter((contract) => contract.status === "Active").length;
  const expiring = contracts.filter((contract) => {
    if (!contract.expiryDate) return false;
    const days = (new Date(contract.expiryDate) - today) / 86400000;
    return days >= 0 && days <= 180;
  });
  const overdue = contracts.filter((contract) => contract.expiryDate && new Date(contract.expiryDate) < today);
  const compliant = contracts.filter((contract) => complianceFor(contract) === "Compliant").length;

  return {
    stats: {
      totalContracts: { value: contracts.length, trend: 0 },
      activeContracts: { value: activeContracts, trend: 0, newThisMonth: contractVolume.at(-1).new },
      upcomingRenewals: { value: expiring.length, urgent: expiring.filter((contract) => (new Date(contract.expiryDate) - today) / 86400000 <= 30).length },
      pendingObligations: { value: overdue.length, highPriority: overdue.length, newCount: 0 },
      complianceScore: { value: contracts.length ? Math.round((compliant / contracts.length) * 100) : 0, trend: 0 },
    },
    contractVolume,
    complianceStatus,
    renewalsTrend: monthStarts.map((month) => ({
      month: monthLabel(month),
      count: contracts.filter((contract) => contract.expiryDate && new Date(contract.expiryDate).getFullYear() === month.getFullYear() && new Date(contract.expiryDate).getMonth() === month.getMonth()).length,
    })),
    recentActivity: contracts.slice(0, 5).map((contract) => ({
      id: contract.id,
      type: "created",
      text: `${contract.fileName} added to the repository`,
      timeAgo: formatDate(contract.uploadedAt),
    })),
    upcomingDeadlines: contracts.filter((contract) => contract.expiryDate).sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate)).slice(0, 5).map((contract) => ({
      contractId: contract.title,
      obligation: `${contract.category} contract renewal`,
      dueDate: formatDate(contract.expiryDate),
      assignee: { name: contract.counterparty || "Unassigned", initials: (contract.counterparty || "U").slice(0, 2).toUpperCase() },
      priority: new Date(contract.expiryDate) < today ? "Critical" : "Medium",
      status: new Date(contract.expiryDate) < today ? "Overdue" : "Pending",
    })),
  };
}

const INITIAL_SUMMARY = {
  stats: {
    totalContracts: { value: 84, trend: 8.2 },
    activeContracts: { value: 42, trend: 7.7, newThisMonth: 3 },
    upcomingRenewals: { value: 4, urgent: 2 },
    pendingObligations: { value: 5, highPriority: 3, newCount: 2 },
    complianceScore: { value: 87, trend: 5.2 },
  },
  contractVolume: [
    { month: "Jan", active: 32, new: 6, expired: 3 }, { month: "Feb", active: 27, new: 5, expired: 3 },
    { month: "Mar", active: 30, new: 6, expired: 2 }, { month: "Apr", active: 33, new: 6, expired: 3 },
    { month: "May", active: 36, new: 5, expired: 2 }, { month: "Jun", active: 34, new: 6, expired: 3 },
    { month: "Jul", active: 37, new: 6, expired: 2 },
  ],
  complianceStatus: [
    { label: "Compliant", value: 58, color: "#10b981" }, { label: "Pending", value: 20, color: "#3b82f6" },
    { label: "Delayed", value: 12, color: "#f59e0b" }, { label: "Non-Compliant", value: 7, color: "#ef4444" },
    { label: "High Risk", value: 3, color: "#8b5cf6" },
  ],
  renewalsTrend: [
    { month: "Jan", count: 8 }, { month: "Feb", count: 5 }, { month: "Mar", count: 11 },
    { month: "Apr", count: 6 }, { month: "May", count: 8 }, { month: "Jun", count: 6 }, { month: "Jul", count: 4 },
  ],
  recentActivity: [
    { id: 1, type: "overdue", text: "CTR-002 building audit overdue by 4 days", timeAgo: "2h ago" },
    { id: 2, type: "renewal", text: "CTR-004 renewal workflow initiated", timeAgo: "1d ago" },
    { id: 3, type: "review", text: "CTR-007 submitted to Legal for review", timeAgo: "2d ago" },
    { id: 4, type: "completed", text: "OBL-004 billing reconciliation completed", timeAgo: "3d ago" },
    { id: 5, type: "created", text: "CTR-010 Franchise Agreement draft created", timeAgo: "5d ago" },
  ],
  upcomingDeadlines: [
    { contractId: "CTR-004", obligation: "Q3 Component Delivery", dueDate: "Sep 1, 2025", assignee: { name: "David", initials: "DR" }, priority: "Critical", status: "In Progress" },
    { contractId: "CTR-003", obligation: "Monthly HR Report — July", dueDate: "Jul 31, 2025", assignee: { name: "Priya", initials: "PS" }, priority: "High", status: "Pending" },
    { contractId: "CTR-001", obligation: "Annual License Payment", dueDate: "Jan 15, 2026", assignee: { name: "James", initials: "JO" }, priority: "High", status: "Pending" },
    { contractId: "CTR-002", obligation: "Building Maintenance Audit", dueDate: "Jun 30, 2025", assignee: { name: "James", initials: "JO" }, priority: "Critical", status: "Overdue" },
    { contractId: "CTR-008", obligation: "EMEA Expansion Report", dueDate: "Aug 15, 2025", assignee: { name: "David", initials: "DR" }, priority: "Medium", status: "Pending" },
  ],
};