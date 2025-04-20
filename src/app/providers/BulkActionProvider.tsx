'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button as ButtonUI } from '@/components/ui/button';
import { usePathname } from 'next/navigation';

// Types
interface BulkActionProps {
  title: React.ReactNode;
  actionArea: React.ReactNode;
}

interface BulkActionContextType {
  open: (props: BulkActionProps) => void;
  close: () => void;
}

// Context
const BulkActionContext = React.createContext<BulkActionContextType | undefined>(undefined);

// Hook
export function useBulkAction() {
  const context = React.useContext(BulkActionContext);
  if (!context) {
    throw new Error('useBulkAction must be used within a BulkActionProvider');
  }
  return context;
}

// Component
function BulkActionComponent({
  title,
  actionArea,
  onDismiss,
}: BulkActionProps & { onDismiss: () => void }) {
  return (
    <div
      className={cn(
        'fixed bottom-4 left-1/2 z-50 -translate-x-1/2 transform animate-in fade-in slide-in-from-bottom-4 duration-200',
      )}
    >
      <div className='flex items-center gap-3 rounded-lg border bg-background px-4 py-3 shadow-lg'>
        {title}
        <div className='flex items-center gap-2'>
          {actionArea}
          <ButtonUI
            size='sm'
            variant='ghost'
            className='h-8 w-8 p-0'
            onClick={() => {
              onDismiss();
            }}
          >
            <X className='h-4 w-4' />
            <span className='sr-only'>Dismiss</span>
          </ButtonUI>
        </div>
      </div>
    </div>
  );
}

// Provider
export function BulkActionProvider({ children }: { children: React.ReactNode }) {
  const [bulkActionProps, setBulkActionProps] = React.useState<BulkActionProps | null>(null);
  const pathName = usePathname();

  const open = React.useCallback((props: BulkActionProps) => {
    setBulkActionProps(props);
  }, []);

  const close = React.useCallback(() => {
    setBulkActionProps(null);
  }, []);

  React.useEffect(() => {
    close();
  }, [pathName, close]);

  return (
    <BulkActionContext.Provider value={{ open, close }}>
      {children}
      {bulkActionProps && (
        <BulkActionComponent
          {...bulkActionProps}
          onDismiss={close}
        />
      )}
    </BulkActionContext.Provider>
  );
}
