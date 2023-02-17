import { Grid } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { teamState } from '../../state/fantasyTeam';
import RunnerCard from './SingleRunner';
import { allRunnersState } from '../../state/runners';
import EmptyRunnerCard from './EmptyRunner';

const UserTeam = () => {
  const allRunners = useRecoilValue(allRunnersState);
  const team = useRecoilValue(teamState);

  const emptySlots = Array.from(
    { length: 5 - team.runners.length },
    (v, i) => i
  );

  const fullTeam = team.runners.map((runner) => {
    const foundRunner = allRunners.find((r) => r.id === runner);
    return foundRunner;
  });

  return (
    <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
      {fullTeam.map(
        (runner) =>
          runner && (
            <RunnerCard
              key={runner.id}
              blur={false}
              runner={runner.name}
              runnerPhoto={runner.runnerPhoto}
              price={runner.price}
              points={runner.points}
              team={runner.team}
              teamPhoto={`${runner.team}.webp`}
              id={runner.id}
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
