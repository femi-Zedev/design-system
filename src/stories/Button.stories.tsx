import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@mantine/core';
import { withMantine } from '../../.storybook/decorators';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: [],
  argTypes: {
    color: {
      control: 'select',
      options: ['blue', 'red', 'green', 'yellow', 'gray'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: 'select',
      options: ['filled', 'outline', 'light', 'white', 'default', 'subtle'],
    },
  },
  decorators: [withMantine],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Button',
    color: 'blue',
    size: 'md',
    variant: 'filled',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Button',
    color: 'gray',
    size: 'md',
    variant: 'outline',
  },
};

export const Small: Story = {
  args: {
    children: 'Button',
    size: 'xs',
  },
};

export const Large: Story = {
  args: {
    children: 'Button',
    size: 'xl',
  },
};
