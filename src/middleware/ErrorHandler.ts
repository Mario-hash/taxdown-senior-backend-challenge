import { ErrorRequestHandler } from 'express';
import { NotFoundError } from '../domain/exceptions/NotFoundError';
import { DomainError } from '../domain/exceptions/DomainError';

export const ErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error('Error caught by errorHandler:', err);

  if (err instanceof NotFoundError) {
    res.status(404).json({ error: err.message });
    return;
  } else if (err instanceof DomainError) {
    res.status(400).json({ error: err.message });
    return;
  }

  res.status(500).json({ error: 'Internal Server Error' });
};
