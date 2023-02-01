import { Grid } from '@chakra-ui/react';

import { useRecoilValue } from 'recoil';
import { teamState } from '../state/fantasyTeam';
import RunnerCard from './RunnerCard';
import { allRunnersState } from '../state/runners';

const UserTeam = () => {
  const allRunners = useRecoilValue(allRunnersState);

  const team = useRecoilValue(teamState);

  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={6}>
      {team.runners.map(
        (runner) =>
          allRunners.find((r) => r.id === runner) && (
            <RunnerCard
              key={runner}
              blur={false}
              runner={allRunners.find((r) => r.id === runner)?.name}
              runnerPhoto={allRunners.find((r) => r.id === runner)?.runnerPhoto}
              price={allRunners.find((r) => r.id === runner)?.price}
              points={allRunners.find((r) => r.id === runner)?.points}
              team={allRunners.find((r) => r.id === runner)?.team}
              teamPhoto={`${allRunners.find((r) => r.id === runner)?.team}.png`}
              id={runner}
              displayDelete={true}
              dbRunners={allRunners}
            />
          )
      )}
    </Grid>
  );
};

export default UserTeam;
