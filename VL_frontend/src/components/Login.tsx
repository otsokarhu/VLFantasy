import {
  Flex,
  Box,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import ToHome from './helpers';
import { Field, Formik, Form } from "formik";

type LoginFormValues = {
  username: string;
  password: string;
};



interface Props {
  onSubmit: (values: LoginFormValues) => void;
}


const Loginform = ({onSubmit}: Props) => {

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      onSubmit={onSubmit}
    validate={(values) => {
      const requiredError = "Field is required";
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
            component={Input} 
              />
            <Field
              label="Password"
              placeholder="Salasana"
              name="password"
              component={Input}
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
                type='submit'
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                variant={'contained'}
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
