import { Request, Response } from 'express';
import express from 'express';
import { authorization } from '../utils/middleware';
import userService from '../services/userService';
import utils from '../utils/types';
import { NewUserZod } from '../utils/types';
import { getError } from '../utils/middleware';
const userRouter = express.Router();

userRouter.get('/', async (_request: Request, response: Response) => {
  try {
    const users = await userService.getAllUsers();
    response.json(users);
  } catch (error) {
    response.status(400).json({ error: getError(error) });
  }
});

userRouter.post('/', async (request: Request, response: Response) => {
  try {
    const valitadedBody = utils.toNewUser(request.body as NewUserZod);
    const user = await userService.createUser(valitadedBody);
    response.status(201).json(user);
  } catch (error) {
    response.status(400).json({ error: getError(error) });
  }
});

userRouter.get('/:id', async (request: Request, response: Response) => {
  try {
    const user = await userService.getUser(request.params.id);
    response.json(user);
  } catch (error) {
    response.status(400).json({ error: getError(error) });
  }
});

userRouter.delete(
  '/:id',
  authorization,
  async (request: Request, response: Response) => {
    try {
      await userService.deleteUser(request.params.id);
      response.status(204).end();
    } catch (error) {
      response.status(400).json({ error: getError(error) });
    }
  }
);

userRouter.put(
  '/:id',
  authorization,
  async (request: Request, response: Response) => {
    try {
      const valitadedBody = utils.toNewUser(request.body as NewUserZod);
      const user = await userService.editUser(request.params.id, valitadedBody);
      response.json(user);
    } catch (error) {
      response.status(400).json({ error: getError(error) });
    }
  }
);

export default userRouter;
