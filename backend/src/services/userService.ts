import User from '../models/userModel';
import { UserZod } from '../utils/utils';
import bcrypt from 'bcrypt';
import { HydratedDocument } from 'mongoose';

const createUser = async (body: any): Promise<UserZod> => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);
  const existingUser = await User.findOne({ username: body.username });
  if (existingUser) {
    throw new Error('Username must be unique');
  }

  const user = new User({
    name: body.name,
    username: body.username,
    email: body.email,
    passwordHash,
    fantasyTeam: undefined,
  });
  const savedUser = await user.save();
  return savedUser;
};

const getAllUsers = async (): Promise<UserZod[]> => {
  const users = await User.find({}).populate('fantasyTeam', {
    name: 1,
    runners: 1,
    points: 1,
  });
  return users;
};

const getUser = async (id: string): Promise<HydratedDocument<UserZod>> => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

const deleteUser = async (id: string): Promise<void> => {
  try {
    await User.findByIdAndRemove(id);
  } catch (error: any) {
    throw new Error('User not found');
  }
};

const editUser = async (id: string, body: any): Promise<UserZod> => {
  const user = await getUser(id);
  if (!user) {
    throw new Error('User not found');
  }
  if (body.newpassword) {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.newpassword, saltRounds);
    const uPasswordToUpdate = {
      name: body.name,
      username: body.username,
      email: body.email,
      fantasyTeam: user.fantasyTeam,
      passwordHash,
    };
    const updated = await User.findByIdAndUpdate(id, uPasswordToUpdate, {
      new: true,
    });
    if (!updated) {
      throw new Error('User not found');
    }
    return updated;
  } else {
    const userToUpdate = {
      ...body,
      fantasyTeam: user.fantasyTeam,
    };
    const updated = await User.findByIdAndUpdate(id, userToUpdate, {
      new: true,
    });
    if (!updated) {
      throw new Error('User not found');
    }
    return updated;
  }
};

export default {
  createUser,
  getAllUsers,
  getUser,
  deleteUser,
  editUser,
};
