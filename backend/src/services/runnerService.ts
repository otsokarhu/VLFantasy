import Runner from '../models/runnerModel';
import { RunnerZod, RunnerJSON } from '../utils/types';
import { HydratedDocument } from 'mongoose';
import fs from 'fs';
import path from 'path';

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

const updateRunnerPoints = async (
  id: string,
  body: number
): Promise<RunnerZod> => {
  const runner = await getRunner(id);
  if (!runner) {
    throw new Error('Runner not found');
  }
  runner.points += body;
  await runner.save();
  return runner;
};

const getRunnerRanking = (name: string): number | null => {
  const filePath = path.join(__dirname, '..', 'constants', 'rankipisteet.json');
  const jsonString = fs.readFileSync(filePath, 'utf-8');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const ranki: RunnerJSON[] = JSON.parse(jsonString);
  const runner = ranki.find((runner) => runner.SUUNNISTUS === name);

  if (runner) {
    return parseFloat(runner.FIELD15);
  } else {
    return null;
  }
};

const definePrice = (rankingPoints: number): number => {
  if (rankingPoints <= 100 && rankingPoints >= 95) {
    return 8;
  } else if (rankingPoints < 95 && rankingPoints >= 92) {
    return 7.5;
  } else if (rankingPoints < 92 && rankingPoints >= 89) {
    return 7;
  } else if (rankingPoints < 89 && rankingPoints >= 86) {
    return 6.5;
  } else if (rankingPoints < 86 && rankingPoints >= 83) {
    return 5;
  } else if (rankingPoints < 83 && rankingPoints >= 80) {
    return 4.5;
  } else if (rankingPoints < 80 && rankingPoints >= 77) {
    return 4;
  } else if (rankingPoints < 77 && rankingPoints >= 74) {
    return 3.5;
  } else if (rankingPoints < 74 && rankingPoints >= 71) {
    return 3;
  } else if (rankingPoints < 71 && rankingPoints >= 68) {
    return 2.5;
  } else if (rankingPoints < 68 && rankingPoints >= 65) {
    return 2;
  } else if (rankingPoints < 65 && rankingPoints >= 62) {
    return 1;
  } else {
    return 0.5;
  }
};

const createRunner = async (body: RunnerZod): Promise<RunnerZod> => {
  const reverseName = body.name.split(' ').reverse().join(' ');
  const rankingPoints = getRunnerRanking(reverseName);
  let price = 2.5;
  if (rankingPoints) {
    price += definePrice(rankingPoints);
  }
  const runner = new Runner({
    ...body,
    price: price,
  });
  return await runner.save();
};

const updateRunnerPrice = async (id: string): Promise<RunnerZod> => {
  const runner = await getRunner(id);
  if (!runner) {
    throw new Error('Runner not found');
  }
  const name = runner.name.split(' ').reverse().join(' ');
  let price = 2.5;
  const rankingPoints = getRunnerRanking(name);
  if (rankingPoints) {
    price += definePrice(rankingPoints);
  }

  runner.price = price;
  await runner.save();
  return runner;
};

export default {
  createRunner,
  getAllRunners,
  getRunner,
  deleteRunner,
  updateRunnerPoints,
  getRunnerRanking,
  updateRunnerPrice,
};
