import { Box, Center, Stack, useMediaQuery } from '@chakra-ui/react';
import CreateTeamCard from './ToTeamPageCard';

import ViestiLiigaCard from './ViestiLiigaCard';

const Home = () => {
  const [isDesktop] = useMediaQuery('(min-width: 62em)');

  return (
    <Box>
      <Center h={'90vh'}>
        <Stack direction={isDesktop ? 'row' : 'column'} align={'center'}>
          <CreateTeamCard />
          <ViestiLiigaCard />
        </Stack>
      </Center>
    </Box>
  );
};

export default Home;
