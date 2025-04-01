import { ErrorRequestHandler } from 'express';
import { DomainError } from '../domain/exceptions/DomainError';

export const ErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error('Error caught by errorHandler:', err);

  if (err instanceof DomainError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  res.status(500).json({ error: 'Internal Server Error' });
};
