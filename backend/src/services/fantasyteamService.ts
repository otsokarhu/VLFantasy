import FantasyTeam from '../models/fantasyTeamModel';
import runnerService from './runnerService';
import { FantasyTeamZod } from '../utils/utils';
import { HydratedDocument } from 'mongoose';
import userService from './userService';

const getAllFantasyTeams = async (): Promise<FantasyTeamZod[]> => {
  const fantasyTeams = await FantasyTeam.find()
    .populate('user', { username: 1, name: 1 })
    .populate('runners', { name: 1, team: 1, points: 1 });
  return fantasyTeams;
};

const getFantasyTeam = async (
  id: string
): Promise<HydratedDocument<FantasyTeamZod>> => {
  const fantasyTeam = await FantasyTeam.findById(id);
  if (!fantasyTeam) {
    throw new Error('Fantasy team not found');
  }
  return fantasyTeam;
};

const deleteFantasyTeam = async (id: string): Promise<void> => {
  const fantasyTeam = await getFantasyTeam(id);
  const user = await userService.getUser(fantasyTeam.user);
  if (!user) {
    throw new Error('User not found');
  }
  if (!fantasyTeam) {
    throw new Error('Fantasy team not found');
  }
  if (user.fantasyTeam?.toString() !== fantasyTeam.id) {
    throw new Error('Not authorized to delete this fantasy team');
  }
  await FantasyTeam.findByIdAndRemove(id);
  user.fantasyTeam = undefined;
  await user.save();
};

const addRunnerToFantasyTeam = async (
  id: string,
  runnerId: string
): Promise<FantasyTeamZod> => {
  const fantasyTeam = await getFantasyTeam(id);
  if (!fantasyTeam) {
    throw new Error('Fantasy team not found');
  }
  if (fantasyTeam.runners.length >= 5) {
    throw new Error('Fantasy team already has 5 runners');
  }

  if (fantasyTeam.runners.find((runner) => runner.toString() === runnerId)) {
    throw new Error('Runner already added to fantasy team');
  }

  const runnerToAdd = await runnerService.getRunner(runnerId);
  if (!runnerToAdd) {
    throw new Error('Runner not found');
  }
  fantasyTeam.runners = fantasyTeam.runners.concat(runnerToAdd);
  fantasyTeam.points += runnerToAdd.points;
  await fantasyTeam.save();

  return fantasyTeam;
};

const removeRunnerFromFantasyTeam = async (
  id: string,
  runnerId: string
): Promise<FantasyTeamZod> => {
  const fantasyTeam = await getFantasyTeam(id);

  if (!fantasyTeam) {
    throw new Error('Fantasy team not found');
  }
  const runnerToRemove = fantasyTeam.runners.find(
    (runner) => runner.toString() === runnerId
  );
  if (!runnerToRemove) {
    throw new Error('Runner not found');
  }

  const findRunner = await runnerService.getRunner(runnerToRemove.toString());

  const index = fantasyTeam.runners
    .map((runner) => runner.toString())
    .indexOf(runnerId);

  fantasyTeam.runners.splice(index, 1);

  fantasyTeam.points -= findRunner.points;

  await fantasyTeam.save();
  return fantasyTeam;
};

const createFantasyTeam = async (body: any): Promise<FantasyTeamZod> => {
  const fantasyTeam = new FantasyTeam({
    ...body,
  });
  const user = body.user;
  const userToUpdate = await userService.getUser(user);
  if (!userToUpdate) {
    throw new Error('User not found');
  }
  if (userToUpdate.fantasyTeam) {
    throw new Error('User already has a fantasy team');
  }
  const savedFantasyTeam = await fantasyTeam.save();
  const idToString = savedFantasyTeam._id.toString();
  userToUpdate.fantasyTeam = idToString;
  await userToUpdate.save();
  return savedFantasyTeam;
};

export default {
  getAllFantasyTeams,
  getFantasyTeam,
  deleteFantasyTeam,
  addRunnerToFantasyTeam,
  removeRunnerFromFantasyTeam,
  createFantasyTeam,
};
