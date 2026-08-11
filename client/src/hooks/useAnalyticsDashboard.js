import { useEffect, useState, useCallback } from 'react';
import * as analyticsApi from '../services/analyticsApi';

export function useAnalyticsDashboard() {
  const [overview, setOverview] = useState(null);
  const [trend, setTrend] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [departments, setDepartments] = useState(null);
  const [activities, setActivities] = useState(null);

  const [range, setRange] = useState('3M');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [overviewRes, trendRes, metricsRes, deptRes, activitiesRes] = await Promise.all([
        analyticsApi.getOverview(),
        analyticsApi.getGrowthTrend(range),
        analyticsApi.getPerformanceMetrics(),
        analyticsApi.getDepartmentPerformance(),
        analyticsApi.getRecentActivities(5),
      ]);
      setOverview(overviewRes);
      setTrend(trendRes);
      setMetrics(metricsRes);
      setDepartments(deptRes);
      setActivities(activitiesRes);
    } catch (err) {
      setError(err.message || 'Failed to load the dashboard.');
    } finally {
      setLoading(false);
    }
  }, [range]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return { overview, trend, metrics, departments, activities, range, setRange, loading, error, refetch: fetchAll };
}
