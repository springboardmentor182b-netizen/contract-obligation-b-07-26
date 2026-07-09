import React, { createContext, useContext, useMemo } from 'react'

const AnalyticsContext = createContext({ trackEvent: () => {} })

export function AnalyticsProvider({ children, trackEvent = () => {} }) {
  const value = useMemo(() => ({ trackEvent }), [trackEvent])
  return React.createElement(AnalyticsContext.Provider, { value }, children)
}

export function useAnalytics() {
  return useContext(AnalyticsContext)
}
