import {
  Box,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  useColorModeValue,
  Flex,
  useColorMode,
  Breadcrumb,
  BreadcrumbItem,
  useToast,
} from '@chakra-ui/react';
import {
  ChevronRightIcon,
  HamburgerIcon,
  MoonIcon,
  SunIcon,
} from '@chakra-ui/icons';
import {
  NavBarHome,
  NavBarElementMobile,
  NavBarLogOutMobile,
} from './components';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { navBarState } from '../../state/navBar';
import { userState } from '../../state/user';
import { teamState } from '../../state/fantasyTeam';
import { allRunnersState } from '../../state/runners';

const NavigationBarMobile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useRecoilValue(userState);
  const { colorMode, toggleColorMode } = useColorMode();
  const [navBar, setNavBar] = useRecoilState(navBarState);
  const toast = useToast();
  const bg = useColorModeValue('whitesmoke', 'dimgray');
  const resetUser = useResetRecoilState(userState);
  const resetTeam = useResetRecoilState(teamState);
  const resetRunner = useResetRecoilState(allRunnersState);

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedVLUser');
    window.localStorage.removeItem('loggedFantasyTeam');
    resetUser();
    resetTeam();
    resetRunner();
    onClose();
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
      onClose();
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
      justifyContent={'center'}
    >
      <Breadcrumb
        spacing={'8px'}
        separator={<ChevronRightIcon color={'gray.500'} />}
      >
        <BreadcrumbItem>
          <Button
            variant={'icon'}
            p={0}
            onClick={onOpen}
            size={'lg'}
            aria-label="Open Menu"
          >
            <HamburgerIcon />
          </Button>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <NavBarHome />
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Button
            aria-label={'DarkMode-Button'}
            onClick={toggleColorMode}
            variant={'icon'}
            size={'lg'}
          >
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
        </BreadcrumbItem>
      </Breadcrumb>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent opacity={0.95}>
          <DrawerCloseButton />
          {user.id !== '' ? (
            <Box p="4" bg={bg} h={'100vh'}>
              <NavBarElementMobile
                handleToClick={handleToClick}
                text={'Tietoa'}
                to={'info'}
              />
              <NavBarElementMobile
                handleToClick={handleToClick}
                text={'Pisteytys'}
                to={'scoring'}
              />
              <NavBarElementMobile
                handleToClick={handleToClick}
                text={'Ranki'}
                to={'leaderboard'}
              />
              <NavBarLogOutMobile handleLogOut={handleLogOut} />
            </Box>
          ) : (
            <Box p="4" bg={bg} h={'100vh'}>
              <NavBarElementMobile
                handleToClick={handleToClick}
                text={'Tietoa'}
                to={'info'}
              />
              <NavBarElementMobile
                handleToClick={handleToClick}
                text={'Pisteytys'}
                to={'scoring'}
              />
              <NavBarElementMobile
                handleToClick={handleToClick}
                text={'Ranki'}
                to={'leaderboard'}
              />
              <NavBarElementMobile
                handleToClick={handleToClick}
                text={'Kirjaudu'}
                to={'login'}
              />
              <NavBarElementMobile
                handleToClick={handleToClick}
                text={'Rekisteröidy'}
                to={'signup'}
              />
            </Box>
          )}
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default NavigationBarMobile;
