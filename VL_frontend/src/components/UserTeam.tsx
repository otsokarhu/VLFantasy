import RunnerInTeamCard from './RunnerInTeamCard';
import { Grid } from '@chakra-ui/react';
import { getAllRunners } from '../services/runnerService';
import { useRecoilValue } from 'recoil';
import { teamState } from '../state/fantasyTeam';

const UserTeam = () => {
  const { runners, isError } = getAllRunners();
  const team = useRecoilValue(teamState);

  if (isError) {
    return <div>Error</div>;
  }

  if (!runners) {
    return <div>Loading...</div>;
  }

  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={6}>
      {team.runners.map(
        (runner) =>
          runners.find((r) => r.id === runner) && (
            <RunnerInTeamCard
              key={runner}
              runner={runners.find((r) => r.id === runner)?.name}
              runnerPhoto={runners.find((r) => r.id === runner)?.runnerPhoto}
              price={runners.find((r) => r.id === runner)?.price}
              points={runners.find((r) => r.id === runner)?.points}
              team={runners.find((r) => r.id === runner)?.team}
              teamPhoto={`${runners.find((r) => r.id === runner)?.team}.png`}
              id={runner}
            />
          )
      )}
    </Grid>
  );
};

export default UserTeam;
