import mongoose from "mongoose";
import supertest from "supertest";
import app from "../index"
import initializeDatabase, { initialRunners } from "./testhelper";
import bcrypt from "bcrypt";
import userModel from "../models/userModel";
import fantasyTeamModel from "../models/fantasyTeamModel";

const api = supertest(app)


beforeEach(async () => {
  await initializeDatabase()
})



describe('runner tests', () => {
  test('runners are returned as json', async () => {
    await api
      .get('/api/runners')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are six runners', async () => {
    const response = await api.get('/api/runners')
    expect(response.body).toHaveLength(initialRunners.length)
  })

  test('every runner has an id', async () => {
    const response = await api.get('/api/runners')
    response.body.forEach((runner: any) => {
      expect(runner._id).toBeDefined()
    })
  })

  test('runner can be added', async () => {
    const newRunner = {
      name: "Test Runner",
      team: "Test Team",
      points: 0
    }
    await api
      .post('/api/runners')
      .send(newRunner)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/runners')
    expect(response.body).toHaveLength(initialRunners.length + 1)
  })

  test('runner can be deleted', async () => {
    const response = await api.get('/api/runners')
    const runnerToDelete = response.body[0]
    await api
      .delete(`/api/runners/${runnerToDelete._id}`)
      .expect(204)
    const responseAfterDelete = await api.get('/api/runners')
    expect(responseAfterDelete.body).toHaveLength(initialRunners.length - 1)
    expect(responseAfterDelete.body).not.toContainEqual(runnerToDelete)
  })

  test('it is possible to update runner points', async () => {
    const response = await api.get('/api/runners')
    const runnerToUpdate = response.body[0]
    const newPoints = 10
    const updateRunner = await api
      .put(`/api/runners/${runnerToUpdate._id}`)
      .send({ points: runnerToUpdate.points + newPoints })
      .expect(200)

    expect(updateRunner.body.points).toBe(runnerToUpdate.points + newPoints)
  })
})

