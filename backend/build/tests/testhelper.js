"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialRunners = void 0;
const runnerModel_1 = __importDefault(require("../src/models/runnerModel"));
const fantasyTeamModel_1 = __importDefault(require("../src/models/fantasyTeamModel"));
const userModel_1 = __importDefault(require("../src/models/userModel"));
exports.initialRunners = [
    {
        name: 'Timo Silakka',
        team: 'Tampereen Poliisivoimien Urheilijat',
        points: 3,
        price: 100,
        runnerPhoto: 'test',
        _id: '5f9f1b9b9c9d440000a1b0f1',
        __v: 0,
    },
    {
        name: 'Jukka Kinnunen',
        team: 'Tampereen Poliisivoimien Urheilijat',
        points: 0,
        price: 100,
        runnerPhoto: 'test',
        _id: '5f9f1b9b9c9d440000a1b0f2',
        __v: 0,
    },
    {
        name: 'Lauri Sild',
        team: 'Koovee',
        points: 0,
        price: 100,
        runnerPhoto: 'test',
        _id: '5f9f1b9b9c9d440000a1b0f3',
        __v: 0,
    },
    {
        name: 'Timo Sild',
        team: 'Koovee',
        points: 0,
        price: 100,
        runnerPhoto: 'test',
        _id: '5f9f1b9b9c9d440000a1b0f4',
        __v: 0,
    },
    {
        name: 'Oskari Nuottonen',
        team: 'Luolamiehet',
        points: 0,
        price: 100,
        runnerPhoto: 'test',
        _id: '5f9f1b9b9c9d440000a1b0f5',
        __v: 0,
    },
    {
        name: 'Markus Kaihola',
        team: 'Luolamiehet',
        points: 0,
        price: 100,
        runnerPhoto: 'test',
        _id: '5f9f1b9b9c9d440000a1b0f6',
        __v: 0,
    },
];
async function initializeDatabase() {
    await runnerModel_1.default.deleteMany({});
    await fantasyTeamModel_1.default.deleteMany({});
    await userModel_1.default.deleteMany({});
    await runnerModel_1.default.insertMany(exports.initialRunners);
}
exports.default = initializeDatabase;
