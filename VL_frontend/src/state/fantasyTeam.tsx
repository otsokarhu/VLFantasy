import { atom } from 'recoil';

export const teamState = atom({
  key: 'fantasyTeamState',
  default: {
    name: '',
    runners: [],
    id: '',
    points: 0,
  },
});
