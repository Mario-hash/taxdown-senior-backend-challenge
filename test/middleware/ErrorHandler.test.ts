import express, { Request, Response, NextFunction } from 'express';
import request from 'supertest';
import { errorHandler } from '../../src/middleware/errorHandler';
import { DomainError } from '../../src/domain/exceptions/DomainError';
import { NotFoundError } from '../../src/domain/exceptions/NotFoundError';

describe('ErrorHandler Middleware', () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json());

    // NotFoundError
    app.get('/notfound', (_req: Request, _res: Response, next: NextFunction) => {
      next(new NotFoundError('Customer', '123'));
    });

    // DomainError
    app.get('/domain', (_req: Request, _res: Response, next: NextFunction) => {
      next(new DomainError('Generic domain error'));
    });

    // Error genérico
    app.get('/generic', (_req: Request, _res: Response, next: NextFunction) => {
      next(new Error('Generic error'));
    });

    app.use(errorHandler);
  });

  it('should return 404 and proper error message for NotFoundError', async () => {
    const res = await request(app).get('/notfound');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Customer with id 123 not found' });
  });

  it('should return 400 and proper error message for a generic DomainError', async () => {
    const res = await request(app).get('/domain');
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Generic domain error' });
  });

  it('should return 500 and internal server error message for generic errors', async () => {
    const res = await request(app).get('/generic');
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Internal Server Error' });
  });
});
