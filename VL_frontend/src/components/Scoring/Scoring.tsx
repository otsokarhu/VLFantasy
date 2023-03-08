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
      w={isDesktop ? '31vw' : '90vw'}
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
          <Heading fontSize={isDesktop ? '1.8rem' : '2.5rem'} color={textColor}>
            Pisteytys
          </Heading>
        </GridItem>

        <GridItem>
          <Heading fontSize={isDesktop ? '1.2rem' : '1.9rem'} color={textColor}>
            VL-Fantasyjoukkueesi juoksijat keräävät pisteitä seuraavasti:
          </Heading>

          {isDesktop ? (
            <ButtonGroup size="lg" isAttached variant="outline">
              <Button
                variant="outline"
                onClick={() => handleClick('team')}
                fontSize={isDesktop ? '0.8rem' : '1.9rem'}
              >
                Joukkuekohtaiset
              </Button>
              <Button
                fontSize={isDesktop ? '0.8rem' : '1.9rem'}
                variant="outline"
                onClick={() => handleClick('leg')}
              >
                Osuuskohtaiset
              </Button>
              <Button
                fontSize={isDesktop ? '0.8rem' : '1.9rem'}
                variant="outline"
                onClick={() => handleClick('other')}
              >
                Muut
              </Button>
            </ButtonGroup>
          ) : (
            <>
              <Button
                variant="ghost"
                onClick={() => handleClick('team')}
                fontSize={isDesktop ? '0.8rem' : '1.9rem'}
              >
                Joukkuekohtaiset
              </Button>
              <Button
                fontSize={isDesktop ? '0.8rem' : '1.9rem'}
                variant="ghost"
                onClick={() => handleClick('leg')}
              >
                Osuuskohtaiset
              </Button>
              <Button
                fontSize={isDesktop ? '0.8rem' : '1.9rem'}
                variant="ghost"
                onClick={() => handleClick('other')}
              >
                Muut
              </Button>
            </>
          )}
        </GridItem>

        {renderPoints()}
      </Grid>
      {isDesktop ? <ToHome /> : null}
    </Flex>
  );
};

export default Scoring;
