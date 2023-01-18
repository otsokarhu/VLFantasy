import runnerModel from '../models/runnerModel';
import fantasyTeamModel from '../models/fantasyTeamModel';
import userModel from '../models/userModel';

export const initialRunners = [
  {
    name: 'Timo Silakka',
    team: 'Tampereen Poliisivoimien Urheilijat',
    points: 3,
    _id: '5f9f1b9b9c9d440000a1b0f1',
    __v: 0,
  },
  {
    name: 'Jukka Kinnunen',
    team: 'Tampereen Poliisivoimien Urheilijat',
    points: 0,
    _id: '5f9f1b9b9c9d440000a1b0f2',
    __v: 0,
  },
  {
    name: 'Lauri Sild',
    team: 'Koovee',
    points: 0,
    _id: '5f9f1b9b9c9d440000a1b0f3',
    __v: 0,
  },
  {
    name: 'Timo Sild',
    team: 'Koovee',
    points: 0,
    _id: '5f9f1b9b9c9d440000a1b0f4',
    __v: 0,
  },
  {
    name: 'Oskari Nuottonen',
    team: 'Luolamiehet',
    points: 0,
    _id: '5f9f1b9b9c9d440000a1b0f5',
    __v: 0,
  },
  {
    name: 'Markus Kaihola',
    team: 'Luolamiehet',
    points: 0,
    _id: '5f9f1b9b9c9d440000a1b0f6',
    __v: 0,
  },
];

export default async function initializeDatabase() {
  await runnerModel.deleteMany({});
  await fantasyTeamModel.deleteMany({});
  await userModel.deleteMany({});
  await runnerModel.insertMany(initialRunners);
}
