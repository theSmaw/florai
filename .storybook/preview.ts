import type { Preview } from 'storybook';
import React from 'react';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

export const decorators = [
  (Story: any) =>
    React.createElement(
      Theme,
      { appearance: 'inherit', accentColor: 'jade', grayColor: 'slate', radius: 'large' },
      React.createElement(Story)
    ),
];

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
