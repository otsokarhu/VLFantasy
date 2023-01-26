import axios from 'axios';
import { apiBaseUrl } from '../constants';

interface LoginResponse {
  token: string;
  username: string;
  name: string;
}

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
