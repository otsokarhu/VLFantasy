import React, { useState } from 'react';
import {
  RecoilRoot,
  } from 'recoil';
import { Box, ChakraProvider } from '@chakra-ui/react';
import customTheme from './themes';
import NavigationBar from './components/NavigationBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import TeamPage from './components/TeamPage';
import { getAllUsers } from './services/userService';
import Loginform from './components/Login';
import { login } from './services/login';





const App = () => {

  const { users, isError } = getAllUsers();
  const [user, setUser] = useState('');

  
  interface LoginFormValues {
    username: string;
    password: string;
  }

  const handleLogin = async (values: LoginFormValues): Promise<void> => {
    console.log('logging in with', values);
    try {
      const loggingIn = await login(values.username, values.password);
      console.log(loggingIn);
      setUser(loggingIn.username);
    } catch (error) {
      console.log(error);
    }
  };

  

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
          <NavigationBar onSubmit={handleLogin} />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/teamPage" element={<TeamPage />} />
            <Route path="/login" element={''} />
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
    </RecoilRoot>
  );
};

export default App;
