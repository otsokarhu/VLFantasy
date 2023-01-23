import React from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { Box, ChakraProvider } from '@chakra-ui/react';
import customTheme from './themes';
import NavigationBar from './components/navigationbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import TeamPage from './components/teamPage';
import { getAllUsers } from './services/userService';




const App = () => {

  const { users, isError } = getAllUsers();
  
  
  

  return (
    <RecoilRoot>
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
    </RecoilRoot>
  );
};

export default App;
