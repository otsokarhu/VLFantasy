import RunnerCard from './SingleRunner';
import { Grid } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { allRunnersState, runnerOrderState } from '../../state/runners';

const RunnerPage = () => {
  const allRunners = useRecoilValue(allRunnersState);
  const order = useRecoilValue(runnerOrderState);

  const sortedRunners = [...allRunners];
  if (order === 'points') {
    sortedRunners.sort((a, b) => b.points - a.points);
  } else if (order === 'price') {
    sortedRunners.sort((a, b) => b.price - a.price);
  } else if (order === 'team') {
    sortedRunners.sort((a, b) => a.team.localeCompare(b.team));
  } else {
    sortedRunners.sort((a, b) => {
      const [, lastNameA] = a.name.split(' ');
      const [, lastNameB] = b.name.split(' ');
      return lastNameA.localeCompare(lastNameB);
    });
  }
  return (
    <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
      {sortedRunners.map((runner) => (
        <RunnerCard
          key={runner.id}
          blur={runner.selected ? true : false}
          runner={runner.name}
          runnerPhoto={runner.runnerPhoto}
          price={runner.price}
          points={runner.points}
          team={runner.team}
          teamPhoto={`${runner.team}.png`}
          id={runner.id}
          displayDelete={false}
          dbRunners={allRunners}
        />
      ))}
    </Grid>
  );
};

export default RunnerPage;
