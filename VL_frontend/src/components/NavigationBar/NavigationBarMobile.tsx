import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  useColorModeValue,
  Flex,
  useColorMode,
  useToast,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  MoonIcon,
  SunIcon,
  ArrowLeftIcon,
} from '@chakra-ui/icons';
import {
  NavBarElementMobile,
  NavBarLogOutMobile,
  NavBarHomeMobile,
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
      pos="absolute"
      top={0}
      w={'100%'}
      h={'8%'}
      bgColor={bg}
      opacity={0.9}
      zIndex={1}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <Button
        variant={'icon'}
        p={0}
        onClick={onOpen}
        size={'lg'}
        aria-label="Open Menu"
      >
        <HamburgerIcon boxSize={'60px'} />
      </Button>

      <NavBarHomeMobile />

      <Button
        aria-label={'DarkMode-Button'}
        onClick={toggleColorMode}
        variant={'icon'}
        size={'lg'}
      >
        {colorMode === 'light' ? (
          <MoonIcon boxSize={'60px'} />
        ) : (
          <SunIcon boxSize={'60px'} />
        )}
      </Button>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent opacity={0.95}>
          <Flex
            bg={bg}
            h={'100vh'}
            w={'20vh'}
            flexDir={'column'}
            justifyContent={'center'}
            flexWrap={'wrap'}
          >
            {user.id !== '' ? (
              <>
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
              </>
            ) : (
              <>
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
              </>
            )}
            <Button variant={'icon'} onClick={onClose} p={20}>
              <ArrowLeftIcon boxSize={'60px'} />
            </Button>
          </Flex>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default NavigationBarMobile;
