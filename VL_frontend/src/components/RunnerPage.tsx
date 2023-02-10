/* eslint-disable @typescript-eslint/no-unused-vars */
import RunnerCard from './RunnerCard';
import { Grid } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { allRunnersState, runnerOrderState } from '../state/runners';

const RunnerPage = () => {
  const allRunners = useRecoilValue(allRunnersState);
  const order = useRecoilValue(runnerOrderState);

  const sortedRunners = [...allRunners];
  if (order === 'points') {
    sortedRunners.sort((a, b) => b.points - a.points);
  } else if (order === 'price') {
    sortedRunners.sort((a, b) => b.price - a.price);
  } else {
    sortedRunners.sort((a, b) => {
      const [_firstNameA, lastNameA] = a.name.split(' ');
      const [_firstNameB, lastNameB] = b.name.split(' ');
      return lastNameA.localeCompare(lastNameB);
    });
  }
  return (
    <Grid templateColumns="repeat(6, 1fr)" gap={6}>
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
