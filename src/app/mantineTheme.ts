'use client';

import { Button, createTheme } from '@mantine/core';

export const mantineTheme = createTheme({
  cursorType: 'pointer',
  components: {
    Button: Button.extend({
      vars: (theme, props) => {
        if (props.variant === 'filled') {
          return {
            root: {
              border: '2px solid var(--shadow-skeumorphic-inner)',
              boxShadow: 'inset 0px 1px 1px rgba(255, 255, 255, 0.12)',
              backgroundColor: 'var(--color-brand-500)',
            },
          };
        }
        if (props.size === 'xs') {
          return {
            root: {
              '--button-height': '32px',
              borderRadius: 'var(--radius-sm)',
              fontSize: 'var(--font-size-text-sm)',
              fontWeight: 500,
              '--button-padding-x': '10px',
            },
          };
        }
        if (props.size === 'md') {
          return {
            root: {
              '--button-height': '40px',
              fontSize: 'var(--font-size-text-sm)',
              fontWeight: '600',
              '--button-padding-x': '14px',
            },
          };
        }
        return { root: {} };
      },

      defaultProps: {
        styles: {
          root: {
            borderRadius: 'var(--radius-md)',
          },
          section: {
            marginLeft: '4px',
            marginRight: '4px',
          },
        },
      },
    }),
  },
});
