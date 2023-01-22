import React from 'react';
import { Box, ChakraProvider, useColorModeValue } from '@chakra-ui/react';
import customTheme from './themes';
import NavigationBar from './components/navigationbar';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  return (
    <ChakraProvider theme={customTheme}>
      <Router>
        <Box
          pos="relative"
          h="100vh"
          bg={useColorModeValue(
            'rgba(43, 44, 30, 0,01)',
            'rgba(43, 44, 30, 1)'
          )}
          bgImg="url(VLfantasyBG.jpg)"
          bgSize={'cover'}
        >
          <NavigationBar />
        </Box>
      </Router>
    </ChakraProvider>
  );
};

export default App;
