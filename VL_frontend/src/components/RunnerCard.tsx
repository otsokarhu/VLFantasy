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
  useToast,
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
  const [userTeam, setTeam] = useRecoilState(teamState);
  const token = useRecoilValue(tokenState);
  const setRunners = useSetRecoilState(allRunnersState);
  const textBg = useColorModeValue('gray.500', 'whitesmoke');
  const boxBg = useColorModeValue('whitesmoke', 'dimgray');
  const buttonBg = useColorModeValue('#151f21', 'gray.900');
  const redHover = useColorModeValue('red', 'red.400');
  const greenHover = useColorModeValue('green', 'green.600');
  const greenButton = useColorModeValue('#17d424', 'green');
  const toast = useToast();

  const totalPrice = userTeam.runners.reduce((acc, runner) => {
    const runnerPrice = dbRunners.find((r) => r.id === runner);
    if (runnerPrice) {
      return acc + runnerPrice.price;
    }
    return acc;
  }, 0);

  const handleRunnerAdding = async (): Promise<void> => {
    const runnerToUpdate = dbRunners.find((r) => r.id === id);
    if (!runnerToUpdate) {
      return;
    }
    if (totalPrice + runnerToUpdate.price > 200) {
      toast({
        title: 'Virhe',
        description: 'Joukkueen kokonaisbudjetti ylittyy',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      return;
    }
    try {
      await addRunnerToTeam(id, userTeam.id, token);
      setTeam((prev) => ({ ...prev, runners: [...prev.runners, id] }));

      if (runnerToUpdate) {
        const updatedRunner = {
          ...runnerToUpdate,
          selected: true,
        };
        setRunners((prev) =>
          prev.map((r) => (r.id === id ? updatedRunner : r))
        );
      }
    } catch (error) {
      toast({
        title: 'Virhe',
        description: 'Joukkueessasi on jo 5 juoksijaa',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const handleRunnerDeleting = async (): Promise<void> => {
    try {
      await removeRunnerFromTeam(id, userTeam.id, token);

      const runnerToUpdate = dbRunners.find((r) => r.id === id);
      if (!runnerToUpdate) {
        return;
      }
      if (runnerToUpdate) {
        const updatedRunner = {
          ...runnerToUpdate,
          selected: false,
        };
        setRunners((prev) =>
          prev.map((r) => (r.id === id ? updatedRunner : r))
        );
      }
      setTeam((prev) => ({
        ...prev,
        runners: prev.runners.filter((runner) => runner !== id),
      }));
    } catch (error) {
      toast({
        title: 'Virhe',
        description: 'Juoksijan poistaminen joukkueesta epäonnistui',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  return (
    <Center py={3}>
      <Box
        opacity={blur ? 0.5 : 1}
        maxW={'270px'}
        w={'full'}
        bg={boxBg}
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
            <Text color={textBg}>{team}</Text>
          </Stack>

          <Box bottom={'0px'} p={'absolute'}>
            <Stack direction={'row'} justify={'center'} spacing={6}>
              <Stack spacing={0} align={'center'}>
                <Text fontWeight={600}>{points}</Text>
                <Text fontSize={'sm'} color={textBg}>
                  Kerätyt pisteet
                </Text>
              </Stack>
              <Stack spacing={0} align={'center'}>
                <Text fontWeight={600}>{price}</Text>
                <Text fontSize={'sm'} color={textBg}>
                  Hinta
                </Text>
              </Stack>
            </Stack>

            {displayDelete ? (
              <Button
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={() => handleRunnerDeleting()}
                bg={buttonBg}
                color={'red'}
                _hover={{
                  bgColor: redHover,
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
                color={greenButton}
                bg={buttonBg}
                visibility={blur ? 'hidden' : 'visible'}
                _hover={{
                  bgColor: greenHover,
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
