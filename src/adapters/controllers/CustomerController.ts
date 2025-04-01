import { Router, Request, Response } from 'express';
import { Customer } from '../../domain/entities/Customer';
import { CustomerService } from '../../application/services/CustomerService';
import { InMemoryCustomerRepository } from '../persistence/repositories/InMemoryCustomerRepository';
import { CustomerDTO } from '../../application/dto/CustomerDTO';
import { CustomerMapper } from '../../application/mapper/CustomerMapper';
import { CustomerId } from '../../domain/vo/CustomerId';
import { AvailableCredit } from '../../domain/vo/AvailableCredit';
import { AsyncHandler } from '../../utils/AsyncHandler';

const router = Router();

const repository = new InMemoryCustomerRepository();
const customerService = new CustomerService(repository);

router.post(
  '/customers/:id/credit',
  AsyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { amount } = req.body;
    const updatedCustomer = await customerService.addCredit(
      CustomerId.create(id),
      AvailableCredit.create(amount)
    );
    const result = CustomerMapper.toDTO(updatedCustomer);
    res.status(200).json(result);
  })
);

router.post(
  '/customers',
  AsyncHandler(async (req: Request, res: Response) => {
    const dto: CustomerDTO = req.body;
    const customer = CustomerMapper.toDomain(dto);
    const created = await customerService.createCustomer(customer);
    const result = CustomerMapper.toDTO(created);
    res.status(201).json(result);
  })
);


router.get(
  '/customers/:id',
  AsyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const customer = await customerService.getCustomer(CustomerId.create(id));
    if (customer) {
      const dto = CustomerMapper.toDTO(customer);
      res.status(200).json(dto);
    } else {
      res.status(404).json({ message: `Customer ${id} not found` });
    }
  })
);


router.put(
  '/customers/:id',
  AsyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData: Partial<CustomerDTO> = req.body;
    const existing = await customerService.getCustomer(CustomerId.create(id));
    if (existing) {
      const updatedDTO: CustomerDTO = {
        id,
        name: updateData.name ?? existing.name.getValue(),
        email: updateData.email ?? existing.email.getValue(),
        availableCredit:
          updateData.availableCredit !== undefined
            ? updateData.availableCredit
            : existing.availableCredit.getValue(),
      };
      const updatedEntity = CustomerMapper.toDomain(updatedDTO);
      const updatedCustomer = await customerService.updateCustomer(updatedEntity);
      res.status(200).json(CustomerMapper.toDTO(updatedCustomer));
    } else {
      res.status(404).json({ message: `Customer ${id} not found` });
    }
  })
);

router.delete(
  '/customers/:id',
  AsyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await customerService.deleteCustomer(CustomerId.create(id));
    res.status(200).json({ message: `Customer ${id} deleted` });
  })
);

router.get(
  '/customers',
  AsyncHandler(async (req: Request, res: Response) => {
    const customers = await customerService.listCustomersSortedByCredit();
    const dtos = customers.map(customer => CustomerMapper.toDTO(customer));
    res.status(200).json(dtos);
  })
);
export default router;