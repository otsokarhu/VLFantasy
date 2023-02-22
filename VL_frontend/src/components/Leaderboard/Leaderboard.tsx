import { Box, Heading, Spinner, useColorModeValue } from '@chakra-ui/react';
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
      zIndex={1}
    >
      {isAllTeamsLoading ? (
        <Spinner />
      ) : (
        <Heading size={'md'} mb={2} color={textColor}>
          Parhaat joukkueet
        </Heading>
      )}
      {topTeams.map((team, index) => (
        <Box key={team.id} mb={2}>
          <Heading size={'sm'} color={textColor}>
            {index + 1}. {team.name}
          </Heading>
          <Box fontSize={'sm'} color={textColor}>
            {team.points} pistettä
          </Box>
        </Box>
      ))}
      <ToHome />
    </Box>
  );
};

export default Leaderboard;
