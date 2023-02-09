/* eslint-disable @typescript-eslint/no-unused-vars */
import RunnerCard from './RunnerCard';
import { Grid } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { allRunnersState, runnerOrderState } from '../state/runners';

const RunnerPage = () => {
  const allRunners = useRecoilValue(allRunnersState);
  const order = useRecoilValue(runnerOrderState);

  if (order === 'points') {
    return (
      <Grid templateColumns="repeat(6, 1fr)" gap={6}>
        {[...allRunners]
          .sort((a, b) => b.points - a.points)
          .map((runner) => (
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
  }
  if (order === 'price') {
    return (
      <Grid templateColumns="repeat(6, 1fr)" gap={6}>
        {[...allRunners]
          .sort((a, b) => b.price - a.price)
          .map((runner) => (
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
  } else {
    return (
      <Grid templateColumns="repeat(6, 1fr)" gap={6}>
        {[...allRunners]
          .sort((a, b) => {
            const [_firstNameA, lastNameA] = a.name.split(' ');
            const [_firstNameB, lastNameB] = b.name.split(' ');
            return lastNameA.localeCompare(lastNameB);
          })
          .map((runner) => (
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
  }
};

export default RunnerPage;
