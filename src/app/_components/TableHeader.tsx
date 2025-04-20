import { addTrailingZero, cn } from '@/lib/utils';
import React, { ReactNode } from 'react';

export default function TableHeader({
  title,
  titleClassName,
  leftSection,
  rightSection,
  className,
  dataCount,
  headerClassName,
}: {
  title?: ReactNode;
  titleClassName?: string;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
  className?: string;
  dataCount?: number | string;
  headerClassName?: string;
}) {
  return (
    <div
      id='header'
      className={cn(
        'flex items-center justify-between py-4 px-6 border-b rounded-t-xl bg-white border border-gray-100 w-full',
        headerClassName,
      )}
    >
      {leftSection ?? (
        <hgroup className='flex items-center gap-2 min-w-fit'>
          {typeof title !== 'undefined' && (
            <>
              <h3 className={cn('text-lg font-semibold', titleClassName)}>{title}</h3>

              {dataCount && (
                <span className='text-sm rounded-full py-0.5 px-2 border border-brand-200 bg-brand-50'>
                  {typeof dataCount === 'number' ? addTrailingZero(dataCount) : dataCount}
                </span>
              )}
            </>
          )}
        </hgroup>
      )}
      <>{rightSection}</>
    </div>
  );
}