describe('fantasy team tests', () => {
  test('fantasy teams are returned as json', async () => {
    await api
      .get('/api/fantasyTeams')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('fantasy team can not be added without auth', async () => {
    const newTeam = {
      name: "Test Team",
      runners: []
    }
    await api
      .post('/api/fantasyTeams')
      .send(newTeam)
      .expect(401)

  })

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
      .send({ username: 'testuser', password: 'sikret' })
      .then((response) => response.body.token)

    const newTeam = {
      name: "Test Team",
      user: user._id,
    }
    await api
      .post('/api/fantasyTeams')
      .set('Authorization', `bearer ${token}`)
      .send(newTeam)
      .expect(201)

    const response = await api.get('/api/fantasyTeams')
    const teamNames = response.body.map((team: any) => team.name)
    expect(teamNames).toContain(newTeam.name)
  })

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
      .send({ username: 'testuser', password: 'sikret' })
      .then((response) => response.body.token)

    const newTeam = {
      user: user._id,
    }
    await api
      .post('/api/fantasyTeams')
      .set('Authorization', `bearer ${token}`)
      .send(newTeam)
      .expect(400)

    const response = await api.get('/api/fantasyTeams')
    expect(response.body).not.toContainEqual(newTeam)
  })

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
      .send({ username: 'testuser', password: 'sikret' })
      .then((response) => response.body.token)


    const newTeam = {
      name: "Test Team",
      user: user._id,
    }

    await api
      .post('/api/fantasyTeams')
      .set('Authorization', `bearer ${token}`)
      .send(newTeam)

    const response = await api.get('/api/fantasyTeams')
    const teamToDelete = response.body[0]

    await api
      .delete(`/api/fantasyTeams/${teamToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const responseAfterDelete = await api.get('/api/fantasyTeams')
    expect(responseAfterDelete.body).toHaveLength(0)
    expect(user.fantasyTeam === null)
  })

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
      .send({ username: 'testuser', password: 'sikret' })
      .then((response) => response.body.token)

    const newTeam = {
      name: "Test Team",
      user: user._id,
    }
    await api
      .post('/api/fantasyTeams')
      .set('Authorization', `bearer ${token}`)
      .send(newTeam)
      .expect(201)

    const newTeam2 = {
      name: "Test Team 2",
      user: user._id,
    }
    await api
      .post('/api/fantasyTeams')
      .set('Authorization', `bearer ${token}`)
      .send(newTeam2)
      .expect(400)
  })

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
      .send({ username: 'testuser', password: 'sikret' })
      .then((response) => response.body.token)

    const newTeam = {
      name: "Test Team",
      user: user._id,
    }
    await api
      .post('/api/fantasyTeams')
      .set('Authorization', `bearer ${token}`)
      .send(newTeam)
      .expect(201)

    const teams = await api.get('/api/fantasyTeams')
    const team = teams.body[0]
    const runners = await api.get('/api/runners')
    const runnerToAdd = runners.body[0]

    await api
      .put(`/api/fantasyTeams/${team.id}`)
      .set('Authorization', `bearer ${token}`)
      .send({ runner: runnerToAdd._id })
      .expect(200)
  })
})

describe('user tests', () => {
  beforeEach(async () => {
    await userModel.deleteMany({})
    await fantasyTeamModel.deleteMany({})
  })

  test('user can be added', async () => {
    const usersInBeginning = await api.get('/api/VLusers')

    const newUser = {
      name: 'Test User2',
      username: 'testuser2',
      email: 'oskarikakkori@hotmail.com',
      password: 'verisikret',
    }

    await api
      .post('/api/VLusers')
      .send(newUser)
      .expect(201)

    const usersAfterPost = await api.get('/api/VLusers')
    expect(usersAfterPost.body).toHaveLength(usersInBeginning.body.length + 1)

    const usernames = usersAfterPost.body.map((user: any) => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('user can not be added without username', async () => {
    const usersInBeginning = await api.get('/api/VLusers')

    const newUser = {
      name: 'Test User2',
      email: 'test2@gmail.com',
      password: 'verisikret',
    }

    await api
      .post('/api/VLusers')
      .send(newUser)
      .expect(400)

    const usersAfterPost = await api.get('/api/VLusers')
    expect(usersAfterPost.body).toHaveLength(usersInBeginning.body.length)
  })

  test('user can not be added without password', async () => {
    const usersInBeginning = await api.get('/api/VLusers')

    const newUser = {
      name: 'Test User2',
      username: 'testuser2',
      email: 'test2@gmail.com',
    }

    await api
      .post('/api/VLusers')
      .send(newUser)
      .expect(400)

    const usersAfterPost = await api.get('/api/VLusers')
    expect(usersAfterPost.body).toHaveLength(usersInBeginning.body.length)
  })

  test('user can not be added without email', async () => {
    const usersInBeginning = await api.get('/api/VLusers')

    const newUser = {
      name: 'Test User2',
      username: 'testuser2',
      password: 'test2',
    }

    await api
      .post('/api/VLusers')
      .send(newUser)
      .expect(400)

    const usersAfterPost = await api.get('/api/VLusers')
    expect(usersAfterPost.body).toHaveLength(usersInBeginning.body.length)
  })

  test('user can not be added without name', async () => {
    const usersInBeginning = await api.get('/api/VLusers')

    const newUser = {
      email: 'testi@gmail.com',
      username: 'testuser2',
      password: 'test2',
    }

    await api
      .post('/api/VLusers')
      .send(newUser)
      .expect(400)

    const usersAfterPost = await api.get('/api/VLusers')
    expect(usersAfterPost.body).toHaveLength(usersInBeginning.body.length)
  })

  test('user can not be added with too short username', async () => {
    const usersInBeginning = await api.get('/api/VLusers')

    const newUser = {
      name: 'Test User2',
      username: 'te',
      email: 'test2@gmail.com',
      password: 'verisikret'
    }

    await api
      .post('/api/VLusers')
      .send(newUser)
      .expect(400)

    const usersAfterPost = await api.get('/api/VLusers')
    expect(usersAfterPost.body).toHaveLength(usersInBeginning.body.length)
  })

  test('user can not be added with too short password', async () => {
    const usersInBeginning = await api.get('/api/VLusers')

    const newUser = {
      name: 'Test User2',
      username: 'testuser2',
      email: 'test2@gmail.com',
      password: 'te'
    }

    await api
      .post('/api/VLusers')
      .send(newUser)
      .expect(400)

    const usersAfterPost = await api.get('/api/VLusers')
    expect(usersAfterPost.body).toHaveLength(usersInBeginning.body.length)
  })

  test('user can not be added if username is taken', async () => {
    const usersInBeginning = await api.get('/api/VLusers')

    const newUser = {
      name: 'Test User2',
      username: 'testuser2',
      email: 'test2@gmail.com',
      password: 'sikret'
    }

    await api
      .post('/api/VLusers')
      .send(newUser)
      .expect(201)

    const newUser2 = {
      name: 'Test User3',
      username: 'testuser2',
      email: 'test3@gmail.com',
      password: 'sallainen'
    }

    await api
      .post('/api/VLusers')
      .send(newUser2)
      .expect(400)

    const usersAfterPost = await api.get('/api/VLusers')
    expect(usersAfterPost.body).toHaveLength(usersInBeginning.body.length + 1)
  })

})

afterAll(() => {
  mongoose.connection.close()
})