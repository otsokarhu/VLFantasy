import { z } from 'zod';

const RunnerZod = z.object({
  name: z.string({ required_error: 'Name is required' }),
  team: z.string({ required_error: 'Team is required' }),
  points: z.number({ required_error: 'Points are required' }),
});

const FantasyTeamZod = z.object({
  name: z.string({ required_error: 'Name is required' }).min(3).max(20),
  user: z.string({ required_error: 'User is required' }).min(3).max(50),
});

const UserZod = z.object({
  username: z.string({ required_error: 'Username is required' }).min(3).max(20),
  name: z.string({ required_error: 'Name is required' }).min(3).max(50),
  email: z
    .string({ required_error: 'Email is required' })
    .email()
    .min(5)
    .max(50),
  password: z.string({ required_error: 'Password is required' }).min(3).max(50),
  newpassword: z.string({ required_error: 'Password is required' }).min(3).max(50).optional(),
});

type UserZod = z.infer<typeof UserZod>;
type FantasyTeamZod = z.infer<typeof FantasyTeamZod>;
type RunnerZod = z.infer<typeof RunnerZod>;

const toNewRunner = ({ name, team, points }: RunnerFields): RunnerZod => {
  const validatedBody = RunnerZod.parse({ name, team, points });
  return validatedBody;
};

const toValidateNumber = (param: number): number => {
  return z
    .number({
      required_error: 'Value must be given',
      invalid_type_error: 'Value must be number',
    })
    .parse(param);
};

const toValidateString = (param: string): string => {
  return z
    .string({
      required_error: 'Input must be given',
      invalid_type_error: 'Input must be a number',
    })
    .max(50)
    .parse(param);
};

const toNewFantasyTeam = ({
  name,
  user,
}: FantasyTeamFields): FantasyTeamZod => {
  const newFantasyTeam = FantasyTeamZod.parse({ name, user });
  return newFantasyTeam;
};

const toNewUser = ({
  username,
  name,
  password,
  email,
  newpassword
}: UserFields): UserZod => {
  const newUser = UserZod.parse({ username, name, password, email, newpassword });
  return newUser;
};

type FantasyTeamFields = { name: unknown; user: unknown };
type RunnerFields = { name: unknown; team: unknown; points: unknown };
type UserFields = {
  username: unknown;
  name: unknown;
  password: unknown;
  fantasyTeam: unknown;
  email: unknown;
  newpassword?: unknown;
};

export default {
  toNewFantasyTeam,
  toNewRunner,
  toNewUser,
  toValidateNumber,
  toValidateString,
};
