import axios from 'axios';
import { LoginResponse } from '../types';
import { VITE_API_BASE_URL } from '../utils/config';
const apiBaseUrl = VITE_API_BASE_URL;

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post<LoginResponse>(`${apiBaseUrl}/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
