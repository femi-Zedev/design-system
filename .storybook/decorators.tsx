import React from 'react';
import { MantineProvider, createTheme } from '@mantine/core';

// Create a theme with your design system's configuration
const theme = createTheme({
  // You can customize your theme here
  primaryColor: 'blue',
  defaultRadius: 'md',
});

// Decorator to wrap all stories with MantineProvider
export const withMantine = (Story: React.ComponentType) => (
  <MantineProvider defaultColorScheme="light" theme={theme}>
    <Story />
  </MantineProvider>
);
