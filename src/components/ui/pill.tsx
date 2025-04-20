import { cn } from '@/lib/utils';
import React from 'react';
import { IoClose } from 'react-icons/io5';

type PillProps = {
  label: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  onClick?: (value?: string | number) => void;
  value?: string | number;
  leftSection?: React.ReactNode;
  className?: string;
  withClose?: boolean;
};

export default function Pill({
  label,
  size = 'sm',
  onClick,
  value,
  leftSection,
  className,
  withClose = false,
}: PillProps) {
  function getSize(size: 'xs' | 'sm' | 'md' | 'lg' | 'xl') {
    switch (size) {
      case 'xs':
        return 14;
      case 'sm':
        return 16;
      case 'md':
        return 18;
      case 'lg':
        return 20;
      case 'xl':
        return 22;
      default:
        return 16;
    }
  }

  const handleClick = () => {
    if (onClick) {
      onClick(value);
    }
  };

  return (
    <button
      className={cn(
        'group font-medium border border-slate-200 flex items-center gap-1 bg-white hover:bg-gray-100 focus:outline-none',
        size === 'xs' && 'rounded-sm px-1 py-0.5 text-xs',
        size === 'sm' && 'rounded-sm px-1.5 py-1 text-sm',
        size === 'md' && 'rounded-md px-2 py-1 text-sm',
        size === 'lg' && 'rounded-md px-2.5 py-1.5 text-base',
        size === 'xl' && 'rounded-md px-3 py-2 text-base',
        className,
      )}
      onClick={handleClick}
      type='button'
    >
      {leftSection && <>{leftSection}</>}
      <p>{label}</p>
      {withClose && (
        <IoClose
          size={getSize(size)}
          className='text-gray-400 group-hover:bg-gray-25 rounded-md'
        />
      )}
    </button>
  );
}
