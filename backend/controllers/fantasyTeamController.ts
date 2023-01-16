import { Request, Response } from 'express';
import FantasyTeam from '../models/fantasyTeamModel';
import express from 'express';
import User from '../models/userModel';
const fantasyTeamRouter = express.Router();

fantasyTeamRouter.get('/', (_request: Request, response: Response) => {
  const fantasyTeams = FantasyTeam.find({})
    .populate('user', { username: 1, name: 1 })
    .populate('runners', { name: 1, team: 1, points: 1 })
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

  const userToUpdate = await User.findById(body.user);
  if (!userToUpdate) {
    return response.status(404).json({
      error: 'user not found',
    });
  }
  userToUpdate.fantasyTeam = savedFantasyTeam._id;
  await userToUpdate.save();

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
});

fantasyTeamRouter.delete('/:id', async (request: Request, response: Response) => {
  await FantasyTeam
    .findByIdAndRemove(request.params.id);
  response.status(204).end();
});

fantasyTeamRouter.put('/:id', async (request: Request, response: Response) => {
  const body = request.body;

  const fantasyTeamtoUpdate = await
    FantasyTeam.findById(request.params.id);
  if (!fantasyTeamtoUpdate) {
    return response.status(404).json({
      error: 'fantasy team not found',
    });
  }


  const fantasyTeam = {
    name: fantasyTeamtoUpdate.name,
    user: fantasyTeamtoUpdate.user,
    runners: fantasyTeamtoUpdate.runners.concat(body.runners),
    points: fantasyTeamtoUpdate.points,
  };

  const updatedFantasyTeam = await FantasyTeam
    .findByIdAndUpdate(request.params
      .id, fantasyTeam, { new: true });
  response.json(updatedFantasyTeam);

  return updatedFantasyTeam;
});

export default fantasyTeamRouter;