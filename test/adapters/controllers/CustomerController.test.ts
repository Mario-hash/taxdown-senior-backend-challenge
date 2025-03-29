import request from 'supertest';
import express from 'express';
import customerRouter from '../../../src/adapters/controllers/CustomerController';

const app = express();
app.use(express.json());
app.use('/api', customerRouter);

describe('Customer API Endpoints', () => {
  it('POST /api/customers/:id/credit should add credit to a customer', async () => {
    // Act
    const response = await request(app)
      .post('/api/customers/1/credit')
      .send({ amount: 50 });
    
    // Assert (De momento dejamos un 200)
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Added credit to customer 1 (stub)' });
  });
});