"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./utils/config");
const database_1 = __importDefault(require("./utils/database"));
const middleware_1 = __importDefault(require("./utils/middleware"));
const userController_1 = __importDefault(require("./controllers/userController"));
const loginController_1 = __importDefault(require("./controllers/loginController"));
const runnerController_1 = __importDefault(require("./controllers/runnerController"));
const fantasyTeamController_1 = __importDefault(require("./controllers/fantasyTeamController"));
exports.app = (0, express_1.default)();
exports.app.get('/api/testing', (_req, res) => {
    res.send('This works');
});
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)());
exports.app.use(middleware_1.default.requestLogger);
exports.app.use('/api/VLusers', userController_1.default);
exports.app.use('/api/login', loginController_1.default);
exports.app.use('/api/runners', runnerController_1.default);
exports.app.use('/api/fantasyTeams', fantasyTeamController_1.default);
exports.app.get('/');
exports.app.use(middleware_1.default.unknownEndpoint);
exports.app.use(middleware_1.default.errorHandler);
const start = async () => {
    await (0, database_1.default)();
    exports.app.listen(config_1.PORT, () => {
        console.log(`Server running on port ${config_1.PORT}`);
    });
};
void start();
exports.default = exports.app;
