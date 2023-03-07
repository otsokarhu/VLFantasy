import { extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
  fonts: {
    heading:
      'Courier New, Courier, Lucida Sans Typewriter, Lucida Typewriter, monospace',
    body: 'Courier New, Courier, Lucida Sans Typewriter, Lucida Typewriter, monospace',
  },
  components: {
    Button: {
      baseStyle: {
        w: 'full',
        mt: 8,

        rounded: 'md',
        _hover: {
          transform: 'translateY(-2px)',
          boxShadow: 'lg',
        },
      },
      variants: {
        icon: {
          mt: 0,
        },
        outline: {
          mt: 0,
        },
        ghost: {
          mt: 6,
        },
      },
    },
  },
});

export default customTheme;
