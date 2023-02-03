import { useResetRecoilState } from 'recoil';
import { teamState } from '../state/fantasyTeam';
import { allRunnersState } from '../state/runners';
import { userState } from '../state/user';

export const getError = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return String(error);
};

export const handleLogOut = () => {
  window.localStorage.removeItem('loggedVLUser');
  window.localStorage.removeItem('loggedFantasyTeam');
  useResetRecoilState(userState);
  useResetRecoilState(teamState);
  useResetRecoilState(allRunnersState);
};
