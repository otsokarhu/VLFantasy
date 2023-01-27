import RunnerCard from './RunnerCard';
import { Grid } from '@chakra-ui/react';

const RunnerPage = () => {
  return (
    <Grid templateColumns="repeat(10, 1fr)" gap={6}>
      <RunnerCard
        team="Koovee"
        runnerPhoto="https://eventor.orienteering.org/MyPages/ProfilePhoto/16281"
        runner="Lauri Sild"
        teamPhoto="https://koovee.fi/wp-content/uploads/2021/11/Koovee_nykyinen_logo.png"
        price={56}
        points={34}
      />

      <RunnerCard
        team="Eesti Mehed"
        runnerPhoto="https://media.licdn.com/dms/image/C5603AQFPUTupbQo3Xg/profile-displayphoto-shrink_800_800/0/1643144817776?e=2147483647&v=beta&t=7YWVBYLXgiX-CbGpYRyOaDC8FPLrx8kCR91VMZuSxPM"
        runner="Oskar Nuottonen"
        teamPhoto="https://preview.redd.it/78fk76tswjs21.jpg?auto=webp&s=fbe23d1a5102b359a76ab510225ed665bf26b8ad"
        price={100}
        points={-130}
      />
    </Grid>
  );
};

export default RunnerPage;
