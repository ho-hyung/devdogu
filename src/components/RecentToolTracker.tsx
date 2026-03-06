'use client';

import { useEffect } from 'react';
import { useRecentTools } from '@/hooks/useRecentTools';

interface RecentToolTrackerProps {
  toolId: string;
}

export default function RecentToolTracker({ toolId }: RecentToolTrackerProps) {
  const { addRecent } = useRecentTools();

  useEffect(() => {
    addRecent(toolId);
  }, [toolId, addRecent]);

  return null;
}
