import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Button,
  Stack,
  Image,
  Link,
  useToast,
  useMediaQuery,
} from '@chakra-ui/react';
import { Link as RouterLink, Route, Routes } from 'react-router-dom';
import TeamPage from '../TeamPage';
import { userState } from '../../state/user';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { navBarState } from '../../state/navBar';
import { MobileToast } from '../Miscellaneous/MobileComponents';

const CreateTeamCard = () => {
  const boxBg = useColorModeValue('whitesmoke', 'dimgray');
  const buttonBg = useColorModeValue('green.400', 'blue.900');
  const hoverBg = useColorModeValue('green.500', 'blue.800');
  const user = useRecoilValue(userState);
  const setNavBar = useSetRecoilState(navBarState);
  const toast = useToast();
  const [isDesktop] = useMediaQuery('(min-width: 62em)');

  const content = () => {
    if (user.fantasyTeam !== '') {
      return {
        title: 'Tee muutoksia joukkueeseesi!',
        button: 'Muokkaa joukkuettasi',
      };
    } else {
      return {
        title: 'Luo oma VL-Fantasy-joukkueesi!',
        button: 'Luo joukkue',
      };
    }
  };

  const hanleNotLoggedIn = () => {
    toast(
      isDesktop
        ? {
            title: 'Kirjaudu sisään',
            description: 'Kirjaudu sisään päästäksesi joukkue-sivulle',
            status: 'info',
            duration: 5000,
            isClosable: true,
            position: 'top',
          }
        : {
            position: 'top',
            duration: 3000,
            render: () => (
              <MobileToast
                fontsize="2.4rem"
                status="info"
                text="Kirjaudu sisään päästäksesi joukkue-sivulle"
              />
            ),
          }
    );

    setNavBar('login');
  };

  return (
    <Center py={12}>
      <Box
        role={'group'}
        p={6}
        maxW={isDesktop ? '330px' : '495px'}
        bg={boxBg}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        textAlign={'center'}
      >
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={isDesktop ? '230px' : '345px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `createTeam.webp`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
        >
          <Image
            rounded={'lg'}
            height={isDesktop ? 230 : 345}
            width={isDesktop ? 282 : 423}
            objectFit={'cover'}
            src={'createTeam.webp'}
            boxShadow={'2xl'}
          />
        </Box>
        <Stack pt={10} align={'center'}>
          <Heading
            fontSize={isDesktop ? '1.5rem' : '2.5rem'}
            fontFamily={'body'}
            fontWeight={isDesktop ? 'hairline' : 'bold'}
          >
            {content().title}
          </Heading>
          {user.id !== '' ? (
            <Link as={RouterLink} to="teamPage" href="teamPage">
              <Button
                bg={buttonBg}
                color={'white'}
                _hover={{
                  bg: hoverBg,
                }}
                fontSize={isDesktop ? '1.2rem' : '1.9rem'}
                size={isDesktop ? 'md' : 'lg'}
              >
                {content().button}
              </Button>
            </Link>
          ) : (
            <Link>
              <Button
                bg={buttonBg}
                color={'white'}
                _hover={{
                  bg: hoverBg,
                }}
                onClick={hanleNotLoggedIn}
                fontSize={isDesktop ? '1.2rem' : '1.9rem'}
                size={isDesktop ? 'md' : 'lg'}
              >
                {content().button}
              </Button>
            </Link>
          )}
        </Stack>
      </Box>
      <Routes>
        <Route path="/teamPage" element={<TeamPage />} />
      </Routes>
    </Center>
  );
};

export default CreateTeamCard;
