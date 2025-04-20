import type { Meta, StoryObj } from '@storybook/react';
import { Chip, ChipGroup } from './chip';
import { useState } from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'UI/Chip',
  component: Chip,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Size of the chip',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    value: {
      control: 'text',
      description: 'Value of the chip (used for selection)',
    },
    selected: {
      control: 'boolean',
      description: 'Whether the chip is selected (when used standalone)',
    },
    leftSection: {
      control: { disable: true },
      description: 'Optional element to display before the chip content',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    onClick: {
      action: 'clicked',
      description: 'Function called when the chip is clicked (when used standalone)',
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    value: 'chip',
    children: 'Default Chip',
    size: 'md',
  },
};

export const Selected: Story = {
  args: {
    value: 'chip',
    children: 'Selected Chip',
    selected: true,
    size: 'md',
  },
};

export const WithLeftSection: Story = {
  args: {
    value: 'chip',
    children: 'Chip with Icon',
    leftSection: <span className="w-3 h-3 rounded-full bg-brand-500"></span>,
    size: 'md',
  },
};

export const Sizes = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Chip value="xs" size="xs">Extra Small</Chip>
      <Chip value="sm" size="sm">Small</Chip>
      <Chip value="md" size="md">Medium</Chip>
      <Chip value="lg" size="lg">Large</Chip>
    </div>
  ),
};

// ChipGroup stories
export const ChipGroupSingle = () => {
  const [value, setValue] = useState<string[]>(['react']);
  
  return (
    <div className="p-4">
      <h3 className="text-sm font-medium mb-2">Select one framework:</h3>
      <ChipGroup value={value} onChange={setValue}>
        <Chip value="react">React</Chip>
        <Chip value="vue">Vue</Chip>
        <Chip value="angular">Angular</Chip>
        <Chip value="svelte">Svelte</Chip>
      </ChipGroup>
      <div className="mt-4 text-sm">
        Selected: {value.join(', ') || 'None'}
      </div>
    </div>
  );
};

export const ChipGroupMultiple = () => {
  const [value, setValue] = useState<string[]>(['typescript', 'react']);
  
  return (
    <div className="p-4">
      <h3 className="text-sm font-medium mb-2">Select technologies:</h3>
      <ChipGroup multiple value={value} onChange={setValue}>
        <Chip value="javascript">JavaScript</Chip>
        <Chip value="typescript">TypeScript</Chip>
        <Chip value="react">React</Chip>
        <Chip value="nextjs">Next.js</Chip>
        <Chip value="tailwind">Tailwind CSS</Chip>
      </ChipGroup>
      <div className="mt-4 text-sm">
        Selected: {value.join(', ') || 'None'}
      </div>
    </div>
  );
};
