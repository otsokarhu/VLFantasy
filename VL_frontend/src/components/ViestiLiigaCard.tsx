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

const IMAGE =
  'https://www.viestiliiga.fi/wp-content/uploads/2019/11/suunnistus_viestiliiga_logo_pieni.jpg';

const ViestiLiigaCard = () => {
  const wd = useColorModeValue('whitesmoke', 'dimgray');
  const buttonBg = useColorModeValue('green.400', 'blue.900');
  const hoverBg = useColorModeValue('green.500', 'blue.800');
  return (
    <Center py={12}>
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        bg={wd}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
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
            Lue lisää Viestiliigasta!
          </Heading>
          <Link href="https://www.viestiliiga.fi/" isExternal>
            <Button
              bg={buttonBg}
              color={'white'}
              _hover={{
                bg: hoverBg,
              }}
            >
              Viestiliigan sivuille
            </Button>
          </Link>
        </Stack>
      </Box>
    </Center>
  );
};

export default ViestiLiigaCard;
