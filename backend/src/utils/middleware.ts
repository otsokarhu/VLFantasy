import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { SECRET } from '../utils/config';
import logger from '../utils/logger';

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

const unknownEndpoint = (_request: Request, response: Response) => {
  response.status(404).send({
    error: 'unknown endpoint',
    message: 'Check the documentation for the correct endpoint',
  });
};

export const errorHandler = (
  error: Error,
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted media id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
  return null;
};

export const authorization = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const token = request.header('Authorization')?.replace('bearer ', '');

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, SECRET);
    (request as CustomRequest).token = decoded;

    next();
  } catch (err) {
    response.status(401).send({ error: 'Please authenticate' });
  }
};

const requestLogger = (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
  return null;
};

export const getError = (error: unknown) => {
  if (error instanceof Error) return error.message;
  if (!error) return 'Unknown error';
  return String(error);
};

export default {
  unknownEndpoint,
  errorHandler,
  requestLogger,
  authorization,
  getError,
};
