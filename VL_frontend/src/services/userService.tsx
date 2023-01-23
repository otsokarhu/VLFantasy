import useSWR from 'swr';
import { User } from '../types';
import { apiBaseUrl, fetcher } from '../constants';

export const getAllUsers = () => {
  const { data, error } = useSWR<User[], Error>(`${apiBaseUrl}/VLusers`, fetcher);
  return {
    users: data,
    isError: error
  };
};