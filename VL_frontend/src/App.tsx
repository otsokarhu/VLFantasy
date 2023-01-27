import { Box } from '@chakra-ui/react';
import NavigationBar from './components/NavigationBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import TeamPage from './components/TeamPage';
import { getAllUsers } from './services/userService';

const App = () => {
  const { users, isError } = getAllUsers();

  return (
    <Router>
      <Box
        pos="relative"
        h="100vh"
        bgImg="url(VLfantasyBG.jpg)"
        bgSize={'cover'}
      >
        <NavigationBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teamPage" element={<TeamPage />} />
          <Route path="/login" element={''} />
          <Route path="/signup" element={''} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;
