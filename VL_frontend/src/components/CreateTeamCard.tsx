import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Button,
  Stack,
  Image,
  Link,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const IMAGE =
  'https://img.freepik.com/free-photo/outdoor-team-orienteering-activity_53876-48899.jpg';

const CreateTeamCard = () => {
  return (
    <Center py={12}>
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('whitesmoke', 'dimgray')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}
      >
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'230px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${IMAGE})`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}
        >
          <Image
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'cover'}
            src={IMAGE}
          />
        </Box>
        <Stack pt={10} align={'center'}>
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
            Luo oma VL-Fantasy-joukkueesi!
          </Heading>
          <Link as={RouterLink} to="teamPage" href="teamPage">
            <Button
              bg={useColorModeValue('green.400', 'blue.900')}
              color={'white'}
              _hover={{
                bg: useColorModeValue('green.500', 'blue.800'),
              }}
            >
              Luo joukkue
            </Button>
          </Link>
        </Stack>
      </Box>
    </Center>
  );
};

export default CreateTeamCard;
