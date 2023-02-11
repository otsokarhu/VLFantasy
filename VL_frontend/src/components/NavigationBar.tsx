import {
  Breadcrumb,
  BreadcrumbItem,
  Flex,
  Center,
  useColorMode,
  useColorModeValue,
  Button,
  BreadcrumbLink,
} from '@chakra-ui/react';
import { ChevronRightIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { userState } from '../state/user';
import InfoPage from './InfoPage';
import Loginform from './Login';
import Signup from './SignUpForm';

import { NavBarHome, NavBarLogOut } from './NavBarComponents';
import { teamState } from '../state/fantasyTeam';
import { allRunnersState } from '../state/runners';
import { navBarState } from '../state/navBar';

const NavigationBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userState);
  const bg = useColorModeValue('whitesmoke', 'dimgray');
  const resetUser = useResetRecoilState(userState);
  const resetTeam = useResetRecoilState(teamState);
  const resetRunner = useResetRecoilState(allRunnersState);
  const [navBar, setNavBar] = useRecoilState(navBarState);

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedVLUser');
    window.localStorage.removeItem('loggedFantasyTeam');
    resetUser();
    resetTeam();
    resetRunner();
  };

  const handleInfo = () => {
    setNavBar('info');
  };

  const handleToLogin = () => {
    setNavBar('login');
  };

  const handleToSignUp = () => {
    setNavBar('signup');
  };

  const navBarContent = () => {
    if (navBar === 'default') {
      return '';
    } else if (navBar === 'info') {
      return <InfoPage />;
    } else if (navBar === 'login') {
      return <Loginform />;
    } else if (navBar === 'signup') {
      return <Signup />;
    }
  };

  return (
    <Flex
      pos="sticky"
      top={0}
      w="100%"
      h="50px"
      bgColor={bg}
      opacity={0.9}
      roundedBottom="lg"
      zIndex={1}
    >
      <Center w="100%">
        {user.id !== '' ? (
          <Breadcrumb
            fontSize={25}
            spacing="8px"
            separator={<ChevronRightIcon color="gray.500" />}
          >
            <BreadcrumbItem>
              <NavBarHome />
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink onClick={handleInfo}>Tietoja</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <NavBarLogOut handleLogOut={handleLogOut} />
            </BreadcrumbItem>
          </Breadcrumb>
        ) : (
          <Breadcrumb
            fontSize={25}
            spacing="8px"
            separator={<ChevronRightIcon color="gray.500" />}
          >
            <BreadcrumbItem>
              <NavBarHome />
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink onClick={handleInfo}>Tietoja</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink onClick={handleToSignUp}>
                Rekisteröidy
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink onClick={handleToLogin}>
                Kirjaudu sisään
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        )}
      </Center>
      <Center w="3%">
        <Button
          aria-label="DarkMode-Button"
          onClick={toggleColorMode}
          variant={'icon'}
        >
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Center>
      {navBarContent()}
    </Flex>
  );
};

export default NavigationBar;
