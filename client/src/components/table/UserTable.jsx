import { useState, useEffect, useCallback } from "react";
import {
  FaSearch,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaEye,
  FaEdit,
  FaBan,
  FaChevronLeft,
  FaChevronRight,
  FaFilter,
  FaExclamationTriangle,
  FaUserSlash,
} from "react-icons/fa";
import { getUsers } from "../../api/usersApi";

// ── Constants ────────────────────────────────────────────────
const ROLES       = ["all", "Admin", "Manager", "Editor", "Viewer"];
const STATUSES    = ["all", "Active", "Inactive", "Blocked"];
const DEPARTMENTS = ["all", "Legal", "Compliance", "Finance", "Contracts"];
const PER_PAGE    = 10;

// ── Sub-components ───────────────────────────────────────────

const StatusBadge = ({ status }) => {
  const cfg = {
    Active:   "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    Inactive: "bg-amber-50  text-amber-700  ring-1 ring-amber-200",
    Blocked:  "bg-rose-50   text-rose-700   ring-1 ring-rose-200",
  }[status] ?? "bg-slate-100 text-slate-600";

  const dot = {
    Active: "bg-emerald-500",
    Inactive: "bg-amber-500",
    Blocked: "bg-rose-500",
  }[status] ?? "bg-slate-400";

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${cfg}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {status}
    </span>
  );
};

