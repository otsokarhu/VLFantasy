import { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';
import { Box } from '@chakra-ui/react';
import NavigationBar from './components/NavigationBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import TeamPage from './components/TeamPage';
import { getAllUsers, createUser } from './services/userService';
import { login } from './services/login';
import {
  LoginFormValues,
  RegisterFormValues,
  UserFromLocalStorage,
} from './types';

const App = () => {
  const userState = atom({
    key: 'userState',
    default: '',
  });

  const { users, isError } = getAllUsers();
  const [user, setUser] = useRecoilState(userState);

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

  const handleRegister = async (values: RegisterFormValues): Promise<void> => {
    console.log('registering with', values);
    try {
      await createUser(
        values.username,
        values.firstName,
        values.lastName,
        values.email,
        values.password
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Router>
      <Box
        pos="relative"
        h="100vh"
        bgImg="url(VLfantasyBG.jpg)"
        bgSize={'cover'}
      >
        <NavigationBar
          onLoginSubmit={handleLogin}
          onSignupSubmit={handleRegister}
        />

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
