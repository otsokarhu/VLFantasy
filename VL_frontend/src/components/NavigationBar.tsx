import {
  Breadcrumb,
  BreadcrumbItem,
  Flex,
  Center,
  useColorMode,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';
import { ChevronRightIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { handleLogOut } from '../utils/utils';
import { useRecoilValue } from 'recoil';
import { userState } from '../state/user';

import {
  NavBarHome,
  NavBarInfo,
  NavBarLogOut,
  NavBarLogin,
  NavBarSignUp,
  NavBarRoutes,
} from './NavBarComponents';

const NavigationBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userState);
  const bg = useColorModeValue('whitesmoke', 'dimgray');

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
              <NavBarInfo />
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
              <NavBarInfo />
            </BreadcrumbItem>

            <BreadcrumbItem>
              <NavBarSignUp />
            </BreadcrumbItem>

            <BreadcrumbItem>
              <NavBarLogin />
            </BreadcrumbItem>
          </Breadcrumb>
        )}
      </Center>
      <Center w="3%">
        <Button onClick={toggleColorMode} variant={'icon'}>
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Center>
      <NavBarRoutes />
    </Flex>
  );
};

export default NavigationBar;
