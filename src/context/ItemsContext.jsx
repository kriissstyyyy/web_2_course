import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAirplanes, getAirplaneById } from '../api/airplanesApi';
import { resolveImage } from '../utils/imageMap';

const ItemsContext = createContext(null);

export function ItemsProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const data = await getAirplanes();
        if (!cancelled) {
          const withImages = (Array.isArray(data) ? data : []).map((item) => ({
            ...item,
            image: resolveImage(item.image)
          }));
          setItems(withImages);
        }
      } catch (e) {
        if (!cancelled) setItems([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const getItemById = async (id) => {
    try {
      const data = await getAirplaneById(id);
      return { ...data, image: resolveImage(data.image) };
    } catch (e) {
      return items.find((item) => item.id === Number(id)) || null;
    }
  };

  return (
    <ItemsContext.Provider value={{ items, loading, getItemById }}>
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
