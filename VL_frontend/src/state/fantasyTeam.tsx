import { atom } from 'recoil';

export const teamState = atom({
  key: 'fantasyTeamState',
  default: {
    teamName: '',
    points: 0,
    runners: [],
  },
});
