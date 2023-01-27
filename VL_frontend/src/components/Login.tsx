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
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import ToHome from './helpers';
import { Field, Formik, Form } from 'formik';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

type LoginFormValues = {
  username: string;
  password: string;
};

interface Props {
  onSubmit: (values: LoginFormValues) => Promise<void>;
}

const Loginform = ({ onSubmit }: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const passwordInput = (
    <FormControl id="password" isRequired>
      <FormLabel>Salasana</FormLabel>
      <InputGroup>
        <Input type={showPassword ? 'text' : 'password'} />
        <InputRightElement h={'full'}>
          <Button
            variant={'ghost'}
            onClick={() => setShowPassword((showPassword) => !showPassword)}
          >
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      onSubmit={onSubmit}
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
      {({ isValid }) => {
        return (
          <Form>
            <Flex
              minH={'100vh'}
              align={'center'}
              justify={'center'}
              fontFamily={
                'Courier New, Courier, Lucida Sans Typewriter, Lucida Typewriter, monospace'
              }
              bg={useColorModeValue('gray.50', 'gray.800')}
            >
              <ToHome />
              <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                  <Heading
                    fontSize={'4xl'}
                    fontFamily={
                      'Courier New, Courier, Lucida Sans Typewriter, Lucida Typewriter, monospace'
                    }
                  >
                    Kirjaudu sisään
                  </Heading>
                </Stack>
                <Box
                  rounded={'lg'}
                  bg={useColorModeValue('white', 'gray.700')}
                  boxShadow={'lg'}
                  p={8}
                >
                  <Stack spacing={4}>
                    <Field
                      label="Username"
                      placeholder="Käyttäjätunnus"
                      name="username"
                      as={Input}
                    />
                    <Field
                      name="password"
                      placeholder="Salasana"
                      label="Password"
                      as={Input}
                    />
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
                        bg={'blue.400'}
                        color={'white'}
                        style={{
                          float: 'right',
                        }}
                        type="submit"
                        variant="contained"
                        disabled={!isValid}
                      >
                        Kirjaudu sisään
                      </Button>
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

export default Loginform;
