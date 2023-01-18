import User, { NewUser } from '../models/userModel';
import bcrypt from 'bcrypt';

const createUser = async (body: any): Promise<NewUser> => {
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
    fantasyTeam: null,
  });
  const savedUser = await user.save();
  return savedUser;
};

const getAllUsers = async (): Promise<NewUser[]> => {
  const users = await User.find({}).populate({
    path: 'fantasyTeam',
    select: 'name points',
    populate: { path: 'runners', select: 'name team points' },
  });
  return users;
};

const getUser = async (id: string): Promise<NewUser> => {
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

const editUser = async (id: string, body: any): Promise<NewUser> => {
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
      passwordHash
    }
    const updated = await User.findByIdAndUpdate(id, uPasswordToUpdate, { new: true });
    if (!updated) {
      throw new Error('User not found');
    }
    return updated;
  } else {
    const userToUpdate = {
      ...body,
      fantasyTeam: user.fantasyTeam,
    };
    const updated = await User.findByIdAndUpdate(id, userToUpdate, { new: true });
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