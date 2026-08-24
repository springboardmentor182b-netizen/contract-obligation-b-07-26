export async function forgotPassword(apiBaseUrl, payload) {
  const response = await fetch(`${apiBaseUrl}/api/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => null)
    throw new Error(error?.detail || 'Unable to reset password')
  }

  return response.json()
}
