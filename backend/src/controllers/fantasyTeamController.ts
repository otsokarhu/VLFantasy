import { Request, Response } from 'express';
import express from 'express';
import { authorization } from '../utils/middleware';
import fantasyteamService from '../services/fantasyteamService';
import utils from '../utils/utils';
const fantasyTeamRouter = express.Router();

fantasyTeamRouter.get('/', async (_request: Request, response: Response) => {
  try {
    const fantasyTeams = await fantasyteamService.getAllFantasyTeams();
    response.json(fantasyTeams);
  } catch (error: any) {
    response.status(400).json({ error: error.message });
  }
});

fantasyTeamRouter.post(
  '/',
  authorization,
  async (request: Request, response: Response) => {
    try {
      const validatedBody = utils.toNewFantasyTeam(request.body);
      const fantasyTeam = await fantasyteamService.createFantasyTeam(
        validatedBody
      );
      response.status(201).json(fantasyTeam);
    } catch (error: any) {
      if (!error.issues) {
        response.status(400).json({ error: error.message });
      } else {
        response.status(400).json({ error: error.issues[0].message });
      }
    }
  }
);

fantasyTeamRouter.get('/:id', async (request: Request, response: Response) => {
  try {
    const fantasyTeam = await fantasyteamService.getFantasyTeam(
      request.params.id
    );
    response.json(fantasyTeam);
  } catch (error: any) {
    response.status(400).json({ error: error.message });
  }
});

fantasyTeamRouter.delete(
  '/:id',
  authorization,
  async (request: Request, response: Response) => {
    try {
      await fantasyteamService.deleteFantasyTeam(request.params.id);
      response.status(204).json({ message: 'fantasy team deleted' });
    } catch (error: any) {
      response.status(400).json({ error: error.message });
    }
  }
);

fantasyTeamRouter.put(
  '/:id',
  authorization,
  async (request: Request, response: Response) => {
    const body = request.body;
    try {
      await fantasyteamService.addRunnerToFantasyTeam(
        request.params.id,
        body.runner
      );
      response.status(200).json({ message: 'runner added to fantasy team' });
    } catch (error: any) {
      response.status(400).json({ error: error.message });
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
    } catch (error: any) {
      response.status(400).json({ error: error.message });
    }
  }
);

export default fantasyTeamRouter;
