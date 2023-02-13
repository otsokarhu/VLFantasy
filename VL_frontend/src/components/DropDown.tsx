import { Box } from '@chakra-ui/react';
import InfoPage from './InfoBox';
import Loginform from './LoginBox';
import Signup from './SignUpBox';
import DropDownElement from './DropDownElement';

const DropDown = () => {
  return (
    <Box right={0} position={'absolute'}>
      <DropDownElement component={<InfoPage />} name={'info'} />
      <DropDownElement component={<Loginform />} name={'login'} />
      <DropDownElement component={<Signup />} name={'signup'} />
    </Box>
  );
};

export default DropDown;
