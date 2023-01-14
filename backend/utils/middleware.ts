import { Request, Response, NextFunction } from 'express'

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

export default {
  unknownEndpoint,
  errorHandler
}