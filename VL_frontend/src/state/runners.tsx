import { atom } from 'recoil';
import { Runner } from '../types';

export const allRunnersState = atom<Runner[]>({
  key: 'allRunnersState',
  default: [],
});
