import { Heading, Box, Center, useColorModeValue } from '@chakra-ui/react';
import RunnerPage from './RunnerPage';
import { useRecoilState } from 'recoil';
import { userState } from '../state/user';
import { teamState } from '../state/fantasyTeam';

const TeamPage = () => {
  const [user] = useRecoilState(userState);
  const [team, setTeam] = useRecoilState(teamState);
  console.log('user', user);

  if (!user) {
    return (
      <Center p={2} h="90vh">
        <Box
          maxW={'270px'}
          w={'270px'}
          bg={useColorModeValue('whitesmoke', 'dimgray')}
          boxShadow={'2xl'}
          rounded={'lg'}
          overflow={'hidden'}
          h={'270px'}
          alignContent={'center'}
          p={2}
          opacity={0.8}
        >
          <Heading
            alignContent={'center'}
            color={useColorModeValue('gray.500', 'whitesmoke')}
          >
            Kirjaudu sisään valitaksesi joukkueesi!
          </Heading>
        </Box>
      </Center>
    );
  }
  if (user && !team) {
    return (
      <Center p={2} h="90vh">
        <Box
          maxW={'270px'}
          w={'270px'}
          bg={useColorModeValue('whitesmoke', 'dimgray')}
          boxShadow={'2xl'}
          rounded={'lg'}
          overflow={'hidden'}
          h={'270px'}
          alignContent={'center'}
          p={2}
          opacity={0.8}
        >
          <Heading
            alignContent={'center'}
            color={useColorModeValue('gray.500', 'whitesmoke')}
          >
            luo joukkueesi!
          </Heading>
        </Box>
      </Center>
    );
  } else
    return (
      <Box alignContent={'center'}>
        <Center p={2}>
          <Box
            p={2}
            rounded={'md'}
            bg={useColorModeValue('whitesmoke', 'dimgray')}
          >
            <Heading color={useColorModeValue('gray.500', 'whitesmoke')}>
              Valitse joukkuuesi!
            </Heading>
          </Box>
        </Center>

        <RunnerPage />
        <Center p={2}>
          <Box
            p={2}
            rounded={'md'}
            bg={useColorModeValue('whitesmoke', 'dimgray')}
          >
            <Heading color={useColorModeValue('gray.500', 'whitesmoke')}>
              Joukkuuesi:
            </Heading>
          </Box>
        </Center>
      </Box>
    );
};

export default TeamPage;
