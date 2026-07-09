import { useState, useEffect, useCallback } from "react";
import {
  fetchObligations,
  createObligation,
  updateObligationStatus,
  deleteObligation,
} from "../api/obligationApi";

export function useObligations() {
  const [obligations, setObligations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadObligations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchObligations();
      setObligations(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadObligations();
  }, [loadObligations]);

  const addObligation = async (payload) => {
    const created = await createObligation(payload);
    setObligations((prev) => [...prev, created]);
  };

  const moveObligation = async (id, newStatus) => {
    // Optimistic update so the UI feels instant, then reconcile with server response.
    setObligations((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
    try {
      const updated = await updateObligationStatus(id, newStatus);
      setObligations((prev) => prev.map((o) => (o.id === id ? updated : o)));
    } catch (err) {
      setError(err.message);
      loadObligations(); // roll back to server truth if the update failed
    }
  };

  const removeObligation = async (id) => {
    await deleteObligation(id);
    setObligations((prev) => prev.filter((o) => o.id !== id));
  };

  return {
    obligations,
    loading,
    error,
    addObligation,
    moveObligation,
    removeObligation,
    refresh: loadObligations,
  };
}
