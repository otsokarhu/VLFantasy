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

export const getRunner = (id: string) => {
  const { data, error } = useSWR<Runner, Error>(
    `${apiBaseUrl}/runners/${id}`,
    fetcher
  );
  return {
    runner: data,
    isError: error,
  };
};
