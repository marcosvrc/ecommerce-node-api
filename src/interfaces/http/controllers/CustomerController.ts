import { Request, Response } from 'express';
import { CreateCustomerUseCase } from '@/application/useCases/customer/CreateCustomerUseCase';
import { LoginCustomerUseCase } from '@/application/useCases/customer/LoginCustomerUseCase';
import { ListCustomersUseCase } from '@/application/useCases/customer/ListCustomersUseCase';
import { ShowCustomerUseCase } from '@/application/useCases/customer/ShowCustomerUseCase';
import { UpdateCustomerUseCase } from '@/application/useCases/customer/UpdateCustomerUseCase';
import { DeleteCustomerUseCase } from '@/application/useCases/customer/DeleteCustomerUseCase';
import { PrismaCustomerRepository } from '@/infrastructure/repositories/prisma/PrismaCustomerRepository';

export class CustomerController {
  private customerRepository: PrismaCustomerRepository;

  constructor() {
    this.customerRepository = new PrismaCustomerRepository();
  }

  create = async (request: Request, response: Response): Promise<Response> => {
    const { name, email, password, phone, address } = request.body;

    const createCustomer = new CreateCustomerUseCase(this.customerRepository);

    const customer = await createCustomer.execute({
      name,
      email,
      password,
      phone,
      address
    });

    return response.status(201).json(customer);
  };

  login = async (request: Request, response: Response): Promise<Response> => {
    const { email, password } = request.body;

    const loginCustomer = new LoginCustomerUseCase(this.customerRepository);

    const { customer, token } = await loginCustomer.execute({
      email,
      password
    });

    return response.json({ customer, token });
  };

  list = async (request: Request, response: Response): Promise<Response> => {
    const listCustomers = new ListCustomersUseCase(this.customerRepository);

    const customers = await listCustomers.execute();

    return response.json(customers);
  };

  show = async (request: Request, response: Response): Promise<Response> => {
    const { id } = request.params;

    const showCustomer = new ShowCustomerUseCase(this.customerRepository);

    const customer = await showCustomer.execute({ id });

    return response.json(customer);
  };

  update = async (request: Request, response: Response): Promise<Response> => {
    const { id } = request.params;
    const { name, email, phone, address } = request.body;

    const updateCustomer = new UpdateCustomerUseCase(this.customerRepository);

    const customer = await updateCustomer.execute({
      id,
      name,
      email,
      phone,
      address
    });

    return response.json(customer);
  };

  delete = async (request: Request, response: Response): Promise<Response> => {
    const { id } = request.params;

    const deleteCustomer = new DeleteCustomerUseCase(this.customerRepository);

    await deleteCustomer.execute({ id });

    return response.status(204).send();
  };
}