import { Box, useMediaQuery } from '@chakra-ui/react';
import { NavigationBar, NavigationBarMobile } from './components/NavigationBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import TeamPage from './components/TeamPage';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { tokenState, userState } from './state/user';
import { useEffect } from 'react';
import { LoginResponse } from './types';
import { teamState, allTeamsState } from './state/fantasyTeam';
import { getFantasyTeam, getAllTeams } from './services/fantasyTeamService';
import { getAllRunners } from './services/runnerService';
import { allRunnersState } from './state/runners';
import DropDown from './components/DropDown';

const App = () => {
  const [user, setUser] = useRecoilState(userState);
  const setToken = useSetRecoilState(tokenState);
  const setTeam = useSetRecoilState(teamState);
  const setAllTeams = useSetRecoilState(allTeamsState);
  const [allRunners, setAllRunners] = useRecoilState(allRunnersState);
  const { dbTeam, isLoading } = getFantasyTeam(user.fantasyTeam);
  const { runners, isRunnersLoading } = getAllRunners();
  const { allTeams, isAllTeamsLoading } = getAllTeams();
  const [isDesktop] = useMediaQuery('(min-width: 62em)');

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
    if (!isAllTeamsLoading) {
      if (allTeams) {
        setAllTeams(allTeams);
      }
    }
  }, [allTeams, setAllTeams, isAllTeamsLoading]);

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
        bgImg={'url(bgImage.webp)'}
        bgSize={'cover'}
        bgAttachment={'fixed'}
        opacity={0.95}
      >
        {isDesktop ? <NavigationBar /> : <NavigationBarMobile />}
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
