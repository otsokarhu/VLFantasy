import React from 'react';
import { Box, ChakraProvider } from '@chakra-ui/react';
import customTheme from './themes';
import NavigationBar from './components/navigationbar';

const App = () => {
  return (
    <ChakraProvider theme={customTheme}>
      <Box
        pos="relative"
        h="100vh"
        bg="rgba(123, 201, 49, 0.01)"
        _before={{
          content: '""',
          bgImage:
            'url(https://images.unsplash.com/photo-1558978325-ead63dff09cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80)',
          bgSize: 'cover',
          pos: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          opacity: 0.8,
        }}
      >
        <NavigationBar />
      </Box>
    </ChakraProvider>
  );
};

export default App;
