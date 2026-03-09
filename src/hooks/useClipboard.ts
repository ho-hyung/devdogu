'use client';

import { useState, useCallback, useRef } from 'react';

interface UseClipboardOptions {
  timeout?: number;
}

interface UseClipboardReturn {
  copy: (text: string) => Promise<boolean>;
  copied: boolean;
}

export function useClipboard({ timeout = 2000 }: UseClipboardOptions = {}): UseClipboardReturn {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = useCallback(async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text);

      if (timerRef.current) clearTimeout(timerRef.current);
      setCopied(true);
      timerRef.current = setTimeout(() => setCopied(false), timeout);

      return true;
    } catch {
      setCopied(false);
      return false;
    }
  }, [timeout]);

  return { copy, copied };
}
