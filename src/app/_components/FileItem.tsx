import { cn } from '@/lib/utils';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import { LuTrash2 } from 'react-icons/lu';
import { Progress } from '@mantine/core';

interface FileItemProps {
  file: File | null;
  src?: string;
  name?: string;
  onFileDelete: () => void;
  showSize?: boolean;
  showDelete?: boolean;
  className?: string;
  imageClassName?: string;
  layout?: 'horizontal' | 'vertical';
  progress?: number;
}

const FileItem = ({
  file,
  src,
  name,
  onFileDelete,
  showSize = true,
  showDelete = true,
  layout = 'horizontal',
  className,
  imageClassName,
  progress,
}: FileItemProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (file && file.type.startsWith('image/')) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (src) {
      setPreviewUrl(src);
    }
  }, [file, src]);

  const displayName = file?.name || name || src?.split('/').pop() || 'File';
  const fileSize = file?.size ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : undefined;

  const DeleteButton = () => (
    <button
      onClick={e => {
        e.preventDefault();
        onFileDelete();
      }}
      className='w-auto group p-1.5 h-fit mr-2 rounded-sm hover:bg-red-100 bg-white border border-slate-100'
      aria-label='delete'
    >
      <LuTrash2
        size={18}
        className='shrink-0 text-red-500 group-hover:text-red-500'
      />
    </button>
  );

  return (
    <div
      className={cn(
        `my-3 w-full p-2 bg-gray-25 border border-slate-100 rounded-md flex items-center`,
        layout === 'vertical' ? 'justify-center' : 'justify-between',
        className,
      )}
    >
      {layout === 'horizontal' ? (
        <div className='w-full space-y-2'>
          <div className='flex w-full items-center'>
            <div className='flex flex-col w-[92%] gap-2'>
              <div className='flex items-center gap-2'>
                {previewUrl ? (
                  <div className='relative w-[48px] h-[48px] shrink-0'>
                    <Image
                      src={previewUrl}
                      alt={displayName}
                      layout='fill'
                      className='rounded-sm object-cover border border-slate-300'
                    />
                  </div>
                ) : (
                  <IconFile />
                )}

                <span className='w-full flex items-center gap-x-1 text-sm font-normal'>
                  <p className='max-w-[70%] truncate'>{displayName}</p>
                  {showSize && fileSize && <p className='ml-2'>{fileSize}</p>}
                </span>
              </div>
            </div>
            {showDelete && <DeleteButton />}
          </div>

          {typeof progress === 'number' && (
            <Progress
              value={progress}
              size='md'
              color='blue'
              className='w-full'
            />
          )}
        </div>
      ) : (
        <hgroup
          className={cn(
            'relative w-[230px] h-[240px] shrink-0 cursor-pointer rounded-md',
            imageClassName,
          )}
        >
          {previewUrl && (
            <>
              <Image
                src={previewUrl}
                alt={displayName}
                layout='fill'
                className='rounded-sm object-cover border border-slate-300'
              />

              {typeof progress === 'number' && (
                <div className='absolute bottom-0 left-0 right-0 p-2 bg-black/50 rounded-b-sm'>
                  <Progress
                    value={progress}
                    size='sm'
                    color='blue'
                    className='w-full'
                  />
                </div>
              )}

              {showDelete && (
                <button
                  onClick={e => {
                    e.preventDefault();
                    onFileDelete();
                  }}
                  className='absolute top-2 right-2 group p-1.5 rounded-md hover:bg-error-500 bg-brand-25 border border-slate-100 h-fit'
                  aria-label='delete'
                >
                  <LuTrash2
                    size={18}
                    className='shrink-0 text-red-500 group-hover:text-white'
                  />
                </button>
              )}
            </>
          )}
        </hgroup>
      )}
    </div>
  );
};

const IconFile = () => {
  return (
    <svg
      className='min-w-[24px]'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M20.0625 10.5H13.5C12.9033 10.5 12.331 10.2629 11.909 9.84099C11.4871 9.41903 11.25 8.84674 11.25 8.25V1.6875C11.25 1.63777 11.2302 1.59008 11.1951 1.55492C11.1599 1.51975 11.1122 1.5 11.0625 1.5H6.75C5.95435 1.5 5.19129 1.81607 4.62868 2.37868C4.06607 2.94129 3.75 3.70435 3.75 4.5V19.5C3.75 20.2956 4.06607 21.0587 4.62868 21.6213C5.19129 22.1839 5.95435 22.5 6.75 22.5H17.25C18.0456 22.5 18.8087 22.1839 19.3713 21.6213C19.9339 21.0587 20.25 20.2956 20.25 19.5V10.6875C20.25 10.6378 20.2302 10.5901 20.1951 10.5549C20.1599 10.5198 20.1122 10.5 20.0625 10.5Z'
        fill='#101828'
      />
      <path
        d='M19.6509 8.84013L12.9098 2.09904C12.8967 2.08601 12.8801 2.07714 12.8619 2.07356C12.8438 2.06997 12.825 2.07183 12.8079 2.07889C12.7908 2.08595 12.7762 2.09791 12.7659 2.11326C12.7556 2.1286 12.7501 2.14665 12.75 2.16513V8.24998C12.75 8.44889 12.829 8.63966 12.9697 8.78031C13.1103 8.92096 13.3011 8.99998 13.5 8.99998H19.5848C19.6033 8.9999 19.6214 8.99436 19.6367 8.98405C19.6521 8.97375 19.664 8.95913 19.6711 8.94205C19.6781 8.92497 19.68 8.90618 19.6764 8.88805C19.6728 8.86991 19.664 8.85324 19.6509 8.84013Z'
        fill='#101828'
      />
    </svg>
  );
};

export default FileItem;
