import {
  Heading,
  useColorModeValue,
  Grid,
  GridItem,
  Button,
  ButtonGroup,
  Flex,
  useMediaQuery,
} from '@chakra-ui/react';
import ToHome from '../Miscellaneous/CloseTab';
import LegBasedPoints from './LegBasedPoints';
import TeamBasedPoints from './TeamBasedPoints';
import OtherPoints from './OtherPoints';
import { useState } from 'react';

const Scoring = () => {
  const flexBg = useColorModeValue('whitesmoke', 'dimgray');
  const textColor = useColorModeValue('gray.500', 'whitesmoke');
  const [pointsView, setPointsView] = useState('team');
  const [isDesktop] = useMediaQuery('(min-width: 62em)');

  const handleClick = (str: string) => {
    setPointsView(str);
  };

  const renderPoints = () => {
    switch (pointsView) {
      case 'team':
        return <TeamBasedPoints />;
      case 'leg':
        return <LegBasedPoints />;
      case 'other':
        return <OtherPoints />;
      default:
        return <TeamBasedPoints />;
    }
  };

  return (
    <Flex
      w={isDesktop ? '31vw' : '100vw'}
      roundedBottom={'lg'}
      roundedTop={isDesktop ? 'none' : 'lg'}
      h={'270px'}
      p={4}
      opacity={isDesktop ? 0.9 : 1}
      bg={flexBg}
      position={'sticky'}
      height={'auto'}
      zIndex={1}
      direction={'column'}
      textAlign={'center'}
    >
      {isDesktop ? null : <ToHome />}
      <Grid gap={4}>
        <GridItem>
          <Heading fontSize={'2xl'} color={textColor}>
            Pisteytys
          </Heading>
        </GridItem>

        <GridItem>
          <Heading fontSize={'1xl'} color={textColor}>
            VL-Fantasyjoukkueesi juoksijat keräävät pisteitä seuraavasti:
          </Heading>

          <ButtonGroup size="lg" isAttached variant="outline">
            <Button
              fontSize={'sm'}
              variant="outline"
              onClick={() => handleClick('team')}
            >
              Joukkuekohtaiset
            </Button>
            <Button
              fontSize={'sm'}
              variant="outline"
              onClick={() => handleClick('leg')}
            >
              Osuuskohtaiset
            </Button>
            <Button
              fontSize={'sm'}
              variant="outline"
              onClick={() => handleClick('other')}
            >
              Muut
            </Button>
          </ButtonGroup>
        </GridItem>

        {renderPoints()}
      </Grid>
      {isDesktop ? <ToHome /> : null}
    </Flex>
  );
};

export default Scoring;
