const STATUS_STYLES = {
  Compliant: "text-status-compliant bg-status-compliantBg",
  "At Risk": "text-status-risk bg-status-riskBg",
  Expired: "text-status-expired bg-status-expiredBg",
  Pending: "text-status-pending bg-status-pendingBg",
};

export default function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] ?? "text-ink-soft bg-bg";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${style}`}
    >
      {status}
    </span>
  );
}
