import RunnerCard from './SingleRunner';
import { Grid } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import {
  allRunnersState,
  runnerFilterState,
  runnerOrderState,
} from '../../state/runners';
import { useMemo } from 'react';

const RunnerPage = () => {
  const allRunners = useRecoilValue(allRunnersState);
  const order = useRecoilValue(runnerOrderState);
  const filter = useRecoilValue(runnerFilterState);

  const filteredRunners = useMemo(() => {
    if (filter === '') {
      return allRunners;
    } else {
      const filterLower = filter.toLowerCase();
      return allRunners.filter(
        ({ name, team }) =>
          name.toLowerCase().includes(filterLower) ||
          team.toLowerCase().includes(filterLower)
      );
    }
  }, [allRunners, filter]);

  const sortedRunners = useMemo(() => {
    const sorted = [...filteredRunners];
    if (order === 'points') {
      sorted.sort((a, b) => b.points - a.points);
    } else if (order === 'price') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (order === 'team') {
      sorted.sort((a, b) => a.team.localeCompare(b.team));
    } else {
      sorted.sort((a, b) => {
        const [, lastNameA] = a.name.split(' ');
        const [, lastNameB] = b.name.split(' ');
        return lastNameA.localeCompare(lastNameB);
      });
    }
    return sorted;
  }, [filteredRunners, order]);

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
          teamPhoto={`${runner.team}.webp`}
          id={runner.id}
          displayDelete={false}
          dbRunners={allRunners}
        />
      ))}
    </Grid>
  );
};

export default RunnerPage;
