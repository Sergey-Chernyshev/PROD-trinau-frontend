import React, { createContext, useContext, useState } from 'react';

const SharedDataContext = createContext();

export function SharedDataProvider({ children }) {
  const [sharedData, setSharedData] = useState(null);

  return (
    <SharedDataContext.Provider value={{ sharedData, setSharedData }}>
      {children}
    </SharedDataContext.Provider>
  );
}

export function useSharedData() {
  const context = useContext(SharedDataContext);
  if (!context) {
    throw new Error('useSharedData must be used within a SharedDataProvider');
  }
  return context;
}
