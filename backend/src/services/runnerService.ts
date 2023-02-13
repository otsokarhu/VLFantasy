import Runner from '../models/runnerModel';
import { RunnerZod } from '../utils/types';
import { HydratedDocument } from 'mongoose';

const createRunner = async (body: RunnerZod): Promise<RunnerZod> => {
  const runner = new Runner({
    ...body,
  });
  return await runner.save();
};

const getAllRunners = async (): Promise<RunnerZod[]> => {
  return await Runner.find({});
};

const getRunner = async (id: string): Promise<HydratedDocument<RunnerZod>> => {
  const runner = await Runner.findById(id);
  if (!runner) {
    throw new Error('Runner not found');
  }
  return runner;
};

const deleteRunner = async (id: string): Promise<void> => {
  const runner = await getRunner(id);
  if (!runner) {
    throw new Error('Runner not found');
  }
  await Runner.findByIdAndRemove(id);
};

const updateRunner = async (id: string, body: number): Promise<RunnerZod> => {
  const runner = await getRunner(id);
  if (!runner) {
    throw new Error('Runner not found');
  }
  runner.points += body;
  await runner.save();
  return runner;
};

export default {
  createRunner,
  getAllRunners,
  getRunner,
  deleteRunner,
  updateRunner,
};
