import { IconButton, Link } from '@chakra-ui/react';
import { ChevronUpIcon } from '@chakra-ui/icons';
import { useSetRecoilState } from 'recoil';
import { navBarState } from '../state/navBar';

const ToHome = () => {
  const setNavBar = useSetRecoilState(navBarState);
  const handleHome = () => {
    setNavBar('default');
  };

  return (
    <Link onClick={handleHome}>
      <IconButton
        opacity={0.9}
        aria-label="Close tab"
        icon={<ChevronUpIcon boxSize={6} />}
      />
    </Link>
  );
};

export default ToHome;