const RoleBadge = ({ role }) => {
  const cfg = {
    Admin:   "bg-blue-50   text-blue-700",
    Manager: "bg-violet-50 text-violet-700",
    Editor:  "bg-emerald-50 text-emerald-700",
    Viewer:  "bg-slate-100 text-slate-600",
  }[role] ?? "bg-slate-100 text-slate-600";

  return (
    <span className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${cfg}`}>
      {role}
    </span>
  );
};

const SortIcon = ({ field, sortBy, sortOrder }) => {
  if (sortBy !== field) return <FaSort className="opacity-30" size={11} />;
  return sortOrder === "asc"
    ? <FaSortUp className="text-blue-500" size={11} />
    : <FaSortDown className="text-blue-500" size={11} />;
};

/** Table row skeleton */
const RowSkeleton = () => (
  <tr className="animate-pulse border-t border-slate-100">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <td key={i} className="px-5 py-4">
        <div className="h-4 rounded bg-slate-100" />
      </td>
    ))}
  </tr>
);

// ── Main component ───────────────────────────────────────────

const UserTable = () => {
  // API state
  const [users,      setUsers]      = useState([]);
  const [total,      setTotal]      = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);

  // Filter / sort / page state
  const [search,     setSearch]     = useState("");
  const [role,       setRole]       = useState("all");
  const [status,     setStatus]     = useState("all");
  const [department, setDepartment] = useState("all");
  const [sortBy,     setSortBy]     = useState("name");
  const [sortOrder,  setSortOrder]  = useState("asc");
  const [page,       setPage]       = useState(1);

  // Debounced search term
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  // Fetch whenever params change
  const fetchUsers = useCallback(() => {
    setLoading(true);
    setError(null);
    getUsers({
      search: debouncedSearch || undefined,
      role:   role       !== "all" ? role       : undefined,
      status: status     !== "all" ? status     : undefined,
      department: department !== "all" ? department : undefined,
      sort_by:    sortBy,
      sort_order: sortOrder,
      page,
      per_page: PER_PAGE,
    })
      .then((res) => {
        setUsers(res.data.users);
        setTotal(res.data.total);
        setTotalPages(res.data.total_pages);
      })
      .catch(() => setError("Failed to load users. Please try again."))
      .finally(() => setLoading(false));
  }, [debouncedSearch, role, status, department, sortBy, sortOrder, page]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  // Reset to page 1 when filters change
  useEffect(() => { setPage(1); }, [debouncedSearch, role, status, department]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
    setPage(1);
  };

  const ThSortable = ({ field, children }) => (
    <th
      className="cursor-pointer select-none px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-700 transition-colors"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center gap-1.5">
        {children}
        <SortIcon field={field} sortBy={sortBy} sortOrder={sortOrder} />
      </div>
    </th>
  );

  return (
    <div className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* ── Table header ──────────────────────────────── */}
      <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-800">System Users</h2>
          <p className="text-sm text-slate-400 mt-0.5">
            {loading ? "Loading…" : `${total} user${total !== 1 ? "s" : ""} found`}
          </p>
        </div>

        {/* Search + filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative">
            <FaSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={12}
            />
            <input
              type="text"
              placeholder="Search name or email…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-52 rounded-xl border border-slate-200 bg-slate-50 py-2 pl-8 pr-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>

          {/* Role filter */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 py-2 pl-3 pr-7 text-sm text-slate-600 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
          >
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r === "all" ? "All Roles" : r}
              </option>
            ))}
          </select>

          {/* Status filter */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 py-2 pl-3 pr-7 text-sm text-slate-600 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s === "all" ? "All Statuses" : s}
              </option>
            ))}
          </select>

          {/* Department filter */}
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 py-2 pl-3 pr-7 text-sm text-slate-600 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
          >
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>
                {d === "all" ? "All Departments" : d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Table body ───────────────────────────────── */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <ThSortable field="name">User</ThSortable>
              <ThSortable field="role">Role</ThSortable>
              <ThSortable field="department">Department</ThSortable>
              <ThSortable field="status">Status</ThSortable>
              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Last Login
              </th>
              <th className="px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {/* Loading */}
            {loading &&
              Array.from({ length: PER_PAGE }).map((_, i) => (
                <RowSkeleton key={i} />
              ))}

            {/* Error */}
            {!loading && error && (
              <tr>
                <td colSpan={6} className="py-16 text-center">
                  <div className="flex flex-col items-center gap-3 text-rose-500">
                    <FaExclamationTriangle size={32} className="opacity-60" />
                    <p className="text-sm font-medium">{error}</p>
                    <button
                      onClick={fetchUsers}
                      className="rounded-lg bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-100 transition-colors"
                    >
                      Retry
                    </button>
                  </div>
                </td>
              </tr>
            )}

            {/* Empty */}
            {!loading && !error && users.length === 0 && (
              <tr>
                <td colSpan={6} className="py-16 text-center">
                  <div className="flex flex-col items-center gap-3 text-slate-400">
                    <FaUserSlash size={32} className="opacity-40" />
                    <p className="text-sm font-medium">No users match your filters</p>
                    <button
                      onClick={() => {
                        setSearch("");
                        setRole("all");
                        setStatus("all");
                        setDepartment("all");
                      }}
                      className="rounded-lg bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
                    >
                      Clear filters
                    </button>
                  </div>
                </td>
              </tr>
            )}

            {/* Data rows */}
            {!loading &&
              !error &&
              users.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-slate-100 transition-colors hover:bg-slate-50/70"
                >
                  {/* User */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://i.pravatar.cc/150?img=${user.id + 10}`}
                        alt={user.name}
                        className="h-9 w-9 rounded-full object-cover ring-2 ring-slate-100"
                      />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-800">
                          {user.name}
                        </p>
                        <p className="truncate text-xs text-slate-400">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="px-5 py-4">
                    <RoleBadge role={user.role} />
                  </td>

                  {/* Department */}
                  <td className="px-5 py-4 text-sm text-slate-600">
                    {user.department}
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <StatusBadge status={user.status} />
                  </td>

                  {/* Last login */}
                  <td className="px-5 py-4 text-xs text-slate-400">
                    {user.last_login}
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-1.5">
                      <ActionBtn icon={FaEye}  color="blue"    title="View user"       />
                      <ActionBtn icon={FaEdit} color="emerald" title="Edit user"       />
                      <ActionBtn icon={FaBan}  color="rose"    title="Block user"      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* ── Pagination ──────────────────────────────── */}
      {!loading && !error && totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3.5">
          <p className="text-xs text-slate-400">
            Page <span className="font-semibold text-slate-600">{page}</span> of{" "}
            <span className="font-semibold text-slate-600">{totalPages}</span>
            {" "}·{" "}
            <span className="font-semibold text-slate-600">{total}</span> total
          </p>

          <div className="flex items-center gap-1.5">
            <PageBtn
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              icon={<FaChevronLeft size={11} />}
            />

            {/* Page numbers */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const p = Math.max(1, Math.min(page - 2, totalPages - 4)) + i;
              if (p < 1 || p > totalPages) return null;
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`h-8 w-8 rounded-lg text-xs font-semibold transition-all ${
                    page === p
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  {p}
                </button>
              );
            })}

            <PageBtn
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              icon={<FaChevronRight size={11} />}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// ── Tiny shared button components ────────────────────────────

const ActionBtn = ({ icon: Icon, color, title }) => {
  const colors = {
    blue:    "text-blue-500 hover:bg-blue-50 hover:text-blue-600",
    emerald: "text-emerald-500 hover:bg-emerald-50 hover:text-emerald-600",
    rose:    "text-rose-400 hover:bg-rose-50 hover:text-rose-600",
  };
  return (
    <button
      title={title}
      className={`rounded-lg p-1.5 transition-all ${colors[color]}`}
    >
      <Icon size={13} />
    </button>
  );
};

const PageBtn = ({ onClick, disabled, icon }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-all hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
  >
    {icon}
  </button>
);

export default UserTable;