"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const info = (...params) => {
    if (process.env.NODE_ENV !== 'test') {
        console.log(...params);
    }
};
const error = (...params) => {
    if (process.env.NODE_ENV !== 'test') {
        console.error(...params);
    }
};
exports.default = {
    info,
    error,
};
