"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const runnerService_1 = __importDefault(require("../services/runnerService"));
const utils_1 = __importDefault(require("../utils/utils"));
const runnerRouter = express_1.default.Router();
runnerRouter.get('/', async (_request, response) => {
    try {
        const runners = await runnerService_1.default.getAllRunners();
        response.json(runners);
    }
    catch (error) {
        response.status(400).json({ error: error.message });
    }
});
runnerRouter.post('/', async (request, response) => {
    try {
        const validatedBody = utils_1.default.toNewRunner(request.body);
        const runner = await runnerService_1.default.createRunner(validatedBody);
        response.status(201).json(runner);
    }
    catch (error) {
        if (error.issues) {
            response.status(400).json({ error: error.issues[0].message });
        }
        else {
            response.status(400).json({ error: error.message });
        }
    }
});
runnerRouter.get('/:id', async (request, response) => {
    try {
        const runner = await runnerService_1.default.getRunner(request.params.id);
        response.json(runner);
    }
    catch (error) {
        response.status(400).json({ error: error.message });
    }
});
runnerRouter.delete('/:id', async (request, response) => {
    try {
        await runnerService_1.default.deleteRunner(request.params.id);
        response.status(204).json({ message: 'runner deleted' });
    }
    catch (error) {
        response.status(400).json({ error: error.message });
    }
});
runnerRouter.put('/:id', async (request, response) => {
    try {
        const validatedPoints = utils_1.default.toValidateNumber(request.body.points);
        const runner = await runnerService_1.default.updateRunner(request.params.id, validatedPoints);
        response.json(runner);
    }
    catch (error) {
        response.status(400).json({ error: error.message });
    }
});
exports.default = runnerRouter;
