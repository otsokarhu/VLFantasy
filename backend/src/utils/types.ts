import { z } from 'zod';

const RunnerZod = z.object({
  name: z.string({ required_error: 'Name is required' }),
  team: z.string({ required_error: 'Team is required' }),
  points: z.number({ required_error: 'Points are required' }),
  price: z.number({ required_error: 'Price is required' }),
  runnerPhoto: z.string({ required_error: 'Runner photo is required' }),
});

const FantasyTeamZod = z.object({
  name: z.string({ required_error: 'Name is required' }),
  user: z.string({ required_error: 'User is required' }),
  runners: z.array(RunnerZod),
  id: z.string().optional(),
  points: z.number(),
});

const UserZodSchema = z.object({
  username: z.string({ required_error: 'Username is required' }).min(3).max(20),
  name: z.string({ required_error: 'Name is required' }).min(3).max(50),
  email: z
    .string({ required_error: 'Email is required' })
    .email()
    .min(5)
    .max(50),
  passwordHash: z
    .string({ required_error: 'Password is required' })
    .min(3)
    .max(50),
  id: z.string().optional(),
  fantasyTeam: z.string().optional(),
});

const NewFantasyTeamZod = z.object({
  name: z.string({ required_error: 'Name is required' }).min(3).max(20),
  user: z.string({ required_error: 'User is required' }).min(3).max(50),
});

const NewUserZod = z.object({
  username: z.string({ required_error: 'Username is required' }).min(3).max(20),
  name: z.string({ required_error: 'Name is required' }).min(3).max(50),
  email: z
    .string({ required_error: 'Email is required' })
    .email()
    .min(5)
    .max(50),
  password: z.string({ required_error: 'Password is required' }).min(3).max(50),
  newpassword: z
    .string({ required_error: 'Password is required' })
    .min(3)
    .max(50)
    .optional(),
});

export type NewUserZod = z.infer<typeof NewUserZod>;
type NewFantasyTeamZod = z.infer<typeof NewFantasyTeamZod>;
export type RunnerZod = z.infer<typeof RunnerZod>;
export type FantasyTeamZod = z.infer<typeof FantasyTeamZod>;
export type UserZod = z.infer<typeof UserZodSchema>;

const toNewRunner = ({
  name,
  team,
  points,
  price,
  runnerPhoto,
}: RunnerFields): RunnerZod => {
  const validatedBody = RunnerZod.parse({
    name,
    team,
    points,
    price,
    runnerPhoto,
  });
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
}: FantasyTeamFields): NewFantasyTeamZod => {
  const newFantasyTeam = NewFantasyTeamZod.parse({ name, user });
  return newFantasyTeam;
};

const toNewUser = ({
  username,
  name,
  password,
  email,
  newpassword,
}: UserFields): NewUserZod => {
  const newUser = NewUserZod.parse({
    username,
    name,
    password,
    email,
    newpassword,
  });
  return newUser;
};

type FantasyTeamFields = { name: unknown; user: unknown };
type RunnerFields = {
  name: unknown;
  team: unknown;
  points: unknown;
  price: unknown;
  runnerPhoto: unknown;
};
type UserFields = {
  username: unknown;
  name: unknown;
  password: unknown;
  fantasyTeam?: unknown;
  email: unknown;
  newpassword?: unknown;
};

export type AddRunnerToTeamProps = {
  id: string;
  runnerId: string;
};

export type CreateTeamProps = {
  name: string;
  user: string;
};

export type LoginProps = {
  username: string;
  password: string;
};

export default {
  toNewFantasyTeam,
  toNewRunner,
  toNewUser,
  toValidateNumber,
  toValidateString,
  FantasyTeamZod,
  RunnerZod,
  UserZodSchema,
};
