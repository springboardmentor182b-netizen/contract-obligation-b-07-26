import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Loader2 } from 'lucide-react';
import { useAuth } from './authContext';

// Matches the role list from the ContractIQ platform spec
const ROLES = [
  'Employee',
  'Department Head',
  'Contract Manager',
  'Compliance Officer',
  'Legal Manager',
  'Administrator',
];

export default function RegisterForm() {
  const { register, error: authError } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ROLES[0],
  });
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState(null);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLocalError(null);

    if (!form.name || !form.email || !form.password) {
      setLocalError('Fill in all required fields.');
      return;
    }
    if (form.password.length < 8) {
      setLocalError('Password must be at least 8 characters.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setLocalError('Passwords do not match.');
      return;
    }

    setSubmitting(true);
    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      });
      navigate('/dashboard');
    } catch {
      // authError from context already holds the server message
    } finally {
      setSubmitting(false);
    }
  }

  const displayError = localError || authError;

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Create your account</h1>
        <p className="text-sm text-slate-400 mt-1">Get started with ContractIQ</p>
      </div>

      <div>
        <label htmlFor="name" className="text-sm font-medium text-slate-700">
          Full name
        </label>
        <div className="relative mt-1">
          <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            id="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Jane Doe"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium text-slate-700">
          Email
        </label>
        <div className="relative mt-1">
          <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="role" className="text-sm font-medium text-slate-700">
          Role
        </label>
        <select
          id="role"
          value={form.role}
          onChange={(e) => update('role', e.target.value)}
          className="w-full mt-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          {ROLES.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="password" className="text-sm font-medium text-slate-700">
          Password
        </label>
        <div className="relative mt-1">
          <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            value={form.password}
            onChange={(e) => update('password', e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="At least 8 characters"
          />
        </div>
      </div>

      <div>
        <label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700">
          Confirm password
        </label>
        <div className="relative mt-1">
          <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={form.confirmPassword}
            onChange={(e) => update('confirmPassword', e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Re-enter your password"
          />
        </div>
      </div>

      {displayError && <p className="text-xs text-red-600">{displayError}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium rounded-lg py-2.5"
      >
        {submitting && <Loader2 size={15} className="animate-spin" />}
        {submitting ? 'Creating account…' : 'Create account'}
      </button>

      <p className="text-center text-sm text-slate-500">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-blue-600 hover:underline">
          Log in
        </Link>
      </p>
    </form>
  );
}
