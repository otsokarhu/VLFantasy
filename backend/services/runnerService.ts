import Runner, { NewRunner } from '../models/runnerModel';

const createRunner = async (body: any): Promise<NewRunner> => {
  const runner = new Runner({
    ...body
  });
  const savedRunner = await runner.save();
  return savedRunner;
}

const getRunners = async (): Promise<NewRunner[]> => {
  const runners = await Runner.find({});
  return runners;
};

const getRunner = async (id: string): Promise<NewRunner> => {
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

const updateRunner = async (id: string, body: any): Promise<NewRunner> => {
  const runner = await getRunner(id);
  if (!runner) {
    throw new Error('Runner not found');
  }
  runner.points += body
  return runner;
};



export default {
  createRunner,
  getRunners,
  getRunner,
  deleteRunner,
  updateRunner
}