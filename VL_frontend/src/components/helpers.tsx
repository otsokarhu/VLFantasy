import { Link as RouterLink } from 'react-router-dom';
import { IconButton, Link } from '@chakra-ui/react';
import { ArrowRightIcon } from '@chakra-ui/icons';

const ToHome = () => {
  return (
    <Link as={RouterLink} href="/" to="/">
      <IconButton aria-label="Close tab" icon={<ArrowRightIcon />} />
    </Link>
  );
};

export default ToHome;
