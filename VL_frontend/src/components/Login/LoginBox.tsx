import {
  Flex,
  Box,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  FormControl,
  FormLabel,
  useToast,
  useMediaQuery,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import ToHome from '../Miscellaneous/CloseTab';
import { Formik, Form } from 'formik';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { LoginFormValues } from '../../types';
import { useSetRecoilState } from 'recoil';
import { login } from '../../services/loginService';
import { userState } from '../../state/user';
import { tokenState } from '../../state/user';
import { teamState } from '../../state/fantasyTeam';
import { navBarState } from '../../state/navBar';
import { MobileToast } from '../Miscellaneous/MobileComponents';

const Loginform = () => {
  const [showPassword, setShowPassword] = useState(false);
  const setUser = useSetRecoilState(userState);
  const setToken = useSetRecoilState(tokenState);
  const setTeam = useSetRecoilState(teamState);
  const flexBg = useColorModeValue('whitesmoke', 'dimgray');
  const bg = useColorModeValue('white', 'gray.700');
  const setNavBar = useSetRecoilState(navBarState);
  const [isDesktop] = useMediaQuery('(min-width: 62em)');

  const handleHome = () => {
    setNavBar('default');
  };

  const toast = useToast();

  const handleLogin = async (values: LoginFormValues): Promise<void> => {
    try {
      const loggingIn = await login(values.username, values.password);
      window.localStorage.setItem('loggedVLUser', JSON.stringify(loggingIn));

      setUser((prev) => ({
        ...prev,
        name: loggingIn.name,
        id: loggingIn.id,
        username: loggingIn.username,
        email: loggingIn.email,
        fantasyTeam: loggingIn.fantasyTeam,
      }));
      setToken(loggingIn.token);
      setTeam((prev) => ({
        ...prev,
        id: loggingIn.fantasyTeam,
      }));

      toast(
        isDesktop
          ? {
              title: 'Kirjautuminen onnistui',
              description: 'Tervetuloa takaisin',
              status: 'success',
              duration: 3000,
              isClosable: true,
              position: 'top',
            }
          : {
              position: 'top',
              duration: 3000,
              render: () => (
                <MobileToast
                  fontsize="3rem"
                  status="success"
                  text="Kirjaudutuminen onnistui!"
                />
              ),
            }
      );

      handleHome();
    } catch (error) {
      toast(
        isDesktop
          ? {
              title: 'Kirjautuminen epäonnistui',
              description: 'Tarkista käyttäjätunnus ja salasana',
              status: 'error',
              duration: 5000,
              isClosable: true,
              position: 'top',
            }
          : {
              position: 'top',
              duration: 3000,
              render: () => (
                <MobileToast
                  fontsize="3rem"
                  status="success"
                  text={
                    'Kirjautuminen epäonnistui, tarkista käyttäjätunnus ja salasana'
                  }
                />
              ),
            }
      );
    }
  };

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      onSubmit={handleLogin}
      validate={(values) => {
        const requiredError = 'Tämä kenttä on pakollinen';
        const errors: { username?: string; password?: string } = {};
        if (!values.username) {
          errors.username = requiredError;
        }
        if (!values.password) {
          errors.password = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, values, handleChange }) => {
        return (
          <Form>
            <Flex
              align={'center'}
              w={isDesktop ? '20vw' : '90vw'}
              justify={'center'}
              bg={flexBg}
              opacity={isDesktop ? 0.9 : 1}
              roundedBottom={'lg'}
              roundedTop={isDesktop ? 'none' : 'lg'}
              position={'sticky'}
            >
              <Stack pt={5}>
                {isDesktop ? null : <ToHome />}
                <Stack spacing={3} mx={'auto'} maxW={'lg'} pt={2} pb={4} px={6}>
                  <Stack align={'center'}>
                    <Heading fontSize={isDesktop ? '1.8rem' : '2.7rem'}>
                      Kirjaudu sisään
                    </Heading>
                  </Stack>
                  <Box rounded={'lg'} bg={bg} boxShadow={'lg'} p={8}>
                    <Stack spacing={4}>
                      <FormControl id="username">
                        <FormLabel
                          fontSize={isDesktop ? '1.2rem' : '1.9rem'}
                          fontWeight={isDesktop ? 'hairline' : 'bold'}
                        >
                          Käyttäjätunnus
                        </FormLabel>
                        <Input
                          type="username"
                          name="username"
                          value={values.username}
                          onChange={handleChange}
                        />
                      </FormControl>
                      <FormControl id="password">
                        <FormLabel
                          fontSize={isDesktop ? '1.2rem' : '1.9rem'}
                          fontWeight={isDesktop ? 'hairline' : 'bold'}
                        >
                          Salasana
                        </FormLabel>
                        <InputGroup>
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                          />
                          <InputRightElement h={'full'}>
                            <Button
                              variant={'icon'}
                              onClick={() =>
                                setShowPassword((showPassword) => !showPassword)
                              }
                            >
                              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                      </FormControl>
                      <Stack spacing={10} align={'center'}>
                        <Stack
                          direction={{ base: 'column' }}
                          align={'start'}
                          justify={'space-between'}
                        >
                          <Link
                            as={RouterLink}
                            href="/signup"
                            to="/signup"
                            color={'blue.400'}
                            fontSize={isDesktop ? '1.2rem' : '1.9rem'}
                          >
                            Rekisteröidy
                          </Link>
                        </Stack>
                        <Button
                          type="submit"
                          name="login"
                          disabled={!isValid}
                          bg={'blue.400'}
                          color={'white'}
                          _hover={{
                            bg: 'blue.500',
                          }}
                          fontSize={isDesktop ? '1.2rem' : '1.7rem'}
                        >
                          Kirjaudu sisään
                        </Button>
                      </Stack>
                    </Stack>
                  </Box>
                  {isDesktop ? <ToHome /> : null}
                </Stack>
              </Stack>
            </Flex>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Loginform;
