import { Request, Response } from 'express';
import express from 'express';
import { authorization, getError } from '../utils/middleware';
import fantasyteamService from '../services/fantasyteamService';
import utils from '../utils/types';
import { CreateTeamProps } from '../utils/types';
const fantasyTeamRouter = express.Router();

fantasyTeamRouter.get(
  '/',
  async (_request: Request, response: Response): Promise<void> => {
    try {
      const fantasyTeams = await fantasyteamService.getAllFantasyTeams();
      response.json(fantasyTeams);
    } catch (error) {
      response.status(400).json({ error: getError(error) });
    }
  }
);

fantasyTeamRouter.post(
  '/',
  authorization,
  async (request: Request, response: Response) => {
    try {
      const validatedBody = utils.toNewFantasyTeam(
        request.body as CreateTeamProps
      );
      const fantasyTeam = await fantasyteamService.createFantasyTeam(
        validatedBody
      );
      response.status(201).json(fantasyTeam);
    } catch (error) {
      response.status(400).json({ error: getError(error) });
    }
  }
);

fantasyTeamRouter.get('/:id', async (request: Request, response: Response) => {
  try {
    const fantasyTeam = await fantasyteamService.getFantasyTeam(
      request.params.id
    );
    response.json(fantasyTeam);
  } catch (error) {
    response.status(400).json({ error: getError(error) });
  }
});

fantasyTeamRouter.delete(
  '/:id',
  authorization,
  async (request: Request, response: Response) => {
    try {
      await fantasyteamService.deleteFantasyTeam(request.params.id);
      response.status(204).json({ message: 'fantasy team deleted' });
    } catch (error) {
      response.status(400).json({ error: getError(error) });
    }
  }
);

fantasyTeamRouter.put(
  '/:id',
  authorization,
  async (request: Request, response: Response) => {
    const runner = request.body.runner as string;
    try {
      const team = await fantasyteamService.addRunnerToFantasyTeam(
        request.params.id,
        runner
      );
      response.status(200).json(team);
    } catch (error) {
      response.status(400).json({ error: getError(error) });
    }
  }
);

fantasyTeamRouter.delete(
  '/:id/:runnerId',
  authorization,
  async (request: Request, response: Response) => {
    try {
      await fantasyteamService.removeRunnerFromFantasyTeam(
        request.params.id,
        request.params.runnerId
      );
      response
        .status(204)
        .json({ message: 'runner deleted from fantasy team' });
    } catch (error) {
      response.status(400).json({ error: getError(error) });
    }
  }
);

export default fantasyTeamRouter;
