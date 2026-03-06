'use client';

import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const prefixedKey = `devdogu-${key}`;

  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(prefixedKey);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch {
      // localStorage unavailable or parse error
    }
    setIsHydrated(true);
  }, [prefixedKey]);

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const nextValue = value instanceof Function ? value(prev) : value;
        try {
          window.localStorage.setItem(prefixedKey, JSON.stringify(nextValue));
        } catch {
          // quota exceeded or unavailable
        }
        return nextValue;
      });
    },
    [prefixedKey]
  );

  return [storedValue, setValue, isHydrated] as const;
}
