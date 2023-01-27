import React, { useState, useEffect } from 'react';
import { RecoilRoot, atom, useRecoilState } from 'recoil';
import { Box, ChakraProvider } from '@chakra-ui/react';
import customTheme from './themes';
import NavigationBar from './components/NavigationBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import TeamPage from './components/TeamPage';
import { getAllUsers } from './services/userService';
import { login } from './services/login';

const App = () => {
  const userState = atom({
    key: 'userState',
    default: '',
  });

  const { users, isError } = getAllUsers();
  const [user, setUser] = useRecoilState(userState);

  interface LoginFormValues {
    username: string;
    password: string;
  }
  let token;

  const setToken = (newToken: string) => {
    token = `bearer ${newToken}`;
  };

  type UserFromLocalStorage = {
    username: string;
    token: string;
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedVLUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON) as UserFromLocalStorage;
      setUser(user.username);
      setToken(user.token);
    }
  }, []);

  const handleLogin = async (values: LoginFormValues): Promise<void> => {
    console.log('logging in with', values);
    try {
      const loggingIn = await login(values.username, values.password);
      window.localStorage.setItem('loggedVLUser', JSON.stringify(loggingIn));
      setUser(loggingIn.username);
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
            <Route path="/signup" element={''} />
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  );
};

export default App;
