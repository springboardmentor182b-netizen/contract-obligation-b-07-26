import { useEffect, useState, useCallback } from 'react';
import * as renewalsApi from '../services/renewalsApi';

const PAGE_SIZE = 10;

export function useRenewalsDashboard(year = new Date().getFullYear()) {
  const [summary, setSummary] = useState(null);
  const [activity, setActivity] = useState(null);
  const [reminders, setReminders] = useState(null);

  const [pipeline, setPipeline] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionError, setActionError] = useState(null);

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [summaryRes, activityRes, remindersRes, pipelineRes] = await Promise.all([
        renewalsApi.getRenewalsSummary(),
        renewalsApi.getActivityTrend(year),
        renewalsApi.getReminderSchedule(5),
        renewalsApi.getPipeline({ page, pageSize: PAGE_SIZE, status: statusFilter, search }),
      ]);
      setSummary(summaryRes);
      setActivity(activityRes);
      setReminders(remindersRes);
      setPipeline(pipelineRes.items);
      setTotal(pipelineRes.total);
    } catch (err) {
      setError(err.message || 'Failed to load the renewals dashboard.');
    } finally {
      setLoading(false);
    }
  }, [year, page, statusFilter, search]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  useEffect(() => {
    setPage(1);
  }, [statusFilter, search]);

  async function refetchPipelineOnly() {
    try {
      const res = await renewalsApi.getPipeline({ page, pageSize: PAGE_SIZE, status: statusFilter, search });
      setPipeline(res.items);
      setTotal(res.total);
    } catch (err) {
      setActionError(err.message || 'Failed to refresh the pipeline.');
    }
  }

  async function addRenewal(payload) {
    setActionError(null);
    try {
      await renewalsApi.createRenewal(payload);
      await fetchDashboard();
    } catch (err) {
      setActionError(err.message || 'Failed to create renewal.');
      throw err;
    }
  }

  async function editRenewal(id, payload) {
    setActionError(null);
    try {
      await renewalsApi.updateRenewal(id, payload);
      await fetchDashboard();
    } catch (err) {
      setActionError(err.message || 'Failed to update renewal.');
      throw err;
    }
  }

  async function removeRenewal(id) {
    setActionError(null);
    try {
      await renewalsApi.deleteRenewal(id);
      await refetchPipelineOnly();
    } catch (err) {
      setActionError(err.message || 'Failed to delete renewal.');
      throw err;
    }
  }

  return {
    summary,
    activity,
    reminders,
    pipeline,
    total,
    page,
    pageSize: PAGE_SIZE,
    setPage,
    statusFilter,
    setStatusFilter,
    search,
    setSearch,
    loading,
    error,
    actionError,
    refetch: fetchDashboard,
    addRenewal,
    editRenewal,
    removeRenewal,
  };
}
