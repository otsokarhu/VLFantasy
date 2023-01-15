import { Request, Response } from 'express';
import FantasyTeam from '../models/fantasyTeamModel';
import express from 'express';
const fantasyTeamRouter = express.Router();

fantasyTeamRouter.get('/', (_request: Request, response: Response) => {
  const fantasyTeams = FantasyTeam.find({})
    .populate('user', { username: 1, name: 1 })
    .then((fantasyTeams) => {
      response.json(fantasyTeams);
    }
    );
  return fantasyTeams;
}
);

fantasyTeamRouter.post('/', async (request: Request, response: Response) => {
  const body = request.body;

  const fantasyTeam = new FantasyTeam({
    name: body.name,
    user: body.user,
    runners: [],
    points: 0,
  });

  const savedFantasyTeam = await fantasyTeam.save();

  response.status(201).json(savedFantasyTeam);
  return savedFantasyTeam;

}
);

fantasyTeamRouter.get('/:id', (request: Request, response: Response) => {
  const fantasyTeam
    = FantasyTeam.findById(request.params.id).then((fantasyTeam) => {
      response.json(fantasyTeam);
    }
    );
  return fantasyTeam;
}
);

export default fantasyTeamRouter;