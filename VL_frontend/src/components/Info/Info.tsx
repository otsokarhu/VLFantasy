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
  const [isLargerThanMobile] = useMediaQuery('(min-width: 950px)');
  return (
    <Box
      w={isLargerThanMobile ? '20vw' : '100vw'}
      roundedBottom={'lg'}
      roundedTop={isLargerThanMobile ? 'none' : 'lg'}
      h={'270px'}
      p={2}
      opacity={isLargerThanMobile ? 0.9 : 1}
      bg={flexBg}
      position={'sticky'}
      height={'auto'}
      zIndex={1}
    >
      {isLargerThanMobile ? null : <ToHome />}
      <Heading alignContent={'center'} fontSize={'2xl'} color={textColor}>
        Tervetuloa ViestiLiiga-Fantasyyn!
      </Heading>
      <Heading alignContent={'center'} fontSize={'1xl'} color={textColor}>
        Täällä voit luoda joukkueen ViestiLiigaFantasyyn ja valita joukkueesi
        pelaajat. Valitsemasi joukkue kerää pisteitä perustuen suunnistajiensa
        suorituksiin kesän 2023 ViestiLiiga-kilpailuissa.
      </Heading>
      {isLargerThanMobile ? <ToHome /> : null}
    </Box>
  );
};

export default Info;
