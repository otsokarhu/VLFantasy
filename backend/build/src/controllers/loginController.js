"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loginService_1 = __importDefault(require("../services/loginService"));
const utils_1 = __importDefault(require("../utils/utils"));
const loginRouter = express_1.default.Router();
loginRouter.post('/', async (request, response) => {
    try {
        const { username, password } = request.body;
        utils_1.default.toValidateString(username);
        utils_1.default.toValidateString(password);
        const user = await loginService_1.default.login(username, password);
        response.status(200).send(user);
    }
    catch (error) {
        response.status(401).json({ error: error.message });
    }
});
exports.default = loginRouter;
