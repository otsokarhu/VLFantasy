import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import User from '../models/userModel'
import { SECRET } from '../utils/config'


export interface tokenRequest extends Request {
  token: string
  user: any
}

const logger = require('./logger')

const unknownEndpoint = (_request: Request, response: Response) => {
  response.status(404).send({ error: 'unknown endpoint', message: 'Check the documentation for the correct endpoint' })
}

const errorHandler = (error: Error, _request: Request, response: Response, next: NextFunction) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted media id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
  return null
}

const tokenExtractor = (request: tokenRequest, _response: Response, next: NextFunction) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
  next()
  return null
}

const userExtractor = async (request: tokenRequest, response: Response, next: NextFunction) => {
  const decodedToken = jwt.verify(request.token, SECRET) as JwtPayload
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  request.user = user
  next()
  return null
}


export default {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
}