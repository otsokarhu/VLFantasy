import useSWR from 'swr';
import { RegistrationResponse, User } from '../types';
import { fetcher } from '../constants';
import axios from 'axios';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

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
    user: data as User,
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
