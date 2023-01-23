import { Heading, Box, Center, useColorModeValue } from '@chakra-ui/react';
import RunnerPage from './runnerpage';


const TeamPage = () => {
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
