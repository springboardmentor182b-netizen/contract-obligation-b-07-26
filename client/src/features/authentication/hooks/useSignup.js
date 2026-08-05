import { useState } from 'react'

import { signup } from '../services/signup'

export default function useSignup() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function createAccount(apiBaseUrl, payload) {
    setLoading(true)
    setError(null)
    try {
      return await signup(apiBaseUrl, payload)
    } catch (caughtError) {
      setError(caughtError)
      throw caughtError
    } finally {
      setLoading(false)
    }
  }

  return { createAccount, loading, error }
}
