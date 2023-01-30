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
import { useRecoilState, useResetRecoilState } from 'recoil';
import { userState } from '../state/user';
import { teamState } from '../state/fantasyTeam';

const NavigationBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [user] = useRecoilState(userState);

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedVLUser');
    window.localStorage.removeItem('loggedFantasyTeam');
    useResetRecoilState(userState);
    useResetRecoilState(teamState);
  };

  if (user.id !== '') {
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
                Kirjaudu ulos
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
              <BreadcrumbLink as={Link} href="/signup" to="/signup">
                Rekisteröidy
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} href="/login" to="/login">
                Kirjaudu sisään
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
