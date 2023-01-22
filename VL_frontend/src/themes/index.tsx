import { extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
  fonts: {
    heading:
      'Courier New, Courier, Lucida Sans Typewriter, Lucida Typewriter, monospace',
    body: 'Courier New, Courier, Lucida Sans Typewriter, Lucida Typewriter, monospace',
  },
});

export default customTheme;
