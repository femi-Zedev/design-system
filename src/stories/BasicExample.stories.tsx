import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { withMantine } from '../../.storybook/decorators';

// A very simple component with no dependencies
const SimpleCard = ({ title, description }: { title: string; description: string }) => {
  return (
    <div style={{ 
      border: '1px solid #e2e8f0', 
      borderRadius: '8px', 
      padding: '16px',
      maxWidth: '300px' 
    }}>
      <h2 style={{ 
        fontSize: '18px', 
        fontWeight: 'bold',
        marginBottom: '8px' 
      }}>
        {title}
      </h2>
      <p style={{ 
        fontSize: '14px',
        color: '#4a5568' 
      }}>
        {description}
      </p>
    </div>
  );
};

const meta = {
  title: 'Examples/SimpleCard',
  component: SimpleCard,
  parameters: {
    layout: 'centered',
  },
  tags: [], 
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
  },
  decorators: [withMantine],
} satisfies Meta<typeof SimpleCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Simple Card',
    description: 'This is a very simple card component with no external dependencies.',
  },
};
