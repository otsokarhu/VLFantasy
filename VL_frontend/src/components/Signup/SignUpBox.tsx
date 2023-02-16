import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Formik, Form } from 'formik';
import { Link as RouterLink } from 'react-router-dom';
import ToHome from '../Miscellaneous/CloseTab';
import { RegisterFormValues } from '../../types';
import { createUser } from '../../services/userService';
import { useSetRecoilState } from 'recoil';
import { navBarState } from '../../state/navBar';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const flexBg = useColorModeValue('whitesmoke', 'dimgray');
  const boxBg = useColorModeValue('white', 'gray.700');
  const toast = useToast();
  const setNavBar = useSetRecoilState(navBarState);

  const handleHome = () => {
    setNavBar('default');
  };

  const handleRegister = async (values: RegisterFormValues): Promise<void> => {
    try {
      await createUser(
        values.username2,
        values.firstName,
        values.lastName,
        values.email,
        values.password2
      );
      handleHome();
      toast({
        title: 'Rekisteröityminen onnistui',
        description: 'Voit nyt kirjautua sisään',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      setNavBar('login');
    } catch (error) {
      toast({
        title: 'Rekisteröityminen epäonnistui',
        description: 'Tarkista tiedot ja yritä uudelleen',
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
        email: '',
        password2: '',
        firstName: '',
        lastName: '',
        username2: '',
      }}
      onSubmit={handleRegister}
      validate={(values) => {
        const requiredError = 'Tämä kenttä on pakollinen';
        const errors: { [field: string]: string } = {};
        if (!values.email) {
          errors.email = requiredError;
        }
        if (!values.password2) {
          errors.password = requiredError;
        }
        if (!values.firstName) {
          errors.firstName = requiredError;
        }
        if (!values.lastName) {
          errors.lastName = requiredError;
        }
        if (!values.username2) {
          errors.username = requiredError;
        }
        return errors;
      }}
    >
      {({ values, isSubmitting, isValid, handleChange }) => {
        return (
          <Form>
            <Flex
              align={'center'}
              w={'20vw'}
              justify={'center'}
              bg={flexBg}
              opacity={0.9}
              roundedBottom={'lg'}
              direction={'column'}
              position={'sticky'}
            >
              <Stack spacing={3} mx={'auto'} maxW={'lg'} pt={12} pb={2} px={6}>
                <Stack align={'center'}>
                  <Heading fontSize={'4xl'} textAlign={'center'}>
                    Rekisteröidy
                  </Heading>
                </Stack>
                <Box rounded={'lg'} bg={boxBg} boxShadow={'lg'} p={8}>
                  <Stack spacing={4}>
                    <HStack>
                      <Box>
                        <FormControl id="firstName" isRequired>
                          <FormLabel>Etunimi</FormLabel>
                          <Input
                            type="text"
                            name="firstName"
                            value={values.firstName}
                            onChange={handleChange}
                          />
                        </FormControl>
                      </Box>
                      <Box>
                        <FormControl id="lastName" isRequired>
                          <FormLabel>Sukunimi</FormLabel>
                          <Input
                            type="text"
                            name="lastName"
                            value={values.lastName}
                            onChange={handleChange}
                          />
                        </FormControl>
                      </Box>
                    </HStack>

                    <FormControl id="username2" isRequired>
                      <FormLabel>Käyttäjätunnus</FormLabel>
                      <Input
                        type="text"
                        name="username2"
                        value={values.username2}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl id="email" isRequired>
                      <FormLabel>Sähköpostiosoite</FormLabel>
                      <Input
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl id="password2" isRequired>
                      <FormLabel>Salasana</FormLabel>
                      <InputGroup>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          name="password2"
                          value={values.password2}
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
                    <Stack spacing={10} pt={2}>
                      <Button
                        loadingText="Submitting"
                        type="submit"
                        name="signup"
                        isLoading={isSubmitting}
                        disabled={!isValid || isSubmitting}
                        size="lg"
                        bg={'blue.400'}
                        color={'white'}
                        _hover={{
                          bg: 'blue.500',
                        }}
                      >
                        Rekisteröidy
                      </Button>
                    </Stack>
                    <Stack pt={6}>
                      <Text align={'center'}>
                        Rekisteröitynyt jo?{' '}
                        <Link
                          aria-label="toLogin"
                          as={RouterLink}
                          href="/login"
                          to="/login"
                          color={'blue.400'}
                        >
                          Kirjaudu
                        </Link>
                      </Text>
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

export default Signup;
