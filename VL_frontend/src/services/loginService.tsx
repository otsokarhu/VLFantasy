import axios from 'axios';
import { LoginResponse } from '../types';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

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
