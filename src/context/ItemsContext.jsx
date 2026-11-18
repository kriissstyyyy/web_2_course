import React, { createContext, useContext, useState } from 'react';
import airplanesData from '../data/airplanes';

const ItemsContext = createContext(null);

export function ItemsProvider({ children }) {
  const [items] = useState(airplanesData);

  const getItemById = (id) => {
    return items.find((item) => item.id === Number(id));
  };

  return (
    <ItemsContext.Provider value={{ items, getItemById }}>
      {children}
    </ItemsContext.Provider>
  );
}

export function useItems() {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error('useItems must be used within ItemsProvider');
  }
  return context;
}
