import React, { createContext, useContext, useState } from 'react';

const AnalyticsContext = createContext();

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};

export const AnalyticsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  const trackEvent = (eventName, eventData = {}) => {
    const event = {
      name: eventName,
      data: eventData,
      timestamp: new Date().toISOString()
    };
    
    setEvents(prev => [...prev, event]);
    console.log('Analytics Event:', event);
  };

  return (
    <AnalyticsContext.Provider value={{ events, trackEvent }}>
      {children}
    </AnalyticsContext.Provider>
  );
};
