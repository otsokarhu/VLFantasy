import {
  Breadcrumb,
  BreadcrumbItem,
  Flex,
  Center,
  useColorMode,
  useColorModeValue,
  Button,
  useToast,
} from '@chakra-ui/react';
import { ChevronRightIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { userState } from '../../state/user';
import { NavBarHome, NavBarLogOut, NavBarElement } from './components';
import { teamState } from '../../state/fantasyTeam';
import { allRunnersState } from '../../state/runners';
import { navBarState } from '../../state/navBar';

const NavigationBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userState);
  const toast = useToast();
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
    toast({
      title: 'Uloskirjautuminen onnistui',
      description: 'Nähdään taas pian!',
      status: 'info',
      duration: 3000,
      position: 'top',
      isClosable: true,
    });
  };

  const handleToClick = (prop: string) => {
    if (navBar === prop) {
      setNavBar('default');
    } else {
      setNavBar(prop);
    }
  };

  return (
    <Flex
      pos="sticky"
      top={0}
      w={'100%'}
      h={'50px'}
      bgColor={bg}
      opacity={0.9}
      zIndex={1}
    >
      <Center w={'100%'}>
        {user.id !== '' ? (
          <Breadcrumb
            fontSize={25}
            spacing={'8px'}
            separator={<ChevronRightIcon color={'gray.500'} />}
          >
            <BreadcrumbItem>
              <NavBarHome />
            </BreadcrumbItem>

            <BreadcrumbItem>
              <NavBarElement
                handleToClick={handleToClick}
                to={'info'}
                text={'Tietoja'}
              />
            </BreadcrumbItem>

            <BreadcrumbItem>
              <NavBarElement
                handleToClick={handleToClick}
                to={'scoring'}
                text={'Pisteytys'}
              />
            </BreadcrumbItem>

            <BreadcrumbItem>
              <NavBarElement
                handleToClick={handleToClick}
                to={'leaderboard'}
                text={'Ranki'}
              />
            </BreadcrumbItem>

            <BreadcrumbItem>
              <NavBarLogOut handleLogOut={handleLogOut} />
            </BreadcrumbItem>
          </Breadcrumb>
        ) : (
          <Breadcrumb
            fontSize={25}
            spacing={'8px'}
            separator={<ChevronRightIcon color={'gray.500'} />}
          >
            <BreadcrumbItem>
              <NavBarHome />
            </BreadcrumbItem>

            <BreadcrumbItem>
              <NavBarElement
                handleToClick={handleToClick}
                to={'info'}
                text={'Tietoja'}
              />
            </BreadcrumbItem>

            <BreadcrumbItem>
              <NavBarElement
                handleToClick={handleToClick}
                to={'scoring'}
                text={'Pisteytys'}
              />
            </BreadcrumbItem>

            <BreadcrumbItem>
              <NavBarElement
                handleToClick={handleToClick}
                to={'leaderboard'}
                text={'Ranki'}
              />
            </BreadcrumbItem>

            <BreadcrumbItem>
              <NavBarElement
                handleToClick={handleToClick}
                to={'signup'}
                text={'Rekisteröidy'}
              />
            </BreadcrumbItem>

            <BreadcrumbItem>
              <NavBarElement
                handleToClick={handleToClick}
                to={'login'}
                text={'Kirjaudu'}
              />
            </BreadcrumbItem>
          </Breadcrumb>
        )}
      </Center>
      <Center w={'3%'}>
        <Button
          aria-label={'DarkMode-Button'}
          onClick={toggleColorMode}
          variant={'icon'}
        >
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Center>
    </Flex>
  );
};

export default NavigationBar;
