function StatusBadge({ status }) {
  const colors = {
    Success: "success",
    Warning: "warning",
    Critical: "danger",
    Info: "primary",
  };

  return (
    <span className={`badge bg-${colors[status]} px-3 py-2`}>
      {status}
    </span>
  );
}

export default StatusBadge;