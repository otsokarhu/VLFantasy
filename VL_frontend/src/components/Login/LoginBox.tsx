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
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import ToHome from '../Miscellaneous/CloseTab';
import { Formik, Form } from 'formik';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { LoginFormValues } from '../../types';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { login } from '../../services/loginService';
import { userState } from '../../state/user';
import { tokenState } from '../../state/user';
import { teamState } from '../../state/fantasyTeam';
import { navBarState } from '../../state/navBar';

const Loginform = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const setToken = useSetRecoilState(tokenState);
  const setTeam = useSetRecoilState(teamState);
  const flexBg = useColorModeValue('whitesmoke', 'dimgray');
  const bg = useColorModeValue('white', 'gray.700');
  const setNavBar = useSetRecoilState(navBarState);
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
      toast({
        title: 'Kirjautuminen onnistui',
        description: 'Tervetuloa takaisin',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      handleHome();
    } catch (error) {
      toast({
        title: 'Kirjautuminen epäonnistui',
        description: 'Tarkista käyttäjätunnus ja salasana',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
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
            {user.id !== ''}
            <Flex
              align={'center'}
              w={'20vw'}
              justify={'center'}
              bg={flexBg}
              opacity={0.9}
              roundedBottom={'lg'}
              position={'sticky'}
            >
              <Stack spacing={3} mx={'auto'} maxW={'lg'} pt={12} pb={2} px={6}>
                <Stack align={'center'}>
                  <Heading fontSize={'4xl'}>Kirjaudu sisään</Heading>
                </Stack>
                <Box rounded={'lg'} bg={bg} boxShadow={'lg'} p={8}>
                  <Stack spacing={4}>
                    <FormControl id="username">
                      <FormLabel>Käyttäjätunnus</FormLabel>
                      <Input
                        type="username"
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl id="password">
                      <FormLabel>Salasana</FormLabel>
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
                    <Stack spacing={10}>
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
                      >
                        Kirjaudu sisään
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
                <ToHome />
              </Stack>
            </Flex>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Loginform;