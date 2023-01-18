import express from 'express';
import { Request, Response } from 'express';
import runnerService from '../services/runnerService';
import utils from '../utils/utils';
const runnerRouter = express.Router();

runnerRouter.get('/', async (_request: Request, response: Response) => {
  try {
    const runners = await runnerService.getAllRunners();
    response.json(runners);
  } catch (error: any) {
    response.status(400).json({ error: error.message });
  }
});

runnerRouter.post('/', async (request: Request, response: Response) => {
  try {
    const validatedBody = utils.toNewRunner(request.body);
    const runner = await runnerService.createRunner(validatedBody);
    response.status(201).json(runner);
  } catch (error: any) {
    if (error.issues) {
      response.status(400).json({ error: error.issues[0].message });
    } else {
      response.status(400).json({ error: error.message });
    }
  }
});

runnerRouter.get('/:id', async (request: Request, response: Response) => {
  try {
    const runner = await runnerService.getRunner(request.params.id);
    response.json(runner);
  } catch (error: any) {
    response.status(400).json({ error: error.message });
  }
});

runnerRouter.delete('/:id', async (request: Request, response: Response) => {
  try {
    await runnerService.deleteRunner(request.params.id);
    response.status(204).json({ message: 'runner deleted' });
  } catch (error: any) {
    response.status(400).json({ error: error.message });
  }
});

runnerRouter.put('/:id', async (request: Request, response: Response) => {
  try {
    const validatedPoints = utils.toValidateNumber(request.body.points);
    const runner = await runnerService.updateRunner(
      request.params.id,
      validatedPoints
    );
    response.json(runner);
  } catch (error: any) {
    response.status(400).json({ error: error.message });
  }
});

export default runnerRouter;
