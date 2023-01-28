import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import bcrypt from 'bcrypt';
import { SECRET } from '../utils/config';

const login = async (username: string, password: string) => {
  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    throw new Error('invalid username or password');
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, SECRET, { expiresIn: 60 * 60 });

  return { token, username: user.username, name: user.name, id: user._id };
};

export default { login };
