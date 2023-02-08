"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const runnerModel_1 = __importDefault(require("../models/runnerModel"));
const createRunner = async (body) => {
    const runner = new runnerModel_1.default({
        ...body,
    });
    return await runner.save();
};
const getAllRunners = async () => {
    return await runnerModel_1.default.find({});
};
const getRunner = async (id) => {
    const runner = await runnerModel_1.default.findById(id);
    if (!runner) {
        throw new Error('Runner not found');
    }
    return runner;
};
const deleteRunner = async (id) => {
    const runner = await getRunner(id);
    if (!runner) {
        throw new Error('Runner not found');
    }
    await runnerModel_1.default.findByIdAndRemove(id);
};
const updateRunner = async (id, body) => {
    const runner = await getRunner(id);
    if (!runner) {
        throw new Error('Runner not found');
    }
    runner.points += body;
    await runner.save();
    return runner;
};
exports.default = {
    createRunner,
    getAllRunners,
    getRunner,
    deleteRunner,
    updateRunner,
};
