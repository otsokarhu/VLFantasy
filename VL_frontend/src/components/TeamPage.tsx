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
} from '@chakra-ui/react';
import RunnerPage from './RunnerPage';
import { useRecoilState } from 'recoil';
import { userState } from '../state/user';
import { teamState } from '../state/fantasyTeam';
import { Formik, Form } from 'formik';
import { createFantasyTeam } from '../services/fantasyTeamService';

const TeamPage = () => {
  const [user] = useRecoilState(userState);
  const [team, setTeam] = useRecoilState(teamState);
  const handleTeamCreation = async (values: {
    teamName: string;
  }): Promise<void> => {
    try {
      await createFantasyTeam(values.teamName, user);
      setTeam((prev) => ({ ...prev, teamName: values.teamName }));
    } catch (error) {
      console.log(error);
    }
  };

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
  if (user && team.teamName === '') {
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
