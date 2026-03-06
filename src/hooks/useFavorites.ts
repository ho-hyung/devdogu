'use client';

import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useFavorites() {
  const [favorites, setFavorites, isHydrated] = useLocalStorage<string[]>('favorites', []);

  const toggleFavorite = useCallback(
    (toolId: string) => {
      setFavorites((prev) =>
        prev.includes(toolId) ? prev.filter((id) => id !== toolId) : [...prev, toolId]
      );
    },
    [setFavorites]
  );

  const isFavorite = useCallback(
    (toolId: string) => favorites.includes(toolId),
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite, isHydrated };
}
