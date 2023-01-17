import { Request, Response } from 'express';
import User from '../models/userModel';
import bcrypt from 'bcrypt';
import express from 'express';
import { authorization } from '../utils/middleware';
const userRouter = express.Router();

userRouter.get('/', async (_request: Request, response: Response) => {
  const users = await User.find({})
    .populate({
      path: 'fantasyTeam',
      select: 'name points',
      populate: { path: 'runners', select: 'name team points' }
    })
    .then((users) => {
      response.json(users);
    });
  return users;
});



userRouter.post('/', async (request: Request, response: Response) => {
  const body = request.body;
  let error

  if (body.username === undefined ||
    body.password === undefined ||
    body.name === undefined ||
    body.email === undefined) {
    switch (body) {
      case 'username':
        error = 'username must be provided'
        break
      case 'password':
        error = 'password must be provided'
        break
      case 'name':
        error = 'name must be provided'
        break
      case 'email':
        error = 'email must be provided'
        break
      default:
        error = 'username, password, name and email must be provided'
        break
    }
    return response.status(400).json({
      error,
    });
  }

  if (body.username.length < 3 ||
    body.password.length < 3 ||
    body.name.length < 3 ||
    body.email.length < 3) {
    switch (body) {
      case 'username':
        error = 'username must be at least 3 characters long'
        break
      case 'password':
        error = 'password must be at least 3 characters long'
        break
      case 'name':
        error = 'name must be at least 3 characters long'
        break
      case 'email':
        error = 'email must be at least 3 characters long'
        break
      default:
        error = 'username, password, name and email must be at least 3 characters long'
        break
    }
    return response.status(400).json({
      error,
    });
  }

  const existingUser = await User.findOne({ username: body.username });
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique',
    });
  }


  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    name: body.name,
    username: body.username,
    email: body.email,
    passwordHash,
    fantasyTeam: null
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

userRouter.delete('/:id', async (request: Request, response: Response) => {
  await User
    .findByIdAndRemove(request.params.id);
  response.status(204).end();
});

userRouter.put('/:id', authorization, async (request: Request, response: Response) => {
  const body = request.body;

  const user = {
    name: body.name,
    username: body.username,
    email: body.email,
    passwordHash: body.passwordHash,
    fantasyTeam: body.fantasyTeam,
  };

  const updatedUser = await User
    .findByIdAndUpdate(request.params.id, user, { new: true });
  response.json(updatedUser);
  return updatedUser;
});

export default userRouter;