import { Link as RouterLink } from 'react-router-dom';
import { IconButton, Link } from '@chakra-ui/react';
import { ArrowRightIcon } from '@chakra-ui/icons';
import { useSetRecoilState } from 'recoil';
import { navBarState } from '../state/navBar';

const ToHome = () => {
  const setNavBar = useSetRecoilState(navBarState);
  const handleHome = () => {
    setNavBar('default');
  };

  return (
    <Link as={RouterLink} href="/" to="/" onClick={handleHome}>
      <IconButton aria-label="Close tab" icon={<ArrowRightIcon />} />
    </Link>
  );
};

export default ToHome;
