import { useState, useEffect } from "react";
import { BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { FileText, Shield, Users, LayoutDashboard, CheckSquare, Settings, Bell, Search, LogOut, X, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Calendar, Download, Plus, Eye, Edit, Activity, Lock, Mail, ChevronLeft, ChevronRight, Database, RefreshCw, Globe, Info, AlertCircle, Archive, Paperclip, Flag, Star, EyeOff, Phone, Building2, UserCheck, KeyRound, ShieldAlert, ShieldCheck, ShieldX, Clock, ArrowRight, Loader2, CheckCircle2, XCircle, LogIn, RotateCcw, Hourglass, BellRing, ClipboardList, BarChart2, Send, Filter, SortAsc, ChevronDown, Trash2, Copy, MoreHorizontal, MessageSquare, ThumbsUp, ThumbsDown, FileCheck, Timer, Layers, CalendarDays, CalendarCheck, CalendarX, CalendarClock, Repeat2, Zap, Hash, FileBarChart, FileSpreadsheet, FilePieChart, MapPin, UserCog, ChevronUp, Printer, FolderOpen, List, ClipboardCheck, Target, Briefcase, Table2, BellOff, Smartphone, Monitor, UserPlus, UserX, Key, Fingerprint, ShieldOff, Tablet, AtSign, ToggleLeft, ToggleRight, VolumeX, Volume2, BadgeCheck, Ban, RotateCw, Link2 } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import AddRenewalModal from "./components/AddRenewalModal.js";
// ── Mock Data ──────────────────────────────────────────────────────────────
const CONTRACTS = [{
  id: "CTR-2024-001",
  name: "Master Services Agreement — Accenture LLP",
  type: "Vendor",
  party: "Accenture LLP",
  effective: "Jan 15, 2024",
  expiry: "Jan 14, 2026",
  status: "Active",
  owner: "Sarah Chen",
  value: "$2,400,000"
}, {
  id: "CTR-2024-002",
  name: "Executive Employment Agreement — J. Whitfield",
  type: "Employment",
  party: "James Whitfield",
  effective: "Mar 1, 2024",
  expiry: "Feb 28, 2026",
  status: "Active",
  owner: "David Park",
  value: "$380,000"
}, {
  id: "CTR-2024-003",
  name: "Commercial Lease — HQ Tower A, Floors 12–15",
  type: "Lease",
  party: "Metropolitan REIT Corp.",
  effective: "Jun 1, 2022",
  expiry: "May 31, 2024",
  status: "Expiring Soon",
  owner: "Lisa Torres",
  value: "$1,800,000/yr"
}, {
  id: "CTR-2024-004",
  name: "Enterprise SaaS License — Salesforce CRM",
  type: "Software",
  party: "Salesforce Inc.",
  effective: "Jan 1, 2024",
  expiry: "Dec 31, 2024",
  status: "Under Review",
  owner: "Mark Johnson",
  value: "$240,000"
}, {
  id: "CTR-2024-005",
  name: "Mutual Non-Disclosure Agreement — TechVenture Group",
  type: "NDA",
  party: "TechVenture Group LLC",
  effective: "Apr 10, 2024",
  expiry: "Apr 9, 2025",
  status: "Active",
  owner: "Sarah Chen",
  value: "N/A"
}, {
  id: "CTR-2024-006",
  name: "APAC Distribution Agreement",
  type: "Vendor",
  party: "Pacific Trade Co. Ltd.",
  effective: "Jul 1, 2023",
  expiry: "Jun 30, 2024",
  status: "Expiring Soon",
  owner: "James Lee",
  value: "$890,000"
}, {
  id: "CTR-2024-007",
  name: "Legal Advisory Consulting Agreement",
  type: "Services",
  party: "Morrison & Foerster LLP",
  effective: "Feb 15, 2024",
  expiry: "Aug 14, 2024",
  status: "Draft",
  owner: "Lisa Torres",
  value: "$120,000"
}, {
  id: "CTR-2024-008",
  name: "GDPR Data Processing Agreement — EU Consortium",
  type: "Compliance",
  party: "EU Partners Consortium",
  effective: "Jan 1, 2024",
  expiry: "Dec 31, 2025",
  status: "Active",
  owner: "David Park",
  value: "N/A"
}, {
  id: "CTR-2024-009",
  name: "Cloud Infrastructure Agreement — AWS Enterprise",
  type: "Software",
  party: "Amazon Web Services",
  effective: "Mar 1, 2024",
  expiry: "Feb 28, 2026",
  status: "Active",
  owner: "Mark Johnson",
  value: "$560,000"
}, {
  id: "CTR-2024-010",
  name: "Marketing Agency Retainer Agreement",
  type: "Services",
  party: "Ogilvy & Mather Group",
  effective: "Jan 1, 2024",
  expiry: "Dec 31, 2024",
  status: "Under Review",
  owner: "Sarah Chen",
  value: "$180,000"
}];
const OBLIGATIONS = [{
  id: "OBL-001",
  title: "Q2 Compliance Report Submission",
  contract: "Master Services Agreement — Accenture LLP",
  assignee: "Sarah Chen",
  initials: "SC",
  due: "Jun 30, 2024",
  priority: "High",
  status: "In Progress",
  category: "Reporting"
}, {
  id: "OBL-002",
  title: "Annual Insurance Certificate Renewal",
  contract: "Commercial Lease — HQ Tower A",
  assignee: "Lisa Torres",
  initials: "LT",
  due: "May 15, 2024",
  priority: "Critical",
  status: "Overdue",
  category: "Insurance"
}, {
  id: "OBL-003",
  title: "GDPR Data Audit Completion",
  contract: "GDPR Data Processing Agreement",
  assignee: "David Park",
  initials: "DP",
  due: "Jul 1, 2024",
  priority: "High",
  status: "Pending",
  category: "Audit"
}, {
  id: "OBL-004",
  title: "APAC Vendor Performance Review",
  contract: "APAC Distribution Agreement",
  assignee: "James Lee",
  initials: "JL",
  due: "Jun 15, 2024",
  priority: "Medium",
  status: "Under Review",
  category: "Review"
}, {
  id: "OBL-005",
  title: "Salesforce License Renewal Decision",
  contract: "Enterprise SaaS License — Salesforce",
  assignee: "Mark Johnson",
  initials: "MJ",
  due: "Nov 1, 2024",
  priority: "Medium",
  status: "Pending",
  category: "Renewal"
}, {
  id: "OBL-006",
  title: "Executive Compensation Adjustment",
  contract: "Executive Employment Agreement",
  assignee: "David Park",
  initials: "DP",
  due: "Sep 1, 2024",
  priority: "High",
  status: "Pending",
  category: "HR"
}, {
  id: "OBL-007",
  title: "Q2 Lease Payment — Metropolitan REIT",
  contract: "Commercial Lease — HQ Tower A",
  assignee: "Lisa Torres",
  initials: "LT",
  due: "Jun 1, 2024",
  priority: "Critical",
  status: "Completed",
  category: "Payment"
}, {
  id: "OBL-008",
  title: "NDA Scope Review — Partnership Terms",
  contract: "Mutual NDA — TechVenture Group",
  assignee: "Sarah Chen",
  initials: "SC",
  due: "Aug 10, 2024",
  priority: "Low",
  status: "Pending",
  category: "Review"
}, {
  id: "OBL-009",
  title: "AWS Usage Compliance Report",
  contract: "Cloud Infrastructure Agreement",
  assignee: "Mark Johnson",
  initials: "MJ",
  due: "Jul 15, 2024",
  priority: "Medium",
  status: "In Progress",
  category: "Reporting"
}, {
  id: "OBL-010",
  title: "Marketing Campaign Legal Review",
  contract: "Marketing Agency Retainer",
  assignee: "Sarah Chen",
  initials: "SC",
  due: "Jun 20, 2024",
  priority: "Low",
  status: "Completed",
  category: "Review"
}];
const USERS = [{
  id: "USR-001",
  name: "Sarah Chen",
  email: "sarah.chen@contractiq.com",
  role: "Legal Manager",
  status: "Active",
  lastLogin: "Jun 3, 2024 — 9:14 AM",
  contracts: 34,
  initials: "SC"
}, {
  id: "USR-002",
  name: "David Park",
  email: "david.park@contractiq.com",
  role: "Compliance Officer",
  status: "Active",
  lastLogin: "Jun 3, 2024 — 8:52 AM",
  contracts: 28,
  initials: "DP"
}, {
  id: "USR-003",
  name: "Lisa Torres",
  email: "lisa.torres@contractiq.com",
  role: "Legal Manager",
  status: "Active",
  lastLogin: "Jun 2, 2024 — 4:31 PM",
  contracts: 19,
  initials: "LT"
}, {
  id: "USR-004",
  name: "Mark Johnson",
  email: "mark.johnson@contractiq.com",
  role: "Contract Manager",
  status: "Active",
  lastLogin: "Jun 1, 2024 — 11:07 AM",
  contracts: 12,
  initials: "MJ"
}, {
  id: "USR-005",
  name: "James Lee",
  email: "james.lee@contractiq.com",
  role: "Contract Manager",
  status: "Inactive",
  lastLogin: "May 28, 2024 — 2:45 PM",
  contracts: 22,
  initials: "JL"
}, {
  id: "USR-006",
  name: "Alexandra Ross",
  email: "admin@contractiq.com",
  role: "Administrator",
  status: "Active",
  lastLogin: "Jun 3, 2024 — 10:01 AM",
  contracts: 0,
  initials: "AR"
}, {
  id: "USR-007",
  name: "Michael Grant",
  email: "m.grant@contractiq.com",
  role: "Department Head",
  status: "Active",
  lastLogin: "Jun 2, 2024 — 3:22 PM",
  contracts: 8,
  initials: "MG"
}, {
  id: "USR-008",
  name: "Jennifer Walsh",
  email: "j.walsh@contractiq.com",
  role: "Department Head",
  status: "Active",
  lastLogin: "Jun 1, 2024 — 9:00 AM",
  contracts: 5,
  initials: "JW"
}, {
  id: "USR-009",
  name: "Ryan Patel",
  email: "r.patel@contractiq.com",
  role: "Employee",
  status: "Active",
  lastLogin: "Jun 3, 2024 — 7:45 AM",
  contracts: 3,
  initials: "RP"
}, {
  id: "USR-010",
  name: "Chloe Adams",
  email: "c.adams@contractiq.com",
  role: "Employee",
  status: "Active",
  lastLogin: "Jun 2, 2024 — 2:10 PM",
  contracts: 2,
  initials: "CA"
}];
const CONTRACT_ACTIVITY = [{
  month: "Jan",
  created: 12,
  renewed: 4,
  terminated: 2
}, {
  month: "Feb",
  created: 18,
  renewed: 6,
  terminated: 1
}, {
  month: "Mar",
  created: 14,
  renewed: 8,
  terminated: 3
}, {
  month: "Apr",
  created: 22,
  renewed: 5,
  terminated: 2
}, {
  month: "May",
  created: 19,
  renewed: 9,
  terminated: 4
}, {
  month: "Jun",
  created: 26,
  renewed: 7,
  terminated: 1
}];
const DEPT_COMPLIANCE = [{
  dept: "Legal",
  score: 98,
  target: 95
}, {
  dept: "Finance",
  score: 91,
  target: 95
}, {
  dept: "HR",
  score: 87,
  target: 90
}, {
  dept: "IT",
  score: 94,
  target: 90
}, {
  dept: "Operations",
  score: 78,
  target: 85
}, {
  dept: "Procurement",
  score: 89,
  target: 90
}];
const CONTRACT_TYPES_PIE = [{
  name: "Vendor",
  value: 38,
  color: "#2563EB"
}, {
  name: "Employment",
  value: 22,
  color: "#059669"
}, {
  name: "Lease",
  value: 14,
  color: "#D97706"
}, {
  name: "Software",
  value: 12,
  color: "#7C3AED"
}, {
  name: "NDA",
  value: 8,
  color: "#DB2777"
}, {
  name: "Other",
  value: 6,
  color: "#6B7280"
}];
const RISK_TREND = [{
  month: "Jan",
  low: 85,
  medium: 10,
  high: 5
}, {
  month: "Feb",
  low: 80,
  medium: 14,
  high: 6
}, {
  month: "Mar",
  low: 88,
  medium: 8,
  high: 4
}, {
  month: "Apr",
  low: 82,
  medium: 12,
  high: 6
}, {
  month: "May",
  low: 86,
  medium: 9,
  high: 5
}, {
  month: "Jun",
  low: 91,
  medium: 7,
  high: 2
}];
const ACTIVITY_LOG = [{
  id: 1,
  initials: "SC",
  user: "Sarah Chen",
  action: "Created new contract",
  target: "Mutual NDA — TechVenture Group",
  time: "10 min ago",
  type: "create"
}, {
  id: 2,
  initials: "DP",
  user: "David Park",
  action: "Updated compliance status on",
  target: "GDPR Data Processing Agreement",
  time: "32 min ago",
  type: "update"
}, {
  id: 3,
  initials: "LT",
  user: "Lisa Torres",
  action: "Submitted for approval",
  target: "Commercial Lease — HQ Tower A",
  time: "1 hr ago",
  type: "submit"
}, {
  id: 4,
  initials: "MJ",
  user: "Mark Johnson",
  action: "Completed obligation",
  target: "Q2 Lease Payment — Metropolitan REIT",
  time: "2 hrs ago",
  type: "complete"
}, {
  id: 5,
  initials: "AR",
  user: "Alexandra Ross",
  action: "Provisioned user account for",
  target: "James Lee (Legal Manager)",
  time: "3 hrs ago",
  type: "admin"
}, {
  id: 6,
  initials: "SC",
  user: "Sarah Chen",
  action: "Flagged for renewal review",
  target: "APAC Distribution Agreement",
  time: "5 hrs ago",
  type: "flag"
}];
const NOTIFICATIONS = [{
  id: 1,
  type: "warning",
  title: "Contract Expiring",
  message: "Commercial Lease — HQ Tower A expires in 28 days.",
  time: "5 min ago",
  read: false
}, {
  id: 2,
  type: "critical",
  title: "Overdue Obligation",
  message: "Annual Insurance Certificate Renewal is 3 days overdue.",
  time: "1 hr ago",
  read: false
}, {
  id: 3,
  type: "info",
  title: "Approval Required",
  message: "Legal Advisory Consulting Agreement needs your signature.",
  time: "2 hrs ago",
  read: false
}, {
  id: 4,
  type: "success",
  title: "Obligation Completed",
  message: "Q2 Lease Payment submitted successfully.",
  time: "4 hrs ago",
  read: true
}, {
  id: 5,
  type: "warning",
  title: "Renewal Reminder",
  message: "Enterprise SaaS License — Salesforce renews in 45 days.",
  time: "1 day ago",
  read: true
}];

// ── Renewal Mock Data ──────────────────────────────────────────────────────

const RENEWALS = [];
const RENEWAL_TREND = [];
const RENEWAL_STATUS_PIE = [];
const REMINDER_TEMPLATES = [];
const APPROVAL_STEPS = [];
const RENEWAL_HISTORY = [];
const CALENDAR_EVENTS = [];
// ── Helpers ────────────────────────────────────────────────────────────────
function Badge({
  variant,
  children
}) {
  const styles = {
    success: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20",
    warning: "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20",
    danger: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20",
    info: "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20",
    neutral: "bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-400/20",
    purple: "bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-600/20",
    orange: "bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-600/20"
  };
  return /*#__PURE__*/_jsx("span", {
    className: `inline-flex items-center px-2 py-0.5 rounded text-xs font-medium font-mono whitespace-nowrap ${styles[variant]}`,
    children: children
  });
}
function statusBadge(status) {
  const map = {
    "Active": "success",
    "Expiring Soon": "warning",
    "Under Review": "info",
    "Draft": "neutral",
    "Terminated": "danger",
    "Pending": "info",
    "In Progress": "purple",
    "Completed": "success",
    "Overdue": "danger"
  };
  return /*#__PURE__*/_jsx(Badge, {
    variant: map[status] || "neutral",
    children: status
  });
}
function priorityBadge(priority) {
  const map = {
    "Critical": "danger",
    "High": "warning",
    "Medium": "info",
    "Low": "neutral"
  };
  return /*#__PURE__*/_jsx(Badge, {
    variant: map[priority] || "neutral",
    children: priority
  });
}
function renewalStatusBadge(status) {
  const map = {
    "Renewed": "success",
    "Upcoming": "warning",
    "Due Soon": "orange",
    "Expired": "danger",
    "In Progress": "info",
    "Cancelled": "neutral",
    "Pending Review": "purple"
  };
  return /*#__PURE__*/_jsx(Badge, {
    variant: map[status] || "neutral",
    children: status
  });
}
function CountdownTimer({
  days
}) {
  if (days < 0) return /*#__PURE__*/_jsxs("span", {
    className: "font-mono text-xs font-bold text-red-600",
    children: [Math.abs(days), "d overdue"]
  });
  if (days === 0) return /*#__PURE__*/_jsx("span", {
    className: "font-mono text-xs font-bold text-red-600",
    children: "Expires today"
  });
  const color = days <= 7 ? "text-red-600" : days <= 30 ? "text-orange-600" : days <= 90 ? "text-amber-600" : "text-emerald-600";
  return /*#__PURE__*/_jsxs("span", {
    className: `font-mono text-xs font-bold ${color} flex items-center gap-1`,
    children: [/*#__PURE__*/_jsx(Timer, {
      size: 10
    }), days, "d remaining"]
  });
}
const AVATAR_COLORS = {
  SC: "bg-blue-500",
  DP: "bg-emerald-500",
  LT: "bg-violet-500",
  MJ: "bg-amber-500",
  JL: "bg-rose-500",
  AR: "bg-slate-500",
  MG: "bg-cyan-600",
  JW: "bg-purple-600",
  CQ: "bg-blue-700"
};
function Av({
  initials,
  size = "sm"
}) {
  const sz = size === "sm" ? "w-7 h-7 text-xs" : "w-8 h-8 text-xs";
  return /*#__PURE__*/_jsx("div", {
    className: `${sz} rounded-full ${AVATAR_COLORS[initials] || "bg-blue-500"} flex items-center justify-center text-white font-semibold flex-shrink-0`,
    children: initials
  });
}
function MetricCard({
  title,
  value,
  delta,
  deltaPositive,
  icon: Icon,
  iconBg
}) {
  return /*#__PURE__*/_jsxs("div", {
    className: "bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow",
    children: [/*#__PURE__*/_jsxs("div", {
      className: "flex items-start justify-between mb-3",
      children: [/*#__PURE__*/_jsx("div", {
        className: `p-2 rounded-lg ${iconBg}`,
        children: /*#__PURE__*/_jsx(Icon, {
          size: 15,
          className: "text-white"
        })
      }), delta && /*#__PURE__*/_jsxs("span", {
        className: `text-xs font-medium flex items-center gap-0.5 ${deltaPositive ? "text-emerald-600" : "text-red-500"}`,
        children: [deltaPositive ? /*#__PURE__*/_jsx(TrendingUp, {
          size: 11
        }) : /*#__PURE__*/_jsx(TrendingDown, {
          size: 11
        }), delta]
      })]
    }), /*#__PURE__*/_jsx("p", {
      className: "text-2xl font-bold text-foreground font-mono mb-0.5",
      children: value
    }), /*#__PURE__*/_jsx("p", {
      className: "text-xs font-medium text-muted-foreground uppercase tracking-wide",
      children: title
    })]
  });
}
function Card({
  children,
  className = ""
}) {
  return /*#__PURE__*/_jsx("div", {
    className: `bg-card border border-border rounded-lg ${className}`,
    children: children
  });
}
function SectionLabel({
  children
}) {
  return /*#__PURE__*/_jsx("p", {
    className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3",
    children: children
  });
}

// ── Nav ────────────────────────────────────────────────────────────────────
// Role permission sets — single source of truth
const ALL_ROLES = ["Administrator", "Legal Manager", "Compliance Officer", "Contract Manager", "Department Head", "Employee"];
const MGMT_ROLES = ["Administrator", "Legal Manager", "Compliance Officer", "Contract Manager", "Department Head"];
const LEGAL_ROLES = ["Administrator", "Legal Manager", "Compliance Officer"];
const NAV_ITEMS = [
// ── Workspace (core) ──────────────────────────────────────────────────────
{
  id: "dashboard",
  label: "Dashboard",
  icon: LayoutDashboard,
  group: "core",
  roles: ["Administrator", "Legal Manager", "Compliance Officer", "Contract Manager", "Department Head"]
}, {
  id: "compliance",
  label: "Compliance",
  icon: Shield,
  group: "core",
  roles: LEGAL_ROLES
}, {
  id: "contracts",
  label: "Contract Repository",
  icon: FileText,
  group: "core",
  roles: [...ALL_ROLES]
}, {
  id: "obligations",
  label: "Obligation Tracker",
  icon: CheckSquare,
  group: "core",
  roles: [...ALL_ROLES]
},
// ── Renewals ──────────────────────────────────────────────────────────────
{
  id: "renewal-management",
  label: "Renewal Management",
  icon: CalendarCheck,
  group: "renewals",
  roles: ["Administrator", "Legal Manager", "Contract Manager", "Department Head"]
},
// ── Reports ───────────────────────────────────────────────────────────────
{
  id: "reports",
  label: "Reports & Export",
  icon: FileBarChart,
  group: "reports",
  roles: MGMT_ROLES
},
// ── Tools ─────────────────────────────────────────────────────────────────
{
  id: "notifications",
  label: "Notification Center",
  icon: Bell,
  group: "tools",
  roles: [...ALL_ROLES]
}, {
  id: "user-management",
  label: "User & Role Mgmt",
  icon: Users,
  group: "tools",
  roles: ["Administrator"]
},
// ── Admin ─────────────────────────────────────────────────────────────────
{
  id: "admin",
  label: "Admin Panel",
  icon: Settings,
  group: "admin",
  roles: ["Administrator"]
}];
function Sidebar({
  screen,
  onNavigate,
  role,
  collapsed,
  onToggle
}) {
  return /*#__PURE__*/_jsxs("div", {
    className: `flex-shrink-0 flex flex-col h-screen transition-all duration-200 ${collapsed ? "w-16" : "w-56"}`,
    style: {
      background: "#0D1B2E"
    },
    children: [/*#__PURE__*/_jsxs("div", {
      className: `flex items-center gap-2.5 h-14 border-b px-4 flex-shrink-0 ${collapsed ? "justify-center" : ""}`,
      style: {
        borderColor: "rgba(255,255,255,0.07)"
      },
      children: [/*#__PURE__*/_jsx("div", {
        className: "w-7 h-7 bg-blue-600 rounded flex items-center justify-center flex-shrink-0",
        children: /*#__PURE__*/_jsx(FileText, {
          size: 13,
          className: "text-white"
        })
      }), !collapsed && /*#__PURE__*/_jsx("span", {
        className: "text-white font-bold text-base tracking-tight",
        style: {
          fontFamily: "var(--font-display, 'Bricolage Grotesque', sans-serif)"
        },
        children: "ContractIQ"
      })]
    }), !collapsed && /*#__PURE__*/_jsx("div", {
      className: "px-3 py-3 border-b flex-shrink-0",
      style: {
        borderColor: "rgba(255,255,255,0.07)"
      },
      children: /*#__PURE__*/_jsxs("div", {
        className: "rounded px-2.5 py-2",
        style: {
          background: "rgba(255,255,255,0.05)"
        },
        children: [/*#__PURE__*/_jsx("p", {
          className: "text-[10px] uppercase tracking-widest mb-1",
          style: {
            color: "#4B6A8A"
          },
          children: "Signed in as"
        }), /*#__PURE__*/_jsx("p", {
          className: "text-xs font-bold mb-1",
          style: {
            color: "#E2E8F0"
          },
          children: "Sarah Chen"
        }), /*#__PURE__*/_jsx("span", {
          className: `inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold ${role === "Administrator" ? "bg-violet-900/60 text-violet-300" : role === "Legal Manager" ? "bg-blue-900/60 text-blue-300" : role === "Compliance Officer" ? "bg-emerald-900/60 text-emerald-300" : role === "Contract Manager" ? "bg-amber-900/60 text-amber-300" : role === "Department Head" ? "bg-orange-900/60 text-orange-300" : "bg-slate-800 text-slate-400"}`,
          children: role
        })]
      })
    }), /*#__PURE__*/_jsx("nav", {
      className: "flex-1 px-2 py-3 overflow-y-auto",
      children: (() => {
        const filtered = NAV_ITEMS.filter(item => item.roles.includes(role));
        const groups = ["core", "renewals", "reports", "tools", "admin"];
        const groupLabels = {
          core: "Workspace",
          renewals: "Renewals",
          reports: "Reports",
          tools: "Tools",
          admin: "Admin"
        };
        return groups.map(group => {
          const items = filtered.filter(i => i.group === group);
          if (!items.length) return null;
          return /*#__PURE__*/_jsxs("div", {
            className: "mb-3",
            children: [!collapsed && /*#__PURE__*/_jsx("p", {
              className: "text-xs font-semibold uppercase tracking-widest px-3 mb-1.5 mt-1",
              style: {
                color: "#2A4A6A"
              },
              children: groupLabels[group]
            }), /*#__PURE__*/_jsx("div", {
              className: "space-y-0.5",
              children: items.map(item => {
                const isActive = screen === item.id || screen === "contract-detail" && item.id === "contracts";
                return /*#__PURE__*/_jsxs("button", {
                  onClick: () => onNavigate(item.id),
                  title: collapsed ? item.label : undefined,
                  className: `w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${isActive ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"} ${collapsed ? "justify-center" : ""}`,
                  onMouseEnter: e => {
                    if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                  },
                  onMouseLeave: e => {
                    if (!isActive) e.currentTarget.style.background = "";
                  },
                  children: [/*#__PURE__*/_jsx(item.icon, {
                    size: 15,
                    className: "flex-shrink-0"
                  }), !collapsed && /*#__PURE__*/_jsx("span", {
                    className: "font-medium text-sm",
                    children: item.label
                  })]
                }, item.id);
              })
            })]
          }, group);
        });
      })()
    }), /*#__PURE__*/_jsx("div", {
      className: "p-2 border-t flex-shrink-0",
      style: {
        borderColor: "rgba(255,255,255,0.07)"
      },
      children: /*#__PURE__*/_jsx("button", {
        onClick: onToggle,
        className: "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-500 hover:text-slate-300 transition-colors",
        style: {
          justifyContent: collapsed ? "center" : "flex-start"
        },
        children: collapsed ? /*#__PURE__*/_jsx(ChevronRight, {
          size: 14
        }) : /*#__PURE__*/_jsxs(_Fragment, {
          children: [/*#__PURE__*/_jsx(ChevronLeft, {
            size: 14
          }), /*#__PURE__*/_jsx("span", {
            children: "Collapse sidebar"
          })]
        })
      })
    })]
  });
}
function TopBar({
  screen,
  role,
  onLogout,
  onToggleNotifications,
  unreadCount
}) {
  const titles = {
    login: "Login",
    register: "Register",
    "forgot-password": "Forgot Password",
    "reset-password": "Reset Password",
    "auth-loading": "Signing In",
    "auth-success": "Authenticated",
    "auth-failed": "Authentication Failed",
    "session-expired": "Session Expired",
    unauthorized: "Unauthorized",
    dashboard: role === "Compliance Officer" ? "Compliance Overview" : role === "Contract Manager" ? "Contract Dashboard" : role === "Department Head" ? "Department Dashboard" : role === "Employee" ? "My Workspace" : "Legal Dashboard",
    compliance: "Compliance Dashboard",
    admin: "Admin Panel",
    contracts: "Contract Repository",
    "contract-detail": "Contract Details",
    obligations: "Obligation Tracker",
    renewals: "Renewal Dashboard",
    "renewal-tracking": "Renewal Tracking",
    "expiry-monitoring": "Expiry Monitoring",
    "renewal-reminders": "Reminder Scheduling",
    "renewal-approval": "Approval Workflow",
    "renewal-history": "Renewal History",
    "renewal-status": "Renewal Status Overview",
    "renewal-management": "Renewal Management",
    reports: "Reports & Export",
    notifications: "Notification Center",
    "user-management": "User & Role Management"
  };
  return /*#__PURE__*/_jsxs("header", {
    className: "h-14 bg-card border-b border-border flex items-center px-5 gap-4 flex-shrink-0",
    children: [/*#__PURE__*/_jsxs("div", {
      className: "flex-1 min-w-0",
      children: [/*#__PURE__*/_jsx("p", {
        className: "text-sm font-semibold text-foreground",
        children: titles[screen]
      }), /*#__PURE__*/_jsx("p", {
        className: "text-xs text-muted-foreground",
        children: "June 3, 2024"
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "relative hidden md:block",
      children: [/*#__PURE__*/_jsx(Search, {
        size: 13,
        className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
      }), /*#__PURE__*/_jsx("input", {
        type: "text",
        placeholder: "Search contracts, obligations…",
        className: "w-52 pl-8 pr-3 py-1.5 bg-muted border border-border rounded-lg text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
      })]
    }), /*#__PURE__*/_jsxs("button", {
      onClick: onToggleNotifications,
      className: "relative w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors",
      children: [/*#__PURE__*/_jsx(Bell, {
        size: 15,
        className: "text-muted-foreground"
      }), unreadCount > 0 && /*#__PURE__*/_jsx("span", {
        className: "absolute top-0.5 right-0.5 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold leading-none",
        children: unreadCount
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "flex items-center gap-2 pl-3 border-l border-border",
      children: [/*#__PURE__*/_jsx(Av, {
        initials: "SC",
        size: "sm"
      }), /*#__PURE__*/_jsxs("div", {
        className: "hidden md:block",
        children: [/*#__PURE__*/_jsx("p", {
          className: "text-xs font-semibold text-foreground leading-tight",
          children: "Sarah Chen"
        }), /*#__PURE__*/_jsx("span", {
          className: `text-[10px] font-semibold px-1.5 py-0.5 rounded ${role === "Administrator" ? "bg-violet-100 text-violet-700" : role === "Legal Manager" ? "bg-blue-100 text-blue-700" : role === "Compliance Officer" ? "bg-emerald-100 text-emerald-700" : role === "Contract Manager" ? "bg-amber-100 text-amber-700" : role === "Department Head" ? "bg-orange-100 text-orange-700" : "bg-slate-100 text-slate-600"}`,
          children: role
        })]
      }), /*#__PURE__*/_jsx("button", {
        onClick: onLogout,
        className: "ml-1 text-muted-foreground hover:text-foreground transition-colors",
        children: /*#__PURE__*/_jsx(LogOut, {
          size: 13
        })
      })]
    })]
  });
}
function NotificationPanel({
  onClose
}) {
  const iconMap = {
    warning: AlertTriangle,
    critical: AlertCircle,
    info: Info,
    success: CheckCircle
  };
  const colorMap = {
    warning: "text-amber-500",
    critical: "text-red-500",
    info: "text-blue-500",
    success: "text-emerald-500"
  };
  return /*#__PURE__*/_jsxs("div", {
    className: "absolute top-14 right-4 w-80 bg-card border border-border rounded-lg shadow-2xl z-50 overflow-hidden",
    children: [/*#__PURE__*/_jsxs("div", {
      className: "flex items-center justify-between px-4 py-3 border-b border-border",
      children: [/*#__PURE__*/_jsx("p", {
        className: "text-sm font-semibold text-foreground",
        children: "Notifications"
      }), /*#__PURE__*/_jsxs("div", {
        className: "flex items-center gap-3",
        children: [/*#__PURE__*/_jsx("span", {
          className: "text-xs text-blue-600 cursor-pointer hover:underline",
          children: "Mark all read"
        }), /*#__PURE__*/_jsx("button", {
          onClick: onClose,
          children: /*#__PURE__*/_jsx(X, {
            size: 13,
            className: "text-muted-foreground"
          })
        })]
      })]
    }), /*#__PURE__*/_jsx("div", {
      className: "max-h-80 overflow-y-auto divide-y divide-border",
      children: NOTIFICATIONS.map(n => {
        const Icon = iconMap[n.type] || Bell;
        return /*#__PURE__*/_jsxs("div", {
          className: `flex gap-3 px-4 py-3 hover:bg-muted transition-colors ${!n.read ? "bg-blue-50/40" : ""}`,
          children: [/*#__PURE__*/_jsx(Icon, {
            size: 13,
            className: `flex-shrink-0 mt-0.5 ${colorMap[n.type]}`
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex-1 min-w-0",
            children: [/*#__PURE__*/_jsx("p", {
              className: "text-xs font-semibold text-foreground",
              children: n.title
            }), /*#__PURE__*/_jsx("p", {
              className: "text-xs text-muted-foreground leading-relaxed",
              children: n.message
            }), /*#__PURE__*/_jsx("p", {
              className: "text-xs text-muted-foreground mt-0.5",
              children: n.time
            })]
          }), !n.read && /*#__PURE__*/_jsx("div", {
            className: "w-1.5 h-1.5 rounded-full bg-blue-500 mt-1 flex-shrink-0"
          })]
        }, n.id);
      })
    }), /*#__PURE__*/_jsx("div", {
      className: "px-4 py-2.5 border-t border-border bg-muted text-center",
      children: /*#__PURE__*/_jsx("span", {
        className: "text-xs text-blue-600 cursor-pointer hover:underline",
        children: "View all notifications"
      })
    })]
  });
}

// ── Auth Panel (shared left panel) ────────────────────────────────────────
function AuthPanel({
  slim
}) {
  return /*#__PURE__*/_jsxs("div", {
    className: `hidden lg:flex flex-col justify-between flex-shrink-0 p-10 ${slim ? "w-[360px]" : "w-[440px]"}`,
    style: {
      background: "#0A1628"
    },
    children: [/*#__PURE__*/_jsxs("div", {
      children: [/*#__PURE__*/_jsxs("div", {
        className: "flex items-center gap-2.5 mb-12",
        children: [/*#__PURE__*/_jsx("div", {
          className: "w-8 h-8 bg-blue-600 rounded flex items-center justify-center",
          children: /*#__PURE__*/_jsx(FileText, {
            size: 15,
            className: "text-white"
          })
        }), /*#__PURE__*/_jsx("span", {
          className: "text-white font-bold text-lg",
          style: {
            fontFamily: "var(--font-display, 'Bricolage Grotesque', sans-serif)"
          },
          children: "ContractIQ"
        })]
      }), /*#__PURE__*/_jsxs("h1", {
        className: "text-white text-3xl font-bold leading-snug mb-4",
        style: {
          fontFamily: "var(--font-display, 'Bricolage Grotesque', sans-serif)"
        },
        children: ["Enterprise-grade", /*#__PURE__*/_jsx("br", {}), "contract intelligence."]
      }), /*#__PURE__*/_jsx("p", {
        className: "text-sm leading-relaxed",
        style: {
          color: "#5A7A9A"
        },
        children: "Centralize your contract portfolio, automate obligation tracking, and maintain regulatory compliance."
      }), /*#__PURE__*/_jsx("div", {
        className: "mt-8 space-y-3",
        children: [{
          icon: ShieldCheck,
          text: "SOC 2 Type II certified platform"
        }, {
          icon: Lock,
          text: "End-to-end AES-256 encryption"
        }, {
          icon: Globe,
          text: "GDPR & CCPA compliant infrastructure"
        }].map(({
          icon: Icon,
          text
        }) => /*#__PURE__*/_jsxs("div", {
          className: "flex items-center gap-3",
          children: [/*#__PURE__*/_jsx("div", {
            className: "w-7 h-7 rounded flex items-center justify-center flex-shrink-0",
            style: {
              background: "rgba(37,99,235,0.15)"
            },
            children: /*#__PURE__*/_jsx(Icon, {
              size: 13,
              className: "text-blue-400"
            })
          }), /*#__PURE__*/_jsx("span", {
            className: "text-sm",
            style: {
              color: "#5A7A9A"
            },
            children: text
          })]
        }, text))
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "border-t pt-6",
      style: {
        borderColor: "rgba(255,255,255,0.07)"
      },
      children: [/*#__PURE__*/_jsx("p", {
        className: "text-xs mb-2",
        style: {
          color: "#3A5A7A"
        },
        children: "Trusted by 500+ legal teams worldwide"
      }), /*#__PURE__*/_jsxs("div", {
        className: "flex items-center gap-1",
        children: [[...Array(5)].map((_, i) => /*#__PURE__*/_jsx(Star, {
          size: 11,
          className: "text-amber-400 fill-amber-400"
        }, i)), /*#__PURE__*/_jsx("span", {
          className: "text-xs ml-1.5",
          style: {
            color: "#3A5A7A"
          },
          children: "4.9/5 · 2,400 reviews"
        })]
      })]
    })]
  });
}

// ── Input Field Helper ─────────────────────────────────────────────────────
function FieldInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  icon: Icon,
  rightEl
}) {
  return /*#__PURE__*/_jsxs("div", {
    children: [/*#__PURE__*/_jsx("label", {
      className: "block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide",
      children: label
    }), /*#__PURE__*/_jsxs("div", {
      className: "relative",
      children: [Icon && /*#__PURE__*/_jsx(Icon, {
        size: 13,
        className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
      }), /*#__PURE__*/_jsx("input", {
        type: type,
        value: value,
        onChange: e => onChange?.(e.target.value),
        placeholder: placeholder,
        className: `w-full ${Icon ? "pl-9" : "pl-3"} ${rightEl ? "pr-10" : "pr-3"} py-2.5 bg-input-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors`
      }), rightEl && /*#__PURE__*/_jsx("div", {
        className: "absolute right-3 top-1/2 -translate-y-1/2",
        children: rightEl
      })]
    })]
  });
}

// ── Login Screen ───────────────────────────────────────────────────────────
function LoginScreen({
  onLogin,
  onRegister,
  onForgotPassword,
  onDemoFailed,
  onDemoExpired,
  onDemoUnauthorized
}) {
  const [email, setEmail] = useState("sarah.chen@contractiq.com");
  const [password, setPassword] = useState("contractiq2024");
  const [role, setRole] = useState("Legal Manager");
  const [showPass, setShowPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  return /*#__PURE__*/_jsxs("div", {
    className: "min-h-screen flex",
    children: [/*#__PURE__*/_jsx(AuthPanel, {}), /*#__PURE__*/_jsx("div", {
      className: "flex-1 flex items-center justify-center bg-background p-8",
      children: /*#__PURE__*/_jsxs("div", {
        className: "w-full max-w-sm",
        children: [/*#__PURE__*/_jsxs("div", {
          className: "lg:hidden flex items-center gap-2 mb-8",
          children: [/*#__PURE__*/_jsx("div", {
            className: "w-7 h-7 bg-blue-600 rounded flex items-center justify-center",
            children: /*#__PURE__*/_jsx(FileText, {
              size: 13,
              className: "text-white"
            })
          }), /*#__PURE__*/_jsx("span", {
            className: "font-bold text-foreground text-base",
            children: "ContractIQ"
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "mb-7",
          children: [/*#__PURE__*/_jsx("h2", {
            className: "text-2xl font-bold text-foreground mb-1",
            style: {
              fontFamily: "var(--font-display, 'Bricolage Grotesque', sans-serif)"
            },
            children: "Welcome back"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-sm text-muted-foreground",
            children: "Sign in to access the ContractIQ platform."
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "space-y-4",
          children: [/*#__PURE__*/_jsx(FieldInput, {
            label: "Email Address",
            type: "email",
            value: email,
            onChange: setEmail,
            placeholder: "name@company.com",
            icon: Mail
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx("label", {
              className: "block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide",
              children: "Password"
            }), /*#__PURE__*/_jsxs("div", {
              className: "relative",
              children: [/*#__PURE__*/_jsx(Lock, {
                size: 13,
                className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              }), /*#__PURE__*/_jsx("input", {
                type: showPass ? "text" : "password",
                value: password,
                onChange: e => setPassword(e.target.value),
                className: "w-full pl-9 pr-10 py-2.5 bg-input-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              }), /*#__PURE__*/_jsx("button", {
                onClick: () => setShowPass(s => !s),
                className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                children: showPass ? /*#__PURE__*/_jsx(EyeOff, {
                  size: 13
                }) : /*#__PURE__*/_jsx(Eye, {
                  size: 13
                })
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx("label", {
              className: "block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide",
              children: "Role"
            }), /*#__PURE__*/_jsxs("select", {
              value: role,
              onChange: e => setRole(e.target.value),
              className: "w-full px-3 py-2.5 bg-input-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
              children: [/*#__PURE__*/_jsx("option", {
                value: "Administrator",
                children: "Administrator — Full system access"
              }), /*#__PURE__*/_jsx("option", {
                value: "Legal Manager",
                children: "Legal Manager — Contracts, compliance & legal review"
              }), /*#__PURE__*/_jsx("option", {
                value: "Compliance Officer",
                children: "Compliance Officer — Compliance monitoring & audits"
              }), /*#__PURE__*/_jsx("option", {
                value: "Contract Manager",
                children: "Contract Manager — Contract creation & renewals"
              }), /*#__PURE__*/_jsx("option", {
                value: "Department Head",
                children: "Department Head — Department contracts & approvals"
              }), /*#__PURE__*/_jsx("option", {
                value: "Employee",
                children: "Employee — Assigned contracts & obligations"
              })]
            }), /*#__PURE__*/_jsx("p", {
              className: "text-[10px] text-muted-foreground mt-1.5",
              children: "Select your role to load role-specific permissions and dashboard."
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex items-center justify-between",
            children: [/*#__PURE__*/_jsxs("label", {
              className: "flex items-center gap-2 cursor-pointer select-none",
              children: [/*#__PURE__*/_jsx("input", {
                type: "checkbox",
                checked: rememberMe,
                onChange: e => setRememberMe(e.target.checked),
                className: "rounded accent-blue-600"
              }), /*#__PURE__*/_jsx("span", {
                className: "text-muted-foreground text-xs",
                children: "Remember me for 30 days"
              })]
            }), /*#__PURE__*/_jsx("button", {
              onClick: onForgotPassword,
              className: "text-xs text-primary hover:underline font-medium",
              children: "Forgot password?"
            })]
          }), /*#__PURE__*/_jsxs("button", {
            onClick: () => onLogin(role),
            className: "w-full py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-blue-700 active:scale-[0.99] transition-all flex items-center justify-center gap-2",
            children: [/*#__PURE__*/_jsx(LogIn, {
              size: 14
            }), " Sign in to ContractIQ"]
          }), /*#__PURE__*/_jsxs("p", {
            className: "text-center text-xs text-muted-foreground",
            children: ["Don't have an account? ", /*#__PURE__*/_jsx("button", {
              onClick: onRegister,
              className: "text-primary font-semibold hover:underline",
              children: "Create account"
            })]
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "mt-6 pt-5 border-t border-border space-y-3",
          children: [/*#__PURE__*/_jsx("p", {
            className: "text-xs font-semibold text-muted-foreground text-center uppercase tracking-wide",
            children: "Quick Role Access — Demo"
          }), /*#__PURE__*/_jsx("div", {
            className: "grid grid-cols-2 gap-2",
            children: [{
              r: "Administrator",
              color: "border-violet-200 text-violet-700 hover:bg-violet-50",
              dot: "bg-violet-500"
            }, {
              r: "Legal Manager",
              color: "border-blue-200 text-blue-700 hover:bg-blue-50",
              dot: "bg-blue-500"
            }, {
              r: "Compliance Officer",
              color: "border-emerald-200 text-emerald-700 hover:bg-emerald-50",
              dot: "bg-emerald-500"
            }, {
              r: "Contract Manager",
              color: "border-amber-200 text-amber-700 hover:bg-amber-50",
              dot: "bg-amber-500"
            }, {
              r: "Department Head",
              color: "border-orange-200 text-orange-700 hover:bg-orange-50",
              dot: "bg-orange-500"
            }, {
              r: "Employee",
              color: "border-slate-200 text-slate-600 hover:bg-slate-50",
              dot: "bg-slate-400"
            }].map(({
              r,
              color,
              dot
            }) => /*#__PURE__*/_jsxs("button", {
              onClick: () => onLogin(r),
              className: `flex items-center gap-2 px-3 py-2 border rounded-lg text-xs font-medium transition-colors ${color}`,
              children: [/*#__PURE__*/_jsx("span", {
                className: `w-2 h-2 rounded-full flex-shrink-0 ${dot}`
              }), r]
            }, r))
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground text-center font-medium uppercase tracking-wide pt-1",
            children: "Auth State Demos"
          }), /*#__PURE__*/_jsx("div", {
            className: "flex items-center justify-center gap-3 flex-wrap",
            children: [{
              label: "Auth Failed",
              onClick: onDemoFailed,
              color: "text-red-600"
            }, {
              label: "Session Expired",
              onClick: onDemoExpired,
              color: "text-amber-600"
            }, {
              label: "403 Unauthorized",
              onClick: onDemoUnauthorized,
              color: "text-orange-600"
            }].map(({
              label,
              onClick,
              color
            }) => /*#__PURE__*/_jsx("button", {
              onClick: onClick,
              className: `text-xs ${color} hover:underline font-medium`,
              children: label
            }, label))
          })]
        })]
      })
    })]
  });
}
function RegisterScreen({
  onBack,
  onSuccess
}) {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const pwStrength = (() => {
    let s = 0;
    if (password.length >= 8) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  })();
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][pwStrength] || "";
  const strengthColor = ["", "bg-red-500", "bg-amber-500", "bg-blue-500", "bg-emerald-500"][pwStrength] || "";
  const strengthText = ["", "text-red-600", "text-amber-600", "text-blue-600", "text-emerald-600"][pwStrength] || "";
  const inputCls = "w-full px-3 py-2.5 bg-input-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors";
  if (submitted) {
    return /*#__PURE__*/_jsx("div", {
      className: "min-h-screen flex items-center justify-center bg-background p-8",
      children: /*#__PURE__*/_jsxs("div", {
        className: "w-full max-w-sm text-center",
        children: [/*#__PURE__*/_jsx("div", {
          className: "w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-5",
          children: /*#__PURE__*/_jsx(CheckCircle2, {
            size: 32,
            className: "text-emerald-500"
          })
        }), /*#__PURE__*/_jsx("h2", {
          className: "text-xl font-bold text-foreground mb-2",
          style: {
            fontFamily: "var(--font-display, 'Bricolage Grotesque', sans-serif)"
          },
          children: "Account request submitted"
        }), /*#__PURE__*/_jsx("p", {
          className: "text-sm text-muted-foreground mb-6 leading-relaxed",
          children: "Your access request has been submitted. An Administrator will review and provision your account within 1–2 business days."
        }), /*#__PURE__*/_jsxs("div", {
          className: "bg-blue-50 border border-blue-100 rounded-lg p-4 text-left mb-6",
          children: [/*#__PURE__*/_jsx("p", {
            className: "text-xs font-semibold text-blue-800 mb-1",
            children: "What happens next?"
          }), /*#__PURE__*/_jsxs("ul", {
            className: "text-xs text-blue-700 space-y-1",
            children: [/*#__PURE__*/_jsx("li", {
              children: "→ Your request is queued for admin review"
            }), /*#__PURE__*/_jsx("li", {
              children: "→ You will receive a confirmation email"
            }), /*#__PURE__*/_jsx("li", {
              children: "→ Once approved, credentials will be emailed"
            })]
          })]
        }), /*#__PURE__*/_jsx("button", {
          onClick: onBack,
          className: "w-full py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors",
          children: "Return to Sign In"
        })]
      })
    });
  }
  return /*#__PURE__*/_jsxs("div", {
    className: "min-h-screen flex",
    children: [/*#__PURE__*/_jsx(AuthPanel, {
      slim: true
    }), /*#__PURE__*/_jsx("div", {
      className: "flex-1 flex items-start justify-center bg-background p-8 overflow-y-auto",
      children: /*#__PURE__*/_jsxs("div", {
        className: "w-full max-w-md py-4",
        children: [/*#__PURE__*/_jsxs("button", {
          onClick: onBack,
          className: "flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors",
          children: [/*#__PURE__*/_jsx(ChevronLeft, {
            size: 15
          }), " Back to sign in"]
        }), /*#__PURE__*/_jsxs("div", {
          className: "mb-7",
          children: [/*#__PURE__*/_jsx("h2", {
            className: "text-2xl font-bold text-foreground mb-1",
            style: {
              fontFamily: "var(--font-display, 'Bricolage Grotesque', sans-serif)"
            },
            children: "Create your account"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-sm text-muted-foreground",
            children: "Fill in the details below to request platform access."
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "space-y-4",
          children: [/*#__PURE__*/_jsx("div", {
            className: "bg-muted rounded-lg px-4 py-3 border border-border",
            children: /*#__PURE__*/_jsx("p", {
              className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5",
              children: "Organization Details"
            })
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx("label", {
              className: "block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide",
              children: "Organization Name"
            }), /*#__PURE__*/_jsxs("div", {
              className: "relative",
              children: [/*#__PURE__*/_jsx(Building2, {
                size: 13,
                className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              }), /*#__PURE__*/_jsx("input", {
                type: "text",
                placeholder: "Acme Corporation",
                className: `${inputCls} pl-9`
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "grid grid-cols-2 gap-3",
            children: [/*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx("label", {
                className: "block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide",
                children: "First Name"
              }), /*#__PURE__*/_jsx("input", {
                type: "text",
                placeholder: "Sarah",
                className: inputCls
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx("label", {
                className: "block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide",
                children: "Last Name"
              }), /*#__PURE__*/_jsx("input", {
                type: "text",
                placeholder: "Chen",
                className: inputCls
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx("label", {
              className: "block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide",
              children: "Company Email"
            }), /*#__PURE__*/_jsxs("div", {
              className: "relative",
              children: [/*#__PURE__*/_jsx(Mail, {
                size: 13,
                className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              }), /*#__PURE__*/_jsx("input", {
                type: "email",
                placeholder: "name@company.com",
                className: `${inputCls} pl-9`
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx("label", {
              className: "block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide",
              children: "Phone Number"
            }), /*#__PURE__*/_jsxs("div", {
              className: "relative",
              children: [/*#__PURE__*/_jsx(Phone, {
                size: 13,
                className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              }), /*#__PURE__*/_jsx("input", {
                type: "tel",
                placeholder: "+1 (555) 000-0000",
                className: `${inputCls} pl-9`
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "grid grid-cols-2 gap-3",
            children: [/*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx("label", {
                className: "block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide",
                children: "Department"
              }), /*#__PURE__*/_jsxs("select", {
                className: inputCls,
                children: [/*#__PURE__*/_jsx("option", {
                  value: "",
                  children: "Select department"
                }), ["Legal", "Compliance", "Finance", "HR", "IT", "Operations", "Procurement", "Executive"].map(d => /*#__PURE__*/_jsx("option", {
                  children: d
                }, d))]
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx("label", {
                className: "block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide",
                children: "Role"
              }), /*#__PURE__*/_jsxs("select", {
                className: inputCls,
                children: [/*#__PURE__*/_jsx("option", {
                  value: "",
                  children: "Select a role…"
                }), /*#__PURE__*/_jsx("option", {
                  value: "Administrator",
                  children: "Administrator"
                }), /*#__PURE__*/_jsx("option", {
                  value: "Legal Manager",
                  children: "Legal Manager"
                }), /*#__PURE__*/_jsx("option", {
                  value: "Compliance Officer",
                  children: "Compliance Officer"
                }), /*#__PURE__*/_jsx("option", {
                  value: "Contract Manager",
                  children: "Contract Manager"
                }), /*#__PURE__*/_jsx("option", {
                  value: "Department Head",
                  children: "Department Head"
                }), /*#__PURE__*/_jsx("option", {
                  value: "Employee",
                  children: "Employee"
                })]
              })]
            })]
          }), /*#__PURE__*/_jsx("div", {
            className: "bg-muted rounded-lg px-4 py-3 border border-border mt-2",
            children: /*#__PURE__*/_jsx("p", {
              className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5",
              children: "Security"
            })
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx("label", {
              className: "block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide",
              children: "Password"
            }), /*#__PURE__*/_jsxs("div", {
              className: "relative",
              children: [/*#__PURE__*/_jsx(Lock, {
                size: 13,
                className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              }), /*#__PURE__*/_jsx("input", {
                type: showPass ? "text" : "password",
                value: password,
                onChange: e => setPassword(e.target.value),
                placeholder: "Minimum 8 characters",
                className: `${inputCls} pl-9 pr-10`
              }), /*#__PURE__*/_jsx("button", {
                onClick: () => setShowPass(s => !s),
                className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                children: showPass ? /*#__PURE__*/_jsx(EyeOff, {
                  size: 13
                }) : /*#__PURE__*/_jsx(Eye, {
                  size: 13
                })
              })]
            }), password && /*#__PURE__*/_jsxs("div", {
              className: "mt-2",
              children: [/*#__PURE__*/_jsx("div", {
                className: "flex gap-1 mb-1",
                children: [1, 2, 3, 4].map(i => /*#__PURE__*/_jsx("div", {
                  className: `h-1 flex-1 rounded-full transition-all ${i <= pwStrength ? strengthColor : "bg-border"}`
                }, i))
              }), /*#__PURE__*/_jsxs("p", {
                className: `text-xs font-medium ${strengthText}`,
                children: [strengthLabel, " password"]
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx("label", {
              className: "block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide",
              children: "Confirm Password"
            }), /*#__PURE__*/_jsxs("div", {
              className: "relative",
              children: [/*#__PURE__*/_jsx(Lock, {
                size: 13,
                className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              }), /*#__PURE__*/_jsx("input", {
                type: showConfirm ? "text" : "password",
                value: confirm,
                onChange: e => setConfirm(e.target.value),
                placeholder: "Re-enter your password",
                className: `${inputCls} pl-9 pr-10 ${confirm && confirm !== password ? "border-red-400 focus:border-red-400" : ""}`
              }), /*#__PURE__*/_jsx("button", {
                onClick: () => setShowConfirm(s => !s),
                className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                children: showConfirm ? /*#__PURE__*/_jsx(EyeOff, {
                  size: 13
                }) : /*#__PURE__*/_jsx(Eye, {
                  size: 13
                })
              })]
            }), confirm && confirm !== password && /*#__PURE__*/_jsx("p", {
              className: "text-xs text-red-500 mt-1",
              children: "Passwords do not match"
            }), confirm && confirm === password && password.length >= 8 && /*#__PURE__*/_jsxs("p", {
              className: "text-xs text-emerald-600 mt-1 flex items-center gap-1",
              children: [/*#__PURE__*/_jsx(CheckCircle2, {
                size: 11
              }), " Passwords match"]
            })]
          }), /*#__PURE__*/_jsxs("label", {
            className: "flex items-start gap-3 cursor-pointer select-none group",
            children: [/*#__PURE__*/_jsx("div", {
              className: "mt-0.5 flex-shrink-0",
              children: /*#__PURE__*/_jsx("input", {
                type: "checkbox",
                checked: accepted,
                onChange: e => setAccepted(e.target.checked),
                className: "rounded accent-blue-600"
              })
            }), /*#__PURE__*/_jsxs("p", {
              className: "text-xs text-muted-foreground leading-relaxed",
              children: ["I agree to the", " ", /*#__PURE__*/_jsx("span", {
                className: "text-primary font-medium hover:underline cursor-pointer",
                children: "Terms of Service"
              }), " ", "and", " ", /*#__PURE__*/_jsx("span", {
                className: "text-primary font-medium hover:underline cursor-pointer",
                children: "Privacy Policy"
              }), ". I understand my account will be reviewed by an Administrator before activation."]
            })]
          }), /*#__PURE__*/_jsxs("button", {
            onClick: () => accepted && setSubmitted(true),
            disabled: !accepted,
            className: "w-full py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99] transition-all flex items-center justify-center gap-2",
            children: [/*#__PURE__*/_jsx(UserCheck, {
              size: 14
            }), " Create Account"]
          }), /*#__PURE__*/_jsxs("p", {
            className: "text-center text-xs text-muted-foreground",
            children: ["Already have an account?", " ", /*#__PURE__*/_jsx("button", {
              onClick: onBack,
              className: "text-primary font-semibold hover:underline",
              children: "Sign in"
            })]
          })]
        })]
      })
    })]
  });
}

// ── Forgot Password ────────────────────────────────────────────────────────
function ForgotPasswordScreen({
  onBack,
  onReset
}) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  if (sent) {
    return /*#__PURE__*/_jsxs("div", {
      className: "min-h-screen flex",
      children: [/*#__PURE__*/_jsx(AuthPanel, {
        slim: true
      }), /*#__PURE__*/_jsx("div", {
        className: "flex-1 flex items-center justify-center bg-background p-8",
        children: /*#__PURE__*/_jsxs("div", {
          className: "w-full max-w-sm text-center",
          children: [/*#__PURE__*/_jsx("div", {
            className: "w-16 h-16 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center mx-auto mb-5",
            children: /*#__PURE__*/_jsx(Mail, {
              size: 28,
              className: "text-blue-600"
            })
          }), /*#__PURE__*/_jsx("h2", {
            className: "text-xl font-bold text-foreground mb-2",
            style: {
              fontFamily: "var(--font-display, 'Bricolage Grotesque', sans-serif)"
            },
            children: "Check your inbox"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-sm text-muted-foreground mb-2",
            children: "We sent a password reset link to:"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-sm font-semibold text-foreground mb-6",
            children: email
          }), /*#__PURE__*/_jsx("div", {
            className: "bg-amber-50 border border-amber-100 rounded-lg p-4 text-left mb-6",
            children: /*#__PURE__*/_jsxs("p", {
              className: "text-xs text-amber-800 leading-relaxed",
              children: ["The link will expire in ", /*#__PURE__*/_jsx("strong", {
                children: "15 minutes"
              }), ". Check your spam folder if you don't see the email within a few minutes."]
            })
          }), /*#__PURE__*/_jsx("button", {
            onClick: onReset,
            className: "w-full py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors mb-3",
            children: "Open Reset Password Page"
          }), /*#__PURE__*/_jsx("button", {
            onClick: () => setSent(false),
            className: "text-xs text-muted-foreground hover:text-foreground transition-colors",
            children: "Resend email"
          })]
        })
      })]
    });
  }
  return /*#__PURE__*/_jsxs("div", {
    className: "min-h-screen flex",
    children: [/*#__PURE__*/_jsx(AuthPanel, {
      slim: true
    }), /*#__PURE__*/_jsx("div", {
      className: "flex-1 flex items-center justify-center bg-background p-8",
      children: /*#__PURE__*/_jsxs("div", {
        className: "w-full max-w-sm",
        children: [/*#__PURE__*/_jsxs("button", {
          onClick: onBack,
          className: "flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors",
          children: [/*#__PURE__*/_jsx(ChevronLeft, {
            size: 15
          }), " Back to sign in"]
        }), /*#__PURE__*/_jsx("div", {
          className: "w-12 h-12 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center mb-5",
          children: /*#__PURE__*/_jsx(KeyRound, {
            size: 20,
            className: "text-blue-600"
          })
        }), /*#__PURE__*/_jsx("h2", {
          className: "text-2xl font-bold text-foreground mb-1",
          style: {
            fontFamily: "var(--font-display, 'Bricolage Grotesque', sans-serif)"
          },
          children: "Forgot password?"
        }), /*#__PURE__*/_jsx("p", {
          className: "text-sm text-muted-foreground mb-7",
          children: "Enter your registered email address and we will send a secure reset link."
        }), /*#__PURE__*/_jsxs("div", {
          className: "space-y-4",
          children: [/*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx("label", {
              className: "block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide",
              children: "Email Address"
            }), /*#__PURE__*/_jsxs("div", {
              className: "relative",
              children: [/*#__PURE__*/_jsx(Mail, {
                size: 13,
                className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              }), /*#__PURE__*/_jsx("input", {
                type: "email",
                value: email,
                onChange: e => setEmail(e.target.value),
                placeholder: "name@company.com",
                className: "w-full pl-9 pr-3 py-2.5 bg-input-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              })]
            })]
          }), /*#__PURE__*/_jsxs("button", {
            onClick: () => email && setSent(true),
            disabled: !email,
            className: "w-full py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2",
            children: [/*#__PURE__*/_jsx(Mail, {
              size: 14
            }), " Send Reset Link"]
          }), /*#__PURE__*/_jsxs("p", {
            className: "text-center text-xs text-muted-foreground",
            children: ["Remember your password?", " ", /*#__PURE__*/_jsx("button", {
              onClick: onBack,
              className: "text-primary font-semibold hover:underline",
              children: "Sign in"
            })]
          })]
        }), /*#__PURE__*/_jsx("div", {
          className: "mt-8 pt-6 border-t border-border",
          children: /*#__PURE__*/_jsxs("div", {
            className: "flex items-start gap-3 text-xs text-muted-foreground",
            children: [/*#__PURE__*/_jsx(ShieldCheck, {
              size: 14,
              className: "text-blue-500 flex-shrink-0 mt-0.5"
            }), /*#__PURE__*/_jsx("p", {
              children: "Reset links are single-use and expire in 15 minutes. All link generation events are logged for security audit purposes."
            })]
          })
        })]
      })
    })]
  });
}

// ── Reset Password ─────────────────────────────────────────────────────────
function ResetPasswordScreen({
  onBack,
  onSuccess
}) {
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const checks = [{
    label: "At least 8 characters",
    pass: newPass.length >= 8
  }, {
    label: "Uppercase letter",
    pass: /[A-Z]/.test(newPass)
  }, {
    label: "Number",
    pass: /[0-9]/.test(newPass)
  }, {
    label: "Special character (!@#$...)",
    pass: /[^A-Za-z0-9]/.test(newPass)
  }];
  const strength = checks.filter(c => c.pass).length;
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength] || "";
  const strengthBarColor = ["", "bg-red-500", "bg-amber-500", "bg-blue-500", "bg-emerald-500"][strength] || "";
  const strengthTextColor = ["", "text-red-600", "text-amber-600", "text-blue-600", "text-emerald-600"][strength] || "";
  const canSubmit = strength >= 3 && newPass === confirm;
  return /*#__PURE__*/_jsxs("div", {
    className: "min-h-screen flex",
    children: [/*#__PURE__*/_jsx(AuthPanel, {
      slim: true
    }), /*#__PURE__*/_jsx("div", {
      className: "flex-1 flex items-center justify-center bg-background p-8",
      children: /*#__PURE__*/_jsxs("div", {
        className: "w-full max-w-sm",
        children: [/*#__PURE__*/_jsxs("button", {
          onClick: onBack,
          className: "flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors",
          children: [/*#__PURE__*/_jsx(ChevronLeft, {
            size: 15
          }), " Back"]
        }), /*#__PURE__*/_jsx("div", {
          className: "w-12 h-12 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center mb-5",
          children: /*#__PURE__*/_jsx(Lock, {
            size: 20,
            className: "text-emerald-600"
          })
        }), /*#__PURE__*/_jsx("h2", {
          className: "text-2xl font-bold text-foreground mb-1",
          style: {
            fontFamily: "var(--font-display, 'Bricolage Grotesque', sans-serif)"
          },
          children: "Set new password"
        }), /*#__PURE__*/_jsx("p", {
          className: "text-sm text-muted-foreground mb-7",
          children: "Create a strong password to secure your ContractIQ account."
        }), /*#__PURE__*/_jsxs("div", {
          className: "space-y-4",
          children: [/*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx("label", {
              className: "block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide",
              children: "New Password"
            }), /*#__PURE__*/_jsxs("div", {
              className: "relative",
              children: [/*#__PURE__*/_jsx(Lock, {
                size: 13,
                className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              }), /*#__PURE__*/_jsx("input", {
                type: showNew ? "text" : "password",
                value: newPass,
                onChange: e => setNewPass(e.target.value),
                placeholder: "Enter new password",
                className: "w-full pl-9 pr-10 py-2.5 bg-input-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              }), /*#__PURE__*/_jsx("button", {
                onClick: () => setShowNew(s => !s),
                className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                children: showNew ? /*#__PURE__*/_jsx(EyeOff, {
                  size: 13
                }) : /*#__PURE__*/_jsx(Eye, {
                  size: 13
                })
              })]
            }), newPass && /*#__PURE__*/_jsxs("div", {
              className: "mt-2.5",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "flex items-center justify-between mb-1.5",
                children: [/*#__PURE__*/_jsx("span", {
                  className: "text-xs text-muted-foreground",
                  children: "Password strength"
                }), /*#__PURE__*/_jsx("span", {
                  className: `text-xs font-semibold ${strengthTextColor}`,
                  children: strengthLabel
                })]
              }), /*#__PURE__*/_jsx("div", {
                className: "flex gap-1",
                children: [1, 2, 3, 4].map(i => /*#__PURE__*/_jsx("div", {
                  className: `h-1.5 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthBarColor : "bg-border"}`
                }, i))
              }), /*#__PURE__*/_jsx("div", {
                className: "mt-3 space-y-1.5",
                children: checks.map(c => /*#__PURE__*/_jsxs("div", {
                  className: "flex items-center gap-2",
                  children: [/*#__PURE__*/_jsx("div", {
                    className: `w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${c.pass ? "bg-emerald-500" : "bg-muted border border-border"}`,
                    children: c.pass && /*#__PURE__*/_jsx(CheckCircle2, {
                      size: 9,
                      className: "text-white"
                    })
                  }), /*#__PURE__*/_jsx("span", {
                    className: `text-xs transition-colors ${c.pass ? "text-emerald-700" : "text-muted-foreground"}`,
                    children: c.label
                  })]
                }, c.label))
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx("label", {
              className: "block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide",
              children: "Confirm Password"
            }), /*#__PURE__*/_jsxs("div", {
              className: "relative",
              children: [/*#__PURE__*/_jsx(Lock, {
                size: 13,
                className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              }), /*#__PURE__*/_jsx("input", {
                type: showConfirm ? "text" : "password",
                value: confirm,
                onChange: e => setConfirm(e.target.value),
                placeholder: "Re-enter new password",
                className: `w-full pl-9 pr-10 py-2.5 bg-input-background border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${confirm && confirm !== newPass ? "border-red-400" : "border-border"}`
              }), /*#__PURE__*/_jsx("button", {
                onClick: () => setShowConfirm(s => !s),
                className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                children: showConfirm ? /*#__PURE__*/_jsx(EyeOff, {
                  size: 13
                }) : /*#__PURE__*/_jsx(Eye, {
                  size: 13
                })
              })]
            }), confirm && confirm !== newPass && /*#__PURE__*/_jsx("p", {
              className: "text-xs text-red-500 mt-1",
              children: "Passwords do not match"
            }), confirm && confirm === newPass && newPass.length >= 8 && /*#__PURE__*/_jsxs("p", {
              className: "text-xs text-emerald-600 mt-1 flex items-center gap-1",
              children: [/*#__PURE__*/_jsx(CheckCircle2, {
                size: 11
              }), " Passwords match"]
            })]
          }), /*#__PURE__*/_jsxs("button", {
            onClick: onSuccess,
            disabled: !canSubmit,
            className: "w-full py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2",
            children: [/*#__PURE__*/_jsx(ShieldCheck, {
              size: 14
            }), " Reset Password"]
          }), /*#__PURE__*/_jsx("p", {
            className: "text-center text-xs text-muted-foreground",
            children: /*#__PURE__*/_jsx("button", {
              onClick: onBack,
              className: "text-primary font-semibold hover:underline",
              children: "Return to sign in"
            })
          })]
        })]
      })
    })]
  });
}

// ── JWT Auth States ────────────────────────────────────────────────────────
function AuthLoadingScreen({
  onSuccess,
  onFail
}) {
  const [dots, setDots] = useState(0);
  const [step, setStep] = useState(0);
  const steps = ["Validating credentials…", "Generating JWT token…", "Loading your workspace…", "Applying access policies…"];
  useEffect(() => {
    const dotInterval = setInterval(() => setDots(d => (d + 1) % 4), 400);
    const stepInterval = setInterval(() => setStep(s => Math.min(s + 1, steps.length - 1)), 800);
    const successTimer = setTimeout(onSuccess, 3500);
    return () => {
      clearInterval(dotInterval);
      clearInterval(stepInterval);
      clearTimeout(successTimer);
    };
  }, []);
  return /*#__PURE__*/_jsx("div", {
    className: "min-h-screen flex items-center justify-center",
    style: {
      background: "#0A1628"
    },
    children: /*#__PURE__*/_jsxs("div", {
      className: "text-center",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "flex items-center justify-center gap-2.5 mb-10",
        children: [/*#__PURE__*/_jsx("div", {
          className: "w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center",
          children: /*#__PURE__*/_jsx(FileText, {
            size: 18,
            className: "text-white"
          })
        }), /*#__PURE__*/_jsx("span", {
          className: "text-white font-bold text-xl",
          style: {
            fontFamily: "var(--font-display, 'Bricolage Grotesque', sans-serif)"
          },
          children: "ContractIQ"
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "relative w-20 h-20 mx-auto mb-8",
        children: [/*#__PURE__*/_jsx("div", {
          className: "absolute inset-0 rounded-full border-4 border-blue-900"
        }), /*#__PURE__*/_jsx("div", {
          className: "absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 animate-spin",
          style: {
            animationDuration: "0.8s"
          }
        }), /*#__PURE__*/_jsx("div", {
          className: "absolute inset-3 rounded-full bg-blue-950 flex items-center justify-center",
          children: /*#__PURE__*/_jsx(Lock, {
            size: 16,
            className: "text-blue-400"
          })
        })]
      }), /*#__PURE__*/_jsxs("h2", {
        className: "text-white text-lg font-semibold mb-2",
        style: {
          fontFamily: "var(--font-display, 'Bricolage Grotesque', sans-serif)"
        },
        children: ["Signing In", ".".repeat(dots)]
      }), /*#__PURE__*/_jsx("p", {
        className: "text-sm mb-8 transition-all duration-300",
        style: {
          color: "#4B7A9A"
        },
        children: steps[step]
      }), /*#__PURE__*/_jsx("div", {
        className: "flex items-center justify-center gap-2 mb-8",
        children: steps.map((_, i) => /*#__PURE__*/_jsx("div", {
          className: `h-1 rounded-full transition-all duration-500 ${i <= step ? "bg-blue-500 w-8" : "bg-blue-900 w-4"}`
        }, i))
      }), /*#__PURE__*/_jsxs("div", {
        className: "flex items-center justify-center gap-1.5 mb-6",
        style: {
          color: "#2A4A6A"
        },
        children: [/*#__PURE__*/_jsx(ShieldCheck, {
          size: 13
        }), /*#__PURE__*/_jsx("span", {
          className: "text-xs",
          children: "Secured with JWT · TLS 1.3 encryption"
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "flex items-center justify-center gap-4",
        children: [/*#__PURE__*/_jsx("button", {
          onClick: onSuccess,
          className: "text-xs text-blue-600 hover:underline",
          children: "Force success"
        }), /*#__PURE__*/_jsx("span", {
          style: {
            color: "#1A2A3A"
          },
          children: "·"
        }), /*#__PURE__*/_jsx("button", {
          onClick: onFail,
          className: "text-xs text-red-500 hover:underline",
          children: "Simulate failure"
        })]
      })]
    })
  });
}
function AuthSuccessScreen({
  onContinue
}) {
  useEffect(() => {
    const timer = setTimeout(onContinue, 2200);
    return () => clearTimeout(timer);
  }, []);
  return /*#__PURE__*/_jsxs("div", {
    className: "min-h-screen flex items-center justify-center",
    style: {
      background: "#0A1628"
    },
    children: [/*#__PURE__*/_jsxs("div", {
      className: "text-center",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "flex items-center justify-center gap-2.5 mb-10",
        children: [/*#__PURE__*/_jsx("div", {
          className: "w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center",
          children: /*#__PURE__*/_jsx(FileText, {
            size: 18,
            className: "text-white"
          })
        }), /*#__PURE__*/_jsx("span", {
          className: "text-white font-bold text-xl",
          style: {
            fontFamily: "var(--font-display, 'Bricolage Grotesque', sans-serif)"
          },
          children: "ContractIQ"
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "w-20 h-20 mx-auto mb-7 relative",
        children: [/*#__PURE__*/_jsx("div", {
          className: "absolute inset-0 rounded-full bg-emerald-500 opacity-10 animate-ping"
        }), /*#__PURE__*/_jsx("div", {
          className: "relative w-20 h-20 rounded-full bg-emerald-950 border-2 border-emerald-500 flex items-center justify-center",
          children: /*#__PURE__*/_jsx(CheckCircle2, {
            size: 36,
            className: "text-emerald-400"
          })
        })]
      }), /*#__PURE__*/_jsx("h2", {
        className: "text-white text-xl font-bold mb-2",
        style: {
          fontFamily: "var(--font-display, 'Bricolage Grotesque', sans-serif)"
        },
        children: "Authentication Successful"
      }), /*#__PURE__*/_jsx("p", {
        className: "text-sm mb-6",
        style: {
          color: "#4B7A9A"
        },
        children: "JWT token issued · Redirecting to your workspace…"
      }), /*#__PURE__*/_jsxs("div", {
        className: "inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-900 mb-8",
        style: {
          background: "rgba(16,185,129,0.06)"
        },
        children: [/*#__PURE__*/_jsx("div", {
          className: "w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"
        }), /*#__PURE__*/_jsx("span", {
          className: "text-xs text-emerald-400 font-mono",
          children: "Session established · Role verified"
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "flex flex-col items-center gap-2",
        children: [/*#__PURE__*/_jsx("div", {
          className: "w-48 h-1 bg-blue-900 rounded-full overflow-hidden",
          children: /*#__PURE__*/_jsx("div", {
            className: "h-full bg-emerald-500 rounded-full animate-[auth-progress_2s_ease-in-out_forwards]",
            style: {
              animation: "auth-progress 2.2s ease-out forwards",
              width: "0%"
            }
          })
        }), /*#__PURE__*/_jsx("button", {
          onClick: onContinue,
          className: "text-xs text-blue-500 hover:underline mt-2",
          children: "Continue now →"
        })]
      })]
    }), /*#__PURE__*/_jsx("style", {
      children: `
        @keyframes auth-progress {
          from { width: 0% }
          to { width: 100% }
        }
      `
    })]
  });
}
function AuthFailedScreen({
  onRetry,
  onBack
}) {
  return /*#__PURE__*/_jsx("div", {
    className: "min-h-screen flex items-center justify-center",
    style: {
      background: "#0A1628"
    },
    children: /*#__PURE__*/_jsxs("div", {
      className: "text-center max-w-sm mx-auto px-6",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "flex items-center justify-center gap-2.5 mb-10",
        children: [/*#__PURE__*/_jsx("div", {
          className: "w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center",
          children: /*#__PURE__*/_jsx(FileText, {
            size: 18,
            className: "text-white"
          })
        }), /*#__PURE__*/_jsx("span", {
          className: "text-white font-bold text-xl",
          style: {
            fontFamily: "var(--font-display, 'Bricolage Grotesque', sans-serif)"
          },
          children: "ContractIQ"
        })]
      }), /*#__PURE__*/_jsx("div", {
        className: "w-20 h-20 mx-auto mb-7 rounded-full bg-red-950 border-2 border-red-600 flex items-center justify-center",
        children: /*#__PURE__*/_jsx(XCircle, {
          size: 36,
          className: "text-red-400"
        })
      }), /*#__PURE__*/_jsx("h2", {
        className: "text-white text-xl font-bold mb-2",
        style: {
          fontFamily: "var(--font-display, 'Bricolage Grotesque', sans-serif)"
        },
        children: "Authentication Failed"
      }), /*#__PURE__*/_jsx("p", {
        className: "text-sm mb-2",
        style: {
          color: "#7A9AAA"
        },
        children: "Your credentials could not be verified. Please check your email and password and try again."
      }), /*#__PURE__*/_jsxs("div", {
        className: "inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-900 mb-8 mt-2",
        style: {
          background: "rgba(239,68,68,0.06)"
        },
        children: [/*#__PURE__*/_jsx(ShieldX, {
          size: 12,
          className: "text-red-400"
        }), /*#__PURE__*/_jsx("span", {
          className: "text-xs text-red-400 font-mono",
          children: "JWT_AUTH_INVALID_CREDENTIALS"
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "rounded-xl border border-red-900 p-4 text-left mb-7",
        style: {
          background: "rgba(239,68,68,0.05)"
        },
        children: [/*#__PURE__*/_jsx("p", {
          className: "text-xs font-semibold mb-2",
          style: {
            color: "#FCA5A5"
          },
          children: "Possible reasons:"
        }), /*#__PURE__*/_jsx("ul", {
          className: "space-y-1",
          children: ["Incorrect email address or password", "Account may be locked (5+ failed attempts)", "Your account may have been deactivated"].map(r => /*#__PURE__*/_jsxs("li", {
            className: "text-xs flex items-start gap-2",
            style: {
              color: "#7A8A9A"
            },
            children: [/*#__PURE__*/_jsx("span", {
              style: {
                color: "#EF4444"
              },
              children: "·"
            }), " ", r]
          }, r))
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "flex flex-col gap-3",
        children: [/*#__PURE__*/_jsxs("button", {
          onClick: onRetry,
          className: "w-full py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2",
          children: [/*#__PURE__*/_jsx(ArrowRight, {
            size: 14
          }), " Try Again"]
        }), /*#__PURE__*/_jsx("button", {
          onClick: onBack,
          className: "w-full py-2.5 rounded-lg text-sm font-medium transition-colors border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500",
          children: "Return to Sign In"
        })]
      })]
    })
  });
}
function SessionExpiredScreen({
  onLogin
}) {
  return /*#__PURE__*/_jsx("div", {
    className: "min-h-screen flex items-center justify-center bg-background p-8",
    children: /*#__PURE__*/_jsx("div", {
      className: "w-full max-w-md",
      children: /*#__PURE__*/_jsxs("div", {
        className: "bg-card border border-border rounded-xl shadow-lg overflow-hidden",
        children: [/*#__PURE__*/_jsxs("div", {
          className: "px-6 py-5 border-b border-border flex items-center gap-3",
          children: [/*#__PURE__*/_jsx("div", {
            className: "w-8 h-8 bg-blue-600 rounded flex items-center justify-center",
            children: /*#__PURE__*/_jsx(FileText, {
              size: 13,
              className: "text-white"
            })
          }), /*#__PURE__*/_jsx("span", {
            className: "font-bold text-foreground",
            style: {
              fontFamily: "var(--font-display, 'Bricolage Grotesque', sans-serif)"
            },
            children: "ContractIQ"
          }), /*#__PURE__*/_jsx("div", {
            className: "ml-auto",
            children: /*#__PURE__*/_jsx(Badge, {
              variant: "warning",
              children: "Session Expired"
            })
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "p-8 text-center",
          children: [/*#__PURE__*/_jsx("div", {
            className: "w-16 h-16 bg-amber-50 border border-amber-100 rounded-full flex items-center justify-center mx-auto mb-5",
            children: /*#__PURE__*/_jsx(Clock, {
              size: 28,
              className: "text-amber-500"
            })
          }), /*#__PURE__*/_jsx("h2", {
            className: "text-xl font-bold text-foreground mb-2",
            style: {
              fontFamily: "var(--font-display, 'Bricolage Grotesque', sans-serif)"
            },
            children: "Your session has expired"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-sm text-muted-foreground mb-5 leading-relaxed",
            children: "For security, your JWT session token expired after 60 minutes of inactivity. Please sign in again to continue accessing ContractIQ."
          }), /*#__PURE__*/_jsx("div", {
            className: "bg-muted rounded-lg p-4 text-left mb-6",
            children: /*#__PURE__*/_jsx("div", {
              className: "grid grid-cols-2 gap-3 text-xs",
              children: [{
                label: "Session ID",
                value: "jwt_8f3k2…d9e1"
              }, {
                label: "Expired At",
                value: "Jun 3, 2024 · 11:42 AM"
              }, {
                label: "Duration",
                value: "60 min timeout"
              }, {
                label: "Reason",
                value: "Inactivity timeout"
              }].map(({
                label,
                value
              }) => /*#__PURE__*/_jsxs("div", {
                children: [/*#__PURE__*/_jsx("p", {
                  className: "text-muted-foreground mb-0.5",
                  children: label
                }), /*#__PURE__*/_jsx("p", {
                  className: "font-mono font-semibold text-foreground",
                  children: value
                })]
              }, label))
            })
          }), /*#__PURE__*/_jsxs("button", {
            onClick: onLogin,
            className: "w-full py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 mb-3",
            children: [/*#__PURE__*/_jsx(LogIn, {
              size: 14
            }), " Sign In Again"]
          }), /*#__PURE__*/_jsxs("p", {
            className: "text-xs text-muted-foreground",
            children: ["Your work was auto-saved before the session expired.", " ", /*#__PURE__*/_jsx("span", {
              className: "text-primary cursor-pointer hover:underline",
              children: "Learn about session security"
            })]
          })]
        })]
      })
    })
  });
}
function UnauthorizedScreen({
  onBack,
  onLogin
}) {
  return /*#__PURE__*/_jsx("div", {
    className: "min-h-screen flex items-center justify-center bg-background p-8",
    children: /*#__PURE__*/_jsx("div", {
      className: "w-full max-w-lg",
      children: /*#__PURE__*/_jsxs("div", {
        className: "bg-card border border-border rounded-xl shadow-lg overflow-hidden",
        children: [/*#__PURE__*/_jsxs("div", {
          className: "px-6 py-5 border-b border-border flex items-center gap-3",
          children: [/*#__PURE__*/_jsx("div", {
            className: "w-8 h-8 bg-blue-600 rounded flex items-center justify-center",
            children: /*#__PURE__*/_jsx(FileText, {
              size: 13,
              className: "text-white"
            })
          }), /*#__PURE__*/_jsx("span", {
            className: "font-bold text-foreground",
            style: {
              fontFamily: "var(--font-display, 'Bricolage Grotesque', sans-serif)"
            },
            children: "ContractIQ"
          }), /*#__PURE__*/_jsxs("div", {
            className: "ml-auto flex items-center gap-2",
            children: [/*#__PURE__*/_jsx(Badge, {
              variant: "danger",
              children: "403"
            }), /*#__PURE__*/_jsx(Badge, {
              variant: "danger",
              children: "Unauthorized"
            })]
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "p-8",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "flex items-center gap-5 mb-6",
            children: [/*#__PURE__*/_jsx("div", {
              className: "w-16 h-16 bg-red-50 border border-red-100 rounded-full flex items-center justify-center flex-shrink-0",
              children: /*#__PURE__*/_jsx(ShieldAlert, {
                size: 28,
                className: "text-red-500"
              })
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx("h2", {
                className: "text-xl font-bold text-foreground mb-1",
                style: {
                  fontFamily: "var(--font-display, 'Bricolage Grotesque', sans-serif)"
                },
                children: "Access Denied"
              }), /*#__PURE__*/_jsx("p", {
                className: "text-sm text-muted-foreground",
                children: "You do not have permission to access this resource."
              })]
            })]
          }), /*#__PURE__*/_jsx("div", {
            className: "bg-red-50 border border-red-100 rounded-lg p-4 mb-5",
            children: /*#__PURE__*/_jsxs("div", {
              className: "flex items-start gap-3",
              children: [/*#__PURE__*/_jsx(AlertCircle, {
                size: 14,
                className: "text-red-500 flex-shrink-0 mt-0.5"
              }), /*#__PURE__*/_jsxs("div", {
                className: "text-xs",
                children: [/*#__PURE__*/_jsx("p", {
                  className: "font-semibold text-red-800 mb-1",
                  children: "HTTP 403 · Forbidden"
                }), /*#__PURE__*/_jsx("p", {
                  className: "text-red-700 leading-relaxed",
                  children: "Your current role does not include the required permissions for this operation. This incident has been logged for security audit."
                })]
              })]
            })
          }), /*#__PURE__*/_jsxs("div", {
            className: "bg-muted rounded-lg p-4 mb-6",
            children: [/*#__PURE__*/_jsx("p", {
              className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3",
              children: "Request Details"
            }), /*#__PURE__*/_jsx("div", {
              className: "space-y-2 font-mono text-xs",
              children: [{
                label: "Status Code",
                value: "403 Forbidden",
                cls: "text-red-600"
              }, {
                label: "Resource",
                value: "/admin/system/config",
                cls: "text-foreground"
              }, {
                label: "Required Role",
                value: "Administrator",
                cls: "text-foreground"
              }, {
                label: "Your Role",
                value: "Legal Manager",
                cls: "text-amber-600"
              }, {
                label: "Timestamp",
                value: "2024-06-03T09:14:22Z",
                cls: "text-muted-foreground"
              }].map(({
                label,
                value,
                cls
              }) => /*#__PURE__*/_jsxs("div", {
                className: "flex items-center justify-between",
                children: [/*#__PURE__*/_jsx("span", {
                  className: "text-muted-foreground",
                  children: label
                }), /*#__PURE__*/_jsx("span", {
                  className: `font-semibold ${cls}`,
                  children: value
                })]
              }, label))
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex items-center gap-3",
            children: [/*#__PURE__*/_jsxs("button", {
              onClick: onBack,
              className: "flex-1 py-2.5 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors flex items-center justify-center gap-2",
              children: [/*#__PURE__*/_jsx(ChevronLeft, {
                size: 14
              }), " Go Back"]
            }), /*#__PURE__*/_jsxs("button", {
              onClick: onLogin,
              className: "flex-1 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2",
              children: [/*#__PURE__*/_jsx(UserCheck, {
                size: 14
              }), " Switch Account"]
            })]
          }), /*#__PURE__*/_jsxs("p", {
            className: "text-xs text-muted-foreground text-center mt-4",
            children: ["Need access?", " ", /*#__PURE__*/_jsx("span", {
              className: "text-primary cursor-pointer hover:underline",
              children: "Contact your Administrator"
            }), " ", "to request elevated permissions."]
          })]
        })]
      })
    })
  });
}

// ── Legal Dashboard ────────────────────────────────────────────────────────
function LegalDashboard() {
  return /*#__PURE__*/_jsxs("div", {
    className: "p-6 space-y-5 max-w-screen-xl",
    children: [/*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4",
      children: [/*#__PURE__*/_jsx(MetricCard, {
        title: "Active Contracts",
        value: "247",
        delta: "+12 this month",
        deltaPositive: true,
        icon: FileText,
        iconBg: "bg-blue-600"
      }), /*#__PURE__*/_jsx(MetricCard, {
        title: "Upcoming Renewals",
        value: "23",
        delta: "Next 30 days",
        icon: RefreshCw,
        iconBg: "bg-amber-500"
      }), /*#__PURE__*/_jsx(MetricCard, {
        title: "Pending Obligations",
        value: "41",
        delta: "+3 since yesterday",
        icon: CheckSquare,
        iconBg: "bg-violet-600"
      }), /*#__PURE__*/_jsx(MetricCard, {
        title: "Compliance Score",
        value: "94.2%",
        delta: "+1.8% vs last qtr",
        deltaPositive: true,
        icon: Shield,
        iconBg: "bg-emerald-600"
      }), /*#__PURE__*/_jsx(MetricCard, {
        title: "Expiring This Week",
        value: "8",
        delta: "Action required",
        icon: AlertTriangle,
        iconBg: "bg-red-500"
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-1 lg:grid-cols-3 gap-5",
      children: [/*#__PURE__*/_jsxs(Card, {
        className: "col-span-1 lg:col-span-2 p-5",
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex items-center justify-between mb-4",
          children: [/*#__PURE__*/_jsx(SectionLabel, {
            children: "Contract Activity — H1 2024"
          }), /*#__PURE__*/_jsxs("select", {
            className: "text-xs border border-border rounded px-2 py-1 bg-muted text-muted-foreground",
            children: [/*#__PURE__*/_jsx("option", {
              children: "Last 6 months"
            }), /*#__PURE__*/_jsx("option", {
              children: "Last year"
            })]
          })]
        }), /*#__PURE__*/_jsx(ResponsiveContainer, {
          width: "100%",
          height: 210,
          children: /*#__PURE__*/_jsxs(BarChart, {
            data: CONTRACT_ACTIVITY,
            barSize: 9,
            barGap: 3,
            children: [/*#__PURE__*/_jsx(CartesianGrid, {
              strokeDasharray: "3 3",
              stroke: "#E2E8F0",
              vertical: false
            }), /*#__PURE__*/_jsx(XAxis, {
              dataKey: "month",
              tick: {
                fontSize: 11,
                fill: "#64748B"
              },
              axisLine: false,
              tickLine: false
            }), /*#__PURE__*/_jsx(YAxis, {
              tick: {
                fontSize: 11,
                fill: "#64748B"
              },
              axisLine: false,
              tickLine: false
            }), /*#__PURE__*/_jsx(Tooltip, {
              contentStyle: {
                fontSize: 11,
                borderRadius: 6,
                border: "1px solid #E2E8F0",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
              }
            }), /*#__PURE__*/_jsx(Legend, {
              iconType: "circle",
              iconSize: 7,
              wrapperStyle: {
                fontSize: 11
              }
            }), /*#__PURE__*/_jsx(Bar, {
              dataKey: "created",
              name: "Created",
              fill: "#2563EB",
              radius: [2, 2, 0, 0]
            }), /*#__PURE__*/_jsx(Bar, {
              dataKey: "renewed",
              name: "Renewed",
              fill: "#059669",
              radius: [2, 2, 0, 0]
            }), /*#__PURE__*/_jsx(Bar, {
              dataKey: "terminated",
              name: "Terminated",
              fill: "#EF4444",
              radius: [2, 2, 0, 0]
            })]
          })
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        className: "p-5",
        children: [/*#__PURE__*/_jsx(SectionLabel, {
          children: "Portfolio by Type"
        }), /*#__PURE__*/_jsx(ResponsiveContainer, {
          width: "100%",
          height: 170,
          children: /*#__PURE__*/_jsxs(PieChart, {
            children: [/*#__PURE__*/_jsx(Pie, {
              data: CONTRACT_TYPES_PIE,
              cx: "50%",
              cy: "50%",
              innerRadius: 48,
              outerRadius: 75,
              dataKey: "value",
              paddingAngle: 2,
              children: CONTRACT_TYPES_PIE.map(entry => /*#__PURE__*/_jsx(Cell, {
                fill: entry.color
              }, `ctpie-${entry.name}`))
            }), /*#__PURE__*/_jsx(Tooltip, {
              contentStyle: {
                fontSize: 11,
                borderRadius: 6
              },
              formatter: v => [`${v}%`, ""]
            })]
          })
        }), /*#__PURE__*/_jsx("div", {
          className: "space-y-1.5 mt-1",
          children: CONTRACT_TYPES_PIE.map(item => /*#__PURE__*/_jsxs("div", {
            className: "flex items-center justify-between text-xs",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "flex items-center gap-2",
              children: [/*#__PURE__*/_jsx("div", {
                className: "w-2 h-2 rounded-full flex-shrink-0",
                style: {
                  background: item.color
                }
              }), /*#__PURE__*/_jsx("span", {
                className: "text-muted-foreground",
                children: item.name
              })]
            }), /*#__PURE__*/_jsxs("span", {
              className: "font-mono font-semibold text-foreground",
              children: [item.value, "%"]
            })]
          }, item.name))
        })]
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-1 lg:grid-cols-2 gap-5",
      children: [/*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex items-center justify-between px-5 py-3.5 border-b border-border",
          children: [/*#__PURE__*/_jsx(SectionLabel, {
            children: "Recent Activity"
          }), /*#__PURE__*/_jsx("button", {
            className: "text-xs text-blue-600 hover:underline",
            children: "View all"
          })]
        }), /*#__PURE__*/_jsx("div", {
          className: "divide-y divide-border",
          children: ACTIVITY_LOG.map(item => /*#__PURE__*/_jsxs("div", {
            className: "flex items-start gap-3 px-5 py-3 hover:bg-muted/50 transition-colors",
            children: [/*#__PURE__*/_jsx(Av, {
              initials: item.initials,
              size: "sm"
            }), /*#__PURE__*/_jsxs("div", {
              className: "flex-1 min-w-0",
              children: [/*#__PURE__*/_jsxs("p", {
                className: "text-xs text-foreground",
                children: [/*#__PURE__*/_jsx("span", {
                  className: "font-semibold",
                  children: item.user
                }), " ", /*#__PURE__*/_jsx("span", {
                  className: "text-muted-foreground",
                  children: item.action
                })]
              }), /*#__PURE__*/_jsx("p", {
                className: "text-xs text-blue-600 truncate mt-0.5",
                children: item.target
              }), /*#__PURE__*/_jsx("p", {
                className: "text-xs text-muted-foreground mt-0.5",
                children: item.time
              })]
            })]
          }, item.id))
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex items-center justify-between px-5 py-3.5 border-b border-border",
          children: [/*#__PURE__*/_jsx(SectionLabel, {
            children: "Upcoming Deadlines"
          }), /*#__PURE__*/_jsx("button", {
            className: "text-xs text-blue-600 hover:underline",
            children: "View all"
          })]
        }), /*#__PURE__*/_jsx("div", {
          className: "divide-y divide-border",
          children: OBLIGATIONS.filter(o => o.status !== "Completed").slice(0, 6).map(obl => /*#__PURE__*/_jsxs("div", {
            className: "flex items-center gap-3 px-5 py-3 hover:bg-muted/50 transition-colors",
            children: [/*#__PURE__*/_jsx("div", {
              className: `w-1 h-8 rounded-full flex-shrink-0 ${obl.status === "Overdue" ? "bg-red-500" : obl.priority === "Critical" ? "bg-amber-500" : obl.priority === "High" ? "bg-orange-400" : "bg-blue-400"}`
            }), /*#__PURE__*/_jsxs("div", {
              className: "flex-1 min-w-0",
              children: [/*#__PURE__*/_jsx("p", {
                className: "text-xs font-semibold text-foreground truncate",
                children: obl.title
              }), /*#__PURE__*/_jsxs("p", {
                className: "text-xs text-muted-foreground",
                children: [obl.assignee, " · Due ", obl.due]
              })]
            }), statusBadge(obl.status)]
          }, obl.id))
        })]
      })]
    })]
  });
}

// ── Compliance Dashboard ───────────────────────────────────────────────────
function ComplianceDashboard() {
  return /*#__PURE__*/_jsxs("div", {
    className: "p-6 space-y-5 max-w-screen-xl",
    children: [/*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-2 lg:grid-cols-4 gap-4",
      children: [/*#__PURE__*/_jsx(MetricCard, {
        title: "Overall Compliance",
        value: "94.2%",
        delta: "+1.8% vs last qtr",
        deltaPositive: true,
        icon: Shield,
        iconBg: "bg-emerald-600"
      }), /*#__PURE__*/_jsx(MetricCard, {
        title: "Missed Deadlines",
        value: "3",
        delta: "-2 vs last month",
        deltaPositive: true,
        icon: AlertTriangle,
        iconBg: "bg-red-500"
      }), /*#__PURE__*/_jsx(MetricCard, {
        title: "Risk Flags",
        value: "5",
        delta: "Medium aggregate",
        icon: Flag,
        iconBg: "bg-amber-500"
      }), /*#__PURE__*/_jsx(MetricCard, {
        title: "Audits Completed",
        value: "18/22",
        delta: "4 pending review",
        icon: CheckCircle,
        iconBg: "bg-blue-600"
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-1 lg:grid-cols-2 gap-5",
      children: [/*#__PURE__*/_jsxs(Card, {
        className: "p-5",
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex items-center justify-between mb-4",
          children: [/*#__PURE__*/_jsx(SectionLabel, {
            children: "Department Compliance Scores"
          }), /*#__PURE__*/_jsx(Badge, {
            variant: "info",
            children: "Jun 2024"
          })]
        }), /*#__PURE__*/_jsx(ResponsiveContainer, {
          width: "100%",
          height: 210,
          children: /*#__PURE__*/_jsxs(BarChart, {
            data: DEPT_COMPLIANCE,
            layout: "vertical",
            barSize: 9,
            children: [/*#__PURE__*/_jsx(CartesianGrid, {
              strokeDasharray: "3 3",
              stroke: "#E2E8F0",
              horizontal: false
            }), /*#__PURE__*/_jsx(XAxis, {
              type: "number",
              domain: [0, 100],
              tick: {
                fontSize: 11,
                fill: "#64748B"
              },
              axisLine: false,
              tickLine: false,
              unit: "%"
            }), /*#__PURE__*/_jsx(YAxis, {
              dataKey: "dept",
              type: "category",
              tick: {
                fontSize: 11,
                fill: "#64748B"
              },
              axisLine: false,
              tickLine: false,
              width: 80
            }), /*#__PURE__*/_jsx(Tooltip, {
              contentStyle: {
                fontSize: 11,
                borderRadius: 6
              },
              formatter: v => [`${v}%`, ""]
            }), /*#__PURE__*/_jsx(Bar, {
              dataKey: "score",
              name: "Score",
              radius: [0, 2, 2, 0],
              children: DEPT_COMPLIANCE.map(entry => /*#__PURE__*/_jsx(Cell, {
                fill: entry.score >= entry.target ? "#059669" : "#EF4444"
              }, `dc-${entry.dept}`))
            })]
          })
        }), /*#__PURE__*/_jsx("p", {
          className: "text-xs text-muted-foreground mt-2",
          children: "Green = at or above target · Red = below target"
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        className: "p-5",
        children: [/*#__PURE__*/_jsx(SectionLabel, {
          children: "Risk Level Trend — H1 2024"
        }), /*#__PURE__*/_jsx(ResponsiveContainer, {
          width: "100%",
          height: 210,
          children: /*#__PURE__*/_jsxs(AreaChart, {
            data: RISK_TREND,
            children: [/*#__PURE__*/_jsx("defs", {
              children: [["colorLow", "#059669"], ["colorMed", "#D97706"], ["colorHi", "#EF4444"]].map(([id, color]) => /*#__PURE__*/_jsxs("linearGradient", {
                id: id,
                x1: "0",
                y1: "0",
                x2: "0",
                y2: "1",
                children: [/*#__PURE__*/_jsx("stop", {
                  offset: "5%",
                  stopColor: color,
                  stopOpacity: 0.18
                }), /*#__PURE__*/_jsx("stop", {
                  offset: "95%",
                  stopColor: color,
                  stopOpacity: 0
                })]
              }, id))
            }), /*#__PURE__*/_jsx(CartesianGrid, {
              strokeDasharray: "3 3",
              stroke: "#E2E8F0",
              vertical: false
            }), /*#__PURE__*/_jsx(XAxis, {
              dataKey: "month",
              tick: {
                fontSize: 11,
                fill: "#64748B"
              },
              axisLine: false,
              tickLine: false
            }), /*#__PURE__*/_jsx(YAxis, {
              tick: {
                fontSize: 11,
                fill: "#64748B"
              },
              axisLine: false,
              tickLine: false,
              unit: "%"
            }), /*#__PURE__*/_jsx(Tooltip, {
              contentStyle: {
                fontSize: 11,
                borderRadius: 6
              },
              formatter: v => [`${v}%`, ""]
            }), /*#__PURE__*/_jsx(Legend, {
              iconType: "circle",
              iconSize: 7,
              wrapperStyle: {
                fontSize: 11
              }
            }), /*#__PURE__*/_jsx(Area, {
              dataKey: "low",
              name: "Low Risk",
              stroke: "#059669",
              fill: "url(#colorLow)",
              strokeWidth: 2
            }), /*#__PURE__*/_jsx(Area, {
              dataKey: "medium",
              name: "Medium Risk",
              stroke: "#D97706",
              fill: "url(#colorMed)",
              strokeWidth: 2
            }), /*#__PURE__*/_jsx(Area, {
              dataKey: "high",
              name: "High Risk",
              stroke: "#EF4444",
              fill: "url(#colorHi)",
              strokeWidth: 2
            })]
          })
        })]
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-1 lg:grid-cols-3 gap-5",
      children: [/*#__PURE__*/_jsxs(Card, {
        className: "col-span-1 lg:col-span-2 p-5",
        children: [/*#__PURE__*/_jsx(SectionLabel, {
          children: "Audit Summary"
        }), /*#__PURE__*/_jsx("div", {
          className: "grid grid-cols-4 gap-3 mb-5",
          children: [{
            label: "Total Audits",
            value: "22",
            cls: "text-foreground"
          }, {
            label: "Completed",
            value: "18",
            cls: "text-emerald-600"
          }, {
            label: "In Progress",
            value: "3",
            cls: "text-blue-600"
          }, {
            label: "Failed",
            value: "1",
            cls: "text-red-500"
          }].map(item => /*#__PURE__*/_jsxs("div", {
            className: "bg-muted rounded-lg p-3 text-center",
            children: [/*#__PURE__*/_jsx("p", {
              className: `text-2xl font-bold font-mono ${item.cls}`,
              children: item.value
            }), /*#__PURE__*/_jsx("p", {
              className: "text-xs text-muted-foreground mt-0.5",
              children: item.label
            })]
          }, item.label))
        }), /*#__PURE__*/_jsx("div", {
          className: "overflow-x-auto",
          children: /*#__PURE__*/_jsxs("table", {
            className: "w-full text-xs",
            children: [/*#__PURE__*/_jsx("thead", {
              children: /*#__PURE__*/_jsx("tr", {
                className: "border-b border-border",
                children: ["Audit", "Department", "Auditor", "Status", "Score"].map(h => /*#__PURE__*/_jsx("th", {
                  className: "text-left py-2 pr-4 text-muted-foreground font-semibold uppercase tracking-wide",
                  children: h
                }, h))
              })
            }), /*#__PURE__*/_jsx("tbody", {
              className: "divide-y divide-border",
              children: [{
                name: "Q2 Vendor Contracts Audit",
                dept: "Procurement",
                auditor: "David Park",
                status: "Completed",
                score: 97
              }, {
                name: "Employment Compliance Review",
                dept: "HR",
                auditor: "Sarah Chen",
                status: "Completed",
                score: 89
              }, {
                name: "GDPR Data Processing Audit",
                dept: "IT",
                auditor: "Mark Johnson",
                status: "In Progress",
                score: -1
              }, {
                name: "Financial Controls Audit",
                dept: "Finance",
                auditor: "David Park",
                status: "Completed",
                score: 91
              }, {
                name: "Lease Agreement Review",
                dept: "Operations",
                auditor: "Lisa Torres",
                status: "Terminated",
                score: 68
              }].map(row => /*#__PURE__*/_jsxs("tr", {
                className: "hover:bg-muted/50 transition-colors",
                children: [/*#__PURE__*/_jsx("td", {
                  className: "py-2.5 pr-4 font-medium text-foreground",
                  children: row.name
                }), /*#__PURE__*/_jsx("td", {
                  className: "py-2.5 pr-4 text-muted-foreground",
                  children: row.dept
                }), /*#__PURE__*/_jsx("td", {
                  className: "py-2.5 pr-4 text-muted-foreground",
                  children: row.auditor
                }), /*#__PURE__*/_jsx("td", {
                  className: "py-2.5 pr-4",
                  children: statusBadge(row.status)
                }), /*#__PURE__*/_jsx("td", {
                  className: `py-2.5 font-mono font-semibold ${row.score < 0 ? "text-muted-foreground" : row.score >= 90 ? "text-emerald-600" : row.score >= 80 ? "text-amber-600" : "text-red-500"}`,
                  children: row.score < 0 ? "—" : `${row.score}%`
                })]
              }, row.name))
            })]
          })
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        className: "p-5",
        children: [/*#__PURE__*/_jsx(SectionLabel, {
          children: "Risk Indicators"
        }), /*#__PURE__*/_jsx("div", {
          className: "space-y-3",
          children: [{
            label: "Expired contracts with active obligations",
            level: "High",
            count: 2
          }, {
            label: "Contracts with no designated owner",
            level: "Medium",
            count: 7
          }, {
            label: "Obligations past due date",
            level: "High",
            count: 3
          }, {
            label: "Missing compliance documentation",
            level: "Medium",
            count: 5
          }, {
            label: "Unreviewed renewal notices",
            level: "Low",
            count: 4
          }].map(risk => /*#__PURE__*/_jsxs("div", {
            className: "flex items-start gap-3 p-3 bg-muted rounded-lg",
            children: [/*#__PURE__*/_jsx("div", {
              className: `w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${risk.level === "High" ? "bg-red-500" : risk.level === "Medium" ? "bg-amber-500" : "bg-blue-400"}`
            }), /*#__PURE__*/_jsxs("div", {
              className: "flex-1",
              children: [/*#__PURE__*/_jsx("p", {
                className: "text-xs text-foreground leading-snug",
                children: risk.label
              }), /*#__PURE__*/_jsxs("div", {
                className: "flex items-center gap-2 mt-1.5",
                children: [priorityBadge(risk.level), /*#__PURE__*/_jsxs("span", {
                  className: "text-xs text-muted-foreground",
                  children: [risk.count, " items"]
                })]
              })]
            })]
          }, risk.label))
        })]
      })]
    })]
  });
}

// ── Admin Dashboard ────────────────────────────────────────────────────────
function AdminDashboard() {
  return /*#__PURE__*/_jsxs("div", {
    className: "p-6 space-y-5 max-w-screen-xl",
    children: [/*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-2 lg:grid-cols-4 gap-4",
      children: [/*#__PURE__*/_jsx(MetricCard, {
        title: "Total Users",
        value: "34",
        delta: "+2 this month",
        deltaPositive: true,
        icon: Users,
        iconBg: "bg-blue-600"
      }), /*#__PURE__*/_jsx(MetricCard, {
        title: "Active Sessions",
        value: "12",
        delta: "Currently online",
        deltaPositive: true,
        icon: Activity,
        iconBg: "bg-emerald-600"
      }), /*#__PURE__*/_jsx(MetricCard, {
        title: "Storage Used",
        value: "68%",
        delta: "13.6 GB / 20 GB",
        icon: Database,
        iconBg: "bg-amber-500"
      }), /*#__PURE__*/_jsx(MetricCard, {
        title: "Notifications Sent",
        value: "156",
        delta: "Last 30 days",
        deltaPositive: true,
        icon: Bell,
        iconBg: "bg-violet-600"
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-1 lg:grid-cols-2 gap-5",
      children: [/*#__PURE__*/_jsxs(Card, {
        className: "p-5",
        children: [/*#__PURE__*/_jsx(SectionLabel, {
          children: "Contract Statistics — H1 2024"
        }), /*#__PURE__*/_jsx(ResponsiveContainer, {
          width: "100%",
          height: 210,
          children: /*#__PURE__*/_jsxs(BarChart, {
            data: CONTRACT_ACTIVITY,
            barSize: 9,
            barGap: 3,
            children: [/*#__PURE__*/_jsx(CartesianGrid, {
              strokeDasharray: "3 3",
              stroke: "#E2E8F0",
              vertical: false
            }), /*#__PURE__*/_jsx(XAxis, {
              dataKey: "month",
              tick: {
                fontSize: 11,
                fill: "#64748B"
              },
              axisLine: false,
              tickLine: false
            }), /*#__PURE__*/_jsx(YAxis, {
              tick: {
                fontSize: 11,
                fill: "#64748B"
              },
              axisLine: false,
              tickLine: false
            }), /*#__PURE__*/_jsx(Tooltip, {
              contentStyle: {
                fontSize: 11,
                borderRadius: 6
              }
            }), /*#__PURE__*/_jsx(Legend, {
              iconType: "circle",
              iconSize: 7,
              wrapperStyle: {
                fontSize: 11
              }
            }), /*#__PURE__*/_jsx(Bar, {
              dataKey: "created",
              name: "Created",
              fill: "#2563EB",
              radius: [2, 2, 0, 0]
            }), /*#__PURE__*/_jsx(Bar, {
              dataKey: "renewed",
              name: "Renewed",
              fill: "#059669",
              radius: [2, 2, 0, 0]
            }), /*#__PURE__*/_jsx(Bar, {
              dataKey: "terminated",
              name: "Terminated",
              fill: "#EF4444",
              radius: [2, 2, 0, 0]
            })]
          })
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        className: "p-5",
        children: [/*#__PURE__*/_jsx(SectionLabel, {
          children: "System Monitoring"
        }), /*#__PURE__*/_jsx("div", {
          className: "space-y-3.5",
          children: [{
            label: "CPU Usage",
            value: 34,
            color: "bg-emerald-500",
            unit: "%"
          }, {
            label: "Memory Usage",
            value: 62,
            color: "bg-blue-500",
            unit: "%"
          }, {
            label: "Storage Used",
            value: 68,
            color: "bg-amber-500",
            unit: "%"
          }].map(item => /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsxs("div", {
              className: "flex items-center justify-between mb-1",
              children: [/*#__PURE__*/_jsx("span", {
                className: "text-xs font-medium text-foreground",
                children: item.label
              }), /*#__PURE__*/_jsxs("span", {
                className: "text-xs font-mono text-muted-foreground",
                children: [item.value, item.unit]
              })]
            }), /*#__PURE__*/_jsx("div", {
              className: "h-1.5 bg-muted rounded-full overflow-hidden",
              children: /*#__PURE__*/_jsx("div", {
                className: `h-full rounded-full ${item.color} transition-all`,
                style: {
                  width: `${item.value}%`
                }
              })
            })]
          }, item.label))
        }), /*#__PURE__*/_jsx("div", {
          className: "mt-4 grid grid-cols-2 gap-2.5",
          children: [{
            label: "Uptime",
            value: "99.98% — 90 days"
          }, {
            label: "Last Backup",
            value: "Jun 3 — 2:00 AM"
          }, {
            label: "Version",
            value: "ContractIQ v4.2.1"
          }, {
            label: "Environment",
            value: "Production"
          }].map(item => /*#__PURE__*/_jsxs("div", {
            className: "bg-muted rounded-lg p-2.5",
            children: [/*#__PURE__*/_jsx("p", {
              className: "text-xs text-muted-foreground",
              children: item.label
            }), /*#__PURE__*/_jsx("p", {
              className: "text-xs font-semibold text-foreground mt-0.5 font-mono",
              children: item.value
            })]
          }, item.label))
        })]
      })]
    }), /*#__PURE__*/_jsxs(Card, {
      children: [/*#__PURE__*/_jsxs("div", {
        className: "flex items-center justify-between px-5 py-3.5 border-b border-border",
        children: [/*#__PURE__*/_jsx(SectionLabel, {
          children: "User Management"
        }), /*#__PURE__*/_jsxs("button", {
          className: "flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity",
          children: [/*#__PURE__*/_jsx(Plus, {
            size: 12
          }), " Add User"]
        })]
      }), /*#__PURE__*/_jsx("div", {
        className: "overflow-x-auto",
        children: /*#__PURE__*/_jsxs("table", {
          className: "w-full text-xs",
          children: [/*#__PURE__*/_jsx("thead", {
            children: /*#__PURE__*/_jsx("tr", {
              className: "border-b border-border bg-muted",
              children: ["User", "Email", "Role", "Status", "Last Login", "Contracts", "Actions"].map(h => /*#__PURE__*/_jsx("th", {
                className: "text-left px-5 py-3 text-muted-foreground font-semibold uppercase tracking-wide whitespace-nowrap",
                children: h
              }, h))
            })
          }), /*#__PURE__*/_jsx("tbody", {
            className: "divide-y divide-border",
            children: USERS.map(user => /*#__PURE__*/_jsxs("tr", {
              className: "hover:bg-muted/50 transition-colors",
              children: [/*#__PURE__*/_jsx("td", {
                className: "px-5 py-3",
                children: /*#__PURE__*/_jsxs("div", {
                  className: "flex items-center gap-2.5",
                  children: [/*#__PURE__*/_jsx(Av, {
                    initials: user.initials,
                    size: "sm"
                  }), /*#__PURE__*/_jsx("span", {
                    className: "font-semibold text-foreground",
                    children: user.name
                  })]
                })
              }), /*#__PURE__*/_jsx("td", {
                className: "px-5 py-3 font-mono text-muted-foreground",
                children: user.email
              }), /*#__PURE__*/_jsx("td", {
                className: "px-5 py-3",
                children: /*#__PURE__*/_jsx(Badge, {
                  variant: user.role === "Administrator" ? "danger" : user.role === "Legal Manager" ? "info" : "purple",
                  children: user.role
                })
              }), /*#__PURE__*/_jsx("td", {
                className: "px-5 py-3",
                children: statusBadge(user.status)
              }), /*#__PURE__*/_jsx("td", {
                className: "px-5 py-3 font-mono text-muted-foreground whitespace-nowrap",
                children: user.lastLogin
              }), /*#__PURE__*/_jsx("td", {
                className: "px-5 py-3 font-mono font-semibold text-foreground",
                children: user.contracts
              }), /*#__PURE__*/_jsx("td", {
                className: "px-5 py-3",
                children: /*#__PURE__*/_jsxs("div", {
                  className: "flex items-center gap-2",
                  children: [/*#__PURE__*/_jsx("button", {
                    className: "text-muted-foreground hover:text-blue-600 transition-colors",
                    children: /*#__PURE__*/_jsx(Edit, {
                      size: 13
                    })
                  }), /*#__PURE__*/_jsx("button", {
                    className: "text-muted-foreground hover:text-red-500 transition-colors",
                    children: /*#__PURE__*/_jsx(Archive, {
                      size: 13
                    })
                  })]
                })
              })]
            }, user.id))
          })]
        })
      })]
    }), /*#__PURE__*/_jsxs(Card, {
      children: [/*#__PURE__*/_jsxs("div", {
        className: "flex items-center justify-between px-5 py-3.5 border-b border-border",
        children: [/*#__PURE__*/_jsx(SectionLabel, {
          children: "Activity Logs"
        }), /*#__PURE__*/_jsxs("button", {
          className: "flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors",
          children: [/*#__PURE__*/_jsx(Download, {
            size: 12
          }), " Export"]
        })]
      }), /*#__PURE__*/_jsx("div", {
        className: "divide-y divide-border",
        children: ACTIVITY_LOG.map(item => /*#__PURE__*/_jsxs("div", {
          className: "flex items-start gap-3 px-5 py-3 hover:bg-muted/50 transition-colors",
          children: [/*#__PURE__*/_jsx(Av, {
            initials: item.initials,
            size: "sm"
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex-1",
            children: [/*#__PURE__*/_jsxs("p", {
              className: "text-xs",
              children: [/*#__PURE__*/_jsx("span", {
                className: "font-semibold text-foreground",
                children: item.user
              }), " ", /*#__PURE__*/_jsx("span", {
                className: "text-muted-foreground",
                children: item.action
              }), " ", /*#__PURE__*/_jsx("span", {
                className: "text-blue-600",
                children: item.target
              })]
            }), /*#__PURE__*/_jsx("p", {
              className: "text-xs text-muted-foreground mt-0.5",
              children: item.time
            })]
          })]
        }, item.id))
      })]
    })]
  });
}

// ── Contract Repository ────────────────────────────────────────────────────
function ContractRepository({
  onSelectContract
}) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const filtered = CONTRACTS.filter(c => {
    const q = search.toLowerCase();
    const matchSearch = c.name.toLowerCase().includes(q) || c.party.toLowerCase().includes(q) || c.id.toLowerCase().includes(q);
    const matchType = typeFilter === "All" || c.type === typeFilter;
    const matchStatus = statusFilter === "All" || c.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });
  return /*#__PURE__*/_jsxs("div", {
    className: "p-6 space-y-4 max-w-screen-xl",
    children: [/*#__PURE__*/_jsxs("div", {
      className: "flex items-center gap-3 flex-wrap",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "relative flex-1 min-w-48 max-w-sm",
        children: [/*#__PURE__*/_jsx(Search, {
          size: 13,
          className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        }), /*#__PURE__*/_jsx("input", {
          type: "text",
          placeholder: "Search by name, party, or ID…",
          value: search,
          onChange: e => setSearch(e.target.value),
          className: "w-full pl-8 pr-3 py-2 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        })]
      }), /*#__PURE__*/_jsx("select", {
        value: typeFilter,
        onChange: e => setTypeFilter(e.target.value),
        className: "px-3 py-2 border border-border rounded-lg text-sm bg-card text-foreground focus:outline-none",
        children: ["All", "Vendor", "Employment", "Lease", "Software", "NDA", "Services", "Compliance"].map(t => /*#__PURE__*/_jsx("option", {
          children: t
        }, t))
      }), /*#__PURE__*/_jsx("select", {
        value: statusFilter,
        onChange: e => setStatusFilter(e.target.value),
        className: "px-3 py-2 border border-border rounded-lg text-sm bg-card text-foreground focus:outline-none",
        children: ["All", "Active", "Expiring Soon", "Under Review", "Draft", "Terminated"].map(s => /*#__PURE__*/_jsx("option", {
          children: s
        }, s))
      }), /*#__PURE__*/_jsxs("div", {
        className: "ml-auto flex items-center gap-2",
        children: [/*#__PURE__*/_jsxs("button", {
          className: "flex items-center gap-1.5 px-3 py-2 border border-border rounded-lg text-sm text-foreground hover:bg-muted transition-colors",
          children: [/*#__PURE__*/_jsx(Download, {
            size: 13
          }), " Export"]
        }), /*#__PURE__*/_jsxs("button", {
          className: "flex items-center gap-1.5 px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity",
          children: [/*#__PURE__*/_jsx(Plus, {
            size: 13
          }), " New Contract"]
        })]
      })]
    }), /*#__PURE__*/_jsx("div", {
      className: "grid grid-cols-4 gap-3",
      children: [{
        label: "Total Contracts",
        value: CONTRACTS.length
      }, {
        label: "Active",
        value: CONTRACTS.filter(c => c.status === "Active").length
      }, {
        label: "Expiring Soon",
        value: CONTRACTS.filter(c => c.status === "Expiring Soon").length
      }, {
        label: "Showing",
        value: filtered.length
      }].map(item => /*#__PURE__*/_jsxs("div", {
        className: "bg-card border border-border rounded-lg px-4 py-3",
        children: [/*#__PURE__*/_jsx("p", {
          className: "text-xl font-bold font-mono text-foreground",
          children: item.value
        }), /*#__PURE__*/_jsx("p", {
          className: "text-xs text-muted-foreground",
          children: item.label
        })]
      }, item.label))
    }), /*#__PURE__*/_jsxs(Card, {
      children: [/*#__PURE__*/_jsxs("div", {
        className: "overflow-x-auto",
        children: [/*#__PURE__*/_jsxs("table", {
          className: "w-full text-xs",
          children: [/*#__PURE__*/_jsx("thead", {
            children: /*#__PURE__*/_jsx("tr", {
              className: "border-b border-border bg-muted",
              children: ["ID", "Contract Name", "Type", "Counterparty", "Effective", "Expiry", "Status", "Owner", "Value", ""].map(h => /*#__PURE__*/_jsx("th", {
                className: "text-left px-4 py-3 text-muted-foreground font-semibold uppercase tracking-wide whitespace-nowrap",
                children: h
              }, h))
            })
          }), /*#__PURE__*/_jsx("tbody", {
            className: "divide-y divide-border",
            children: filtered.map(contract => /*#__PURE__*/_jsxs("tr", {
              className: "hover:bg-muted/50 transition-colors group cursor-pointer",
              children: [/*#__PURE__*/_jsx("td", {
                className: "px-4 py-3 font-mono text-muted-foreground whitespace-nowrap",
                children: contract.id
              }), /*#__PURE__*/_jsx("td", {
                className: "px-4 py-3 max-w-xs",
                children: /*#__PURE__*/_jsx("button", {
                  onClick: () => onSelectContract(contract.id),
                  className: "font-semibold text-foreground group-hover:text-blue-600 transition-colors text-left truncate block max-w-xs",
                  children: contract.name
                })
              }), /*#__PURE__*/_jsx("td", {
                className: "px-4 py-3 text-muted-foreground whitespace-nowrap",
                children: contract.type
              }), /*#__PURE__*/_jsx("td", {
                className: "px-4 py-3 text-foreground whitespace-nowrap",
                children: contract.party
              }), /*#__PURE__*/_jsx("td", {
                className: "px-4 py-3 font-mono text-muted-foreground whitespace-nowrap",
                children: contract.effective
              }), /*#__PURE__*/_jsx("td", {
                className: "px-4 py-3 font-mono text-muted-foreground whitespace-nowrap",
                children: contract.expiry
              }), /*#__PURE__*/_jsx("td", {
                className: "px-4 py-3",
                children: statusBadge(contract.status)
              }), /*#__PURE__*/_jsx("td", {
                className: "px-4 py-3 text-foreground whitespace-nowrap",
                children: contract.owner
              }), /*#__PURE__*/_jsx("td", {
                className: "px-4 py-3 font-mono font-semibold text-foreground whitespace-nowrap",
                children: contract.value
              }), /*#__PURE__*/_jsx("td", {
                className: "px-4 py-3",
                children: /*#__PURE__*/_jsxs("div", {
                  className: "flex items-center gap-2",
                  children: [/*#__PURE__*/_jsx("button", {
                    onClick: () => onSelectContract(contract.id),
                    className: "text-muted-foreground hover:text-blue-600 transition-colors",
                    children: /*#__PURE__*/_jsx(Eye, {
                      size: 13
                    })
                  }), /*#__PURE__*/_jsx("button", {
                    className: "text-muted-foreground hover:text-foreground transition-colors",
                    children: /*#__PURE__*/_jsx(Edit, {
                      size: 13
                    })
                  }), /*#__PURE__*/_jsx("button", {
                    className: "text-muted-foreground hover:text-foreground transition-colors",
                    children: /*#__PURE__*/_jsx(Download, {
                      size: 13
                    })
                  })]
                })
              })]
            }, contract.id))
          })]
        }), filtered.length === 0 && /*#__PURE__*/_jsx("div", {
          className: "text-center py-12 text-sm text-muted-foreground",
          children: "No contracts match your search criteria."
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "px-5 py-3 border-t border-border flex items-center justify-between",
        children: [/*#__PURE__*/_jsxs("p", {
          className: "text-xs text-muted-foreground",
          children: ["Showing ", filtered.length, " of ", CONTRACTS.length, " contracts"]
        }), /*#__PURE__*/_jsx("div", {
          className: "flex items-center gap-1",
          children: [1, 2, 3].map(p => /*#__PURE__*/_jsx("button", {
            className: `w-7 h-7 text-xs rounded transition-colors ${p === 1 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`,
            children: p
          }, p))
        })]
      })]
    })]
  });
}

// ── Contract Detail ────────────────────────────────────────────────────────
function ContractDetail({
  contractId,
  onBack
}) {
  const contract = CONTRACTS.find(c => c.id === contractId) || CONTRACTS[0];
  const [activeTab, setActiveTab] = useState("overview");
  const approvalSteps = [{
    step: "Drafting",
    status: "completed",
    person: "Lisa Torres",
    date: "Dec 1, 2023"
  }, {
    step: "Legal Review",
    status: "completed",
    person: "Sarah Chen",
    date: "Jan 8, 2024"
  }, {
    step: "Compliance Check",
    status: "completed",
    person: "David Park",
    date: "Jan 12, 2024"
  }, {
    step: "Executive Approval",
    status: "completed",
    person: "Michael Grant — CEO",
    date: "Jan 14, 2024"
  }, {
    step: "Counterparty Execution",
    status: "completed",
    person: "Accenture LLP",
    date: "Jan 15, 2024"
  }, {
    step: "Active Monitoring",
    status: "current",
    person: "Sarah Chen",
    date: "Ongoing"
  }];
  const versions = [{
    ver: "v3.0",
    date: "Jan 15, 2024",
    author: "Sarah Chen",
    note: "Final executed version — fully signed"
  }, {
    ver: "v2.1",
    date: "Jan 10, 2024",
    author: "David Park",
    note: "Legal revisions — amended clause 8.2 liability cap"
  }, {
    ver: "v2.0",
    date: "Dec 20, 2023",
    author: "Sarah Chen",
    note: "Counterparty redlines incorporated"
  }, {
    ver: "v1.0",
    date: "Dec 1, 2023",
    author: "Lisa Torres",
    note: "Initial draft"
  }];
  return /*#__PURE__*/_jsxs("div", {
    className: "p-6 space-y-4 max-w-screen-xl",
    children: [/*#__PURE__*/_jsxs("div", {
      className: "flex items-start gap-4 flex-wrap",
      children: [/*#__PURE__*/_jsxs("button", {
        onClick: onBack,
        className: "flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mt-0.5 flex-shrink-0",
        children: [/*#__PURE__*/_jsx(ChevronLeft, {
          size: 15
        }), " Back"]
      }), /*#__PURE__*/_jsxs("div", {
        className: "flex-1 min-w-0",
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex items-center gap-2.5 flex-wrap mb-1",
          children: [/*#__PURE__*/_jsx("h1", {
            className: "text-base font-bold text-foreground",
            children: contract.name
          }), statusBadge(contract.status), /*#__PURE__*/_jsx(Badge, {
            variant: "neutral",
            children: contract.id
          }), /*#__PURE__*/_jsx(Badge, {
            variant: "neutral",
            children: "v3.0"
          })]
        }), /*#__PURE__*/_jsxs("p", {
          className: "text-xs text-muted-foreground",
          children: [contract.type, " · ", contract.party, " · Owner: ", contract.owner]
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "flex items-center gap-2 flex-shrink-0",
        children: [/*#__PURE__*/_jsxs("button", {
          className: "flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-lg text-xs text-foreground hover:bg-muted transition-colors",
          children: [/*#__PURE__*/_jsx(Download, {
            size: 12
          }), " Download PDF"]
        }), /*#__PURE__*/_jsxs("button", {
          className: "flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity",
          children: [/*#__PURE__*/_jsx(Edit, {
            size: 12
          }), " Edit Contract"]
        })]
      })]
    }), /*#__PURE__*/_jsx("div", {
      className: "flex items-center gap-0 border-b border-border",
      children: ["overview", "obligations", "versions", "documents"].map(tab => /*#__PURE__*/_jsx("button", {
        onClick: () => setActiveTab(tab),
        className: `px-4 py-2.5 text-xs font-semibold capitalize transition-colors border-b-2 -mb-px ${activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`,
        children: tab
      }, tab))
    }), activeTab === "overview" && /*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-1 lg:grid-cols-3 gap-4",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "col-span-1 lg:col-span-2 space-y-4",
        children: [/*#__PURE__*/_jsxs(Card, {
          className: "p-5",
          children: [/*#__PURE__*/_jsx(SectionLabel, {
            children: "Contract Metadata"
          }), /*#__PURE__*/_jsx("div", {
            className: "grid grid-cols-2 sm:grid-cols-3 gap-4",
            children: [{
              label: "Contract Type",
              value: contract.type
            }, {
              label: "Counterparty",
              value: contract.party
            }, {
              label: "Effective Date",
              value: contract.effective
            }, {
              label: "Expiration Date",
              value: contract.expiry
            }, {
              label: "Contract Value",
              value: contract.value
            }, {
              label: "Assigned Owner",
              value: contract.owner
            }, {
              label: "Governing Law",
              value: "State of Delaware, USA"
            }, {
              label: "Jurisdiction",
              value: "US Federal Court"
            }, {
              label: "Auto-Renewal",
              value: "Yes — 60 days notice"
            }].map(item => /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx("p", {
                className: "text-xs text-muted-foreground uppercase tracking-wide mb-0.5",
                children: item.label
              }), /*#__PURE__*/_jsx("p", {
                className: "text-sm font-semibold text-foreground",
                children: item.value
              })]
            }, item.label))
          })]
        }), /*#__PURE__*/_jsxs(Card, {
          className: "p-5",
          children: [/*#__PURE__*/_jsx(SectionLabel, {
            children: "Key Terms"
          }), /*#__PURE__*/_jsx("div", {
            className: "space-y-3",
            children: [{
              term: "Payment Terms",
              detail: "Net-30 from invoice date. Late payment fee of 1.5% per month after 30 days."
            }, {
              term: "Scope of Services",
              detail: "Enterprise IT consulting, managed services, and digital transformation advisory per SOW v2.3."
            }, {
              term: "Termination Clause",
              detail: "Either party may terminate with 90 days written notice. Immediate termination for material breach with 15-day cure period."
            }, {
              term: "Liability Cap",
              detail: "Limited to 12 months of fees paid in the preceding 12-month period. Excludes IP infringement and gross negligence."
            }].map(t => /*#__PURE__*/_jsxs("div", {
              className: "border-l-2 border-blue-200 pl-3.5",
              children: [/*#__PURE__*/_jsx("p", {
                className: "text-xs font-semibold text-foreground",
                children: t.term
              }), /*#__PURE__*/_jsx("p", {
                className: "text-xs text-muted-foreground mt-0.5 leading-relaxed",
                children: t.detail
              })]
            }, t.term))
          })]
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "space-y-4",
        children: [/*#__PURE__*/_jsxs(Card, {
          className: "p-5",
          children: [/*#__PURE__*/_jsx(SectionLabel, {
            children: "Contract Duration"
          }), /*#__PURE__*/_jsxs("div", {
            className: "mb-3",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "flex justify-between text-xs mb-1",
              children: [/*#__PURE__*/_jsx("span", {
                className: "text-muted-foreground",
                children: "Elapsed"
              }), /*#__PURE__*/_jsx("span", {
                className: "font-mono font-semibold text-foreground",
                children: "35%"
              })]
            }), /*#__PURE__*/_jsx("div", {
              className: "h-2 bg-muted rounded-full overflow-hidden",
              children: /*#__PURE__*/_jsx("div", {
                className: "h-full bg-blue-500 rounded-full",
                style: {
                  width: "35%"
                }
              })
            }), /*#__PURE__*/_jsxs("div", {
              className: "flex justify-between text-xs mt-1 text-muted-foreground",
              children: [/*#__PURE__*/_jsx("span", {
                children: contract.effective
              }), /*#__PURE__*/_jsx("span", {
                children: contract.expiry
              })]
            })]
          }), /*#__PURE__*/_jsx("div", {
            className: "space-y-2 pt-2 border-t border-border",
            children: [{
              label: "Days Elapsed",
              value: "255"
            }, {
              label: "Days Remaining",
              value: "475"
            }, {
              label: "Total Duration",
              value: "730 days"
            }].map(item => /*#__PURE__*/_jsxs("div", {
              className: "flex justify-between text-xs",
              children: [/*#__PURE__*/_jsx("span", {
                className: "text-muted-foreground",
                children: item.label
              }), /*#__PURE__*/_jsx("span", {
                className: "font-mono font-semibold text-foreground",
                children: item.value
              })]
            }, item.label))
          })]
        }), /*#__PURE__*/_jsxs(Card, {
          className: "p-5",
          children: [/*#__PURE__*/_jsx(SectionLabel, {
            children: "Approval Workflow"
          }), /*#__PURE__*/_jsx("div", {
            children: approvalSteps.map((step, i) => /*#__PURE__*/_jsxs("div", {
              className: "flex gap-3",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "flex flex-col items-center",
                children: [/*#__PURE__*/_jsxs("div", {
                  className: `w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${step.status === "completed" ? "bg-emerald-500" : step.status === "current" ? "bg-blue-500 ring-3 ring-blue-100" : "bg-muted border border-border"}`,
                  children: [step.status === "completed" && /*#__PURE__*/_jsx(CheckCircle, {
                    size: 11,
                    className: "text-white"
                  }), step.status === "current" && /*#__PURE__*/_jsx("div", {
                    className: "w-1.5 h-1.5 bg-white rounded-full"
                  })]
                }), i < approvalSteps.length - 1 && /*#__PURE__*/_jsx("div", {
                  className: `w-px my-0.5 ${step.status === "completed" ? "bg-emerald-300" : "bg-border"}`,
                  style: {
                    height: 22
                  }
                })]
              }), /*#__PURE__*/_jsxs("div", {
                className: "pb-3 flex-1",
                children: [/*#__PURE__*/_jsx("p", {
                  className: "text-xs font-semibold text-foreground leading-tight",
                  children: step.step
                }), /*#__PURE__*/_jsx("p", {
                  className: "text-xs text-muted-foreground",
                  children: step.person
                }), /*#__PURE__*/_jsx("p", {
                  className: "text-xs text-muted-foreground font-mono",
                  children: step.date
                })]
              })]
            }, i))
          })]
        })]
      })]
    }), activeTab === "obligations" && /*#__PURE__*/_jsx(Card, {
      children: /*#__PURE__*/_jsx("div", {
        className: "overflow-x-auto",
        children: /*#__PURE__*/_jsxs("table", {
          className: "w-full text-xs",
          children: [/*#__PURE__*/_jsx("thead", {
            children: /*#__PURE__*/_jsx("tr", {
              className: "border-b border-border bg-muted",
              children: ["ID", "Obligation", "Assignee", "Due Date", "Priority", "Status", "Category"].map(h => /*#__PURE__*/_jsx("th", {
                className: "text-left px-4 py-3 text-muted-foreground font-semibold uppercase tracking-wide whitespace-nowrap",
                children: h
              }, h))
            })
          }), /*#__PURE__*/_jsx("tbody", {
            className: "divide-y divide-border",
            children: OBLIGATIONS.slice(0, 5).map(obl => /*#__PURE__*/_jsxs("tr", {
              className: "hover:bg-muted/50 transition-colors",
              children: [/*#__PURE__*/_jsx("td", {
                className: "px-4 py-3 font-mono text-muted-foreground",
                children: obl.id
              }), /*#__PURE__*/_jsx("td", {
                className: "px-4 py-3 font-semibold text-foreground",
                children: obl.title
              }), /*#__PURE__*/_jsx("td", {
                className: "px-4 py-3 text-foreground",
                children: obl.assignee
              }), /*#__PURE__*/_jsx("td", {
                className: "px-4 py-3 font-mono text-muted-foreground whitespace-nowrap",
                children: obl.due
              }), /*#__PURE__*/_jsx("td", {
                className: "px-4 py-3",
                children: priorityBadge(obl.priority)
              }), /*#__PURE__*/_jsx("td", {
                className: "px-4 py-3",
                children: statusBadge(obl.status)
              }), /*#__PURE__*/_jsx("td", {
                className: "px-4 py-3 text-muted-foreground",
                children: obl.category
              })]
            }, obl.id))
          })]
        })
      })
    }), activeTab === "versions" && /*#__PURE__*/_jsxs(Card, {
      className: "p-5",
      children: [/*#__PURE__*/_jsx(SectionLabel, {
        children: "Version History"
      }), /*#__PURE__*/_jsx("div", {
        className: "divide-y divide-border",
        children: versions.map(v => /*#__PURE__*/_jsxs("div", {
          className: "flex items-center gap-4 py-3",
          children: [/*#__PURE__*/_jsx(Badge, {
            variant: "neutral",
            children: v.ver
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex-1",
            children: [/*#__PURE__*/_jsx("p", {
              className: "text-xs font-semibold text-foreground",
              children: v.note
            }), /*#__PURE__*/_jsxs("p", {
              className: "text-xs text-muted-foreground mt-0.5",
              children: [v.author, " · ", v.date]
            })]
          }), /*#__PURE__*/_jsxs("button", {
            className: "flex items-center gap-1 text-xs text-blue-600 hover:underline whitespace-nowrap",
            children: [/*#__PURE__*/_jsx(Download, {
              size: 11
            }), " Download"]
          })]
        }, v.ver))
      })]
    }), activeTab === "documents" && /*#__PURE__*/_jsxs(Card, {
      className: "p-5",
      children: [/*#__PURE__*/_jsx(SectionLabel, {
        children: "Attached Documents"
      }), /*#__PURE__*/_jsx("div", {
        className: "space-y-2",
        children: [{
          name: "MSA_Accenture_v3.0_Executed.pdf",
          size: "2.4 MB",
          date: "Jan 15, 2024",
          type: "PDF"
        }, {
          name: "SOW_v2.3_IT_Consulting.pdf",
          size: "1.1 MB",
          date: "Jan 15, 2024",
          type: "PDF"
        }, {
          name: "Exhibit_A_Pricing_Schedule.xlsx",
          size: "380 KB",
          date: "Jan 10, 2024",
          type: "XLSX"
        }, {
          name: "Legal_Review_Notes_v2.1.docx",
          size: "245 KB",
          date: "Jan 10, 2024",
          type: "DOCX"
        }].map(doc => /*#__PURE__*/_jsxs("div", {
          className: "flex items-center gap-3 p-3 bg-muted rounded-lg hover:bg-accent transition-colors",
          children: [/*#__PURE__*/_jsx("div", {
            className: "w-8 h-8 bg-card border border-border rounded flex items-center justify-center flex-shrink-0",
            children: /*#__PURE__*/_jsx(Paperclip, {
              size: 12,
              className: "text-muted-foreground"
            })
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex-1 min-w-0",
            children: [/*#__PURE__*/_jsx("p", {
              className: "text-xs font-semibold text-foreground truncate",
              children: doc.name
            }), /*#__PURE__*/_jsxs("p", {
              className: "text-xs text-muted-foreground",
              children: [doc.size, " · ", doc.date]
            })]
          }), /*#__PURE__*/_jsx(Badge, {
            variant: "neutral",
            children: doc.type
          }), /*#__PURE__*/_jsx("button", {
            className: "text-muted-foreground hover:text-foreground transition-colors",
            children: /*#__PURE__*/_jsx(Download, {
              size: 13
            })
          })]
        }, doc.name))
      })]
    })]
  });
}

// ── Obligation Tracker ─────────────────────────────────────────────────────
function ObligationTracker() {
  const [viewMode, setViewMode] = useState("kanban");
  const [search, setSearch] = useState("");
  const COLUMNS = [{
    id: "Pending",
    color: "text-blue-600",
    border: "border-blue-200",
    bg: "bg-blue-50"
  }, {
    id: "In Progress",
    color: "text-violet-600",
    border: "border-violet-200",
    bg: "bg-violet-50"
  }, {
    id: "Under Review",
    color: "text-amber-600",
    border: "border-amber-200",
    bg: "bg-amber-50"
  }, {
    id: "Completed",
    color: "text-emerald-600",
    border: "border-emerald-200",
    bg: "bg-emerald-50"
  }, {
    id: "Overdue",
    color: "text-red-600",
    border: "border-red-200",
    bg: "bg-red-50"
  }];
  const filtered = OBLIGATIONS.filter(o => o.title.toLowerCase().includes(search.toLowerCase()) || o.assignee.toLowerCase().includes(search.toLowerCase()) || o.category.toLowerCase().includes(search.toLowerCase()));
  return /*#__PURE__*/_jsxs("div", {
    className: "p-6 space-y-4 max-w-screen-xl",
    children: [/*#__PURE__*/_jsxs("div", {
      className: "flex items-center gap-3 flex-wrap",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "relative",
        children: [/*#__PURE__*/_jsx(Search, {
          size: 13,
          className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        }), /*#__PURE__*/_jsx("input", {
          type: "text",
          placeholder: "Search obligations…",
          value: search,
          onChange: e => setSearch(e.target.value),
          className: "pl-8 pr-3 py-2 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-52"
        })]
      }), /*#__PURE__*/_jsx("div", {
        className: "flex items-center bg-card border border-border rounded-lg overflow-hidden",
        children: ["kanban", "list"].map(mode => /*#__PURE__*/_jsx("button", {
          onClick: () => setViewMode(mode),
          className: `px-3 py-1.5 text-xs font-semibold capitalize transition-colors ${viewMode === mode ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`,
          children: mode
        }, mode))
      }), /*#__PURE__*/_jsx("div", {
        className: "flex items-center gap-3 text-xs text-muted-foreground ml-2",
        children: COLUMNS.map(col => /*#__PURE__*/_jsxs("span", {
          className: `flex items-center gap-1 ${col.color}`,
          children: ["● ", /*#__PURE__*/_jsx("span", {
            className: "text-muted-foreground",
            children: OBLIGATIONS.filter(o => o.status === col.id).length
          })]
        }, col.id))
      }), /*#__PURE__*/_jsxs("button", {
        className: "ml-auto flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity",
        children: [/*#__PURE__*/_jsx(Plus, {
          size: 12
        }), " Add Obligation"]
      })]
    }), viewMode === "kanban" ? /*#__PURE__*/_jsx("div", {
      className: "flex gap-4 overflow-x-auto pb-2",
      children: COLUMNS.map(col => {
        const items = filtered.filter(o => o.status === col.id);
        return /*#__PURE__*/_jsxs("div", {
          className: "flex-shrink-0 w-60",
          children: [/*#__PURE__*/_jsxs("div", {
            className: `flex items-center justify-between px-3 py-2 rounded-t-lg border ${col.bg} ${col.border}`,
            children: [/*#__PURE__*/_jsx("span", {
              className: `text-xs font-bold ${col.color}`,
              children: col.id
            }), /*#__PURE__*/_jsx("span", {
              className: `text-xs font-mono font-bold ${col.color}`,
              children: items.length
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "space-y-2 mt-2 min-h-24",
            children: [items.map(obl => /*#__PURE__*/_jsxs("div", {
              className: "bg-card border border-border rounded-lg p-3 hover:shadow-sm transition-shadow cursor-pointer",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "flex items-start justify-between gap-2 mb-2",
                children: [/*#__PURE__*/_jsx("p", {
                  className: "text-xs font-semibold text-foreground leading-snug",
                  children: obl.title
                }), priorityBadge(obl.priority)]
              }), /*#__PURE__*/_jsx("p", {
                className: "text-xs text-muted-foreground truncate mb-2.5",
                children: obl.contract.split("—")[0].trim()
              }), /*#__PURE__*/_jsxs("div", {
                className: "flex items-center justify-between",
                children: [/*#__PURE__*/_jsxs("div", {
                  className: "flex items-center gap-1.5",
                  children: [/*#__PURE__*/_jsx(Av, {
                    initials: obl.initials,
                    size: "sm"
                  }), /*#__PURE__*/_jsx("span", {
                    className: "text-xs text-muted-foreground",
                    children: obl.assignee.split(" ")[0]
                  })]
                }), /*#__PURE__*/_jsxs("div", {
                  className: "flex items-center gap-1 text-xs text-muted-foreground",
                  children: [/*#__PURE__*/_jsx(Calendar, {
                    size: 10
                  }), /*#__PURE__*/_jsx("span", {
                    className: "font-mono",
                    children: obl.due.split(",")[0]
                  })]
                })]
              }), /*#__PURE__*/_jsx("div", {
                className: "mt-2 pt-2 border-t border-border",
                children: /*#__PURE__*/_jsx(Badge, {
                  variant: "neutral",
                  children: obl.category
                })
              })]
            }, obl.id)), items.length === 0 && /*#__PURE__*/_jsx("div", {
              className: "text-center py-8 text-xs text-muted-foreground border border-dashed border-border rounded-lg",
              children: "No items"
            })]
          })]
        }, col.id);
      })
    }) : /*#__PURE__*/_jsx(Card, {
      children: /*#__PURE__*/_jsx("div", {
        className: "overflow-x-auto",
        children: /*#__PURE__*/_jsxs("table", {
          className: "w-full text-xs",
          children: [/*#__PURE__*/_jsx("thead", {
            children: /*#__PURE__*/_jsx("tr", {
              className: "border-b border-border bg-muted",
              children: ["ID", "Obligation", "Contract", "Assignee", "Due Date", "Priority", "Status", "Category"].map(h => /*#__PURE__*/_jsx("th", {
                className: "text-left px-4 py-3 text-muted-foreground font-semibold uppercase tracking-wide whitespace-nowrap",
                children: h
              }, h))
            })
          }), /*#__PURE__*/_jsx("tbody", {
            className: "divide-y divide-border",
            children: filtered.map(obl => /*#__PURE__*/_jsxs("tr", {
              className: "hover:bg-muted/50 transition-colors",
              children: [/*#__PURE__*/_jsx("td", {
                className: "px-4 py-3 font-mono text-muted-foreground",
                children: obl.id
              }), /*#__PURE__*/_jsx("td", {
                className: "px-4 py-3 font-semibold text-foreground max-w-xs",
                children: /*#__PURE__*/_jsx("p", {
                  className: "truncate",
                  children: obl.title
                })
              }), /*#__PURE__*/_jsx("td", {
                className: "px-4 py-3 text-muted-foreground max-w-xs",
                children: /*#__PURE__*/_jsx("p", {
                  className: "truncate",
                  children: obl.contract
                })
              }), /*#__PURE__*/_jsx("td", {
                className: "px-4 py-3 text-foreground whitespace-nowrap",
                children: obl.assignee
              }), /*#__PURE__*/_jsx("td", {
                className: "px-4 py-3 font-mono text-muted-foreground whitespace-nowrap",
                children: obl.due
              }), /*#__PURE__*/_jsx("td", {
                className: "px-4 py-3",
                children: priorityBadge(obl.priority)
              }), /*#__PURE__*/_jsx("td", {
                className: "px-4 py-3",
                children: statusBadge(obl.status)
              }), /*#__PURE__*/_jsx("td", {
                className: "px-4 py-3 text-muted-foreground",
                children: obl.category
              })]
            }, obl.id))
          })]
        })
      })
    })]
  });
}

// ── Renewal Shared: Mini Calendar Widget ──────────────────────────────────
function MiniCalendar() {
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const startDay = 6; // Jun 2024 starts on Saturday
  const totalDays = 30;
  const cells = [...Array(startDay).fill(null), ...Array.from({
    length: totalDays
  }, (_, i) => i + 1)];
  const eventDays = new Set(CALENDAR_EVENTS.map(e => e.day));
  return /*#__PURE__*/_jsxs("div", {
    className: "bg-card border border-border rounded-lg p-4",
    children: [/*#__PURE__*/_jsxs("div", {
      className: "flex items-center justify-between mb-3",
      children: [/*#__PURE__*/_jsx("span", {
        className: "text-xs font-bold text-foreground",
        children: "June 2024"
      }), /*#__PURE__*/_jsxs("div", {
        className: "flex gap-1",
        children: [/*#__PURE__*/_jsx("button", {
          className: "w-5 h-5 flex items-center justify-center text-muted-foreground hover:text-foreground rounded",
          children: /*#__PURE__*/_jsx(ChevronLeft, {
            size: 12
          })
        }), /*#__PURE__*/_jsx("button", {
          className: "w-5 h-5 flex items-center justify-center text-muted-foreground hover:text-foreground rounded",
          children: /*#__PURE__*/_jsx(ChevronRight, {
            size: 12
          })
        })]
      })]
    }), /*#__PURE__*/_jsx("div", {
      className: "grid grid-cols-7 gap-0.5 mb-1",
      children: days.map(d => /*#__PURE__*/_jsx("div", {
        className: "text-center text-xs text-muted-foreground font-semibold py-1",
        children: d
      }, d))
    }), /*#__PURE__*/_jsx("div", {
      className: "grid grid-cols-7 gap-0.5",
      children: cells.map((day, i) => /*#__PURE__*/_jsx("div", {
        className: `text-center text-xs py-1 rounded leading-5 cursor-default transition-colors ${!day ? "" : day === 3 ? "bg-primary text-white font-bold" : eventDays.has(day) ? "bg-blue-50 text-blue-700 font-semibold" : "text-foreground hover:bg-muted"}`,
        children: day || ""
      }, i))
    }), /*#__PURE__*/_jsx("div", {
      className: "mt-3 space-y-1.5 border-t border-border pt-3",
      children: CALENDAR_EVENTS.slice(0, 4).map(ev => /*#__PURE__*/_jsxs("div", {
        className: "flex items-center gap-2 text-xs",
        children: [/*#__PURE__*/_jsx("div", {
          className: `w-1.5 h-1.5 rounded-full flex-shrink-0 ${ev.color}`
        }), /*#__PURE__*/_jsxs("span", {
          className: "font-mono text-muted-foreground",
          children: ["Jun ", ev.day]
        }), /*#__PURE__*/_jsx("span", {
          className: "text-foreground truncate",
          children: ev.label
        })]
      }, ev.day))
    })]
  });
}

// ── Renewal Dashboard ──────────────────────────────────────────────────────
function RenewalDashboard({
  onNavigate
}) {
  const [toast, setToast] = useState(null);
  const showToast = msg => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };
  const upcomingCount = RENEWALS.filter(r => r.status === "Upcoming" || r.status === "Due Soon").length;
  const renewedCount = RENEWALS.filter(r => r.status === "Renewed").length;
  const expiredCount = RENEWALS.filter(r => r.status === "Expired").length;
  const inProgressCount = RENEWALS.filter(r => r.status === "In Progress").length;
  const dueThisMonth = RENEWALS.filter(r => r.daysRemaining >= 0 && r.daysRemaining <= 30).length;
  const recentActivity = [{
    initials: "LT",
    user: "Lisa Torres",
    action: "Submitted renewal request for",
    target: "Commercial Lease — HQ Tower A",
    time: "2 hrs ago",
    type: "submit"
  }, {
    initials: "SC",
    user: "Sarah Chen",
    action: "Approved legal review for",
    target: "APAC Distribution Agreement",
    time: "4 hrs ago",
    type: "approve"
  }, {
    initials: "DP",
    user: "David Park",
    action: "Sent 30-day reminder for",
    target: "Legal Advisory Consulting Agreement",
    time: "6 hrs ago",
    type: "reminder"
  }, {
    initials: "MJ",
    user: "Mark Johnson",
    action: "Flagged for renewal review",
    target: "Enterprise SaaS License — Salesforce",
    time: "1 day ago",
    type: "flag"
  }, {
    initials: "AR",
    user: "Alexandra Ross",
    action: "Generated renewal report for",
    target: "Q2 2024 Renewals Summary",
    time: "2 days ago",
    type: "report"
  }];
  return /*#__PURE__*/_jsxs("div", {
    className: "p-6 space-y-5 max-w-screen-xl relative",
    children: [toast && /*#__PURE__*/_jsxs("div", {
      className: "fixed top-4 right-4 z-50 bg-foreground text-background text-xs font-medium px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 transition-all",
      children: [/*#__PURE__*/_jsx(CheckCircle2, {
        size: 14,
        className: "text-emerald-400"
      }), toast]
    }), /*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4",
      children: [/*#__PURE__*/_jsx(MetricCard, {
        title: "Upcoming Renewals",
        value: String(upcomingCount),
        delta: "Next 90 days",
        icon: CalendarClock,
        iconBg: "bg-amber-500"
      }), /*#__PURE__*/_jsx(MetricCard, {
        title: "Renewed YTD",
        value: String(renewedCount),
        delta: "+3 vs last quarter",
        deltaPositive: true,
        icon: CalendarCheck,
        iconBg: "bg-emerald-600"
      }), /*#__PURE__*/_jsx(MetricCard, {
        title: "Expired Contracts",
        value: String(expiredCount),
        delta: "Action required",
        icon: CalendarX,
        iconBg: "bg-red-500"
      }), /*#__PURE__*/_jsx(MetricCard, {
        title: "Pending Approvals",
        value: String(inProgressCount),
        delta: "Awaiting review",
        icon: Hourglass,
        iconBg: "bg-violet-600"
      }), /*#__PURE__*/_jsx(MetricCard, {
        title: "Due This Month",
        value: String(dueThisMonth),
        delta: "June 2024",
        icon: CalendarDays,
        iconBg: "bg-blue-600"
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-1 lg:grid-cols-3 gap-5",
      children: [/*#__PURE__*/_jsxs(Card, {
        className: "col-span-1 lg:col-span-2 p-5",
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex items-center justify-between mb-4",
          children: [/*#__PURE__*/_jsx(SectionLabel, {
            children: "Monthly Renewal Trend — 2024"
          }), /*#__PURE__*/_jsxs("select", {
            className: "text-xs border border-border rounded px-2 py-1 bg-muted text-muted-foreground",
            children: [/*#__PURE__*/_jsx("option", {
              children: "Last 8 months"
            }), /*#__PURE__*/_jsx("option", {
              children: "Last 12 months"
            })]
          })]
        }), /*#__PURE__*/_jsx(ResponsiveContainer, {
          width: "100%",
          height: 210,
          children: /*#__PURE__*/_jsxs(BarChart, {
            data: RENEWAL_TREND,
            barSize: 9,
            barGap: 3,
            children: [/*#__PURE__*/_jsx(CartesianGrid, {
              strokeDasharray: "3 3",
              stroke: "#E2E8F0",
              vertical: false
            }), /*#__PURE__*/_jsx(XAxis, {
              dataKey: "month",
              tick: {
                fontSize: 11,
                fill: "#64748B"
              },
              axisLine: false,
              tickLine: false
            }), /*#__PURE__*/_jsx(YAxis, {
              tick: {
                fontSize: 11,
                fill: "#64748B"
              },
              axisLine: false,
              tickLine: false
            }), /*#__PURE__*/_jsx(Tooltip, {
              contentStyle: {
                fontSize: 11,
                borderRadius: 6,
                border: "1px solid #E2E8F0"
              }
            }), /*#__PURE__*/_jsx(Legend, {
              iconType: "circle",
              iconSize: 7,
              wrapperStyle: {
                fontSize: 11
              }
            }), /*#__PURE__*/_jsx(Bar, {
              dataKey: "renewed",
              name: "Renewed",
              fill: "#10B981",
              radius: [2, 2, 0, 0]
            }), /*#__PURE__*/_jsx(Bar, {
              dataKey: "pending",
              name: "Pending",
              fill: "#F59E0B",
              radius: [2, 2, 0, 0]
            }), /*#__PURE__*/_jsx(Bar, {
              dataKey: "expired",
              name: "Expired",
              fill: "#EF4444",
              radius: [2, 2, 0, 0]
            })]
          })
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "space-y-4",
        children: [/*#__PURE__*/_jsx(MiniCalendar, {}), /*#__PURE__*/_jsxs(Card, {
          className: "p-4",
          children: [/*#__PURE__*/_jsx(SectionLabel, {
            children: "Quick Actions"
          }), /*#__PURE__*/_jsx("div", {
            className: "space-y-2",
            children: [{
              label: "Create Renewal Request",
              icon: Plus,
              action: "Renewal request created",
              color: "bg-primary text-primary-foreground hover:bg-blue-700"
            }, {
              label: "Send Renewal Reminder",
              icon: Send,
              action: "Reminder dispatched to stakeholders",
              color: "bg-amber-500 text-white hover:bg-amber-600"
            }, {
              label: "Generate Renewal Report",
              icon: Download,
              action: "Renewal report queued for download",
              color: "bg-emerald-600 text-white hover:bg-emerald-700"
            }].map(({
              label,
              icon: Icon,
              action,
              color
            }) => /*#__PURE__*/_jsxs("button", {
              onClick: () => showToast(action),
              className: `w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${color}`,
              children: [/*#__PURE__*/_jsx(Icon, {
                size: 13
              }), " ", label]
            }, label))
          })]
        })]
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-1 lg:grid-cols-2 gap-5",
      children: [/*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex items-center justify-between px-5 py-3.5 border-b border-border",
          children: [/*#__PURE__*/_jsx(SectionLabel, {
            children: "Recent Renewal Activity"
          }), /*#__PURE__*/_jsx("button", {
            onClick: () => onNavigate("renewal-history"),
            className: "text-xs text-blue-600 hover:underline",
            children: "View all"
          })]
        }), /*#__PURE__*/_jsx("div", {
          className: "divide-y divide-border",
          children: recentActivity.map((item, i) => /*#__PURE__*/_jsxs("div", {
            className: "flex items-start gap-3 px-5 py-3 hover:bg-muted/50 transition-colors",
            children: [/*#__PURE__*/_jsx(Av, {
              initials: item.initials,
              size: "sm"
            }), /*#__PURE__*/_jsxs("div", {
              className: "flex-1 min-w-0",
              children: [/*#__PURE__*/_jsxs("p", {
                className: "text-xs",
                children: [/*#__PURE__*/_jsx("span", {
                  className: "font-semibold text-foreground",
                  children: item.user
                }), " ", /*#__PURE__*/_jsx("span", {
                  className: "text-muted-foreground",
                  children: item.action
                })]
              }), /*#__PURE__*/_jsx("p", {
                className: "text-xs text-blue-600 truncate mt-0.5",
                children: item.target
              }), /*#__PURE__*/_jsx("p", {
                className: "text-xs text-muted-foreground mt-0.5",
                children: item.time
              })]
            })]
          }, i))
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex items-center justify-between px-5 py-3.5 border-b border-border",
          children: [/*#__PURE__*/_jsx(SectionLabel, {
            children: "Upcoming Renewals"
          }), /*#__PURE__*/_jsx("button", {
            onClick: () => onNavigate("renewal-tracking"),
            className: "text-xs text-blue-600 hover:underline",
            children: "View all"
          })]
        }), /*#__PURE__*/_jsx("div", {
          className: "divide-y divide-border",
          children: RENEWALS.filter(r => r.daysRemaining >= 0).sort((a, b) => a.daysRemaining - b.daysRemaining).slice(0, 5).map(r => /*#__PURE__*/_jsxs("div", {
            className: "flex items-center gap-3 px-5 py-3 hover:bg-muted/50 transition-colors",
            children: [/*#__PURE__*/_jsx("div", {
              className: `w-1 h-8 rounded-full flex-shrink-0 ${r.daysRemaining <= 30 ? "bg-red-500" : r.daysRemaining <= 90 ? "bg-amber-500" : "bg-blue-400"}`
            }), /*#__PURE__*/_jsxs("div", {
              className: "flex-1 min-w-0",
              children: [/*#__PURE__*/_jsx("p", {
                className: "text-xs font-semibold text-foreground truncate",
                children: r.name
              }), /*#__PURE__*/_jsxs("p", {
                className: "text-xs text-muted-foreground",
                children: ["Owner: ", r.owner, " · ", r.renewalDate]
              })]
            }), /*#__PURE__*/_jsx(CountdownTimer, {
              days: r.daysRemaining
            })]
          }, r.id))
        })]
      })]
    })]
  });
}

// ── Renewal Tracking ───────────────────────────────────────────────────────
function RenewalTracking() {
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [toast, setToast] = useState(null);
  const showToast = msg => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };
  const filtered = RENEWALS.filter(r => {
    const q = search.toLowerCase();
    return (r.name.toLowerCase().includes(q) || r.contractId.toLowerCase().includes(q) || r.owner.toLowerCase().includes(q)) && (deptFilter === "All" || r.dept === deptFilter) && (typeFilter === "All" || r.type === typeFilter) && (statusFilter === "All" || r.status === statusFilter) && (priorityFilter === "All" || r.priority === priorityFilter);
  });
  const depts = ["All", ...Array.from(new Set(RENEWALS.map(r => r.dept)))];
  const types = ["All", ...Array.from(new Set(RENEWALS.map(r => r.type)))];
  return /*#__PURE__*/_jsxs("div", {
    className: "p-6 space-y-4 max-w-screen-xl relative",
    children: [toast && /*#__PURE__*/_jsxs("div", {
      className: "fixed top-4 right-4 z-50 bg-foreground text-background text-xs font-medium px-4 py-3 rounded-lg shadow-lg flex items-center gap-2",
      children: [/*#__PURE__*/_jsx(CheckCircle2, {
        size: 14,
        className: "text-emerald-400"
      }), " ", toast]
    }), /*#__PURE__*/_jsxs("div", {
      className: "flex items-center gap-3 flex-wrap",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "relative flex-1 min-w-48 max-w-sm",
        children: [/*#__PURE__*/_jsx(Search, {
          size: 13,
          className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        }), /*#__PURE__*/_jsx("input", {
          type: "text",
          placeholder: "Search by name, ID, or owner…",
          value: search,
          onChange: e => setSearch(e.target.value),
          className: "w-full pl-8 pr-3 py-2 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        })]
      }), /*#__PURE__*/_jsx("div", {
        className: "flex items-center gap-2 flex-wrap",
        children: [{
          label: "Department",
          value: deptFilter,
          setter: setDeptFilter,
          options: depts
        }, {
          label: "Type",
          value: typeFilter,
          setter: setTypeFilter,
          options: types
        }, {
          label: "Status",
          value: statusFilter,
          setter: setStatusFilter,
          options: ["All", "Renewed", "Upcoming", "Due Soon", "Expired", "In Progress", "Cancelled"]
        }, {
          label: "Priority",
          value: priorityFilter,
          setter: setPriorityFilter,
          options: ["All", "Critical", "High", "Medium", "Low"]
        }].map(f => /*#__PURE__*/_jsx("select", {
          value: f.value,
          onChange: e => f.setter(e.target.value),
          className: "px-3 py-2 border border-border rounded-lg text-xs bg-card text-foreground focus:outline-none",
          children: f.options.map(o => /*#__PURE__*/_jsx("option", {
            children: o
          }, o))
        }, f.label))
      }), /*#__PURE__*/_jsxs("div", {
        className: "ml-auto flex items-center gap-2",
        children: [/*#__PURE__*/_jsxs("button", {
          onClick: () => showToast("Renewal report exported"),
          className: "flex items-center gap-1.5 px-3 py-2 border border-border rounded-lg text-xs text-foreground hover:bg-muted transition-colors",
          children: [/*#__PURE__*/_jsx(Download, {
            size: 13
          }), " Export"]
        }), /*#__PURE__*/_jsxs("button", {
          onClick: () => showToast("Create Renewal dialog opened"),
          className: "flex items-center gap-1.5 px-3 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors",
          children: [/*#__PURE__*/_jsx(Plus, {
            size: 13
          }), " New Renewal"]
        })]
      })]
    }), /*#__PURE__*/_jsx("div", {
      className: "grid grid-cols-4 gap-3",
      children: [{
        label: "Total",
        value: RENEWALS.length
      }, {
        label: "Due Soon (30d)",
        value: RENEWALS.filter(r => r.daysRemaining >= 0 && r.daysRemaining <= 30).length
      }, {
        label: "Showing",
        value: filtered.length
      }, {
        label: "Expired",
        value: RENEWALS.filter(r => r.status === "Expired").length
      }].map(item => /*#__PURE__*/_jsxs("div", {
        className: "bg-card border border-border rounded-lg px-4 py-3",
        children: [/*#__PURE__*/_jsx("p", {
          className: "text-xl font-bold font-mono text-foreground",
          children: item.value
        }), /*#__PURE__*/_jsx("p", {
          className: "text-xs text-muted-foreground",
          children: item.label
        })]
      }, item.label))
    }), /*#__PURE__*/_jsxs(Card, {
      children: [/*#__PURE__*/_jsxs("div", {
        className: "overflow-x-auto",
        children: [/*#__PURE__*/_jsxs("table", {
          className: "w-full text-xs",
          children: [/*#__PURE__*/_jsx("thead", {
            children: /*#__PURE__*/_jsx("tr", {
              className: "border-b border-border bg-muted",
              children: ["Contract ID", "Contract Name", "Owner", "Renewal Date", "Days Remaining", "Status", "Priority", "Assigned To", "Actions"].map(h => /*#__PURE__*/_jsx("th", {
                className: "text-left px-4 py-3 text-muted-foreground font-semibold uppercase tracking-wide whitespace-nowrap",
                children: h
              }, h))
            })
          }), /*#__PURE__*/_jsx("tbody", {
            className: "divide-y divide-border",
            children: filtered.map(r => /*#__PURE__*/_jsxs("tr", {
              className: "hover:bg-muted/50 transition-colors group",
              children: [/*#__PURE__*/_jsx("td", {
                className: "px-4 py-3 font-mono text-muted-foreground whitespace-nowrap",
                children: r.contractId
              }), /*#__PURE__*/_jsxs("td", {
                className: "px-4 py-3 max-w-[220px]",
                children: [/*#__PURE__*/_jsx("p", {
                  className: "font-semibold text-foreground group-hover:text-blue-600 transition-colors truncate",
                  children: r.name
                }), /*#__PURE__*/_jsxs("p", {
                  className: "text-muted-foreground text-xs",
                  children: [r.dept, " · ", r.type]
                })]
              }), /*#__PURE__*/_jsx("td", {
                className: "px-4 py-3 whitespace-nowrap",
                children: /*#__PURE__*/_jsxs("div", {
                  className: "flex items-center gap-2",
                  children: [/*#__PURE__*/_jsx(Av, {
                    initials: r.initials,
                    size: "sm"
                  }), /*#__PURE__*/_jsx("span", {
                    className: "text-foreground",
                    children: r.owner
                  })]
                })
              }), /*#__PURE__*/_jsx("td", {
                className: "px-4 py-3 font-mono text-muted-foreground whitespace-nowrap",
                children: r.renewalDate
              }), /*#__PURE__*/_jsx("td", {
                className: "px-4 py-3 whitespace-nowrap",
                children: /*#__PURE__*/_jsx(CountdownTimer, {
                  days: r.daysRemaining
                })
              }), /*#__PURE__*/_jsx("td", {
                className: "px-4 py-3",
                children: renewalStatusBadge(r.status)
              }), /*#__PURE__*/_jsx("td", {
                className: "px-4 py-3",
                children: priorityBadge(r.priority)
              }), /*#__PURE__*/_jsx("td", {
                className: "px-4 py-3 whitespace-nowrap text-foreground",
                children: r.assignedTo
              }), /*#__PURE__*/_jsx("td", {
                className: "px-4 py-3",
                children: /*#__PURE__*/_jsxs("div", {
                  className: "flex items-center gap-2",
                  children: [/*#__PURE__*/_jsx("button", {
                    onClick: () => showToast(`Viewing ${r.name}`),
                    className: "text-muted-foreground hover:text-blue-600 transition-colors",
                    children: /*#__PURE__*/_jsx(Eye, {
                      size: 13
                    })
                  }), /*#__PURE__*/_jsx("button", {
                    onClick: () => showToast(`Editing ${r.name}`),
                    className: "text-muted-foreground hover:text-foreground transition-colors",
                    children: /*#__PURE__*/_jsx(Edit, {
                      size: 13
                    })
                  }), /*#__PURE__*/_jsx("button", {
                    onClick: () => showToast(`Renewal initiated for ${r.name}`),
                    className: "text-muted-foreground hover:text-emerald-600 transition-colors",
                    children: /*#__PURE__*/_jsx(RotateCcw, {
                      size: 13
                    })
                  })]
                })
              })]
            }, r.id))
          })]
        }), filtered.length === 0 && /*#__PURE__*/_jsx("div", {
          className: "text-center py-12 text-sm text-muted-foreground",
          children: "No renewals match your search criteria."
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "px-5 py-3 border-t border-border flex items-center justify-between",
        children: [/*#__PURE__*/_jsxs("p", {
          className: "text-xs text-muted-foreground",
          children: ["Showing ", filtered.length, " of ", RENEWALS.length, " renewals"]
        }), /*#__PURE__*/_jsx("div", {
          className: "flex items-center gap-1",
          children: [1, 2].map(p => /*#__PURE__*/_jsx("button", {
            className: `w-7 h-7 text-xs rounded transition-colors ${p === 1 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`,
            children: p
          }, p))
        })]
      })]
    })]
  });
}

// ── Expiry Monitoring ──────────────────────────────────────────────────────
function ExpiryMonitoring() {
  const expired = RENEWALS.filter(r => r.daysRemaining < 0);
  const in7 = RENEWALS.filter(r => r.daysRemaining >= 0 && r.daysRemaining <= 7);
  const in30 = RENEWALS.filter(r => r.daysRemaining > 7 && r.daysRemaining <= 30);
  const in90 = RENEWALS.filter(r => r.daysRemaining > 30 && r.daysRemaining <= 90);
  const expiryTrend = [{
    month: "Jan",
    expired: 1,
    expiring: 3
  }, {
    month: "Feb",
    expired: 2,
    expiring: 4
  }, {
    month: "Mar",
    expired: 0,
    expiring: 6
  }, {
    month: "Apr",
    expired: 1,
    expiring: 5
  }, {
    month: "May",
    expired: 3,
    expiring: 8
  }, {
    month: "Jun",
    expired: 2,
    expiring: 7
  }, {
    month: "Jul",
    expired: 1,
    expiring: 4
  }, {
    month: "Aug",
    expired: 0,
    expiring: 5
  }];
  const ExpiryGroup = ({
    title,
    contracts,
    badgeVariant,
    borderColor,
    countColor
  }) => /*#__PURE__*/_jsxs(Card, {
    children: [/*#__PURE__*/_jsxs("div", {
      className: `flex items-center justify-between px-5 py-3.5 border-b border-border border-l-4 ${borderColor} rounded-t-lg`,
      children: [/*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("p", {
          className: "text-xs font-bold text-foreground uppercase tracking-wide",
          children: title
        }), /*#__PURE__*/_jsxs("p", {
          className: "text-xs text-muted-foreground",
          children: [contracts.length, " contract", contracts.length !== 1 ? "s" : ""]
        })]
      }), /*#__PURE__*/_jsx("span", {
        className: `text-2xl font-bold font-mono ${countColor}`,
        children: contracts.length
      })]
    }), /*#__PURE__*/_jsx("div", {
      className: "divide-y divide-border",
      children: contracts.length === 0 ? /*#__PURE__*/_jsx("p", {
        className: "px-5 py-4 text-xs text-muted-foreground text-center",
        children: "No contracts in this window"
      }) : contracts.map(r => /*#__PURE__*/_jsxs("div", {
        className: "flex items-center gap-3 px-5 py-3 hover:bg-muted/50 transition-colors",
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex-1 min-w-0",
          children: [/*#__PURE__*/_jsx("p", {
            className: "text-xs font-semibold text-foreground truncate",
            children: r.name
          }), /*#__PURE__*/_jsxs("p", {
            className: "text-xs text-muted-foreground",
            children: [r.owner, " · ", r.dept]
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "text-right flex-shrink-0 space-y-1",
          children: [/*#__PURE__*/_jsx(CountdownTimer, {
            days: r.daysRemaining
          }), renewalStatusBadge(r.status)]
        })]
      }, r.id))
    })]
  });
  const highRisk = RENEWALS.filter(r => (r.priority === "Critical" || r.priority === "High") && r.daysRemaining < 90).sort((a, b) => a.daysRemaining - b.daysRemaining);
  return /*#__PURE__*/_jsxs("div", {
    className: "p-6 space-y-5 max-w-screen-xl",
    children: [/*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-2 lg:grid-cols-4 gap-4",
      children: [/*#__PURE__*/_jsx(MetricCard, {
        title: "Expiring in 7 Days",
        value: String(in7.length),
        delta: "Immediate action",
        icon: AlertTriangle,
        iconBg: "bg-red-500"
      }), /*#__PURE__*/_jsx(MetricCard, {
        title: "Expiring in 30 Days",
        value: String(in30.length),
        delta: "Urgent review needed",
        icon: CalendarClock,
        iconBg: "bg-orange-500"
      }), /*#__PURE__*/_jsx(MetricCard, {
        title: "Expiring in 90 Days",
        value: String(in90.length),
        delta: "Plan ahead",
        icon: CalendarDays,
        iconBg: "bg-amber-500"
      }), /*#__PURE__*/_jsx(MetricCard, {
        title: "Recently Expired",
        value: String(expired.length),
        delta: "Requires resolution",
        icon: CalendarX,
        iconBg: "bg-red-700"
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-1 lg:grid-cols-2 gap-5",
      children: [/*#__PURE__*/_jsxs(Card, {
        className: "p-5",
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex items-center justify-between mb-4",
          children: [/*#__PURE__*/_jsx(SectionLabel, {
            children: "Expiry Trend — 2024"
          }), /*#__PURE__*/_jsx(Badge, {
            variant: "info",
            children: "Monthly"
          })]
        }), /*#__PURE__*/_jsx(ResponsiveContainer, {
          width: "100%",
          height: 200,
          children: /*#__PURE__*/_jsxs(LineChart, {
            data: expiryTrend,
            children: [/*#__PURE__*/_jsx(CartesianGrid, {
              strokeDasharray: "3 3",
              stroke: "#E2E8F0",
              vertical: false
            }), /*#__PURE__*/_jsx(XAxis, {
              dataKey: "month",
              tick: {
                fontSize: 11,
                fill: "#64748B"
              },
              axisLine: false,
              tickLine: false
            }), /*#__PURE__*/_jsx(YAxis, {
              tick: {
                fontSize: 11,
                fill: "#64748B"
              },
              axisLine: false,
              tickLine: false
            }), /*#__PURE__*/_jsx(Tooltip, {
              contentStyle: {
                fontSize: 11,
                borderRadius: 6
              }
            }), /*#__PURE__*/_jsx(Legend, {
              iconType: "circle",
              iconSize: 7,
              wrapperStyle: {
                fontSize: 11
              }
            }), /*#__PURE__*/_jsx(Line, {
              dataKey: "expiring",
              name: "Expiring",
              stroke: "#F59E0B",
              strokeWidth: 2,
              dot: {
                r: 3
              }
            }), /*#__PURE__*/_jsx(Line, {
              dataKey: "expired",
              name: "Expired",
              stroke: "#EF4444",
              strokeWidth: 2,
              dot: {
                r: 3
              }
            })]
          })
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        className: "p-5",
        children: [/*#__PURE__*/_jsx(SectionLabel, {
          children: "High-Risk Expiring Contracts"
        }), /*#__PURE__*/_jsx("div", {
          className: "space-y-2.5",
          children: highRisk.length === 0 ? /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground text-center py-4",
            children: "No high-risk contracts expiring soon"
          }) : highRisk.map(r => /*#__PURE__*/_jsxs("div", {
            className: "flex items-center gap-3 p-3 bg-muted rounded-lg hover:bg-red-50 transition-colors border border-transparent hover:border-red-100",
            children: [/*#__PURE__*/_jsx("div", {
              className: `w-2 h-2 rounded-full flex-shrink-0 ${r.daysRemaining < 0 ? "bg-red-600" : r.daysRemaining <= 30 ? "bg-orange-500" : "bg-amber-500"}`
            }), /*#__PURE__*/_jsxs("div", {
              className: "flex-1 min-w-0",
              children: [/*#__PURE__*/_jsx("p", {
                className: "text-xs font-semibold text-foreground truncate",
                children: r.name
              }), /*#__PURE__*/_jsxs("p", {
                className: "text-xs text-muted-foreground",
                children: [r.dept, " · ", r.owner]
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "flex-shrink-0 text-right space-y-1",
              children: [priorityBadge(r.priority), /*#__PURE__*/_jsx("div", {
                className: "text-right",
                children: /*#__PURE__*/_jsx(CountdownTimer, {
                  days: r.daysRemaining
                })
              })]
            })]
          }, r.id))
        })]
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-5",
      children: [/*#__PURE__*/_jsx(ExpiryGroup, {
        title: "Expiring in 7 Days",
        contracts: in7,
        badgeVariant: "danger",
        borderColor: "border-l-red-500",
        countColor: "text-red-600"
      }), /*#__PURE__*/_jsx(ExpiryGroup, {
        title: "Expiring in 30 Days",
        contracts: in30,
        badgeVariant: "orange",
        borderColor: "border-l-orange-500",
        countColor: "text-orange-600"
      }), /*#__PURE__*/_jsx(ExpiryGroup, {
        title: "Expiring in 90 Days",
        contracts: in90,
        badgeVariant: "warning",
        borderColor: "border-l-amber-500",
        countColor: "text-amber-600"
      }), /*#__PURE__*/_jsx(ExpiryGroup, {
        title: "Recently Expired",
        contracts: expired,
        badgeVariant: "danger",
        borderColor: "border-l-red-700",
        countColor: "text-red-700"
      })]
    })]
  });
}

// ── Renewal Reminders ──────────────────────────────────────────────────────
function RenewalReminders() {
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [inAppEnabled, setInAppEnabled] = useState(true);
  const [toast, setToast] = useState(null);
  const showToast = msg => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };
  const Toggle = ({
    enabled,
    onToggle
  }) => /*#__PURE__*/_jsx("button", {
    onClick: onToggle,
    className: `relative w-9 h-5 rounded-full transition-colors flex-shrink-0 ${enabled ? "bg-primary" : "bg-slate-300"}`,
    children: /*#__PURE__*/_jsx("div", {
      className: `absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${enabled ? "left-4" : "left-0.5"}`
    })
  });
  const timelineItems = [{
    day: "90 days",
    label: "Initial advance notice",
    channels: ["Email"],
    color: "bg-blue-500"
  }, {
    day: "60 days",
    label: "Follow-up reminder",
    channels: ["Email", "In-App"],
    color: "bg-blue-500"
  }, {
    day: "30 days",
    label: "Critical alert + manager escalation",
    channels: ["Email", "SMS", "In-App"],
    color: "bg-amber-500"
  }, {
    day: "14 days",
    label: "Weekly digest reminder",
    channels: ["Email", "In-App"],
    color: "bg-orange-500"
  }, {
    day: "7 days",
    label: "Daily final warnings",
    channels: ["Email", "SMS", "In-App"],
    color: "bg-red-500"
  }, {
    day: "Day 0",
    label: "Expiry-day all-stakeholder alert",
    channels: ["Email", "SMS", "In-App"],
    color: "bg-red-700"
  }, {
    day: "+3 days",
    label: "Post-expiry follow-up",
    channels: ["Email", "In-App"],
    color: "bg-slate-500"
  }];
  const sampleMessages = [{
    subject: "Contract Renewal Reminder — 30 Days",
    body: "Dear Lisa Torres, this is a reminder that the Commercial Lease — HQ Tower A is due for renewal on May 31, 2024 (30 days from today). Please initiate the renewal process in ContractIQ to avoid service disruption. Review details →",
    type: "Email",
    urgency: "warning"
  }, {
    subject: "URGENT: Contract Expires in 7 Days",
    body: "⚠️ URGENT: Commercial Lease — HQ Tower A expires in 7 days (May 31, 2024). Immediate action required. Log in to ContractIQ to process renewal.",
    type: "SMS",
    urgency: "danger"
  }, {
    subject: "Renewal Approved — Action Needed",
    body: "Your renewal request for APAC Distribution Agreement has been approved by Legal. Please proceed to the Compliance review stage in ContractIQ.",
    type: "In-App",
    urgency: "info"
  }];
  return /*#__PURE__*/_jsxs("div", {
    className: "p-6 space-y-5 max-w-screen-xl relative",
    children: [toast && /*#__PURE__*/_jsxs("div", {
      className: "fixed top-4 right-4 z-50 bg-foreground text-background text-xs font-medium px-4 py-3 rounded-lg shadow-lg flex items-center gap-2",
      children: [/*#__PURE__*/_jsx(CheckCircle2, {
        size: 14,
        className: "text-emerald-400"
      }), " ", toast]
    }), /*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-1 lg:grid-cols-3 gap-5",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "col-span-1 lg:col-span-2 space-y-4",
        children: [/*#__PURE__*/_jsxs(Card, {
          children: [/*#__PURE__*/_jsxs("div", {
            className: "flex items-center justify-between px-5 py-3.5 border-b border-border",
            children: [/*#__PURE__*/_jsx(SectionLabel, {
              children: "Reminder Templates"
            }), /*#__PURE__*/_jsxs("button", {
              onClick: () => showToast("New template dialog opened"),
              className: "flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors",
              children: [/*#__PURE__*/_jsx(Plus, {
                size: 12
              }), " Add Template"]
            })]
          }), /*#__PURE__*/_jsx("div", {
            className: "divide-y divide-border",
            children: REMINDER_TEMPLATES.map(tpl => /*#__PURE__*/_jsxs("div", {
              className: "px-5 py-3.5 flex items-center gap-4 hover:bg-muted/50 transition-colors",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "flex-1 min-w-0",
                children: [/*#__PURE__*/_jsxs("div", {
                  className: "flex items-center gap-2 mb-0.5",
                  children: [/*#__PURE__*/_jsx("p", {
                    className: "text-xs font-semibold text-foreground",
                    children: tpl.name
                  }), /*#__PURE__*/_jsx(Badge, {
                    variant: tpl.active ? "success" : "neutral",
                    children: tpl.active ? "Active" : "Disabled"
                  })]
                }), /*#__PURE__*/_jsxs("p", {
                  className: "text-xs text-muted-foreground",
                  children: ["Trigger: ", tpl.trigger, " · Frequency: ", tpl.frequency]
                }), /*#__PURE__*/_jsxs("div", {
                  className: "flex items-center gap-2 mt-1.5 flex-wrap",
                  children: [tpl.channels.map(ch => /*#__PURE__*/_jsx("span", {
                    className: "text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded font-medium",
                    children: ch
                  }, ch)), /*#__PURE__*/_jsxs("span", {
                    className: "text-xs text-muted-foreground",
                    children: ["→ ", tpl.recipients]
                  })]
                })]
              }), /*#__PURE__*/_jsxs("div", {
                className: "text-right flex-shrink-0",
                children: [/*#__PURE__*/_jsxs("p", {
                  className: "text-xs text-muted-foreground mb-2",
                  children: ["Last sent: ", tpl.lastSent]
                }), /*#__PURE__*/_jsxs("div", {
                  className: "flex items-center gap-2",
                  children: [/*#__PURE__*/_jsx("button", {
                    onClick: () => showToast(`Editing ${tpl.name}`),
                    className: "text-muted-foreground hover:text-foreground transition-colors",
                    children: /*#__PURE__*/_jsx(Edit, {
                      size: 13
                    })
                  }), /*#__PURE__*/_jsx("button", {
                    onClick: () => showToast(`${tpl.name} deleted`),
                    className: "text-muted-foreground hover:text-red-500 transition-colors",
                    children: /*#__PURE__*/_jsx(Trash2, {
                      size: 13
                    })
                  }), /*#__PURE__*/_jsx("button", {
                    onClick: () => showToast(`${tpl.name} duplicated`),
                    className: "text-muted-foreground hover:text-blue-600 transition-colors",
                    children: /*#__PURE__*/_jsx(Copy, {
                      size: 13
                    })
                  })]
                })]
              })]
            }, tpl.id))
          })]
        }), /*#__PURE__*/_jsxs(Card, {
          className: "p-5",
          children: [/*#__PURE__*/_jsx(SectionLabel, {
            children: "Sample Reminder Messages"
          }), /*#__PURE__*/_jsx("div", {
            className: "space-y-3",
            children: sampleMessages.map((msg, i) => /*#__PURE__*/_jsxs("div", {
              className: "border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "flex items-start justify-between gap-3 mb-2",
                children: [/*#__PURE__*/_jsx("p", {
                  className: "text-xs font-semibold text-foreground",
                  children: msg.subject
                }), /*#__PURE__*/_jsxs("div", {
                  className: "flex items-center gap-2 flex-shrink-0",
                  children: [/*#__PURE__*/_jsx(Badge, {
                    variant: msg.urgency,
                    children: msg.urgency === "warning" ? "Upcoming" : msg.urgency === "danger" ? "Urgent" : "Info"
                  }), /*#__PURE__*/_jsx("span", {
                    className: "text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded font-medium",
                    children: msg.type
                  })]
                })]
              }), /*#__PURE__*/_jsx("p", {
                className: "text-xs text-muted-foreground leading-relaxed",
                children: msg.body
              })]
            }, i))
          })]
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "space-y-4",
        children: [/*#__PURE__*/_jsxs(Card, {
          className: "p-5",
          children: [/*#__PURE__*/_jsx(SectionLabel, {
            children: "Notification Channels"
          }), /*#__PURE__*/_jsx("div", {
            className: "space-y-4",
            children: [{
              label: "Email Reminders",
              desc: "Send via SMTP to contract owners",
              enabled: emailEnabled,
              toggle: () => setEmailEnabled(s => !s),
              icon: Mail
            }, {
              label: "SMS Reminders",
              desc: "Text alerts for urgent renewals",
              enabled: smsEnabled,
              toggle: () => setSmsEnabled(s => !s),
              icon: Phone
            }, {
              label: "In-App Notifications",
              desc: "ContractIQ platform alerts",
              enabled: inAppEnabled,
              toggle: () => setInAppEnabled(s => !s),
              icon: Bell
            }].map(({
              label,
              desc,
              enabled,
              toggle,
              icon: Icon
            }) => /*#__PURE__*/_jsxs("div", {
              className: "flex items-center gap-3 py-2",
              children: [/*#__PURE__*/_jsx("div", {
                className: "w-8 h-8 bg-muted rounded-lg flex items-center justify-center flex-shrink-0",
                children: /*#__PURE__*/_jsx(Icon, {
                  size: 14,
                  className: "text-muted-foreground"
                })
              }), /*#__PURE__*/_jsxs("div", {
                className: "flex-1",
                children: [/*#__PURE__*/_jsx("p", {
                  className: "text-xs font-semibold text-foreground",
                  children: label
                }), /*#__PURE__*/_jsx("p", {
                  className: "text-xs text-muted-foreground",
                  children: desc
                })]
              }), /*#__PURE__*/_jsx(Toggle, {
                enabled: enabled,
                onToggle: toggle
              })]
            }, label))
          }), /*#__PURE__*/_jsxs("div", {
            className: "mt-4 pt-4 border-t border-border",
            children: [/*#__PURE__*/_jsx("label", {
              className: "block text-xs font-semibold text-foreground mb-2 uppercase tracking-wide",
              children: "Default Frequency"
            }), /*#__PURE__*/_jsxs("select", {
              className: "w-full px-3 py-2 bg-input-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20",
              children: [/*#__PURE__*/_jsx("option", {
                children: "Weekly digest"
              }), /*#__PURE__*/_jsx("option", {
                children: "Daily (urgent only)"
              }), /*#__PURE__*/_jsx("option", {
                children: "Per trigger event"
              })]
            })]
          })]
        }), /*#__PURE__*/_jsxs(Card, {
          className: "p-5",
          children: [/*#__PURE__*/_jsx(SectionLabel, {
            children: "Reminder Schedule Timeline"
          }), /*#__PURE__*/_jsx("div", {
            className: "relative",
            children: timelineItems.map((item, i) => /*#__PURE__*/_jsxs("div", {
              className: "flex gap-3 relative",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "flex flex-col items-center",
                children: [/*#__PURE__*/_jsx("div", {
                  className: `w-3 h-3 rounded-full flex-shrink-0 mt-0.5 ${item.color}`
                }), i < timelineItems.length - 1 && /*#__PURE__*/_jsx("div", {
                  className: "w-px flex-1 bg-border my-0.5",
                  style: {
                    minHeight: 28
                  }
                })]
              }), /*#__PURE__*/_jsxs("div", {
                className: "pb-3 flex-1 min-w-0",
                children: [/*#__PURE__*/_jsx("p", {
                  className: "text-xs font-mono font-bold text-foreground",
                  children: item.day
                }), /*#__PURE__*/_jsx("p", {
                  className: "text-xs text-muted-foreground leading-snug",
                  children: item.label
                }), /*#__PURE__*/_jsx("div", {
                  className: "flex gap-1 mt-1 flex-wrap",
                  children: item.channels.map(ch => /*#__PURE__*/_jsx("span", {
                    className: "text-xs px-1.5 py-0.5 bg-muted rounded text-muted-foreground",
                    children: ch
                  }, ch))
                })]
              })]
            }, i))
          })]
        })]
      })]
    })]
  });
}

// ── Renewal Approval Workflow ──────────────────────────────────────────────
function RenewalApprovalWorkflow() {
  const [comment, setComment] = useState("");
  const [toast, setToast] = useState(null);
  const showToast = msg => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };
  const currentStepIndex = APPROVAL_STEPS.findIndex(s => s.status === "current");
  const currentStep = APPROVAL_STEPS[currentStepIndex];
  return /*#__PURE__*/_jsxs("div", {
    className: "p-6 space-y-5 max-w-screen-xl relative",
    children: [toast && /*#__PURE__*/_jsxs("div", {
      className: "fixed top-4 right-4 z-50 bg-foreground text-background text-xs font-medium px-4 py-3 rounded-lg shadow-lg flex items-center gap-2",
      children: [/*#__PURE__*/_jsx(CheckCircle2, {
        size: 14,
        className: "text-emerald-400"
      }), " ", toast]
    }), /*#__PURE__*/_jsxs(Card, {
      className: "p-5",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "flex items-start gap-4 flex-wrap mb-5",
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex-1 min-w-0",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "flex items-center gap-2 flex-wrap mb-1",
            children: [/*#__PURE__*/_jsx("h3", {
              className: "text-base font-bold text-foreground",
              children: "Commercial Lease — HQ Tower A"
            }), /*#__PURE__*/_jsx(Badge, {
              variant: "orange",
              children: "Due Soon"
            }), /*#__PURE__*/_jsx(Badge, {
              variant: "neutral",
              children: "RNW-001"
            })]
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Renewal request submitted May 20, 2024 · Metropolitan REIT Corp. · 2-year extension"
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "flex gap-2 flex-shrink-0",
          children: [/*#__PURE__*/_jsxs("button", {
            onClick: () => showToast("Approval confirmed — notifying reviewers"),
            className: "flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 transition-colors",
            children: [/*#__PURE__*/_jsx(ThumbsUp, {
              size: 13
            }), " Approve"]
          }), /*#__PURE__*/_jsxs("button", {
            onClick: () => showToast("Renewal request returned for revision"),
            className: "flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg text-xs font-semibold hover:bg-red-600 transition-colors",
            children: [/*#__PURE__*/_jsx(ThumbsDown, {
              size: 13
            }), " Reject"]
          })]
        })]
      }), /*#__PURE__*/_jsx("div", {
        className: "flex items-center gap-0 mb-6 overflow-x-auto",
        children: APPROVAL_STEPS.map((step, i) => /*#__PURE__*/_jsxs("div", {
          className: "flex items-center flex-shrink-0",
          children: [/*#__PURE__*/_jsxs("div", {
            className: `flex flex-col items-center text-center w-28 ${step.status === "pending" ? "opacity-40" : ""}`,
            children: [/*#__PURE__*/_jsx("div", {
              className: `w-8 h-8 rounded-full flex items-center justify-center mb-1.5 border-2 transition-all ${step.status === "completed" ? "bg-emerald-500 border-emerald-500" : step.status === "current" ? "bg-blue-600 border-blue-600 ring-4 ring-blue-100" : "bg-background border-border"}`,
              children: step.status === "completed" ? /*#__PURE__*/_jsx(CheckCircle2, {
                size: 14,
                className: "text-white"
              }) : step.status === "current" ? /*#__PURE__*/_jsx("div", {
                className: "w-2 h-2 bg-white rounded-full"
              }) : /*#__PURE__*/_jsx("span", {
                className: "text-xs text-muted-foreground font-bold",
                children: i + 1
              })
            }), /*#__PURE__*/_jsx("p", {
              className: "text-xs font-semibold text-foreground leading-tight",
              children: step.step
            }), /*#__PURE__*/_jsx("p", {
              className: "text-xs text-muted-foreground mt-0.5 leading-tight",
              children: step.person
            }), step.date !== "Pending" && /*#__PURE__*/_jsx("p", {
              className: "text-xs font-mono text-muted-foreground mt-0.5",
              children: step.date
            })]
          }), i < APPROVAL_STEPS.length - 1 && /*#__PURE__*/_jsx("div", {
            className: `flex-1 h-0.5 w-8 mx-1 flex-shrink-0 ${i < currentStepIndex ? "bg-emerald-400" : "bg-border"}`
          })]
        }, step.id))
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-1 lg:grid-cols-3 gap-5",
      children: [/*#__PURE__*/_jsx("div", {
        className: "col-span-1 lg:col-span-2 space-y-4",
        children: /*#__PURE__*/_jsxs(Card, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "px-5 py-3.5 border-b border-border",
            children: /*#__PURE__*/_jsx(SectionLabel, {
              children: "Approval History & Comments"
            })
          }), /*#__PURE__*/_jsx("div", {
            className: "divide-y divide-border",
            children: APPROVAL_STEPS.filter(s => s.status !== "pending").map(step => /*#__PURE__*/_jsx("div", {
              className: "px-5 py-4",
              children: /*#__PURE__*/_jsxs("div", {
                className: "flex items-start gap-3",
                children: [/*#__PURE__*/_jsx(Av, {
                  initials: step.initials,
                  size: "sm"
                }), /*#__PURE__*/_jsxs("div", {
                  className: "flex-1",
                  children: [/*#__PURE__*/_jsxs("div", {
                    className: "flex items-center gap-2 mb-1 flex-wrap",
                    children: [/*#__PURE__*/_jsx("span", {
                      className: "text-xs font-semibold text-foreground",
                      children: step.person
                    }), /*#__PURE__*/_jsx(Badge, {
                      variant: "neutral",
                      children: step.role
                    }), step.status === "completed" && /*#__PURE__*/_jsx(Badge, {
                      variant: "success",
                      children: "Approved"
                    }), step.status === "current" && /*#__PURE__*/_jsx(Badge, {
                      variant: "info",
                      children: "In Review"
                    }), /*#__PURE__*/_jsx("span", {
                      className: "text-xs text-muted-foreground font-mono ml-auto",
                      children: step.date
                    })]
                  }), /*#__PURE__*/_jsx("p", {
                    className: "text-xs font-semibold text-muted-foreground mb-1",
                    children: step.step
                  }), step.comments && /*#__PURE__*/_jsx("p", {
                    className: "text-xs text-foreground leading-relaxed bg-muted rounded-lg p-2.5",
                    children: step.comments
                  }), !step.comments && step.status === "current" && /*#__PURE__*/_jsx("p", {
                    className: "text-xs text-muted-foreground italic",
                    children: "Review in progress — awaiting decision."
                  })]
                })]
              })
            }, step.id))
          }), /*#__PURE__*/_jsxs("div", {
            className: "px-5 py-4 border-t border-border bg-muted/30",
            children: [/*#__PURE__*/_jsx("p", {
              className: "text-xs font-semibold text-foreground mb-2",
              children: "Add Comment"
            }), /*#__PURE__*/_jsx("textarea", {
              value: comment,
              onChange: e => setComment(e.target.value),
              placeholder: "Enter your review comments or decision notes…",
              rows: 3,
              className: "w-full px-3 py-2 bg-card border border-border rounded-lg text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
            }), /*#__PURE__*/_jsx("div", {
              className: "flex justify-end mt-2",
              children: /*#__PURE__*/_jsxs("button", {
                onClick: () => {
                  if (comment.trim()) {
                    showToast("Comment added");
                    setComment("");
                  }
                },
                className: "flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors",
                children: [/*#__PURE__*/_jsx(MessageSquare, {
                  size: 12
                }), " Post Comment"]
              })
            })]
          })]
        })
      }), /*#__PURE__*/_jsxs("div", {
        className: "space-y-4",
        children: [/*#__PURE__*/_jsxs(Card, {
          className: "p-5",
          children: [/*#__PURE__*/_jsx(SectionLabel, {
            children: "Current Stage"
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex items-center gap-3 p-3 bg-blue-50 border border-blue-100 rounded-lg mb-4",
            children: [/*#__PURE__*/_jsx("div", {
              className: "w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0",
              children: /*#__PURE__*/_jsx(Av, {
                initials: currentStep.initials,
                size: "sm"
              })
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx("p", {
                className: "text-xs font-bold text-blue-900",
                children: currentStep.step
              }), /*#__PURE__*/_jsx("p", {
                className: "text-xs text-blue-700",
                children: currentStep.person
              }), /*#__PURE__*/_jsx("p", {
                className: "text-xs text-blue-600 font-mono",
                children: currentStep.role
              })]
            })]
          }), /*#__PURE__*/_jsx("div", {
            className: "space-y-2 text-xs",
            children: [{
              label: "Stage",
              value: `${currentStepIndex + 1} of ${APPROVAL_STEPS.length}`
            }, {
              label: "Submitted",
              value: "May 20, 2024"
            }, {
              label: "SLA Deadline",
              value: "Jun 5, 2024"
            }, {
              label: "Days in Stage",
              value: "6 days"
            }].map(({
              label,
              value
            }) => /*#__PURE__*/_jsxs("div", {
              className: "flex justify-between",
              children: [/*#__PURE__*/_jsx("span", {
                className: "text-muted-foreground",
                children: label
              }), /*#__PURE__*/_jsx("span", {
                className: "font-semibold text-foreground font-mono",
                children: value
              })]
            }, label))
          })]
        }), /*#__PURE__*/_jsxs(Card, {
          className: "p-5",
          children: [/*#__PURE__*/_jsx(SectionLabel, {
            children: "Renewal Summary"
          }), /*#__PURE__*/_jsx("div", {
            className: "space-y-2.5 text-xs",
            children: [{
              label: "Contract Value",
              value: "$1,800,000/yr"
            }, {
              label: "Current Expiry",
              value: "May 31, 2024"
            }, {
              label: "Proposed Extension",
              value: "2 years"
            }, {
              label: "New Expiry",
              value: "May 31, 2026"
            }, {
              label: "Rate Change",
              value: "+3% annually"
            }, {
              label: "Auto-Renew",
              value: "Yes — 60d notice"
            }].map(({
              label,
              value
            }) => /*#__PURE__*/_jsxs("div", {
              className: "flex justify-between border-b border-border pb-2 last:border-0 last:pb-0",
              children: [/*#__PURE__*/_jsx("span", {
                className: "text-muted-foreground",
                children: label
              }), /*#__PURE__*/_jsx("span", {
                className: "font-semibold text-foreground",
                children: value
              })]
            }, label))
          })]
        })]
      })]
    })]
  });
}

// ── Renewal History ────────────────────────────────────────────────────────
function RenewalHistory() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sort, setSort] = useState("newest");
  const [toast, setToast] = useState(null);
  const showToast = msg => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };
  const filtered = RENEWAL_HISTORY.filter(r => {
    const q = search.toLowerCase();
    return (r.contractName.toLowerCase().includes(q) || r.approvedBy.toLowerCase().includes(q)) && (statusFilter === "All" || r.status === statusFilter);
  }).sort((a, b) => sort === "newest" ? b.id.localeCompare(a.id) : a.id.localeCompare(b.id));
  return /*#__PURE__*/_jsxs("div", {
    className: "p-6 space-y-4 max-w-screen-xl relative",
    children: [toast && /*#__PURE__*/_jsxs("div", {
      className: "fixed top-4 right-4 z-50 bg-foreground text-background text-xs font-medium px-4 py-3 rounded-lg shadow-lg flex items-center gap-2",
      children: [/*#__PURE__*/_jsx(CheckCircle2, {
        size: 14,
        className: "text-emerald-400"
      }), " ", toast]
    }), /*#__PURE__*/_jsxs("div", {
      className: "flex items-center gap-3 flex-wrap",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "relative flex-1 min-w-48 max-w-sm",
        children: [/*#__PURE__*/_jsx(Search, {
          size: 13,
          className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        }), /*#__PURE__*/_jsx("input", {
          type: "text",
          placeholder: "Search by contract or approver…",
          value: search,
          onChange: e => setSearch(e.target.value),
          className: "w-full pl-8 pr-3 py-2 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        })]
      }), /*#__PURE__*/_jsx("select", {
        value: statusFilter,
        onChange: e => setStatusFilter(e.target.value),
        className: "px-3 py-2 border border-border rounded-lg text-xs bg-card text-foreground focus:outline-none",
        children: ["All", "Renewed", "Expired", "Cancelled"].map(s => /*#__PURE__*/_jsx("option", {
          children: s
        }, s))
      }), /*#__PURE__*/_jsxs("select", {
        value: sort,
        onChange: e => setSort(e.target.value),
        className: "px-3 py-2 border border-border rounded-lg text-xs bg-card text-foreground focus:outline-none",
        children: [/*#__PURE__*/_jsx("option", {
          value: "newest",
          children: "Newest First"
        }), /*#__PURE__*/_jsx("option", {
          value: "oldest",
          children: "Oldest First"
        })]
      }), /*#__PURE__*/_jsx("div", {
        className: "ml-auto",
        children: /*#__PURE__*/_jsxs("button", {
          onClick: () => showToast("History exported to CSV"),
          className: "flex items-center gap-1.5 px-3 py-2 border border-border rounded-lg text-xs text-foreground hover:bg-muted transition-colors",
          children: [/*#__PURE__*/_jsx(Download, {
            size: 13
          }), " Export"]
        })
      })]
    }), /*#__PURE__*/_jsxs(Card, {
      children: [/*#__PURE__*/_jsxs("div", {
        className: "overflow-x-auto",
        children: [/*#__PURE__*/_jsxs("table", {
          className: "w-full text-xs",
          children: [/*#__PURE__*/_jsx("thead", {
            children: /*#__PURE__*/_jsx("tr", {
              className: "border-b border-border bg-muted",
              children: ["ID", "Contract Name", "Version", "Renewal Date", "Duration", "Approved By", "Status", "Notes", "Actions"].map(h => /*#__PURE__*/_jsx("th", {
                className: "text-left px-4 py-3 text-muted-foreground font-semibold uppercase tracking-wide whitespace-nowrap",
                children: h
              }, h))
            })
          }), /*#__PURE__*/_jsx("tbody", {
            className: "divide-y divide-border",
            children: filtered.map(r => /*#__PURE__*/_jsxs("tr", {
              className: "hover:bg-muted/50 transition-colors group",
              children: [/*#__PURE__*/_jsx("td", {
                className: "px-4 py-3 font-mono text-muted-foreground",
                children: r.id
              }), /*#__PURE__*/_jsx("td", {
                className: "px-4 py-3 max-w-[200px]",
                children: /*#__PURE__*/_jsx("p", {
                  className: "font-semibold text-foreground group-hover:text-blue-600 transition-colors truncate",
                  children: r.contractName
                })
              }), /*#__PURE__*/_jsx("td", {
                className: "px-4 py-3",
                children: /*#__PURE__*/_jsx(Badge, {
                  variant: "neutral",
                  children: r.version
                })
              }), /*#__PURE__*/_jsx("td", {
                className: "px-4 py-3 font-mono text-muted-foreground whitespace-nowrap",
                children: r.renewalDate
              }), /*#__PURE__*/_jsx("td", {
                className: "px-4 py-3 text-muted-foreground whitespace-nowrap",
                children: r.duration
              }), /*#__PURE__*/_jsx("td", {
                className: "px-4 py-3 text-foreground whitespace-nowrap",
                children: r.approvedBy
              }), /*#__PURE__*/_jsx("td", {
                className: "px-4 py-3",
                children: renewalStatusBadge(r.status)
              }), /*#__PURE__*/_jsx("td", {
                className: "px-4 py-3 max-w-[200px]",
                children: /*#__PURE__*/_jsx("p", {
                  className: "text-muted-foreground truncate",
                  children: r.notes
                })
              }), /*#__PURE__*/_jsx("td", {
                className: "px-4 py-3",
                children: /*#__PURE__*/_jsxs("div", {
                  className: "flex items-center gap-2",
                  children: [/*#__PURE__*/_jsx("button", {
                    onClick: () => showToast(`Viewing ${r.contractName}`),
                    className: "text-muted-foreground hover:text-blue-600 transition-colors",
                    children: /*#__PURE__*/_jsx(Eye, {
                      size: 13
                    })
                  }), /*#__PURE__*/_jsx("button", {
                    onClick: () => showToast(`Downloading renewal document`),
                    className: "text-muted-foreground hover:text-foreground transition-colors",
                    children: /*#__PURE__*/_jsx(Download, {
                      size: 13
                    })
                  })]
                })
              })]
            }, r.id))
          })]
        }), filtered.length === 0 && /*#__PURE__*/_jsx("div", {
          className: "text-center py-12 text-sm text-muted-foreground",
          children: "No records match your search."
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "px-5 py-3 border-t border-border flex items-center justify-between",
        children: [/*#__PURE__*/_jsxs("p", {
          className: "text-xs text-muted-foreground",
          children: ["Showing ", filtered.length, " of ", RENEWAL_HISTORY.length, " records"]
        }), /*#__PURE__*/_jsx("div", {
          className: "flex items-center gap-1",
          children: [1].map(p => /*#__PURE__*/_jsx("button", {
            className: "w-7 h-7 text-xs rounded bg-primary text-primary-foreground",
            children: p
          }, p))
        })]
      })]
    }), /*#__PURE__*/_jsx("div", {
      className: "grid grid-cols-3 gap-4",
      children: [{
        label: "Total Renewals Processed",
        value: RENEWAL_HISTORY.length,
        icon: Hash,
        color: "bg-blue-600"
      }, {
        label: "Successfully Renewed",
        value: RENEWAL_HISTORY.filter(r => r.status === "Renewed").length,
        icon: CheckCircle2,
        color: "bg-emerald-600"
      }, {
        label: "Expired / Not Renewed",
        value: RENEWAL_HISTORY.filter(r => r.status === "Expired").length,
        icon: XCircle,
        color: "bg-red-500"
      }].map(item => /*#__PURE__*/_jsxs("div", {
        className: "bg-card border border-border rounded-lg p-4 flex items-center gap-3",
        children: [/*#__PURE__*/_jsx("div", {
          className: `w-9 h-9 rounded-lg ${item.color} flex items-center justify-center flex-shrink-0`,
          children: /*#__PURE__*/_jsx(item.icon, {
            size: 15,
            className: "text-white"
          })
        }), /*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx("p", {
            className: "text-xl font-bold font-mono text-foreground",
            children: item.value
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: item.label
          })]
        })]
      }, item.label))
    })]
  });
}

// ── Renewal Status Overview ────────────────────────────────────────────────
function RenewalStatusOverview({
  onNavigate
}) {
  const statusGroups = [{
    status: "Upcoming",
    count: RENEWALS.filter(r => r.status === "Upcoming").length,
    color: "#F59E0B",
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
    icon: CalendarClock,
    desc: "Scheduled for renewal within 12 months",
    action: "renewal-tracking"
  }, {
    status: "In Progress",
    count: RENEWALS.filter(r => r.status === "In Progress").length,
    color: "#3B82F6",
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
    icon: RotateCcw,
    desc: "Renewal workflow currently active",
    action: "renewal-approval"
  }, {
    status: "Renewed",
    count: RENEWALS.filter(r => r.status === "Renewed").length,
    color: "#10B981",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-700",
    icon: CheckCircle2,
    desc: "Successfully renewed contracts",
    action: "renewal-history"
  }, {
    status: "Expired",
    count: RENEWALS.filter(r => r.status === "Expired").length,
    color: "#EF4444",
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-700",
    icon: CalendarX,
    desc: "Expired without renewal — action needed",
    action: "expiry-monitoring"
  }, {
    status: "Due Soon",
    count: RENEWALS.filter(r => r.status === "Due Soon").length,
    color: "#F97316",
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-700",
    icon: Hourglass,
    desc: "Renewal due within 30 days",
    action: "expiry-monitoring"
  }];
  const totalContracts = RENEWALS.length;
  return /*#__PURE__*/_jsxs("div", {
    className: "p-6 space-y-5 max-w-screen-xl",
    children: [/*#__PURE__*/_jsx("div", {
      className: "grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4",
      children: statusGroups.map(g => /*#__PURE__*/_jsxs("button", {
        onClick: () => onNavigate(g.action),
        className: `bg-card border ${g.border} rounded-lg p-4 text-left hover:shadow-md transition-all group`,
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex items-start justify-between mb-3",
          children: [/*#__PURE__*/_jsx("div", {
            className: `p-2 rounded-lg ${g.bg}`,
            children: /*#__PURE__*/_jsx(g.icon, {
              size: 15,
              className: g.text
            })
          }), /*#__PURE__*/_jsx("span", {
            className: `text-2xl font-bold font-mono ${g.text}`,
            children: g.count
          })]
        }), /*#__PURE__*/_jsx("p", {
          className: "text-sm font-bold text-foreground mb-0.5",
          children: g.status
        }), /*#__PURE__*/_jsx("p", {
          className: "text-xs text-muted-foreground leading-snug",
          children: g.desc
        }), /*#__PURE__*/_jsxs("div", {
          className: "mt-2 pt-2 border-t border-border",
          children: [/*#__PURE__*/_jsx("div", {
            className: "h-1.5 bg-muted rounded-full overflow-hidden",
            children: /*#__PURE__*/_jsx("div", {
              className: "h-full rounded-full transition-all",
              style: {
                width: `${g.count / totalContracts * 100}%`,
                background: g.color
              }
            })
          }), /*#__PURE__*/_jsxs("p", {
            className: "text-xs text-muted-foreground mt-1",
            children: [Math.round(g.count / totalContracts * 100), "% of portfolio"]
          })]
        })]
      }, g.status))
    }), /*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-1 lg:grid-cols-2 gap-5",
      children: [/*#__PURE__*/_jsxs(Card, {
        className: "p-5",
        children: [/*#__PURE__*/_jsx(SectionLabel, {
          children: "Portfolio Renewal Status Distribution"
        }), /*#__PURE__*/_jsxs("div", {
          className: "flex items-center gap-6",
          children: [/*#__PURE__*/_jsx(ResponsiveContainer, {
            width: 200,
            height: 200,
            children: /*#__PURE__*/_jsxs(PieChart, {
              children: [/*#__PURE__*/_jsx(Pie, {
                data: RENEWAL_STATUS_PIE,
                cx: "50%",
                cy: "50%",
                innerRadius: 55,
                outerRadius: 85,
                dataKey: "value",
                paddingAngle: 2,
                children: RENEWAL_STATUS_PIE.map(entry => /*#__PURE__*/_jsx(Cell, {
                  fill: entry.color
                }, `rspie-${entry.name}`))
              }), /*#__PURE__*/_jsx(Tooltip, {
                contentStyle: {
                  fontSize: 11,
                  borderRadius: 6
                },
                formatter: v => [`${v}%`, ""]
              })]
            })
          }), /*#__PURE__*/_jsx("div", {
            className: "flex-1 space-y-2",
            children: RENEWAL_STATUS_PIE.map(item => /*#__PURE__*/_jsxs("div", {
              className: "flex items-center justify-between text-xs",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "flex items-center gap-2",
                children: [/*#__PURE__*/_jsx("div", {
                  className: "w-2.5 h-2.5 rounded-full flex-shrink-0",
                  style: {
                    background: item.color
                  }
                }), /*#__PURE__*/_jsx("span", {
                  className: "text-muted-foreground",
                  children: item.name
                })]
              }), /*#__PURE__*/_jsxs("div", {
                className: "flex items-center gap-2",
                children: [/*#__PURE__*/_jsx("div", {
                  className: "w-16 h-1.5 bg-muted rounded-full overflow-hidden",
                  children: /*#__PURE__*/_jsx("div", {
                    className: "h-full rounded-full",
                    style: {
                      width: `${item.value}%`,
                      background: item.color
                    }
                  })
                }), /*#__PURE__*/_jsxs("span", {
                  className: "font-mono font-bold text-foreground w-6 text-right",
                  children: [item.value, "%"]
                })]
              })]
            }, item.name))
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        className: "p-5",
        children: [/*#__PURE__*/_jsx(SectionLabel, {
          children: "Renewal Performance Metrics"
        }), /*#__PURE__*/_jsx("div", {
          className: "grid grid-cols-2 gap-3 mb-4",
          children: [{
            label: "On-Time Renewal Rate",
            value: "87%",
            trend: "+4% vs last Q",
            positive: true
          }, {
            label: "Avg. Renewal Lead Time",
            value: "42 days",
            trend: "-6d vs target",
            positive: true
          }, {
            label: "Contracts Missed",
            value: "3",
            trend: "+1 vs last Q",
            positive: false
          }, {
            label: "Renewal Value YTD",
            value: "$8.2M",
            trend: "+12% YoY",
            positive: true
          }].map(m => /*#__PURE__*/_jsxs("div", {
            className: "bg-muted rounded-lg p-3",
            children: [/*#__PURE__*/_jsx("p", {
              className: "text-xl font-bold font-mono text-foreground",
              children: m.value
            }), /*#__PURE__*/_jsx("p", {
              className: "text-xs text-muted-foreground mt-0.5 leading-tight",
              children: m.label
            }), /*#__PURE__*/_jsxs("p", {
              className: `text-xs font-semibold mt-1 flex items-center gap-0.5 ${m.positive ? "text-emerald-600" : "text-red-500"}`,
              children: [m.positive ? /*#__PURE__*/_jsx(TrendingUp, {
                size: 10
              }) : /*#__PURE__*/_jsx(TrendingDown, {
                size: 10
              }), " ", m.trend]
            })]
          }, m.label))
        }), /*#__PURE__*/_jsxs("div", {
          className: "space-y-2.5",
          children: [/*#__PURE__*/_jsx("p", {
            className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide",
            children: "Renewal by Department"
          }), [{
            dept: "Legal",
            rate: 98,
            color: "bg-emerald-500"
          }, {
            dept: "Procurement",
            rate: 91,
            color: "bg-blue-500"
          }, {
            dept: "IT",
            rate: 88,
            color: "bg-blue-400"
          }, {
            dept: "Operations",
            rate: 72,
            color: "bg-amber-500"
          }, {
            dept: "HR",
            rate: 80,
            color: "bg-violet-500"
          }].map(d => /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsxs("div", {
              className: "flex justify-between text-xs mb-1",
              children: [/*#__PURE__*/_jsx("span", {
                className: "text-muted-foreground",
                children: d.dept
              }), /*#__PURE__*/_jsxs("span", {
                className: "font-mono font-semibold text-foreground",
                children: [d.rate, "%"]
              })]
            }), /*#__PURE__*/_jsx("div", {
              className: "h-1.5 bg-muted rounded-full overflow-hidden",
              children: /*#__PURE__*/_jsx("div", {
                className: `h-full rounded-full ${d.color}`,
                style: {
                  width: `${d.rate}%`
                }
              })
            })]
          }, d.dept))]
        })]
      })]
    }), /*#__PURE__*/_jsxs(Card, {
      children: [/*#__PURE__*/_jsxs("div", {
        className: "flex items-center justify-between px-5 py-3.5 border-b border-border",
        children: [/*#__PURE__*/_jsx(SectionLabel, {
          children: "All Renewals — Summary Table"
        }), /*#__PURE__*/_jsx("button", {
          onClick: () => onNavigate("renewal-tracking"),
          className: "text-xs text-blue-600 hover:underline",
          children: "Full tracking view →"
        })]
      }), /*#__PURE__*/_jsx("div", {
        className: "overflow-x-auto",
        children: /*#__PURE__*/_jsxs("table", {
          className: "w-full text-xs",
          children: [/*#__PURE__*/_jsx("thead", {
            children: /*#__PURE__*/_jsx("tr", {
              className: "border-b border-border bg-muted",
              children: ["Contract", "Renewal Date", "Days Left", "Status", "Priority", "Owner", "Value"].map(h => /*#__PURE__*/_jsx("th", {
                className: "text-left px-4 py-3 text-muted-foreground font-semibold uppercase tracking-wide whitespace-nowrap",
                children: h
              }, h))
            })
          }), /*#__PURE__*/_jsx("tbody", {
            className: "divide-y divide-border",
            children: RENEWALS.sort((a, b) => a.daysRemaining - b.daysRemaining).map(r => /*#__PURE__*/_jsxs("tr", {
              className: "hover:bg-muted/50 transition-colors",
              children: [/*#__PURE__*/_jsx("td", {
                className: "px-4 py-3 font-semibold text-foreground max-w-[200px]",
                children: /*#__PURE__*/_jsx("p", {
                  className: "truncate",
                  children: r.name
                })
              }), /*#__PURE__*/_jsx("td", {
                className: "px-4 py-3 font-mono text-muted-foreground whitespace-nowrap",
                children: r.renewalDate
              }), /*#__PURE__*/_jsx("td", {
                className: "px-4 py-3",
                children: /*#__PURE__*/_jsx(CountdownTimer, {
                  days: r.daysRemaining
                })
              }), /*#__PURE__*/_jsx("td", {
                className: "px-4 py-3",
                children: renewalStatusBadge(r.status)
              }), /*#__PURE__*/_jsx("td", {
                className: "px-4 py-3",
                children: priorityBadge(r.priority)
              }), /*#__PURE__*/_jsx("td", {
                className: "px-4 py-3 text-foreground whitespace-nowrap",
                children: r.owner
              }), /*#__PURE__*/_jsx("td", {
                className: "px-4 py-3 font-mono font-semibold text-foreground whitespace-nowrap",
                children: r.value
              })]
            }, r.id))
          })]
        })
      })]
    })]
  });
}

// ── Renewal Management (comprehensive combined screen) ─────────────────────
const RENEWAL_MGMT_DATA = [{
  id: "RNW-001",
  contractId: "CTR-003",
  name: "Commercial Lease — HQ Tower A",
  owner: "Lisa Torres",
  initials: "LT",
  dept: "Operations",
  type: "Lease",
  renewalDate: "May 31, 2024",
  daysRemaining: -3,
  status: "Expired",
  assignedTo: "Lisa Torres",
  priority: "Critical"
}, {
  id: "RNW-002",
  contractId: "CTR-006",
  name: "APAC Distribution Agreement",
  owner: "James Lee",
  initials: "JL",
  dept: "Procurement",
  type: "Vendor",
  renewalDate: "Jun 30, 2024",
  daysRemaining: 27,
  status: "Due Soon",
  assignedTo: "Sarah Chen",
  priority: "High"
}, {
  id: "RNW-003",
  contractId: "CTR-004",
  name: "Enterprise SaaS License — Salesforce CRM",
  owner: "Mark Johnson",
  initials: "MJ",
  dept: "IT",
  type: "Software",
  renewalDate: "Dec 31, 2024",
  daysRemaining: 211,
  status: "Upcoming",
  assignedTo: "Mark Johnson",
  priority: "Medium"
}, {
  id: "RNW-004",
  contractId: "CTR-007",
  name: "Legal Advisory Consulting Agreement",
  owner: "Lisa Torres",
  initials: "LT",
  dept: "Legal",
  type: "Services",
  renewalDate: "Aug 14, 2024",
  daysRemaining: 72,
  status: "In Progress",
  assignedTo: "David Park",
  priority: "High"
}, {
  id: "RNW-005",
  contractId: "CTR-010",
  name: "Marketing Agency Retainer Agreement",
  owner: "Sarah Chen",
  initials: "SC",
  dept: "Marketing",
  type: "Services",
  renewalDate: "Dec 31, 2024",
  daysRemaining: 211,
  status: "Upcoming",
  assignedTo: "Sarah Chen",
  priority: "Medium"
}, {
  id: "RNW-006",
  contractId: "CTR-001",
  name: "Master Services Agreement — Accenture LLP",
  owner: "Sarah Chen",
  initials: "SC",
  dept: "Legal",
  type: "Vendor",
  renewalDate: "Jan 14, 2026",
  daysRemaining: 590,
  status: "Upcoming",
  assignedTo: "Sarah Chen",
  priority: "Low"
}, {
  id: "RNW-007",
  contractId: "CTR-005",
  name: "Mutual NDA — TechVenture Group",
  owner: "Sarah Chen",
  initials: "SC",
  dept: "Legal",
  type: "NDA",
  renewalDate: "Apr 9, 2025",
  daysRemaining: 310,
  status: "Upcoming",
  assignedTo: "James Lee",
  priority: "Low"
}, {
  id: "RNW-008",
  contractId: "CTR-008",
  name: "GDPR Data Processing Agreement",
  owner: "David Park",
  initials: "DP",
  dept: "Compliance",
  type: "Compliance",
  renewalDate: "Dec 31, 2025",
  daysRemaining: 576,
  status: "Renewed",
  assignedTo: "David Park",
  priority: "High"
}, {
  id: "RNW-009",
  contractId: "CTR-009",
  name: "Cloud Infrastructure Agreement — AWS",
  owner: "Mark Johnson",
  initials: "MJ",
  dept: "IT",
  type: "Software",
  renewalDate: "Feb 28, 2026",
  daysRemaining: 635,
  status: "Upcoming",
  assignedTo: "Mark Johnson",
  priority: "Medium"
}];
const MGMT_WORKFLOW_STEPS = [{
  id: 1,
  label: "Request Created",
  person: "Lisa Torres",
  initials: "LT",
  status: "completed",
  date: "May 20"
}, {
  id: 2,
  label: "Legal Review",
  person: "Sarah Chen",
  initials: "SC",
  status: "completed",
  date: "May 22"
}, {
  id: 3,
  label: "Compliance Review",
  person: "David Park",
  initials: "DP",
  status: "completed",
  date: "May 25"
}, {
  id: 4,
  label: "Dept. Approval",
  person: "Michael Grant",
  initials: "MG",
  status: "current",
  date: "Pending"
}, {
  id: 5,
  label: "Final Approval",
  person: "Jennifer Walsh",
  initials: "JW",
  status: "pending",
  date: "—"
}, {
  id: 6,
  label: "Renewed",
  person: "System",
  initials: "CQ",
  status: "pending",
  date: "—"
}];
const MGMT_ACTIVITIES = [{
  icon: CheckCircle,
  color: "text-emerald-500",
  bg: "bg-emerald-50",
  text: "GDPR Data Processing Agreement renewal approved",
  sub: "Approved by David Park",
  time: "10 min ago"
}, {
  icon: Bell,
  color: "text-blue-500",
  bg: "bg-blue-50",
  text: "Reminder sent for APAC Distribution Agreement",
  sub: "Email + SMS dispatched",
  time: "42 min ago"
}, {
  icon: RefreshCw,
  color: "text-violet-500",
  bg: "bg-violet-50",
  text: "Cloud Infrastructure Agreement — AWS renewed",
  sub: "v2.0 executed and filed",
  time: "2 hrs ago"
}, {
  icon: Send,
  color: "text-amber-500",
  bg: "bg-amber-50",
  text: "Renewal request submitted for Commercial Lease",
  sub: "Submitted by Lisa Torres",
  time: "4 hrs ago"
}, {
  icon: FileCheck,
  color: "text-blue-600",
  bg: "bg-blue-50",
  text: "Legal review completed for Advisory Agreement",
  sub: "Reviewed by Sarah Chen",
  time: "6 hrs ago"
}, {
  icon: AlertTriangle,
  color: "text-red-500",
  bg: "bg-red-50",
  text: "Commercial Lease — HQ Tower A expired",
  sub: "3 days past expiry, action required",
  time: "3 days ago"
}];
const MGMT_HISTORY = [{
  name: "GDPR Data Processing Agreement",
  date: "Dec 31, 2023",
  approvedBy: "David Park",
  version: "v3.0",
  status: "Renewed"
}, {
  name: "Cloud Infrastructure — AWS",
  date: "Mar 1, 2024",
  approvedBy: "Michael Grant",
  version: "v2.0",
  status: "Renewed"
}, {
  name: "Marketing Agency Retainer",
  date: "Jan 1, 2024",
  approvedBy: "Sarah Chen",
  version: "v1.5",
  status: "Renewed"
}, {
  name: "Enterprise SaaS — Salesforce",
  date: "Jan 1, 2024",
  approvedBy: "Mark Johnson",
  version: "v3.0",
  status: "Renewed"
}, {
  name: "Legal Advisory Agreement (2023)",
  date: "Feb 15, 2023",
  approvedBy: "Lisa Torres",
  version: "v1.0",
  status: "Expired"
}];
const MGMT_REMINDER_CONFIG = [{
  type: "Email Notifications",
  icon: Mail,
  enabled: true,
  detail: "Owner + Manager + Legal"
}, {
  type: "SMS Notifications",
  icon: Phone,
  enabled: true,
  detail: "Owner + Manager"
}, {
  type: "In-App Notifications",
  icon: Bell,
  enabled: true,
  detail: "All Stakeholders"
}];
const MGMT_TREND = [{
  month: "Jan",
  renewed: 8,
  expired: 2,
  pending: 5
}, {
  month: "Feb",
  renewed: 11,
  expired: 1,
  pending: 7
}, {
  month: "Mar",
  renewed: 9,
  expired: 3,
  pending: 4
}, {
  month: "Apr",
  renewed: 14,
  expired: 2,
  pending: 6
}, {
  month: "May",
  renewed: 12,
  expired: 4,
  pending: 8
}, {
  month: "Jun",
  renewed: 7,
  expired: 3,
  pending: 11
}, {
  month: "Jul",
  renewed: 15,
  expired: 1,
  pending: 6
}, {
  month: "Aug",
  renewed: 10,
  expired: 2,
  pending: 9
}];
const MGMT_STATUS_PIE = [{
  name: "Upcoming",
  value: 42,
  color: "#F59E0B"
}, {
  name: "In Progress",
  value: 18,
  color: "#3B82F6"
}, {
  name: "Renewed",
  value: 28,
  color: "#10B981"
}, {
  name: "Expired",
  value: 7,
  color: "#EF4444"
}, {
  name: "Cancelled",
  value: 5,
  color: "#6B7280"
}];
const CALENDAR_DAYS = 30;
const MGMT_CALENDAR_EVENTS = {
  3: [{
    label: "APAC Dist.",
    color: "bg-amber-500"
  }],
  7: [{
    label: "NDA Review",
    color: "bg-blue-500"
  }],
  14: [{
    label: "Legal Advisory",
    color: "bg-orange-500"
  }],
  20: [{
    label: "Salesforce",
    color: "bg-blue-400"
  }],
  25: [{
    label: "Marketing",
    color: "bg-violet-500"
  }],
  30: [{
    label: "AWS Infra.",
    color: "bg-emerald-500"
  }]
};
function ToggleSwitch({
  enabled,
  onToggle
}) {
  return /*#__PURE__*/_jsx("button", {
    onClick: onToggle,
    className: `relative inline-flex h-5 w-9 flex-shrink-0 rounded-full transition-colors duration-200 focus:outline-none ${enabled ? "bg-blue-600" : "bg-slate-300"}`,
    children: /*#__PURE__*/_jsx("span", {
      className: `inline-block h-4 w-4 rounded-full bg-white shadow transform transition-transform duration-200 mt-0.5 ${enabled ? "translate-x-4" : "translate-x-0.5"}`
    })
  });
}
function RenewalManagementScreen() {
  const [activeTab, setActiveTab] = useState("overview");
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterDate, setFilterDate] = useState("All");
  const [toastMsg, setToastMsg] = useState(null);
  const [reminderToggles, setReminderToggles] = useState({
    email: true,
    sms: true,
    inapp: true
  });
  const [calOffset, setCalOffset] = useState(0);
  const showToast = msg => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3200);
  };
  const filtered = RENEWAL_MGMT_DATA.filter(r => {
    const q = search.toLowerCase();
    const matchSearch = !q || r.name.toLowerCase().includes(q) || r.id.toLowerCase().includes(q) || r.owner.toLowerCase().includes(q);
    const matchDept = filterDept === "All" || r.dept === filterDept;
    const matchType = filterType === "All" || r.type === filterType;
    const matchStatus = filterStatus === "All" || r.status === filterStatus;
    return matchSearch && matchDept && matchType && matchStatus;
  });
  const kpis = [{
    title: "Upcoming Renewals",
    value: "24",
    delta: "+3 this week",
    positive: true,
    icon: CalendarClock,
    bg: "bg-blue-600"
  }, {
    title: "Due This Month",
    value: "7",
    delta: "2 critical",
    positive: false,
    icon: AlertTriangle,
    bg: "bg-amber-500"
  }, {
    title: "Renewed Contracts",
    value: "38",
    delta: "+5 vs last month",
    positive: true,
    icon: CalendarCheck,
    bg: "bg-emerald-500"
  }, {
    title: "Expired Contracts",
    value: "4",
    delta: "Action needed",
    positive: false,
    icon: CalendarX,
    bg: "bg-red-500"
  }, {
    title: "Pending Approval",
    value: "6",
    delta: "3 overdue",
    positive: false,
    icon: Hourglass,
    bg: "bg-violet-500"
  }];
  const selectCls = "px-2.5 py-1.5 bg-input-background border border-border rounded-lg text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary";
  const TABS = [{
    id: "overview",
    label: "Overview",
    icon: LayoutDashboard
  }, {
    id: "tracking",
    label: "Tracking",
    icon: ClipboardList
  }, {
    id: "approval",
    label: "Approval Workflow",
    icon: FileCheck
  }, {
    id: "reminders",
    label: "Reminders",
    icon: BellRing
  }, {
    id: "history",
    label: "Renewal History",
    icon: Layers
  }, {
    id: "analytics",
    label: "Analytics",
    icon: BarChart2
  }];

  /* ── Calendar helpers ── */
  const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const baseYear = 2024;
  const baseMonth = 5; // June = index 5
  const calMonthIdx = ((baseMonth + calOffset) % 12 + 12) % 12;
  const calYear = baseYear + Math.floor((baseMonth + calOffset) / 12);
  const calMonthLabel = `${MONTHS[calMonthIdx]} ${calYear}`;
  const daysInMonth = new Date(calYear, calMonthIdx + 1, 0).getDate();
  const firstDow = new Date(calYear, calMonthIdx, 1).getDay(); // 0=Sun

  return /*#__PURE__*/_jsxs("div", {
    className: "flex flex-col h-full",
    children: [toastMsg && /*#__PURE__*/_jsxs("div", {
      className: "fixed top-4 right-4 z-50 bg-slate-900 text-white text-xs font-medium px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2",
      children: [/*#__PURE__*/_jsx(CheckCircle, {
        size: 13,
        className: "text-emerald-400 flex-shrink-0"
      }), " ", toastMsg]
    }), /*#__PURE__*/_jsxs("div", {
      className: "bg-card border-b border-border px-6 pt-5 pb-0 flex-shrink-0",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "flex flex-col gap-3 md:flex-row md:items-start md:justify-between mb-4",
        children: [/*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx("h1", {
            className: "text-xl font-bold text-foreground",
            style: {
              fontFamily: "var(--font-display)"
            },
            children: "Renewal Management"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground mt-0.5",
            children: "All contract renewals, approvals, reminders, and analytics in one place"
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "flex items-center gap-2 flex-wrap",
          children: [/*#__PURE__*/_jsxs("button", {
            onClick: () => showToast("Export initiated — generating CSV report…"),
            className: "flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-lg text-xs font-medium text-foreground hover:bg-muted transition-colors",
            children: [/*#__PURE__*/_jsx(Download, {
              size: 13
            }), " Export"]
          }), /*#__PURE__*/_jsxs("button", {
            onClick: () => setShowAddModal(true),
            className: "flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors",
            children: [/*#__PURE__*/_jsx(Plus, {
              size: 13
            }), " Add Renewal"]
          })]
        })]
      }), /*#__PURE__*/_jsx("div", {
        className: "flex items-center gap-0 overflow-x-auto",
        children: TABS.map(tab => /*#__PURE__*/_jsxs("button", {
          onClick: () => setActiveTab(tab.id),
          className: `flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${activeTab === tab.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"}`,
          children: [/*#__PURE__*/_jsx(tab.icon, {
            size: 13
          }), tab.label]
        }, tab.id))
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "flex-1 overflow-y-auto",
      children: [activeTab === "overview" && /*#__PURE__*/_jsxs("div", {
        className: "p-5 space-y-5 max-w-[1600px] mx-auto",
        children: [/*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx("p", {
            className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3",
            children: "Key Performance Indicators"
          }), /*#__PURE__*/_jsx("div", {
            className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4",
            children: kpis.map(k => /*#__PURE__*/_jsxs("div", {
              className: "bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "flex items-start justify-between mb-3",
                children: [/*#__PURE__*/_jsx("div", {
                  className: `p-2 rounded-lg ${k.bg}`,
                  children: /*#__PURE__*/_jsx(k.icon, {
                    size: 14,
                    className: "text-white"
                  })
                }), /*#__PURE__*/_jsxs("span", {
                  className: `text-xs font-medium flex items-center gap-0.5 ${k.positive ? "text-emerald-600" : "text-red-500"}`,
                  children: [k.positive ? /*#__PURE__*/_jsx(TrendingUp, {
                    size: 10
                  }) : /*#__PURE__*/_jsx(TrendingDown, {
                    size: 10
                  }), " ", k.delta]
                })]
              }), /*#__PURE__*/_jsx("p", {
                className: "text-2xl font-bold text-foreground font-mono mb-0.5",
                children: k.value
              }), /*#__PURE__*/_jsx("p", {
                className: "text-xs font-medium text-muted-foreground uppercase tracking-wide leading-snug",
                children: k.title
              })]
            }, k.title))
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "grid grid-cols-1 xl:grid-cols-5 gap-5",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "xl:col-span-2 bg-card border border-border rounded-xl overflow-hidden",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "flex items-center justify-between px-5 py-3.5 border-b border-border",
              children: [/*#__PURE__*/_jsxs("div", {
                children: [/*#__PURE__*/_jsx("p", {
                  className: "text-sm font-semibold text-foreground",
                  children: "Renewal Calendar"
                }), /*#__PURE__*/_jsx("p", {
                  className: "text-xs text-muted-foreground",
                  children: calMonthLabel
                })]
              }), /*#__PURE__*/_jsxs("div", {
                className: "flex items-center gap-1",
                children: [/*#__PURE__*/_jsx("button", {
                  onClick: () => setCalOffset(o => o - 1),
                  className: "w-6 h-6 flex items-center justify-center rounded hover:bg-muted transition-colors",
                  children: /*#__PURE__*/_jsx(ChevronLeft, {
                    size: 13
                  })
                }), /*#__PURE__*/_jsx("button", {
                  onClick: () => setCalOffset(o => o + 1),
                  className: "w-6 h-6 flex items-center justify-center rounded hover:bg-muted transition-colors",
                  children: /*#__PURE__*/_jsx(ChevronRight, {
                    size: 13
                  })
                })]
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "p-4",
              children: [/*#__PURE__*/_jsx("div", {
                className: "grid grid-cols-7 mb-1",
                children: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => /*#__PURE__*/_jsx("div", {
                  className: "text-center text-xs font-semibold text-muted-foreground py-1",
                  children: d
                }, d))
              }), /*#__PURE__*/_jsx("div", {
                className: "grid grid-cols-7 gap-y-0.5",
                children: Array.from({
                  length: firstDow + daysInMonth
                }).map((_, i) => {
                  const day = i - firstDow + 1;
                  if (day <= 0) return /*#__PURE__*/_jsx("div", {}, i);
                  const events = calOffset === 0 ? MGMT_CALENDAR_EVENTS[day] || [] : [];
                  const isToday = calOffset === 0 && day === 3;
                  return /*#__PURE__*/_jsxs("div", {
                    className: "min-h-[48px] p-0.5",
                    children: [/*#__PURE__*/_jsx("div", {
                      className: `text-xs font-medium text-center mb-0.5 w-5 h-5 flex items-center justify-center rounded-full mx-auto ${isToday ? "bg-primary text-primary-foreground" : "text-foreground"}`,
                      children: day
                    }), events.map((ev, ei) => /*#__PURE__*/_jsx("div", {
                      className: `text-white text-[9px] font-medium px-1 py-0.5 rounded truncate mb-0.5 ${ev.color}`,
                      children: ev.label
                    }, ei))]
                  }, i);
                })
              }), /*#__PURE__*/_jsx("div", {
                className: "mt-3 pt-3 border-t border-border flex flex-wrap gap-x-3 gap-y-1.5",
                children: [{
                  color: "bg-amber-500",
                  label: "Due Soon"
                }, {
                  color: "bg-blue-500",
                  label: "Upcoming"
                }, {
                  color: "bg-emerald-500",
                  label: "Renewed"
                }, {
                  color: "bg-red-500",
                  label: "Expired"
                }].map(l => /*#__PURE__*/_jsxs("div", {
                  className: "flex items-center gap-1",
                  children: [/*#__PURE__*/_jsx("div", {
                    className: `w-2 h-2 rounded-sm ${l.color}`
                  }), /*#__PURE__*/_jsx("span", {
                    className: "text-xs text-muted-foreground",
                    children: l.label
                  })]
                }, l.label))
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "xl:col-span-3 bg-card border border-border rounded-xl overflow-hidden",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "px-5 py-3.5 border-b border-border flex items-center justify-between",
              children: [/*#__PURE__*/_jsxs("div", {
                children: [/*#__PURE__*/_jsx("p", {
                  className: "text-sm font-semibold text-foreground",
                  children: "Active Approval Workflow"
                }), /*#__PURE__*/_jsx("p", {
                  className: "text-xs text-muted-foreground",
                  children: "Commercial Lease — HQ Tower A · Step 4 of 6"
                })]
              }), /*#__PURE__*/_jsx("button", {
                onClick: () => setActiveTab("approval"),
                className: "text-xs text-primary font-medium hover:underline",
                children: "Full view →"
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "p-5",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "relative mb-5",
                children: [/*#__PURE__*/_jsx("div", {
                  className: "absolute top-5 left-0 right-0 h-0.5 bg-border"
                }), /*#__PURE__*/_jsx("div", {
                  className: "absolute top-5 left-0 h-0.5 bg-emerald-500",
                  style: {
                    width: "50%"
                  }
                }), /*#__PURE__*/_jsx("div", {
                  className: "grid grid-cols-6 gap-1 relative",
                  children: MGMT_WORKFLOW_STEPS.map(step => /*#__PURE__*/_jsxs("div", {
                    className: "flex flex-col items-center gap-1.5",
                    children: [/*#__PURE__*/_jsx("div", {
                      className: `w-10 h-10 rounded-full border-2 flex items-center justify-center z-10 text-xs font-bold flex-shrink-0 ${step.status === "completed" ? "bg-emerald-500 border-emerald-500 text-white" : step.status === "current" ? "bg-primary border-primary text-white" : "bg-card border-border text-muted-foreground"}`,
                      children: step.status === "completed" ? /*#__PURE__*/_jsx(CheckCircle2, {
                        size: 16
                      }) : step.id
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "text-center",
                      children: [/*#__PURE__*/_jsx("p", {
                        className: `text-[10px] font-semibold leading-tight ${step.status === "pending" ? "text-muted-foreground" : "text-foreground"}`,
                        children: step.label
                      }), /*#__PURE__*/_jsx("p", {
                        className: "text-[9px] text-muted-foreground",
                        children: step.date
                      })]
                    })]
                  }, step.id))
                })]
              }), /*#__PURE__*/_jsx("div", {
                className: "bg-blue-50 border border-blue-200 rounded-lg p-3.5",
                children: /*#__PURE__*/_jsxs("div", {
                  className: "flex items-start justify-between gap-3",
                  children: [/*#__PURE__*/_jsxs("div", {
                    className: "flex items-start gap-3",
                    children: [/*#__PURE__*/_jsx("div", {
                      className: "w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0",
                      children: "MG"
                    }), /*#__PURE__*/_jsxs("div", {
                      children: [/*#__PURE__*/_jsx("p", {
                        className: "text-xs font-semibold text-blue-900",
                        children: "Department Approval — Michael Grant"
                      }), /*#__PURE__*/_jsx("p", {
                        className: "text-xs text-blue-700 mt-0.5",
                        children: "Awaiting FY2025 budget confirmation. Assigned May 28, 2024."
                      })]
                    })]
                  }), /*#__PURE__*/_jsxs("div", {
                    className: "flex gap-2 flex-shrink-0",
                    children: [/*#__PURE__*/_jsx("button", {
                      onClick: () => showToast("Reminder sent to Michael Grant."),
                      className: "px-2.5 py-1 bg-primary text-primary-foreground rounded text-xs font-semibold hover:bg-blue-700 transition-colors",
                      children: "Remind"
                    }), /*#__PURE__*/_jsx("button", {
                      onClick: () => showToast("Escalation submitted to CFO."),
                      className: "px-2.5 py-1 bg-red-600 text-white rounded text-xs font-semibold hover:bg-red-700 transition-colors",
                      children: "Escalate"
                    })]
                  })]
                })
              })]
            })]
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "bg-card border border-border rounded-xl overflow-hidden",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "flex items-center justify-between px-5 py-3.5 border-b border-border",
            children: [/*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx("p", {
                className: "text-sm font-semibold text-foreground",
                children: "Upcoming Renewals — Priority View"
              }), /*#__PURE__*/_jsx("p", {
                className: "text-xs text-muted-foreground",
                children: "Contracts sorted by urgency"
              })]
            }), /*#__PURE__*/_jsx("button", {
              onClick: () => setActiveTab("tracking"),
              className: "text-xs text-primary font-medium hover:underline",
              children: "Full tracking table →"
            })]
          }), /*#__PURE__*/_jsx("div", {
            className: "overflow-x-auto",
            children: /*#__PURE__*/_jsxs("table", {
              className: "w-full text-xs",
              children: [/*#__PURE__*/_jsx("thead", {
                children: /*#__PURE__*/_jsx("tr", {
                  className: "border-b border-border bg-muted",
                  children: ["Contract Name", "Department", "Renewal Date", "Days Remaining", "Status", "Priority"].map(h => /*#__PURE__*/_jsx("th", {
                    className: "text-left px-4 py-3 text-muted-foreground font-semibold uppercase tracking-wide whitespace-nowrap",
                    children: h
                  }, h))
                })
              }), /*#__PURE__*/_jsx("tbody", {
                className: "divide-y divide-border",
                children: RENEWAL_MGMT_DATA.slice().sort((a, b) => a.daysRemaining - b.daysRemaining).slice(0, 5).map(r => /*#__PURE__*/_jsxs("tr", {
                  className: "hover:bg-muted/40 transition-colors",
                  children: [/*#__PURE__*/_jsx("td", {
                    className: "px-4 py-3",
                    children: /*#__PURE__*/_jsxs("div", {
                      className: "flex items-center gap-2",
                      children: [/*#__PURE__*/_jsx(Av, {
                        initials: r.initials,
                        size: "sm"
                      }), /*#__PURE__*/_jsx("p", {
                        className: "font-semibold text-foreground max-w-[220px] truncate",
                        children: r.name
                      })]
                    })
                  }), /*#__PURE__*/_jsx("td", {
                    className: "px-4 py-3 text-muted-foreground whitespace-nowrap",
                    children: r.dept
                  }), /*#__PURE__*/_jsx("td", {
                    className: "px-4 py-3 font-mono text-muted-foreground whitespace-nowrap",
                    children: r.renewalDate
                  }), /*#__PURE__*/_jsx("td", {
                    className: "px-4 py-3",
                    children: /*#__PURE__*/_jsx(CountdownTimer, {
                      days: r.daysRemaining
                    })
                  }), /*#__PURE__*/_jsx("td", {
                    className: "px-4 py-3",
                    children: renewalStatusBadge(r.status)
                  }), /*#__PURE__*/_jsx("td", {
                    className: "px-4 py-3",
                    children: priorityBadge(r.priority)
                  })]
                }, r.id))
              })]
            })
          })]
        })]
      }), activeTab === "tracking" && /*#__PURE__*/_jsxs("div", {
        className: "p-5 space-y-4 max-w-[1600px] mx-auto",
        children: [/*#__PURE__*/_jsxs("div", {
          className: "bg-card border border-border rounded-xl px-5 py-4",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "flex flex-col gap-3 md:flex-row md:items-center md:justify-between flex-wrap",
            children: [/*#__PURE__*/_jsx("p", {
              className: "text-sm font-semibold text-foreground",
              children: "Renewal Tracking Table"
            }), /*#__PURE__*/_jsxs("div", {
              className: "flex items-center gap-2 flex-wrap",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "relative",
                children: [/*#__PURE__*/_jsx(Search, {
                  size: 13,
                  className: "absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                }), /*#__PURE__*/_jsx("input", {
                  value: search,
                  onChange: e => setSearch(e.target.value),
                  placeholder: "Search contracts or owners…",
                  className: "pl-8 pr-3 py-1.5 bg-input-background border border-border rounded-lg text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-48"
                })]
              }), /*#__PURE__*/_jsx("select", {
                value: filterDept,
                onChange: e => setFilterDept(e.target.value),
                className: selectCls,
                children: ["All Departments", "Legal", "Operations", "Procurement", "IT", "Marketing", "Compliance"].map(o => /*#__PURE__*/_jsx("option", {
                  value: o === "All Departments" ? "All" : o,
                  children: o
                }, o))
              }), /*#__PURE__*/_jsx("select", {
                value: filterType,
                onChange: e => setFilterType(e.target.value),
                className: selectCls,
                children: ["All Types", "Vendor", "Lease", "Software", "Services", "NDA", "Compliance"].map(o => /*#__PURE__*/_jsx("option", {
                  value: o === "All Types" ? "All" : o,
                  children: o
                }, o))
              }), /*#__PURE__*/_jsx("select", {
                value: filterStatus,
                onChange: e => setFilterStatus(e.target.value),
                className: selectCls,
                children: ["All Statuses", "Upcoming", "Due Soon", "In Progress", "Renewed", "Expired", "Cancelled"].map(o => /*#__PURE__*/_jsx("option", {
                  value: o === "All Statuses" ? "All" : o,
                  children: o
                }, o))
              }), /*#__PURE__*/_jsx("select", {
                value: filterDate,
                onChange: e => setFilterDate(e.target.value),
                className: selectCls,
                children: ["All Dates", "This Month", "Next 30 Days", "Next 90 Days", "This Year"].map(o => /*#__PURE__*/_jsx("option", {
                  value: o === "All Dates" ? "All" : o,
                  children: o
                }, o))
              }), /*#__PURE__*/_jsx("button", {
                onClick: () => {
                  setSearch("");
                  setFilterDept("All");
                  setFilterType("All");
                  setFilterStatus("All");
                  setFilterDate("All");
                },
                className: "px-2.5 py-1.5 border border-border rounded-lg text-xs text-muted-foreground hover:bg-muted transition-colors",
                children: "Clear"
              }), /*#__PURE__*/_jsxs("button", {
                onClick: () => showToast("Export initiated."),
                className: "flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-lg text-xs font-medium text-foreground hover:bg-muted transition-colors",
                children: [/*#__PURE__*/_jsx(Download, {
                  size: 11
                }), " Export"]
              })]
            })]
          }), /*#__PURE__*/_jsxs("p", {
            className: "text-xs text-muted-foreground mt-2",
            children: [filtered.length, " of ", RENEWAL_MGMT_DATA.length, " contracts shown"]
          })]
        }), /*#__PURE__*/_jsx("div", {
          className: "bg-card border border-border rounded-xl overflow-hidden",
          children: /*#__PURE__*/_jsx("div", {
            className: "overflow-x-auto",
            children: /*#__PURE__*/_jsxs("table", {
              className: "w-full text-xs",
              children: [/*#__PURE__*/_jsx("thead", {
                children: /*#__PURE__*/_jsx("tr", {
                  className: "border-b border-border bg-muted",
                  children: ["Contract ID", "Contract Name", "Owner", "Department", "Renewal Date", "Days Remaining", "Status", "Assigned To", "Priority", "Actions"].map(h => /*#__PURE__*/_jsx("th", {
                    className: "text-left px-4 py-3 text-muted-foreground font-semibold uppercase tracking-wide whitespace-nowrap",
                    children: h
                  }, h))
                })
              }), /*#__PURE__*/_jsxs("tbody", {
                className: "divide-y divide-border",
                children: [filtered.map(r => /*#__PURE__*/_jsxs("tr", {
                  className: "hover:bg-muted/40 transition-colors",
                  children: [/*#__PURE__*/_jsx("td", {
                    className: "px-4 py-3 font-mono text-muted-foreground whitespace-nowrap",
                    children: r.contractId
                  }), /*#__PURE__*/_jsx("td", {
                    className: "px-4 py-3",
                    children: /*#__PURE__*/_jsxs("div", {
                      className: "flex items-center gap-2 max-w-[240px]",
                      children: [/*#__PURE__*/_jsx(Av, {
                        initials: r.initials,
                        size: "sm"
                      }), /*#__PURE__*/_jsx("p", {
                        className: "font-semibold text-foreground truncate",
                        children: r.name
                      })]
                    })
                  }), /*#__PURE__*/_jsx("td", {
                    className: "px-4 py-3 text-foreground whitespace-nowrap",
                    children: r.owner
                  }), /*#__PURE__*/_jsx("td", {
                    className: "px-4 py-3 text-muted-foreground whitespace-nowrap",
                    children: r.dept
                  }), /*#__PURE__*/_jsx("td", {
                    className: "px-4 py-3 font-mono text-muted-foreground whitespace-nowrap",
                    children: r.renewalDate
                  }), /*#__PURE__*/_jsx("td", {
                    className: "px-4 py-3",
                    children: /*#__PURE__*/_jsx(CountdownTimer, {
                      days: r.daysRemaining
                    })
                  }), /*#__PURE__*/_jsx("td", {
                    className: "px-4 py-3",
                    children: renewalStatusBadge(r.status)
                  }), /*#__PURE__*/_jsx("td", {
                    className: "px-4 py-3 text-foreground whitespace-nowrap",
                    children: r.assignedTo
                  }), /*#__PURE__*/_jsx("td", {
                    className: "px-4 py-3",
                    children: priorityBadge(r.priority)
                  }), /*#__PURE__*/_jsx("td", {
                    className: "px-4 py-3",
                    children: /*#__PURE__*/_jsxs("div", {
                      className: "flex items-center gap-1",
                      children: [/*#__PURE__*/_jsx("button", {
                        onClick: () => showToast(`Viewing ${r.name}.`),
                        className: "p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors",
                        title: "View",
                        children: /*#__PURE__*/_jsx(Eye, {
                          size: 12
                        })
                      }), /*#__PURE__*/_jsx("button", {
                        onClick: () => showToast(`Editing ${r.name}.`),
                        className: "p-1.5 text-slate-500 hover:bg-muted rounded transition-colors",
                        title: "Edit",
                        children: /*#__PURE__*/_jsx(Edit, {
                          size: 12
                        })
                      }), /*#__PURE__*/_jsx("button", {
                        onClick: () => showToast(`Renewal initiated for ${r.name}.`),
                        className: "p-1.5 text-emerald-600 hover:bg-emerald-50 rounded transition-colors",
                        title: "Renew",
                        children: /*#__PURE__*/_jsx(RefreshCw, {
                          size: 12
                        })
                      })]
                    })
                  })]
                }, r.id)), filtered.length === 0 && /*#__PURE__*/_jsx("tr", {
                  children: /*#__PURE__*/_jsx("td", {
                    colSpan: 10,
                    className: "px-4 py-12 text-center text-muted-foreground",
                    children: "No contracts match the current filters."
                  })
                })]
              })]
            })
          })
        }), /*#__PURE__*/_jsxs("div", {
          className: "bg-card border border-border rounded-xl px-5 py-4",
          children: [/*#__PURE__*/_jsx("p", {
            className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3",
            children: "Renewal Status Legend"
          }), /*#__PURE__*/_jsx("div", {
            className: "flex flex-wrap gap-4",
            children: [{
              status: "Upcoming",
              desc: "Renewal date is more than 30 days away"
            }, {
              status: "Due Soon",
              desc: "Renewal due within the next 30 days"
            }, {
              status: "In Progress",
              desc: "Renewal process has been started"
            }, {
              status: "Renewed",
              desc: "Contract successfully renewed"
            }, {
              status: "Expired",
              desc: "Contract has passed expiry without renewal"
            }, {
              status: "Cancelled",
              desc: "Renewal was intentionally cancelled"
            }].map(s => /*#__PURE__*/_jsxs("div", {
              className: "flex items-center gap-2",
              children: [renewalStatusBadge(s.status), /*#__PURE__*/_jsx("span", {
                className: "text-xs text-muted-foreground",
                children: s.desc
              })]
            }, s.status))
          })]
        })]
      }), activeTab === "approval" && /*#__PURE__*/_jsx("div", {
        className: "p-5 space-y-5 max-w-[1200px] mx-auto",
        children: /*#__PURE__*/_jsxs("div", {
          className: "bg-card border border-border rounded-xl overflow-hidden",
          children: [/*#__PURE__*/_jsx("div", {
            className: "px-6 py-4 border-b border-border",
            children: /*#__PURE__*/_jsxs("div", {
              className: "flex items-start justify-between",
              children: [/*#__PURE__*/_jsxs("div", {
                children: [/*#__PURE__*/_jsx("p", {
                  className: "text-sm font-semibold text-foreground",
                  children: "Renewal Approval Workflow"
                }), /*#__PURE__*/_jsx("p", {
                  className: "text-xs text-muted-foreground mt-0.5",
                  children: "Commercial Lease — HQ Tower A · Renewal Request #RNW-001"
                })]
              }), /*#__PURE__*/_jsx(Badge, {
                variant: "info",
                children: "In Progress"
              })]
            })
          }), /*#__PURE__*/_jsxs("div", {
            className: "p-6",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "relative mb-8",
              children: [/*#__PURE__*/_jsx("div", {
                className: "absolute top-6 left-0 right-0 h-0.5 bg-border"
              }), /*#__PURE__*/_jsx("div", {
                className: "absolute top-6 left-0 h-0.5 bg-emerald-500",
                style: {
                  width: "50%"
                }
              }), /*#__PURE__*/_jsx("div", {
                className: "grid grid-cols-6 gap-2 relative",
                children: MGMT_WORKFLOW_STEPS.map(step => /*#__PURE__*/_jsxs("div", {
                  className: "flex flex-col items-center gap-2",
                  children: [/*#__PURE__*/_jsx("div", {
                    className: `w-12 h-12 rounded-full border-2 flex items-center justify-center z-10 font-bold flex-shrink-0 transition-colors ${step.status === "completed" ? "bg-emerald-500 border-emerald-500 text-white" : step.status === "current" ? "bg-primary border-primary text-white" : "bg-card border-border text-muted-foreground"}`,
                    children: step.status === "completed" ? /*#__PURE__*/_jsx(CheckCircle2, {
                      size: 20
                    }) : /*#__PURE__*/_jsx("span", {
                      className: "text-sm",
                      children: step.id
                    })
                  }), /*#__PURE__*/_jsxs("div", {
                    className: "text-center px-1",
                    children: [/*#__PURE__*/_jsx("p", {
                      className: `text-xs font-semibold leading-tight ${step.status === "pending" ? "text-muted-foreground" : "text-foreground"}`,
                      children: step.label
                    }), /*#__PURE__*/_jsx("p", {
                      className: "text-[10px] text-muted-foreground mt-1",
                      children: step.person
                    }), /*#__PURE__*/_jsx("p", {
                      className: "text-[10px] font-mono text-muted-foreground",
                      children: step.date
                    }), step.status === "completed" && /*#__PURE__*/_jsx(Badge, {
                      variant: "success",
                      children: "Done"
                    }), step.status === "current" && /*#__PURE__*/_jsx(Badge, {
                      variant: "info",
                      children: "Active"
                    }), step.status === "pending" && /*#__PURE__*/_jsx(Badge, {
                      variant: "neutral",
                      children: "Pending"
                    })]
                  })]
                }, step.id))
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "space-y-3",
              children: [/*#__PURE__*/_jsx("p", {
                className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider",
                children: "Step-by-Step Details"
              }), MGMT_WORKFLOW_STEPS.map(step => /*#__PURE__*/_jsxs("div", {
                className: `rounded-lg border p-4 flex items-start gap-4 ${step.status === "completed" ? "border-emerald-200 bg-emerald-50" : step.status === "current" ? "border-blue-200 bg-blue-50" : "border-border bg-muted/30"}`,
                children: [/*#__PURE__*/_jsx("div", {
                  className: `w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs ${step.status === "completed" ? "bg-emerald-500 text-white" : step.status === "current" ? "bg-primary text-white" : "bg-slate-200 text-slate-500"}`,
                  children: step.status === "completed" ? /*#__PURE__*/_jsx(CheckCircle2, {
                    size: 16
                  }) : step.initials
                }), /*#__PURE__*/_jsxs("div", {
                  className: "flex-1 min-w-0",
                  children: [/*#__PURE__*/_jsxs("div", {
                    className: "flex items-center gap-2 flex-wrap mb-1",
                    children: [/*#__PURE__*/_jsx("p", {
                      className: `text-xs font-semibold ${step.status === "pending" ? "text-muted-foreground" : "text-foreground"}`,
                      children: step.label
                    }), /*#__PURE__*/_jsx("span", {
                      className: "text-muted-foreground text-xs",
                      children: "·"
                    }), /*#__PURE__*/_jsx("p", {
                      className: "text-xs text-muted-foreground",
                      children: step.person
                    }), step.date !== "—" && /*#__PURE__*/_jsxs(_Fragment, {
                      children: [/*#__PURE__*/_jsx("span", {
                        className: "text-muted-foreground text-xs",
                        children: "·"
                      }), /*#__PURE__*/_jsx("p", {
                        className: "text-xs font-mono text-muted-foreground",
                        children: step.date
                      })]
                    })]
                  }), step.status === "completed" && /*#__PURE__*/_jsx("p", {
                    className: "text-xs text-emerald-700",
                    children: "Step completed successfully."
                  }), step.status === "current" && /*#__PURE__*/_jsxs("div", {
                    className: "flex items-center justify-between gap-3",
                    children: [/*#__PURE__*/_jsx("p", {
                      className: "text-xs text-blue-700",
                      children: "Awaiting FY2025 budget confirmation for department head sign-off."
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "flex gap-2 flex-shrink-0",
                      children: [/*#__PURE__*/_jsx("button", {
                        onClick: () => showToast("Reminder sent."),
                        className: "px-2.5 py-1 bg-primary text-primary-foreground rounded text-xs font-semibold hover:bg-blue-700 transition-colors",
                        children: "Send Reminder"
                      }), /*#__PURE__*/_jsx("button", {
                        onClick: () => showToast("Escalated to CFO."),
                        className: "px-2.5 py-1 bg-red-600 text-white rounded text-xs font-semibold hover:bg-red-700 transition-colors",
                        children: "Escalate"
                      })]
                    })]
                  }), step.status === "pending" && /*#__PURE__*/_jsx("p", {
                    className: "text-xs text-muted-foreground",
                    children: "Not yet reached — will be triggered upon completion of the prior step."
                  })]
                })]
              }, step.id))]
            })]
          })]
        })
      }), activeTab === "reminders" && /*#__PURE__*/_jsxs("div", {
        className: "p-5 space-y-5 max-w-[960px] mx-auto",
        children: [/*#__PURE__*/_jsxs("div", {
          className: "grid grid-cols-1 md:grid-cols-2 gap-5",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "bg-card border border-border rounded-xl overflow-hidden",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "px-5 py-3.5 border-b border-border flex items-center justify-between",
              children: [/*#__PURE__*/_jsx("p", {
                className: "text-sm font-semibold text-foreground",
                children: "Notification Channels"
              }), /*#__PURE__*/_jsx(BellRing, {
                size: 14,
                className: "text-muted-foreground"
              })]
            }), /*#__PURE__*/_jsx("div", {
              className: "p-5 space-y-4",
              children: [{
                key: "email",
                type: "Email Notifications",
                icon: Mail,
                detail: "Owner + Manager + Legal Team",
                description: "Sends formatted HTML email to all stakeholders with contract details and action links."
              }, {
                key: "sms",
                type: "SMS Notifications",
                icon: Phone,
                detail: "Owner + Manager",
                description: "Short text message to primary stakeholders. Includes contract name and expiry date."
              }, {
                key: "inapp",
                type: "In-App Notifications",
                icon: Bell,
                detail: "All Stakeholders",
                description: "Push notification within ContractIQ platform visible on dashboard and bell icon."
              }].map(rc => /*#__PURE__*/_jsxs("div", {
                className: `rounded-lg border p-4 transition-colors ${reminderToggles[rc.key] ? "border-blue-200 bg-blue-50" : "border-border bg-muted/20"}`,
                children: [/*#__PURE__*/_jsxs("div", {
                  className: "flex items-start justify-between gap-3 mb-2",
                  children: [/*#__PURE__*/_jsxs("div", {
                    className: "flex items-center gap-2.5",
                    children: [/*#__PURE__*/_jsx("div", {
                      className: `p-2 rounded-lg ${reminderToggles[rc.key] ? "bg-blue-100" : "bg-muted"}`,
                      children: /*#__PURE__*/_jsx(rc.icon, {
                        size: 13,
                        className: reminderToggles[rc.key] ? "text-blue-600" : "text-muted-foreground"
                      })
                    }), /*#__PURE__*/_jsxs("div", {
                      children: [/*#__PURE__*/_jsx("p", {
                        className: "text-xs font-semibold text-foreground",
                        children: rc.type
                      }), /*#__PURE__*/_jsx("p", {
                        className: "text-xs text-muted-foreground",
                        children: rc.detail
                      })]
                    })]
                  }), /*#__PURE__*/_jsx(ToggleSwitch, {
                    enabled: reminderToggles[rc.key],
                    onToggle: () => setReminderToggles(t => ({
                      ...t,
                      [rc.key]: !t[rc.key]
                    }))
                  })]
                }), /*#__PURE__*/_jsx("p", {
                  className: "text-xs text-muted-foreground leading-relaxed",
                  children: rc.description
                })]
              }, rc.type))
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "bg-card border border-border rounded-xl overflow-hidden",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "px-5 py-3.5 border-b border-border flex items-center justify-between",
              children: [/*#__PURE__*/_jsx("p", {
                className: "text-sm font-semibold text-foreground",
                children: "Reminder Schedule"
              }), /*#__PURE__*/_jsx(Badge, {
                variant: "info",
                children: "4 Active Rules"
              })]
            }), /*#__PURE__*/_jsx("div", {
              className: "p-5 space-y-3",
              children: [{
                label: "90-Day Advance Notice",
                trigger: "90 days before expiry",
                freq: "Once",
                recipients: "Contract Owner",
                channels: ["Email", "In-App"],
                active: true
              }, {
                label: "30-Day Critical Alert",
                trigger: "30 days before expiry",
                freq: "Weekly",
                recipients: "Owner + Manager",
                channels: ["Email", "SMS", "In-App"],
                active: true
              }, {
                label: "7-Day Final Warning",
                trigger: "7 days before expiry",
                freq: "Daily",
                recipients: "Owner + Manager + Legal",
                channels: ["Email", "SMS", "In-App"],
                active: true
              }, {
                label: "Day-Of Expiry Alert",
                trigger: "On expiry date",
                freq: "Once",
                recipients: "All Stakeholders",
                channels: ["Email", "SMS", "In-App"],
                active: true
              }, {
                label: "Post-Expiry Follow-Up",
                trigger: "3 days after expiry",
                freq: "Once",
                recipients: "Owner + Admin",
                channels: ["Email", "In-App"],
                active: false
              }].map((rule, i) => /*#__PURE__*/_jsxs("div", {
                className: `rounded-lg border p-3.5 ${rule.active ? "border-border bg-card" : "border-border bg-muted/30 opacity-60"}`,
                children: [/*#__PURE__*/_jsxs("div", {
                  className: "flex items-center justify-between mb-1.5",
                  children: [/*#__PURE__*/_jsx("p", {
                    className: "text-xs font-semibold text-foreground",
                    children: rule.label
                  }), /*#__PURE__*/_jsx(Badge, {
                    variant: rule.active ? "success" : "neutral",
                    children: rule.active ? "Active" : "Inactive"
                  })]
                }), /*#__PURE__*/_jsxs("p", {
                  className: "text-xs text-muted-foreground mb-1",
                  children: [rule.trigger, " · ", /*#__PURE__*/_jsx("span", {
                    className: "font-medium",
                    children: rule.freq
                  }), " · ", rule.recipients]
                }), /*#__PURE__*/_jsx("div", {
                  className: "flex gap-1",
                  children: rule.channels.map(ch => /*#__PURE__*/_jsx("span", {
                    className: "px-1.5 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-medium rounded border border-blue-200",
                    children: ch
                  }, ch))
                })]
              }, i))
            })]
          })]
        }), /*#__PURE__*/_jsx("div", {
          className: "bg-card border border-border rounded-xl p-5",
          children: /*#__PURE__*/_jsxs("div", {
            className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "flex items-start gap-4",
              children: [/*#__PURE__*/_jsx("div", {
                className: "p-3 bg-blue-50 border border-blue-200 rounded-lg",
                children: /*#__PURE__*/_jsx(CalendarClock, {
                  size: 20,
                  className: "text-blue-600"
                })
              }), /*#__PURE__*/_jsxs("div", {
                children: [/*#__PURE__*/_jsx("p", {
                  className: "text-sm font-semibold text-foreground",
                  children: "Next Scheduled Reminder"
                }), /*#__PURE__*/_jsx("p", {
                  className: "text-xs text-muted-foreground mt-0.5",
                  children: "Jun 23, 2024 — APAC Distribution Agreement"
                }), /*#__PURE__*/_jsx("p", {
                  className: "text-xs text-muted-foreground",
                  children: "7-day final warning · Email + SMS + In-App · Owner + Manager + Legal"
                })]
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "flex gap-2 flex-shrink-0",
              children: [/*#__PURE__*/_jsx("button", {
                onClick: () => showToast("Test reminder sent to your email."),
                className: "px-4 py-2 border border-border rounded-lg text-xs font-medium text-foreground hover:bg-muted transition-colors",
                children: "Send Test"
              }), /*#__PURE__*/_jsx("button", {
                onClick: () => showToast("Reminder configuration saved successfully."),
                className: "px-4 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors",
                children: "Save Configuration"
              })]
            })]
          })
        })]
      }), activeTab === "history" && /*#__PURE__*/_jsxs("div", {
        className: "p-5 space-y-5 max-w-[1200px] mx-auto",
        children: [/*#__PURE__*/_jsxs("div", {
          className: "bg-card border border-border rounded-xl overflow-hidden",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "flex items-center justify-between px-5 py-3.5 border-b border-border",
            children: [/*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx("p", {
                className: "text-sm font-semibold text-foreground",
                children: "Renewal History"
              }), /*#__PURE__*/_jsx("p", {
                className: "text-xs text-muted-foreground",
                children: "Complete log of all past renewal actions"
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "flex items-center gap-2",
              children: [/*#__PURE__*/_jsxs(Badge, {
                variant: "neutral",
                children: [MGMT_HISTORY.length, " records"]
              }), /*#__PURE__*/_jsxs("button", {
                onClick: () => showToast("Exporting renewal history…"),
                className: "flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-lg text-xs font-medium text-foreground hover:bg-muted transition-colors",
                children: [/*#__PURE__*/_jsx(Download, {
                  size: 11
                }), " Export"]
              })]
            })]
          }), /*#__PURE__*/_jsx("div", {
            className: "overflow-x-auto",
            children: /*#__PURE__*/_jsxs("table", {
              className: "w-full text-xs",
              children: [/*#__PURE__*/_jsx("thead", {
                children: /*#__PURE__*/_jsx("tr", {
                  className: "border-b border-border bg-muted",
                  children: ["Contract Name", "Renewal Date", "Approved By", "Version", "Status", "Actions"].map(h => /*#__PURE__*/_jsx("th", {
                    className: "text-left px-5 py-3 text-muted-foreground font-semibold uppercase tracking-wide whitespace-nowrap",
                    children: h
                  }, h))
                })
              }), /*#__PURE__*/_jsx("tbody", {
                className: "divide-y divide-border",
                children: MGMT_HISTORY.map((h, i) => /*#__PURE__*/_jsxs("tr", {
                  className: "hover:bg-muted/40 transition-colors",
                  children: [/*#__PURE__*/_jsx("td", {
                    className: "px-5 py-4",
                    children: /*#__PURE__*/_jsx("p", {
                      className: "font-semibold text-foreground",
                      children: h.name
                    })
                  }), /*#__PURE__*/_jsx("td", {
                    className: "px-5 py-4 font-mono text-muted-foreground whitespace-nowrap",
                    children: h.date
                  }), /*#__PURE__*/_jsx("td", {
                    className: "px-5 py-4 text-foreground whitespace-nowrap",
                    children: h.approvedBy
                  }), /*#__PURE__*/_jsx("td", {
                    className: "px-5 py-4",
                    children: /*#__PURE__*/_jsx(Badge, {
                      variant: "neutral",
                      children: h.version
                    })
                  }), /*#__PURE__*/_jsx("td", {
                    className: "px-5 py-4",
                    children: renewalStatusBadge(h.status)
                  }), /*#__PURE__*/_jsx("td", {
                    className: "px-5 py-4",
                    children: /*#__PURE__*/_jsxs("div", {
                      className: "flex gap-1",
                      children: [/*#__PURE__*/_jsx("button", {
                        onClick: () => showToast(`Viewing history for ${h.name}.`),
                        className: "p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors",
                        children: /*#__PURE__*/_jsx(Eye, {
                          size: 12
                        })
                      }), /*#__PURE__*/_jsx("button", {
                        onClick: () => showToast(`Downloading ${h.name} renewal document.`),
                        className: "p-1.5 text-slate-500 hover:bg-muted rounded transition-colors",
                        children: /*#__PURE__*/_jsx(Download, {
                          size: 12
                        })
                      })]
                    })
                  })]
                }, i))
              })]
            })
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "bg-card border border-border rounded-xl overflow-hidden",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "px-5 py-3.5 border-b border-border",
            children: [/*#__PURE__*/_jsx("p", {
              className: "text-sm font-semibold text-foreground",
              children: "Recent Activity Log"
            }), /*#__PURE__*/_jsx("p", {
              className: "text-xs text-muted-foreground",
              children: "All renewal-related actions from the last 30 days"
            })]
          }), /*#__PURE__*/_jsx("div", {
            className: "divide-y divide-border",
            children: MGMT_ACTIVITIES.map((a, i) => /*#__PURE__*/_jsxs("div", {
              className: "px-5 py-4 flex gap-3 hover:bg-muted/40 transition-colors",
              children: [/*#__PURE__*/_jsx("div", {
                className: `w-8 h-8 rounded-lg ${a.bg} flex items-center justify-center flex-shrink-0 mt-0.5`,
                children: /*#__PURE__*/_jsx(a.icon, {
                  size: 13,
                  className: a.color
                })
              }), /*#__PURE__*/_jsxs("div", {
                className: "flex-1 min-w-0",
                children: [/*#__PURE__*/_jsx("p", {
                  className: "text-xs font-semibold text-foreground leading-snug",
                  children: a.text
                }), /*#__PURE__*/_jsx("p", {
                  className: "text-xs text-muted-foreground mt-0.5",
                  children: a.sub
                })]
              }), /*#__PURE__*/_jsx("p", {
                className: "text-xs text-muted-foreground font-mono flex-shrink-0",
                children: a.time
              })]
            }, i))
          })]
        })]
      }), activeTab === "analytics" && /*#__PURE__*/_jsxs("div", {
        className: "p-5 space-y-5 max-w-[1400px] mx-auto",
        children: [/*#__PURE__*/_jsx("div", {
          className: "grid grid-cols-2 md:grid-cols-5 gap-4",
          children: kpis.map(k => /*#__PURE__*/_jsxs("div", {
            className: "bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "flex items-start justify-between mb-2",
              children: [/*#__PURE__*/_jsx("div", {
                className: `p-1.5 rounded-lg ${k.bg}`,
                children: /*#__PURE__*/_jsx(k.icon, {
                  size: 13,
                  className: "text-white"
                })
              }), /*#__PURE__*/_jsxs("span", {
                className: `text-xs font-medium flex items-center gap-0.5 ${k.positive ? "text-emerald-600" : "text-red-500"}`,
                children: [k.positive ? /*#__PURE__*/_jsx(TrendingUp, {
                  size: 9
                }) : /*#__PURE__*/_jsx(TrendingDown, {
                  size: 9
                }), " ", k.delta]
              })]
            }), /*#__PURE__*/_jsx("p", {
              className: "text-xl font-bold text-foreground font-mono mb-0.5",
              children: k.value
            }), /*#__PURE__*/_jsx("p", {
              className: "text-[10px] font-medium text-muted-foreground uppercase tracking-wide leading-snug",
              children: k.title
            })]
          }, k.title))
        }), /*#__PURE__*/_jsxs("div", {
          className: "grid grid-cols-1 xl:grid-cols-3 gap-5",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "xl:col-span-2 bg-card border border-border rounded-xl overflow-hidden",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "px-5 py-3.5 border-b border-border flex items-center justify-between",
              children: [/*#__PURE__*/_jsxs("div", {
                children: [/*#__PURE__*/_jsx("p", {
                  className: "text-sm font-semibold text-foreground",
                  children: "Monthly Renewal Trend"
                }), /*#__PURE__*/_jsx("p", {
                  className: "text-xs text-muted-foreground",
                  children: "Renewed vs Expired vs Pending — last 8 months"
                })]
              }), /*#__PURE__*/_jsx(Activity, {
                size: 14,
                className: "text-muted-foreground"
              })]
            }), /*#__PURE__*/_jsx("div", {
              className: "p-5",
              children: /*#__PURE__*/_jsx(ResponsiveContainer, {
                width: "100%",
                height: 260,
                children: /*#__PURE__*/_jsxs(LineChart, {
                  data: MGMT_TREND,
                  children: [/*#__PURE__*/_jsx(CartesianGrid, {
                    strokeDasharray: "3 3",
                    stroke: "rgba(15,23,42,0.06)"
                  }), /*#__PURE__*/_jsx(XAxis, {
                    dataKey: "month",
                    tick: {
                      fontSize: 11,
                      fill: "#64748B"
                    },
                    axisLine: false,
                    tickLine: false
                  }), /*#__PURE__*/_jsx(YAxis, {
                    tick: {
                      fontSize: 11,
                      fill: "#64748B"
                    },
                    axisLine: false,
                    tickLine: false
                  }), /*#__PURE__*/_jsx(Tooltip, {
                    contentStyle: {
                      fontSize: 11,
                      borderRadius: 8,
                      border: "1px solid #e2e8f0",
                      background: "#fff"
                    }
                  }), /*#__PURE__*/_jsx(Legend, {
                    wrapperStyle: {
                      fontSize: 11
                    }
                  }), /*#__PURE__*/_jsx(Line, {
                    type: "monotone",
                    dataKey: "renewed",
                    stroke: "#10B981",
                    strokeWidth: 2.5,
                    dot: {
                      r: 3.5,
                      fill: "#10B981"
                    },
                    name: "Renewed"
                  }), /*#__PURE__*/_jsx(Line, {
                    type: "monotone",
                    dataKey: "expired",
                    stroke: "#EF4444",
                    strokeWidth: 2,
                    dot: {
                      r: 3,
                      fill: "#EF4444"
                    },
                    name: "Expired",
                    strokeDasharray: "5 2"
                  }), /*#__PURE__*/_jsx(Line, {
                    type: "monotone",
                    dataKey: "pending",
                    stroke: "#F59E0B",
                    strokeWidth: 2,
                    dot: {
                      r: 3,
                      fill: "#F59E0B"
                    },
                    name: "Pending"
                  })]
                })
              })
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "bg-card border border-border rounded-xl overflow-hidden",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "px-5 py-3.5 border-b border-border",
              children: [/*#__PURE__*/_jsx("p", {
                className: "text-sm font-semibold text-foreground",
                children: "Status Distribution"
              }), /*#__PURE__*/_jsx("p", {
                className: "text-xs text-muted-foreground",
                children: "Current portfolio breakdown"
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "p-5",
              children: [/*#__PURE__*/_jsx(ResponsiveContainer, {
                width: "100%",
                height: 180,
                children: /*#__PURE__*/_jsxs(PieChart, {
                  children: [/*#__PURE__*/_jsx(Pie, {
                    data: MGMT_STATUS_PIE,
                    cx: "50%",
                    cy: "50%",
                    innerRadius: 52,
                    outerRadius: 82,
                    paddingAngle: 3,
                    dataKey: "value",
                    children: MGMT_STATUS_PIE.map(entry => /*#__PURE__*/_jsx(Cell, {
                      fill: entry.color
                    }, `mspie-${entry.name}`))
                  }), /*#__PURE__*/_jsx(Tooltip, {
                    formatter: v => [`${v}%`, ""],
                    contentStyle: {
                      fontSize: 11,
                      borderRadius: 8
                    }
                  })]
                })
              }), /*#__PURE__*/_jsx("div", {
                className: "space-y-2 mt-1",
                children: MGMT_STATUS_PIE.map(s => /*#__PURE__*/_jsxs("div", {
                  className: "flex items-center justify-between",
                  children: [/*#__PURE__*/_jsxs("div", {
                    className: "flex items-center gap-2",
                    children: [/*#__PURE__*/_jsx("div", {
                      className: "w-2.5 h-2.5 rounded-sm flex-shrink-0",
                      style: {
                        background: s.color
                      }
                    }), /*#__PURE__*/_jsx("span", {
                      className: "text-xs text-foreground",
                      children: s.name
                    })]
                  }), /*#__PURE__*/_jsxs("span", {
                    className: "text-xs font-mono font-semibold text-foreground",
                    children: [s.value, "%"]
                  })]
                }, s.name))
              })]
            })]
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "bg-card border border-border rounded-xl overflow-hidden",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "px-5 py-3.5 border-b border-border",
            children: [/*#__PURE__*/_jsx("p", {
              className: "text-sm font-semibold text-foreground",
              children: "Recent Activities"
            }), /*#__PURE__*/_jsx("p", {
              className: "text-xs text-muted-foreground",
              children: "Latest renewal actions across all contracts"
            })]
          }), /*#__PURE__*/_jsx("div", {
            className: "grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border",
            children: MGMT_ACTIVITIES.map((a, i) => /*#__PURE__*/_jsxs("div", {
              className: `px-5 py-4 flex gap-3 hover:bg-muted/40 transition-colors ${i > 0 && i % 2 === 0 ? "md:col-span-2 border-t border-border" : ""}`,
              children: [/*#__PURE__*/_jsx("div", {
                className: `w-8 h-8 rounded-lg ${a.bg} flex items-center justify-center flex-shrink-0 mt-0.5`,
                children: /*#__PURE__*/_jsx(a.icon, {
                  size: 13,
                  className: a.color
                })
              }), /*#__PURE__*/_jsxs("div", {
                className: "flex-1 min-w-0",
                children: [/*#__PURE__*/_jsx("p", {
                  className: "text-xs font-semibold text-foreground leading-snug",
                  children: a.text
                }), /*#__PURE__*/_jsx("p", {
                  className: "text-xs text-muted-foreground mt-0.5",
                  children: a.sub
                }), /*#__PURE__*/_jsx("p", {
                  className: "text-xs text-muted-foreground mt-0.5 font-mono",
                  children: a.time
                })]
              })]
            }, i))
          })]
        })]
      })]
    })]
  });
}

// ── Reports & Export (v2) ──────────────────────────────────────────────────

// ── Mock data ──
const RPT_CONTRACT_TABLE = [{
  id: "CTR-2024-001",
  name: "Master Services Agreement — Accenture LLP",
  vendor: "Accenture LLP",
  dept: "Legal",
  start: "Jan 15, 2024",
  end: "Jan 14, 2026",
  status: "Active"
}, {
  id: "CTR-2024-002",
  name: "Executive Employment Agreement — J. Whitfield",
  vendor: "James Whitfield",
  dept: "HR",
  start: "Mar 1, 2024",
  end: "Feb 28, 2026",
  status: "Active"
}, {
  id: "CTR-2024-003",
  name: "Commercial Lease — HQ Tower A, Floors 12–15",
  vendor: "Metropolitan REIT Corp.",
  dept: "Operations",
  start: "Jun 1, 2022",
  end: "May 31, 2024",
  status: "Expired"
}, {
  id: "CTR-2024-004",
  name: "Enterprise SaaS License — Salesforce CRM",
  vendor: "Salesforce Inc.",
  dept: "IT",
  start: "Jan 1, 2024",
  end: "Dec 31, 2024",
  status: "Active"
}, {
  id: "CTR-2024-005",
  name: "Mutual NDA — TechVenture Group",
  vendor: "TechVenture Group LLC",
  dept: "Legal",
  start: "Apr 10, 2024",
  end: "Apr 9, 2025",
  status: "Active"
}, {
  id: "CTR-2024-006",
  name: "APAC Distribution Agreement",
  vendor: "Pacific Trade Co. Ltd.",
  dept: "Procurement",
  start: "Jul 1, 2023",
  end: "Jun 30, 2024",
  status: "Expiring"
}, {
  id: "CTR-2024-007",
  name: "Legal Advisory Consulting Agreement",
  vendor: "Morrison & Foerster LLP",
  dept: "Legal",
  start: "Feb 15, 2024",
  end: "Aug 14, 2024",
  status: "Active"
}, {
  id: "CTR-2024-008",
  name: "GDPR Data Processing Agreement",
  vendor: "EU Partners Consortium",
  dept: "Compliance",
  start: "Jan 1, 2024",
  end: "Dec 31, 2025",
  status: "Active"
}];
const RPT_COMPLIANCE_TABLE = [{
  obligation: "Q2 Compliance Report Submission",
  due: "Jun 30, 2024",
  assignee: "Sarah Chen",
  initials: "SC",
  status: "In Progress",
  completed: ""
}, {
  obligation: "Annual Insurance Certificate Renewal",
  due: "May 15, 2024",
  assignee: "Lisa Torres",
  initials: "LT",
  status: "Overdue",
  completed: ""
}, {
  obligation: "GDPR Data Audit Completion",
  due: "Jul 1, 2024",
  assignee: "David Park",
  initials: "DP",
  status: "Pending",
  completed: ""
}, {
  obligation: "APAC Vendor Performance Review",
  due: "Jun 15, 2024",
  assignee: "James Lee",
  initials: "JL",
  status: "In Progress",
  completed: ""
}, {
  obligation: "Q2 Lease Payment — Metropolitan REIT",
  due: "Jun 1, 2024",
  assignee: "Lisa Torres",
  initials: "LT",
  status: "Completed",
  completed: "Jun 1, 2024"
}, {
  obligation: "Marketing Campaign Legal Review",
  due: "Jun 20, 2024",
  assignee: "Sarah Chen",
  initials: "SC",
  status: "Completed",
  completed: "Jun 18, 2024"
}];
const RPT_RENEWAL_TABLE = [{
  contract: "Commercial Lease — HQ Tower A",
  vendor: "Metropolitan REIT",
  renewal: "May 31, 2024",
  reminder: "Yes",
  status: "Expired",
  priority: "Critical"
}, {
  contract: "APAC Distribution Agreement",
  vendor: "Pacific Trade Co.",
  renewal: "Jun 30, 2024",
  reminder: "Yes",
  status: "Due Soon",
  priority: "High"
}, {
  contract: "Enterprise SaaS — Salesforce",
  vendor: "Salesforce Inc.",
  renewal: "Dec 31, 2024",
  reminder: "Pending",
  status: "Upcoming",
  priority: "Medium"
}, {
  contract: "Marketing Agency Retainer",
  vendor: "Ogilvy & Mather",
  renewal: "Dec 31, 2024",
  reminder: "Pending",
  status: "Upcoming",
  priority: "Medium"
}, {
  contract: "Mutual NDA — TechVenture Group",
  vendor: "TechVenture Group",
  renewal: "Apr 9, 2025",
  reminder: "No",
  status: "Upcoming",
  priority: "Low"
}];
const RPT_OBLIGATION_TABLE = [{
  id: "OBL-001",
  desc: "Q2 Compliance Report Submission",
  assignee: "Sarah Chen",
  due: "Jun 30, 2024",
  priority: "High",
  status: "In Progress"
}, {
  id: "OBL-002",
  desc: "Annual Insurance Certificate Renewal",
  assignee: "Lisa Torres",
  due: "May 15, 2024",
  priority: "Critical",
  status: "Overdue"
}, {
  id: "OBL-003",
  desc: "GDPR Data Audit Completion",
  assignee: "David Park",
  due: "Jul 1, 2024",
  priority: "High",
  status: "Pending"
}, {
  id: "OBL-004",
  desc: "APAC Vendor Performance Review",
  assignee: "James Lee",
  due: "Jun 15, 2024",
  priority: "Medium",
  status: "In Progress"
}, {
  id: "OBL-005",
  desc: "Q2 Lease Payment — Metropolitan REIT",
  assignee: "Lisa Torres",
  due: "Jun 1, 2024",
  priority: "Critical",
  status: "Completed"
}, {
  id: "OBL-006",
  desc: "Marketing Campaign Legal Review",
  assignee: "Sarah Chen",
  due: "Jun 20, 2024",
  priority: "Low",
  status: "Completed"
}];
const RPT_AUDIT_TABLE = [{
  ts: "Jun 3, 2024 10:14 AM",
  user: "Sarah Chen",
  module: "Contracts",
  action: "Created",
  prev: "—",
  updated: "NDA — TechVenture Group",
  ip: "192.168.1.42"
}, {
  ts: "Jun 3, 2024 09:52 AM",
  user: "David Park",
  module: "Compliance",
  action: "Updated",
  prev: "Pending",
  updated: "In Progress",
  ip: "192.168.1.55"
}, {
  ts: "Jun 3, 2024 09:31 AM",
  user: "Lisa Torres",
  module: "Renewals",
  action: "Submitted",
  prev: "Draft",
  updated: "Submitted",
  ip: "10.0.0.12"
}, {
  ts: "Jun 2, 2024 04:10 PM",
  user: "Mark Johnson",
  module: "Obligations",
  action: "Completed",
  prev: "In Progress",
  updated: "Completed",
  ip: "192.168.1.33"
}, {
  ts: "Jun 2, 2024 02:45 PM",
  user: "James Lee",
  module: "Auth",
  action: "Login",
  prev: "—",
  updated: "Session started",
  ip: "10.0.0.44"
}, {
  ts: "Jun 1, 2024 11:20 AM",
  user: "Alexandra Ross",
  module: "Users",
  action: "Provisioned",
  prev: "—",
  updated: "James Lee account created",
  ip: "192.168.1.1"
}, {
  ts: "Jun 1, 2024 10:05 AM",
  user: "Sarah Chen",
  module: "Contracts",
  action: "Flagged",
  prev: "Active",
  updated: "Under Review",
  ip: "192.168.1.42"
}];
const RPT_RECENT_REPORTS = [{
  name: "Q2 Contract Summary Report",
  type: "Contract",
  by: "Sarah Chen",
  date: "Jun 3, 2024",
  fmt: "PDF"
}, {
  name: "Monthly Compliance Dashboard",
  type: "Compliance",
  by: "David Park",
  date: "Jun 2, 2024",
  fmt: "Excel"
}, {
  name: "Renewal Risk Assessment",
  type: "Renewal",
  by: "Lisa Torres",
  date: "Jun 1, 2024",
  fmt: "PDF"
}, {
  name: "Obligation Tracker Export",
  type: "Obligation",
  by: "Mark Johnson",
  date: "May 31, 2024",
  fmt: "Excel"
}, {
  name: "Full Audit Trail — May 2024",
  type: "Audit",
  by: "Alexandra Ross",
  date: "May 30, 2024",
  fmt: "PDF"
}, {
  name: "Vendor Contract Portfolio",
  type: "Contract",
  by: "Sarah Chen",
  date: "May 28, 2024",
  fmt: "Excel"
}];
const RPT_CONTRACT_STATUS_PIE = [{
  name: "Active",
  value: 62,
  color: "#10B981"
}, {
  name: "Expiring",
  value: 14,
  color: "#F59E0B"
}, {
  name: "Expired",
  value: 12,
  color: "#EF4444"
}, {
  name: "Terminated",
  value: 8,
  color: "#6B7280"
}, {
  name: "Draft",
  value: 4,
  color: "#3B82F6"
}];
const RPT_DEPT_BAR = [{
  dept: "Legal",
  count: 28
}, {
  dept: "IT",
  count: 22
}, {
  dept: "Procurement",
  count: 18
}, {
  dept: "HR",
  count: 14
}, {
  dept: "Operations",
  count: 11
}, {
  dept: "Compliance",
  count: 9
}, {
  dept: "Finance",
  count: 7
}];
const RPT_COMPLIANCE_TREND = [{
  month: "Jan",
  rate: 91
}, {
  month: "Feb",
  rate: 88
}, {
  month: "Mar",
  rate: 93
}, {
  month: "Apr",
  rate: 87
}, {
  month: "May",
  rate: 95
}, {
  month: "Jun",
  rate: 92
}];
const RPT_RENEWAL_MONTHLY = [{
  month: "Jan",
  count: 6
}, {
  month: "Feb",
  count: 9
}, {
  month: "Mar",
  count: 7
}, {
  month: "Apr",
  count: 12
}, {
  month: "May",
  count: 8
}, {
  month: "Jun",
  count: 11
}];
const RPT_OBL_DONUT = [{
  name: "Completed",
  value: 58,
  color: "#10B981"
}, {
  name: "In Progress",
  value: 22,
  color: "#3B82F6"
}, {
  name: "Pending",
  value: 14,
  color: "#F59E0B"
}, {
  name: "Overdue",
  value: 6,
  color: "#EF4444"
}];
const RPT_AUDIT_DAILY = [{
  day: "Mon",
  actions: 24
}, {
  day: "Tue",
  actions: 31
}, {
  day: "Wed",
  actions: 18
}, {
  day: "Thu",
  actions: 42
}, {
  day: "Fri",
  actions: 37
}, {
  day: "Sat",
  actions: 9
}, {
  day: "Sun",
  actions: 5
}];
function RBadge({
  role
}) {
  const map = {
    Admin: "bg-violet-100 text-violet-700 border-violet-200",
    Manager: "bg-blue-100 text-blue-700 border-blue-200",
    "Legal Officer": "bg-emerald-100 text-emerald-700 border-emerald-200",
    Auditor: "bg-amber-100 text-amber-700 border-amber-200",
    Employee: "bg-slate-100 text-slate-600 border-slate-200"
  };
  return /*#__PURE__*/_jsxs("span", {
    className: `inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold border ${map[role] || "bg-slate-100 text-slate-600 border-slate-200"}`,
    children: [/*#__PURE__*/_jsx(UserCog, {
      size: 9
    }), " ", role]
  });
}
function ComplianceStatusDot({
  status
}) {
  const colors = {
    Completed: "bg-emerald-500",
    "In Progress": "bg-blue-500",
    Pending: "bg-amber-500",
    Overdue: "bg-red-500"
  };
  return /*#__PURE__*/_jsx("span", {
    className: `inline-block w-2 h-2 rounded-full flex-shrink-0 ${colors[status] || "bg-slate-400"}`
  });
}
function PermCheck({
  on
}) {
  return on ? /*#__PURE__*/_jsx(CheckCircle2, {
    size: 13,
    className: "text-emerald-500 mx-auto"
  }) : /*#__PURE__*/_jsx(X, {
    size: 13,
    className: "text-muted-foreground mx-auto opacity-40"
  });
}
function ReportsExportScreen() {
  const [activeTab, setActiveTab] = useState("contracts");
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("2024-01-01");
  const [dateTo, setDateTo] = useState("2024-12-31");
  const [filterOpen, setFilterOpen] = useState(true);
  const [toast, setToast] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterDept, setFilterDept] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [filterVendor, setFilterVendor] = useState("All");
  const [filterUser, setFilterUser] = useState("All");
  const [filterRenewal, setFilterRenewal] = useState("All");
  const [filterCompliance, setFilterCompliance] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [pdfOpts, setPdfOpts] = useState({
    charts: true,
    stats: true,
    logo: true,
    header: true,
    pages: true,
    meta: false
  });
  const [xlsOpts, setXlsOpts] = useState({
    full: true,
    multi: true,
    format: true,
    auto: true,
    pivot: true,
    filtered: false
  });
  const showToast = (msg, type = "success") => {
    setToast({
      msg,
      type
    });
    setTimeout(() => setToast(null), 3500);
  };
  const clearFilters = () => {
    setFilterStatus("All");
    setFilterDept("All");
    setFilterPriority("All");
    setFilterVendor("All");
    setFilterUser("All");
    setFilterRenewal("All");
    showToast("All filters cleared.");
  };
  const TABS = [{
    id: "contracts",
    label: "Contract Reports",
    icon: FileText,
    count: "147"
  }, {
    id: "compliance",
    label: "Compliance Reports",
    icon: ShieldCheck,
    count: "92%"
  }, {
    id: "renewals",
    label: "Renewal Reports",
    icon: CalendarCheck,
    count: "24"
  }, {
    id: "obligations",
    label: "Obligation Reports",
    icon: ClipboardList,
    count: "63"
  }, {
    id: "audit",
    label: "Audit Reports",
    icon: Database,
    count: "2.8k"
  }];
  const kpis = [{
    title: "Total Contracts",
    value: "147",
    delta: "+12 this month",
    positive: true,
    icon: FileText,
    bg: "bg-blue-600",
    sub: "Across 7 departments"
  }, {
    title: "Active Obligations",
    value: "63",
    delta: "+5 new this week",
    positive: true,
    icon: ClipboardCheck,
    bg: "bg-emerald-500",
    sub: "58 completed YTD"
  }, {
    title: "Upcoming Renewals",
    value: "24",
    delta: "7 critical ⚠",
    positive: false,
    icon: CalendarClock,
    bg: "bg-amber-500",
    sub: "3 due this week"
  }, {
    title: "Compliance Rate",
    value: "92%",
    delta: "+3% vs last month",
    positive: true,
    icon: ShieldCheck,
    bg: "bg-violet-500",
    sub: "Target: 95%"
  }, {
    title: "Pending Audits",
    value: "8",
    delta: "2 overdue",
    positive: false,
    icon: AlertTriangle,
    bg: "bg-red-500",
    sub: "Last audit: Jun 1"
  }, {
    title: "Reports Generated",
    value: "341",
    delta: "+28 this week",
    positive: true,
    icon: FileBarChart,
    bg: "bg-cyan-600",
    sub: "PDF: 198 · XLS: 143"
  }];
  const selectCls = "w-full px-2.5 py-1.5 bg-input-background border border-border rounded-lg text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary";
  const inputCls = "px-3 py-1.5 bg-input-background border border-border rounded-lg text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary";
  const contractStatusColor = {
    Active: "success",
    Expiring: "warning",
    Expired: "danger",
    Terminated: "neutral",
    Draft: "info"
  };
  const complianceStatusColor = {
    Completed: "success",
    "In Progress": "info",
    Pending: "warning",
    Overdue: "danger"
  };
  const renewalStatusColor = {
    "Due Soon": "orange",
    Upcoming: "warning",
    Expired: "danger",
    Renewed: "success"
  };
  const obligationStatusColor = {
    Completed: "success",
    "In Progress": "info",
    Pending: "warning",
    Overdue: "danger"
  };
  const priorityColor = {
    Critical: "danger",
    High: "warning",
    Medium: "info",
    Low: "neutral"
  };
  const SectionTitle = ({
    icon: Icon,
    title,
    subtitle,
    children
  }) => /*#__PURE__*/_jsxs("div", {
    className: "flex items-center justify-between mb-4",
    children: [/*#__PURE__*/_jsxs("div", {
      className: "flex items-center gap-2.5",
      children: [/*#__PURE__*/_jsx("div", {
        className: "p-1.5 bg-primary/10 rounded-lg",
        children: /*#__PURE__*/_jsx(Icon, {
          size: 14,
          className: "text-primary"
        })
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("p", {
          className: "text-sm font-bold text-foreground",
          children: title
        }), subtitle && /*#__PURE__*/_jsx("p", {
          className: "text-xs text-muted-foreground",
          children: subtitle
        })]
      })]
    }), children]
  });
  const ExportBtns = ({
    label
  }) => /*#__PURE__*/_jsxs("div", {
    className: "flex gap-2",
    children: [/*#__PURE__*/_jsxs("button", {
      onClick: () => showToast(`${label} PDF export started.`),
      className: "flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700 transition-colors",
      children: [/*#__PURE__*/_jsx(Printer, {
        size: 11
      }), " PDF"]
    }), /*#__PURE__*/_jsxs("button", {
      onClick: () => showToast(`${label} Excel export started.`),
      className: "flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 transition-colors",
      children: [/*#__PURE__*/_jsx(Table2, {
        size: 11
      }), " Excel"]
    })]
  });
  const applyFilters = () => showToast("Filters applied successfully.");
  const resetFilters = () => {
    setFilterStatus("All");
    setFilterDept("All");
    setFilterPriority("All");
    setFilterVendor("All");
    setFilterUser("All");
    setFilterRenewal("All");
    setFilterCompliance("All");
    setFilterType("All");
    showToast("All filters cleared.");
  };
  const sl = "w-full px-2.5 py-1.5 bg-input-background border border-border rounded-lg text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary";
  const FilterSidebar = () => /*#__PURE__*/_jsxs("div", {
    className: "w-56 flex-shrink-0 bg-card border-r border-border flex flex-col overflow-y-auto",
    children: [/*#__PURE__*/_jsxs("div", {
      className: "flex items-center justify-between px-4 py-3.5 border-b border-border",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "flex items-center gap-2",
        children: [/*#__PURE__*/_jsx(Filter, {
          size: 13,
          className: "text-primary"
        }), /*#__PURE__*/_jsx("p", {
          className: "text-xs font-bold text-foreground uppercase tracking-wide",
          children: "Filters"
        })]
      }), /*#__PURE__*/_jsx("button", {
        onClick: () => setFilterOpen(false),
        className: "text-muted-foreground hover:text-foreground transition-colors",
        children: /*#__PURE__*/_jsx(X, {
          size: 13
        })
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "flex-1 px-4 py-4 space-y-4 overflow-y-auto",
      children: [/*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("p", {
          className: "text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2",
          children: "Date Range"
        }), /*#__PURE__*/_jsxs("div", {
          className: "space-y-1.5",
          children: [/*#__PURE__*/_jsx("input", {
            type: "date",
            value: dateFrom,
            onChange: e => setDateFrom(e.target.value),
            className: sl
          }), /*#__PURE__*/_jsx("input", {
            type: "date",
            value: dateTo,
            onChange: e => setDateTo(e.target.value),
            className: sl
          })]
        })]
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("p", {
          className: "text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2",
          children: "Contract Status"
        }), /*#__PURE__*/_jsx("select", {
          value: filterStatus,
          onChange: e => setFilterStatus(e.target.value),
          className: sl,
          children: ["All", "Active", "Expiring", "Expired", "Terminated", "Draft"].map(o => /*#__PURE__*/_jsx("option", {
            children: o
          }, o))
        })]
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("p", {
          className: "text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2",
          children: "Vendor"
        }), /*#__PURE__*/_jsx("select", {
          value: filterVendor,
          onChange: e => setFilterVendor(e.target.value),
          className: sl,
          children: ["All", "Salesforce Inc.", "Accenture LLP", "Pacific Trade Co.", "Ogilvy & Mather", "EU Partners"].map(o => /*#__PURE__*/_jsx("option", {
            children: o
          }, o))
        })]
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("p", {
          className: "text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2",
          children: "Department"
        }), /*#__PURE__*/_jsx("select", {
          value: filterDept,
          onChange: e => setFilterDept(e.target.value),
          className: sl,
          children: ["All", "Legal", "IT", "HR", "Operations", "Compliance", "Procurement", "Finance"].map(o => /*#__PURE__*/_jsx("option", {
            children: o
          }, o))
        })]
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("p", {
          className: "text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2",
          children: "Priority"
        }), /*#__PURE__*/_jsx("select", {
          value: filterPriority,
          onChange: e => setFilterPriority(e.target.value),
          className: sl,
          children: ["All", "Critical", "High", "Medium", "Low"].map(o => /*#__PURE__*/_jsx("option", {
            children: o
          }, o))
        })]
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("p", {
          className: "text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2",
          children: "Compliance Status"
        }), /*#__PURE__*/_jsx("select", {
          value: filterCompliance,
          onChange: e => setFilterCompliance(e.target.value),
          className: sl,
          children: ["All", "Completed", "Pending", "Overdue", "Missing Docs"].map(o => /*#__PURE__*/_jsx("option", {
            children: o
          }, o))
        })]
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("p", {
          className: "text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2",
          children: "Renewal Status"
        }), /*#__PURE__*/_jsx("select", {
          value: filterRenewal,
          onChange: e => setFilterRenewal(e.target.value),
          className: sl,
          children: ["All", "Upcoming", "Due Soon", "Renewed", "Expired"].map(o => /*#__PURE__*/_jsx("option", {
            children: o
          }, o))
        })]
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("p", {
          className: "text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2",
          children: "Assigned User"
        }), /*#__PURE__*/_jsx("select", {
          value: filterUser,
          onChange: e => setFilterUser(e.target.value),
          className: sl,
          children: ["All", "Sarah Chen", "David Park", "Lisa Torres", "Mark Johnson", "James Lee"].map(o => /*#__PURE__*/_jsx("option", {
            children: o
          }, o))
        })]
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("p", {
          className: "text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2",
          children: "Report Type"
        }), /*#__PURE__*/_jsx("select", {
          value: filterType,
          onChange: e => setFilterType(e.target.value),
          className: sl,
          children: ["All", "Contract", "Compliance", "Renewal", "Obligation", "Audit"].map(o => /*#__PURE__*/_jsx("option", {
            children: o
          }, o))
        })]
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "px-4 py-4 border-t border-border space-y-2 flex-shrink-0",
      children: [/*#__PURE__*/_jsx("button", {
        onClick: applyFilters,
        className: "w-full py-2 bg-primary text-primary-foreground rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors",
        children: "Apply Filters"
      }), /*#__PURE__*/_jsx("button", {
        onClick: resetFilters,
        className: "w-full py-2 border border-border rounded-lg text-xs font-medium text-foreground hover:bg-muted transition-colors",
        children: "Clear All Filters"
      })]
    })]
  });
  return /*#__PURE__*/_jsxs("div", {
    className: "flex flex-col h-full overflow-hidden",
    children: [toast && /*#__PURE__*/_jsxs("div", {
      className: `fixed top-4 right-4 z-50 text-white text-xs font-medium px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2 ${toast.type === "success" ? "bg-emerald-600" : "bg-red-600"}`,
      children: [toast.type === "success" ? /*#__PURE__*/_jsx(CheckCircle2, {
        size: 13
      }) : /*#__PURE__*/_jsx(XCircle, {
        size: 13
      }), " ", toast.msg]
    }), /*#__PURE__*/_jsxs("div", {
      className: "bg-card border-b border-border px-6 pt-5 pb-0 flex-shrink-0",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between mb-4",
        children: [/*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx("h1", {
            className: "text-xl font-bold text-foreground",
            style: {
              fontFamily: "var(--font-display)"
            },
            children: "Reports & Export"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground mt-0.5",
            children: "Contract · Compliance · Renewal · Obligation · Audit — all reports in one place"
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "flex items-center gap-2 flex-wrap",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "relative",
            children: [/*#__PURE__*/_jsx(Search, {
              size: 13,
              className: "absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            }), /*#__PURE__*/_jsx("input", {
              value: search,
              onChange: e => setSearch(e.target.value),
              placeholder: "Search reports…",
              className: "pl-8 pr-3 py-1.5 bg-input-background border border-border rounded-lg text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 w-44"
            })]
          }), /*#__PURE__*/_jsxs("button", {
            onClick: () => setFilterOpen(f => !f),
            className: `flex items-center gap-1.5 px-3 py-1.5 border rounded-lg text-xs font-medium transition-colors ${filterOpen ? "border-primary text-primary bg-blue-50" : "border-border text-foreground hover:bg-muted"}`,
            children: [/*#__PURE__*/_jsx(Filter, {
              size: 12
            }), " ", filterOpen ? "Hide Filters" : "Show Filters"]
          }), /*#__PURE__*/_jsxs("button", {
            onClick: () => showToast("Data refreshed successfully."),
            className: "flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-lg text-xs font-medium text-foreground hover:bg-muted transition-colors",
            children: [/*#__PURE__*/_jsx(RefreshCw, {
              size: 12
            }), " Refresh"]
          }), /*#__PURE__*/_jsxs("button", {
            onClick: () => showToast("Generating PDF… download starts shortly."),
            className: "flex items-center gap-1.5 px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700 transition-colors shadow-sm",
            children: [/*#__PURE__*/_jsx(Printer, {
              size: 13
            }), " Export as PDF"]
          }), /*#__PURE__*/_jsxs("button", {
            onClick: () => showToast("Generating Excel… download starts shortly."),
            className: "flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors shadow-sm",
            children: [/*#__PURE__*/_jsx(Table2, {
              size: 13
            }), " Export as Excel"]
          })]
        })]
      }), /*#__PURE__*/_jsx("div", {
        className: "flex items-center gap-0 overflow-x-auto",
        children: TABS.map(tab => /*#__PURE__*/_jsxs("button", {
          onClick: () => setActiveTab(tab.id),
          className: `flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${activeTab === tab.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`,
          children: [/*#__PURE__*/_jsx(tab.icon, {
            size: 13
          }), tab.label, /*#__PURE__*/_jsx("span", {
            className: `ml-1 text-[10px] font-mono px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`,
            children: tab.count
          })]
        }, tab.id))
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "flex flex-1 overflow-hidden",
      children: [filterOpen && /*#__PURE__*/_jsx(FilterSidebar, {}), /*#__PURE__*/_jsx("div", {
        className: "flex-1 overflow-y-auto",
        children: /*#__PURE__*/_jsxs("div", {
          className: "p-5 space-y-5 max-w-[1440px] mx-auto",
          children: [/*#__PURE__*/_jsx("div", {
            className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4",
            children: kpis.map(k => /*#__PURE__*/_jsxs("div", {
              className: "bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "flex items-start justify-between mb-3",
                children: [/*#__PURE__*/_jsx("div", {
                  className: `p-2 rounded-lg ${k.bg}`,
                  children: /*#__PURE__*/_jsx(k.icon, {
                    size: 14,
                    className: "text-white"
                  })
                }), /*#__PURE__*/_jsxs("span", {
                  className: `text-xs font-medium flex items-center gap-0.5 ${k.positive ? "text-emerald-600" : "text-red-500"}`,
                  children: [k.positive ? /*#__PURE__*/_jsx(TrendingUp, {
                    size: 10
                  }) : /*#__PURE__*/_jsx(TrendingDown, {
                    size: 10
                  }), " ", k.delta]
                })]
              }), /*#__PURE__*/_jsx("p", {
                className: "text-2xl font-bold text-foreground font-mono mb-0.5",
                children: k.value
              }), /*#__PURE__*/_jsx("p", {
                className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wide leading-snug",
                children: k.title
              }), /*#__PURE__*/_jsx("p", {
                className: "text-[10px] text-muted-foreground mt-0.5",
                children: k.sub
              })]
            }, k.title))
          }), /*#__PURE__*/_jsxs("div", {
            className: "bg-card border border-border rounded-xl px-5 py-3.5 flex items-center justify-between flex-wrap gap-3",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "flex items-center gap-2",
              children: [/*#__PURE__*/_jsx(Shield, {
                size: 13,
                className: "text-muted-foreground"
              }), /*#__PURE__*/_jsx("p", {
                className: "text-xs font-semibold text-foreground",
                children: "Role-Based Report Access"
              }), /*#__PURE__*/_jsxs("p", {
                className: "text-xs text-muted-foreground",
                children: ["Your current access level: ", /*#__PURE__*/_jsx("span", {
                  className: "font-semibold text-primary",
                  children: "Legal Manager"
                })]
              })]
            }), /*#__PURE__*/_jsx("div", {
              className: "flex items-center gap-2 flex-wrap",
              children: [{
                role: "Admin",
                desc: "Full access"
              }, {
                role: "Manager",
                desc: "Department reports"
              }, {
                role: "Legal Officer",
                desc: "Contract + Compliance"
              }, {
                role: "Auditor",
                desc: "Read-only audit"
              }, {
                role: "Employee",
                desc: "Assigned contracts"
              }].map(r => /*#__PURE__*/_jsxs("div", {
                className: "flex items-center gap-1.5",
                children: [/*#__PURE__*/_jsx(RBadge, {
                  role: r.role
                }), /*#__PURE__*/_jsx("span", {
                  className: "text-[10px] text-muted-foreground hidden xl:block",
                  children: r.desc
                })]
              }, r.role))
            })]
          }), activeTab === "contracts" && /*#__PURE__*/_jsxs("div", {
            className: "space-y-5",
            children: [/*#__PURE__*/_jsx("div", {
              className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4",
              children: [{
                label: "Total Contracts",
                value: "147",
                color: "text-blue-600",
                bg: "bg-blue-50"
              }, {
                label: "Active",
                value: "91",
                color: "text-emerald-600",
                bg: "bg-emerald-50"
              }, {
                label: "Expiring Soon",
                value: "21",
                color: "text-amber-600",
                bg: "bg-amber-50"
              }, {
                label: "Expired",
                value: "18",
                color: "text-red-600",
                bg: "bg-red-50"
              }, {
                label: "Terminated",
                value: "12",
                color: "text-slate-600",
                bg: "bg-slate-50"
              }, {
                label: "Draft",
                value: "5",
                color: "text-violet-600",
                bg: "bg-violet-50"
              }].map(s => /*#__PURE__*/_jsxs("div", {
                className: `${s.bg} border border-border rounded-xl p-4`,
                children: [/*#__PURE__*/_jsx("p", {
                  className: `text-2xl font-bold font-mono ${s.color}`,
                  children: s.value
                }), /*#__PURE__*/_jsx("p", {
                  className: "text-xs text-muted-foreground mt-0.5",
                  children: s.label
                })]
              }, s.label))
            }), /*#__PURE__*/_jsxs("div", {
              className: "grid grid-cols-1 xl:grid-cols-5 gap-5",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "xl:col-span-2 bg-card border border-border rounded-xl overflow-hidden",
                children: [/*#__PURE__*/_jsxs("div", {
                  className: "px-5 py-3.5 border-b border-border",
                  children: [/*#__PURE__*/_jsx("p", {
                    className: "text-sm font-semibold text-foreground",
                    children: "Contract Status Distribution"
                  }), /*#__PURE__*/_jsx("p", {
                    className: "text-xs text-muted-foreground",
                    children: "Portfolio breakdown by current status"
                  })]
                }), /*#__PURE__*/_jsxs("div", {
                  className: "p-5",
                  children: [/*#__PURE__*/_jsx(ResponsiveContainer, {
                    width: "100%",
                    height: 180,
                    children: /*#__PURE__*/_jsxs(PieChart, {
                      children: [/*#__PURE__*/_jsx(Pie, {
                        data: RPT_CONTRACT_STATUS_PIE,
                        cx: "50%",
                        cy: "50%",
                        innerRadius: 50,
                        outerRadius: 80,
                        paddingAngle: 3,
                        dataKey: "value",
                        children: RPT_CONTRACT_STATUS_PIE.map(e => /*#__PURE__*/_jsx(Cell, {
                          fill: e.color
                        }, `rcspie-${e.name}`))
                      }), /*#__PURE__*/_jsx(Tooltip, {
                        formatter: v => [`${v}%`, ""],
                        contentStyle: {
                          fontSize: 11,
                          borderRadius: 8,
                          border: "1px solid #e2e8f0"
                        }
                      })]
                    })
                  }), /*#__PURE__*/_jsx("div", {
                    className: "grid grid-cols-2 gap-x-4 gap-y-2 mt-2",
                    children: RPT_CONTRACT_STATUS_PIE.map(s => /*#__PURE__*/_jsxs("div", {
                      className: "flex items-center justify-between",
                      children: [/*#__PURE__*/_jsxs("div", {
                        className: "flex items-center gap-1.5",
                        children: [/*#__PURE__*/_jsx("div", {
                          className: "w-2.5 h-2.5 rounded-sm",
                          style: {
                            background: s.color
                          }
                        }), /*#__PURE__*/_jsx("span", {
                          className: "text-xs text-foreground",
                          children: s.name
                        })]
                      }), /*#__PURE__*/_jsxs("span", {
                        className: "text-xs font-mono font-bold text-foreground",
                        children: [s.value, "%"]
                      })]
                    }, s.name))
                  })]
                })]
              }), /*#__PURE__*/_jsxs("div", {
                className: "xl:col-span-3 bg-card border border-border rounded-xl overflow-hidden",
                children: [/*#__PURE__*/_jsxs("div", {
                  className: "px-5 py-3.5 border-b border-border",
                  children: [/*#__PURE__*/_jsx("p", {
                    className: "text-sm font-semibold text-foreground",
                    children: "Department-wise Contracts"
                  }), /*#__PURE__*/_jsx("p", {
                    className: "text-xs text-muted-foreground",
                    children: "Contract count by department"
                  })]
                }), /*#__PURE__*/_jsx("div", {
                  className: "p-5",
                  children: /*#__PURE__*/_jsx(ResponsiveContainer, {
                    width: "100%",
                    height: 200,
                    children: /*#__PURE__*/_jsxs(BarChart, {
                      data: RPT_DEPT_BAR,
                      barSize: 22,
                      children: [/*#__PURE__*/_jsx(CartesianGrid, {
                        strokeDasharray: "3 3",
                        stroke: "rgba(15,23,42,0.06)",
                        vertical: false
                      }), /*#__PURE__*/_jsx(XAxis, {
                        dataKey: "dept",
                        tick: {
                          fontSize: 10,
                          fill: "#64748B"
                        },
                        axisLine: false,
                        tickLine: false
                      }), /*#__PURE__*/_jsx(YAxis, {
                        tick: {
                          fontSize: 10,
                          fill: "#64748B"
                        },
                        axisLine: false,
                        tickLine: false
                      }), /*#__PURE__*/_jsx(Tooltip, {
                        contentStyle: {
                          fontSize: 11,
                          borderRadius: 8,
                          border: "1px solid #e2e8f0"
                        }
                      }), /*#__PURE__*/_jsx(Bar, {
                        dataKey: "count",
                        fill: "#1D4ED8",
                        radius: [4, 4, 0, 0],
                        name: "Contracts"
                      })]
                    })
                  })
                })]
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "bg-card border border-border rounded-xl overflow-hidden",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "flex items-center justify-between px-5 py-3.5 border-b border-border",
                children: [/*#__PURE__*/_jsxs("div", {
                  children: [/*#__PURE__*/_jsx("p", {
                    className: "text-sm font-semibold text-foreground",
                    children: "Contract Data Table"
                  }), /*#__PURE__*/_jsxs("p", {
                    className: "text-xs text-muted-foreground",
                    children: [RPT_CONTRACT_TABLE.length, " contracts · Filtered by date range"]
                  })]
                }), /*#__PURE__*/_jsxs("div", {
                  className: "flex gap-2",
                  children: [/*#__PURE__*/_jsxs("button", {
                    onClick: () => showToast("PDF report generated."),
                    className: "flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700 transition-colors",
                    children: [/*#__PURE__*/_jsx(Printer, {
                      size: 11
                    }), " PDF"]
                  }), /*#__PURE__*/_jsxs("button", {
                    onClick: () => showToast("Excel export ready."),
                    className: "flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 transition-colors",
                    children: [/*#__PURE__*/_jsx(Table2, {
                      size: 11
                    }), " Excel"]
                  })]
                })]
              }), /*#__PURE__*/_jsx("div", {
                className: "overflow-x-auto",
                children: /*#__PURE__*/_jsxs("table", {
                  className: "w-full text-xs",
                  children: [/*#__PURE__*/_jsx("thead", {
                    children: /*#__PURE__*/_jsx("tr", {
                      className: "border-b border-border bg-muted",
                      children: ["Contract ID", "Contract Name", "Vendor", "Department", "Start Date", "End Date", "Status", "Actions"].map(h => /*#__PURE__*/_jsx("th", {
                        className: "text-left px-4 py-3 text-muted-foreground font-semibold uppercase tracking-wide whitespace-nowrap",
                        children: h
                      }, h))
                    })
                  }), /*#__PURE__*/_jsx("tbody", {
                    className: "divide-y divide-border",
                    children: RPT_CONTRACT_TABLE.map(r => /*#__PURE__*/_jsxs("tr", {
                      className: "hover:bg-muted/40 transition-colors",
                      children: [/*#__PURE__*/_jsx("td", {
                        className: "px-4 py-3 font-mono text-muted-foreground whitespace-nowrap",
                        children: r.id
                      }), /*#__PURE__*/_jsx("td", {
                        className: "px-4 py-3 font-semibold text-foreground max-w-[220px]",
                        children: /*#__PURE__*/_jsx("p", {
                          className: "truncate",
                          children: r.name
                        })
                      }), /*#__PURE__*/_jsx("td", {
                        className: "px-4 py-3 text-muted-foreground whitespace-nowrap",
                        children: r.vendor
                      }), /*#__PURE__*/_jsx("td", {
                        className: "px-4 py-3 text-muted-foreground whitespace-nowrap",
                        children: r.dept
                      }), /*#__PURE__*/_jsx("td", {
                        className: "px-4 py-3 font-mono text-muted-foreground whitespace-nowrap",
                        children: r.start
                      }), /*#__PURE__*/_jsx("td", {
                        className: "px-4 py-3 font-mono text-muted-foreground whitespace-nowrap",
                        children: r.end
                      }), /*#__PURE__*/_jsx("td", {
                        className: "px-4 py-3",
                        children: /*#__PURE__*/_jsx(Badge, {
                          variant: contractStatusColor[r.status] || "neutral",
                          children: r.status
                        })
                      }), /*#__PURE__*/_jsx("td", {
                        className: "px-4 py-3",
                        children: /*#__PURE__*/_jsxs("div", {
                          className: "flex gap-1",
                          children: [/*#__PURE__*/_jsx("button", {
                            onClick: () => showToast(`Viewing ${r.name}.`),
                            className: "p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors",
                            children: /*#__PURE__*/_jsx(Eye, {
                              size: 12
                            })
                          }), /*#__PURE__*/_jsx("button", {
                            onClick: () => showToast(`Downloading ${r.id} report.`),
                            className: "p-1.5 text-emerald-600 hover:bg-emerald-50 rounded transition-colors",
                            children: /*#__PURE__*/_jsx(Download, {
                              size: 12
                            })
                          })]
                        })
                      })]
                    }, r.id))
                  })]
                })
              })]
            })]
          }), activeTab === "compliance" && /*#__PURE__*/_jsxs("div", {
            className: "space-y-5",
            children: [/*#__PURE__*/_jsx("div", {
              className: "grid grid-cols-2 md:grid-cols-4 gap-4",
              children: [{
                label: "Completed Tasks",
                value: "58",
                pct: 58,
                color: "bg-emerald-500",
                light: "bg-emerald-50",
                text: "text-emerald-700"
              }, {
                label: "Pending Tasks",
                value: "22",
                pct: 22,
                color: "bg-amber-500",
                light: "bg-amber-50",
                text: "text-amber-700"
              }, {
                label: "Overdue Tasks",
                value: "8",
                pct: 8,
                color: "bg-red-500",
                light: "bg-red-50",
                text: "text-red-700"
              }, {
                label: "Compliance Rate",
                value: "92%",
                pct: 92,
                color: "bg-violet-500",
                light: "bg-violet-50",
                text: "text-violet-700"
              }].map(s => /*#__PURE__*/_jsxs("div", {
                className: `${s.light} border border-border rounded-xl p-4`,
                children: [/*#__PURE__*/_jsx("p", {
                  className: `text-2xl font-bold font-mono ${s.text}`,
                  children: s.value
                }), /*#__PURE__*/_jsx("p", {
                  className: "text-xs text-muted-foreground mb-2 mt-0.5",
                  children: s.label
                }), /*#__PURE__*/_jsx("div", {
                  className: "h-1.5 bg-white/60 rounded-full overflow-hidden",
                  children: /*#__PURE__*/_jsx("div", {
                    className: `h-full rounded-full ${s.color}`,
                    style: {
                      width: `${s.pct}%`
                    }
                  })
                })]
              }, s.label))
            }), /*#__PURE__*/_jsxs("div", {
              className: "grid grid-cols-1 xl:grid-cols-5 gap-5",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "xl:col-span-2 bg-card border border-border rounded-xl overflow-hidden",
                children: [/*#__PURE__*/_jsxs("div", {
                  className: "px-5 py-3.5 border-b border-border",
                  children: [/*#__PURE__*/_jsx("p", {
                    className: "text-sm font-semibold text-foreground",
                    children: "Compliance by Department"
                  }), /*#__PURE__*/_jsx("p", {
                    className: "text-xs text-muted-foreground",
                    children: "Task completion rate per department"
                  })]
                }), /*#__PURE__*/_jsx("div", {
                  className: "p-5 space-y-4",
                  children: [{
                    dept: "Legal",
                    rate: 98,
                    color: "bg-emerald-500"
                  }, {
                    dept: "Finance",
                    rate: 91,
                    color: "bg-blue-500"
                  }, {
                    dept: "HR",
                    rate: 87,
                    color: "bg-violet-500"
                  }, {
                    dept: "IT",
                    rate: 94,
                    color: "bg-emerald-400"
                  }, {
                    dept: "Operations",
                    rate: 78,
                    color: "bg-amber-500"
                  }, {
                    dept: "Procurement",
                    rate: 89,
                    color: "bg-blue-400"
                  }].map(d => /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsxs("div", {
                      className: "flex justify-between text-xs mb-1.5",
                      children: [/*#__PURE__*/_jsx("span", {
                        className: "font-medium text-foreground",
                        children: d.dept
                      }), /*#__PURE__*/_jsxs("span", {
                        className: `font-mono font-bold ${d.rate >= 90 ? "text-emerald-600" : d.rate >= 80 ? "text-amber-600" : "text-red-500"}`,
                        children: [d.rate, "%"]
                      })]
                    }), /*#__PURE__*/_jsx("div", {
                      className: "h-2 bg-muted rounded-full overflow-hidden",
                      children: /*#__PURE__*/_jsx("div", {
                        className: `h-full rounded-full ${d.color} transition-all`,
                        style: {
                          width: `${d.rate}%`
                        }
                      })
                    })]
                  }, d.dept))
                })]
              }), /*#__PURE__*/_jsxs("div", {
                className: "xl:col-span-3 bg-card border border-border rounded-xl overflow-hidden",
                children: [/*#__PURE__*/_jsxs("div", {
                  className: "px-5 py-3.5 border-b border-border",
                  children: [/*#__PURE__*/_jsx("p", {
                    className: "text-sm font-semibold text-foreground",
                    children: "Monthly Compliance Trend"
                  }), /*#__PURE__*/_jsx("p", {
                    className: "text-xs text-muted-foreground",
                    children: "Compliance rate % — January to June 2024"
                  })]
                }), /*#__PURE__*/_jsx("div", {
                  className: "p-5",
                  children: /*#__PURE__*/_jsx(ResponsiveContainer, {
                    width: "100%",
                    height: 220,
                    children: /*#__PURE__*/_jsxs(LineChart, {
                      data: RPT_COMPLIANCE_TREND,
                      children: [/*#__PURE__*/_jsx(CartesianGrid, {
                        strokeDasharray: "3 3",
                        stroke: "rgba(15,23,42,0.06)"
                      }), /*#__PURE__*/_jsx(XAxis, {
                        dataKey: "month",
                        tick: {
                          fontSize: 11,
                          fill: "#64748B"
                        },
                        axisLine: false,
                        tickLine: false
                      }), /*#__PURE__*/_jsx(YAxis, {
                        domain: [80, 100],
                        tick: {
                          fontSize: 11,
                          fill: "#64748B"
                        },
                        axisLine: false,
                        tickLine: false,
                        unit: "%"
                      }), /*#__PURE__*/_jsx(Tooltip, {
                        contentStyle: {
                          fontSize: 11,
                          borderRadius: 8,
                          border: "1px solid #e2e8f0"
                        },
                        formatter: v => [`${v}%`, "Compliance Rate"]
                      }), /*#__PURE__*/_jsx(Line, {
                        type: "monotone",
                        dataKey: "rate",
                        stroke: "#10B981",
                        strokeWidth: 2.5,
                        dot: {
                          r: 4,
                          fill: "#10B981"
                        }
                      })]
                    })
                  })
                })]
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "bg-card border border-border rounded-xl overflow-hidden",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "flex items-center justify-between px-5 py-3.5 border-b border-border",
                children: [/*#__PURE__*/_jsxs("div", {
                  children: [/*#__PURE__*/_jsx("p", {
                    className: "text-sm font-semibold text-foreground",
                    children: "Obligation Compliance Table"
                  }), /*#__PURE__*/_jsx("p", {
                    className: "text-xs text-muted-foreground",
                    children: "Color indicators: Green = Completed · Orange = Pending · Red = Overdue"
                  })]
                }), /*#__PURE__*/_jsxs("div", {
                  className: "flex gap-2",
                  children: [/*#__PURE__*/_jsxs("button", {
                    onClick: () => showToast("Compliance PDF generated."),
                    className: "flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700 transition-colors",
                    children: [/*#__PURE__*/_jsx(Printer, {
                      size: 11
                    }), " PDF"]
                  }), /*#__PURE__*/_jsxs("button", {
                    onClick: () => showToast("Compliance Excel exported."),
                    className: "flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 transition-colors",
                    children: [/*#__PURE__*/_jsx(Table2, {
                      size: 11
                    }), " Excel"]
                  })]
                })]
              }), /*#__PURE__*/_jsx("div", {
                className: "overflow-x-auto",
                children: /*#__PURE__*/_jsxs("table", {
                  className: "w-full text-xs",
                  children: [/*#__PURE__*/_jsx("thead", {
                    children: /*#__PURE__*/_jsx("tr", {
                      className: "border-b border-border bg-muted",
                      children: ["Obligation", "Due Date", "Assigned To", "Status", "Completion Date"].map(h => /*#__PURE__*/_jsx("th", {
                        className: "text-left px-4 py-3 text-muted-foreground font-semibold uppercase tracking-wide whitespace-nowrap",
                        children: h
                      }, h))
                    })
                  }), /*#__PURE__*/_jsx("tbody", {
                    className: "divide-y divide-border",
                    children: RPT_COMPLIANCE_TABLE.map((r, i) => /*#__PURE__*/_jsxs("tr", {
                      className: `hover:bg-muted/40 transition-colors ${r.status === "Overdue" ? "bg-red-50/30" : r.status === "Completed" ? "bg-emerald-50/20" : ""}`,
                      children: [/*#__PURE__*/_jsx("td", {
                        className: "px-4 py-3",
                        children: /*#__PURE__*/_jsxs("div", {
                          className: "flex items-center gap-2",
                          children: [/*#__PURE__*/_jsx(ComplianceStatusDot, {
                            status: r.status
                          }), /*#__PURE__*/_jsx("p", {
                            className: "font-semibold text-foreground max-w-[280px] truncate",
                            children: r.obligation
                          })]
                        })
                      }), /*#__PURE__*/_jsx("td", {
                        className: "px-4 py-3 font-mono text-muted-foreground whitespace-nowrap",
                        children: r.due
                      }), /*#__PURE__*/_jsx("td", {
                        className: "px-4 py-3",
                        children: /*#__PURE__*/_jsxs("div", {
                          className: "flex items-center gap-1.5",
                          children: [/*#__PURE__*/_jsx(Av, {
                            initials: r.initials,
                            size: "sm"
                          }), /*#__PURE__*/_jsx("span", {
                            className: "text-foreground",
                            children: r.assignee
                          })]
                        })
                      }), /*#__PURE__*/_jsx("td", {
                        className: "px-4 py-3",
                        children: /*#__PURE__*/_jsx(Badge, {
                          variant: complianceStatusColor[r.status] || "neutral",
                          children: r.status
                        })
                      }), /*#__PURE__*/_jsx("td", {
                        className: "px-4 py-3 font-mono text-muted-foreground",
                        children: r.completed || "—"
                      })]
                    }, i))
                  })]
                })
              })]
            })]
          }), activeTab === "renewals" && /*#__PURE__*/_jsxs("div", {
            className: "space-y-5",
            children: [/*#__PURE__*/_jsx("div", {
              className: "grid grid-cols-2 md:grid-cols-4 gap-4",
              children: [{
                label: "Renewing This Week",
                value: "3",
                color: "text-red-600",
                bg: "bg-red-50",
                icon: CalendarX
              }, {
                label: "Renewing This Month",
                value: "7",
                color: "text-amber-600",
                bg: "bg-amber-50",
                icon: CalendarClock
              }, {
                label: "Auto Renewals",
                value: "18",
                color: "text-blue-600",
                bg: "bg-blue-50",
                icon: Repeat2
              }, {
                label: "Manual Renewals",
                value: "29",
                color: "text-violet-600",
                bg: "bg-violet-50",
                icon: FileCheck
              }].map(s => /*#__PURE__*/_jsxs("div", {
                className: `${s.bg} border border-border rounded-xl p-4 flex items-center gap-3`,
                children: [/*#__PURE__*/_jsx("div", {
                  className: "p-2 bg-white/60 rounded-lg",
                  children: /*#__PURE__*/_jsx(s.icon, {
                    size: 18,
                    className: s.color
                  })
                }), /*#__PURE__*/_jsxs("div", {
                  children: [/*#__PURE__*/_jsx("p", {
                    className: `text-2xl font-bold font-mono ${s.color}`,
                    children: s.value
                  }), /*#__PURE__*/_jsx("p", {
                    className: "text-xs text-muted-foreground",
                    children: s.label
                  })]
                })]
              }, s.label))
            }), /*#__PURE__*/_jsxs("div", {
              className: "grid grid-cols-1 xl:grid-cols-5 gap-5",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "xl:col-span-2 bg-card border border-border rounded-xl overflow-hidden",
                children: [/*#__PURE__*/_jsxs("div", {
                  className: "px-5 py-3.5 border-b border-border",
                  children: [/*#__PURE__*/_jsx("p", {
                    className: "text-sm font-semibold text-foreground",
                    children: "Renewal Timeline — June 2024"
                  }), /*#__PURE__*/_jsx("p", {
                    className: "text-xs text-muted-foreground",
                    children: "Upcoming contract renewal dates"
                  })]
                }), /*#__PURE__*/_jsxs("div", {
                  className: "p-4",
                  children: [/*#__PURE__*/_jsx("div", {
                    className: "grid grid-cols-7 mb-1",
                    children: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => /*#__PURE__*/_jsx("div", {
                      className: "text-center text-xs font-semibold text-muted-foreground py-1",
                      children: d
                    }, d))
                  }), /*#__PURE__*/_jsx("div", {
                    className: "grid grid-cols-7 gap-y-0.5",
                    children: Array.from({
                      length: 6 + 30
                    }).map((_, i) => {
                      const day = i - 5;
                      if (day <= 0) return /*#__PURE__*/_jsx("div", {}, i);
                      const evMap = {
                        3: {
                          label: "APAC",
                          color: "bg-amber-500"
                        },
                        14: {
                          label: "Legal",
                          color: "bg-orange-500"
                        },
                        20: {
                          label: "SaaS",
                          color: "bg-blue-400"
                        },
                        30: {
                          label: "AWS",
                          color: "bg-emerald-500"
                        }
                      };
                      const ev = evMap[day];
                      const isToday = day === 3;
                      return /*#__PURE__*/_jsxs("div", {
                        className: "min-h-[44px] p-0.5",
                        children: [/*#__PURE__*/_jsx("div", {
                          className: `text-xs font-medium text-center mb-0.5 w-5 h-5 flex items-center justify-center rounded-full mx-auto ${isToday ? "bg-primary text-primary-foreground" : "text-foreground"}`,
                          children: day
                        }), ev && /*#__PURE__*/_jsx("div", {
                          className: `text-white text-[9px] font-medium px-1 py-0.5 rounded truncate ${ev.color}`,
                          children: ev.label
                        })]
                      }, i);
                    })
                  }), /*#__PURE__*/_jsx("div", {
                    className: "mt-3 pt-3 border-t border-border flex flex-wrap gap-2",
                    children: [{
                      c: "bg-red-500",
                      l: "Expired"
                    }, {
                      c: "bg-amber-500",
                      l: "Due Soon"
                    }, {
                      c: "bg-blue-400",
                      l: "Upcoming"
                    }, {
                      c: "bg-emerald-500",
                      l: "Renewed"
                    }].map(l => /*#__PURE__*/_jsxs("div", {
                      className: "flex items-center gap-1",
                      children: [/*#__PURE__*/_jsx("div", {
                        className: `w-2 h-2 rounded-sm ${l.c}`
                      }), /*#__PURE__*/_jsx("span", {
                        className: "text-xs text-muted-foreground",
                        children: l.l
                      })]
                    }, l.l))
                  })]
                })]
              }), /*#__PURE__*/_jsxs("div", {
                className: "xl:col-span-3 bg-card border border-border rounded-xl overflow-hidden",
                children: [/*#__PURE__*/_jsxs("div", {
                  className: "px-5 py-3.5 border-b border-border",
                  children: [/*#__PURE__*/_jsx("p", {
                    className: "text-sm font-semibold text-foreground",
                    children: "Monthly Renewal Volume"
                  }), /*#__PURE__*/_jsx("p", {
                    className: "text-xs text-muted-foreground",
                    children: "Number of renewals processed per month"
                  })]
                }), /*#__PURE__*/_jsx("div", {
                  className: "p-5",
                  children: /*#__PURE__*/_jsx(ResponsiveContainer, {
                    width: "100%",
                    height: 220,
                    children: /*#__PURE__*/_jsxs(BarChart, {
                      data: RPT_RENEWAL_MONTHLY,
                      barSize: 28,
                      children: [/*#__PURE__*/_jsx(CartesianGrid, {
                        strokeDasharray: "3 3",
                        stroke: "rgba(15,23,42,0.06)",
                        vertical: false
                      }), /*#__PURE__*/_jsx(XAxis, {
                        dataKey: "month",
                        tick: {
                          fontSize: 11,
                          fill: "#64748B"
                        },
                        axisLine: false,
                        tickLine: false
                      }), /*#__PURE__*/_jsx(YAxis, {
                        tick: {
                          fontSize: 11,
                          fill: "#64748B"
                        },
                        axisLine: false,
                        tickLine: false
                      }), /*#__PURE__*/_jsx(Tooltip, {
                        contentStyle: {
                          fontSize: 11,
                          borderRadius: 8,
                          border: "1px solid #e2e8f0"
                        }
                      }), /*#__PURE__*/_jsx(Bar, {
                        dataKey: "count",
                        fill: "#F59E0B",
                        radius: [4, 4, 0, 0],
                        name: "Renewals"
                      })]
                    })
                  })
                })]
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "bg-card border border-border rounded-xl overflow-hidden",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "flex items-center justify-between px-5 py-3.5 border-b border-border",
                children: [/*#__PURE__*/_jsxs("div", {
                  children: [/*#__PURE__*/_jsx("p", {
                    className: "text-sm font-semibold text-foreground",
                    children: "Renewal Contracts Table"
                  }), /*#__PURE__*/_jsx("p", {
                    className: "text-xs text-muted-foreground",
                    children: "Priority badges: Critical · High · Medium · Low"
                  })]
                }), /*#__PURE__*/_jsxs("div", {
                  className: "flex gap-2",
                  children: [/*#__PURE__*/_jsxs("button", {
                    onClick: () => showToast("Renewal PDF generated."),
                    className: "flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700 transition-colors",
                    children: [/*#__PURE__*/_jsx(Printer, {
                      size: 11
                    }), " PDF"]
                  }), /*#__PURE__*/_jsxs("button", {
                    onClick: () => showToast("Renewal Excel exported."),
                    className: "flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 transition-colors",
                    children: [/*#__PURE__*/_jsx(Table2, {
                      size: 11
                    }), " Excel"]
                  })]
                })]
              }), /*#__PURE__*/_jsx("div", {
                className: "overflow-x-auto",
                children: /*#__PURE__*/_jsxs("table", {
                  className: "w-full text-xs",
                  children: [/*#__PURE__*/_jsx("thead", {
                    children: /*#__PURE__*/_jsx("tr", {
                      className: "border-b border-border bg-muted",
                      children: ["Contract", "Vendor", "Renewal Date", "Reminder Sent", "Priority", "Renewal Status"].map(h => /*#__PURE__*/_jsx("th", {
                        className: "text-left px-4 py-3 text-muted-foreground font-semibold uppercase tracking-wide whitespace-nowrap",
                        children: h
                      }, h))
                    })
                  }), /*#__PURE__*/_jsx("tbody", {
                    className: "divide-y divide-border",
                    children: RPT_RENEWAL_TABLE.map((r, i) => /*#__PURE__*/_jsxs("tr", {
                      className: "hover:bg-muted/40 transition-colors",
                      children: [/*#__PURE__*/_jsx("td", {
                        className: "px-4 py-3 font-semibold text-foreground max-w-[220px]",
                        children: /*#__PURE__*/_jsx("p", {
                          className: "truncate",
                          children: r.contract
                        })
                      }), /*#__PURE__*/_jsx("td", {
                        className: "px-4 py-3 text-muted-foreground whitespace-nowrap",
                        children: r.vendor
                      }), /*#__PURE__*/_jsx("td", {
                        className: "px-4 py-3 font-mono text-muted-foreground whitespace-nowrap",
                        children: r.renewal
                      }), /*#__PURE__*/_jsx("td", {
                        className: "px-4 py-3",
                        children: /*#__PURE__*/_jsx("span", {
                          className: `text-xs font-medium ${r.reminder === "Yes" ? "text-emerald-600" : r.reminder === "No" ? "text-slate-400" : "text-amber-600"}`,
                          children: r.reminder
                        })
                      }), /*#__PURE__*/_jsx("td", {
                        className: "px-4 py-3",
                        children: /*#__PURE__*/_jsx(Badge, {
                          variant: priorityColor[r.priority] || "neutral",
                          children: r.priority
                        })
                      }), /*#__PURE__*/_jsx("td", {
                        className: "px-4 py-3",
                        children: /*#__PURE__*/_jsx(Badge, {
                          variant: renewalStatusColor[r.status] || "neutral",
                          children: r.status
                        })
                      })]
                    }, i))
                  })]
                })
              })]
            })]
          }), activeTab === "obligations" && /*#__PURE__*/_jsxs("div", {
            className: "space-y-5",
            children: [/*#__PURE__*/_jsx("div", {
              className: "grid grid-cols-2 md:grid-cols-4 gap-4",
              children: [{
                label: "Total Obligations",
                value: "100",
                color: "text-blue-600",
                bg: "bg-blue-50"
              }, {
                label: "Completed",
                value: "58",
                color: "text-emerald-600",
                bg: "bg-emerald-50"
              }, {
                label: "Pending / In Progress",
                value: "34",
                color: "text-amber-600",
                bg: "bg-amber-50"
              }, {
                label: "Overdue",
                value: "8",
                color: "text-red-600",
                bg: "bg-red-50"
              }].map(s => /*#__PURE__*/_jsxs("div", {
                className: `${s.bg} border border-border rounded-xl p-4`,
                children: [/*#__PURE__*/_jsx("p", {
                  className: `text-2xl font-bold font-mono ${s.color}`,
                  children: s.value
                }), /*#__PURE__*/_jsx("p", {
                  className: "text-xs text-muted-foreground mt-0.5",
                  children: s.label
                })]
              }, s.label))
            }), /*#__PURE__*/_jsxs("div", {
              className: "grid grid-cols-1 xl:grid-cols-5 gap-5",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "xl:col-span-2 bg-card border border-border rounded-xl overflow-hidden",
                children: [/*#__PURE__*/_jsxs("div", {
                  className: "px-5 py-3.5 border-b border-border",
                  children: [/*#__PURE__*/_jsx("p", {
                    className: "text-sm font-semibold text-foreground",
                    children: "Obligation Status Donut"
                  }), /*#__PURE__*/_jsx("p", {
                    className: "text-xs text-muted-foreground",
                    children: "Overall obligation completion breakdown"
                  })]
                }), /*#__PURE__*/_jsxs("div", {
                  className: "p-5",
                  children: [/*#__PURE__*/_jsx(ResponsiveContainer, {
                    width: "100%",
                    height: 180,
                    children: /*#__PURE__*/_jsxs(PieChart, {
                      children: [/*#__PURE__*/_jsx(Pie, {
                        data: RPT_OBL_DONUT,
                        cx: "50%",
                        cy: "50%",
                        innerRadius: 52,
                        outerRadius: 82,
                        paddingAngle: 3,
                        dataKey: "value",
                        children: RPT_OBL_DONUT.map(e => /*#__PURE__*/_jsx(Cell, {
                          fill: e.color
                        }, `roblpie-${e.name}`))
                      }), /*#__PURE__*/_jsx(Tooltip, {
                        formatter: v => [`${v}%`, ""],
                        contentStyle: {
                          fontSize: 11,
                          borderRadius: 8
                        }
                      })]
                    })
                  }), /*#__PURE__*/_jsx("div", {
                    className: "space-y-2 mt-2",
                    children: RPT_OBL_DONUT.map(s => /*#__PURE__*/_jsxs("div", {
                      className: "flex items-center justify-between",
                      children: [/*#__PURE__*/_jsxs("div", {
                        className: "flex items-center gap-2",
                        children: [/*#__PURE__*/_jsx("div", {
                          className: "w-2.5 h-2.5 rounded-sm",
                          style: {
                            background: s.color
                          }
                        }), /*#__PURE__*/_jsx("span", {
                          className: "text-xs text-foreground",
                          children: s.name
                        })]
                      }), /*#__PURE__*/_jsxs("span", {
                        className: "text-xs font-mono font-bold text-foreground",
                        children: [s.value, "%"]
                      })]
                    }, s.name))
                  })]
                })]
              }), /*#__PURE__*/_jsxs("div", {
                className: "xl:col-span-3 bg-card border border-border rounded-xl overflow-hidden",
                children: [/*#__PURE__*/_jsxs("div", {
                  className: "px-5 py-3.5 border-b border-border",
                  children: [/*#__PURE__*/_jsx("p", {
                    className: "text-sm font-semibold text-foreground",
                    children: "Obligation Progress by Category"
                  }), /*#__PURE__*/_jsx("p", {
                    className: "text-xs text-muted-foreground",
                    children: "Completion rate per obligation category"
                  })]
                }), /*#__PURE__*/_jsx("div", {
                  className: "p-5 space-y-4",
                  children: [{
                    cat: "Reporting",
                    total: 18,
                    done: 16,
                    pct: 89,
                    color: "bg-blue-500"
                  }, {
                    cat: "Insurance",
                    total: 12,
                    done: 9,
                    pct: 75,
                    color: "bg-amber-500"
                  }, {
                    cat: "Audit",
                    total: 14,
                    done: 14,
                    pct: 100,
                    color: "bg-emerald-500"
                  }, {
                    cat: "Review",
                    total: 22,
                    done: 17,
                    pct: 77,
                    color: "bg-violet-500"
                  }, {
                    cat: "Renewal",
                    total: 19,
                    done: 11,
                    pct: 58,
                    color: "bg-orange-500"
                  }, {
                    cat: "HR",
                    total: 15,
                    done: 13,
                    pct: 87,
                    color: "bg-cyan-500"
                  }].map(c => /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsxs("div", {
                      className: "flex items-center justify-between mb-1.5 text-xs",
                      children: [/*#__PURE__*/_jsx("span", {
                        className: "font-medium text-foreground",
                        children: c.cat
                      }), /*#__PURE__*/_jsxs("span", {
                        className: "text-muted-foreground font-mono",
                        children: [c.done, "/", c.total, " ", /*#__PURE__*/_jsxs("span", {
                          className: `font-bold ${c.pct >= 80 ? "text-emerald-600" : c.pct >= 60 ? "text-amber-600" : "text-red-500"}`,
                          children: ["(", c.pct, "%)"]
                        })]
                      })]
                    }), /*#__PURE__*/_jsx("div", {
                      className: "h-2 bg-muted rounded-full overflow-hidden",
                      children: /*#__PURE__*/_jsx("div", {
                        className: `h-full rounded-full ${c.color}`,
                        style: {
                          width: `${c.pct}%`
                        }
                      })
                    })]
                  }, c.cat))
                })]
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "bg-card border border-border rounded-xl overflow-hidden",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "flex items-center justify-between px-5 py-3.5 border-b border-border",
                children: [/*#__PURE__*/_jsxs("div", {
                  children: [/*#__PURE__*/_jsx("p", {
                    className: "text-sm font-semibold text-foreground",
                    children: "Obligations Data Table"
                  }), /*#__PURE__*/_jsxs("p", {
                    className: "text-xs text-muted-foreground",
                    children: [RPT_OBLIGATION_TABLE.length, " records · All departments"]
                  })]
                }), /*#__PURE__*/_jsxs("div", {
                  className: "flex gap-2",
                  children: [/*#__PURE__*/_jsxs("button", {
                    onClick: () => showToast("Obligations PDF generated."),
                    className: "flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700 transition-colors",
                    children: [/*#__PURE__*/_jsx(Printer, {
                      size: 11
                    }), " PDF"]
                  }), /*#__PURE__*/_jsxs("button", {
                    onClick: () => showToast("Obligations Excel exported."),
                    className: "flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 transition-colors",
                    children: [/*#__PURE__*/_jsx(Table2, {
                      size: 11
                    }), " Excel"]
                  })]
                })]
              }), /*#__PURE__*/_jsx("div", {
                className: "overflow-x-auto",
                children: /*#__PURE__*/_jsxs("table", {
                  className: "w-full text-xs",
                  children: [/*#__PURE__*/_jsx("thead", {
                    children: /*#__PURE__*/_jsx("tr", {
                      className: "border-b border-border bg-muted",
                      children: ["Obligation ID", "Description", "Assigned To", "Due Date", "Priority", "Status"].map(h => /*#__PURE__*/_jsx("th", {
                        className: "text-left px-4 py-3 text-muted-foreground font-semibold uppercase tracking-wide whitespace-nowrap",
                        children: h
                      }, h))
                    })
                  }), /*#__PURE__*/_jsx("tbody", {
                    className: "divide-y divide-border",
                    children: RPT_OBLIGATION_TABLE.map((r, i) => /*#__PURE__*/_jsxs("tr", {
                      className: "hover:bg-muted/40 transition-colors",
                      children: [/*#__PURE__*/_jsx("td", {
                        className: "px-4 py-3 font-mono text-muted-foreground whitespace-nowrap",
                        children: r.id
                      }), /*#__PURE__*/_jsx("td", {
                        className: "px-4 py-3 font-semibold text-foreground max-w-[260px]",
                        children: /*#__PURE__*/_jsx("p", {
                          className: "truncate",
                          children: r.desc
                        })
                      }), /*#__PURE__*/_jsx("td", {
                        className: "px-4 py-3 text-foreground whitespace-nowrap",
                        children: r.assignee
                      }), /*#__PURE__*/_jsx("td", {
                        className: "px-4 py-3 font-mono text-muted-foreground whitespace-nowrap",
                        children: r.due
                      }), /*#__PURE__*/_jsx("td", {
                        className: "px-4 py-3",
                        children: /*#__PURE__*/_jsx(Badge, {
                          variant: priorityColor[r.priority] || "neutral",
                          children: r.priority
                        })
                      }), /*#__PURE__*/_jsx("td", {
                        className: "px-4 py-3",
                        children: /*#__PURE__*/_jsx(Badge, {
                          variant: obligationStatusColor[r.status] || "neutral",
                          children: r.status
                        })
                      })]
                    }, i))
                  })]
                })
              })]
            })]
          }), activeTab === "audit" && /*#__PURE__*/_jsxs("div", {
            className: "space-y-5",
            children: [/*#__PURE__*/_jsx("div", {
              className: "grid grid-cols-2 md:grid-cols-5 gap-4",
              children: [{
                label: "Audit Trail Entries",
                value: "2,847",
                color: "text-blue-600",
                bg: "bg-blue-50"
              }, {
                label: "User Activities",
                value: "341",
                color: "text-violet-600",
                bg: "bg-violet-50"
              }, {
                label: "Login Events",
                value: "186",
                color: "text-emerald-600",
                bg: "bg-emerald-50"
              }, {
                label: "Approval Actions",
                value: "94",
                color: "text-amber-600",
                bg: "bg-amber-50"
              }, {
                label: "Record Changes",
                value: "226",
                color: "text-red-600",
                bg: "bg-red-50"
              }].map(s => /*#__PURE__*/_jsxs("div", {
                className: `${s.bg} border border-border rounded-xl p-4`,
                children: [/*#__PURE__*/_jsx("p", {
                  className: `text-2xl font-bold font-mono ${s.color}`,
                  children: s.value
                }), /*#__PURE__*/_jsx("p", {
                  className: "text-xs text-muted-foreground mt-0.5",
                  children: s.label
                })]
              }, s.label))
            }), /*#__PURE__*/_jsxs("div", {
              className: "grid grid-cols-1 xl:grid-cols-5 gap-5",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "xl:col-span-2 bg-card border border-border rounded-xl overflow-hidden",
                children: [/*#__PURE__*/_jsxs("div", {
                  className: "px-5 py-3.5 border-b border-border",
                  children: [/*#__PURE__*/_jsx("p", {
                    className: "text-sm font-semibold text-foreground",
                    children: "Recent Activity Timeline"
                  }), /*#__PURE__*/_jsx("p", {
                    className: "text-xs text-muted-foreground",
                    children: "Latest audit events in chronological order"
                  })]
                }), /*#__PURE__*/_jsx("div", {
                  className: "p-5",
                  children: /*#__PURE__*/_jsxs("div", {
                    className: "relative",
                    children: [/*#__PURE__*/_jsx("div", {
                      className: "absolute left-3.5 top-0 bottom-0 w-0.5 bg-border"
                    }), /*#__PURE__*/_jsx("div", {
                      className: "space-y-4",
                      children: [{
                        icon: FileText,
                        color: "bg-blue-500",
                        user: "Sarah Chen",
                        action: "Created NDA — TechVenture",
                        time: "10:14 AM"
                      }, {
                        icon: Edit,
                        color: "bg-violet-500",
                        user: "David Park",
                        action: "Updated compliance status",
                        time: "09:52 AM"
                      }, {
                        icon: Send,
                        color: "bg-amber-500",
                        user: "Lisa Torres",
                        action: "Submitted renewal request",
                        time: "09:31 AM"
                      }, {
                        icon: CheckCircle,
                        color: "bg-emerald-500",
                        user: "Mark Johnson",
                        action: "Completed obligation OBL-007",
                        time: "Yesterday"
                      }, {
                        icon: LogIn,
                        color: "bg-slate-500",
                        user: "James Lee",
                        action: "Logged in to platform",
                        time: "May 28"
                      }, {
                        icon: UserCheck,
                        color: "bg-cyan-500",
                        user: "Alexandra Ross",
                        action: "Provisioned James Lee account",
                        time: "Jun 1"
                      }].map((ev, i) => /*#__PURE__*/_jsxs("div", {
                        className: "flex gap-3 pl-1 relative",
                        children: [/*#__PURE__*/_jsx("div", {
                          className: `w-6 h-6 rounded-full ${ev.color} flex items-center justify-center flex-shrink-0 z-10`,
                          children: /*#__PURE__*/_jsx(ev.icon, {
                            size: 10,
                            className: "text-white"
                          })
                        }), /*#__PURE__*/_jsxs("div", {
                          className: "flex-1 min-w-0 pb-1",
                          children: [/*#__PURE__*/_jsx("p", {
                            className: "text-xs font-semibold text-foreground",
                            children: ev.user
                          }), /*#__PURE__*/_jsx("p", {
                            className: "text-xs text-muted-foreground",
                            children: ev.action
                          }), /*#__PURE__*/_jsx("p", {
                            className: "text-[10px] text-muted-foreground font-mono mt-0.5",
                            children: ev.time
                          })]
                        })]
                      }, i))
                    })]
                  })
                })]
              }), /*#__PURE__*/_jsxs("div", {
                className: "xl:col-span-3 bg-card border border-border rounded-xl overflow-hidden",
                children: [/*#__PURE__*/_jsxs("div", {
                  className: "px-5 py-3.5 border-b border-border",
                  children: [/*#__PURE__*/_jsx("p", {
                    className: "text-sm font-semibold text-foreground",
                    children: "Daily Audit Activity"
                  }), /*#__PURE__*/_jsx("p", {
                    className: "text-xs text-muted-foreground",
                    children: "Number of audit events per day — this week"
                  })]
                }), /*#__PURE__*/_jsx("div", {
                  className: "p-5",
                  children: /*#__PURE__*/_jsx(ResponsiveContainer, {
                    width: "100%",
                    height: 220,
                    children: /*#__PURE__*/_jsxs(BarChart, {
                      data: RPT_AUDIT_DAILY,
                      barSize: 30,
                      children: [/*#__PURE__*/_jsx(CartesianGrid, {
                        strokeDasharray: "3 3",
                        stroke: "rgba(15,23,42,0.06)",
                        vertical: false
                      }), /*#__PURE__*/_jsx(XAxis, {
                        dataKey: "day",
                        tick: {
                          fontSize: 11,
                          fill: "#64748B"
                        },
                        axisLine: false,
                        tickLine: false
                      }), /*#__PURE__*/_jsx(YAxis, {
                        tick: {
                          fontSize: 11,
                          fill: "#64748B"
                        },
                        axisLine: false,
                        tickLine: false
                      }), /*#__PURE__*/_jsx(Tooltip, {
                        contentStyle: {
                          fontSize: 11,
                          borderRadius: 8,
                          border: "1px solid #e2e8f0"
                        }
                      }), /*#__PURE__*/_jsx(Bar, {
                        dataKey: "actions",
                        fill: "#7C3AED",
                        radius: [4, 4, 0, 0],
                        name: "Audit Actions"
                      })]
                    })
                  })
                })]
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "bg-card border border-border rounded-xl overflow-hidden",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "flex items-center justify-between px-5 py-3.5 border-b border-border",
                children: [/*#__PURE__*/_jsxs("div", {
                  children: [/*#__PURE__*/_jsx("p", {
                    className: "text-sm font-semibold text-foreground",
                    children: "Full Audit Trail Table"
                  }), /*#__PURE__*/_jsx("p", {
                    className: "text-xs text-muted-foreground",
                    children: "All system actions with user, module, and IP tracking"
                  })]
                }), /*#__PURE__*/_jsxs("div", {
                  className: "flex gap-2",
                  children: [/*#__PURE__*/_jsxs("button", {
                    onClick: () => showToast("Audit trail PDF generated."),
                    className: "flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700 transition-colors",
                    children: [/*#__PURE__*/_jsx(Printer, {
                      size: 11
                    }), " PDF"]
                  }), /*#__PURE__*/_jsxs("button", {
                    onClick: () => showToast("Audit trail Excel exported."),
                    className: "flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 transition-colors",
                    children: [/*#__PURE__*/_jsx(Table2, {
                      size: 11
                    }), " Excel"]
                  })]
                })]
              }), /*#__PURE__*/_jsx("div", {
                className: "overflow-x-auto",
                children: /*#__PURE__*/_jsxs("table", {
                  className: "w-full text-xs",
                  children: [/*#__PURE__*/_jsx("thead", {
                    children: /*#__PURE__*/_jsx("tr", {
                      className: "border-b border-border bg-muted",
                      children: ["Timestamp", "User", "Module", "Action", "Previous Value", "Updated Value", "IP Address"].map(h => /*#__PURE__*/_jsx("th", {
                        className: "text-left px-4 py-3 text-muted-foreground font-semibold uppercase tracking-wide whitespace-nowrap",
                        children: h
                      }, h))
                    })
                  }), /*#__PURE__*/_jsx("tbody", {
                    className: "divide-y divide-border",
                    children: RPT_AUDIT_TABLE.map((r, i) => /*#__PURE__*/_jsxs("tr", {
                      className: "hover:bg-muted/40 transition-colors",
                      children: [/*#__PURE__*/_jsx("td", {
                        className: "px-4 py-3 font-mono text-muted-foreground whitespace-nowrap text-[10px]",
                        children: r.ts
                      }), /*#__PURE__*/_jsx("td", {
                        className: "px-4 py-3 font-semibold text-foreground whitespace-nowrap",
                        children: r.user
                      }), /*#__PURE__*/_jsx("td", {
                        className: "px-4 py-3",
                        children: /*#__PURE__*/_jsx(Badge, {
                          variant: "neutral",
                          children: r.module
                        })
                      }), /*#__PURE__*/_jsx("td", {
                        className: "px-4 py-3",
                        children: /*#__PURE__*/_jsx("span", {
                          className: `font-semibold ${r.action === "Created" ? "text-blue-600" : r.action === "Updated" ? "text-violet-600" : r.action === "Completed" ? "text-emerald-600" : r.action === "Login" ? "text-slate-500" : r.action === "Submitted" ? "text-amber-600" : "text-foreground"}`,
                          children: r.action
                        })
                      }), /*#__PURE__*/_jsx("td", {
                        className: "px-4 py-3 text-muted-foreground max-w-[120px]",
                        children: /*#__PURE__*/_jsx("p", {
                          className: "truncate",
                          children: r.prev
                        })
                      }), /*#__PURE__*/_jsx("td", {
                        className: "px-4 py-3 text-foreground max-w-[160px]",
                        children: /*#__PURE__*/_jsx("p", {
                          className: "truncate",
                          children: r.updated
                        })
                      }), /*#__PURE__*/_jsx("td", {
                        className: "px-4 py-3 font-mono text-muted-foreground text-[10px] whitespace-nowrap",
                        children: r.ip
                      })]
                    }, i))
                  })]
                })
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "grid grid-cols-1 md:grid-cols-2 gap-5",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "bg-card border border-border rounded-xl overflow-hidden",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "px-5 py-3.5 border-b border-border flex items-center gap-2",
                children: [/*#__PURE__*/_jsx("div", {
                  className: "p-2 bg-red-50 rounded-lg",
                  children: /*#__PURE__*/_jsx(Printer, {
                    size: 14,
                    className: "text-red-600"
                  })
                }), /*#__PURE__*/_jsxs("div", {
                  children: [/*#__PURE__*/_jsx("p", {
                    className: "text-sm font-semibold text-foreground",
                    children: "PDF Export"
                  }), /*#__PURE__*/_jsx("p", {
                    className: "text-xs text-muted-foreground",
                    children: "Professional report with charts and summary statistics"
                  })]
                })]
              }), /*#__PURE__*/_jsxs("div", {
                className: "p-5 space-y-3",
                children: [/*#__PURE__*/_jsx("div", {
                  className: "space-y-2",
                  children: [{
                    label: "Include charts & visualizations",
                    checked: true
                  }, {
                    label: "Include summary statistics",
                    checked: true
                  }, {
                    label: "Include company logo & branding",
                    checked: true
                  }, {
                    label: "Add header and footer",
                    checked: true
                  }, {
                    label: "Page numbers",
                    checked: true
                  }, {
                    label: "Include filter metadata",
                    checked: false
                  }].map(opt => /*#__PURE__*/_jsxs("label", {
                    className: "flex items-center gap-2 cursor-pointer",
                    children: [/*#__PURE__*/_jsx("input", {
                      type: "checkbox",
                      defaultChecked: opt.checked,
                      className: "rounded accent-red-600"
                    }), /*#__PURE__*/_jsx("span", {
                      className: "text-xs text-foreground",
                      children: opt.label
                    })]
                  }, opt.label))
                }), /*#__PURE__*/_jsxs("div", {
                  className: "flex gap-2 pt-2",
                  children: [/*#__PURE__*/_jsxs("button", {
                    onClick: () => showToast("Current report exported as PDF successfully."),
                    className: "flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700 transition-colors",
                    children: [/*#__PURE__*/_jsx(Printer, {
                      size: 13
                    }), " Export Current Report"]
                  }), /*#__PURE__*/_jsxs("button", {
                    onClick: () => showToast("Filtered report exported as PDF."),
                    className: "flex-1 flex items-center justify-center gap-2 py-2.5 border border-red-300 text-red-700 bg-red-50 rounded-lg text-xs font-semibold hover:bg-red-100 transition-colors",
                    children: [/*#__PURE__*/_jsx(Filter, {
                      size: 13
                    }), " Export Filtered"]
                  })]
                })]
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "bg-card border border-border rounded-xl overflow-hidden",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "px-5 py-3.5 border-b border-border flex items-center gap-2",
                children: [/*#__PURE__*/_jsx("div", {
                  className: "p-2 bg-emerald-50 rounded-lg",
                  children: /*#__PURE__*/_jsx(Table2, {
                    size: 14,
                    className: "text-emerald-600"
                  })
                }), /*#__PURE__*/_jsxs("div", {
                  children: [/*#__PURE__*/_jsx("p", {
                    className: "text-sm font-semibold text-foreground",
                    children: "Excel Export"
                  }), /*#__PURE__*/_jsx("p", {
                    className: "text-xs text-muted-foreground",
                    children: "Multi-worksheet workbook with formatted tables and pivots"
                  })]
                })]
              }), /*#__PURE__*/_jsxs("div", {
                className: "p-5 space-y-3",
                children: [/*#__PURE__*/_jsx("div", {
                  className: "space-y-2",
                  children: [{
                    label: "Export full dataset",
                    checked: true
                  }, {
                    label: "Multiple worksheets (by category)",
                    checked: true
                  }, {
                    label: "Formatted tables with headers",
                    checked: true
                  }, {
                    label: "Auto-sized columns",
                    checked: true
                  }, {
                    label: "Pivot summary sheet",
                    checked: true
                  }, {
                    label: "Export filtered dataset only",
                    checked: false
                  }].map(opt => /*#__PURE__*/_jsxs("label", {
                    className: "flex items-center gap-2 cursor-pointer",
                    children: [/*#__PURE__*/_jsx("input", {
                      type: "checkbox",
                      defaultChecked: opt.checked,
                      className: "rounded accent-emerald-600"
                    }), /*#__PURE__*/_jsx("span", {
                      className: "text-xs text-foreground",
                      children: opt.label
                    })]
                  }, opt.label))
                }), /*#__PURE__*/_jsxs("div", {
                  className: "flex gap-2 pt-2",
                  children: [/*#__PURE__*/_jsxs("button", {
                    onClick: () => showToast("Full dataset exported as Excel (.xlsx) successfully."),
                    className: "flex-1 flex items-center justify-center gap-2 py-2.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 transition-colors",
                    children: [/*#__PURE__*/_jsx(Table2, {
                      size: 13
                    }), " Export Full Dataset"]
                  }), /*#__PURE__*/_jsxs("button", {
                    onClick: () => showToast("Filtered dataset exported as Excel."),
                    className: "flex-1 flex items-center justify-center gap-2 py-2.5 border border-emerald-300 text-emerald-700 bg-emerald-50 rounded-lg text-xs font-semibold hover:bg-emerald-100 transition-colors",
                    children: [/*#__PURE__*/_jsx(Filter, {
                      size: 13
                    }), " Export Filtered"]
                  })]
                })]
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "bg-card border border-border rounded-xl overflow-hidden",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "flex items-center justify-between px-5 py-3.5 border-b border-border",
              children: [/*#__PURE__*/_jsxs("div", {
                children: [/*#__PURE__*/_jsx("p", {
                  className: "text-sm font-semibold text-foreground",
                  children: "Recent Reports"
                }), /*#__PURE__*/_jsxs("p", {
                  className: "text-xs text-muted-foreground",
                  children: ["Last ", RPT_RECENT_REPORTS.length, " reports generated across all categories"]
                })]
              }), /*#__PURE__*/_jsxs("div", {
                className: "flex items-center gap-2",
                children: [/*#__PURE__*/_jsxs("div", {
                  className: "relative",
                  children: [/*#__PURE__*/_jsx(Search, {
                    size: 11,
                    className: "absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                  }), /*#__PURE__*/_jsx("input", {
                    placeholder: "Search reports…",
                    className: "pl-6 pr-3 py-1.5 bg-input-background border border-border rounded-lg text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 w-36"
                  })]
                }), /*#__PURE__*/_jsxs("button", {
                  className: "flex items-center gap-1 px-2.5 py-1.5 border border-border rounded-lg text-xs text-muted-foreground hover:bg-muted transition-colors",
                  children: [/*#__PURE__*/_jsx(SortAsc, {
                    size: 11
                  }), " Sort"]
                })]
              })]
            }), /*#__PURE__*/_jsx("div", {
              className: "overflow-x-auto",
              children: /*#__PURE__*/_jsxs("table", {
                className: "w-full text-xs",
                children: [/*#__PURE__*/_jsx("thead", {
                  children: /*#__PURE__*/_jsx("tr", {
                    className: "border-b border-border bg-muted",
                    children: ["Report Name", "Report Type", "Generated By", "Generated Date", "Format", "Download"].map(h => /*#__PURE__*/_jsx("th", {
                      className: "text-left px-4 py-3 text-muted-foreground font-semibold uppercase tracking-wide whitespace-nowrap",
                      children: h
                    }, h))
                  })
                }), /*#__PURE__*/_jsx("tbody", {
                  className: "divide-y divide-border",
                  children: RPT_RECENT_REPORTS.map((r, i) => {
                    const fmtColor = r.fmt === "PDF" ? "text-red-600 bg-red-50 border-red-200" : "text-emerald-600 bg-emerald-50 border-emerald-200";
                    return /*#__PURE__*/_jsxs("tr", {
                      className: "hover:bg-muted/40 transition-colors",
                      children: [/*#__PURE__*/_jsx("td", {
                        className: "px-4 py-3 font-semibold text-foreground max-w-[240px]",
                        children: /*#__PURE__*/_jsx("p", {
                          className: "truncate",
                          children: r.name
                        })
                      }), /*#__PURE__*/_jsx("td", {
                        className: "px-4 py-3",
                        children: /*#__PURE__*/_jsx(Badge, {
                          variant: r.type === "Contract" ? "info" : r.type === "Compliance" ? "success" : r.type === "Renewal" ? "warning" : r.type === "Audit" ? "purple" : "neutral",
                          children: r.type
                        })
                      }), /*#__PURE__*/_jsx("td", {
                        className: "px-4 py-3 text-foreground whitespace-nowrap",
                        children: r.by
                      }), /*#__PURE__*/_jsx("td", {
                        className: "px-4 py-3 font-mono text-muted-foreground whitespace-nowrap",
                        children: r.date
                      }), /*#__PURE__*/_jsx("td", {
                        className: "px-4 py-3",
                        children: /*#__PURE__*/_jsxs("span", {
                          className: `inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold border ${fmtColor}`,
                          children: [r.fmt === "PDF" ? /*#__PURE__*/_jsx(Printer, {
                            size: 9
                          }) : /*#__PURE__*/_jsx(Table2, {
                            size: 9
                          }), " ", r.fmt]
                        })
                      }), /*#__PURE__*/_jsx("td", {
                        className: "px-4 py-3",
                        children: /*#__PURE__*/_jsxs("button", {
                          onClick: () => showToast(`Downloading "${r.name}"…`),
                          className: "flex items-center gap-1 px-2.5 py-1 border border-border rounded-lg text-xs text-foreground hover:bg-muted transition-colors",
                          children: [/*#__PURE__*/_jsx(Download, {
                            size: 11
                          }), " Download"]
                        })
                      })]
                    }, i);
                  })
                })]
              })
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx("p", {
              className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3",
              children: "System Notifications"
            }), /*#__PURE__*/_jsx("div", {
              className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3",
              children: [{
                icon: CheckCircle2,
                bg: "bg-emerald-50",
                border: "border-emerald-200",
                iconColor: "text-emerald-600",
                title: "Report Generated Successfully",
                msg: "Q2 Contract Summary Report has been generated and is ready for download.",
                time: "Just now"
              }, {
                icon: Printer,
                bg: "bg-red-50",
                border: "border-red-200",
                iconColor: "text-red-600",
                title: "PDF Export Complete",
                msg: "Monthly Compliance Dashboard exported to PDF (4.2 MB, 18 pages).",
                time: "2 min ago"
              }, {
                icon: Table2,
                bg: "bg-emerald-50",
                border: "border-emerald-200",
                iconColor: "text-emerald-600",
                title: "Excel Export Complete",
                msg: "Full Obligation Tracker dataset exported with 6 worksheets.",
                time: "8 min ago"
              }, {
                icon: XCircle,
                bg: "bg-red-50",
                border: "border-red-200",
                iconColor: "text-red-600",
                title: "Export Failed",
                msg: "Audit Trail PDF failed to generate — server timeout. Please retry.",
                time: "15 min ago"
              }, {
                icon: AlertTriangle,
                bg: "bg-amber-50",
                border: "border-amber-200",
                iconColor: "text-amber-600",
                title: "Report Generation Failed",
                msg: "Renewal Risk Assessment could not complete. Data source unavailable.",
                time: "32 min ago"
              }, {
                icon: Bell,
                bg: "bg-blue-50",
                border: "border-blue-200",
                iconColor: "text-blue-600",
                title: "Scheduled Report Ready",
                msg: "Weekly Compliance Summary is ready. Automatically sent to 3 recipients.",
                time: "1 hr ago"
              }].map((n, i) => /*#__PURE__*/_jsxs("div", {
                className: `${n.bg} border ${n.border} rounded-xl p-4 flex gap-3`,
                children: [/*#__PURE__*/_jsx("div", {
                  className: "flex-shrink-0 mt-0.5",
                  children: /*#__PURE__*/_jsx(n.icon, {
                    size: 16,
                    className: n.iconColor
                  })
                }), /*#__PURE__*/_jsxs("div", {
                  className: "flex-1 min-w-0",
                  children: [/*#__PURE__*/_jsx("p", {
                    className: "text-xs font-semibold text-foreground",
                    children: n.title
                  }), /*#__PURE__*/_jsx("p", {
                    className: "text-xs text-muted-foreground mt-0.5 leading-relaxed",
                    children: n.msg
                  }), /*#__PURE__*/_jsx("p", {
                    className: "text-[10px] text-muted-foreground mt-1.5 font-mono",
                    children: n.time
                  })]
                }), /*#__PURE__*/_jsx("button", {
                  className: "flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors",
                  children: /*#__PURE__*/_jsx(X, {
                    size: 12
                  })
                })]
              }, i))
            })]
          })]
        })
      })]
    })]
  });
}

// ── Notification Center ───────────────────────────────────────────────────

const NC_RENEWAL_NOTIFS = [{
  id: "N001",
  contract: "Commercial Lease — HQ Tower A",
  vendor: "Metropolitan REIT Corp.",
  expiry: "May 31, 2024",
  daysLeft: 0,
  priority: "Critical",
  read: false,
  type: "renewal"
}, {
  id: "N002",
  contract: "APAC Distribution Agreement",
  vendor: "Pacific Trade Co. Ltd.",
  expiry: "Jun 30, 2024",
  daysLeft: 7,
  priority: "High",
  read: false,
  type: "renewal"
}, {
  id: "N003",
  contract: "Enterprise SaaS — Salesforce CRM",
  vendor: "Salesforce Inc.",
  expiry: "Dec 31, 2024",
  daysLeft: 15,
  priority: "Medium",
  read: true,
  type: "renewal"
}, {
  id: "N004",
  contract: "Marketing Agency Retainer",
  vendor: "Ogilvy & Mather",
  expiry: "Dec 31, 2024",
  daysLeft: 30,
  priority: "Medium",
  read: true,
  type: "renewal"
}, {
  id: "N005",
  contract: "Mutual NDA — TechVenture Group",
  vendor: "TechVenture Group LLC",
  expiry: "Apr 9, 2025",
  daysLeft: 90,
  priority: "Low",
  read: true,
  type: "renewal"
}];
const NC_OBLIGATION_NOTIFS = [{
  id: "O001",
  title: "Annual Insurance Certificate Renewal",
  contract: "Commercial Lease — HQ Tower A",
  assignee: "Lisa Torres",
  initials: "LT",
  due: "May 15, 2024",
  daysLeft: -3,
  priority: "Critical",
  status: "Overdue",
  read: false
}, {
  id: "O002",
  title: "Q2 Compliance Report Submission",
  contract: "Master Services Agreement",
  assignee: "Sarah Chen",
  initials: "SC",
  due: "Jun 30, 2024",
  daysLeft: 0,
  priority: "High",
  status: "Due Today",
  read: false
}, {
  id: "O003",
  title: "GDPR Data Audit Completion",
  contract: "GDPR Data Processing Agreement",
  assignee: "David Park",
  initials: "DP",
  due: "Jul 1, 2024",
  daysLeft: 7,
  priority: "High",
  status: "Upcoming",
  read: false
}, {
  id: "O004",
  title: "APAC Vendor Performance Review",
  contract: "APAC Distribution Agreement",
  assignee: "James Lee",
  initials: "JL",
  due: "Jun 15, 2024",
  daysLeft: 12,
  priority: "Medium",
  status: "Upcoming",
  read: true
}, {
  id: "O005",
  title: "AWS Usage Compliance Report",
  contract: "Cloud Infrastructure Agreement",
  assignee: "Mark Johnson",
  initials: "MJ",
  due: "Jul 15, 2024",
  daysLeft: 21,
  priority: "Medium",
  status: "Upcoming",
  read: true
}];
const NC_COMPLIANCE_NOTIFS = [{
  id: "C001",
  name: "GDPR Article 28 Compliance",
  dept: "Legal",
  due: "Jun 30, 2024",
  status: "Overdue",
  type: "Missing Documentation",
  read: false
}, {
  id: "C002",
  name: "SOC 2 Type II Certification Renewal",
  dept: "IT",
  due: "Jul 15, 2024",
  status: "Pending",
  type: "Compliance Pending",
  read: false
}, {
  id: "C003",
  name: "CCPA Privacy Policy Update",
  dept: "Compliance",
  due: "Jun 1, 2024",
  status: "Completed",
  type: "Compliance Completed",
  read: true
}, {
  id: "C004",
  name: "Annual Security Audit",
  dept: "IT",
  due: "Jul 1, 2024",
  status: "Pending",
  type: "Policy Violation",
  read: false
}, {
  id: "C005",
  name: "Q2 Vendor Risk Assessment",
  dept: "Procurement",
  due: "Jun 20, 2024",
  status: "Completed",
  type: "Compliance Completed",
  read: true
}];
const NC_APPROVAL_NOTIFS = [{
  id: "A001",
  contract: "Legal Advisory Consulting Agreement",
  requestedBy: "Lisa Torres",
  initials: "LT",
  level: "Legal Review",
  date: "Jun 2, 2024",
  status: "Waiting",
  read: false
}, {
  id: "A002",
  contract: "APAC Distribution Agreement",
  requestedBy: "James Lee",
  initials: "JL",
  level: "Department Approval",
  date: "May 31, 2024",
  status: "Escalated",
  read: false
}, {
  id: "A003",
  contract: "Cloud Infrastructure — AWS",
  requestedBy: "Mark Johnson",
  initials: "MJ",
  level: "Executive Approval",
  date: "May 28, 2024",
  status: "Approved",
  read: true
}, {
  id: "A004",
  contract: "Marketing Agency Retainer",
  requestedBy: "Sarah Chen",
  initials: "SC",
  level: "Compliance Review",
  date: "May 25, 2024",
  status: "Rejected",
  read: true
}, {
  id: "A005",
  contract: "Mutual NDA — TechVenture Group",
  requestedBy: "Sarah Chen",
  initials: "SC",
  level: "Legal Review",
  date: "Jun 3, 2024",
  status: "New",
  read: false
}];
const NC_EMAIL_NOTIFS = [{
  id: "E001",
  subject: "URGENT: Commercial Lease Expiry Today",
  recipient: "lisa.torres@contractiq.com",
  status: "Delivered",
  sent: "Jun 3, 06:00 AM"
}, {
  id: "E002",
  subject: "7-Day Renewal Warning: APAC Distribution",
  recipient: "james.lee@contractiq.com",
  status: "Delivered",
  sent: "Jun 2, 09:00 AM"
}, {
  id: "E003",
  subject: "Obligation Due: Q2 Compliance Report",
  recipient: "sarah.chen@contractiq.com",
  status: "Delivered",
  sent: "Jun 3, 08:00 AM"
}, {
  id: "E004",
  subject: "Approval Required: Legal Advisory Agreement",
  recipient: "sarah.chen@contractiq.com",
  status: "Failed",
  sent: "Jun 2, 10:00 AM"
}, {
  id: "E005",
  subject: "30-Day Notice: Marketing Agency Retainer",
  recipient: "sarah.chen@contractiq.com",
  status: "Delivered",
  sent: "Jun 1, 09:00 AM"
}];
const NC_SMS_NOTIFS = [{
  id: "S001",
  message: "URGENT: Commercial Lease expires TODAY. Immediate action required.",
  mobile: "+1 (555) 010-2345",
  status: "Delivered",
  sent: "Jun 3, 06:05 AM"
}, {
  id: "S002",
  message: "7-Day Warning: APAC Distribution Agreement expires Jun 30.",
  mobile: "+1 (555) 023-4567",
  status: "Delivered",
  sent: "Jun 2, 09:05 AM"
}, {
  id: "S003",
  message: "Obligation overdue: Insurance Certificate Renewal. Act now.",
  mobile: "+1 (555) 010-2345",
  status: "Failed",
  sent: "Jun 1, 07:00 AM"
}, {
  id: "S004",
  message: "Approval needed: Legal Advisory Agreement awaiting your sign-off.",
  mobile: "+1 (555) 091-2345",
  status: "Delivered",
  sent: "Jun 2, 10:05 AM"
}];
function NotificationCenterScreen() {
  const [activeTab, setActiveTab] = useState("renewal");
  const [search, setSearch] = useState("");
  const [filterPriority, setFilterPriority] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [toast, setToast] = useState(null);
  const [settings, setSettings] = useState({
    email: true,
    sms: true,
    inapp: true,
    renewal: true,
    compliance: true,
    approval: true
  });
  const [readSet, setReadSet] = useState(new Set(["N003", "N004", "N005", "O004", "O005", "C003", "C005", "A003", "A004"]));
  const showToast = msg => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };
  const markRead = id => setReadSet(s => {
    const n = new Set(s);
    n.add(id);
    return n;
  });
  const markAllRead = () => {
    const all = [...NC_RENEWAL_NOTIFS, ...NC_OBLIGATION_NOTIFS, ...NC_COMPLIANCE_NOTIFS, ...NC_APPROVAL_NOTIFS].map(n => n.id);
    setReadSet(new Set(all));
    showToast("All notifications marked as read.");
  };
  const unreadCount = [...NC_RENEWAL_NOTIFS.filter(n => !readSet.has(n.id)), ...NC_OBLIGATION_NOTIFS.filter(n => !readSet.has(n.id)), ...NC_COMPLIANCE_NOTIFS.filter(n => !readSet.has(n.id)), ...NC_APPROVAL_NOTIFS.filter(n => !readSet.has(n.id))].length;
  const kpis = [{
    label: "Total",
    value: "47",
    icon: Bell,
    bg: "bg-blue-600",
    sub: "All channels"
  }, {
    label: "Unread",
    value: String(unreadCount),
    icon: BellRing,
    bg: "bg-red-500",
    sub: "Needs attention"
  }, {
    label: "Renewal Reminders",
    value: String(NC_RENEWAL_NOTIFS.length),
    icon: CalendarClock,
    bg: "bg-amber-500",
    sub: "3 critical"
  }, {
    label: "Due Obligations",
    value: String(NC_OBLIGATION_NOTIFS.length),
    icon: ClipboardList,
    bg: "bg-violet-500",
    sub: "2 overdue"
  }, {
    label: "Pending Approvals",
    value: String(NC_APPROVAL_NOTIFS.filter(a => a.status === "Waiting" || a.status === "New" || a.status === "Escalated").length),
    icon: Hourglass,
    bg: "bg-orange-500",
    sub: "2 escalated"
  }, {
    label: "Compliance Alerts",
    value: String(NC_COMPLIANCE_NOTIFS.filter(c => c.status !== "Completed").length),
    icon: ShieldAlert,
    bg: "bg-emerald-600",
    sub: "1 violation"
  }];
  const TABS = [{
    id: "renewal",
    label: "Renewal Reminders",
    icon: CalendarClock,
    badge: NC_RENEWAL_NOTIFS.filter(n => !readSet.has(n.id)).length
  }, {
    id: "obligation",
    label: "Obligation Alerts",
    icon: ClipboardList,
    badge: NC_OBLIGATION_NOTIFS.filter(n => !readSet.has(n.id)).length
  }, {
    id: "compliance",
    label: "Compliance",
    icon: ShieldCheck,
    badge: NC_COMPLIANCE_NOTIFS.filter(n => !readSet.has(n.id)).length
  }, {
    id: "approval",
    label: "Approvals",
    icon: FileCheck,
    badge: NC_APPROVAL_NOTIFS.filter(n => !readSet.has(n.id)).length
  }, {
    id: "channels",
    label: "Channels",
    icon: Mail
  }, {
    id: "settings",
    label: "Settings",
    icon: Settings
  }];
  const selectCls = "px-2.5 py-1.5 bg-input-background border border-border rounded-lg text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary";
  const priorityVariant = {
    Critical: "danger",
    High: "warning",
    Medium: "info",
    Low: "neutral"
  };
  const approvalVariant = {
    New: "info",
    Waiting: "warning",
    Approved: "success",
    Rejected: "danger",
    Escalated: "orange"
  };
  const complianceVariant = {
    Completed: "success",
    Pending: "warning",
    Overdue: "danger"
  };
  const deliveryVariant = {
    Delivered: "success",
    Failed: "danger",
    Pending: "warning"
  };
  const NCard = ({
    id,
    unread,
    priority,
    children
  }) => /*#__PURE__*/_jsxs("div", {
    className: `relative bg-card border rounded-xl p-4 hover:shadow-md transition-all ${unread ? "border-blue-200 shadow-sm" : "border-border"}`,
    onClick: () => markRead(id),
    children: [unread && /*#__PURE__*/_jsx("div", {
      className: "absolute top-3.5 right-3.5 w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"
    }), priority && /*#__PURE__*/_jsx("div", {
      className: "absolute top-0 left-0 w-1 h-full rounded-l-xl",
      style: {
        background: priority === "Critical" ? "#EF4444" : priority === "High" ? "#F59E0B" : priority === "Medium" ? "#3B82F6" : "#94A3B8"
      }
    }), /*#__PURE__*/_jsx("div", {
      className: priority ? "pl-2" : "",
      children: children
    })]
  });
  const SettingToggle = ({
    k,
    label,
    desc,
    icon: Icon
  }) => /*#__PURE__*/_jsxs("div", {
    className: "flex items-center justify-between py-3.5 border-b border-border last:border-0",
    children: [/*#__PURE__*/_jsxs("div", {
      className: "flex items-center gap-3",
      children: [/*#__PURE__*/_jsx("div", {
        className: `p-2 rounded-lg ${settings[k] ? "bg-blue-100" : "bg-muted"}`,
        children: /*#__PURE__*/_jsx(Icon, {
          size: 14,
          className: settings[k] ? "text-blue-600" : "text-muted-foreground"
        })
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("p", {
          className: "text-sm font-semibold text-foreground",
          children: label
        }), /*#__PURE__*/_jsx("p", {
          className: "text-xs text-muted-foreground",
          children: desc
        })]
      })]
    }), /*#__PURE__*/_jsx("button", {
      onClick: () => setSettings(s => ({
        ...s,
        [k]: !s[k]
      })),
      className: `relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${settings[k] ? "bg-primary" : "bg-slate-300"}`,
      children: /*#__PURE__*/_jsx("span", {
        className: `absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${settings[k] ? "translate-x-5" : ""}`
      })
    })]
  });
  return /*#__PURE__*/_jsxs("div", {
    className: "flex flex-col h-full overflow-hidden",
    children: [toast && /*#__PURE__*/_jsxs("div", {
      className: "fixed top-4 right-4 z-50 bg-slate-900 text-white text-xs font-medium px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2",
      children: [/*#__PURE__*/_jsx(CheckCircle2, {
        size: 13,
        className: "text-emerald-400"
      }), " ", toast]
    }), /*#__PURE__*/_jsxs("div", {
      className: "bg-card border-b border-border px-6 pt-5 pb-0 flex-shrink-0",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "flex items-center justify-between mb-4 flex-wrap gap-3",
        children: [/*#__PURE__*/_jsx("div", {
          className: "flex items-center gap-3",
          children: /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsxs("div", {
              className: "flex items-center gap-2",
              children: [/*#__PURE__*/_jsx("h1", {
                className: "text-xl font-bold text-foreground",
                style: {
                  fontFamily: "var(--font-display)"
                },
                children: "Notification Center"
              }), unreadCount > 0 && /*#__PURE__*/_jsx("span", {
                className: "inline-flex items-center justify-center min-w-[22px] h-[22px] bg-red-500 text-white text-[10px] font-bold rounded-full px-1.5",
                children: unreadCount
              })]
            }), /*#__PURE__*/_jsx("p", {
              className: "text-xs text-muted-foreground mt-0.5",
              children: "Stay informed on all contract events, deadlines, and approvals"
            })]
          })
        }), /*#__PURE__*/_jsxs("div", {
          className: "flex items-center gap-2 flex-wrap",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "relative",
            children: [/*#__PURE__*/_jsx(Search, {
              size: 13,
              className: "absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            }), /*#__PURE__*/_jsx("input", {
              value: search,
              onChange: e => setSearch(e.target.value),
              placeholder: "Search notifications…",
              className: "pl-8 pr-3 py-1.5 bg-input-background border border-border rounded-lg text-xs w-44 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            })]
          }), /*#__PURE__*/_jsx("select", {
            value: filterPriority,
            onChange: e => setFilterPriority(e.target.value),
            className: selectCls,
            children: ["All Priorities", "Critical", "High", "Medium", "Low"].map(o => /*#__PURE__*/_jsx("option", {
              children: o
            }, o))
          }), /*#__PURE__*/_jsx("select", {
            value: filterStatus,
            onChange: e => setFilterStatus(e.target.value),
            className: selectCls,
            children: ["All Statuses", "Unread", "Read", "Overdue", "Upcoming", "Completed"].map(o => /*#__PURE__*/_jsx("option", {
              children: o
            }, o))
          }), /*#__PURE__*/_jsxs("button", {
            onClick: markAllRead,
            className: "flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-lg text-xs font-medium text-foreground hover:bg-muted transition-colors",
            children: [/*#__PURE__*/_jsx(CheckCircle2, {
              size: 12
            }), " Mark All Read"]
          }), /*#__PURE__*/_jsxs("button", {
            onClick: () => setActiveTab("settings"),
            className: "flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors",
            children: [/*#__PURE__*/_jsx(Settings, {
              size: 12
            }), " Settings"]
          })]
        })]
      }), /*#__PURE__*/_jsx("div", {
        className: "flex items-center gap-0 overflow-x-auto",
        children: TABS.map(tab => /*#__PURE__*/_jsxs("button", {
          onClick: () => setActiveTab(tab.id),
          className: `flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors relative ${activeTab === tab.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`,
          children: [/*#__PURE__*/_jsx(tab.icon, {
            size: 13
          }), tab.label, tab.badge !== undefined && tab.badge > 0 && /*#__PURE__*/_jsx("span", {
            className: "ml-0.5 inline-flex items-center justify-center min-w-[16px] h-4 bg-red-500 text-white text-[9px] font-bold rounded-full px-1",
            children: tab.badge
          })]
        }, tab.id))
      })]
    }), /*#__PURE__*/_jsx("div", {
      className: "flex-1 overflow-y-auto",
      children: /*#__PURE__*/_jsxs("div", {
        className: "p-5 space-y-5 max-w-[1400px] mx-auto",
        children: [/*#__PURE__*/_jsx("div", {
          className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4",
          children: kpis.map(k => /*#__PURE__*/_jsxs("div", {
            className: "bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "flex items-start justify-between mb-2.5",
              children: [/*#__PURE__*/_jsx("div", {
                className: `p-2 rounded-lg ${k.bg}`,
                children: /*#__PURE__*/_jsx(k.icon, {
                  size: 14,
                  className: "text-white"
                })
              }), k.label === "Unread" && unreadCount > 0 && /*#__PURE__*/_jsx("div", {
                className: "w-2 h-2 rounded-full bg-red-500 animate-pulse"
              })]
            }), /*#__PURE__*/_jsx("p", {
              className: "text-2xl font-bold font-mono text-foreground",
              children: k.value
            }), /*#__PURE__*/_jsx("p", {
              className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mt-0.5",
              children: k.label
            }), /*#__PURE__*/_jsx("p", {
              className: "text-[10px] text-muted-foreground",
              children: k.sub
            })]
          }, k.label))
        }), activeTab === "renewal" && /*#__PURE__*/_jsxs("div", {
          className: "space-y-4",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "flex items-center justify-between",
            children: [/*#__PURE__*/_jsx("p", {
              className: "text-sm font-bold text-foreground",
              children: "Renewal Reminder Notifications"
            }), /*#__PURE__*/_jsxs("div", {
              className: "flex items-center gap-2 text-xs text-muted-foreground",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "flex items-center gap-1",
                children: [/*#__PURE__*/_jsx("div", {
                  className: "w-2.5 h-2.5 rounded-sm bg-red-500"
                }), "Critical"]
              }), /*#__PURE__*/_jsxs("div", {
                className: "flex items-center gap-1",
                children: [/*#__PURE__*/_jsx("div", {
                  className: "w-2.5 h-2.5 rounded-sm bg-amber-500"
                }), "High"]
              }), /*#__PURE__*/_jsxs("div", {
                className: "flex items-center gap-1",
                children: [/*#__PURE__*/_jsx("div", {
                  className: "w-2.5 h-2.5 rounded-sm bg-blue-500"
                }), "Medium"]
              }), /*#__PURE__*/_jsxs("div", {
                className: "flex items-center gap-1",
                children: [/*#__PURE__*/_jsx("div", {
                  className: "w-2.5 h-2.5 rounded-sm bg-slate-400"
                }), "Low"]
              })]
            })]
          }), /*#__PURE__*/_jsx("div", {
            className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4",
            children: NC_RENEWAL_NOTIFS.map(n => {
              const isUnread = !readSet.has(n.id);
              const urgencyLabel = n.daysLeft === 0 ? "Expires Today" : n.daysLeft <= 7 ? `${n.daysLeft} days left` : n.daysLeft <= 15 ? `${n.daysLeft} days left` : n.daysLeft <= 30 ? `${n.daysLeft} days left` : `${n.daysLeft} days left`;
              return /*#__PURE__*/_jsxs(NCard, {
                id: n.id,
                unread: isUnread,
                priority: n.priority,
                children: [/*#__PURE__*/_jsxs("div", {
                  className: "flex items-start justify-between gap-2 mb-2.5",
                  children: [/*#__PURE__*/_jsxs("div", {
                    className: "flex items-center gap-2",
                    children: [/*#__PURE__*/_jsx("div", {
                      className: `p-1.5 rounded-lg ${n.daysLeft === 0 ? "bg-red-100" : n.daysLeft <= 7 ? "bg-amber-100" : "bg-blue-100"}`,
                      children: /*#__PURE__*/_jsx(CalendarClock, {
                        size: 13,
                        className: n.daysLeft === 0 ? "text-red-600" : n.daysLeft <= 7 ? "text-amber-600" : "text-blue-600"
                      })
                    }), /*#__PURE__*/_jsx(Badge, {
                      variant: priorityVariant[n.priority] || "neutral",
                      children: n.priority
                    })]
                  }), /*#__PURE__*/_jsx("span", {
                    className: `text-[10px] font-bold font-mono ${n.daysLeft === 0 ? "text-red-600" : n.daysLeft <= 7 ? "text-amber-600" : "text-blue-600"}`,
                    children: urgencyLabel
                  })]
                }), /*#__PURE__*/_jsx("p", {
                  className: "text-xs font-bold text-foreground mb-0.5 leading-snug",
                  children: n.contract
                }), /*#__PURE__*/_jsxs("p", {
                  className: "text-xs text-muted-foreground mb-0.5",
                  children: ["Vendor: ", n.vendor]
                }), /*#__PURE__*/_jsxs("p", {
                  className: "text-xs text-muted-foreground font-mono",
                  children: ["Expiry: ", n.expiry]
                }), /*#__PURE__*/_jsxs("div", {
                  className: "flex gap-2 mt-3",
                  children: [/*#__PURE__*/_jsx("button", {
                    onClick: () => showToast(`Viewing ${n.contract}.`),
                    className: "flex-1 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors",
                    children: "View Contract"
                  }), /*#__PURE__*/_jsx("button", {
                    onClick: () => showToast("Reminder sent."),
                    className: "px-3 py-1.5 border border-border rounded-lg text-xs font-medium hover:bg-muted transition-colors",
                    children: "Remind"
                  })]
                })]
              }, n.id);
            })
          })]
        }), activeTab === "obligation" && /*#__PURE__*/_jsxs("div", {
          className: "space-y-4",
          children: [/*#__PURE__*/_jsx("p", {
            className: "text-sm font-bold text-foreground",
            children: "Obligation Due Alerts"
          }), /*#__PURE__*/_jsx("div", {
            className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4",
            children: NC_OBLIGATION_NOTIFS.map(n => {
              const isUnread = !readSet.has(n.id);
              return /*#__PURE__*/_jsxs(NCard, {
                id: n.id,
                unread: isUnread,
                priority: n.priority,
                children: [/*#__PURE__*/_jsxs("div", {
                  className: "flex items-start justify-between gap-2 mb-2.5",
                  children: [/*#__PURE__*/_jsx(Badge, {
                    variant: priorityVariant[n.priority] || "neutral",
                    children: n.priority
                  }), /*#__PURE__*/_jsx(Badge, {
                    variant: n.status === "Overdue" ? "danger" : n.status === "Due Today" ? "orange" : "info",
                    children: n.status
                  })]
                }), /*#__PURE__*/_jsx("p", {
                  className: "text-xs font-bold text-foreground mb-0.5 leading-snug",
                  children: n.title
                }), /*#__PURE__*/_jsx("p", {
                  className: "text-xs text-muted-foreground mb-0.5 truncate",
                  children: n.contract
                }), /*#__PURE__*/_jsxs("div", {
                  className: "flex items-center gap-1.5 mt-1.5 mb-1",
                  children: [/*#__PURE__*/_jsx(Av, {
                    initials: n.initials,
                    size: "sm"
                  }), /*#__PURE__*/_jsx("span", {
                    className: "text-xs text-foreground",
                    children: n.assignee
                  })]
                }), /*#__PURE__*/_jsxs("p", {
                  className: "text-xs font-mono text-muted-foreground",
                  children: ["Due: ", n.due]
                }), n.daysLeft < 0 && /*#__PURE__*/_jsxs("p", {
                  className: "text-xs font-bold text-red-600 mt-1",
                  children: [Math.abs(n.daysLeft), "d overdue"]
                }), n.daysLeft === 0 && /*#__PURE__*/_jsx("p", {
                  className: "text-xs font-bold text-orange-600 mt-1",
                  children: "Due today"
                }), n.daysLeft > 0 && /*#__PURE__*/_jsxs("p", {
                  className: "text-xs font-bold text-blue-600 mt-1",
                  children: [n.daysLeft, "d remaining"]
                }), /*#__PURE__*/_jsxs("div", {
                  className: "flex gap-2 mt-3",
                  children: [/*#__PURE__*/_jsx("button", {
                    onClick: () => showToast(`Viewing obligation.`),
                    className: "flex-1 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors",
                    children: "View Details"
                  }), /*#__PURE__*/_jsx("button", {
                    onClick: () => showToast("Escalation sent."),
                    className: "px-3 py-1.5 border border-red-300 text-red-600 bg-red-50 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors",
                    children: "Escalate"
                  })]
                })]
              }, n.id);
            })
          })]
        }), activeTab === "compliance" && /*#__PURE__*/_jsxs("div", {
          className: "space-y-4",
          children: [/*#__PURE__*/_jsx("p", {
            className: "text-sm font-bold text-foreground",
            children: "Compliance Notifications"
          }), /*#__PURE__*/_jsx("div", {
            className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4",
            children: NC_COMPLIANCE_NOTIFS.map(n => {
              const isUnread = !readSet.has(n.id);
              const typeIcon = n.type === "Compliance Completed" ? CheckCircle2 : n.type === "Missing Documentation" ? AlertCircle : n.type === "Policy Violation" ? ShieldAlert : AlertTriangle;
              const typeBg = n.type === "Compliance Completed" ? "bg-emerald-100" : n.type === "Missing Documentation" ? "bg-red-100" : n.type === "Policy Violation" ? "bg-orange-100" : "bg-amber-100";
              const typeColor = n.type === "Compliance Completed" ? "text-emerald-600" : n.type === "Missing Documentation" ? "text-red-600" : n.type === "Policy Violation" ? "text-orange-600" : "text-amber-600";
              const TypeIcon = typeIcon;
              return /*#__PURE__*/_jsxs(NCard, {
                id: n.id,
                unread: isUnread,
                children: [/*#__PURE__*/_jsxs("div", {
                  className: "flex items-start gap-3 mb-3",
                  children: [/*#__PURE__*/_jsx("div", {
                    className: `p-2 rounded-lg ${typeBg} flex-shrink-0`,
                    children: /*#__PURE__*/_jsx(TypeIcon, {
                      size: 14,
                      className: typeColor
                    })
                  }), /*#__PURE__*/_jsxs("div", {
                    className: "flex-1 min-w-0",
                    children: [/*#__PURE__*/_jsxs("div", {
                      className: "flex items-center justify-between gap-2 mb-0.5",
                      children: [/*#__PURE__*/_jsx("p", {
                        className: "text-xs font-bold text-foreground leading-snug truncate",
                        children: n.name
                      }), /*#__PURE__*/_jsx(Badge, {
                        variant: complianceVariant[n.status] || "neutral",
                        children: n.status
                      })]
                    }), /*#__PURE__*/_jsx("p", {
                      className: "text-[10px] text-muted-foreground",
                      children: n.type
                    })]
                  })]
                }), /*#__PURE__*/_jsxs("div", {
                  className: "flex items-center justify-between text-xs text-muted-foreground",
                  children: [/*#__PURE__*/_jsxs("span", {
                    className: "flex items-center gap-1",
                    children: [/*#__PURE__*/_jsx(Building2, {
                      size: 11
                    }), n.dept]
                  }), /*#__PURE__*/_jsxs("span", {
                    className: "font-mono",
                    children: ["Due: ", n.due]
                  })]
                }), /*#__PURE__*/_jsx("button", {
                  onClick: () => showToast(`Viewing compliance record.`),
                  className: "w-full mt-3 py-1.5 border border-border rounded-lg text-xs font-medium hover:bg-muted transition-colors",
                  children: "View Details"
                })]
              }, n.id);
            })
          })]
        }), activeTab === "approval" && /*#__PURE__*/_jsxs("div", {
          className: "space-y-4",
          children: [/*#__PURE__*/_jsx("p", {
            className: "text-sm font-bold text-foreground",
            children: "Contract Approval Alerts"
          }), /*#__PURE__*/_jsx("div", {
            className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4",
            children: NC_APPROVAL_NOTIFS.map(n => {
              const isUnread = !readSet.has(n.id);
              return /*#__PURE__*/_jsxs(NCard, {
                id: n.id,
                unread: isUnread,
                children: [/*#__PURE__*/_jsxs("div", {
                  className: "flex items-start gap-3 mb-3",
                  children: [/*#__PURE__*/_jsx(Av, {
                    initials: n.initials,
                    size: "md"
                  }), /*#__PURE__*/_jsxs("div", {
                    className: "flex-1 min-w-0",
                    children: [/*#__PURE__*/_jsxs("div", {
                      className: "flex items-center justify-between gap-2",
                      children: [/*#__PURE__*/_jsx("p", {
                        className: "text-xs font-bold text-foreground truncate max-w-[200px]",
                        children: n.contract
                      }), /*#__PURE__*/_jsx(Badge, {
                        variant: approvalVariant[n.status] || "neutral",
                        children: n.status
                      })]
                    }), /*#__PURE__*/_jsxs("p", {
                      className: "text-xs text-muted-foreground mt-0.5",
                      children: ["Requested by ", /*#__PURE__*/_jsx("span", {
                        className: "font-medium text-foreground",
                        children: n.requestedBy
                      })]
                    }), /*#__PURE__*/_jsxs("p", {
                      className: "text-xs text-muted-foreground",
                      children: ["Approval Level: ", /*#__PURE__*/_jsx("span", {
                        className: "font-medium text-foreground",
                        children: n.level
                      })]
                    }), /*#__PURE__*/_jsx("p", {
                      className: "text-xs font-mono text-muted-foreground",
                      children: n.date
                    })]
                  })]
                }), (n.status === "Waiting" || n.status === "New") && /*#__PURE__*/_jsxs("div", {
                  className: "flex gap-2 pt-3 border-t border-border",
                  children: [/*#__PURE__*/_jsxs("button", {
                    onClick: () => showToast(`${n.contract} approved.`),
                    className: "flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 transition-colors",
                    children: [/*#__PURE__*/_jsx(ThumbsUp, {
                      size: 11
                    }), " Approve"]
                  }), /*#__PURE__*/_jsxs("button", {
                    onClick: () => showToast(`${n.contract} rejected.`),
                    className: "flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700 transition-colors",
                    children: [/*#__PURE__*/_jsx(ThumbsDown, {
                      size: 11
                    }), " Reject"]
                  }), /*#__PURE__*/_jsx("button", {
                    onClick: () => showToast("Escalated to senior review."),
                    className: "px-3 py-1.5 border border-amber-300 text-amber-700 bg-amber-50 rounded-lg text-xs font-medium hover:bg-amber-100 transition-colors",
                    children: "Escalate"
                  })]
                })]
              }, n.id);
            })
          })]
        }), activeTab === "channels" && /*#__PURE__*/_jsxs("div", {
          className: "grid grid-cols-1 xl:grid-cols-2 gap-5",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "bg-card border border-border rounded-xl overflow-hidden",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "px-5 py-3.5 border-b border-border flex items-center gap-2.5",
              children: [/*#__PURE__*/_jsx("div", {
                className: "p-2 bg-blue-100 rounded-lg",
                children: /*#__PURE__*/_jsx(Mail, {
                  size: 14,
                  className: "text-blue-600"
                })
              }), /*#__PURE__*/_jsxs("div", {
                children: [/*#__PURE__*/_jsx("p", {
                  className: "text-sm font-bold text-foreground",
                  children: "Email Notifications"
                }), /*#__PURE__*/_jsx("p", {
                  className: "text-xs text-muted-foreground",
                  children: "Delivery log for all outbound emails"
                })]
              })]
            }), /*#__PURE__*/_jsx("div", {
              className: "overflow-x-auto",
              children: /*#__PURE__*/_jsxs("table", {
                className: "w-full text-xs",
                children: [/*#__PURE__*/_jsx("thead", {
                  children: /*#__PURE__*/_jsx("tr", {
                    className: "border-b border-border bg-muted",
                    children: ["Subject", "Recipient", "Status", "Sent Time"].map(h => /*#__PURE__*/_jsx("th", {
                      className: "text-left px-4 py-3 text-muted-foreground font-semibold uppercase tracking-wide whitespace-nowrap",
                      children: h
                    }, h))
                  })
                }), /*#__PURE__*/_jsx("tbody", {
                  className: "divide-y divide-border",
                  children: NC_EMAIL_NOTIFS.map(e => /*#__PURE__*/_jsxs("tr", {
                    className: "hover:bg-muted/40 transition-colors",
                    children: [/*#__PURE__*/_jsx("td", {
                      className: "px-4 py-3 font-medium text-foreground max-w-[200px]",
                      children: /*#__PURE__*/_jsx("p", {
                        className: "truncate",
                        children: e.subject
                      })
                    }), /*#__PURE__*/_jsx("td", {
                      className: "px-4 py-3 text-muted-foreground whitespace-nowrap",
                      children: e.recipient
                    }), /*#__PURE__*/_jsx("td", {
                      className: "px-4 py-3",
                      children: /*#__PURE__*/_jsx(Badge, {
                        variant: e.status === "Delivered" ? "success" : "danger",
                        children: e.status
                      })
                    }), /*#__PURE__*/_jsx("td", {
                      className: "px-4 py-3 font-mono text-muted-foreground whitespace-nowrap text-[10px]",
                      children: e.sent
                    })]
                  }, e.id))
                })]
              })
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "space-y-5",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "bg-card border border-border rounded-xl overflow-hidden",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "px-5 py-3.5 border-b border-border flex items-center gap-2.5",
                children: [/*#__PURE__*/_jsx("div", {
                  className: "p-2 bg-emerald-100 rounded-lg",
                  children: /*#__PURE__*/_jsx(Smartphone, {
                    size: 14,
                    className: "text-emerald-600"
                  })
                }), /*#__PURE__*/_jsxs("div", {
                  children: [/*#__PURE__*/_jsx("p", {
                    className: "text-sm font-bold text-foreground",
                    children: "SMS Notifications"
                  }), /*#__PURE__*/_jsx("p", {
                    className: "text-xs text-muted-foreground",
                    children: "Text message delivery log"
                  })]
                })]
              }), /*#__PURE__*/_jsx("div", {
                className: "divide-y divide-border",
                children: NC_SMS_NOTIFS.map(s => /*#__PURE__*/_jsx("div", {
                  className: "px-5 py-3.5 hover:bg-muted/40 transition-colors",
                  children: /*#__PURE__*/_jsxs("div", {
                    className: "flex items-start justify-between gap-3",
                    children: [/*#__PURE__*/_jsxs("div", {
                      className: "flex-1 min-w-0",
                      children: [/*#__PURE__*/_jsx("p", {
                        className: "text-xs font-medium text-foreground leading-snug",
                        children: s.message
                      }), /*#__PURE__*/_jsxs("div", {
                        className: "flex items-center gap-3 mt-1.5",
                        children: [/*#__PURE__*/_jsxs("span", {
                          className: "text-[10px] text-muted-foreground flex items-center gap-1",
                          children: [/*#__PURE__*/_jsx(Phone, {
                            size: 9
                          }), s.mobile]
                        }), /*#__PURE__*/_jsx("span", {
                          className: "text-[10px] font-mono text-muted-foreground",
                          children: s.sent
                        })]
                      })]
                    }), /*#__PURE__*/_jsx(Badge, {
                      variant: s.status === "Delivered" ? "success" : "danger",
                      children: s.status
                    })]
                  })
                }, s.id))
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "bg-card border border-border rounded-xl overflow-hidden",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "px-5 py-3.5 border-b border-border flex items-center gap-2.5",
                children: [/*#__PURE__*/_jsx("div", {
                  className: "p-2 bg-violet-100 rounded-lg",
                  children: /*#__PURE__*/_jsx(Monitor, {
                    size: 14,
                    className: "text-violet-600"
                  })
                }), /*#__PURE__*/_jsxs("div", {
                  children: [/*#__PURE__*/_jsx("p", {
                    className: "text-sm font-bold text-foreground",
                    children: "In-App Notifications"
                  }), /*#__PURE__*/_jsx("p", {
                    className: "text-xs text-muted-foreground",
                    children: "Platform notification feed"
                  })]
                })]
              }), /*#__PURE__*/_jsx("div", {
                className: "divide-y divide-border",
                children: [{
                  icon: CalendarX,
                  bg: "bg-red-100",
                  color: "text-red-600",
                  title: "Contract Expired: Commercial Lease",
                  desc: "HQ Tower A lease expired today. Immediate renewal action required.",
                  time: "Just now",
                  read: false
                }, {
                  icon: Bell,
                  bg: "bg-amber-100",
                  color: "text-amber-600",
                  title: "7-Day Renewal Warning",
                  desc: "APAC Distribution Agreement expires in 7 days.",
                  time: "2 hrs ago",
                  read: false
                }, {
                  icon: CheckCircle2,
                  bg: "bg-emerald-100",
                  color: "text-emerald-600",
                  title: "Obligation Completed",
                  desc: "Q2 Lease Payment submitted successfully by Lisa Torres.",
                  time: "4 hrs ago",
                  read: true
                }].map((n, i) => /*#__PURE__*/_jsxs("div", {
                  className: `flex items-start gap-3 px-5 py-3.5 hover:bg-muted/40 transition-colors ${!n.read ? "bg-blue-50/30" : ""}`,
                  children: [/*#__PURE__*/_jsx("div", {
                    className: `p-1.5 rounded-lg ${n.bg} flex-shrink-0 mt-0.5`,
                    children: /*#__PURE__*/_jsx(n.icon, {
                      size: 12,
                      className: n.color
                    })
                  }), /*#__PURE__*/_jsxs("div", {
                    className: "flex-1 min-w-0",
                    children: [/*#__PURE__*/_jsxs("div", {
                      className: "flex items-center gap-2",
                      children: [/*#__PURE__*/_jsx("p", {
                        className: "text-xs font-bold text-foreground",
                        children: n.title
                      }), !n.read && /*#__PURE__*/_jsx("div", {
                        className: "w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"
                      })]
                    }), /*#__PURE__*/_jsx("p", {
                      className: "text-xs text-muted-foreground mt-0.5",
                      children: n.desc
                    }), /*#__PURE__*/_jsx("p", {
                      className: "text-[10px] font-mono text-muted-foreground mt-0.5",
                      children: n.time
                    })]
                  }), /*#__PURE__*/_jsx("button", {
                    className: "p-1 text-muted-foreground hover:text-red-500 transition-colors flex-shrink-0",
                    children: /*#__PURE__*/_jsx(Trash2, {
                      size: 11
                    })
                  })]
                }, i))
              })]
            })]
          })]
        }), activeTab === "settings" && /*#__PURE__*/_jsxs("div", {
          className: "grid grid-cols-1 xl:grid-cols-2 gap-5",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "bg-card border border-border rounded-xl overflow-hidden",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "px-5 py-3.5 border-b border-border",
              children: [/*#__PURE__*/_jsx("p", {
                className: "text-sm font-bold text-foreground",
                children: "Notification Channel Settings"
              }), /*#__PURE__*/_jsx("p", {
                className: "text-xs text-muted-foreground",
                children: "Enable or disable delivery channels for each notification type"
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "px-5",
              children: [/*#__PURE__*/_jsx(SettingToggle, {
                k: "email",
                label: "Email Notifications",
                desc: "Send alerts to registered email address",
                icon: Mail
              }), /*#__PURE__*/_jsx(SettingToggle, {
                k: "sms",
                label: "SMS Notifications",
                desc: "Send text alerts to registered mobile number",
                icon: Smartphone
              }), /*#__PURE__*/_jsx(SettingToggle, {
                k: "inapp",
                label: "In-App Notifications",
                desc: "Show alerts within the ContractIQ platform",
                icon: Monitor
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "bg-card border border-border rounded-xl overflow-hidden",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "px-5 py-3.5 border-b border-border",
              children: [/*#__PURE__*/_jsx("p", {
                className: "text-sm font-bold text-foreground",
                children: "Alert Type Settings"
              }), /*#__PURE__*/_jsx("p", {
                className: "text-xs text-muted-foreground",
                children: "Configure which events trigger notifications"
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "px-5",
              children: [/*#__PURE__*/_jsx(SettingToggle, {
                k: "renewal",
                label: "Renewal Alerts",
                desc: "Notify when contracts are expiring (90 / 30 / 7 days)",
                icon: CalendarClock
              }), /*#__PURE__*/_jsx(SettingToggle, {
                k: "compliance",
                label: "Compliance Alerts",
                desc: "Notify on overdue or missing compliance tasks",
                icon: ShieldCheck
              }), /*#__PURE__*/_jsx(SettingToggle, {
                k: "approval",
                label: "Approval Notifications",
                desc: "Notify when contracts need your approval",
                icon: FileCheck
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "xl:col-span-2 bg-card border border-border rounded-xl p-5",
            children: [/*#__PURE__*/_jsx("p", {
              className: "text-sm font-bold text-foreground mb-4",
              children: "Notification Filters"
            }), /*#__PURE__*/_jsx("div", {
              className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 mb-4",
              children: [{
                label: "Date Range",
                placeholder: "All Dates"
              }, {
                label: "Notification Type",
                placeholder: "All Types"
              }, {
                label: "Priority",
                placeholder: "All"
              }, {
                label: "Department",
                placeholder: "All Depts"
              }, {
                label: "Status",
                placeholder: "All Statuses"
              }, {
                label: "Assigned User",
                placeholder: "All Users"
              }].map(f => /*#__PURE__*/_jsxs("div", {
                children: [/*#__PURE__*/_jsx("p", {
                  className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1",
                  children: f.label
                }), /*#__PURE__*/_jsx("select", {
                  className: "w-full px-2.5 py-1.5 bg-input-background border border-border rounded-lg text-xs text-foreground focus:outline-none",
                  children: /*#__PURE__*/_jsx("option", {
                    children: f.placeholder
                  })
                })]
              }, f.label))
            }), /*#__PURE__*/_jsxs("div", {
              className: "flex gap-3",
              children: [/*#__PURE__*/_jsx("button", {
                onClick: () => showToast("Filters applied."),
                className: "px-5 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors",
                children: "Apply Filters"
              }), /*#__PURE__*/_jsx("button", {
                onClick: () => showToast("Filters cleared."),
                className: "px-5 py-2 border border-border rounded-lg text-xs font-medium text-foreground hover:bg-muted transition-colors",
                children: "Clear Filters"
              })]
            })]
          })]
        })]
      })
    })]
  });
}

// ── User & Role Management ────────────────────────────────────────────────

const UM_USERS = [{
  id: "EMP-001",
  name: "Sarah Chen",
  dept: "Legal",
  role: "Legal Manager",
  email: "sarah.chen@contractiq.com",
  status: "Active",
  lastLogin: "Jun 3, 2024 9:14 AM",
  initials: "SC"
}, {
  id: "EMP-002",
  name: "David Park",
  dept: "Compliance",
  role: "Compliance Officer",
  email: "david.park@contractiq.com",
  status: "Active",
  lastLogin: "Jun 3, 2024 8:52 AM",
  initials: "DP"
}, {
  id: "EMP-003",
  name: "Lisa Torres",
  dept: "Operations",
  role: "Legal Manager",
  email: "lisa.torres@contractiq.com",
  status: "Active",
  lastLogin: "Jun 2, 2024 4:31 PM",
  initials: "LT"
}, {
  id: "EMP-004",
  name: "Mark Johnson",
  dept: "Procurement",
  role: "Contract Manager",
  email: "mark.johnson@contractiq.com",
  status: "Active",
  lastLogin: "Jun 1, 2024 11:07 AM",
  initials: "MJ"
}, {
  id: "EMP-005",
  name: "James Lee",
  dept: "Procurement",
  role: "Contract Manager",
  email: "james.lee@contractiq.com",
  status: "Inactive",
  lastLogin: "May 28, 2024 2:45 PM",
  initials: "JL"
}, {
  id: "EMP-006",
  name: "Alexandra Ross",
  dept: "Administration",
  role: "Administrator",
  email: "admin@contractiq.com",
  status: "Active",
  lastLogin: "Jun 3, 2024 10:01 AM",
  initials: "AR"
}, {
  id: "EMP-007",
  name: "Michael Grant",
  dept: "Finance",
  role: "Department Head",
  email: "m.grant@contractiq.com",
  status: "Active",
  lastLogin: "Jun 2, 2024 3:22 PM",
  initials: "MG"
}, {
  id: "EMP-008",
  name: "Jennifer Walsh",
  dept: "Executive",
  role: "Department Head",
  email: "j.walsh@contractiq.com",
  status: "Active",
  lastLogin: "Jun 1, 2024 9:00 AM",
  initials: "JW"
}, {
  id: "EMP-009",
  name: "Ryan Patel",
  dept: "IT",
  role: "Employee",
  email: "r.patel@contractiq.com",
  status: "Active",
  lastLogin: "Jun 3, 2024 7:45 AM",
  initials: "RP"
}, {
  id: "EMP-010",
  name: "Chloe Adams",
  dept: "Marketing",
  role: "Employee",
  email: "c.adams@contractiq.com",
  status: "Active",
  lastLogin: "Jun 2, 2024 2:10 PM",
  initials: "CA"
}];
const UM_ROLES = [{
  role: "Administrator",
  color: "border-violet-300 bg-violet-50",
  badge: "bg-violet-100 text-violet-700",
  icon: ShieldCheck,
  count: 1,
  permissions: ["Full System Access", "User Management", "Role Management", "Reports & Export", "Notifications", "Audit Logs", "Contract Management"]
}, {
  role: "Legal Manager",
  color: "border-blue-300 bg-blue-50",
  badge: "bg-blue-100 text-blue-700",
  icon: FileText,
  count: 3,
  permissions: ["Contract Creation", "Contract Approval", "Legal Review", "Reports", "Notifications", "Obligation Tracking"]
}, {
  role: "Compliance Officer",
  color: "border-emerald-300 bg-emerald-50",
  badge: "bg-emerald-100 text-emerald-700",
  icon: Shield,
  count: 2,
  permissions: ["Compliance Monitoring", "Audit Reports", "Obligation Tracking", "Compliance Notifications"]
}, {
  role: "Contract Manager",
  color: "border-amber-300 bg-amber-50",
  badge: "bg-amber-100 text-amber-700",
  icon: Briefcase,
  count: 2,
  permissions: ["Create Contracts", "Edit Contracts", "Renewal Management", "Vendor Management", "Obligation Tracking", "Notifications"]
}, {
  role: "Department Head",
  color: "border-orange-300 bg-orange-50",
  badge: "bg-orange-100 text-orange-700",
  icon: Building2,
  count: 2,
  permissions: ["Department Contracts", "Employee Assignments", "Department Reports", "Approvals", "Renewal Oversight", "Notifications"]
}, {
  role: "Employee",
  color: "border-slate-300 bg-slate-50",
  badge: "bg-slate-100 text-slate-700",
  icon: Users,
  count: 2,
  permissions: ["View Assigned Contracts", "Complete Obligations", "Receive Notifications", "Update Profile"]
}];
const UM_PERMISSION_MATRIX = [{
  module: "Contracts",
  admin: [1, 1, 1, 1, 1, 1],
  manager: [1, 1, 1, 0, 1, 1],
  compliance: [0, 1, 0, 0, 1, 0],
  contract_mgr: [1, 1, 1, 0, 0, 0],
  dept_head: [0, 1, 0, 0, 1, 1],
  employee: [0, 1, 0, 0, 0, 0]
}, {
  module: "Obligations",
  admin: [1, 1, 1, 1, 1, 1],
  manager: [1, 1, 1, 0, 1, 0],
  compliance: [1, 1, 1, 0, 1, 0],
  contract_mgr: [0, 1, 1, 0, 0, 0],
  dept_head: [0, 1, 0, 0, 1, 1],
  employee: [0, 1, 1, 0, 0, 0]
}, {
  module: "Renewals",
  admin: [1, 1, 1, 1, 1, 1],
  manager: [1, 1, 1, 0, 1, 1],
  compliance: [0, 1, 0, 0, 1, 0],
  contract_mgr: [1, 1, 1, 0, 1, 0],
  dept_head: [0, 1, 0, 0, 1, 1],
  employee: [0, 1, 0, 0, 0, 0]
}, {
  module: "Reports",
  admin: [1, 1, 1, 1, 1, 1],
  manager: [0, 1, 0, 0, 1, 0],
  compliance: [0, 1, 0, 0, 1, 0],
  contract_mgr: [0, 1, 0, 0, 1, 0],
  dept_head: [0, 1, 0, 0, 1, 0],
  employee: [0, 0, 0, 0, 0, 0]
}, {
  module: "User Mgmt",
  admin: [1, 1, 1, 1, 1, 1],
  manager: [0, 1, 0, 0, 0, 0],
  compliance: [0, 0, 0, 0, 0, 0],
  contract_mgr: [0, 0, 0, 0, 0, 0],
  dept_head: [0, 1, 0, 0, 0, 0],
  employee: [0, 0, 0, 0, 0, 0]
}, {
  module: "Notifications",
  admin: [1, 1, 1, 1, 1, 1],
  manager: [0, 1, 1, 0, 0, 0],
  compliance: [0, 1, 1, 0, 0, 0],
  contract_mgr: [0, 1, 1, 0, 0, 0],
  dept_head: [0, 1, 1, 0, 0, 0],
  employee: [0, 1, 0, 0, 0, 0]
}, {
  module: "Audit Logs",
  admin: [1, 1, 1, 1, 1, 1],
  manager: [0, 1, 0, 0, 1, 0],
  compliance: [0, 1, 0, 0, 1, 0],
  contract_mgr: [0, 0, 0, 0, 0, 0],
  dept_head: [0, 1, 0, 0, 0, 0],
  employee: [0, 0, 0, 0, 0, 0]
}];
const UM_ACTIVITY_LOG = [{
  ts: "Jun 3, 2024 10:14 AM",
  user: "Sarah Chen",
  initials: "SC",
  activity: "Logged in",
  ip: "192.168.1.42",
  device: "Chrome / Windows",
  status: "Success"
}, {
  ts: "Jun 3, 2024 09:52 AM",
  user: "David Park",
  initials: "DP",
  activity: "Password Changed",
  ip: "192.168.1.55",
  device: "Safari / macOS",
  status: "Success"
}, {
  ts: "Jun 3, 2024 09:31 AM",
  user: "Unknown",
  initials: "??",
  activity: "Failed Login Attempt",
  ip: "203.45.67.89",
  device: "Firefox / Linux",
  status: "Failed"
}, {
  ts: "Jun 2, 2024 04:10 PM",
  user: "Alexandra Ross",
  initials: "AR",
  activity: "Role Changed: James Lee → Legal Manager",
  ip: "192.168.1.1",
  device: "Chrome / Windows",
  status: "Success"
}, {
  ts: "Jun 2, 2024 02:45 PM",
  user: "James Lee",
  initials: "JL",
  activity: "Account Locked (3 failed attempts)",
  ip: "10.0.0.44",
  device: "Edge / Windows",
  status: "Locked"
}, {
  ts: "Jun 1, 2024 11:20 AM",
  user: "Alexandra Ross",
  initials: "AR",
  activity: "New User Provisioned: Mark Johnson",
  ip: "192.168.1.1",
  device: "Chrome / Windows",
  status: "Success"
}, {
  ts: "Jun 1, 2024 10:05 AM",
  user: "Sarah Chen",
  initials: "SC",
  activity: "Logged out",
  ip: "192.168.1.42",
  device: "Chrome / Windows",
  status: "Success"
}];
const UM_SESSIONS = [{
  device: "Chrome 124 / Windows 11",
  location: "New York, US",
  loginTime: "Jun 3, 2024 9:14 AM",
  expiry: "Jun 3, 2024 5:14 PM",
  current: true
}, {
  device: "Safari 17 / macOS Sonoma",
  location: "Remote — VPN",
  loginTime: "Jun 3, 2024 8:00 AM",
  expiry: "Jun 3, 2024 4:00 PM",
  current: false
}];
function UserManagementScreen() {
  const [activeTab, setActiveTab] = useState("overview");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);
  const [editProfile, setEditProfile] = useState(false);
  const showToast = msg => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };
  const filteredUsers = UM_USERS.filter(u => {
    const q = search.toLowerCase();
    return !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.role.toLowerCase().includes(q) || u.dept.toLowerCase().includes(q);
  });
  const TABS = [{
    id: "overview",
    label: "Overview & Profile",
    icon: LayoutDashboard
  }, {
    id: "users",
    label: "User Management",
    icon: Users
  }, {
    id: "roles",
    label: "Roles & Permissions",
    icon: ShieldCheck
  }, {
    id: "permissions",
    label: "Permission Matrix",
    icon: ClipboardList
  }, {
    id: "activity",
    label: "Activity Logs",
    icon: Database
  }];
  const roleVariant = {
    Administrator: "purple",
    "Legal Manager": "info",
    "Compliance Officer": "success",
    "Contract Manager": "warning",
    "Department Head": "orange",
    Employee: "neutral"
  };
  const activityStatusVariant = {
    Success: "success",
    Failed: "danger",
    Locked: "warning"
  };
  const PermBox = ({
    on
  }) => /*#__PURE__*/_jsx("div", {
    className: "flex items-center justify-center",
    children: on ? /*#__PURE__*/_jsx(CheckCircle2, {
      size: 14,
      className: "text-emerald-500"
    }) : /*#__PURE__*/_jsx("div", {
      className: "w-3.5 h-3.5 rounded-sm border border-border bg-muted"
    })
  });
  const colRoles = ["Admin", "Legal Mgr", "Compliance", "Contract Mgr", "Dept Head", "Employee"];
  return /*#__PURE__*/_jsxs("div", {
    className: "flex flex-col h-full overflow-hidden",
    children: [toast && /*#__PURE__*/_jsxs("div", {
      className: "fixed top-4 right-4 z-50 bg-slate-900 text-white text-xs font-medium px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2",
      children: [/*#__PURE__*/_jsx(CheckCircle2, {
        size: 13,
        className: "text-emerald-400"
      }), " ", toast]
    }), /*#__PURE__*/_jsxs("div", {
      className: "bg-card border-b border-border px-6 pt-5 pb-0 flex-shrink-0",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "flex items-center justify-between mb-4 flex-wrap gap-3",
        children: [/*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx("h1", {
            className: "text-xl font-bold text-foreground",
            style: {
              fontFamily: "var(--font-display)"
            },
            children: "User & Role Management"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground mt-0.5",
            children: "Manage users, roles, permissions, and authentication across ContractIQ"
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "flex items-center gap-2",
          children: [/*#__PURE__*/_jsxs("button", {
            onClick: () => showToast("Invite user dialog would open."),
            className: "flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-lg text-xs font-medium text-foreground hover:bg-muted transition-colors",
            children: [/*#__PURE__*/_jsx(UserPlus, {
              size: 12
            }), " Invite User"]
          }), /*#__PURE__*/_jsxs("button", {
            onClick: () => showToast("New role creation dialog opened."),
            className: "flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors",
            children: [/*#__PURE__*/_jsx(Plus, {
              size: 12
            }), " New Role"]
          })]
        })]
      }), /*#__PURE__*/_jsx("div", {
        className: "flex items-center gap-0 overflow-x-auto",
        children: TABS.map(tab => /*#__PURE__*/_jsxs("button", {
          onClick: () => setActiveTab(tab.id),
          className: `flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${activeTab === tab.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`,
          children: [/*#__PURE__*/_jsx(tab.icon, {
            size: 13
          }), " ", tab.label]
        }, tab.id))
      })]
    }), /*#__PURE__*/_jsx("div", {
      className: "flex-1 overflow-y-auto",
      children: /*#__PURE__*/_jsxs("div", {
        className: "p-5 space-y-5 max-w-[1400px] mx-auto",
        children: [activeTab === "overview" && /*#__PURE__*/_jsxs("div", {
          className: "space-y-5",
          children: [/*#__PURE__*/_jsx("div", {
            className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4",
            children: [{
              label: "Total Users",
              value: "8",
              icon: Users,
              bg: "bg-blue-600"
            }, {
              label: "Active Users",
              value: "7",
              icon: UserCheck,
              bg: "bg-emerald-500"
            }, {
              label: "Roles Defined",
              value: "6",
              icon: ShieldCheck,
              bg: "bg-violet-500"
            }, {
              label: "Permissions",
              value: "42",
              icon: Key,
              bg: "bg-amber-500"
            }, {
              label: "Departments",
              value: "7",
              icon: Building2,
              bg: "bg-cyan-600"
            }, {
              label: "Active Sessions",
              value: "2",
              icon: Monitor,
              bg: "bg-slate-500"
            }].map(k => /*#__PURE__*/_jsxs("div", {
              className: "bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow",
              children: [/*#__PURE__*/_jsx("div", {
                className: `p-2 rounded-lg mb-3 w-fit ${k.bg}`,
                children: /*#__PURE__*/_jsx(k.icon, {
                  size: 14,
                  className: "text-white"
                })
              }), /*#__PURE__*/_jsx("p", {
                className: "text-2xl font-bold font-mono text-foreground",
                children: k.value
              }), /*#__PURE__*/_jsx("p", {
                className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wide",
                children: k.label
              })]
            }, k.label))
          }), /*#__PURE__*/_jsxs("div", {
            className: "grid grid-cols-1 xl:grid-cols-5 gap-5",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "xl:col-span-2 bg-card border border-border rounded-xl overflow-hidden",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "px-5 py-3.5 border-b border-border flex items-center justify-between",
                children: [/*#__PURE__*/_jsx("p", {
                  className: "text-sm font-bold text-foreground",
                  children: "My Profile"
                }), /*#__PURE__*/_jsx("button", {
                  onClick: () => setEditProfile(e => !e),
                  className: "text-xs text-primary font-medium hover:underline",
                  children: editProfile ? "Cancel" : "Edit Profile"
                })]
              }), /*#__PURE__*/_jsxs("div", {
                className: "p-5",
                children: [/*#__PURE__*/_jsxs("div", {
                  className: "flex items-center gap-4 mb-5",
                  children: [/*#__PURE__*/_jsx("div", {
                    className: "w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0",
                    children: "SC"
                  }), /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx("p", {
                      className: "text-base font-bold text-foreground",
                      children: "Sarah Chen"
                    }), /*#__PURE__*/_jsx(Badge, {
                      variant: "info",
                      children: "Legal Manager"
                    }), /*#__PURE__*/_jsx("p", {
                      className: "text-xs text-muted-foreground mt-1",
                      children: "Active · Last login: Jun 3, 2024"
                    })]
                  })]
                }), /*#__PURE__*/_jsx("div", {
                  className: "space-y-3",
                  children: [{
                    label: "Employee ID",
                    value: "EMP-001",
                    icon: Hash
                  }, {
                    label: "Email",
                    value: "sarah.chen@contractiq.com",
                    icon: Mail
                  }, {
                    label: "Phone",
                    value: "+1 (555) 010-2345",
                    icon: Phone
                  }, {
                    label: "Department",
                    value: "Legal",
                    icon: Building2
                  }, {
                    label: "Designation",
                    value: "Senior Legal Manager",
                    icon: Briefcase
                  }, {
                    label: "Role",
                    value: "Legal Manager",
                    icon: ShieldCheck
                  }].map(f => /*#__PURE__*/_jsxs("div", {
                    className: "flex items-center gap-3",
                    children: [/*#__PURE__*/_jsx("div", {
                      className: "w-7 h-7 rounded-lg bg-muted flex items-center justify-center flex-shrink-0",
                      children: /*#__PURE__*/_jsx(f.icon, {
                        size: 12,
                        className: "text-muted-foreground"
                      })
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "flex-1 min-w-0",
                      children: [/*#__PURE__*/_jsx("p", {
                        className: "text-[10px] text-muted-foreground uppercase tracking-wide font-semibold",
                        children: f.label
                      }), editProfile && f.label !== "Role" && f.label !== "Employee ID" ? /*#__PURE__*/_jsx("input", {
                        defaultValue: f.value,
                        className: "text-xs text-foreground w-full bg-input-background border border-border rounded px-2 py-1 mt-0.5 focus:outline-none focus:ring-1 focus:ring-primary"
                      }) : /*#__PURE__*/_jsx("p", {
                        className: "text-xs font-medium text-foreground truncate",
                        children: f.value
                      })]
                    })]
                  }, f.label))
                }), editProfile && /*#__PURE__*/_jsxs("div", {
                  className: "mt-4 flex gap-2",
                  children: [/*#__PURE__*/_jsx("button", {
                    onClick: () => {
                      showToast("Profile saved successfully.");
                      setEditProfile(false);
                    },
                    className: "flex-1 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors",
                    children: "Save Changes"
                  }), /*#__PURE__*/_jsx("button", {
                    onClick: () => showToast("Change password email sent."),
                    className: "flex-1 py-2 border border-border rounded-lg text-xs font-medium text-foreground hover:bg-muted transition-colors",
                    children: "Change Password"
                  })]
                })]
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "xl:col-span-3 space-y-5",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "bg-card border border-border rounded-xl overflow-hidden",
                children: [/*#__PURE__*/_jsxs("div", {
                  className: "px-5 py-3.5 border-b border-border flex items-center justify-between",
                  children: [/*#__PURE__*/_jsx("p", {
                    className: "text-sm font-bold text-foreground",
                    children: "Active Sessions"
                  }), /*#__PURE__*/_jsx("button", {
                    onClick: () => showToast("All other sessions terminated."),
                    className: "text-xs text-red-600 font-medium hover:underline",
                    children: "Logout All Devices"
                  })]
                }), /*#__PURE__*/_jsx("div", {
                  className: "divide-y divide-border",
                  children: UM_SESSIONS.map((s, i) => /*#__PURE__*/_jsxs("div", {
                    className: "px-5 py-4 flex items-start justify-between gap-3",
                    children: [/*#__PURE__*/_jsxs("div", {
                      className: "flex items-start gap-3",
                      children: [/*#__PURE__*/_jsx("div", {
                        className: "p-2 bg-muted rounded-lg flex-shrink-0",
                        children: /*#__PURE__*/_jsx(Monitor, {
                          size: 14,
                          className: "text-muted-foreground"
                        })
                      }), /*#__PURE__*/_jsxs("div", {
                        children: [/*#__PURE__*/_jsxs("div", {
                          className: "flex items-center gap-2",
                          children: [/*#__PURE__*/_jsx("p", {
                            className: "text-xs font-semibold text-foreground",
                            children: s.device
                          }), s.current && /*#__PURE__*/_jsx(Badge, {
                            variant: "success",
                            children: "Current"
                          })]
                        }), /*#__PURE__*/_jsxs("p", {
                          className: "text-xs text-muted-foreground mt-0.5 flex items-center gap-1",
                          children: [/*#__PURE__*/_jsx(MapPin, {
                            size: 9
                          }), s.location]
                        }), /*#__PURE__*/_jsxs("p", {
                          className: "text-xs text-muted-foreground font-mono",
                          children: ["Login: ", s.loginTime]
                        }), /*#__PURE__*/_jsxs("p", {
                          className: "text-xs text-muted-foreground font-mono",
                          children: ["Expires: ", s.expiry]
                        })]
                      })]
                    }), !s.current && /*#__PURE__*/_jsx("button", {
                      onClick: () => showToast("Session terminated."),
                      className: "px-2.5 py-1 border border-red-200 text-red-600 bg-red-50 rounded text-xs font-medium hover:bg-red-100 transition-colors",
                      children: "Logout"
                    })]
                  }, i))
                })]
              }), /*#__PURE__*/_jsxs("div", {
                className: "bg-card border border-border rounded-xl p-5",
                children: [/*#__PURE__*/_jsx("p", {
                  className: "text-sm font-bold text-foreground mb-4",
                  children: "Security & Authentication"
                }), /*#__PURE__*/_jsx("div", {
                  className: "grid grid-cols-2 gap-4",
                  children: [{
                    label: "Authentication Method",
                    value: "JWT + Bearer Token",
                    icon: Fingerprint,
                    color: "text-violet-600",
                    bg: "bg-violet-50"
                  }, {
                    label: "Session Timeout",
                    value: "8 hours",
                    icon: Clock,
                    color: "text-blue-600",
                    bg: "bg-blue-50"
                  }, {
                    label: "Last Password Change",
                    value: "Apr 15, 2024",
                    icon: Key,
                    color: "text-amber-600",
                    bg: "bg-amber-50"
                  }, {
                    label: "2FA Status",
                    value: "Enabled",
                    icon: ShieldCheck,
                    color: "text-emerald-600",
                    bg: "bg-emerald-50"
                  }].map(s => /*#__PURE__*/_jsxs("div", {
                    className: `${s.bg} border border-border rounded-xl p-3.5 flex items-start gap-3`,
                    children: [/*#__PURE__*/_jsx(s.icon, {
                      size: 16,
                      className: s.color
                    }), /*#__PURE__*/_jsxs("div", {
                      children: [/*#__PURE__*/_jsx("p", {
                        className: "text-[10px] text-muted-foreground uppercase tracking-wide font-semibold",
                        children: s.label
                      }), /*#__PURE__*/_jsx("p", {
                        className: "text-xs font-bold text-foreground mt-0.5",
                        children: s.value
                      })]
                    })]
                  }, s.label))
                })]
              })]
            })]
          })]
        }), activeTab === "users" && /*#__PURE__*/_jsxs("div", {
          className: "space-y-4",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "bg-card border border-border rounded-xl px-5 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3",
            children: [/*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx("p", {
                className: "text-sm font-bold text-foreground",
                children: "All Users"
              }), /*#__PURE__*/_jsxs("p", {
                className: "text-xs text-muted-foreground",
                children: [filteredUsers.length, " of ", UM_USERS.length, " users shown"]
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "flex items-center gap-2 flex-wrap",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "relative",
                children: [/*#__PURE__*/_jsx(Search, {
                  size: 13,
                  className: "absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                }), /*#__PURE__*/_jsx("input", {
                  value: search,
                  onChange: e => setSearch(e.target.value),
                  placeholder: "Search users…",
                  className: "pl-8 pr-3 py-1.5 bg-input-background border border-border rounded-lg text-xs w-44 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                })]
              }), /*#__PURE__*/_jsx("select", {
                className: "px-2.5 py-1.5 bg-input-background border border-border rounded-lg text-xs text-foreground focus:outline-none",
                children: ["All Roles", "Administrator", "Legal Manager", "Compliance Officer", "Contract Manager", "Department Head", "Employee"].map(o => /*#__PURE__*/_jsx("option", {
                  children: o
                }, o))
              }), /*#__PURE__*/_jsx("select", {
                className: "px-2.5 py-1.5 bg-input-background border border-border rounded-lg text-xs text-foreground focus:outline-none",
                children: ["All Statuses", "Active", "Inactive"].map(o => /*#__PURE__*/_jsx("option", {
                  children: o
                }, o))
              }), /*#__PURE__*/_jsxs("button", {
                onClick: () => showToast("Invite user dialog would open."),
                className: "flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors",
                children: [/*#__PURE__*/_jsx(UserPlus, {
                  size: 12
                }), " Invite"]
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "bg-card border border-border rounded-xl overflow-hidden",
            children: [/*#__PURE__*/_jsx("div", {
              className: "overflow-x-auto",
              children: /*#__PURE__*/_jsxs("table", {
                className: "w-full text-xs",
                children: [/*#__PURE__*/_jsx("thead", {
                  children: /*#__PURE__*/_jsx("tr", {
                    className: "border-b border-border bg-muted",
                    children: ["Employee ID", "Name", "Department", "Role", "Email", "Status", "Last Login", "Actions"].map(h => /*#__PURE__*/_jsx("th", {
                      className: "text-left px-4 py-3 text-muted-foreground font-semibold uppercase tracking-wide whitespace-nowrap",
                      children: h
                    }, h))
                  })
                }), /*#__PURE__*/_jsx("tbody", {
                  className: "divide-y divide-border",
                  children: filteredUsers.map(u => /*#__PURE__*/_jsxs("tr", {
                    className: "hover:bg-muted/40 transition-colors",
                    children: [/*#__PURE__*/_jsx("td", {
                      className: "px-4 py-3 font-mono text-muted-foreground",
                      children: u.id
                    }), /*#__PURE__*/_jsx("td", {
                      className: "px-4 py-3",
                      children: /*#__PURE__*/_jsxs("div", {
                        className: "flex items-center gap-2",
                        children: [/*#__PURE__*/_jsx(Av, {
                          initials: u.initials,
                          size: "sm"
                        }), /*#__PURE__*/_jsx("span", {
                          className: "font-semibold text-foreground whitespace-nowrap",
                          children: u.name
                        })]
                      })
                    }), /*#__PURE__*/_jsx("td", {
                      className: "px-4 py-3 text-muted-foreground whitespace-nowrap",
                      children: u.dept
                    }), /*#__PURE__*/_jsx("td", {
                      className: "px-4 py-3",
                      children: /*#__PURE__*/_jsx(Badge, {
                        variant: roleVariant[u.role] || "neutral",
                        children: u.role
                      })
                    }), /*#__PURE__*/_jsx("td", {
                      className: "px-4 py-3 text-muted-foreground whitespace-nowrap",
                      children: u.email
                    }), /*#__PURE__*/_jsx("td", {
                      className: "px-4 py-3",
                      children: /*#__PURE__*/_jsx(Badge, {
                        variant: u.status === "Active" ? "success" : "neutral",
                        children: u.status
                      })
                    }), /*#__PURE__*/_jsx("td", {
                      className: "px-4 py-3 text-muted-foreground font-mono whitespace-nowrap text-[10px]",
                      children: u.lastLogin
                    }), /*#__PURE__*/_jsx("td", {
                      className: "px-4 py-3",
                      children: /*#__PURE__*/_jsxs("div", {
                        className: "flex items-center gap-1",
                        children: [/*#__PURE__*/_jsx("button", {
                          onClick: () => showToast(`Viewing ${u.name}.`),
                          className: "p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors",
                          title: "View",
                          children: /*#__PURE__*/_jsx(Eye, {
                            size: 12
                          })
                        }), /*#__PURE__*/_jsx("button", {
                          onClick: () => showToast(`Editing ${u.name}.`),
                          className: "p-1.5 text-slate-500 hover:bg-muted rounded transition-colors",
                          title: "Edit",
                          children: /*#__PURE__*/_jsx(Edit, {
                            size: 12
                          })
                        }), /*#__PURE__*/_jsx("button", {
                          onClick: () => showToast(`Password reset email sent to ${u.email}.`),
                          className: "p-1.5 text-amber-600 hover:bg-amber-50 rounded transition-colors",
                          title: "Reset Password",
                          children: /*#__PURE__*/_jsx(Key, {
                            size: 12
                          })
                        }), /*#__PURE__*/_jsx("button", {
                          onClick: () => showToast(`Role change dialog for ${u.name}.`),
                          className: "p-1.5 text-violet-600 hover:bg-violet-50 rounded transition-colors",
                          title: "Change Role",
                          children: /*#__PURE__*/_jsx(UserCog, {
                            size: 12
                          })
                        }), /*#__PURE__*/_jsx("button", {
                          onClick: () => showToast(`${u.name} ${u.status === "Active" ? "disabled" : "re-enabled"}.`),
                          className: `p-1.5 rounded transition-colors ${u.status === "Active" ? "text-orange-500 hover:bg-orange-50" : "text-emerald-600 hover:bg-emerald-50"}`,
                          title: u.status === "Active" ? "Disable" : "Enable",
                          children: u.status === "Active" ? /*#__PURE__*/_jsx(Ban, {
                            size: 12
                          }) : /*#__PURE__*/_jsx(CheckCircle, {
                            size: 12
                          })
                        }), /*#__PURE__*/_jsx("button", {
                          onClick: () => showToast(`${u.name} deleted.`),
                          className: "p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors",
                          title: "Delete",
                          children: /*#__PURE__*/_jsx(Trash2, {
                            size: 12
                          })
                        })]
                      })
                    })]
                  }, u.id))
                })]
              })
            }), /*#__PURE__*/_jsxs("div", {
              className: "px-5 py-3 border-t border-border flex items-center justify-between",
              children: [/*#__PURE__*/_jsxs("p", {
                className: "text-xs text-muted-foreground",
                children: ["Showing ", filteredUsers.length, " of ", UM_USERS.length, " users"]
              }), /*#__PURE__*/_jsx("div", {
                className: "flex items-center gap-1",
                children: [1, 2].map(p => /*#__PURE__*/_jsx("button", {
                  className: `w-7 h-7 text-xs rounded transition-colors ${p === 1 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`,
                  children: p
                }, p))
              })]
            })]
          })]
        }), activeTab === "roles" && /*#__PURE__*/_jsx("div", {
          className: "space-y-5",
          children: /*#__PURE__*/_jsx("div", {
            className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5",
            children: UM_ROLES.map(r => {
              const RIcon = r.icon;
              return /*#__PURE__*/_jsxs("div", {
                className: `border-2 rounded-xl p-5 hover:shadow-md transition-shadow ${r.color}`,
                children: [/*#__PURE__*/_jsxs("div", {
                  className: "flex items-start justify-between mb-3",
                  children: [/*#__PURE__*/_jsxs("div", {
                    className: "flex items-center gap-2.5",
                    children: [/*#__PURE__*/_jsx("div", {
                      className: "p-2 bg-white/70 rounded-lg",
                      children: /*#__PURE__*/_jsx(RIcon, {
                        size: 16,
                        className: "text-foreground"
                      })
                    }), /*#__PURE__*/_jsxs("div", {
                      children: [/*#__PURE__*/_jsx("p", {
                        className: "text-sm font-bold text-foreground",
                        children: r.role
                      }), /*#__PURE__*/_jsxs("p", {
                        className: "text-xs text-muted-foreground",
                        children: [r.count, " user", r.count !== 1 ? "s" : "", " assigned"]
                      })]
                    })]
                  }), /*#__PURE__*/_jsx("button", {
                    onClick: () => showToast(`Editing ${r.role} role.`),
                    className: "p-1.5 bg-white/60 hover:bg-white rounded-lg text-muted-foreground transition-colors",
                    children: /*#__PURE__*/_jsx(Edit, {
                      size: 12
                    })
                  })]
                }), /*#__PURE__*/_jsxs("div", {
                  className: "space-y-1.5",
                  children: [/*#__PURE__*/_jsx("p", {
                    className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2",
                    children: "Permissions"
                  }), r.permissions.map(p => /*#__PURE__*/_jsxs("div", {
                    className: "flex items-center gap-2",
                    children: [/*#__PURE__*/_jsx(CheckCircle2, {
                      size: 11,
                      className: "text-emerald-600 flex-shrink-0"
                    }), /*#__PURE__*/_jsx("span", {
                      className: "text-xs text-foreground",
                      children: p
                    })]
                  }, p))]
                }), /*#__PURE__*/_jsxs("div", {
                  className: "flex gap-2 mt-4",
                  children: [/*#__PURE__*/_jsx("button", {
                    onClick: () => showToast(`Viewing ${r.role} details.`),
                    className: "flex-1 py-1.5 bg-white/60 hover:bg-white rounded-lg text-xs font-semibold transition-colors",
                    children: "View Details"
                  }), /*#__PURE__*/_jsx("button", {
                    onClick: () => showToast(`Duplicate ${r.role} role created.`),
                    className: "px-3 py-1.5 bg-white/60 hover:bg-white rounded-lg text-xs transition-colors",
                    children: /*#__PURE__*/_jsx(Copy, {
                      size: 11
                    })
                  })]
                })]
              }, r.role);
            })
          })
        }), activeTab === "permissions" && /*#__PURE__*/_jsx("div", {
          className: "space-y-4",
          children: /*#__PURE__*/_jsxs("div", {
            className: "bg-card border border-border rounded-xl overflow-hidden",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "px-5 py-3.5 border-b border-border flex items-center justify-between",
              children: [/*#__PURE__*/_jsxs("div", {
                children: [/*#__PURE__*/_jsx("p", {
                  className: "text-sm font-bold text-foreground",
                  children: "Permission Matrix"
                }), /*#__PURE__*/_jsx("p", {
                  className: "text-xs text-muted-foreground",
                  children: "CRUD + Export + Approve permissions per role per module"
                })]
              }), /*#__PURE__*/_jsxs("button", {
                onClick: () => showToast("Permission matrix exported."),
                className: "flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-lg text-xs font-medium hover:bg-muted transition-colors",
                children: [/*#__PURE__*/_jsx(Download, {
                  size: 11
                }), " Export"]
              })]
            }), /*#__PURE__*/_jsx("div", {
              className: "overflow-x-auto",
              children: /*#__PURE__*/_jsxs("table", {
                className: "w-full text-xs",
                children: [/*#__PURE__*/_jsxs("thead", {
                  children: [/*#__PURE__*/_jsxs("tr", {
                    className: "border-b border-border bg-muted",
                    children: [/*#__PURE__*/_jsx("th", {
                      className: "text-left px-5 py-3 text-muted-foreground font-semibold uppercase tracking-wide whitespace-nowrap w-36",
                      children: "Module"
                    }), colRoles.map(r => /*#__PURE__*/_jsx("th", {
                      className: "text-center px-3 py-3 text-muted-foreground font-semibold uppercase tracking-wide whitespace-nowrap",
                      colSpan: 6,
                      children: r
                    }, r))]
                  }), /*#__PURE__*/_jsxs("tr", {
                    className: "border-b border-border bg-muted/50",
                    children: [/*#__PURE__*/_jsx("th", {
                      className: "px-5 py-2"
                    }), colRoles.map(r => ["C", "R", "U", "D", "Ex", "Ap"].map(perm => /*#__PURE__*/_jsx("th", {
                      className: "text-center px-2 py-2 text-[10px] font-semibold text-muted-foreground whitespace-nowrap",
                      children: perm
                    }, `${r}-${perm}`)))]
                  })]
                }), /*#__PURE__*/_jsx("tbody", {
                  className: "divide-y divide-border",
                  children: UM_PERMISSION_MATRIX.map(row => /*#__PURE__*/_jsxs("tr", {
                    className: "hover:bg-muted/30 transition-colors",
                    children: [/*#__PURE__*/_jsx("td", {
                      className: "px-5 py-3 font-semibold text-foreground whitespace-nowrap",
                      children: row.module
                    }), [row.admin, row.manager, row.compliance, row.contract_mgr, row.dept_head, row.employee].map((perms, roleIdx) => perms.map((val, permIdx) => /*#__PURE__*/_jsx("td", {
                      className: "px-2 py-3 text-center",
                      children: /*#__PURE__*/_jsx(PermBox, {
                        on: val
                      })
                    }, `${roleIdx}-${permIdx}`)))]
                  }, row.module))
                })]
              })
            }), /*#__PURE__*/_jsxs("div", {
              className: "px-5 py-3 border-t border-border flex items-center gap-4 bg-muted/30",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "flex items-center gap-1.5",
                children: [/*#__PURE__*/_jsx(CheckCircle2, {
                  size: 12,
                  className: "text-emerald-500"
                }), /*#__PURE__*/_jsx("span", {
                  className: "text-xs text-muted-foreground",
                  children: "Permitted"
                })]
              }), /*#__PURE__*/_jsxs("div", {
                className: "flex items-center gap-1.5",
                children: [/*#__PURE__*/_jsx("div", {
                  className: "w-3.5 h-3.5 rounded-sm border border-border bg-muted"
                }), /*#__PURE__*/_jsx("span", {
                  className: "text-xs text-muted-foreground",
                  children: "Denied"
                })]
              }), /*#__PURE__*/_jsx("span", {
                className: "text-xs text-muted-foreground ml-auto",
                children: "C=Create · R=Read · U=Update · D=Delete · Ex=Export · Ap=Approve"
              })]
            })]
          })
        }), activeTab === "activity" && /*#__PURE__*/_jsxs("div", {
          className: "space-y-5",
          children: [/*#__PURE__*/_jsx("div", {
            className: "grid grid-cols-2 md:grid-cols-5 gap-4",
            children: [{
              label: "Login Events",
              value: "186",
              icon: LogIn,
              bg: "bg-blue-50",
              text: "text-blue-600"
            }, {
              label: "Failed Attempts",
              value: "12",
              icon: ShieldAlert,
              bg: "bg-red-50",
              text: "text-red-600"
            }, {
              label: "Password Changes",
              value: "8",
              icon: Key,
              bg: "bg-amber-50",
              text: "text-amber-600"
            }, {
              label: "Role Changes",
              value: "4",
              icon: UserCog,
              bg: "bg-violet-50",
              text: "text-violet-600"
            }, {
              label: "Account Locks",
              value: "2",
              icon: Lock,
              bg: "bg-slate-50",
              text: "text-slate-600"
            }].map(k => /*#__PURE__*/_jsxs("div", {
              className: `${k.bg} border border-border rounded-xl p-4 flex items-center gap-3`,
              children: [/*#__PURE__*/_jsx(k.icon, {
                size: 18,
                className: k.text
              }), /*#__PURE__*/_jsxs("div", {
                children: [/*#__PURE__*/_jsx("p", {
                  className: `text-xl font-bold font-mono ${k.text}`,
                  children: k.value
                }), /*#__PURE__*/_jsx("p", {
                  className: "text-xs text-muted-foreground",
                  children: k.label
                })]
              })]
            }, k.label))
          }), /*#__PURE__*/_jsxs("div", {
            className: "bg-card border border-border rounded-xl overflow-hidden",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "flex items-center justify-between px-5 py-3.5 border-b border-border",
              children: [/*#__PURE__*/_jsxs("div", {
                children: [/*#__PURE__*/_jsx("p", {
                  className: "text-sm font-bold text-foreground",
                  children: "Activity Log"
                }), /*#__PURE__*/_jsx("p", {
                  className: "text-xs text-muted-foreground",
                  children: "Login history · Failed attempts · Password & role changes · Account locks"
                })]
              }), /*#__PURE__*/_jsxs("button", {
                onClick: () => showToast("Activity log exported."),
                className: "flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-lg text-xs font-medium hover:bg-muted transition-colors",
                children: [/*#__PURE__*/_jsx(Download, {
                  size: 11
                }), " Export"]
              })]
            }), /*#__PURE__*/_jsx("div", {
              className: "overflow-x-auto",
              children: /*#__PURE__*/_jsxs("table", {
                className: "w-full text-xs",
                children: [/*#__PURE__*/_jsx("thead", {
                  children: /*#__PURE__*/_jsx("tr", {
                    className: "border-b border-border bg-muted",
                    children: ["Timestamp", "User", "Activity", "IP Address", "Device", "Status"].map(h => /*#__PURE__*/_jsx("th", {
                      className: "text-left px-4 py-3 text-muted-foreground font-semibold uppercase tracking-wide whitespace-nowrap",
                      children: h
                    }, h))
                  })
                }), /*#__PURE__*/_jsx("tbody", {
                  className: "divide-y divide-border",
                  children: UM_ACTIVITY_LOG.map((r, i) => /*#__PURE__*/_jsxs("tr", {
                    className: `hover:bg-muted/40 transition-colors ${r.status === "Failed" ? "bg-red-50/30" : r.status === "Locked" ? "bg-amber-50/30" : ""}`,
                    children: [/*#__PURE__*/_jsx("td", {
                      className: "px-4 py-3 font-mono text-muted-foreground whitespace-nowrap text-[10px]",
                      children: r.ts
                    }), /*#__PURE__*/_jsx("td", {
                      className: "px-4 py-3",
                      children: /*#__PURE__*/_jsxs("div", {
                        className: "flex items-center gap-2",
                        children: [r.initials !== "??" ? /*#__PURE__*/_jsx(Av, {
                          initials: r.initials,
                          size: "sm"
                        }) : /*#__PURE__*/_jsx("div", {
                          className: "w-7 h-7 rounded-full bg-slate-300 flex items-center justify-center text-slate-600 text-xs font-bold",
                          children: "?"
                        }), /*#__PURE__*/_jsx("span", {
                          className: "font-semibold text-foreground whitespace-nowrap",
                          children: r.user
                        })]
                      })
                    }), /*#__PURE__*/_jsx("td", {
                      className: "px-4 py-3 text-foreground max-w-[240px]",
                      children: /*#__PURE__*/_jsx("p", {
                        className: "truncate",
                        children: r.activity
                      })
                    }), /*#__PURE__*/_jsx("td", {
                      className: "px-4 py-3 font-mono text-muted-foreground whitespace-nowrap text-[10px]",
                      children: r.ip
                    }), /*#__PURE__*/_jsx("td", {
                      className: "px-4 py-3 text-muted-foreground whitespace-nowrap",
                      children: r.device
                    }), /*#__PURE__*/_jsx("td", {
                      className: "px-4 py-3",
                      children: /*#__PURE__*/_jsx(Badge, {
                        variant: activityStatusVariant[r.status] || "neutral",
                        children: r.status
                      })
                    })]
                  }, i))
                })]
              })
            })]
          })]
        })]
      })
    })]
  });
}

// ── App ────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("login");
  const [role, setRole] = useState("Legal Manager");
  const [pendingRole, setPendingRole] = useState("Legal Manager");
  const [collapsed, setCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedContractId, setSelectedContractId] = useState("CTR-2024-001");
  const [renewals, setRenewals] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/renewals")
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(data => {
        setRenewals(data);
      })
      .catch(err => console.error("Error loading database items:", err));
  }, []);

  const handleAddRenewalSubmit = (newRenewalItem) => {
    fetch("http://localhost:8000/renewals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRenewalItem)
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to save to PostgreSQL");
        return res.json();
      })
      .then(savedItem => {
        setRenewals(prev => [...prev, savedItem]);
        setShowAddModal(false);
      })
      .catch(err => console.error("Database write error:", err));
  };

  // Role → default landing screen after successful login
  const roleDefaultScreen = {
    "Administrator": "admin",
    "Legal Manager": "dashboard",
    "Compliance Officer": "compliance",
    "Contract Manager": "contracts",
    "Department Head": "dashboard",
    "Employee": "obligations"
  };
  const handleLoginAttempt = r => {
    setPendingRole(r);
    setScreen("auth-loading");
  };
  const handleAuthSuccess = () => {
    setRole(pendingRole);
    setScreen("auth-success");
  };
  const handleAuthComplete = () => setScreen(roleDefaultScreen[pendingRole] ?? "dashboard");
  const handleAuthFail = () => setScreen("auth-failed");
  const handleLogout = () => {
    setScreen("login");
    setShowNotifications(false);
  };
  const handleSelectContract = id => {
    setSelectedContractId(id);
    setScreen("contract-detail");
  };
  if (screen === "login") return /*#__PURE__*/_jsx(LoginScreen, {
    onLogin: handleLoginAttempt,
    onRegister: () => setScreen("register"),
    onForgotPassword: () => setScreen("forgot-password"),
    onDemoFailed: () => setScreen("auth-failed"),
    onDemoExpired: () => setScreen("session-expired"),
    onDemoUnauthorized: () => setScreen("unauthorized")
  });
  if (screen === "register") return /*#__PURE__*/_jsx(RegisterScreen, {
    onBack: () => setScreen("login"),
    onSuccess: () => setScreen("login")
  });
  if (screen === "forgot-password") return /*#__PURE__*/_jsx(ForgotPasswordScreen, {
    onBack: () => setScreen("login"),
    onReset: () => setScreen("reset-password")
  });
  if (screen === "reset-password") return /*#__PURE__*/_jsx(ResetPasswordScreen, {
    onBack: () => setScreen("forgot-password"),
    onSuccess: () => setScreen("login")
  });
  if (screen === "auth-loading") return /*#__PURE__*/_jsx(AuthLoadingScreen, {
    onSuccess: handleAuthSuccess,
    onFail: handleAuthFail
  });
  if (screen === "auth-success") return /*#__PURE__*/_jsx(AuthSuccessScreen, {
    onContinue: handleAuthComplete
  });
  if (screen === "auth-failed") return /*#__PURE__*/_jsx(AuthFailedScreen, {
    onRetry: () => setScreen("login"),
    onBack: () => setScreen("login")
  });
  if (screen === "session-expired") return /*#__PURE__*/_jsx(SessionExpiredScreen, {
    onLogin: () => setScreen("login")
  });
  if (screen === "unauthorized") return /*#__PURE__*/_jsx(UnauthorizedScreen, {
    onBack: () => setScreen("login"),
    onLogin: () => setScreen("login")
  });

  // Guard: redirect if role doesn't have access to requested screen
  const allowedItem = NAV_ITEMS.find(i => i.id === screen);
  if (allowedItem && !allowedItem.roles.includes(role)) {
    return /*#__PURE__*/_jsx(UnauthorizedScreen, {
      onBack: () => setScreen(roleDefaultScreen[role]),
      onLogin: () => setScreen("login")
    });
  }
  const renderContent = () => {
    switch (screen) {
      case "dashboard":
        return /*#__PURE__*/_jsx(LegalDashboard, {});
      case "compliance":
        return /*#__PURE__*/_jsx(ComplianceDashboard, {});
      case "admin":
        return role === "Administrator" ? /*#__PURE__*/_jsx(AdminDashboard, {}) : /*#__PURE__*/_jsx(UnauthorizedScreen, {
          onBack: () => setScreen(roleDefaultScreen[role]),
          onLogin: () => setScreen("login")
        });
      case "contracts":
        return /*#__PURE__*/_jsx(ContractRepository, {
          onSelectContract: handleSelectContract
        });
      case "contract-detail":
        return /*#__PURE__*/_jsx(ContractDetail, {
          contractId: selectedContractId,
          onBack: () => setScreen("contracts")
        });
      case "obligations":
        return /*#__PURE__*/_jsx(ObligationTracker, {});
      case "renewals":
        return /*#__PURE__*/_jsx(RenewalDashboard, {
          onNavigate: setScreen
        });
      case "renewal-tracking":
        return /*#__PURE__*/_jsx(RenewalTracking, {});
      case "expiry-monitoring":
        return /*#__PURE__*/_jsx(ExpiryMonitoring, {});
      case "renewal-reminders":
        return /*#__PURE__*/_jsx(RenewalReminders, {});
      case "renewal-approval":
        return /*#__PURE__*/_jsx(RenewalApprovalWorkflow, {});
      case "renewal-history":
        return /*#__PURE__*/_jsx(RenewalHistory, {});
      case "renewal-status":
        return /*#__PURE__*/_jsx(RenewalStatusOverview, {
          onNavigate: setScreen
        });
      case "renewal-management":
        return /*#__PURE__*/_jsx(RenewalManagementScreen, {});
      case "reports":
        return /*#__PURE__*/_jsx(ReportsExportScreen, {});
      case "notifications":
        return /*#__PURE__*/_jsx(NotificationCenterScreen, {});
      case "user-management":
        return role === "Administrator" ? /*#__PURE__*/_jsx(UserManagementScreen, {}) : /*#__PURE__*/_jsx(UnauthorizedScreen, {
          onBack: () => setScreen(roleDefaultScreen[role]),
          onLogin: () => setScreen("login")
        });
      default:
        return /*#__PURE__*/_jsx(LegalDashboard, {});
    }
  };
  const unread = NOTIFICATIONS.filter(n => !n.read).length;
  return /*#__PURE__*/_jsxs("div", {
    className: "flex h-screen bg-background overflow-hidden",
    children: [/*#__PURE__*/_jsx(Sidebar, {
      screen: screen,
      onNavigate: setScreen,
      role: role,
      collapsed: collapsed,
      onToggle: () => setCollapsed(!collapsed)
    }), /*#__PURE__*/_jsxs("div", {
      className: "flex-1 flex flex-col min-w-0 overflow-hidden",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "relative flex-shrink-0",
        children: [/*#__PURE__*/_jsx(TopBar, {
          screen: screen,
          role: role,
          onLogout: handleLogout,
          onToggleNotifications: () => setShowNotifications(s => !s),
          unreadCount: unread
        }), showNotifications && /*#__PURE__*/_jsx(NotificationPanel, {
          onClose: () => setShowNotifications(false)
        })]
      }), /*#__PURE__*/_jsx("main", {
        className: "flex-1 overflow-y-auto",
        onClick: () => showNotifications && setShowNotifications(false),
        children: renderContent()
      }), showAddModal && /*#__PURE__*/_jsx(AddRenewalModal, {
        open: showAddModal,
        onClose: () => setShowAddModal(false),
        onSubmit: handleAddRenewalSubmit
      })]
    })]
  });
}