import { atom } from 'recoil';
import { FantasyTeam } from '../types';

export const teamState = atom<Omit<FantasyTeam, 'user'>>({
  key: 'fantasyTeamState',
  default: {
    name: '',
    runners: [],
    id: '',
    points: 0,
  },
});
