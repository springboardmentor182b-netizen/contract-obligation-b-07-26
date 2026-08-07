import React from 'react';
import { RefreshCw, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

export default function RenewalSummaryCards({ summary }) {
  if (!summary) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col gap-2">
        <div className="flex items-start justify-between">
          <p className="text-xs font-medium tracking-wide text-slate-400 uppercase">Upcoming Renewals</p>
          <span className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
            <RefreshCw size={16} className="text-blue-600" />
          </span>
        </div>
        <p className="text-3xl font-semibold text-slate-900 leading-none">{summary.upcomingRenewals}</p>
        <p className="text-xs text-slate-400">Next {summary.upcomingWindowDays} days</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col gap-2">
        <div className="flex items-start justify-between">
          <p className="text-xs font-medium tracking-wide text-slate-400 uppercase">Renewed</p>
          <span className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
            <CheckCircle2 size={16} className="text-emerald-600" />
          </span>
        </div>
        <p className="text-3xl font-semibold text-slate-900 leading-none">{summary.renewedCount}</p>
        <p className="text-xs font-medium text-emerald-600">↗ +{summary.renewedDeltaVsLastQuarter} vs last quarter</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col gap-2">
        <div className="flex items-start justify-between">
          <p className="text-xs font-medium tracking-wide text-slate-400 uppercase">Expired</p>
          <span className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center">
            <XCircle size={16} className="text-red-600" />
          </span>
        </div>
        <p className="text-3xl font-semibold text-slate-900 leading-none">{summary.expiredCount}</p>
        {summary.expiredNeedsReview && <p className="text-xs font-medium text-red-600">↘ Needs review</p>}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col gap-2">
        <div className="flex items-start justify-between">
          <p className="text-xs font-medium tracking-wide text-slate-400 uppercase">Cancelled</p>
          <span className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center">
            <AlertTriangle size={16} className="text-slate-500" />
          </span>
        </div>
        <p className="text-3xl font-semibold text-slate-900 leading-none">{summary.cancelledCount}</p>
        <p className="text-xs text-slate-400">This fiscal year</p>
      </div>
    </div>
  );
}
