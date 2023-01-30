export interface RunnerProps {
  team?: string;
  runnerPhoto?: string;
  price?: number;
  runner?: string;
  teamPhoto?: string;
  points?: number;
  id: string;
}

export interface FantasyTeam {
  id: string;
  name: string;
  user: string;
  runners: Runner[];
  points: number;
}

export type Runner = {
  name: string;
  team: string;
  points: number;
  price: number;
  runnerPhoto: string;
  id: string;
};

export type User = {
  username: string;
  name: string;
  email: string;
  passwordHash: string;
  id?: string;
  fantasyTeam?: string;
};

export type Login = {
  username: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  username: string;
  name: string;
  id: string;
  email: string;
  fantasyTeam: string | '';
};

export interface LoginFormValues {
  username: string;
  password: string;
}

export type RegisterFormValues = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
};

export interface RegistrationResponse {
  name: string;
  email: string;
  username: string;
  id: number;
}

export type UserFromLocalStorage = {
  username: string;
  token: string;
  id: string;
};
