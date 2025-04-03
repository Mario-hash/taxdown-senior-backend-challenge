import request from 'supertest';
import express, { Application } from 'express';
import { initCustomerRouter } from '../../../src/adapters/controllers/CustomerController';
import { getMongoCollection } from '../../../src/adapters/persistence/MongoClientFactory';

describe('Customer API Integration Tests', () => {
  let app: Application;

  beforeAll(async () => {
    app = express();
    app.use(express.json());

    const customerRouter = await initCustomerRouter();
    app.use('/api', customerRouter);
  });

  beforeEach(async () => {
    const collection = await getMongoCollection();
    await collection.deleteMany({});
  });

  afterEach(async () => {
    const collection = await getMongoCollection();
    await collection.deleteMany({});
  });

  describe('POST /api/customers', () => {
    it('should create a customer and return the created customer object', async () => {
      const newCustomer = { id: "1", name: "Test", email: "test@example.com" };
      const res = await request(app).post('/api/customers').send(newCustomer);

      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({
        id: "1",
        name: "Test",
        email: "test@example.com",
        availableCredit: 0
      });
    });
  });

  describe('GET /api/customers/:id', () => {

    it('should return customer details after creation', async () => {
      const newCustomer = { id: "2", name: "Test2", email: "test2@example.com", availableCredit: 0 };
      await request(app).post('/api/customers').send(newCustomer);
      const res = await request(app).get('/api/customers/2');

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject(newCustomer);
    });
  });

  describe('PUT /api/customers/:id', () => {
    it('should update a customer and return the updated customer object', async () => {
      const newCustomer = { id: "3", name: "Test3", email: "test3@example.com", availableCredit: 0 };
      await request(app).post('/api/customers').send(newCustomer);
      const updateData = { name: "Updated Name" };

      const res = await request(app).put('/api/customers/3').send(updateData);

      expect(res.status).toBe(200);
      expect(res.body.name).toBe("Updated Name");
    });
  });

  describe('DELETE /api/customers/:id', () => {
    it('should delete a customer and return a confirmation message', async () => {
      const newCustomer = { id: "4", name: "Test4", email: "test4@example.com", availableCredit: 0 };
      await request(app).post('/api/customers').send(newCustomer);

      const res = await request(app).delete('/api/customers/4');

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ message: 'Customer 4 deleted' });
    });
  });

  describe('POST /api/customers/:id/credit', () => {
    it('should add credit to a customer and return the updated customer', async () => {
      const newCustomer = { id: "5", name: "Test5", email: "test5@example.com", availableCredit: 100 };
      await request(app).post('/api/customers').send(newCustomer);

      const res = await request(app).post('/api/customers/5/credit').send({ amount: 50 });

      expect(res.status).toBe(200);
      expect(res.body.availableCredit).toBe(150);
    });
  });

  describe('GET /api/customers', () => {
    it('should return a list of customers sorted descending by available credit', async () => {
      const customer1 = { id: "6", name: "Test6", email: "test6@example.com", availableCredit: 100 };
      const customer2 = { id: "7", name: "Test7", email: "test8@example.com", availableCredit: 200 };
      await request(app).post('/api/customers').send(customer1);
      await request(app).post('/api/customers').send(customer2);

      const res = await request(app).get('/api/customers');

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body[0].id).toBe("7");
      expect(res.body[1].id).toBe("6");
    });
  });
});
