import { cn } from '@/lib/utils';
import React, { createContext, useContext, useState } from 'react';

// Context for Chip Group
const ChipGroupContext = createContext<{
  selected: string[] | null;
  onChange: (value: string) => void;
  multiple: boolean;
} | null>(null);

type ChipGroupProps = {
  children: React.ReactNode;
  multiple?: boolean;
  value?: string[];
  onChange?: (selected: string[]) => void;
};

const ChipGroup: React.FC<ChipGroupProps> = ({ children, multiple = false, value = [], onChange }) => {
  const [selected, setSelected] = useState<string[]>(value);

  const handleChange = (chipValue: string) => {
    let newSelected;
    if (multiple) {
      newSelected = selected.includes(chipValue)
        ? selected.filter((v) => v !== chipValue)
        : [...selected, chipValue];
    } else {
      newSelected = selected.includes(chipValue) ? [] : [chipValue];
    }
    setSelected(newSelected);
    onChange?.(newSelected);
  };

  return (
    <ChipGroupContext.Provider
      value={{
        selected,
        onChange: handleChange,
        multiple,
      }}
    >
      <div className="flex flex-wrap gap-2">{children}</div>
    </ChipGroupContext.Provider>
  );
};

type ChipProps = {
  value: string;
  className?: string;
  leftSection?: React.ReactNode;
  children: React.ReactNode;
  selected?: boolean; // Optional for standalone usage
  onClick?: (value: string) => void; // Optional for standalone usage
  size?: 'xs' | 'sm' | 'md' | 'lg';
};

const sizeClasses = {
  xs: 'px-1.5 py-0.5 text-xs',
  sm: 'px-2 py-0.5 text-sm',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base'
};

const Chip: React.FC<ChipProps> = ({ 
  value, 
  leftSection, 
  className, 
  children, 
  selected, 
  onClick,
  size = 'md' 
}) => {
  const context = useContext(ChipGroupContext);

  const isSelected = context
    ? context.selected?.includes(value)
    : selected; // Use context or fallback to prop
  const handleClick = () => {
    if (context) {
      context.onChange(value); // Handle via ChipGroup
    } else if (onClick) {
      onClick(value); // Handle standalone
    }
  };

  return (
    <button
      className={cn(
        "flex items-center gap-1.5 rounded-sm transition focus:outline-none",
        sizeClasses[size],
        className, 
        isSelected
          ? 'text-brand-500 border-brand-500'
          : 'bg-white text-slate-700 border-slate-200 hover:bg-gray-100',
        'border'
      )}
      onClick={handleClick}
    >
      {leftSection}
      {children}
    </button>
  );
};

export { ChipGroup, Chip };