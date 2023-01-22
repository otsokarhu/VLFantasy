import { Center, Stack } from '@chakra-ui/react';
import React from 'react';
import CreateTeamCard from './createTeamCard';
import ViestiLiigaCard from './viestiLiigaCard';

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
