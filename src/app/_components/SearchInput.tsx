import { cn } from '@/lib/utils';
import { Input } from '@mantine/core';
import { LuSearch } from 'react-icons/lu';
import classes from '@/app/styles/input.module.css';

export function SearchInput({
  className,
  placeholder = 'Search',
  rightSection,
  defaultValue,
  onChange,
}: {
  className?: string;
  placeholder?: string;
  rightSection?: React.ReactNode;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <Input
      className={cn('lg:min-w-[290px] ', className)}
      classNames={classes}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={onChange}
      styles={{
        input: {
          backgroundColor: 'var(--color-gray-50)',
          borderColor: 'var(--color-gray-100)',
          '&:focus-within': {
            outline: '2px solid var(--color-brand-500)',
            borderColor: 'var(--color-gray-500)',
          },
        },
      }}
      type='search'
      leftSection={
        <LuSearch
          size={20}
          className='shrink-0 ml-1'
        />
      }
      rightSection={rightSection}
    />
  );
}
