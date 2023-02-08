"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECRET = exports.MONGODB_URI = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = process.env.NODE_ENV === 'test'
    ? process.env.TEST_PORT || 3001
    : process.env.PORT || 3001;
exports.MONGODB_URI = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI || ''
    : process.env.MONGODB_URI || '';
exports.SECRET = process.env.SECRET || '';
