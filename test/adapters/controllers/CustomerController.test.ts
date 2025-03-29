import request from 'supertest';
import express, { Application } from 'express';
import customerRouter from '../../../src/adapters/controllers/CustomerController';

describe('Customer API Integration Tests', () => {
  let app: Application;

  beforeEach(() => {
    // Arrange
    app = express();
    app.use(express.json());
    app.use('/api', customerRouter);
  });

  describe('POST /api/customers', () => {
    it('should create a customer and return the created customer object', async () => {
      // Arrange
      const newCustomer = { id: "1", name: "Test", email: "test@example.com" };

      // Act
      const res = await request(app).post('/api/customers').send(newCustomer);

      // Assert: Verificamos que se retorne status 201 y el objeto creado
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
      // Arrange
      const newCustomer = { id: "1", name: "Test", email: "test@example.com", availableCredit: 0 };
      await request(app).post('/api/customers').send(newCustomer);

      // Act
      const res = await request(app).get('/api/customers/1');

      // Assert
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject(newCustomer);
    });
  });

  describe('PUT /api/customers/:id', () => {
    it('should update a customer and return the updated customer object', async () => {
      // Arrange
      const newCustomer = { id: "1", name: "Test", email: "test@example.com", availableCredit: 0 };
      await request(app).post('/api/customers').send(newCustomer);
      const updateData = { name: "Update test" };

      // Act
      const res = await request(app).put('/api/customers/1').send(updateData);

      // Assert
      expect(res.status).toBe(200);
      expect(res.body.name).toBe("Update test");
      expect(res.body.email).toBe("test@example.com");
    });
  });

  describe('DELETE /api/customers/:id', () => {
    it('should delete a customer and return a confirmation message', async () => {
      // Arrange
      const newCustomer = { id: "1", name: "Test", email: "test@example.com", availableCredit: 0 };
      await request(app).post('/api/customers').send(newCustomer);

      // Act
      const res = await request(app).delete('/api/customers/1');

      // Asser
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ message: 'Customer 1 deleted' });
    });
  });

  describe('POST /api/customers/:id/credit', () => {
    it('should add credit to a customer and return the updated customer', async () => {
      // Arrange
      const newCustomer = { id: "1", name: "Test", email: "test@example.com", availableCredit: 100 };
      await request(app).post('/api/customers').send(newCustomer);

      // Act
      const res = await request(app).post('/api/customers/1/credit').send({ amount: 50 });

      // Assert
      expect(res.status).toBe(200);
      expect(res.body.availableCredit).toBe(150);
    });
  });

  describe('GET /api/customers', () => {
    it('should return a list of customers sorted descending by available credit', async () => {
      // Arrange
      const customer1 = { id: "1", name: "Test", email: "test@example.com", availableCredit: 100 };
      const customer2 = { id: "2", name: "test 2", email: "test2@example.com", availableCredit: 200 };
      await request(app).post('/api/customers').send(customer1);
      await request(app).post('/api/customers').send(customer2);

      // Act
      const res = await request(app).get('/api/customers');

      // Assert
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body[0].id).toBe("2");
      expect(res.body[1].id).toBe("1");
    });
  });
});
