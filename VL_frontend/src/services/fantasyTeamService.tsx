import axios from 'axios';
import useSWR from 'swr';
import { apiBaseUrl, fetcher } from '../constants';
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
