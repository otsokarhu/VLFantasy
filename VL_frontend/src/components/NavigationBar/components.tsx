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

type NavBarToProps = {
  handleToClick: (to: string) => void;
  text: string;
  to: string;
};

type HandleClickProps = {
  text: string;
  setNavBar: (text: string) => void;
  navBar: string;
};

export const NavBarLogOut = ({ handleLogOut }: NavBarLogOutProps) => {
  return (
    <BreadcrumbLink onClick={handleLogOut} as={Link} href="/" to="/">
      Kirjaudu ulos
    </BreadcrumbLink>
  );
};

export const NavBarLogOutMobile = ({ handleLogOut }: NavBarLogOutProps) => {
  return (
    <Button onClick={handleLogOut} variant={'ghost'} as={Link} to="/">
      Kirjaudu ulos
    </Button>
  );
};

export const NavBarElement = ({ handleToClick, text, to }: NavBarToProps) => {
  return (
    <BreadcrumbLink onClick={() => handleToClick(to)}>{text}</BreadcrumbLink>
  );
};

export const NavBarElementMobile = ({
  handleToClick,
  text,
  to,
}: NavBarToProps) => {
  return (
    <Button onClick={() => handleToClick(to)} variant={'ghost'}>
      {text}
    </Button>
  );
};

export const HandleToClick = ({
  text,
  setNavBar,
  navBar,
}: HandleClickProps) => {
  if (navBar === text) {
    setNavBar('default');
  } else {
    setNavBar(text);
  }
};
