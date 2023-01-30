import { atom } from 'recoil';

export const userState = atom({
  key: 'userIdState',
  default: {
    id: '',
    name: '',
    email: '',
    username: '',
    fantasyTeam: '',
  },
});

export const tokenState = atom({
  key: 'tokenState',
  default: '',
});
