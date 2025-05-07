import type { Preview } from "@storybook/react";
import React from 'react';
import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import '../src/app/globals.css'; // Import your global styles

// Create a theme with your design system's configuration
const theme = createTheme({
  // You can customize your theme here
  primaryColor: 'blue',
  defaultRadius: 'md',
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <MantineProvider defaultColorScheme="light" theme={theme}>
        <div className="p-6">
          <Story />
        </div>
      </MantineProvider>
    ),
  ],
};

export default preview;
