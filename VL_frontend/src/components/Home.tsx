import { Box, Center, Collapse, Stack } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { navBarState } from '../state/navBar';
import CreateTeamCard from './CreateTeamCard';
import InfoPage from './InfoBox';
import Loginform from './LoginBox';
import Signup from './SignUpBox';
import ViestiLiigaCard from './ViestiLiigaCard';

const Home = () => {
  const navBar = useRecoilValue(navBarState);

  const infoIsOpen = () => {
    if (navBar === 'info') {
      return true;
    } else {
      return false;
    }
  };

  const loginIsOpen = () => {
    if (navBar === 'login') {
      return true;
    } else {
      return false;
    }
  };

  const signupIsOpen = () => {
    if (navBar === 'signup') {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Box>
      <Box right={0} position={'absolute'}>
        <Collapse in={infoIsOpen()} animateOpacity>
          <InfoPage />
        </Collapse>
        <Collapse in={loginIsOpen()} animateOpacity>
          <Loginform />
        </Collapse>
        <Collapse in={signupIsOpen()} animateOpacity>
          <Signup />
        </Collapse>
      </Box>
      <Center h="90vh">
        <Stack direction={'row'} align={'center'}>
          <CreateTeamCard />
          <ViestiLiigaCard />
        </Stack>
      </Center>
    </Box>
  );
};

export default Home;
