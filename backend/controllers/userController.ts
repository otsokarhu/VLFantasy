import { Request, Response } from 'express';
import User from '../models/userModel';
import express from 'express';
import { authorization } from '../utils/middleware';
import userService from '../services/userService';
import utils from '../utils/utils';
const userRouter = express.Router();

userRouter.get('/', async (_request: Request, response: Response) => {
  const users = await User.find({})
    .populate({
      path: 'fantasyTeam',
      select: 'name points',
      populate: { path: 'runners', select: 'name team points' },
    })
    .then((users) => {
      response.json(users);
    });
  return users;
});

userRouter.post('/', async (request: Request, response: Response) => {
  try {
    const body = utils.toNewUser(request.body);
    const user = await userService.createUser(body);
    response.status(201).json(user);
  } catch (error: any) {
    response.status(400).json({ error: error.message });
  }
});

userRouter.get('/:id', async (request: Request, response: Response) => {
  try {
    const user = await userService.getUser(request.params.id);
    response.json(user);
  } catch (error: any) {
    response.status(400).json({ error: error.message });
  }
});

userRouter.delete('/:id', async (request: Request, response: Response) => {
  await User.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

userRouter.put(
  '/:id',
  authorization,
  async (request: Request, response: Response) => {
    try {
      const body = utils.toNewUser(request.body);
      const user = await userService.editUser(request.params.id, body);
      response.json(user);
    } catch (error: any) {
      response.status(400).json({ error: error.message });
    }
  }
);

export default userRouter;
