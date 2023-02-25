import { Box } from '@chakra-ui/react';
import InfoPage from '../Info';
import Login from '../Login';
import Signup from '../Signup';
import Leaderboard from '../Leaderboard';
import DropDownElement from './DropDownElement';
import Scoring from '../Scoring';

const DropDown = () => {
  return (
    <Box zIndex={10} top={'50px'} position={'sticky'}>
      <Box right={0} position={'absolute'}>
        <DropDownElement component={<InfoPage />} name={'info'} />
        <DropDownElement component={<Scoring />} name={'scoring'} />
        <DropDownElement component={<Login />} name={'login'} />
        <DropDownElement component={<Signup />} name={'signup'} />
        <DropDownElement component={<Leaderboard />} name={'leaderboard'} />
      </Box>
    </Box>
  );
};

export default DropDown;
