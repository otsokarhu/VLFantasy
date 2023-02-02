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
import { Link as RouterLink, Navigate } from 'react-router-dom';
import ToHome from './helpers';
import { RegisterFormValues } from '../types';
import { createUser } from '../services/userService';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [registered, setRegistered] = useState(false);
  const toast = useToast();

  const handleRegister = async (values: RegisterFormValues): Promise<void> => {
    console.log('registering with', values);
    try {
      await createUser(
        values.username,
        values.firstName,
        values.lastName,
        values.email,
        values.password
      );
      setRegistered(true);
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
        password: '',
        firstName: '',
        lastName: '',
        username: '',
      }}
      onSubmit={handleRegister}
      validate={(values) => {
        const requiredError = 'Tämä kenttä on pakollinen';
        const errors: { [field: string]: string } = {};
        if (!values.email) {
          errors.email = requiredError;
        }
        if (!values.password) {
          errors.password = requiredError;
        }
        if (!values.firstName) {
          errors.firstName = requiredError;
        }
        if (!values.lastName) {
          errors.lastName = requiredError;
        }
        if (!values.username) {
          errors.username = requiredError;
        }
        return errors;
      }}
    >
      {({ values, isSubmitting, isValid, handleChange }) => {
        return (
          <Form>
            {registered && <Navigate to="/" />}
            <Flex
              minH={'100vh'}
              align={'center'}
              justify={'center'}
              bg={useColorModeValue('gray.50', 'gray.800')}
              fontFamily={
                'Courier New, Courier, Lucida Sans Typewriter, Lucida Typewriter, monospace'
              }
            >
              <ToHome />
              <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                  <Heading
                    fontSize={'4xl'}
                    textAlign={'center'}
                    fontFamily={
                      'Courier New, Courier, Lucida Sans Typewriter, Lucida Typewriter, monospace'
                    }
                  >
                    Rekisteröidy
                  </Heading>
                </Stack>
                <Box
                  rounded={'lg'}
                  bg={useColorModeValue('white', 'gray.700')}
                  boxShadow={'lg'}
                  p={8}
                >
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

                    <FormControl id="username" isRequired>
                      <FormLabel>Käyttäjätunnus</FormLabel>
                      <Input
                        type="text"
                        name="username"
                        value={values.username}
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
                    <FormControl id="password" isRequired>
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
                    <Stack spacing={10} pt={2}>
                      <Button
                        loadingText="Submitting"
                        type="submit"
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
              </Stack>
            </Flex>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Signup;
