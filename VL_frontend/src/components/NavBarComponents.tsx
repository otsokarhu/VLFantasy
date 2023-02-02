import { BreadcrumbLink, Button, Icon } from '@chakra-ui/react';
import { HomeRounded } from '@mui/icons-material';
import { Link, Route, Routes } from 'react-router-dom';
import InfoPage from './InfoPage';
import Loginform from './Login';
import Signup from './SignUpForm';

export const NavBarHome = () => {
  return (
    <BreadcrumbLink as={Link} href="/" to="/">
      <Button variant={'icon'}>
        <Icon as={HomeRounded} boxSize={31} />
      </Button>
    </BreadcrumbLink>
  );
};

export const NavBarInfo = () => {
  return (
    <BreadcrumbLink as={Link} href="/info" to="/info">
      Tietoja
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

export const NavBarLogin = () => {
  return (
    <BreadcrumbLink as={Link} href="/login" to="/login">
      Kirjaudu sisään
    </BreadcrumbLink>
  );
};

export const NavBarSignUp = () => {
  return (
    <BreadcrumbLink as={Link} href="/signup" to="/signup">
      Rekisteröidy
    </BreadcrumbLink>
  );
};

export const NavBarRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Loginform />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={''} />
      <Route path="/info" element={<InfoPage />} />
      <Route path="/teamPage" element={''} />
    </Routes>
  );
};
