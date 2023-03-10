import Runner from '../models/runnerModel';
import { RunnerZod, RunnerIof, RunnerRanki } from '../utils/types';
import { HydratedDocument } from 'mongoose';
import fs from 'fs';
import path from 'path';
import { max } from 'lodash';

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

const getRunnerRanking = (name: string): number => {
  const filePath_ranki = path.join(
    __dirname,
    '..',
    'constants',
    'rankipisteet.json'
  );
  const filePath_iof = path.join(
    __dirname,
    '..',
    'constants',
    'iof_ranking.json'
  );
  let pointsRanki = 0;
  let pointsIof = 0;

  const jsonStringRanki = fs.readFileSync(filePath_ranki, 'utf-8');
  const jsonStringIof = fs.readFileSync(filePath_iof, 'utf-8');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const ranki: RunnerRanki[] = JSON.parse(jsonStringRanki);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const iofRanking: RunnerIof[] = JSON.parse(jsonStringIof);

  const runner = ranki.find((runner) => runner.SUUNNISTUS === name);
  const runnerIof = iofRanking.find(
    (runner) => runner['Last Name'] + ' ' + runner['First Name'] === name
  );

  if (runner) {
    pointsRanki = parseFloat(runner.FIELD15);
  }

  if (runnerIof) {
    pointsIof = parseFloat(runnerIof['WRS points']);
    pointsIof = (pointsIof / 7025) * 101;
  }

  return max([pointsRanki, pointsIof]) || 0;
};

const definePrice = (rankingPoints: number): number => {
  if (rankingPoints >= 97) {
    return 10.5;
  } else if (rankingPoints >= 95) {
    return 10;
  } else if (rankingPoints >= 94) {
    return 9.5;
  } else if (rankingPoints >= 93) {
    return 9;
  } else if (rankingPoints >= 92) {
    return 8.5;
  } else if (rankingPoints >= 91) {
    return 8;
  } else if (rankingPoints >= 90) {
    return 7.5;
  } else if (rankingPoints >= 89) {
    return 7;
  } else if (rankingPoints >= 88) {
    return 6.5;
  } else if (rankingPoints >= 87) {
    return 6;
  } else if (rankingPoints >= 86) {
    return 5.5;
  } else if (rankingPoints >= 83) {
    return 5;
  } else if (rankingPoints >= 80) {
    return 4.5;
  } else if (rankingPoints >= 77) {
    return 4;
  } else if (rankingPoints >= 74) {
    return 3.5;
  } else if (rankingPoints >= 71) {
    return 3;
  } else if (rankingPoints >= 68) {
    return 2.5;
  } else if (rankingPoints >= 65) {
    return 2;
  } else if (rankingPoints >= 62) {
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

const updateAllRunnerPrices = async (): Promise<void> => {
  const runners = await getAllRunners();
  runners.forEach(async (runner) => {
    if (runner.id) {
      await updateRunnerPrice(runner.id);
    }
  });
};

const addRunners = async (n: number): Promise<void> => {
  for (let i = 1; i < n; i++) {
    const allRunners = await getAllRunners();
    const filePath_ranki = path.join(
      __dirname,
      '..',
      'constants',
      'rankipisteet.json'
    );
    const jsonStringRanki = fs.readFileSync(filePath_ranki, 'utf-8');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const ranki: RunnerRanki[] = JSON.parse(jsonStringRanki);

    const nameFromRanki = ranki[i].SUUNNISTUS;
    const [lastName, firstName] = nameFromRanki.split(' ');
    const runnerName = [firstName, lastName].join(' ');
    const runnerTeam = ranki[i]['5'];

    const alreadyExists = allRunners.find(
      (runner) => runner.name === runnerName
    );

    if (!alreadyExists) {
      const rankingPoints = getRunnerRanking(nameFromRanki);
      let price = 2.5;
      if (rankingPoints) {
        price += definePrice(rankingPoints);
      }
      const runner = new Runner({
        name: runnerName,
        team: runnerTeam,
        points: 0,
        price: price,
        runnerPhoto: 'none',
      });
      await runner.save();
    }
  }
};

export default {
  createRunner,
  getAllRunners,
  getRunner,
  deleteRunner,
  updateRunnerPoints,
  getRunnerRanking,
  updateRunnerPrice,
  updateAllRunnerPrices,
  addRunners,
};
