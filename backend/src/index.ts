import express from 'express';
import cors from 'cors';
import { PORT } from './utils/config';
import connectToDb from './utils/database';
import middleware from './utils/middleware';
import userRouter from './controllers/userController';
import loginRouter from './controllers/loginController';
import runnerRouter from './controllers/runnerController';
import fantasyTeamRouter from './controllers/fantasyTeamController';
import testRouter from './controllers/testController';

export const app = express();

app.use(express.json());
app.use(cors());
app.use(middleware.requestLogger);

app.use('/api/VLusers', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/runners', runnerRouter);
app.use('/api/fantasyTeams', fantasyTeamRouter);
if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testRouter);
}

app.get('/');

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

const start = async () => {
  await connectToDb();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

void start();

export default app;
