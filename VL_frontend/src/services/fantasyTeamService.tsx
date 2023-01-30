import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { FantasyTeam } from '../types';

export const createFantasyTeam = async (
  name: string,
  user: string,
  token: string
) => {
  try {
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };
    await axios.post<FantasyTeam>(
      `${apiBaseUrl}/fantasyTeams`,
      {
        name,
        user,
      },
      config
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getFantasyTeam = async (id: string) => {
  try {
    const response = await axios.get<FantasyTeam>(
      `${apiBaseUrl}/fantasyTeams/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
