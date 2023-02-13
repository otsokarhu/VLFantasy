export interface RunnerProps {
  team?: string;
  runnerPhoto?: string;
  price?: number;
  runner?: string;
  teamPhoto?: string;
  points?: number;
  id: string;
  displayDelete: boolean;
  blur: boolean;
  dbRunners: Runner[];
}

export interface FantasyTeam {
  id: string;
  name: string;
  user: string;
  runners: string[];
  points: number;
}

export type Runner = {
  name: string;
  team: string;
  points: number;
  price: number;
  runnerPhoto: string;
  id: string;
  selected?: boolean;
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
  username2: string;
  password2: string;
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

export type NotificationProps = {
  title: string;
  description: string;
  status: 'success' | 'error' | 'info';
};

export type DropDownProps = {
  component: JSX.Element;
  name: string;
};
