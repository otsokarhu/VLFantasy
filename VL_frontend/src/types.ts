import { z } from 'zod';

export interface RunnerProps {
  team: string;
  runnerPhoto: string;
  price: number;
  runner: string;
  teamPhoto: string;
  points: number;
}

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

const RunnerZod = z.object({
  name: z.string({ required_error: 'Name is required' }),
  team: z.string({ required_error: 'Team is required' }),
  points: z.number({ required_error: 'Points are required' }),
});

export type Runner = z.infer<typeof RunnerZod>;

export type User = z.infer<typeof UserZodSchema>;

export const LoginZod = z.object({
  username: z.string({ required_error: 'Username is required' }).min(3).max(20),
  password: z.string({ required_error: 'Password is required' }).min(3).max(50),
});

export type Login = z.infer<typeof LoginZod>;

const LoginResponseZod = z.object({
  token: z.string({ required_error: 'Token is required' }),
  username: z.string({ required_error: 'Username is required' }),
  name: z.string({ required_error: 'Name is required' }),
});

export type LoginResponse = z.infer<typeof LoginResponseZod>;
