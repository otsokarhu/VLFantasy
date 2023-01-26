import useSWR from 'swr';
import { Runner } from '../types';
import { apiBaseUrl, fetcher } from '../constants';

export const getAllRunners = () => {
  const { data, error } = useSWR<Runner[], Error>(
    `${apiBaseUrl}/runners`,
    fetcher
  );
  return {
    runners: data,
    isError: error,
  };
};
