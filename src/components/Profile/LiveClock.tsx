'use client';

import { useEffect, useState } from 'react';
import { formatSeconds } from '@/utils/time';
import { LiveClockProps } from './types';

export default function LiveClock({ lastOnline }: LiveClockProps) {
  const [elapsed, setElapsed] = useState<number | null>(null);

  useEffect(() => {
    setElapsed(Math.floor(Date.now() / 1000 - lastOnline));

    const interval = setInterval(() => {
      setElapsed((prev) => (prev ?? 0) + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [lastOnline]);

  return (
    <p role="status" aria-live="polite">
      <strong>Last seen:</strong>{' '}
      {elapsed === null ? (
        'No data available'
      ) : (
        <time dateTime={`-${elapsed}s`}>
          {formatSeconds(elapsed)} ago
        </time>
      )}
    </p>
  );
}
