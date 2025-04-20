import { cn } from '@/lib/utils'
import React, { PropsWithChildren } from 'react'

type CopyButtonProps = {
  onClick?: () => void;
  size?: 'xs' | 'sm';
} & PropsWithChildren;

export default function CopyButton({ ...props }: CopyButtonProps) {
  const { onClick, children, size = 'sm' } = props;
  return (
    <button
      onClick={() => onClick && onClick()}
      className={cn('rounded-sm font-medium bg-brand-50 border border-brand-200 active:scale-95 transition transform focus:outline-none h-fit',
        size == 'xs' && 'px-2 py-0.5 text-xs',
        size == 'sm' && 'px-2 py-0.5 text-xs',
      )}>
      {children}
    </button>
  )
}
