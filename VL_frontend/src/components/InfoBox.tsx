import { Box, Heading, useColorModeValue } from '@chakra-ui/react';
import ToHome from './HomeButton';

const InfoPage = () => {
  const flexBg = useColorModeValue('whitesmoke', 'dimgray');
  const textColor = useColorModeValue('gray.500', 'whitesmoke');
  return (
    <Box
      w={'20vw'}
      roundedBottom={'lg'}
      h={'270px'}
      p={2}
      opacity={0.9}
      bg={flexBg}
      position={'sticky'}
      height={'auto'}
    >
      <Heading alignContent={'center'} fontSize={'2xl'} color={textColor}>
        Tervetuloa ViestiLiiga-Fantasyyn!
      </Heading>
      <Heading alignContent={'center'} fontSize={'1xl'} color={textColor}>
        Täällä voit luoda joukkueen ViestiLiigaFantasyyn ja valita joukkueesi
        pelaajat. Valitsemasi joukkue kerää pisteitä perustuen suunnistajiensa
        suorituksiin kesän 2023 ViestiLiiga-kilpailuissa.
      </Heading>
      <ToHome />
    </Box>
  );
};

export default InfoPage;
