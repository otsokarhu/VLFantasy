/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbItem,
  Flex,
  Center,
  Icon,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { HomeRounded } from '@mui/icons-material';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Loginform from './login';
import Signup from './signUpForm';

const NavigationBar = () => {
  return (
    <Router>
      <Flex
        pos="sticky"
        top={0}
        w="100%"
        h="50px"
        bgColor={'whitesmoke'}
        opacity={0.9}
      >
        <Center w="100%">
          <Breadcrumb
            fontFamily={
              'Courier New, Courier, Lucida Sans Typewriter, Lucida Typewriter, monospace'
            }
            fontSize={25}
            alignItems="center"
            spacing="8px"
            separator={<ChevronRightIcon color="gray.500" />}
          >
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <Icon as={HomeRounded} boxSize={31} />
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href="#">Tietoja</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href="/signup">Rekisteröidy</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink as={Link} href="/login" to="/login">
                Kirjaudu
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Center>
        <Routes>
          <Route path="/login" element={<Loginform />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Flex>
    </Router>
  );
};

export default NavigationBar;
