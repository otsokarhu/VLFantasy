import { Request, Response } from 'express';
import FantasyTeam from '../models/fantasyTeamModel';
import express from 'express';
import User from '../models/userModel';
import { authorization } from '../utils/middleware';
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

fantasyTeamRouter.post('/', authorization, async (request: Request, response: Response) => {
  const body = request.body;

  const fantasyTeam = new FantasyTeam({
    name: body.name,
    user: body.user,
    runners: [],
    points: 0,
  });

  if (body.name === undefined) {
    return response.status(400).json({
      error: 'fantasy team name must be provided',
    });
  }

  const userToUpdate = await User.findById(body.user);
  if (!userToUpdate) {
    return response.status(404).json({
      error: 'user not found',
    });
  }

  if (userToUpdate.fantasyTeam) {
    return response.status(400).json({
      error: 'user already has a fantasy team',
    });
  }
  const savedFantasyTeam = await fantasyTeam.save();
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

fantasyTeamRouter.delete('/:id', authorization, async (request: Request, response: Response) => {
  const fantasyTeam = await FantasyTeam.findById(request.params.id);
  const user = await User.findById(fantasyTeam?.user);


  if (!user) {
    return response.status(404).json({
      error: 'user not found',
    });
  }
  if (!fantasyTeam) {
    return response.status(404).json({
      error: 'fantasy team not found',
    });
  }
  if (user.fantasyTeam?.toString() !== request.params.id) {
    return response.status(401).json({
      error: 'unauthorized',
    });
  }
  await FantasyTeam.findByIdAndRemove(request.params.id);
  user.fantasyTeam = undefined;
  await user.save();
  response.status(204).json({ message: 'fantasy team deleted' });
  return null
});

fantasyTeamRouter.put('/:id', authorization, async (request: Request, response: Response) => {
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