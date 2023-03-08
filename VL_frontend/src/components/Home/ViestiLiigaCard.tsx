import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Button,
  Stack,
  Image,
  Link,
  useMediaQuery,
} from '@chakra-ui/react';

const ViestiLiigaCard = () => {
  const wd = useColorModeValue('whitesmoke', 'dimgray');
  const buttonBg = useColorModeValue('green.400', 'blue.900');
  const hoverBg = useColorModeValue('green.500', 'blue.800');
  const [isDesktop] = useMediaQuery('(min-width: 62em)');

  return (
    <Center py={12}>
      <Box
        role={'group'}
        p={6}
        maxW={isDesktop ? '330px' : '495px'}
        bg={wd}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        textAlign={'center'}
      >
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={isDesktop ? '230px' : '345px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `viestiLiiga.webp`,
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
            height={isDesktop ? 230 : 345}
            width={isDesktop ? 282 : 423}
            objectFit={'cover'}
            src={'viestiLiiga.webp'}
          />
        </Box>
        <Stack pt={10} align={'center'}>
          <Heading
            fontSize={isDesktop ? '1.8rem' : '2.5rem'}
            fontFamily={'body'}
            fontWeight={isDesktop ? 'hairline' : 'bold'}
          >
            Lue lisää Viestiliigasta!
          </Heading>
          <Link href="https://www.viestiliiga.fi/" isExternal>
            <Button
              bg={buttonBg}
              color={'white'}
              _hover={{
                bg: hoverBg,
              }}
              fontSize={isDesktop ? '1.2rem' : '1.9rem'}
              size={isDesktop ? 'md' : 'lg'}
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
