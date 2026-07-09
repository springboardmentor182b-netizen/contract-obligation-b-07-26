export async function getUsers(apiBaseUrl, token) {
  const response = await fetch(`${apiBaseUrl}/api/users`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    throw new Error('Unable to load users')
  }

  return response.json()
}
