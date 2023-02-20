import { atom } from 'recoil';
import { Runner } from '../types';

export const allRunnersState = atom<Runner[]>({
  key: 'allRunnersState',
  default: [],
});

export const runnerOrderState = atom<string>({
  key: 'runnerOrderState',
  default: 'points',
});

export const runnerFilterState = atom<string>({
  key: 'runnerFilterState',
  default: '',
});

export const renderAllRunnersState = atom<boolean>({
  key: 'renderAllRunnersState',
  default: false,
});
