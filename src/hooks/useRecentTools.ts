'use client';

import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

const MAX_RECENT = 5;

export function useRecentTools() {
  const [recent, setRecent, isHydrated] = useLocalStorage<string[]>('recent', []);

  const addRecent = useCallback(
    (toolId: string) => {
      setRecent((prev) => {
        const filtered = prev.filter((id) => id !== toolId);
        return [toolId, ...filtered].slice(0, MAX_RECENT);
      });
    },
    [setRecent]
  );

  return { recent, addRecent, isHydrated };
}
