import React, { useState, useMemo, useEffect } from "react";

const ASSIGNEES = {
  sarah: { name: "Sarah Chen", initials: "SC", bg: "bg-blue-600" },
  lisa: { name: "Lisa Torres", initials: "LT", bg: "bg-purple-600" },
  david: { name: "David Park", initials: "DP", bg: "bg-emerald-600" },
  james: { name: "James Lee", initials: "JL", bg: "bg-rose-600" },
  mark: { name: "Mark Johnson", initials: "MJ", bg: "bg-amber-500" },
};

const OBLIGATIONS = [
  { id: "OBL-001", title: "Q2 Compliance Report Submission", contract: "Master Services Agreement — Accenture LLP", assignee: ASSIGNEES.sarah, due: "Jun 30, 2024", priority: "High", status: "In Progress", tag: "Reporting" },
  { id: "OBL-002", title: "Annual Insurance Certificate Renewal", contract: "Commercial Lease — HQ Tower A", assignee: ASSIGNEES.lisa, due: "May 15, 2024", priority: "Critical", status: "Overdue", tag: "Insurance" },
  { id: "OBL-003", title: "GDPR Data Audit Completion", contract: "GDPR Data Processing Agreement", assignee: ASSIGNEES.david, due: "Jul 1, 2024", priority: "High", status: "Pending", tag: "Audit" },
  { id: "OBL-004", title: "APAC Vendor Performance Review", contract: "APAC Distribution Agreement", assignee: ASSIGNEES.james, due: "Jun 15, 2024", priority: "Medium", status: "Under Review", tag: "Review" },
  { id: "OBL-005", title: "Salesforce License Renewal Decision", contract: "Enterprise SaaS License — Salesforce", assignee: ASSIGNEES.mark, due: "Nov 1, 2024", priority: "Medium", status: "Pending", tag: "Renewal" },
  { id: "OBL-006", title: "Executive Compensation Adjustment", contract: "Executive Employment Agreement", assignee: ASSIGNEES.david, due: "Sep 1, 2024", priority: "High", status: "Pending", tag: "HR" },
  { id: "OBL-007", title: "Q2 Lease Payment — Metropolitan REIT", contract: "Commercial Lease — HQ Tower A", assignee: ASSIGNEES.lisa, due: "Jun 1, 2024", priority: "Critical", status: "Completed", tag: "Payment" },
  { id: "OBL-008", title: "NDA Scope Review — Partnership Terms", contract: "Mutual NDA — TechVenture Group", assignee: ASSIGNEES.sarah, due: "Aug 10, 2024", priority: "Low", status: "Pending", tag: "Review" },
  { id: "OBL-009", title: "AWS Usage Compliance Report", contract: "Cloud Infrastructure Agreement", assignee: ASSIGNEES.mark, due: "Jul 15, 2024", priority: "Medium", status: "In Progress", tag: "Reporting" },
  { id: "OBL-010", title: "Marketing Campaign Legal Review", contract: "Marketing Agency Retainer", assignee: ASSIGNEES.sarah, due: "Jun 20, 2024", priority: "Low", status: "Completed", tag: "Review" },
];

const PRIORITY_STYLE = {
  Critical: "bg-red-100 text-red-700 border border-red-300",
  High: "bg-amber-100 text-amber-700 border border-amber-300",
  Medium: "bg-blue-100 text-blue-700 border border-blue-300",
  Low: "bg-gray-100 text-gray-600 border border-gray-300",
};

const STATUS_STYLE = {
  Overdue: "bg-red-100 text-red-700 border border-red-300",
  Pending: "bg-blue-100 text-blue-700 border border-blue-300",
  "Under Review": "bg-blue-100 text-blue-700 border border-blue-300",
  "In Progress": "bg-purple-100 text-purple-700 border border-purple-300",
  Completed: "bg-emerald-100 text-emerald-700 border border-emerald-300",
};

const COLUMN_HEADER_STYLE = {
  Pending: "bg-blue-50 text-blue-700 border border-blue-300",
  "In Progress": "bg-purple-50 text-purple-700 border border-purple-300",
  "Under Review": "bg-amber-50 text-amber-700 border border-amber-300",
  Completed: "bg-emerald-50 text-emerald-700 border border-emerald-300",
  Overdue: "bg-red-50 text-red-700 border border-red-300",
};

const DOT_COLORS = ["bg-blue-500", "bg-purple-500", "bg-amber-500", "bg-emerald-500", "bg-red-500"];
const COLUMN_ORDER = ["Pending", "In Progress", "Under Review", "Completed", "Overdue"];

