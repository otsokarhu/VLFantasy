export interface RunnerProps {
  team: string;
  runnerPhoto: string;
  price: number;
  runner: string;
  teamPhoto: string;
  points: number;
}

export type Runner = {
  name: string;
  team: string;
  points: number;
  price: number;
  runnerPhoto: string;
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
};
