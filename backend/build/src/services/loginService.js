"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../utils/config");
const login = async (username, password) => {
    const user = await userModel_1.default.findOne({ username });
    const passwordCorrect = user === null ? false : await bcrypt_1.default.compare(password, user.passwordHash);
    if (!(user && passwordCorrect)) {
        throw new Error('invalid username or password');
    }
    const userForToken = {
        username: user.username,
        id: user._id,
    };
    const token = jsonwebtoken_1.default.sign(userForToken, config_1.SECRET, { expiresIn: 60 * 60 });
    return {
        token,
        username: user.username,
        name: user.name,
        id: user._id,
        fantasyTeam: user.fantasyTeam || '',
        email: user.email,
    };
};
exports.default = { login };