const INITIAL_NOTIFICATIONS = [
  { id: 1, type: "warning", title: "Contract Expiring", body: "Commercial Lease — HQ Tower A expires in 28 days.", time: "5 min ago", unread: true },
  { id: 2, type: "overdue", title: "Overdue Obligation", body: "Annual Insurance Certificate Renewal is 3 days overdue.", time: "1 hr ago", unread: true },
  { id: 3, type: "info", title: "Approval Required", body: "Legal Advisory Consulting Agreement needs your signature.", time: "2 hrs ago", unread: true },
  { id: 4, type: "success", title: "Obligation Completed", body: "Q2 Lease Payment submitted successfully.", time: "4 hrs ago", unread: false },
  { id: 5, type: "warning", title: "Renewal Reminder", body: "Enterprise SaaS License — Salesforce renews in 45 days.", time: "1 day ago", unread: false },
];

function NotificationIcon({ type }) {
  if (type === "warning") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-500 flex-shrink-0">
        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    );
  }
  if (type === "overdue") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-500 flex-shrink-0">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    );
  }
  if (type === "success") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-500 flex-shrink-0">
        <circle cx="12" cy="12" r="10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-500 flex-shrink-0">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

function Avatar({ person, size = 22 }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full text-white font-semibold flex-shrink-0 ${person.bg}`}
      style={{ width: size, height: size, fontSize: size * 0.42 }}
    >
      {person.initials}
    </span>
  );
}

function Badge({ text, styleMap }) {
  return (
    <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded whitespace-nowrap ${styleMap[text] || "bg-gray-100 text-gray-600"}`}>
      {text}
    </span>
  );
}

