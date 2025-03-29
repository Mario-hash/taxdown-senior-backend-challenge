import { Router, Request, Response } from 'express';
import { Customer } from '../../domain/entities/Customer';
import { CustomerService } from '../../application/services/CustomerService';
import { EmbebedCustomerRepository } from '../persistence/EmbebedCustomerRepositoryImpl';

const router = Router();

const repository = new EmbebedCustomerRepository();
const customerService = new CustomerService(repository);

router.post('/customers/:id/credit',async (req: Request, res: Response) => {
  const { id } = req.params;
  const { amount } = req.body;
  const updatedCustomer = await customerService.addCredit(id, amount);
  res.status(200).json(updatedCustomer);
});

router.post('/customers', async (req: Request, res: Response) => {
  const { id, name, email, availableCredit } = req.body;
  const customer = new Customer(id, name, email, availableCredit ?? 0);
  const createdCustomer = await customerService.createCustomer(customer);
  res.status(201).json(createdCustomer);
});

router.get('/customers/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const customer = await customerService.getCustomer(id);
  res.status(200).json(customer);
});

router.put('/customers/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;
  let customer = (await customerService.getCustomer(id))!; 
  // Actualizamos las propiedades según lo enviado (happy path)
  customer.name = updateData.name || customer.name;
  customer.email = updateData.email || customer.email;
  if (updateData.availableCredit !== undefined) {
    customer.availableCredit = updateData.availableCredit;
  }
  const updatedCustomer = await customerService.updateCustomer(customer);
  res.status(200).json(updatedCustomer);
});

router.delete('/customers/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  await customerService.deleteCustomer(id);
  res.status(200).json({ message: `Customer ${id} deleted` });
});

router.get('/customers', async (req: Request, res: Response) => {
  const customers = await customerService.listCustomersSortedByCredit();
  res.status(200).json(customers);
});
export default router;