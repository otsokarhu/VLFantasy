import { z } from "zod";

const RunnerZod = z.object({
  name: z.string({ required_error: "Name is required" }),
  team: z.string({ required_error: "Team is required" }),
  points: z.number({ required_error: "Points is required" }),
});

const FantasyTeamZod = z.object({
  name: z.string({ required_error: "Name is required" }).min(3),
  user: z.string({ required_error: "User is required" }).min(3),
});

const UserZod = z.object({
  username: z.string({ required_error: "Username is required" }).min(3),
  name: z.string({ required_error: "Name is required" }).min(3),
  email: z.string({ required_error: "Email is required" }).email().min(5),
  password: z.string({ required_error: "Password is required" }).min(3),
});

type UserZod = z.infer<typeof UserZod>;
type FantasyTeamZod = z.infer<typeof FantasyTeamZod>;
type RunnerZod = z.infer<typeof RunnerZod>;

const toNewRunner = ({ name, team, points }: RunnerFields): RunnerZod => {
  const validatedBody = RunnerZod.parse({ name, team, points });
  return validatedBody;
};

const toValidateNumber = (param: unknown): number => {
  z.number().parse(param);
  return param as number;
};

const toNewFantasyTeam = ({ name, user }: FantasyTeamFields): FantasyTeamZod => {
  const newFantasyTeam = FantasyTeamZod.parse({ name, user });
  return newFantasyTeam;
}

const toNewUser = ({ username, name, password, email }: UserFields): UserZod => {
  const newUser = UserZod.parse({ username, name, password, email });
  return newUser;
}

type FantasyTeamFields = { name: unknown; user: unknown };
type RunnerFields = { name: unknown; team: unknown; points: unknown };
type UserFields = { username: unknown; name: unknown; password: unknown; fantasyTeam: unknown; email: unknown };















export default {
  toNewFantasyTeam,
  toNewRunner,
  toNewUser,
  toValidateNumber,
};