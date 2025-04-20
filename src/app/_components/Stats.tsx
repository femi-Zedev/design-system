import React from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { LuTrash2 } from 'react-icons/lu';
import CopyButton from './CopyButton';

interface StatsProps {
  stats: { count: string; label: string }[];
  withCopyLink?: boolean;
  onCopy?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function Stats({
  stats,
  withCopyLink = false,
  onCopy,
  onEdit,
  onDelete,
}: StatsProps) {
  return (
    <div className='z-50 border border-slate-100/80 absolute left-1/2 transform -translate-x-1/2 bottom-0 translate-y-1/2 p-6 bg-white rounded-xl shadow-2xl shadow-slate-100 '>
      <hgroup className='flex min-w-max gap-5'>
        {stats.map(({ count, label }, index) => (
          <span
            key={label}
            className='flex gap-x-1.5 items-center'
          >
            <h3 className='text-base font-semibold text-slate-700'>{count}</h3>
            <p className='text-slate-400 font-medium text-sm mt-0.5'> {label} </p>
          </span>
        ))}
        <hr className='w-px my-auto bg-slate-200 mx-2 h-[28px]' />
        <span className='flex items-center gap-4'>
          {withCopyLink && <CopyButton onClick={() => onCopy && onCopy()}>Copy link</CopyButton>}
          <button
            onClick={() => onEdit && onEdit()}
            className='group p-1.5 active:scale-95 transition transform rounded-sm hover:bg-brand-50 bg-white '
            aria-label='edit'
          >
            <FiEdit2
              size={20}
              className='shrink-0 text-gray-500 group-hover:text-brand-500'
            />
          </button>

          <button
            onClick={() => onDelete && onDelete()}
            className='group p-1.5 active:scale-95 transition transform rounded-sm hover:bg-red-50 bg-white '
            aria-label='delete'
          >
            <LuTrash2
              size={20}
              className='shrink-0 text-slate-500 group-hover:text-red-500'
            />
          </button>
        </span>
      </hgroup>
    </div>
  );
}
