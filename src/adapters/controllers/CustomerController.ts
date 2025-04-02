import { Router, Request, Response, NextFunction } from 'express';
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
  AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { amount } = req.body;
    const result = await customerService.addCredit(CustomerId.create(id), AvailableCredit.create(amount));
    
    result.fold(
      error => next(error),
      customer => res.status(200).json(CustomerMapper.toDTO(customer))
    );
  })
);

router.post(
  '/customers',
  AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const dto: CustomerDTO = req.body;
    const customer = CustomerMapper.toDomain(dto);
    const result = await customerService.createCustomer(customer);

    result.fold(
      error => next(error),
      createdCustomer => res.status(201).json(CustomerMapper.toDTO(createdCustomer))
    );
  })
);

router.get(
  '/customers/:id',
  AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await customerService.getCustomer(CustomerId.create(id));
    result.fold(
      error => next(error),
      customer => res.status(200).json(CustomerMapper.toDTO(customer))
    );
  })
);

router.put(
  '/customers/:id',
  AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const updateData: Partial<CustomerDTO> = req.body;

    const result = await customerService.updateCustomer(id, updateData);

    result.fold(
      error => next(error),
      updatedCustomer => res.status(200).json(CustomerMapper.toDTO(updatedCustomer))
    );
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