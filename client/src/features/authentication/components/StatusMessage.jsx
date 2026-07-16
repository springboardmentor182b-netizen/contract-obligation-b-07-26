export function StatusMessage({ message, status }) {
  if (!message) {
    return null
  }

  return <p className={`status-message ${status}`}>{message}</p>
}
