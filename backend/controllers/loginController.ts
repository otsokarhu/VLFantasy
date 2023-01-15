import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import express from 'express';
import User from '../models/userModel';
import bcrypt from 'bcrypt';
import { SECRET } from '../utils/config';
const loginRouter = express.Router();



loginRouter.post('/', async (request: Request, response: Response) => {
  const { username, password } = request.body


  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password',
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, SECRET
    , { expiresIn: 60 * 60 })

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })

  return user;
})

export default loginRouter;