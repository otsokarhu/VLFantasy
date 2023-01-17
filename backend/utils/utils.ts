export interface FantasyTeam {
  name: string;
  runners: Runner[];
  points: number;
  user: string;
  id: string;
}

export interface Runner {
  name: string;
  team: string;
  points: number;
  id: string;
}

export interface User {
  username: string;
  name: string;
  passwordHash: string;
  fantasyTeam?: string;
  id: string;
  email: string;
}

export type FantasyTeamPopulated = FantasyTeam & {
  runners: Runner[];
  user: string;
};

export type UserPopulated = User & {
  fantasyTeam: FantasyTeam;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseIsString = (param: unknown): string => {
  if (!param || !isString(param)) {
    throw new Error('Incorrect or missing input' + param);
  }
  return param;
};

const isNumber = (num: unknown): num is number => {
  return typeof num === 'number' || num instanceof Number;
};

const parseIsNumber = (param: unknown): number => {
  if (!param || !isNumber(param)) {
    throw new Error('Incorrect or missing input' + param);
  }
  return param;
};

type FantasyTeamFields = { name: unknown; points: unknown; user: unknown };

const toNewFantasyTeam = ({ name, points, user }: FantasyTeamFields): FantasyTeam => {
  const newFantasyTeam: FantasyTeam = {
    name: parseIsString(name),
    points: parseIsNumber(points),
    user: parseIsString(user),
    runners: [],
    id: '',
  };
  return newFantasyTeam;
}

type RunnerFields = { name: unknown; team: unknown; points: unknown };

const toNewRunner = ({ name, team, points }: RunnerFields): Runner => {
  const newRunner: Runner = {
    name: parseIsString(name),
    team: parseIsString(team),
    points: parseIsNumber(points),
    id: '',
  };
  return newRunner;
}

type UserFields = { username: unknown; name: unknown; passwordHash: unknown; fantasyTeam: unknown; email: unknown };

const toNewUser = ({ username, name, passwordHash, fantasyTeam, email }: UserFields): User => {
  const newUser: User = {
    username: parseIsString(username),
    name: parseIsString(name),
    passwordHash: parseIsString(passwordHash),
    fantasyTeam: parseIsString(fantasyTeam),
    email: parseIsString(email),
    id: '',
  };
  return newUser;
}


export default {
  toNewFantasyTeam,
  toNewRunner,
  toNewUser,
};