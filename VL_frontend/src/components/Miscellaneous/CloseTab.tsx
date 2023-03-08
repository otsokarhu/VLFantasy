import { IconButton, Link, useMediaQuery } from '@chakra-ui/react';
import { ChevronUpIcon, CloseIcon } from '@chakra-ui/icons';
import { useSetRecoilState } from 'recoil';
import { navBarState } from '../../state/navBar';

const CloseTab = () => {
  const setNavBar = useSetRecoilState(navBarState);
  const handleHome = () => {
    setNavBar('default');
  };

  const [isDesktop] = useMediaQuery('(min-width: 62em)');

  return (
    <Link onClick={handleHome}>
      <IconButton
        opacity={0.9}
        aria-label="Close tab"
        variant={'icon'}
        icon={isDesktop ? <ChevronUpIcon boxSize={6} /> : <CloseIcon />}
        zIndex={1}
      />
    </Link>
  );
};

export default CloseTab;
