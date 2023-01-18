import { Request, Response } from 'express';
import express from 'express';
import { authorization } from '../utils/middleware';
import userService from '../services/userService';
import utils from '../utils/utils';
const userRouter = express.Router();

userRouter.get('/', async (_request: Request, response: Response) => {
  try {
    const users = await userService.getAllUsers();
    response.json(users);
  } catch (error: any) {
    response.status(400).json({ error: error.message });
  }
});

userRouter.post('/', async (request: Request, response: Response) => {
  try {
    const valitadedBody = utils.toNewUser(request.body);
    const user = await userService.createUser(valitadedBody);
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

userRouter.delete(
  '/:id',
  authorization,
  async (request: Request, response: Response) => {
    try {
      await userService.deleteUser(request.params.id);
      response.status(204).end();
    } catch (error: any) {
      response.status(400).json({ error: error.message });
    }
  }
);

userRouter.put(
  '/:id',
  authorization,
  async (request: Request, response: Response) => {
    try {
      const valitadedBody = utils.toNewUser(request.body);
      const user = await userService.editUser(request.params.id, valitadedBody);
      response.json(user);
    } catch (error: any) {
      response.status(400).json({ error: error.message });
    }
  }
);

export default userRouter;
