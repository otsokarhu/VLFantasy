import { Grid } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { teamState } from '../../state/fantasyTeam';
import RunnerCard from './SingleRunner';
import { allRunnersState } from '../../state/runners';
import EmptyRunnerCard from './EmptyRunner';

const UserTeam = () => {
  const allRunners = useRecoilValue(allRunnersState);

  const team = useRecoilValue(teamState);
  console.log(team);

  const emptySlots = Array.from(
    { length: 5 - team.runners.length },
    (v, i) => i
  );

  return (
    <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
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
      {emptySlots.map((i) => (
        <EmptyRunnerCard key={i} />
      ))}
    </Grid>
  );
};

export default UserTeam;
