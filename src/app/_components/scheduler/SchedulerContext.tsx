'use client';

import { createContext, useContext, useState } from 'react';

export type LayoutType = 'table' | 'grid';

interface SchedulerContextType {
  layout: LayoutType;
  setLayout: (layout: LayoutType) => void;
}

const SchedulerContext = createContext<SchedulerContextType | undefined>(undefined);

export function SchedulerProvider({ children }: { children: React.ReactNode }) {
  const [layout, setLayout] = useState<LayoutType>('table');

  return (
    <SchedulerContext.Provider value={{ layout, setLayout }}>
      {children}
    </SchedulerContext.Provider>
  );
}

export function useScheduler() {
  const context = useContext(SchedulerContext);
  if (context === undefined) {
    throw new Error('useScheduler must be used within a SchedulerProvider');
  }
  return context;
}
