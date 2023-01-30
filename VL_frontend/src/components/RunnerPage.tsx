import RunnerCard from './RunnerCard';
import { Grid } from '@chakra-ui/react';
import { getAllRunners } from '../services/runnerService';

const RunnerPage = () => {
  const { runners, isError } = getAllRunners();
  console.log(runners);

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
          key={runner.id}
          runner={runner.name}
          runnerPhoto={runner.runnerPhoto}
          price={runner.price}
          points={runner.points}
          team={runner.team}
          teamPhoto={`${runner.team}.png`}
          id={runner.id}
        />
      ))}
    </Grid>
  );
};

export default RunnerPage;
