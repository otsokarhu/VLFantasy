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
import DropDown from './components/DropDown';

const App = () => {
  const [user, setUser] = useRecoilState(userState);
  const setToken = useSetRecoilState(tokenState);
  const setTeam = useSetRecoilState(teamState);
  const [allRunners, setAllRunners] = useRecoilState(allRunnersState);
  const { dbTeam, isLoading } = getFantasyTeam(user.fantasyTeam);
  const { runners, isRunnersLoading } = getAllRunners();

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedVLUser');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser) as LoginResponse;
      setUser(foundUser);
      setToken(foundUser.token);
      setTeam((prev) => ({ ...prev, id: foundUser.fantasyTeam }));
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (dbTeam) {
        if (dbTeam.runners) {
          setTeam(dbTeam);
        }
      }
    }
  }, [dbTeam, setTeam, isLoading]);

  useEffect(() => {
    if (!isRunnersLoading && !isLoading) {
      if (user.id !== '' && runners && allRunners.length === 0) {
        if (dbTeam?.runners) {
          runners.map((runner) => {
            if (dbTeam.runners.includes(runner.id)) {
              const r = { ...runner, selected: true };
              setAllRunners((prev) => [...prev, r]);
            } else {
              const r = { ...runner, selected: false };
              setAllRunners((prev) => [...prev, r]);
            }
          });
        } else {
          runners.map((runner) => {
            const r = { ...runner, selected: false };
            setAllRunners((prev) => [...prev, r]);
          });
        }
      }
    }
  }, [dbTeam, setAllRunners, isRunnersLoading, isLoading]);

  return (
    <Router>
      <Box
        pos={'relative'}
        minH={'100vh'}
        bgImg={'url(VLfantasyBG.jpg)'}
        bgSize={'cover'}
        bg-attachment={'fixed'}
        opacity={0.95}
      >
        <NavigationBar />
        <DropDown />
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/teamPage" element={<TeamPage />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;
