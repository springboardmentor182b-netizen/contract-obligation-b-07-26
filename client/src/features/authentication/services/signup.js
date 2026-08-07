export async function signup(apiBaseUrl, payload) {
  const response = await fetch(`${apiBaseUrl}/api/users/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: payload.email,
      password: payload.password,
      full_name: payload.name,
      role: payload.role,
    }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    const detail = Array.isArray(error?.detail)
      ? error.detail.map((item) => item.msg).join('. ')
      : error?.detail;
    throw new Error(detail || 'Unable to create account');
  }

  return response.json()
}
