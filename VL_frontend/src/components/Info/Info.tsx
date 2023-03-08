import {
  Box,
  Heading,
  useColorModeValue,
  useMediaQuery,
} from '@chakra-ui/react';
import ToHome from '../Miscellaneous/CloseTab';

const Info = () => {
  const flexBg = useColorModeValue('whitesmoke', 'dimgray');
  const textColor = useColorModeValue('gray.500', 'whitesmoke');
  const [isDesktop] = useMediaQuery('(min-width: 62em)');

  return (
    <Box
      w={isDesktop ? '20vw' : '100vw'}
      roundedBottom={'lg'}
      roundedTop={isDesktop ? 'none' : 'lg'}
      h={'270px'}
      p={2}
      opacity={isDesktop ? 0.9 : 1}
      bg={flexBg}
      position={'sticky'}
      height={'auto'}
      zIndex={1}
    >
      {isDesktop ? null : <ToHome />}
      <Heading alignContent={'center'} fontSize={'2xl'} color={textColor}>
        Tervetuloa ViestiLiiga-Fantasyyn!
      </Heading>
      <Heading alignContent={'center'} fontSize={'1xl'} color={textColor}>
        Täällä voit luoda joukkueen ViestiLiigaFantasyyn ja valita joukkueesi
        pelaajat. Valitsemasi joukkue kerää pisteitä perustuen suunnistajiensa
        suorituksiin kesän 2023 ViestiLiiga-kilpailuissa.
      </Heading>
      {isDesktop ? <ToHome /> : null}
    </Box>
  );
};

export default Info;
