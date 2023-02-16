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
} from '@chakra-ui/react';
import { Link as RouterLink, Route, Routes } from 'react-router-dom';
import TeamPage from '../TeamPage';
import { userState } from '../../state/user';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { navBarState } from '../../state/navBar';

const CreateTeamCard = () => {
  const boxBg = useColorModeValue('whitesmoke', 'dimgray');
  const buttonBg = useColorModeValue('green.400', 'blue.900');
  const hoverBg = useColorModeValue('green.500', 'blue.800');
  const user = useRecoilValue(userState);
  const setNavBar = useSetRecoilState(navBarState);
  const toast = useToast();

  const content = () => {
    if (user.fantasyTeam !== '') {
      return {
        title: 'Tee muutoksia joukkueeseesi!',
        button: 'Muokkaa joukkuetta',
      };
    } else {
      return {
        title: 'Luo oma VL-Fantasy-joukkueesi!',
        button: 'Luo joukkue',
      };
    }
  };

  const hanleNotLoggedIn = () => {
    toast({
      title: 'Kirjaudu sisään',
      description: 'Kirjaudu sisään päästäksesi joukkue-sivulle',
      status: 'info',
      duration: 5000,
      isClosable: true,
      position: 'top',
    });
    setNavBar('login');
  };

  return (
    <Center py={12}>
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        bg={boxBg}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
      >
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'230px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `createTeam.jpg`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}
        >
          <Image
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'cover'}
            src={'createTeam.jpg'}
          />
        </Box>
        <Stack pt={10} align={'center'}>
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
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
