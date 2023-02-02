import {
  Heading,
  Box,
  Center,
  useColorModeValue,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  useToast,
  Text,
} from '@chakra-ui/react';
import RunnerPage from './RunnerPage';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from '../state/user';
import { teamState } from '../state/fantasyTeam';
import { Formik, Form } from 'formik';
import {
  createFantasyTeam,
  getFantasyTeam,
} from '../services/fantasyTeamService';
import { tokenState } from '../state/user';
import UserTeam from './UserTeamRunners';
import { allRunnersState } from '../state/runners';

const TeamPage = () => {
  const user = useRecoilValue(userState);
  const [team, setTeam] = useRecoilState(teamState);
  const token = useRecoilValue(tokenState);
  const toast = useToast();
  const runnersFromState = useRecoilValue(allRunnersState);
  const { isLoading } = getFantasyTeam(user.fantasyTeam);

  const handleTeamCreation = async (values: {
    teamName: string;
  }): Promise<void> => {
    try {
      await createFantasyTeam(values.teamName, user.id, token);
      setTeam((prev) => ({ ...prev, teamName: values.teamName }));
      toast({
        title: 'Joukkue luotu',
        description: 'Joukkueen nimi on ' + values.teamName,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    } catch (error) {
      toast({
        title: 'Virhe',
        description: 'Joukkueen luominen epäonnistui',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  let totalPrice = 0;
  if (team.runners) {
    team.runners.forEach((runner) => {
      const runnerPrice = runnersFromState.find((r) => r.id === runner);
      if (runnerPrice) {
        totalPrice += runnerPrice.price;
      }
    });
  }

  if (!user.id) {
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
  if (user && team.id === '' && !isLoading) {
    return (
      <Formik
        initialValues={{ teamName: '' }}
        onSubmit={handleTeamCreation}
        validate={(values) => {
          const errors: { teamName?: string } = {};
          if (!values.teamName) {
            errors.teamName = 'Joukkueen nimi vaaditaan';
          }
          return errors;
        }}
      >
        {({ isValid, values, handleChange }) => {
          return (
            <Form>
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
                  opacity={0.95}
                >
                  <Stack spacing={4} align={'center'}>
                    <Heading
                      alignItems={'center'}
                      color={useColorModeValue('gray.500', 'whitesmoke')}
                    >
                      luo joukkueesi!
                    </Heading>
                    <FormControl id="teamName">
                      <FormLabel>Joukkueesi nimi</FormLabel>
                      <Input
                        type="teamName"
                        name="teamName"
                        value={values.teamName}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <Button
                      type="submit"
                      disabled={!isValid}
                      bg={'blue.400'}
                      color={'white'}
                      _hover={{
                        bg: 'blue.500',
                      }}
                    >
                      Luo joukkue!
                    </Button>
                  </Stack>
                </Box>
              </Center>
            </Form>
          );
        }}
      </Formik>
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
            {team.runners.length === 5 ? (
              <Heading color={useColorModeValue('gray.500', 'whitesmoke')}>
                Joukkue valmis!
              </Heading>
            ) : (
              <Heading color={useColorModeValue('gray.500', 'whitesmoke')}>
                Juoksijoita valittavana: {5 - team.runners.length}
              </Heading>
            )}
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
              {team.name}:
            </Heading>
            <Text
              color={useColorModeValue('gray.500', 'whitesmoke')}
              align={'center'}
              fontSize={'xl'}
            >
              budjettia jäljellä: {200 - totalPrice}
            </Text>
          </Box>
        </Center>
        <UserTeam />
      </Box>
    );
};

export default TeamPage;
