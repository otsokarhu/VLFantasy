"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const RunnerZod = zod_1.z.object({
    name: zod_1.z.string({ required_error: 'Name is required' }),
    team: zod_1.z.string({ required_error: 'Team is required' }),
    points: zod_1.z.number({ required_error: 'Points are required' }),
    price: zod_1.z.number({ required_error: 'Price is required' }),
    runnerPhoto: zod_1.z.string({ required_error: 'Runner photo is required' }),
});
const FantasyTeamZod = zod_1.z.object({
    name: zod_1.z.string({ required_error: 'Name is required' }),
    user: zod_1.z.string({ required_error: 'User is required' }),
    runners: zod_1.z.array(RunnerZod),
    id: zod_1.z.string().optional(),
    points: zod_1.z.number(),
});
const UserZodSchema = zod_1.z.object({
    username: zod_1.z.string({ required_error: 'Username is required' }).min(3).max(20),
    name: zod_1.z.string({ required_error: 'Name is required' }).min(3).max(50),
    email: zod_1.z
        .string({ required_error: 'Email is required' })
        .email()
        .min(5)
        .max(50),
    passwordHash: zod_1.z
        .string({ required_error: 'Password is required' })
        .min(3)
        .max(50),
    id: zod_1.z.string().optional(),
    fantasyTeam: zod_1.z.string().optional(),
});
const NewFantasyTeamZod = zod_1.z.object({
    name: zod_1.z.string({ required_error: 'Name is required' }).min(3).max(20),
    user: zod_1.z.string({ required_error: 'User is required' }).min(3).max(50),
});
const NewUserZod = zod_1.z.object({
    username: zod_1.z.string({ required_error: 'Username is required' }).min(3).max(20),
    name: zod_1.z.string({ required_error: 'Name is required' }).min(3).max(50),
    email: zod_1.z
        .string({ required_error: 'Email is required' })
        .email()
        .min(5)
        .max(50),
    password: zod_1.z.string({ required_error: 'Password is required' }).min(3).max(50),
    newpassword: zod_1.z
        .string({ required_error: 'Password is required' })
        .min(3)
        .max(50)
        .optional(),
});
const toNewRunner = ({ name, team, points, price, runnerPhoto, }) => {
    const validatedBody = RunnerZod.parse({
        name,
        team,
        points,
        price,
        runnerPhoto,
    });
    return validatedBody;
};
const toValidateNumber = (param) => {
    return zod_1.z
        .number({
        required_error: 'Value must be given',
        invalid_type_error: 'Value must be number',
    })
        .parse(param);
};
const toValidateString = (param) => {
    return zod_1.z
        .string({
        required_error: 'Input must be given',
        invalid_type_error: 'Input must be a number',
    })
        .max(50)
        .parse(param);
};
const toNewFantasyTeam = ({ name, user, }) => {
    const newFantasyTeam = NewFantasyTeamZod.parse({ name, user });
    return newFantasyTeam;
};
const toNewUser = ({ username, name, password, email, newpassword, }) => {
    const newUser = NewUserZod.parse({
        username,
        name,
        password,
        email,
        newpassword,
    });
    return newUser;
};
exports.default = {
    toNewFantasyTeam,
    toNewRunner,
    toNewUser,
    toValidateNumber,
    toValidateString,
    FantasyTeamZod,
    RunnerZod,
    UserZodSchema,
};
