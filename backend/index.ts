import express from 'express'
import cors from 'cors'
import { PORT } from './utils/config'
import connectToDb from './utils/database'
import middleware from './utils/middleware'
import userRouter from './controllers/userController'
import http from 'http'




const app = express()
app.use(express.json())
app.use(cors())
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
app.use('/api/users', userRouter)
const server = http.createServer(app)



const start = async () => {
  await connectToDb()
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

void start()






