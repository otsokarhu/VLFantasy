"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("./logger"));
const connectToDb = async () => {
    try {
        await mongoose_1.default.connect(config_1.MONGODB_URI, {});
        logger_1.default.info('Connected to MongoDB');
    }
    catch (error) {
        logger_1.default.error('Error connecting to MongoDB:' + error.message);
    }
};
exports.default = connectToDb;
