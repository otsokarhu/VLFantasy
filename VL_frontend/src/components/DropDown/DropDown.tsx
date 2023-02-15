import { Box } from '@chakra-ui/react';
import InfoPage from '../Info';
import Login from '../Login';
import Signup from '../Signup';
import DropDownElement from './DropDownElement';

const DropDown = () => {
  return (
    <Box right={0} position={'absolute'}>
      <DropDownElement component={<InfoPage />} name={'info'} />
      <DropDownElement component={<Login />} name={'login'} />
      <DropDownElement component={<Signup />} name={'signup'} />
    </Box>
  );
};

export default DropDown;
