import { Button, ButtonProps, ButtonVariant, Menu } from '@mantine/core';
import React from 'react';
import { IoChevronDown } from 'react-icons/io5';

type DropdownItem = {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
};

export default function DropdownButton({
  data,
  buttonVariant = 'filled',
  label,
  onSelect,
  width,
}: {
  data: string[] | DropdownItem[];
  buttonVariant: ButtonVariant;
  label: string;
  width?: number;
  onSelect: (value: string) => void;
}) {
  const isLabeledData = (items: string[] | DropdownItem[]): items is DropdownItem[] =>
    typeof items[0] === 'object' && 'label' in items[0];

  return (
    <Menu
      shadow='md'
      width={width}
      radius='md'
    >
      <Menu.Target>
        <Button
          rightSection={<IoChevronDown size={18} />}
          variant={buttonVariant}
          size='sm'
        >
          {label}
        </Button>
      </Menu.Target>

      <Menu.Dropdown py={2}>
        {isLabeledData(data)
          ? data.map(item => (
              <Menu.Item
                className='text-sm font-medium !text-slate-600 !my-1.5'
                key={item.value}
                onClick={() => onSelect(item.value)}
                leftSection={item.icon}
                disabled={item.disabled}
              >
                {item.label}
              </Menu.Item>
            ))
          : data.map(item => (
              <Menu.Item
                className='text-sm font-medium !text-slate-600 !my-1.5'
                key={item}
                onClick={() => onSelect(item)}
              >
                {item}
              </Menu.Item>
            ))}
      </Menu.Dropdown>
    </Menu>
  );
}
