import { useEffect, useState, useCallback } from 'react';
import * as usersApi from '../services/usersApi';

const PAGE_SIZE = 10;

export function useUserManagement() {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionError, setActionError] = useState(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await usersApi.getUsers({
        page,
        pageSize: PAGE_SIZE,
        search,
        role: roleFilter,
        status: statusFilter,
      });
      setUsers(res.items);
      setTotal(res.total);
    } catch (err) {
      setError(err.message || 'Failed to load users.');
    } finally {
      setLoading(false);
    }
  }, [page, search, roleFilter, statusFilter]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Reset to page 1 whenever filters change so results aren't stuck on an empty page
  useEffect(() => {
    setPage(1);
  }, [search, roleFilter, statusFilter]);

  async function addUser(payload) {
    setActionError(null);
    try {
      await usersApi.createUser(payload);
      await fetchUsers();
    } catch (err) {
      setActionError(err.message || 'Failed to create user.');
      throw err;
    }
  }

  async function editUser(id, payload) {
    setActionError(null);
    try {
      await usersApi.updateUser(id, payload);
      await fetchUsers();
    } catch (err) {
      setActionError(err.message || 'Failed to update user.');
      throw err;
    }
  }

  async function changeRole(id, role) {
    setActionError(null);
    try {
      await usersApi.updateUserRole(id, role);
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
    } catch (err) {
      setActionError(err.message || 'Failed to change role.');
      throw err;
    }
  }

  async function toggleStatus(id, currentStatus) {
    setActionError(null);
    const nextStatus = currentStatus === 'active' ? 'inactive' : 'active';
    try {
      await usersApi.updateUserStatus(id, nextStatus);
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status: nextStatus } : u)));
    } catch (err) {
      setActionError(err.message || 'Failed to update status.');
      throw err;
    }
  }

  async function removeUser(id) {
    setActionError(null);
    try {
      await usersApi.deleteUser(id);
      await fetchUsers();
    } catch (err) {
      setActionError(err.message || 'Failed to delete user.');
      throw err;
    }
  }

  return {
    users,
    total,
    page,
    pageSize: PAGE_SIZE,
    setPage,
    search,
    setSearch,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    loading,
    error,
    actionError,
    refetch: fetchUsers,
    addUser,
    editUser,
    changeRole,
    toggleStatus,
    removeUser,
  };
}
