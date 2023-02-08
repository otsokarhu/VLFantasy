"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../utils/middleware");
const userService_1 = __importDefault(require("../services/userService"));
const utils_1 = __importDefault(require("../utils/utils"));
const userRouter = express_1.default.Router();
userRouter.get('/', async (_request, response) => {
    try {
        const users = await userService_1.default.getAllUsers();
        response.json(users);
    }
    catch (error) {
        response.status(400).json({ error: error.message });
    }
});
userRouter.post('/', async (request, response) => {
    try {
        const valitadedBody = utils_1.default.toNewUser(request.body);
        const user = await userService_1.default.createUser(valitadedBody);
        response.status(201).json(user);
    }
    catch (error) {
        response.status(400).json({ error: error.message });
    }
});
userRouter.get('/:id', async (request, response) => {
    try {
        const user = await userService_1.default.getUser(request.params.id);
        response.json(user);
    }
    catch (error) {
        response.status(400).json({ error: error.message });
    }
});
userRouter.delete('/:id', middleware_1.authorization, async (request, response) => {
    try {
        await userService_1.default.deleteUser(request.params.id);
        response.status(204).end();
    }
    catch (error) {
        response.status(400).json({ error: error.message });
    }
});
userRouter.put('/:id', middleware_1.authorization, async (request, response) => {
    try {
        const valitadedBody = utils_1.default.toNewUser(request.body);
        const user = await userService_1.default.editUser(request.params.id, valitadedBody);
        response.json(user);
    }
    catch (error) {
        response.status(400).json({ error: error.message });
    }
});
exports.default = userRouter;
