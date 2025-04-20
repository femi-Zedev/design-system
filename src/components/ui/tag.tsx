import { cn } from '@/lib/utils';
import React from 'react';

type Status = 'success' | 'error' | 'warning' | 'info' | 'idle' | 'focus';
interface TagProps {
  className?: string;
  status?: Status;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  withSpacing?: boolean;
  leftSection?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
}
export default function Tag({
  className,
  children,
  leftSection,
  status = 'info',
  withSpacing = true,
  size = 'sm',
  onClick,
}: TagProps) {
  function getSizeClasses(size: 'xs' | 'sm' | 'md' | 'lg' | 'xl') {
    switch (size) {
      case 'xs':
        return 'px-1.5 py-0 text-xs';
      case 'sm':
        return 'px-1.5 py-0.5 text-sm';
      case 'md':
        return 'px-2 py-0.5 text-sm';
      case 'lg':
        return 'px-2.5 py-0.5 text-sm';
      case 'xl':
        return 'px-3 py-0.5 text-sm';
      default:
        return 'px-2 py-0.5 text-sm';
    }
  }

  function getColorsClasses(status: Status) {
    switch (status) {
      case 'success':
        return 'bg-success-50 border-success-200 text-success-500';
      case 'error':
        return 'bg-error-50 border-error-200 text-error-500';
      case 'warning':
        return 'bg-orange-50 border-orange-200 text-orange-500';
      case 'info':
        return 'bg-brand-50 border-brand-200 text-brand-500';
      case 'idle':
        return 'bg-gray-50 border-gray-200 text-gray-500';
      case 'focus':
        return 'bg-purple-50 border-purple-200 text-purple-500';
      default:
        return 'bg-brand-50 border-brand-200 text-brand-500';
    }
  }

  return (
    <span
      className={cn(
        'flex items-center font-medium border rounded-sm w-fit',
        getColorsClasses(status),
        getSizeClasses(size),
        className,
      )}
      onClick={onClick}
    >
      {leftSection}
      <div className={cn(leftSection && withSpacing && 'mx-2')}>{children}</div>
    </span>
  );
}
