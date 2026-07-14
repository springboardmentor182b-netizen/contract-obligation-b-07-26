import { useEffect, useState } from 'react'

export default function useFetch(url, options) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(Boolean(url))

  useEffect(() => {
    if (!url) return undefined

    const controller = new AbortController()

    fetch(url, { ...options, signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Request failed')
        return response.json()
      })
      .then(setData)
      .catch((caughtError) => {
        if (caughtError.name !== 'AbortError') setError(caughtError)
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [url, options])

  return { data, error, loading }
}
