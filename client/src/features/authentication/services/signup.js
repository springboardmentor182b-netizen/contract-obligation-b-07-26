export async function signup(apiBaseUrl, payload) {
  const response = await fetch(`${apiBaseUrl}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => null)
    const detail = Array.isArray(error?.detail)
      ? error.detail.map((item) => item.msg).join('. ')
      : error?.detail
    throw new Error(detail || 'Unable to create account')
  }

  return response.json()
}