export default function ObligationTrackerPreview() {
  const [view, setView] = useState("kanban");
  const [search, setSearch] = useState("");
  const [headerSearchFocused, setHeaderSearchFocused] = useState(false);
  const [toolbarSearchFocused, setToolbarSearchFocused] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const counts = useMemo(() => {
    const map = Object.fromEntries(COLUMN_ORDER.map((s) => [s, 0]));
    OBLIGATIONS.forEach((o) => (map[o.status] = (map[o.status] || 0) + 1));
    return COLUMN_ORDER.map((s) => ({ status: s, count: map[s] }));
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return OBLIGATIONS;
    const s = search.toLowerCase();
    return OBLIGATIONS.filter(
      (o) => o.title.toLowerCase().includes(s) || o.contract.toLowerCase().includes(s) || o.id.toLowerCase().includes(s)
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="flex items-center justify-between bg-white border-b border-gray-200 px-6 py-4 gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-slate-900 m-0">Obligation Tracker</h1>
          <p className="text-xs text-gray-500 m-0 mt-0.5">June 3, 2024</p>
        </div>

        <div
          className={`flex items-center gap-2 bg-gray-50 rounded-lg px-3.5 py-2 w-72 text-gray-400 ${
            headerSearchFocused ? "border-2 border-blue-500 px-[13px] py-[7px]" : "border border-gray-200"
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            className="bg-transparent outline-none text-sm w-full text-slate-900 placeholder-gray-400"
            placeholder="Search contracts, obligations"
            onFocus={() => setHeaderSearchFocused(true)}
            onBlur={() => setHeaderSearchFocused(false)}
          />
        </div>

        <div className="flex items-center gap-5">
          <div className="relative">
            <button
              className="relative text-gray-400"
              onClick={() => setNotifOpen((v) => !v)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              {unreadCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 top-full mt-2 w-96 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                  <span className="font-semibold text-slate-900">Notifications</span>
                  <div className="flex items-center gap-3">
                    <button
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                      onClick={() => setNotifications((ns) => ns.map((n) => ({ ...n, unread: false })))}
                    >
                      Mark all read
                    </button>
                    <button className="text-gray-400 hover:text-gray-600" onClick={() => setNotifOpen(false)}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className="flex items-start gap-3 px-4 py-3 border-b border-gray-50 hover:bg-gray-50">
                      <NotificationIcon type={n.type} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-900 m-0">{n.title}</p>
                        <p className="text-sm text-gray-500 m-0 mt-0.5">{n.body}</p>
                        <p className="text-xs text-gray-400 m-0 mt-1">{n.time}</p>
                      </div>
                      {n.unread && <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />}
                    </div>
                  ))}
                </div>

                <div className="text-center py-2.5 border-t border-gray-100">
                  <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">View all notifications</button>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            <Avatar person={ASSIGNEES.sarah} size={32} />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-slate-900">Sarah Chen</span>
              <span className="text-[11px] font-semibold text-blue-700 bg-blue-100 rounded-full px-2 w-fit">Legal Manager</span>
            </div>
          </div>

          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </div>
      </header>

      {/* Toolbar */}
      <div className="flex items-center justify-between px-6 py-4 gap-3 flex-wrap">
        <div className="flex items-center gap-4 flex-wrap">
          <div
            className={`flex items-center gap-2 bg-white rounded-lg px-3.5 py-2 w-64 text-gray-400 ${
              toolbarSearchFocused ? "border-2 border-blue-500 px-[13px] py-[7px]" : "border border-gray-200"
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              className="bg-transparent outline-none text-sm w-full text-slate-900 placeholder-gray-400"
              placeholder="Search obligations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setToolbarSearchFocused(true)}
              onBlur={() => setToolbarSearchFocused(false)}
            />
          </div>

          <div className="flex bg-white border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setView("kanban")}
              className={`px-4 py-2 text-sm font-semibold ${view === "kanban" ? "bg-blue-600 text-white" : "text-gray-500"}`}
            >
              Kanban
            </button>
            <button
              onClick={() => setView("list")}
              className={`px-4 py-2 text-sm font-semibold ${view === "list" ? "bg-blue-600 text-white" : "text-gray-500"}`}
            >
              List
            </button>
          </div>

          <div className="flex items-center gap-3.5 text-sm text-gray-500">
            {counts.map((c, i) => (
              <span key={c.status} className="inline-flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${DOT_COLORS[i]}`} />
                {c.count}
              </span>
            ))}
          </div>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg px-4 py-2.5 flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Obligation
        </button>
      </div>

      {/* List view */}
      {view === "list" && (
        <div className="mx-6 mb-6 bg-white border border-gray-200 rounded-xl overflow-hidden overflow-x-auto">
          <table className="w-full border-collapse text-sm min-w-[800px]">
            <thead>
              <tr>
                {["ID", "OBLIGATION", "CONTRACT", "ASSIGNEE", "DUE DATE", "PRIORITY", "STATUS", "CATEGORY"].map((h) => (
                  <th key={h} className="text-left text-[11px] font-bold tracking-wide text-gray-500 bg-gray-50 px-5 py-3 border-b border-gray-200">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3.5 border-b border-gray-100 text-gray-500 text-[13px]">{o.id}</td>
                  <td className="px-5 py-3.5 border-b border-gray-100 font-semibold text-slate-900">{o.title}</td>
                  <td className="px-5 py-3.5 border-b border-gray-100 text-gray-500 text-[13px]">{o.contract}</td>
                  <td className="px-5 py-3.5 border-b border-gray-100 text-slate-900">{o.assignee.name}</td>
                  <td className="px-5 py-3.5 border-b border-gray-100 text-gray-500 text-[13px]">{o.due}</td>
                  <td className="px-5 py-3.5 border-b border-gray-100">
                    <Badge text={o.priority} styleMap={PRIORITY_STYLE} />
                  </td>
                  <td className="px-5 py-3.5 border-b border-gray-100">
                    <Badge text={o.status} styleMap={STATUS_STYLE} />
                  </td>
                  <td className="px-5 py-3.5 border-b border-gray-100 text-gray-500 text-[13px]">{o.tag}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Kanban view */}
      {view === "kanban" && (
        <div className="flex gap-4 px-6 pb-6 overflow-x-auto">
          {COLUMN_ORDER.map((status) => {
            const items = filtered.filter((o) => o.status === status);
            return (
              <div key={status} className="flex-1 min-w-[240px] flex flex-col gap-3">
                <div className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg font-bold text-sm ${COLUMN_HEADER_STYLE[status]}`}>
                  <span>{status}</span>
                  <span>{items.length}</span>
                </div>

                {items.map((o) => (
                  <div key={o.id} className="bg-white border border-gray-200 rounded-xl p-3.5 flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-semibold text-sm text-slate-900">{o.title}</span>
                      <Badge text={o.priority} styleMap={PRIORITY_STYLE} />
                    </div>
                    <span className="text-[13px] text-gray-500">{o.contract}</span>
                    <div className="flex items-center justify-between mt-1">
                      <span className="flex items-center gap-2 text-[13px] text-slate-900">
                        <Avatar person={o.assignee} />
                        {o.assignee.name.split(" ")[0]}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        {o.due.replace(", 2024", "")}
                      </span>
                    </div>
                    <span className="inline-block text-xs font-medium px-2.5 py-0.5 rounded-md bg-gray-100 text-gray-600 border border-gray-200 w-fit">
                      {o.tag}
                    </span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
