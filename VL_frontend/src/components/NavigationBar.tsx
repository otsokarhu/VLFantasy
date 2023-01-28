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
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userState } from '../state/user';
import { useEffect } from 'react';
import { UserFromLocalStorage } from '../types';
import { setToken } from '../services/userService';
import { teamState } from '../state/fantasyTeam';

const NavigationBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [user, setUser] = useRecoilState(userState);
  const setTeam = useSetRecoilState(teamState);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedVLUser');
    if (loggedUserJSON) {
      const localStorageUser = JSON.parse(
        loggedUserJSON
      ) as UserFromLocalStorage;
      setToken(localStorageUser.token);
    }
  }, []);

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedVLUser');
    setUser('');
    setTeam({
      teamName: '',
      runners: [],
      points: 0,
    });
  };

  if (user === '') {
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
          <Route path="/login" element={<Loginform />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={''} />
        </Routes>
      </Flex>
    );
  } else {
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
              <BreadcrumbLink onClick={handleLogOut} as={Link} href="/" to="/">
                Kirjaudu Ulos
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
          <Route path="/login" element={<Loginform />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={''} />
        </Routes>
      </Flex>
    );
  }
};

export default NavigationBar;
