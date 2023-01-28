import axios from 'axios';
import useSWR from 'swr';
import { apiBaseUrl, fetcher } from '../constants';
import { FantasyTeam } from '../types';

export const createFantasyTeam = async (name: string, user: string) => {
  try {
    await axios.post<FantasyTeam>(`${apiBaseUrl}/fantasyTeams`, {
      name,
      user,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
