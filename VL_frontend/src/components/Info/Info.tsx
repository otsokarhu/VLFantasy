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
      w={isDesktop ? '20vw' : '90vw'}
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
      <Heading
        textAlign={'center'}
        fontSize={isDesktop ? '1.8rem' : '2.5rem'}
        color={textColor}
      >
        Tervetuloa ViestiLiiga-Fantasyyn!
      </Heading>
      <Heading
        textAlign={'center'}
        fontSize={isDesktop ? '1.2rem' : '1.9rem'}
        color={textColor}
      >
        Täällä voit luoda joukkueen ViestiLiigaFantasyyn ja valita joukkueesi
        juoksijat. Valitsemasi joukkue kerää pisteitä perustuen suunnistajiensa
        suorituksiin kesän 2023 ViestiLiiga-kilpailuissa.
      </Heading>
      {isDesktop ? <ToHome /> : null}
    </Box>
  );
};

export default Info;
