import RunnerCard from './RunnerCard';
import { Grid } from '@chakra-ui/react';
import { getAllRunners } from '../services/runnerService';

const RunnerPage = () => {
  const { runners, isError } = getAllRunners();

  if (isError) {
    return <div>Error</div>;
  }

  if (!runners) {
    return <div>Loading...</div>;
  }

  return (
    <Grid templateColumns="repeat(10, 1fr)" gap={6}>
      {runners.map((runner) => (
        <RunnerCard
          key={runner.name}
          runner={runner.name}
          runnerPhoto={runner.runnerPhoto}
          price={runner.price}
          points={runner.points}
          team={runner.team}
          teamPhoto={`${runner.team}.png`}
        />
      ))}
    </Grid>
  );
};

export default RunnerPage;
