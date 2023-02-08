"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorization = exports.errorHandler = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../utils/config");
const logger_1 = __importDefault(require("../utils/logger"));
const unknownEndpoint = (_request, response) => {
    response.status(404).send({
        error: 'unknown endpoint',
        message: 'Check the documentation for the correct endpoint',
    });
};
const errorHandler = (error, _request, response, next) => {
    logger_1.default.error(error.message);
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted media id' });
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    }
    next(error);
    return null;
};
exports.errorHandler = errorHandler;
const authorization = (request, response, next) => {
    try {
        const token = request.header('Authorization')?.replace('bearer ', '');
        if (!token) {
            throw new Error();
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.SECRET);
        request.token = decoded;
        next();
    }
    catch (err) {
        response.status(401).send({ error: 'Please authenticate' });
    }
};
exports.authorization = authorization;
const requestLogger = (request, _response, next) => {
    logger_1.default.info('Method:', request.method);
    logger_1.default.info('Path:  ', request.path);
    logger_1.default.info('Body:  ', request.body);
    logger_1.default.info('---');
    next();
    return null;
};
exports.default = {
    unknownEndpoint,
    errorHandler: exports.errorHandler,
    requestLogger,
    authorization: exports.authorization,
};
