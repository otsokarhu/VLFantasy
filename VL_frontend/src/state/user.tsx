import { atom } from 'recoil';

export const userState = atom({
  key: 'userIdState',
  default: '',
});

export const tokenState = atom({
  key: 'tokenState',
  default: '',
});
