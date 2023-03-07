import { Box, useMediaQuery } from '@chakra-ui/react';
import InfoPage from '../Info';
import Login from '../Login';
import Signup from '../Signup';
import Leaderboard from '../Leaderboard';
import DropDownElement from './DropDownElement';
import DropDownElementMobile from './DropDownElementMobile';
import Scoring from '../Scoring';

const DropDown = () => {
  const [isLargerThanMobile] = useMediaQuery('(min-width: 950px)');
  return (
    <>
      {isLargerThanMobile ? (
        <Box zIndex={10} top={'50px'} position={'sticky'}>
          <Box right={0} position={'absolute'}>
            <DropDownElement component={<InfoPage />} name={'info'} />
            <DropDownElement component={<Scoring />} name={'scoring'} />
            <DropDownElement component={<Login />} name={'login'} />
            <DropDownElement component={<Signup />} name={'signup'} />
            <DropDownElement component={<Leaderboard />} name={'leaderboard'} />
          </Box>
        </Box>
      ) : (
        <Box zIndex={10} top={'60px'} position={'absolute'} left={'0'}>
          <DropDownElementMobile component={<InfoPage />} name={'info'} />
          <DropDownElementMobile component={<Scoring />} name={'scoring'} />
          <DropDownElementMobile component={<Login />} name={'login'} />
          <DropDownElementMobile component={<Signup />} name={'signup'} />
          <DropDownElementMobile
            component={<Leaderboard />}
            name={'leaderboard'}
          />
        </Box>
      )}
    </>
  );
};

export default DropDown;
