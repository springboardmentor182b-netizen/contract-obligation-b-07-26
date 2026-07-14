import api from "./api";

const complianceColors = { Compliant: "#10b981", Pending: "#3b82f6", Delayed: "#f59e0b", "Non-Compliant": "#ef4444", "High Risk": "#8b5cf6" };

function monthLabel(date) {
  return new Intl.DateTimeFormat("en", { month: "short" }).format(date);
}

function readableDate(value) {
  return value ? new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric" }).format(new Date(value)) : "Not set";
}

export async function getDashboardSummary() {
  const { data } = await api.get("/dashboard");
  if (data.dashboard) return data.dashboard;
  const contracts = data.contracts;
  const obligations = data.obligations;
  const renewals = data.renewals;
  const today = new Date();
  const months = Array.from({ length: 6 }, (_, index) => new Date(today.getFullYear(), today.getMonth() - 5 + index, 1));
  const overdue = obligations.filter((item) => item.status === "Overdue");
  const expiring = contracts.filter((item) => item.expiryDate && new Date(item.expiryDate) >= today && (new Date(item.expiryDate) - today) / 86400000 <= 180);

  return {
    unreadNotifications: data.unread_notifications,
    stats: {
      totalContracts: { value: contracts.length, trend: 0 },
      activeContracts: { value: data.active_contracts, trend: 0, newThisMonth: contracts.filter((item) => new Date(item.uploadedAt).getMonth() === today.getMonth()).length },
      upcomingRenewals: { value: expiring.length, urgent: expiring.filter((item) => (new Date(item.expiryDate) - today) / 86400000 <= 30).length },
      pendingObligations: { value: data.pending_obligations, highPriority: overdue.length, newCount: 0 },
      complianceScore: { value: obligations.length ? Math.round(((data.compliance.by_compliance_level.Compliant ?? 0) / obligations.length) * 100) : 0, trend: 0 },
    },
    contractVolume: months.map((month) => {
      const created = contracts.filter((item) => { const date = new Date(item.uploadedAt); return date.getFullYear() === month.getFullYear() && date.getMonth() === month.getMonth(); });
      return { month: monthLabel(month), active: created.filter((item) => item.status === "Active").length, new: created.length, expired: created.filter((item) => item.status === "Expired").length };
    }),
    complianceStatus: Object.entries(data.compliance.by_compliance_level).map(([label, value]) => ({ label, value: obligations.length ? Math.round((value / obligations.length) * 100) : 0, color: complianceColors[label] ?? "#64748b" })).filter((item) => item.value > 0),
    renewalsTrend: months.map((month) => ({ month: monthLabel(month), count: renewals.filter((item) => { const date = new Date(item.renewal_date); return date.getFullYear() === month.getFullYear() && date.getMonth() === month.getMonth(); }).length })),
    recentActivity: data.recent_activities.map((item) => ({ id: item.id, type: item.message.includes("renew") ? "renewal" : item.message.includes("completed") ? "completed" : "created", text: item.message, timeAgo: readableDate(item.created_at) })),
    upcomingDeadlines: obligations.filter((item) => item.due_date).sort((a, b) => new Date(a.due_date) - new Date(b.due_date)).slice(0, 5).map((item) => ({ contractId: contracts.find((contract) => contract.id === item.contract_id)?.title ?? "Contract", obligation: item.title, dueDate: readableDate(item.due_date), assignee: { name: "Contract owner", initials: "CO" }, priority: item.compliance_level === "High Risk" ? "Critical" : "Medium", status: item.status })),
  };
}
