import { hash } from 'bcryptjs';
import { Customer } from '@/domain/entities/Customer';
import { CustomerRepository } from '@/domain/repositories/CustomerRepository';
import { AppError } from '@/interfaces/http/middlewares/errorHandler';

interface CreateCustomerRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}

export class CreateCustomerUseCase {
  constructor(private customerRepository: CustomerRepository) {}

  async execute({
    name,
    email,
    password,
    phone,
    address
  }: CreateCustomerRequest): Promise<Customer> {
    const customerExists = await this.customerRepository.findByEmail(email);

    if (customerExists) {
      throw new AppError('Cliente já cadastrado com este email');
    }

    const hashedPassword = await hash(password, 8);

    const customer = new Customer(
      name,
      email,
      hashedPassword,
      phone,
      address
    );

    await this.customerRepository.create(customer);

    return customer;
  }
}