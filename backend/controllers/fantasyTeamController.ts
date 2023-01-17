import { Request, Response } from 'express';
import express from 'express';
import { authorization } from '../utils/middleware';
import fantasyteamService from '../services/fantasyteamService';
import utils from '../utils/utils';
const fantasyTeamRouter = express.Router();


fantasyTeamRouter.get('/', (_request: Request, response: Response) => {
  fantasyteamService.getFantasyTeams().then((fantasyTeams) => {
    response.json(fantasyTeams);
  });
}
);

fantasyTeamRouter.post('/', authorization, async (request: Request, response: Response) => {
  try {
    const teamBody = utils.toNewFantasyTeam(request.body);
    const fantasyTeam = await fantasyteamService.createFantasyTeam(teamBody);
    response.status(201).json(fantasyTeam);
  } catch (error: any) {
    response.status(400).json({ error: error.message });
  }
});



fantasyTeamRouter.get('/:id', (request: Request, response: Response) => {
  try {
    const fantasyTeam = fantasyteamService.getFantasyTeam(request.params.id);
    response.json(fantasyTeam);
  }
  catch (error: any) {
    response.status(400).json({ error: error.message });
  }
});


fantasyTeamRouter.delete('/:id', authorization, async (request: Request, response: Response) => {
  fantasyteamService.deleteFantasyTeam(request.params.id).then(() => {
    response.status(204).json({ message: 'fantasy team deleted' });;
  }
  );
});

fantasyTeamRouter.put('/:id', authorization, async (request: Request, response: Response) => {
  const body = request.body;
  fantasyteamService.addRunnerToFantasyTeam(request.params.id, body.runner).then((fantasyTeam) => {
    response.json(fantasyTeam);
  }
  );
});

fantasyTeamRouter.delete('/:id/:runnerId', authorization, async (request: Request, response: Response) => {
  fantasyteamService.removeRunnerFromFantasyTeam(request.params.id, request.params.runnerId).then((fantasyTeam) => {
    response.json(fantasyTeam);
  }
  );
});

export default fantasyTeamRouter;