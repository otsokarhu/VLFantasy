"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../utils/middleware");
const fantasyteamService_1 = __importDefault(require("../services/fantasyteamService"));
const utils_1 = __importDefault(require("../utils/utils"));
const fantasyTeamRouter = express_1.default.Router();
fantasyTeamRouter.get('/', async (_request, response) => {
    try {
        const fantasyTeams = await fantasyteamService_1.default.getAllFantasyTeams();
        response.json(fantasyTeams);
    }
    catch (error) {
        response.status(400).json({ error: error.message });
    }
});
fantasyTeamRouter.post('/', middleware_1.authorization, async (request, response) => {
    try {
        const validatedBody = utils_1.default.toNewFantasyTeam(request.body);
        const fantasyTeam = await fantasyteamService_1.default.createFantasyTeam(validatedBody);
        response.status(201).json(fantasyTeam);
    }
    catch (error) {
        if (!error.issues) {
            response.status(400).json({ error: error.message });
        }
        else {
            response.status(400).json({ error: error.issues[0].message });
        }
    }
});
fantasyTeamRouter.get('/:id', async (request, response) => {
    try {
        const fantasyTeam = await fantasyteamService_1.default.getFantasyTeam(request.params.id);
        response.json(fantasyTeam);
    }
    catch (error) {
        response.status(400).json({ error: error.message });
    }
});
fantasyTeamRouter.delete('/:id', middleware_1.authorization, async (request, response) => {
    try {
        await fantasyteamService_1.default.deleteFantasyTeam(request.params.id);
        response.status(204).json({ message: 'fantasy team deleted' });
    }
    catch (error) {
        response.status(400).json({ error: error.message });
    }
});
fantasyTeamRouter.put('/:id', middleware_1.authorization, async (request, response) => {
    const body = request.body;
    try {
        const team = await fantasyteamService_1.default.addRunnerToFantasyTeam(request.params.id, body.runner);
        response.status(200).json(team);
    }
    catch (error) {
        response.status(400).json({ error: error.message });
    }
});
fantasyTeamRouter.delete('/:id/:runnerId', middleware_1.authorization, async (request, response) => {
    try {
        await fantasyteamService_1.default.removeRunnerFromFantasyTeam(request.params.id, request.params.runnerId);
        response
            .status(204)
            .json({ message: 'runner deleted from fantasy team' });
    }
    catch (error) {
        response.status(400).json({ error: error.message });
    }
});
exports.default = fantasyTeamRouter;
