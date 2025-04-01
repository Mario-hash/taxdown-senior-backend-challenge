import { AsyncHandler } from '../../src/utils/AsyncHandler';
import { Request, Response, NextFunction } from 'express';

describe('AsyncHandler', () => {
  it('should call next with error when the async function throws', async () => {
    const error = new Error('Test error');
    const fn = async () => { throw error; };
    const handler = AsyncHandler(fn);
    
    const req = {} as Request;
    const res = {} as Response;
    const next = jest.fn() as NextFunction;
    
    await handler(req, res, next);
    expect(next).toHaveBeenCalledWith(error);
  });
});