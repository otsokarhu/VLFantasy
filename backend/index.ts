import express from 'express'
import cors from 'cors'
import { PORT } from './utils/config'
import connectToDb from './utils/database'
import middleware from './utils/middleware'




const app = express()
app.use(express.json())
app.use(cors())
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)



const start = async () => {
  await connectToDb()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

void start()






