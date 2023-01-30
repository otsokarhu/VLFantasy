import { Center, Stack } from '@chakra-ui/react';
import CreateTeamCard from './CreateTeamCard';
import ViestiLiigaCard from './ViestiLiigaCard';

const Home = () => {
  return (
    <Center h="90vh">
      <Stack direction={'row'} align={'center'}>
        <CreateTeamCard />
        <ViestiLiigaCard />
      </Stack>
    </Center>
  );
};

export default Home;
