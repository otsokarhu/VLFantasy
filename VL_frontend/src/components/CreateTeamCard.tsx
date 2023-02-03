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
import TeamPage from './TeamPage';
import { userState } from '../state/user';
import { useRecoilValue } from 'recoil';

const IMAGE =
  'https://img.freepik.com/free-photo/outdoor-team-orienteering-activity_53876-48899.jpg';

const CreateTeamCard = () => {
  const boxBg = useColorModeValue('whitesmoke', 'dimgray');
  const buttonBg = useColorModeValue('green.400', 'blue.900');
  const hoverBg = useColorModeValue('green.500', 'blue.800');
  const user = useRecoilValue(userState);
  const toast = useToast();

  return (
    <Center py={12}>
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg={boxBg}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}
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
            backgroundImage: `url(${IMAGE})`,
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
            src={IMAGE}
          />
        </Box>
        <Stack pt={10} align={'center'}>
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
            Luo oma VL-Fantasy-joukkueesi!
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
                Luo joukkue
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
                onClick={() =>
                  toast({
                    title: 'Kirjaudu sisään',
                    description: 'Kirjaudu sisään luodaksesi joukkueen',
                    status: 'info',
                    duration: 5000,
                    isClosable: true,
                    position: 'top',
                  })
                }
              >
                Luo joukkue
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
