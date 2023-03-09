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
  Spinner,
  Select,
  Flex,
  InputGroup,
  InputRightElement,
  IconButton,
  useMediaQuery,
} from '@chakra-ui/react';
import RunnerPage from './Runners';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../../state/user';
import { teamState } from '../../state/fantasyTeam';
import { Formik, Form } from 'formik';
import {
  createFantasyTeam,
  getFantasyTeam,
} from '../../services/fantasyTeamService';
import { tokenState } from '../../state/user';
import UserTeam from './UserTeam';
import {
  allRunnersState,
  renderAllRunnersState,
  runnerFilterState,
  runnerOrderState,
} from '../../state/runners';
import { getAllRunners } from '../../services/runnerService';
import React from 'react';
import { CloseIcon, ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';

const TeamPage = () => {
  const [user, setUser] = useRecoilState(userState);
  const [team, setTeam] = useRecoilState(teamState);
  const setOrder = useSetRecoilState(runnerOrderState);
  const [renderAll, setRenderAllRunners] = useRecoilState(
    renderAllRunnersState
  );
  const { isLoading } = getFantasyTeam(user.fantasyTeam);
  const { isRunnersLoading } = getAllRunners();
  const token = useRecoilValue(tokenState);
  const runnersFromState = useRecoilValue(allRunnersState);
  const [filter, setFilter] = useRecoilState(runnerFilterState);
  const wd = useColorModeValue('whitesmoke', 'dimgray');
  const gw = useColorModeValue('gray.500', 'whitesmoke');
  const budgetGreen = useColorModeValue('#168118', '#084f09');
  const budgetYellow = useColorModeValue('#f9f906', '#FFBF00');
  const budgetRed = useColorModeValue('#FF2400', '#C21807');
  const [isDesktop] = useMediaQuery('(min-width: 62em)');

  const toast = useToast();

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrder(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleClearFilter = () => {
    setFilter('');
  };

  const handleRenderAllRunners = () => {
    setRenderAllRunners(!renderAll);
    if (renderAll) {
      toast({
        title: 'Ainoastaan 20 juoksijaa näkyvillä',
        status: 'info',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    } else {
      toast({
        title: 'Kaikki juoksijat näkyvillä',
        status: 'info',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const handleTeamCreation = async (values: {
    teamName: string;
  }): Promise<void> => {
    try {
      const newTeam = await createFantasyTeam(values.teamName, user.id, token);
      setUser({ ...user, fantasyTeam: newTeam.id });
      const updatedUser = { ...user, fantasyTeam: newTeam.id };
      window.localStorage.removeItem('loggedVLUser');
      window.localStorage.setItem('loggedVLUser', JSON.stringify(updatedUser));
      setTeam({
        name: newTeam.name,
        id: newTeam.id,
        runners: newTeam.runners,
        points: newTeam.points,
      });

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

  const budgetColor = () => {
    if (totalPrice >= 37) {
      return budgetRed;
    } else if (totalPrice > 30 && totalPrice < 37) {
      return budgetYellow;
    } else {
      return budgetGreen;
    }
  };

  if (!user.id) {
    return (
      <Center p={2} h={'90vh'}>
        <Box
          maxW={'270px'}
          w={'270px'}
          bg={wd}
          boxShadow={'2xl'}
          rounded={'lg'}
          overflow={'hidden'}
          h={'270px'}
          alignContent={'center'}
          p={2}
          opacity={0.8}
        >
          <Heading alignContent={'center'} color={gw}>
            Kirjaudu sisään valitaksesi joukkueesi!
          </Heading>
        </Box>
      </Center>
    );
  }
  if (isLoading || isRunnersLoading) {
    return (
      <Center p={2} h={'90vh'}>
        <Spinner />
      </Center>
    );
  } else {
    if (user && team.id === '') {
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
                <Center p={2} h={'90vh'}>
                  <Box
                    maxW={'270px'}
                    w={'270px'}
                    bg={wd}
                    boxShadow={'2xl'}
                    rounded={'lg'}
                    overflow={'hidden'}
                    h={'270px'}
                    alignContent={'center'}
                    p={2}
                    opacity={0.95}
                  >
                    <Stack spacing={4} align={'center'}>
                      <Heading alignItems={'center'} color={gw}>
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
        <Flex flexDirection={'column'} maxW="100vw" paddingBottom={5}>
          <Center p={2}>
            <Box p={2} rounded={'md'} bg={wd} textAlign={'center'}>
              <Heading color={gw} fontSize={isDesktop ? '1.4rem' : '3rem'}>
                {team.name}:
              </Heading>
            </Box>
          </Center>
          <UserTeam />
          <Center p={2}>
            <Box p={2} rounded={'md'} bg={wd} textAlign={'center'}>
              <Flex flexDirection={'row'} justifyContent={'center'}>
                <Text
                  color={gw}
                  fontSize={isDesktop ? '1.5rem' : '2.8rem'}
                  fontWeight={600}
                >
                  budjettia käytettävissä:
                </Text>
                <Text
                  color={budgetColor()}
                  fontSize={isDesktop ? '1.5rem' : '2.8rem'}
                  fontWeight={600}
                >
                  {40 - totalPrice} milj.
                </Text>
              </Flex>
              {team.runners.length === 5 ? (
                <Heading color={gw} fontSize={isDesktop ? '2rem' : '3.2rem'}>
                  Joukkue valmis!
                </Heading>
              ) : (
                <Heading color={gw} fontSize={isDesktop ? '2rem' : '3.2rem'}>
                  Juoksijoita valittavana: {5 - team.runners.length}
                </Heading>
              )}

              <Select
                placeholder="Aakkosjärjestys"
                id="orderBy"
                onChange={handleOrderChange}
                fontSize={isDesktop ? '1.2rem' : '2rem'}
              >
                <option value="price">Hinnan mukaan, Kallein ensin</option>
                <option value="priceAsc">Hinnan mukaan, Halvin ensin</option>
                <option value="points">Pisteiden mukaan</option>
                <option value="team">Seuran mukaan</option>
              </Select>
              <InputGroup paddingBottom={2}>
                <Input
                  type="text"
                  placeholder="Hae nimen tai seuran perusteella"
                  value={filter}
                  fontSize={isDesktop ? '1.2rem' : '2rem'}
                  onChange={handleFilterChange}
                />
                {filter && (
                  <InputRightElement width="4.5rem">
                    <IconButton
                      variant={'icon'}
                      aria-label="Clear filter"
                      icon={<CloseIcon />}
                      onClick={handleClearFilter}
                    />
                  </InputRightElement>
                )}
              </InputGroup>
              <Button onClick={handleRenderAllRunners} variant={'outline'}>
                {!renderAll ? (
                  <Text
                    fontSize={isDesktop ? '1.2rem' : '1.9rem'}
                    fontWeight={'hairline'}
                  >
                    Näytä kaikki juoksijat
                  </Text>
                ) : (
                  <Text
                    fontSize={isDesktop ? '1.2rem' : '1.9rem'}
                    fontWeight={'hairline'}
                  >
                    Näytä vain 20 juoksijaa
                  </Text>
                )}
              </Button>
            </Box>
          </Center>
          <RunnerPage />
          <Button
            onClick={handleRenderAllRunners}
            variant={'solid'}
            w={'90vw'}
            left={'5vw'}
          >
            {!renderAll ? (
              <Text>
                <ArrowDownIcon />
                Näytä lisää juoksijoita
                <ArrowDownIcon />
              </Text>
            ) : (
              <Text>
                <ArrowUpIcon />
                Näytä vain 20 juoksijaa
                <ArrowUpIcon />
              </Text>
            )}
          </Button>
        </Flex>
      );
  }
};

export default TeamPage;
