import { Router, Request, Response } from 'express';

const router = Router();

router.post('/customers/:id/credit', (req: Request, res: Response) => {
  const { id } = req.params;
  // Por ahora devuelvo mensaje fijo
  res.status(200).json({ message: `Added credit to customer ${id} (stub)` });
});

router.post('/customers', async (req: Request, res: Response) => {
  // Por ahora devuelvo mensaje fijo, CustomerService.createCustomer
  res.status(201).json({ message: 'Customer created (stub)' });
});

router.get('/customers/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  // Por ahora devuelvo mensaje fijo, CustomerService.getCustomer
  res.status(200).json({ message: `Customer details for ${id} (stub)` });
});

router.put('/customers/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  // Por ahora devuelvo mensaje fijo, CustomerService.updateCustomer
  res.status(200).json({ message: `Customer ${id} updated (stub)` });
});

router.delete('/customers/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  //  Por ahora devuelvo mensaje fijo, CustomerService.deleteCustomer
  res.status(200).json({ message: `Customer ${id} deleted (stub)` });
});

router.get('/customers', async (req: Request, res: Response) => {
  // Por ahora devuelvo mensaje fijo, CustomerService.listCustomersSortedByCredit
  res.status(200).json({ message: 'List of customers sorted by available credit (stub)' });
});
export default router;