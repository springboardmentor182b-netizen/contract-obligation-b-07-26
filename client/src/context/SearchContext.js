import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [globalSearch, setGlobalSearch] = useState('');

  return (
    <SearchContext.Provider value={{ globalSearch, setGlobalSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}