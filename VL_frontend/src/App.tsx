import { Box } from '@chakra-ui/react';
import NavigationBar from './components/NavigationBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import TeamPage from './components/TeamPage';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { tokenState, userState } from './state/user';
import { useEffect } from 'react';
import { LoginResponse } from './types';
import { teamState } from './state/fantasyTeam';
import { getFantasyTeam } from './services/fantasyTeamService';
import { getAllRunners } from './services/runnerService';
import { allRunnersState } from './state/runners';

const App = () => {
  const [user, setUser] = useRecoilState(userState);
  const setToken = useSetRecoilState(tokenState);
  const setTeam = useSetRecoilState(teamState);
  const setAllRunners = useSetRecoilState(allRunnersState);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedVLUser');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser) as LoginResponse;
      setUser(foundUser);
      setToken(foundUser.token);
      setTeam((prev) => ({ ...prev, id: foundUser.fantasyTeam }));
    }
  }, [setUser, setToken, setTeam]);

  const { dbTeam } = getFantasyTeam(user.fantasyTeam);

  useEffect(() => {
    if (dbTeam) {
      setTeam(dbTeam);
    }
  }, [dbTeam, setTeam]);

  const { runners } = getAllRunners();

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedVLUser');
    if (loggedInUser && runners && dbTeam) {
      runners.map((runner) => {
        if (dbTeam.runners.includes(runner.id)) {
          const r = { ...runner, selected: true };
          setAllRunners((prev) => [...prev, r]);
        } else {
          const r = { ...runner, selected: false };
          setAllRunners((prev) => [...prev, r]);
        }
      });
    }
  }, [dbTeam, setAllRunners]);

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
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;
