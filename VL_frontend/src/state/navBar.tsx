import { atom } from 'recoil';

export const navBarState = atom<string>({
  key: 'navBarState',
  default: 'default',
});
