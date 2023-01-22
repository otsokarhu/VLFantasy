import React from 'react';
import { Box, ChakraProvider } from '@chakra-ui/react';
import customTheme from './themes';
import NavigationBar from './components/navigationbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import TeamPage from './components/teamPage';

const App = () => {
  return (
    <ChakraProvider theme={customTheme}>
      <Router>
        <Box
          pos="relative"
          h="100vh"
          bgImg="url(VLfantasyBG.jpg)"
          bgSize={'cover'}
        >
          <NavigationBar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/teamPage" element={<TeamPage />} />
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  );
};

export default App;
