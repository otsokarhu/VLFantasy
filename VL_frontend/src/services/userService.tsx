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

export const getUser = (id: string) => {
  if (!id) {
    return {
      user: null,
      isError: false,
    };
  }
  const { data, error } = useSWR<User, Error>(
    `${apiBaseUrl}/VLusers/${id}`,
    fetcher
  );
  return {
    user: data,
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

let token;

export const setToken = (newToken: string) => {
  token = `bearer ${newToken}`;
};
