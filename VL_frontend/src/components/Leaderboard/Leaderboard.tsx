import {
  Box,
  Heading,
  Spinner,
  useColorModeValue,
  useMediaQuery,
} from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { getAllTeams } from '../../services/fantasyTeamService';
import { allTeamsState } from '../../state/fantasyTeam';
import ToHome from '../Miscellaneous/CloseTab';

const Leaderboard = () => {
  const flexBg = useColorModeValue('whitesmoke', 'dimgray');
  const textColor = useColorModeValue('gray.500', 'whitesmoke');
  const allTeams = useRecoilValue(allTeamsState);
  const { isAllTeamsLoading } = getAllTeams();

  const sortedTeams = [...allTeams].sort((a, b) => b.points - a.points);
  const topTeams = sortedTeams.slice(0, 5);
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
      <Box textAlign={isDesktop ? 'left' : 'center'}>
        {isAllTeamsLoading ? (
          <Spinner />
        ) : (
          <Heading
            fontSize={isDesktop ? '1.8rem' : '2.5rem'}
            mb={2}
            color={textColor}
          >
            Parhaat joukkueet
          </Heading>
        )}
      </Box>
      {topTeams.map((team, index) => (
        <Box key={team.id} mb={2}>
          <Heading fontSize={isDesktop ? '1.2rem' : '1.9rem'} color={textColor}>
            {index + 1}. {team.name}
          </Heading>
          <Box fontSize={isDesktop ? '1.2rem' : '1.9rem'} color={textColor}>
            {team.points} pistettä
          </Box>
        </Box>
      ))}
      {isDesktop ? <ToHome /> : null}
    </Box>
  );
};

export default Leaderboard;
