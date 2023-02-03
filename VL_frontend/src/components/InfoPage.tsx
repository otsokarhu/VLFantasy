import {
  Box,
  Center,
  Flex,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import ToHome from './HomeButton';

const InfoPage = () => {
  const flexBg = useColorModeValue('gray.50', 'gray.800');
  const bg = useColorModeValue('gray.500', 'whitesmoke');
  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'} bg={flexBg}>
      <ToHome />
      <Center p={3} h="90vh">
        <Box
          maxW={'lg'}
          mx={'auto'}
          boxShadow={'2xl'}
          rounded={'lg'}
          overflow={'hidden'}
          h={'270px'}
          alignContent={'center'}
          p={2}
          opacity={0.8}
        >
          <Heading alignContent={'center'} fontSize={'2xl'} color={bg}>
            Tervetuloa ViestiLiigaan-Fantasyyn!
          </Heading>
          <Heading alignContent={'center'} fontSize={'1xl'} color={bg}>
            Täällä voit luoda joukkueen ViestiLiigaFantasyyn ja valita
            joukkueesi pelaajat. Valitsemasi joukkue kerää pisteitä perustuen
            suunnistajiensa suorituksiin kesän 2023 ViestiLiiga-kilpailuissa.
          </Heading>
        </Box>
      </Center>
    </Flex>
  );
};

export default InfoPage;
