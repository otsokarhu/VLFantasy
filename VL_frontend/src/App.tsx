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
  const [allRunners, setAllRunners] = useRecoilState(allRunnersState);
  const { dbTeam, isLoading } = getFantasyTeam(user.fantasyTeam);
  const { runners, isRunnersLoading } = getAllRunners();

  console.log(user.fantasyTeam);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedVLUser');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser) as LoginResponse;
      setUser(foundUser);
      setToken(foundUser.token);
      setTeam((prev) => ({ ...prev, id: foundUser.fantasyTeam }));
    }
  }, [setUser, setToken]);

  useEffect(() => {
    if (!isLoading) {
      if (dbTeam) {
        setTeam(dbTeam);
      }
    }
  }, [dbTeam, setTeam, isLoading]);

  console.log(dbTeam);

  useEffect(() => {
    if (!isRunnersLoading && !isLoading) {
      if (user.id !== '' && runners && allRunners.length === 0) {
        if (dbTeam) {
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

  console.log(allRunners);

  return (
    <Router>
      <Box
        pos="relative"
        minH="100vh"
        bgImg="url(VLfantasyBG.jpg)"
        bgSize="cover"
        bgRepeat="no-repeat"
        bg-attachment="fixed"
      >
        <NavigationBar />

        <Routes>
          <Route path="*" element={<Home />} />
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
