import { BreadcrumbLink, Button, Icon } from '@chakra-ui/react';
import { HomeRounded } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export const NavBarHome = () => {
  return (
    <BreadcrumbLink as={Link} href="/" to="/">
      <Button aria-label="HomeButton" variant={'icon'}>
        <Icon as={HomeRounded} boxSize={31} />
      </Button>
    </BreadcrumbLink>
  );
};

type NavBarLogOutProps = {
  handleLogOut: () => void;
};

export const NavBarLogOut = ({ handleLogOut }: NavBarLogOutProps) => {
  return (
    <BreadcrumbLink onClick={handleLogOut} as={Link} href="/" to="/">
      Kirjaudu ulos
    </BreadcrumbLink>
  );
};
