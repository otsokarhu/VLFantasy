import { Request, Response } from 'express';
import express from 'express';
import loginService from '../services/loginService';
import utils from '../utils/utils';
const loginRouter = express.Router();

loginRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { username, password } = request.body;
    utils.toValidateString(username);
    utils.toValidateString(password);
    const user = await loginService.login(username, password);
    response.status(200).send(user);
  } catch (error: any) {
    response.status(401).json({ error: error.message });
  }
});

export default loginRouter;
