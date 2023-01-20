import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Loginform = () => {
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      fontFamily={
        'Courier New, Courier, Lucida Sans Typewriter, Lucida Typewriter, monospace'
      }
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
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
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" />
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
      </Stack>
    </Flex>
  );
};

export default Loginform;
