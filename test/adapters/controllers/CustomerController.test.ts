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

  it('POST /api/customers returns 201 and stub message', async () => {
    // Act
    const response = await request(app)
      .post('/api/customers')
      .send({ name: 'Test', email: 'test@example.com' });
    
    // Assert
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: 'Customer created (stub)' });
  });

  it('GET /api/customers/:id returns 200 and stub message', async () => {
    // Act
    const response = await request(app).get('/api/customers/1');

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Customer details for 1 (stub)' });
  });

  it('PUT /api/customers/:id returns 200 and stub message', async () => {
    // Act
    const response = await request(app)
      .put('/api/customers/1')
      .send({ name: 'Updated Name' });
    
    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Customer 1 updated (stub)' });
  });

  it('DELETE /api/customers/:id returns 200 and stub message', async () => {
    // Act
    const response = await request(app).delete('/api/customers/1');

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Customer 1 deleted (stub)' });
  });

  it('GET /api/customers returns 200 and stub message', async () => {
    // Act
    const response = await request(app).get('/api/customers');

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'List of customers sorted by available credit (stub)' });
  });
});