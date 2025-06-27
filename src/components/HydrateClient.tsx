'use client';

import { ReactNode } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function HydrateClient({ children }: { children?: ReactNode }) {
  return <>{children}<ReactQueryDevtools initialIsOpen={false} /></>;
}