import express from 'express'
import cors from 'cors'
import { PORT } from './utils/config'
import connectToDb from './utils/database'
import middleware from './utils/middleware'
import userRouter from './controllers/userController'
import loginRouter from './controllers/loginController'
import runnerRouter from './controllers/runnerController'
import fantasyTeamRouter from './controllers/fantasyTeamController'






const app = express()

app.get('/api/testing', (_req, res) => {
  res.send('This works')
})
app.use(express.json())
app.use(cors())
app.use(middleware.errorHandler)
app.use(middleware.requestLogger)


app.use('/api/VLusers', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/runners', runnerRouter)
app.use('/api/fantasyTeams', fantasyTeamRouter)

app.get('/');

app.use(middleware.unknownEndpoint)







const start = async () => {
  await connectToDb()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

void start()






