"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fantasyTeamModel_1 = __importDefault(require("../models/fantasyTeamModel"));
const runnerService_1 = __importDefault(require("./runnerService"));
const userService_1 = __importDefault(require("./userService"));
const getAllFantasyTeams = async () => {
    const fantasyTeams = await fantasyTeamModel_1.default.find()
        .populate('user', { username: 1, name: 1 })
        .populate('runners', { name: 1, team: 1, points: 1 });
    return fantasyTeams;
};
const getFantasyTeam = async (id) => {
    const fantasyTeam = await fantasyTeamModel_1.default.findById(id);
    if (!fantasyTeam) {
        throw new Error('Fantasy team not found');
    }
    return fantasyTeam;
};
const createFantasyTeam = async (body) => {
    const fantasyTeam = new fantasyTeamModel_1.default({
        ...body,
    });
    const user = body.user;
    const userToUpdate = await userService_1.default.getUser(user);
    if (!userToUpdate) {
        throw new Error('User not found');
    }
    if (userToUpdate.fantasyTeam) {
        throw new Error('User already has a fantasy team');
    }
    const savedFantasyTeam = await fantasyTeam.save();
    const idToString = savedFantasyTeam._id.toString();
    userToUpdate.fantasyTeam = idToString;
    await userToUpdate.save();
    return savedFantasyTeam;
};
const deleteFantasyTeam = async (id) => {
    const fantasyTeam = await getFantasyTeam(id);
    const user = await userService_1.default.getUser(fantasyTeam.user);
    if (!user) {
        throw new Error('User not found');
    }
    if (!fantasyTeam) {
        throw new Error('Fantasy team not found');
    }
    if (user.fantasyTeam?.toString() !== fantasyTeam.id) {
        throw new Error('Not authorized to delete this fantasy team');
    }
    await fantasyTeamModel_1.default.findByIdAndRemove(id);
    user.fantasyTeam = undefined;
    await user.save();
};
const addRunnerToFantasyTeam = async (id, runnerId) => {
    const fantasyTeam = await getFantasyTeam(id);
    if (!fantasyTeam) {
        throw new Error('Fantasy team not found');
    }
    if (fantasyTeam.runners.length >= 5) {
        throw new Error('Fantasy team already has 5 runners');
    }
    if (fantasyTeam.runners.find((runner) => runner.toString() === runnerId)) {
        throw new Error('Runner already added to fantasy team');
    }
    const runnerToAdd = await runnerService_1.default.getRunner(runnerId);
    if (!runnerToAdd) {
        throw new Error('Runner not found');
    }
    fantasyTeam.runners = fantasyTeam.runners.concat(runnerToAdd);
    fantasyTeam.points += runnerToAdd.points;
    await fantasyTeam.save();
    return fantasyTeam;
};
const removeRunnerFromFantasyTeam = async (id, runnerId) => {
    const fantasyTeam = await getFantasyTeam(id);
    if (!fantasyTeam) {
        throw new Error('Fantasy team not found');
    }
    const runnerToRemove = fantasyTeam.runners.find((runner) => runner.toString() === runnerId);
    if (!runnerToRemove) {
        throw new Error('Runner not found');
    }
    const findRunner = await runnerService_1.default.getRunner(runnerToRemove.toString());
    const index = fantasyTeam.runners
        .map((runner) => runner.toString())
        .indexOf(runnerId);
    fantasyTeam.runners.splice(index, 1);
    fantasyTeam.points -= findRunner.points;
    await fantasyTeam.save();
    return fantasyTeam;
};
exports.default = {
    getAllFantasyTeams,
    getFantasyTeam,
    deleteFantasyTeam,
    addRunnerToFantasyTeam,
    removeRunnerFromFantasyTeam,
    createFantasyTeam,
};
