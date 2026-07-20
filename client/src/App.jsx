import React, { useEffect, useMemo, useState } from "react";
import {
  Bell,
  CheckCircle2,
  ClipboardList,
  Eye,
  Flag,
  Pencil,
  Plus,
  Search,
  Trash2,
  TriangleAlert,
  X,
} from "lucide-react";

const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:8000/api"}/obligations`;

const EMPTY_FORM = {
  obligation: "",
  contract: "",
  priority: "Medium",
  status: "Pending",
  due_date: "",
  owner: "",
  progress: 0,
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
const COMPLETED_DATA = [18, 24, 21, 31, 27, 36, 14];
const PENDING_DATA = [12, 9, 14, 8, 11, 6, 17];

async function apiRequest(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    let message = "Request failed.";
    try {
      const data = await response.json();
      message = data.detail || data.message || message;
    } catch {
      // Keep fallback message.
    }
    throw new Error(message);
  }

  if (response.status === 204) return null;
  return response.json();
}

export default function App() {
  const [obligations, setObligations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [profileOpen, setProfileOpen] = useState(false);
  const [error, setError] = useState("");

  const loadObligations = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await apiRequest(API_URL);
      setObligations(data);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadObligations();
  }, []);

  const filteredObligations = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return obligations;

    return obligations.filter((item) =>
      [
        item.id,
        item.obligation,
        item.contract,
        item.priority,
        item.status,
        item.owner,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [obligations, search]);

  const stats = {
    pending: 47,
    completed: 183,
    overdue: 12,
    high: 28,
  };

  const openAddModal = () => {
    setForm(EMPTY_FORM);
    setModal({ type: "add" });
  };

  const openEditModal = (item) => {
    setForm({
      obligation: item.obligation,
      contract: item.contract,
      priority: item.priority,
      status: item.status,
      due_date: item.due_date,
      owner: item.owner,
      progress: item.progress,
    });
    setModal({ type: "edit", item });
  };

  const handleSave = async (event) => {
    event.preventDefault();

    try {
      const payload = {
        ...form,
        progress: Number(form.progress),
      };

      if (modal.type === "edit") {
        await apiRequest(`${API_URL}/${modal.item.id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      } else {
        await apiRequest(API_URL, {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }

      setModal(null);
      setForm(EMPTY_FORM);
      await loadObligations();
    } catch (requestError) {
      alert(requestError.message);
    }
  };

  const handleDelete = async (item) => {
    const confirmed = window.confirm(
      `Delete ${item.id} - ${item.obligation}?`
    );

    if (!confirmed) return;

    try {
      await apiRequest(`${API_URL}/${item.id}`, {
        method: "DELETE",
      });
      await loadObligations();
    } catch (requestError) {
      alert(requestError.message);
    }
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="breadcrumbs">
          <span>ContractIQ</span>
          <span>›</span>
          <span>Obligations</span>
          <span>›</span>
          <strong>Tracker</strong>
        </div>

        <div className="top-actions">
          <label className="search-box">
            <Search size={15} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search..."
            />
          </label>

          <button
            className="icon-button"
            type="button"
            title="Notifications"
            onClick={() => alert("You have 3 new notifications.")}
          >
            <Bell size={17} />
            <span className="notification-dot" />
          </button>

          <div className="profile-wrap">
            <button
              type="button"
              className="profile-button"
              onClick={() => setProfileOpen((current) => !current)}
            >
              <span className="avatar">AT</span>
              <span className="profile-copy">
                <strong>Alexandra T.</strong>
                <small>System Admin</small>
              </span>
              <span className="chevron">⌄</span>
            </button>

            {profileOpen && (
              <div className="profile-menu">
                <button type="button" onClick={() => alert("Profile opened")}>
                  My Profile
                </button>
                <button type="button" onClick={() => alert("Settings opened")}>
                  Settings
                </button>
                <button type="button" onClick={() => alert("Signed out")}>
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="content">
        <section className="title-row">
          <div>
            <h1>Obligation Tracker</h1>
            <p>Monitor, manage, and complete all contractual obligations on time</p>
          </div>

          <button
            className="primary-button"
            type="button"
            onClick={openAddModal}
          >
            <Plus size={16} />
            Add Obligation
          </button>
        </section>

        <section className="stat-grid">
          <StatCard
            title="Pending Obligations"
            value={stats.pending}
            note="Due this month"
            icon={<ClipboardList size={22} />}
            tone="amber"
          />
          <StatCard
            title="Completed"
            value={stats.completed}
            note="+22 vs last month"
            icon={<CheckCircle2 size={22} />}
            tone="green"
          />
          <StatCard
            title="Overdue"
            value={stats.overdue}
            note="Needs immediate action"
            icon={<TriangleAlert size={22} />}
            tone="red"
          />
          <StatCard
            title="High Priority"
            value={stats.high}
            note="Requires attention"
            icon={<Flag size={22} />}
            tone="purple"
          />
        </section>

        <section className="dashboard-grid">
          <div className="panel">
            <PanelHeader
              title="Completion Progress"
              subtitle="Completed vs pending per month"
            />
            <CompletionChart />
          </div>

          <div className="panel">
            <PanelHeader
              title="Due Date Calendar"
              subtitle="July 2026 obligation deadlines"
            />
            <DueDateCalendar />
          </div>
        </section>

        <section className="panel table-panel">
          <PanelHeader title="Obligations Table" />

          {error && (
            <div className="error-message">
              {error}. Make sure the FastAPI server is running on port 8000.
            </div>
          )}

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Obligation</th>
                  <th>Contract</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Due Date</th>
                  <th>Owner</th>
                  <th>Progress</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="9" className="empty-cell">
                      Loading obligations...
                    </td>
                  </tr>
                ) : filteredObligations.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="empty-cell">
                      No obligations found.
                    </td>
                  </tr>
                ) : (
                  filteredObligations.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <button
                          className="id-link"
                          type="button"
                          onClick={() => setModal({ type: "view", item })}
                        >
                          {item.id}
                        </button>
                      </td>

                      <td className="strong-cell">{item.obligation}</td>
                      <td>{item.contract}</td>
                      <td>
                        <Badge type="priority" value={item.priority} />
                      </td>
                      <td>
                        <Badge type="status" value={item.status} />
                      </td>
                      <td>{formatDate(item.due_date)}</td>
                      <td>{item.owner}</td>

                      <td>
                        <div className="progress-cell">
                          <span
                            className={`progress-track ${item.status.toLowerCase()}`}
                          >
                            <span style={{ width: `${item.progress}%` }} />
                          </span>
                          <small>{item.progress}%</small>
                        </div>
                      </td>

                      <td>
                        <div className="action-group">
                          <button
                            className="action view"
                            type="button"
                            title="View"
                            onClick={() => setModal({ type: "view", item })}
                          >
                            <Eye size={14} />
                          </button>

                          <button
                            className="action edit"
                            type="button"
                            title="Edit"
                            onClick={() => openEditModal(item)}
                          >
                            <Pencil size={14} />
                          </button>

                          <button
                            className="action delete"
                            type="button"
                            title="Delete"
                            onClick={() => handleDelete(item)}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {modal && (
        <Modal onClose={() => setModal(null)}>
          {modal.type === "view" ? (
            <ViewObligation item={modal.item} />
          ) : (
            <ObligationForm
              title={modal.type === "edit" ? "Edit Obligation" : "Add Obligation"}
              form={form}
              setForm={setForm}
              onSubmit={handleSave}
              onCancel={() => setModal(null)}
            />
          )}
        </Modal>
      )}
    </div>
  );
}

function StatCard({ title, value, note, icon, tone }) {
  return (
    <article className="stat-card">
      <div>
        <p className="stat-title">{title}</p>
        <strong className="stat-value">{value}</strong>
        <p className={`stat-note ${tone}`}>
          {tone === "green" ? "↗ " : tone === "red" ? "↘ " : ""}
          {note}
        </p>
      </div>

      <span className={`stat-icon ${tone}`}>{icon}</span>
    </article>
  );
}

function PanelHeader({ title, subtitle }) {
  return (
    <div className="panel-header">
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}

function CompletionChart() {
  const maximum = 36;

  return (
    <div className="chart-area">
      <div className="y-axis">
        {[36, 27, 18, 9, 0].map((value) => (
          <span key={value}>{value}</span>
        ))}
      </div>

      <div className="bars-area">
        <div className="grid-lines">
          {[0, 1, 2, 3, 4].map((value) => (
            <span key={value} />
          ))}
        </div>

        {MONTHS.map((month, index) => (
          <div className="month-group" key={month}>
            <div className="bar-pair">
              <span
                className="bar completed"
                style={{
                  height: `${(COMPLETED_DATA[index] / maximum) * 100}%`,
                }}
              />
              <span
                className="bar pending"
                style={{
                  height: `${(PENDING_DATA[index] / maximum) * 100}%`,
                }}
              />
            </div>
            <small>{month}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

function DueDateCalendar() {
  const dayClasses = {
    4: "today",
    5: "overdue",
    7: "due",
    12: "overdue",
    15: "due",
    18: "overdue",
    22: "due",
    28: "due",
  };

  return (
    <div className="calendar">
      <div className="calendar-week">
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="calendar-days">
        <span />
        <span />

        {Array.from({ length: 31 }, (_, index) => index + 1).map((day) => (
          <button
            key={day}
            type="button"
            className={dayClasses[day] || ""}
            onClick={() => alert(`Selected July ${day}, 2026`)}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="calendar-legend">
        <span>
          <i className="legend today" />
          Today
        </span>
        <span>
          <i className="legend due" />
          Due
        </span>
        <span>
          <i className="legend overdue" />
          Overdue
        </span>
      </div>
    </div>
  );
}

function Badge({ type, value }) {
  return (
    <span className={`badge ${type}-${value.toLowerCase()}`}>
      ● {value}
    </span>
  );
}

function Modal({ children, onClose }) {
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="modal-card" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" type="button" onClick={onClose}>
          <X size={18} />
        </button>
        {children}
      </div>
    </div>
  );
}

function ObligationForm({
  title,
  form,
  setForm,
  onSubmit,
  onCancel,
}) {
  const update = (name, value) => {
    setForm((current) => ({ ...current, [name]: value }));
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="modal-title">{title}</h2>

      <div className="form-grid">
        <label className="full">
          Obligation
          <input
            required
            value={form.obligation}
            onChange={(event) => update("obligation", event.target.value)}
          />
        </label>

        <label>
          Contract
          <input
            required
            value={form.contract}
            onChange={(event) => update("contract", event.target.value)}
          />
        </label>

        <label>
          Owner
          <input
            required
            value={form.owner}
            onChange={(event) => update("owner", event.target.value)}
          />
        </label>

        <label>
          Priority
          <select
            value={form.priority}
            onChange={(event) => update("priority", event.target.value)}
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </label>

        <label>
          Status
          <select
            value={form.status}
            onChange={(event) => update("status", event.target.value)}
          >
            <option>Pending</option>
            <option>Overdue</option>
            <option>Completed</option>
          </select>
        </label>

        <label>
          Due Date
          <input
            required
            type="date"
            value={form.due_date}
            onChange={(event) => update("due_date", event.target.value)}
          />
        </label>

        <label>
          Progress (%)
          <input
            required
            type="number"
            min="0"
            max="100"
            value={form.progress}
            onChange={(event) => update("progress", event.target.value)}
          />
        </label>
      </div>

      <div className="modal-actions">
        <button
          className="secondary-button"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>

        <button className="primary-button" type="submit">
          Save Obligation
        </button>
      </div>
    </form>
  );
}

function ViewObligation({ item }) {
  return (
    <div>
      <h2 className="modal-title">{item.obligation}</h2>

      <div className="details-grid">
        <div>
          <span>ID</span>
          <strong>{item.id}</strong>
        </div>

        <div>
          <span>Contract</span>
          <strong>{item.contract}</strong>
        </div>

        <div>
          <span>Priority</span>
          <Badge type="priority" value={item.priority} />
        </div>

        <div>
          <span>Status</span>
          <Badge type="status" value={item.status} />
        </div>

        <div>
          <span>Due Date</span>
          <strong>{formatDate(item.due_date)}</strong>
        </div>

        <div>
          <span>Owner</span>
          <strong>{item.owner}</strong>
        </div>

        <div className="full">
          <span>Progress</span>
          <strong>{item.progress}%</strong>
        </div>
      </div>
    </div>
  );
}

function formatDate(value) {
  if (!value) return "-";

  return new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
