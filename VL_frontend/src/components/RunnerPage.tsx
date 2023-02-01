import RunnerCard from './RunnerCard';
import { Grid } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { allRunnersState } from '../state/runners';

const RunnerPage = () => {
  const allRunners = useRecoilValue(allRunnersState);
  console.log(allRunners);

  return (
    <Grid templateColumns="repeat(10, 1fr)" gap={6}>
      {allRunners.map((runner) => (
        <RunnerCard
          key={runner.id}
          blur={runner.blur}
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
