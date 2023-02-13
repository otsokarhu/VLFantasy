import { Request, Response } from 'express';
import express from 'express';
import loginService from '../services/loginService';
import utils from '../utils/types';
import { LoginProps } from '../utils/types';
import { getError } from '../utils/middleware';
const loginRouter = express.Router();

loginRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { username, password } = request.body as LoginProps;
    utils.toValidateString(username);
    utils.toValidateString(password);
    const user = await loginService.login(username, password);
    response.status(200).send(user);
  } catch (error) {
    response.status(401).json({ error: getError(error) });
  }
});

export default loginRouter;
