import React from 'react';
import { Button, Group, Text } from '@mantine/core';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ConfirmationModalProps {
  message: string | React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  variant?: 'danger' | 'warning' | 'info';
}

export default function ConfirmationModal({
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  isLoading = false,
  variant = 'danger',
}: ConfirmationModalProps) {
  // Determine button color based on variant
  const getButtonColor = () => {
    switch (variant) {
      case 'danger':
        return 'bg-error-500 hover:bg-error-600';
      case 'warning':
        return 'bg-orange-500 hover:bg-orange-600';
      case 'info':
        return 'bg-brand-500 hover:bg-brand-600';
      default:
        return 'bg-red-500 hover:bg-red-600';
    }
  };

  return (
    <div className=''>
      <Text
        size='sm'
        color='gray.7'
        mb={24}
        mx={24}
      >
        {message}
      </Text>
      <div className='pb-6 px-6 w-full flex gap-3'>
        <Button
          variant='default'
          onClick={onCancel}
          disabled={isLoading}
          fullWidth
        >
          {cancelLabel}
        </Button>
        {/* 
        <Button
          color={getButtonColor()}
          onClick={onConfirm}
          loading={isLoading}
          fullWidth
        >
          {confirmLabel}
        </Button> */}

        <button
          className={cn('btn-base w-full justify-center', getButtonColor())}
          onClick={onConfirm}
        >
          {isLoading && <Loader2 className='animate-spin' />}
          {confirmLabel}
        </button>
      </div>
    </div>
  );
}
