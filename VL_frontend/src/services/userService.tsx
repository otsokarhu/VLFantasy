import useSWR from 'swr';
import { RegistrationResponse, User } from '../types';
import { apiBaseUrl, fetcher } from '../constants';
import axios from 'axios';

export const getAllUsers = () => {
  const { data, error } = useSWR<User[], Error>(
    `${apiBaseUrl}/VLusers`,
    fetcher
  );
  return {
    users: data,
    isError: error,
  };
};

export const createUser = async (
  username: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  const name = `${firstName} ${lastName}`;
  console.log('name', name);
  console.log('username', username);
  console.log('password', password);
  console.log('email', email);
  try {
    const response = await axios.post<RegistrationResponse>(
      `${apiBaseUrl}/VLusers`,
      {
        username,
        name,
        password,
        email,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
