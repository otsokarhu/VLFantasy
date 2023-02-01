import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  addRunnerToTeam,
  removeRunnerFromTeam,
} from '../services/fantasyTeamService';
import { teamState } from '../state/fantasyTeam';
import { allRunnersState } from '../state/runners';
import { tokenState } from '../state/user';
import { RunnerProps } from '../types';

const RunnerCard = (props: RunnerProps) => {
  const {
    team,
    runnerPhoto,
    price,
    runner,
    teamPhoto,
    points,
    id,
    displayDelete,
    blur,
    dbRunners,
  } = props;
  const [teamId, setTeam] = useRecoilState(teamState);
  const token = useRecoilValue(tokenState);
  const setRunners = useSetRecoilState(allRunnersState);

  const handleRunnerAdding = async (): Promise<void> => {
    try {
      await addRunnerToTeam(id, teamId.id, token);
      setTeam((prev) => ({ ...prev, runners: [...prev.runners, id] }));
      const runnerToUpdate = dbRunners.find((r) => r.id === id);
      if (!runnerToUpdate) {
        return;
      }
      if (runnerToUpdate) {
        runnerToUpdate.blur = true;
        setRunners((prev) =>
          prev.map((r) => (r.id === id ? runnerToUpdate : r))
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRunnerDeleting = async (): Promise<void> => {
    try {
      await removeRunnerFromTeam(id, teamId.id, token);
      setTeam((prev) => ({
        ...prev,
        runners: prev.runners.filter((runner) => runner !== id),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Center py={3}>
      <Box
        opacity={blur ? 0.5 : 1}
        maxW={'270px'}
        w={'full'}
        bg={useColorModeValue('whitesmoke', 'dimgray')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}
        h={'full'}
      >
        <Image h={'120px'} w={'full'} src={teamPhoto} objectFit={'cover'} />
        <Flex justify={'center'} mt={-12}>
          <Avatar
            size={'xl'}
            src={runnerPhoto}
            css={{
              border: '2px solid white',
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={'center'} mb={8}>
            <Heading
              textAlign={'center'}
              fontSize={'1.75rem'}
              fontWeight={500}
              fontFamily={'body'}
            >
              {runner}
            </Heading>
            <Text color={useColorModeValue('gray.500', 'whitesmoke')}>
              {team}
            </Text>
          </Stack>

          <Box bottom={'0px'} p={'absolute'}>
            <Stack direction={'row'} justify={'center'} spacing={6}>
              <Stack spacing={0} align={'center'}>
                <Text fontWeight={600}>{points}</Text>
                <Text
                  fontSize={'sm'}
                  color={useColorModeValue('gray.500', 'whitesmoke')}
                >
                  Kerätyt pisteet
                </Text>
              </Stack>
              <Stack spacing={0} align={'center'}>
                <Text fontWeight={600}>{price}</Text>
                <Text
                  fontSize={'sm'}
                  color={useColorModeValue('gray.500', 'whitesmoke')}
                >
                  Hinta
                </Text>
              </Stack>
            </Stack>
            {displayDelete ? (
              <Button
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={() => handleRunnerDeleting()}
                bg={useColorModeValue('#151f21', 'gray.900')}
                color={'red'}
                _hover={{
                  bgColor: useColorModeValue('red', 'red.400'),
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                  color: 'black',
                }}
              >
                Poista joukkueesta
              </Button>
            ) : (
              <Button
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={() => handleRunnerAdding()}
                color={useColorModeValue('#17d424', 'green')}
                bg={useColorModeValue('#151f21', 'gray.900')}
                _hover={{
                  bgColor: useColorModeValue('green', 'green.600'),
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                  color: 'white',
                }}
              >
                Lisää joukkueeseen
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Center>
  );
};

export default RunnerCard;
