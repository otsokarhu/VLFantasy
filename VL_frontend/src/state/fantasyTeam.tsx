import { atom } from 'recoil';
import { Runner } from '../types';

export const teamState = atom({
  key: 'fantasyTeamState',
  default: {
    teamName: '',
    points: 0,
    runners: [] as Runner[],
    id: '',
  },
});
