/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbItem,
  Flex,
  Center,
  Icon,
  useColorMode,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';
import { ChevronRightIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { HomeRounded } from '@mui/icons-material';
import { Route, Link, Routes } from 'react-router-dom';
import Loginform from './Login';
import Signup from './SignUpForm';
import { useState } from 'react';
import { atom, useRecoilState } from 'recoil';
import axios from 'axios';
import { apiBaseUrl } from '../constants';


const NavigationBar = () => {
 

  const [user, setUser] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  interface LoginFormValues {
    username: string;
    password: string;
  }
  interface LoginResponse {
    token: string;
    username: string;
    name: string;
  }

  const handleLogin = async (values: LoginFormValues) => {
    console.log('tekeeks tää vittu mitään');
    try { 
      const user = await axios.post<LoginResponse>(
        `${apiBaseUrl}/login`,
        values
      );
      setUser(user.data.username);
      console.log(user);
      console.log(user.data.username);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };


  const { colorMode, toggleColorMode } = useColorMode();



  return (
    <Flex
      pos="sticky"
      top={0}
      w="100%"
      h="50px"
      bgColor={useColorModeValue('whitesmoke', 'dimgray')}
      opacity={0.9}
      rounded="lg"
    >
      <Center w="100%">
        <Breadcrumb
          fontSize={25}
          spacing="8px"
          separator={<ChevronRightIcon color="gray.500" />}
        >
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} href="/" to="/">
              <Button>
                <Icon as={HomeRounded} boxSize={31} />
              </Button>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href="#">Tietoja</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink as={Link} href="/signup" to="/signup">
              Rekisteröidy
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} href="/login" to="/login">
              Kirjaudu
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Center>
      <Center w="3%">
        <Button onClick={toggleColorMode}>
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Center>
      <Routes>
        <Route path="/login" element={<Loginform onSubmit={handleLogin}/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={''} />
      </Routes>
    </Flex>
  );
};

export default NavigationBar;


