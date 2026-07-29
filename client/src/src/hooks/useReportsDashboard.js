import { useEffect, useState, useCallback } from 'react';
import { getReportsSummary, getMonthlyActivity, getReportLibrary } from '../services/reportsApi';

/**
 * Loads everything the Reports Dashboard page needs and exposes a single
 * { data, loading, error, refetch } shape so the page component stays a
 * pure render function.
 */
export function useReportsDashboard(year = new Date().getFullYear()) {
  const [summary, setSummary] = useState(null);
  const [activity, setActivity] = useState(null);
  const [library, setLibrary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [summaryRes, activityRes, libraryRes] = await Promise.all([
        getReportsSummary(),
        getMonthlyActivity(year),
        getReportLibrary({ page: 1, pageSize: 10 }),
      ]);
      setSummary(summaryRes);
      setActivity(activityRes);
      setLibrary(libraryRes);
    } catch (err) {
      setError(err.message || 'Something went wrong loading the dashboard.');
    } finally {
      setLoading(false);
    }
  }, [year]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return { summary, activity, library, loading, error, refetch: fetchAll };
}
