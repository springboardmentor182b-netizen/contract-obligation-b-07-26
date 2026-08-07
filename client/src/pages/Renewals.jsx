import React, { useState } from 'react';
import { RefreshCw, Bell, Search } from 'lucide-react';
import { useRenewalsDashboard } from '../hooks/useRenewalsDashboard';
import * as renewalsApi from '../services/renewalsApi';
import RenewalSummaryCards from '../features/renewals/RenewalSummaryCards';
import RenewalActivityChart from '../features/renewals/RenewalActivityChart';
import ReminderSchedule from '../features/renewals/ReminderSchedule';
import RenewalPipelineTable from '../features/renewals/RenewalPipelineTable';
import RenewalFormModal from '../features/renewals/RenewalFormModal';
import RenewalDetailModal from '../features/renewals/RenewalDetailModal';
import SetRemindersModal from '../features/renewals/SetRemindersModal';
import ConfirmDialog from '../features/renewals/ConfirmDialog';

function DashboardSkeleton() {
  return (
    <div className="p-8 animate-pulse space-y-6">
      <div className="h-8 w-64 bg-slate-200 rounded" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-28 bg-slate-200 rounded-xl" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 h-72 bg-slate-200 rounded-xl" />
        <div className="h-72 bg-slate-200 rounded-xl" />
      </div>
    </div>
  );
}

export default function Renewals() {
  const year = new Date().getFullYear();
  const {
    summary, activity, reminders, pipeline, total, page, pageSize, setPage,
    statusFilter, setStatusFilter, search, setSearch,
    loading, error, actionError, refetch,
    addRenewal, editRenewal, removeRenewal,
  } = useRenewalsDashboard(year);

  const [formOpen, setFormOpen] = useState(false);
  const [editingRenewal, setEditingRenewal] = useState(null);
  const [viewingRenewal, setViewingRenewal] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [reminderModalOpen, setReminderModalOpen] = useState(false);
  const [reminderThresholds, setReminderThresholds] = useState([]);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  function openCreateForm() {
    setEditingRenewal(null);
    setFormOpen(true);
  }

  function openEditForm(renewal) {
    setEditingRenewal(renewal);
    setFormOpen(true);
  }

  async function openReminderSettings() {
    try {
      const res = await renewalsApi.getReminderSettings();
      setReminderThresholds(res.thresholds);
    } catch {
      setReminderThresholds([14, 60, 90]);
    }
    setReminderModalOpen(true);
  }

  async function handleSaveReminders(thresholds) {
    await renewalsApi.updateReminderSettings(thresholds);
    await refetch();
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    await removeRenewal(deleteTarget.id);
    setDeleteTarget(null);
  }

  return (
    <div className="flex-1 flex flex-col overflow-y-auto bg-slate-50">
      <main className="p-8 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Renewal Management</h1>
            <p className="text-sm text-slate-400 mt-1">Track upcoming contract renewals, set reminders, and manage expirations</p>
          </div>
          <button
            onClick={openCreateForm}
            className="flex items-center gap-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2"
          >
            <RefreshCw size={15} /> Renew Contract
          </button>
        </div>

        {loading && <DashboardSkeleton />}

        {!loading && error && (
          <div className="text-center py-10">
            <p className="text-sm text-slate-600 mb-3">{error}</p>
            <button onClick={refetch} className="text-sm font-medium text-white bg-slate-900 rounded-lg px-4 py-2 hover:bg-slate-800">
              Try again
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            <RenewalSummaryCards summary={summary} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <RenewalActivityChart months={activity.months} year={activity.year} />
              <ReminderSchedule items={reminders.items} />
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-slate-900">Renewal Pipeline</h3>
                <button
                  onClick={openReminderSettings}
                  className="flex items-center gap-2 text-sm font-medium text-slate-700 border border-slate-200 rounded-lg px-3 py-1.5 hover:bg-slate-50"
                >
                  <Bell size={14} /> Set Reminders
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <div className="relative flex-1 min-w-[200px]">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search contract or counterparty"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white"
                >
                  <option value="">All statuses</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="renewed">Renewed</option>
                  <option value="expired">Expired</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {actionError && <p className="text-xs text-red-600 mb-3">{actionError}</p>}

              <RenewalPipelineTable
                items={pipeline}
                onView={setViewingRenewal}
                onEdit={openEditForm}
                onDelete={setDeleteTarget}
              />

              {total > 0 && (
                <div className="flex items-center justify-between mt-4 text-sm text-slate-500">
                  <p>
                    Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)} of {total}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="px-3 py-1.5 border border-slate-200 rounded-lg disabled:opacity-40"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="px-3 py-1.5 border border-slate-200 rounded-lg disabled:opacity-40"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </main>

      <RenewalFormModal
        open={formOpen}
        renewal={editingRenewal}
        onCreate={addRenewal}
        onUpdate={editRenewal}
        onClose={() => setFormOpen(false)}
      />

      <RenewalDetailModal open={!!viewingRenewal} renewal={viewingRenewal} onClose={() => setViewingRenewal(null)} />

      <SetRemindersModal
        open={reminderModalOpen}
        thresholds={reminderThresholds}
        onSave={handleSaveReminders}
        onClose={() => setReminderModalOpen(false)}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title={`Delete ${deleteTarget?.contractName}?`}
        message="This permanently removes the renewal record and cannot be undone."
        confirmLabel="Delete"
        tone="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
