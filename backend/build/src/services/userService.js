"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUser = async (body) => {
    const saltRounds = 10;
    const passwordHash = await bcrypt_1.default.hash(body.password, saltRounds);
    const existingUser = await userModel_1.default.findOne({ username: body.username });
    if (existingUser) {
        throw new Error('Username must be unique');
    }
    const user = new userModel_1.default({
        name: body.name,
        username: body.username,
        email: body.email,
        passwordHash,
        fantasyTeam: undefined,
    });
    const savedUser = await user.save();
    return savedUser;
};
const getAllUsers = async () => {
    const users = await userModel_1.default.find({}).populate('fantasyTeam', {
        name: 1,
        runners: 1,
        points: 1,
    });
    return users;
};
const getUser = async (id) => {
    const user = await userModel_1.default.findById(id);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};
const deleteUser = async (id) => {
    try {
        await userModel_1.default.findByIdAndRemove(id);
    }
    catch (error) {
        throw new Error('User not found');
    }
};
const editUser = async (id, body) => {
    const user = await getUser(id);
    if (!user) {
        throw new Error('User not found');
    }
    if (body.newpassword) {
        const saltRounds = 10;
        const passwordHash = await bcrypt_1.default.hash(body.newpassword, saltRounds);
        const uPasswordToUpdate = {
            name: body.name,
            username: body.username,
            email: body.email,
            fantasyTeam: user.fantasyTeam,
            passwordHash,
        };
        const updated = await userModel_1.default.findByIdAndUpdate(id, uPasswordToUpdate, {
            new: true,
        });
        if (!updated) {
            throw new Error('User not found');
        }
        return updated;
    }
    else {
        const userToUpdate = {
            ...body,
            fantasyTeam: user.fantasyTeam,
        };
        const updated = await userModel_1.default.findByIdAndUpdate(id, userToUpdate, {
            new: true,
        });
        if (!updated) {
            throw new Error('User not found');
        }
        return updated;
    }
};
exports.default = {
    createUser,
    getAllUsers,
    getUser,
    deleteUser,
    editUser,
};
