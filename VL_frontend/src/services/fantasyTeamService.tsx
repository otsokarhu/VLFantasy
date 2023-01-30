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

export const getFantasyTeam = (id: string) => {
  const { data, error } = useSWR<FantasyTeam>(
    `${apiBaseUrl}/fantasyTeams/${id}`,
    fetcher
  );
  return {
    dbTeam: data,
    isError: error,
  };
};

export const addRunnerToTeam = async (
  runner: string,
  teamId: string,
  token: string
): Promise<void> => {
  try {
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };
    await axios.put(
      `${apiBaseUrl}/fantasyTeams/${teamId}`,
      {
        runner,
      },
      config
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const removeRunnerFromTeam = async (
  runner: string,
  teamId: string,
  token: string
) => {
  try {
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };
    await axios.delete(
      `${apiBaseUrl}/fantasyTeams/${teamId}/${runner}`,
      config
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};
