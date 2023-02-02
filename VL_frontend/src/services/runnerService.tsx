import useSWR from 'swr';
import { Runner } from '../types';
import { fetcher } from '../constants';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const getAllRunners = () => {
  const { data, error, isLoading } = useSWR<Runner[], Error>(
    `${apiBaseUrl}/runners`,
    fetcher
  );

  const isRunnersLoading = isLoading;

  return {
    runners: data,
    isError: error,
    isRunnersLoading,
  };
};

export const getRunner = (id: string) => {
  const { data, error, isLoading } = useSWR<Runner, Error>(
    `${apiBaseUrl}/runners/${id}`,
    fetcher
  );

  if (isLoading) {
    return {
      runner: null,
      isError: false,
    };
  }

  return {
    runner: data,
    isError: error,
  };
};
