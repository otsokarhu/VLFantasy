import FantasyTeam from '../models/fantasyTeamModel';
import { FantasyTeamPopulated } from '../models/fantasyTeamModel';
import User from '../models/userModel';
import Runner from '../models/runnerModel';




const getFantasyTeams = async (): Promise<FantasyTeamPopulated[]> => {
  const fantasyTeams = await FantasyTeam.find({})
    .populate('user', { username: 1, name: 1 })
    .populate('runners', { name: 1, team: 1, points: 1 });
  return fantasyTeams;
};

const getFantasyTeam = async (id: string): Promise<FantasyTeamPopulated> => {
  const fantasyTeam = await FantasyTeam.findById(id)
  if (!fantasyTeam) {
    throw new Error('Fantasy team not found');
  }
  return fantasyTeam;

};

const deleteFantasyTeam = async (id: string): Promise<void> => {
  const fantasyTeam = await getFantasyTeam(id);
  const user = await User.findById(fantasyTeam.user);
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

const addRunnerToFantasyTeam = async (id: string, runnerId: string): Promise<FantasyTeamPopulated> => {
  const fantasyTeam = await getFantasyTeam(id);
  if (!fantasyTeam) {
    throw new Error('Fantasy team not found');
  }
  if (fantasyTeam.runners.find((runner) => runner.id === runnerId)) {
    throw new Error('Runner already added to fantasy team');
  }
  const runnerToAdd = await Runner.findById(runnerId);
  if (!runnerToAdd) {
    throw new Error('Runner not found');
  }
  fantasyTeam.runners = fantasyTeam.runners.concat(runnerToAdd);
  fantasyTeam.points += runnerToAdd.points;
  await fantasyTeam.save();
  return fantasyTeam;
};

const removeRunnerFromFantasyTeam = async (id: string, runnerId: string): Promise<FantasyTeamPopulated> => {
  const fantasyTeam = await getFantasyTeam(id);
  if (!fantasyTeam) {
    throw new Error('Fantasy team not found');
  }
  const runnerToRemove = fantasyTeam.runners.find((runner) => runner.id === runnerId);
  if (!runnerToRemove) {
    throw new Error('Runner not found');
  }
  fantasyTeam.runners = fantasyTeam.runners.filter((runner) => runner.id !== runnerId);
  fantasyTeam.points -= runnerToRemove.points;
  await fantasyTeam.save();
  return fantasyTeam;
};

const createFantasyTeam = async (name: string, user: string): Promise<FantasyTeamPopulated> => {

  const fantasyTeam = new FantasyTeam({
    name: name,
    user: user,
    runners: [],
    points: 0,
  });
  if (name === undefined) {
    throw new Error('fantasy team name must be provided');
  }
  const userToUpdate = await User.findById(user);
  if (!userToUpdate) {
    throw new Error('User not found');
  }
  if (userToUpdate.fantasyTeam) {
    throw new Error('User already has a fantasy team');
  }
  const savedFantasyTeam = await fantasyTeam.save();
  userToUpdate.fantasyTeam = savedFantasyTeam._id;
  await userToUpdate.save();
  return savedFantasyTeam;
};


export default {
  getFantasyTeams,
  getFantasyTeam,
  deleteFantasyTeam,
  addRunnerToFantasyTeam,
  removeRunnerFromFantasyTeam,
  createFantasyTeam,
};