export const STATUS_ORDER = [
  "Pending",
  "In Progress",
  "Under Review",
  "Completed",
  "Overdue",
];

export const STATUS_CONFIG = [
  { key: "Pending", label: "Pending", dot: "bg-slate-500", text: "text-slate-700" },
  { key: "In Progress", label: "In Progress", dot: "bg-purple-500", text: "text-purple-700" },
  { key: "Under Review", label: "Under Review", dot: "bg-amber-500", text: "text-amber-700" },
  { key: "Completed", label: "Completed", dot: "bg-emerald-500", text: "text-emerald-700" },
  { key: "Overdue", label: "Overdue", dot: "bg-red-500", text: "text-red-700" },
];

export const PRIORITIES = ["Low", "Medium", "High", "Critical"];

export const ASSIGNEE_COLORS = {
  Sarah: "bg-blue-600",
  Mark: "bg-orange-500",
  David: "bg-emerald-500",
  James: "bg-red-500",
  Lisa: "bg-purple-500",
};
