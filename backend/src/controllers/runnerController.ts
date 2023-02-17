import express from 'express';
import { Request, Response } from 'express';
import runnerService from '../services/runnerService';
import utils from '../utils/types';
import { getError } from '../utils/middleware';
import { RunnerZod as Runner } from '../utils/types';
const runnerRouter = express.Router();

runnerRouter.get('/', async (_request: Request, response: Response) => {
  try {
    const runners = await runnerService.getAllRunners();
    response.json(runners);
  } catch (error) {
    response.status(400).json({ error: getError(error) });
  }
});

runnerRouter.post('/', async (request: Request, response: Response) => {
  try {
    const validatedBody = utils.toNewRunner(request.body as Runner);
    const runner = await runnerService.createRunner(validatedBody);
    response.status(201).json(runner);
  } catch (error) {
    response.status(400).json({ error: getError(error) });
  }
});

runnerRouter.get('/:id', async (request: Request, response: Response) => {
  try {
    const runner = await runnerService.getRunner(request.params.id);
    response.json(runner);
  } catch (error) {
    response.status(400).json({ error: getError(error) });
  }
});

runnerRouter.delete('/:id', async (request: Request, response: Response) => {
  try {
    await runnerService.deleteRunner(request.params.id);
    response.status(204).json({ message: 'runner deleted' });
  } catch (error) {
    response.status(400).json({ error: getError(error) });
  }
});

runnerRouter.put(
  '/points/:id',
  async (request: Request, response: Response) => {
    try {
      const validatedPoints = utils.toValidateNumber(
        request.body.points as number
      );
      const runner = await runnerService.updateRunnerPoints(
        request.params.id,
        validatedPoints
      );
      response.json(runner);
    } catch (error) {
      response.status(400).json({ error: getError(error) });
    }
  }
);

runnerRouter.put('/price', async (request: Request, response: Response) => {
  try {
    const validatedId = utils.toValidateIdString(request.body.id as string);
    const runner = await runnerService.updateRunnerPrice(validatedId);
    response.json(runner);
  } catch (error) {
    response.status(400).json({ error: getError(error) });
  }
});

runnerRouter.put(
  '/price/all',
  async (_request: Request, response: Response) => {
    try {
      await runnerService.updateAllRunnerPrices();
      response.status(204).json({ message: 'all runner prices updated' });
    } catch (error) {
      response.status(400).json({ error: getError(error) });
    }
  }
);

runnerRouter.post('/add', async (request: Request, response: Response) => {
  try {
    const validatedNumber = utils.toValidateNumber(
      request.body.amount as number
    );
    await runnerService.addRunners(validatedNumber);
    response.status(204).json({ message: 'runners added' });
  } catch (error) {
    response.status(400).json({ error: getError(error) });
  }
});

export default runnerRouter;
