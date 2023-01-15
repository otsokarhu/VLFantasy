import { Request, Response } from 'express';
import User from '../models/userModel';
import bcrypt from 'bcrypt';
import express from 'express';
const userRouter = express.Router();

userRouter.get('/', (_request: Request, response: Response) => {
  const users = User.find({})
    .then((users) => {
      response.json(users);
    }
    );
  return users;
});

userRouter.post('/', async (request: Request, response: Response) => {
  const body = request.body;

  if (body.password.length < 3) {
    return response.status(400).json({
      error: 'password must be at least 3 characters long',
    });
  }

  if (body.email === undefined) {
    return response.status(400).json({
      error: 'email must be provided',
    });
  }

  if (body.name < 3) {
    return response.status(400).json({
      error: 'name must be at least 3 characters long',
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    name: body.name,
    username: body.username,
    email: body.email,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
  return savedUser;

});

userRouter.get('/:id', async (request: Request, response: Response) => {
  const user = await User
    .findById(request.params.id)
  response.json(user);
  return user;
});










export default userRouter;