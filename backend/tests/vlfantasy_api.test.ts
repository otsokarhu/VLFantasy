/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../src/index';
import initializeDatabase, { initialRunners } from './testhelper';
import bcrypt from 'bcrypt';
import userModel from '../src/models/userModel';
import fantasyTeamModel from '../src/models/fantasyTeamModel';

const api = supertest(app);

beforeEach(async () => {
  await initializeDatabase();
});

describe('login tests', () => {
  beforeEach(async () => {
    const passwordHash = await bcrypt.hash('testpassword', 10);
    const user = new userModel({
      name: 'Test User',
      username: 'testuser',
      email: 'testil@gmail.com',
      passwordHash,
    });
    await user.save();
  });
  test('login with correct credentials', async () => {
    const user = {
      username: 'testuser',
      password: 'testpassword',
    };
    await api
      .post('/api/login')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
  test('login with incorrect credentials returns right error', async () => {
    const wrongUser = {
      username: 'testuser',
      password: 'wrongpassword',
    };
    await api
      .post('/api/login')
      .send(wrongUser)
      .expect(401)
      .expect((response) => {
        expect(response.body.error).toBe('invalid username or password');
      });
  });
});

describe('runner tests', () => {
  test('runners are returned as json', async () => {
    await api
      .get('/api/runners')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('there are six runners', async () => {
    const response = await api.get('/api/runners');
    expect(response.body).toHaveLength(initialRunners.length);
  });

  test('every runner has an id', async () => {
    const response = await api.get('/api/runners');
    response.body.forEach((runner: any) => {
      expect(runner.id).toBeDefined();
    });
  });

  test('runner can be added', async () => {
    const newRunner = {
      name: 'Test Runner',
      team: 'Test Team',
      points: 0,
      price: 0,
      runnerPhoto: 'testphoto',
    };
    await api
      .post('/api/runners')
      .send(newRunner)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    const response = await api.get('/api/runners');
    expect(response.body).toHaveLength(initialRunners.length + 1);
  });

  test('runner can be deleted', async () => {
    const response = await api.get('/api/runners');
    const runnerToDelete = response.body[0];
    await api.delete(`/api/runners/${runnerToDelete.id}`).expect(204);
    const responseAfterDelete = await api.get('/api/runners');
    expect(responseAfterDelete.body).toHaveLength(initialRunners.length - 1);
    expect(responseAfterDelete.body).not.toContainEqual(runnerToDelete);
  });

  test('it is possible to update runner points', async () => {
    const response = await api.get('/api/runners');
    const runnerToUpdate = response.body[0];
    const newPoints = 10;
    const updateRunner = await api
      .put(`/api/runners/points/${runnerToUpdate.id}`)
      .send({ points: newPoints })
      .expect(200);

    expect(updateRunner.body.points).toBe(runnerToUpdate.points + newPoints);
  });
});

describe('fantasy team tests', () => {
  test('fantasy teams are returned as json', async () => {
    await api
      .get('/api/fantasyTeams')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('fantasy team can not be added without auth', async () => {
    const newTeam = {
      name: 'Test Team',
      runners: [],
    };
    await api
      .post('/api/fantasyTeams')
      .send(newTeam)
      .expect(401)
      .expect((response) => {
        expect(response.body.error).toBe('Please authenticate');
      });
  });

  test('fantasy team can be added with auth', async () => {
    const passwordHash = await bcrypt.hash('sikret', 10);
    const user = new userModel({
      name: 'Test User',
      username: 'testuser',
      email: 'test',
      passwordHash,
    });
    await user.save();
    const token = await api
      .post('/api/login')
      .send({ username: 'testuser', password: 'sikret' });

    const newTeam = {
      name: 'Test Team',
      user: user._id,
    };
    await api
      .post('/api/fantasyTeams')
      .set('Authorization', `bearer ${token.body.token}`)
      .send(newTeam)
      .expect(201);

    const response = await api.get('/api/fantasyTeams');
    const teamNames = response.body.map((team: any) => team.name);
    expect(teamNames).toContain(newTeam.name);
  });

  test('fantasy team can not be added without name', async () => {
    const passwordHash = await bcrypt.hash('sikret', 10);
    const user = new userModel({
      name: 'Test User',
      username: 'testuser',
      email: 'test',
      passwordHash,
    });
    await user.save();
    const token = await api
      .post('/api/login')
      .send({ username: 'testuser', password: 'sikret' });

    const newTeam = {
      user: user._id,
    };
    await api
      .post('/api/fantasyTeams')
      .set('Authorization', `bearer ${token.body.token}`)
      .send(newTeam)
      .expect(400)
      .expect((response) => {
        expect(response.body.error).toContain('Name is required');
      });

    const response = await api.get('/api/fantasyTeams');
    expect(response.body).not.toContainEqual(newTeam);
  });

  test('fantasy team can be deleted', async () => {
    const passwordHash = await bcrypt.hash('sikret', 10);
    const user = new userModel({
      name: 'Test User',
      username: 'testuser',
      email: 'test',
      passwordHash,
    });
    await user.save();
    const token = await api
      .post('/api/login')
      .send({ username: 'testuser', password: 'sikret' });

    const newTeam = {
      name: 'Test Team',
      user: user._id,
    };

    await api
      .post('/api/fantasyTeams')
      .set('Authorization', `bearer ${token.body.token}`)
      .send(newTeam);

    const response = await api.get('/api/fantasyTeams');
    const teamToDelete = response.body[0];

    await api
      .delete(`/api/fantasyTeams/${teamToDelete.id}`)
      .set('Authorization', `bearer ${token.body.token}`)
      .expect(204);

    const responseAfterDelete = await api.get('/api/fantasyTeams');
    expect(responseAfterDelete.body).toHaveLength(0);
    expect(user.fantasyTeam === null);
  });

  test('fantasy team can not be deleted without auth', async () => {
    const passwordHash = await bcrypt.hash('sikret', 10);
    const user = new userModel({
      name: 'Test User',
      username: 'testuser',
      email: 'test',
      passwordHash,
    });
    await user.save();
    const token = await api
      .post('/api/login')
      .send({ username: 'testuser', password: 'sikret' });

    const newTeam = {
      name: 'Test Team',
      user: user._id,
    };

    await api
      .post('/api/fantasyTeams')
      .set('Authorization', `bearer ${token.body.token}`)
      .send(newTeam);

    const response = await api.get('/api/fantasyTeams');
    const teamToDelete = response.body[0];

    await api.delete(`/api/fantasyTeams/${teamToDelete.id}`).expect(401);

    const responseAfterDelete = await api.get('/api/fantasyTeams');
    expect(responseAfterDelete.body).toHaveLength(1);
  });

  test('user can have only one fantasy team', async () => {
    const passwordHash = await bcrypt.hash('sikret', 10);
    const user = new userModel({
      name: 'Test User',
      username: 'testuser',
      email: 'test',
      passwordHash,
    });
    await user.save();
    const token = await api
      .post('/api/login')
      .send({ username: 'testuser', password: 'sikret' });

    const newTeam = {
      name: 'Test Team',
      user: user._id,
    };
    await api
      .post('/api/fantasyTeams')
      .set('Authorization', `bearer ${token.body.token}`)
      .send(newTeam)
      .expect(201);

    const newTeam2 = {
      name: 'Test Team 2',
      user: user._id,
    };
    await api
      .post('/api/fantasyTeams')
      .set('Authorization', `bearer ${token.body.token}`)
      .send(newTeam2)
      .expect(400);
  });

  test('runner can be added to fantasy team', async () => {
    const passwordHash = await bcrypt.hash('sikret', 10);
    const user = new userModel({
      name: 'Test User',
      username: 'testuser',
      email: 'test',
      passwordHash,
    });
    await user.save();
    const token = await api
      .post('/api/login')
      .send({ username: 'testuser', password: 'sikret' });

    const newTeam = {
      name: 'Test Team',
      user: user._id,
    };
    await api
      .post('/api/fantasyTeams')
      .set('Authorization', `bearer ${token.body.token}`)
      .send(newTeam)
      .expect(201);

    const teams = await api.get('/api/fantasyTeams');
    const team = teams.body[0];
    const runners = await api.get('/api/runners');
    const runnerToAdd = runners.body[0];

    await api
      .put(`/api/fantasyTeams/${team.id}`)
      .set('Authorization', `bearer ${token.body.token}`)
      .send({ runner: runnerToAdd.id })
      .expect(200);
  });
  test('runner can be removed from fantasy team', async () => {
    const passwordHash = await bcrypt.hash('sikret', 10);
    const user = new userModel({
      name: 'Test User',
      username: 'testuser',
      email: 'test',
      passwordHash,
    });
    await user.save();
    const token = await api
      .post('/api/login')
      .send({ username: 'testuser', password: 'sikret' });

    const newTeam = {
      name: 'Test Team',
      user: user._id,
    };
    await api
      .post('/api/fantasyTeams')
      .set('Authorization', `bearer ${token.body.token}`)
      .send(newTeam)
      .expect(201);

    const teams = await api.get('/api/fantasyTeams');
    const team = teams.body[0];
    const runners = await api.get('/api/runners');
    const runnerToAdd = runners.body[0];

    await api
      .put(`/api/fantasyTeams/${team.id}`)
      .set('Authorization', `bearer ${token.body.token}`)
      .send({ runner: runnerToAdd.id })
      .expect(200);

    await api
      .delete(`/api/fantasyTeams/${team.id}/${runnerToAdd.id}`)
      .set('Authorization', `bearer ${token.body.token}`)
      .expect(204);

    const response = await api.get(`/api/fantasyTeams/${team.id}`);
    expect(response.body.runners).toHaveLength(0);
  });

  test('runner can not be added to fantasy team twice', async () => {
    const passwordHash = await bcrypt.hash('sikret', 10);
    const user = new userModel({
      name: 'Test User',
      username: 'testuser',
      email: 'test',
      passwordHash,
    });
    await user.save();
    const token = await api
      .post('/api/login')
      .send({ username: 'testuser', password: 'sikret' });

    const newTeam = {
      name: 'Test Team',
      user: user.id,
    };
    await api
      .post('/api/fantasyTeams')
      .set('Authorization', `bearer ${token.body.token}`)
      .send(newTeam)
      .expect(201);

    const teams = await api.get('/api/fantasyTeams');
    const team = teams.body[0];
    const runners = await api.get('/api/runners');
    const runnerToAdd = runners.body[0];

    await api
      .put(`/api/fantasyTeams/${team.id}`)
      .set('Authorization', `bearer ${token.body.token}`)
      .send({ runner: runnerToAdd.id })
      .expect(200);

    await api
      .put(`/api/fantasyTeams/${team.id}`)
      .set('Authorization', `bearer ${token.body.token}`)
      .send({ runner: runnerToAdd.id })
      .expect(400);

    const response = await api.get(`/api/fantasyTeams/${team.id}`);
    expect(response.body.runners).toHaveLength(1);
  });
});

describe('user tests', () => {
  beforeEach(async () => {
    await userModel.deleteMany({});
    await fantasyTeamModel.deleteMany({});
  });

  test('user can be added', async () => {
    const usersInBeginning = await api.get('/api/VLusers');

    const newUser = {
      name: 'Test User2',
      username: 'testuser2',
      email: 'oskarikakkori@hotmail.com',
      password: 'verisikret',
    };

    await api.post('/api/VLusers').send(newUser).expect(201);

    const usersAfterPost = await api.get('/api/VLusers');
    expect(usersAfterPost.body).toHaveLength(usersInBeginning.body.length + 1);

    const usernames = usersAfterPost.body.map((user: any) => user.username);
    expect(usernames).toContain(newUser.username);
  });

  test('username can be changed', async () => {
    const newUser = {
      name: 'Test User2',
      username: 'testuser2',
      email: 'oskarikakkori@hotmail.com',
      password: 'verisikret',
    };

    await api.post('/api/VLusers').send(newUser).expect(201);

    const token = await api
      .post('/api/login')
      .send({ username: 'testuser2', password: 'verisikret' });

    const usersAfterPost = await api.get('/api/VLusers');
    const userToChange = usersAfterPost.body[0];

    await api
      .put(`/api/VLusers/${userToChange.id}`)
      .set('Authorization', `bearer ${token.body.token}`)
      .send({
        name: userToChange.name,
        username: 'testuser3',
        email: userToChange.email,
        password: 'verisikret',
      })
      .expect(200);

    const usersAfterChange = await api.get('/api/VLusers');
    const usernames = usersAfterChange.body.map((user: any) => user.username);
    expect(usernames).toContain('testuser3');
  });

  test('name can be changed', async () => {
    const newUser = {
      name: 'Test User2',
      username: 'testuser2',
      email: 'oskarikakkori@hotmail.com',
      password: 'verisikret',
    };

    await api.post('/api/VLusers').send(newUser).expect(201);

    const token = await api
      .post('/api/login')
      .send({ username: 'testuser2', password: 'verisikret' });

    const usersAfterPost = await api.get('/api/VLusers');
    const userToChange = usersAfterPost.body[0];

    await api
      .put(`/api/VLusers/${userToChange.id}`)
      .set('Authorization', `bearer ${token.body.token}`)
      .send({
        name: 'Muutettu',
        username: userToChange.username,
        email: userToChange.email,
        password: 'verisikret',
      })
      .expect(200);

    const usersAfterChange = await api.get('/api/VLusers');
    const names = usersAfterChange.body.map((user: any) => user.name);
    expect(names).toContain('Muutettu');
  });

  test('username can be changed', async () => {
    const newUser = {
      name: 'Test User2',
      username: 'testuser2',
      email: 'oskarikakkori@hotmail.com',
      password: 'verisikret',
    };

    await api.post('/api/VLusers').send(newUser).expect(201);

    const token = await api
      .post('/api/login')
      .send({ username: 'testuser2', password: 'verisikret' });

    const usersAfterPost = await api.get('/api/VLusers');
    const userToChange = usersAfterPost.body[0];

    await api
      .put(`/api/VLusers/${userToChange.id}`)
      .set('Authorization', `bearer ${token.body.token}`)
      .send({
        name: userToChange.name,
        username: userToChange.username,
        email: 'eriposti@msn.com',
        password: 'verisikret',
      })
      .expect(200);

    const usersAfterChange = await api.get('/api/VLusers');
    const emails = usersAfterChange.body.map((user: any) => user.email);
    expect(emails).toContain('eriposti@msn.com');
  });

  test('multiple things can be changed at once', async () => {
    const newUser = {
      name: 'Test User2',
      username: 'testuser2',
      email: 'oskarikakkori@hotmail.com',
      password: 'verisikret',
    };

    await api.post('/api/VLusers').send(newUser).expect(201);

    const token = await api
      .post('/api/login')
      .send({ username: 'testuser2', password: 'verisikret' });

    const usersAfterPost = await api.get('/api/VLusers');
    const userToChange = usersAfterPost.body[0];

    await api
      .put(`/api/VLusers/${userToChange.id}`)
      .set('Authorization', `bearer ${token.body.token}`)
      .send({
        name: 'Oskari',
        username: 'testuser3',
        email: 'oskarinposti@gmail.com',
        password: 'verisikret',
      })
      .expect(200);
    await api
      .post('/api/login')
      .send({ username: 'testuser3', password: 'verisikret' })
      .expect(200);

    const usersAfterChange = await api.get('/api/VLusers');
    const usernames = usersAfterChange.body.map((user: any) => user.username);
    const names = usersAfterChange.body.map((user: any) => user.name);
    const emails = usersAfterChange.body.map((user: any) => user.email);
    expect(usernames).toContain('testuser3');
    expect(names).toContain('Oskari');
    expect(emails).toContain('oskarinposti@gmail.com');
  });

  test('password can be changed', async () => {
    const newUser = {
      name: 'Test User2',
      username: 'testuser2',
      email: 'oskarikakkori@hotmail.com',
      password: 'verisikret',
    };

    await api.post('/api/VLusers').send(newUser).expect(201);

    const token = await api
      .post('/api/login')
      .send({ username: 'testuser2', password: 'verisikret' });

    const usersAfterPost = await api.get('/api/VLusers');
    const userToChange = usersAfterPost.body[0];

    await api
      .put(`/api/VLusers/${userToChange.id}`)
      .set('Authorization', `bearer ${token.body.token}`)
      .send({
        name: userToChange.name,
        username: userToChange.username,
        email: userToChange.email,
        password: 'verisikret',
        newpassword: 'veris',
      })
      .expect(200);

    await api
      .post('/api/login')
      .send({ username: 'testuser2', password: 'veris' })
      .expect(200);
  });

  test('user can be deleted', async () => {
    const newUser = {
      name: 'Test User2',
      username: 'testuser2',
      email: 'oskarikakkori@hotmail.com',
      password: 'verisikret',
    };

    await api.post('/api/VLusers').send(newUser).expect(201);

    const token = await api
      .post('/api/login')
      .send({ username: 'testuser2', password: 'verisikret' });

    const usersInBeginning = await api.get('/api/VLusers');
    const userToDelete = usersInBeginning.body[0];

    await api
      .delete(`/api/VLusers/${userToDelete.id}`)
      .set('Authorization', `bearer ${token.body.token}`)
      .expect(204);
    const usersNow = await api.get('/api/VLusers');
    expect(usersNow.body).toHaveLength(usersInBeginning.body.length - 1);
  });

  test('non existing user can not be deleted', async () => {
    const newUser = {
      name: 'Test User2',
      username: 'testuser2',
      email: 'oskarikakkori@hotmail.com',
      password: 'verisikret',
    };

    await api.post('/api/VLusers').send(newUser).expect(201);

    const token = await api
      .post('/api/login')
      .send({ username: 'testuser2', password: 'verisikret' });

    const usersInBeginning = await api.get('/api/VLusers');
    const userToDelete = usersInBeginning.body[0];

    await api
      .delete(`/api/VLusers/${userToDelete.id + '1'}`)
      .set('Authorization', `bearer ${token.body.token}`)
      .expect(400);
    const usersNow = await api.get('/api/VLusers');
    expect(usersNow.body).toHaveLength(usersInBeginning.body.length);
  });

  test('user can not be deleted without auth', async () => {
    const newUser = {
      name: 'Test User2',
      username: 'testuser2',
      email: 'oskarikakkori@hotmail.com',
      password: 'verisikret',
    };

    await api.post('/api/VLusers').send(newUser).expect(201);

    const usersInBeginning = await api.get('/api/VLusers');
    const userToDelete = usersInBeginning.body[0];

    await api
      .delete(`/api/VLusers/${userToDelete.id}`)
      .expect(401)
      .expect((response) => {
        expect(response.body.error).toBe('Please authenticate');
      });
    const usersNow = await api.get('/api/VLusers');
    expect(usersNow.body).toHaveLength(usersInBeginning.body.length);
  });

  test('user can not be added without username', async () => {
    const usersInBeginning = await api.get('/api/VLusers');

    const newUser = {
      name: 'Test User2',
      email: 'test2@gmail.com',
      password: 'verisikret',
    };

    await api.post('/api/VLusers').send(newUser).expect(400);

    const usersAfterPost = await api.get('/api/VLusers');
    expect(usersAfterPost.body).toHaveLength(usersInBeginning.body.length);
  });

  test('user can not be added without password', async () => {
    const usersInBeginning = await api.get('/api/VLusers');

    const newUser = {
      name: 'Test User2',
      username: 'testuser2',
      email: 'test2@gmail.com',
    };

    await api.post('/api/VLusers').send(newUser).expect(400);

    const usersAfterPost = await api.get('/api/VLusers');
    expect(usersAfterPost.body).toHaveLength(usersInBeginning.body.length);
  });

  test('user can not be added without email', async () => {
    const usersInBeginning = await api.get('/api/VLusers');

    const newUser = {
      name: 'Test User2',
      username: 'testuser2',
      password: 'test2',
    };

    await api.post('/api/VLusers').send(newUser).expect(400);

    const usersAfterPost = await api.get('/api/VLusers');
    expect(usersAfterPost.body).toHaveLength(usersInBeginning.body.length);
  });

  test('user can not be added without name', async () => {
    const usersInBeginning = await api.get('/api/VLusers');

    const newUser = {
      email: 'testi@gmail.com',
      username: 'testuser2',
      password: 'test2',
    };

    await api.post('/api/VLusers').send(newUser).expect(400);

    const usersAfterPost = await api.get('/api/VLusers');
    expect(usersAfterPost.body).toHaveLength(usersInBeginning.body.length);
  });

  test('user can not be added with too short username', async () => {
    const usersInBeginning = await api.get('/api/VLusers');

    const newUser = {
      name: 'Test User2',
      username: 'te',
      email: 'test2@gmail.com',
      password: 'verisikret',
    };

    await api.post('/api/VLusers').send(newUser).expect(400);

    const usersAfterPost = await api.get('/api/VLusers');
    expect(usersAfterPost.body).toHaveLength(usersInBeginning.body.length);
  });

  test('user can not be added with too short password', async () => {
    const usersInBeginning = await api.get('/api/VLusers');

    const newUser = {
      name: 'Test User2',
      username: 'testuser2',
      email: 'test2@gmail.com',
      password: 'te',
    };

    await api.post('/api/VLusers').send(newUser).expect(400);

    const usersAfterPost = await api.get('/api/VLusers');
    expect(usersAfterPost.body).toHaveLength(usersInBeginning.body.length);
  });

  test('user can not be added if username is taken', async () => {
    const usersInBeginning = await api.get('/api/VLusers');

    const newUser = {
      name: 'Test User2',
      username: 'testuser2',
      email: 'test2@gmail.com',
      password: 'sikret',
    };

    await api.post('/api/VLusers').send(newUser).expect(201);

    const newUser2 = {
      name: 'Test User3',
      username: 'testuser2',
      email: 'test3@gmail.com',
      password: 'sallainen',
    };

    await api.post('/api/VLusers').send(newUser2).expect(400);

    const usersAfterPost = await api.get('/api/VLusers');
    expect(usersAfterPost.body).toHaveLength(usersInBeginning.body.length + 1);
  });
});

afterAll(() => {
  void mongoose.connection.close();
});
