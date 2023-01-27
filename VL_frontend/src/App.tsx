import { useEffect } from 'react';
import { atom, useSetRecoilState } from 'recoil';
import { Box } from '@chakra-ui/react';
import NavigationBar from './components/NavigationBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import TeamPage from './components/TeamPage';
import { getAllUsers } from './services/userService';

import { UserFromLocalStorage } from './types';

export const userState = atom({
  key: 'userState',
  default: '',
});
const App = () => {
  const { users, isError } = getAllUsers();
  const setUser = useSetRecoilState(userState);

  let token;

  const setToken = (newToken: string) => {
    token = `bearer ${newToken}`;
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedVLUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON) as UserFromLocalStorage;
      setUser(user.username);
      setToken(user.token);
    }
  }, []);

  return (
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
          <Route path="/login" element={''} />
          <Route path="/signup" element={''} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;
