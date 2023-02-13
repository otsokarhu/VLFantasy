import express from 'express';
import { Request, Response } from 'express';
import userModel from '../models/userModel';
import fantasyteamModel from '../models/fantasyTeamModel';
import { getError } from '../utils/middleware';
const testRouter = express.Router();

testRouter.post('/reset', async (_request: Request, response: Response) => {
  try {
    await userModel.deleteMany({});
    await fantasyteamModel.deleteMany({});
    response.status(204).json({ message: 'database reset' });
  } catch (error) {
    response.status(400).json({ error: getError(error) });
  }
});

export default testRouter;
