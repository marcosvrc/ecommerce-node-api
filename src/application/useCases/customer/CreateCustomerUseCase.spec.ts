import { CreateCustomerUseCase } from './CreateCustomerUseCase';
import { CustomerRepository } from '@/domain/repositories/CustomerRepository';
import { Customer } from '@/domain/entities/Customer';
import { AppError } from '@/interfaces/http/middlewares/errorHandler';

class FakeCustomerRepository implements CustomerRepository {
  private customers: Customer[] = [];

  async create(customer: Customer): Promise<Customer> {
    this.customers.push(customer);
    return customer;
  }

  async update(customer: Customer): Promise<Customer> {
    const index = this.customers.findIndex(c => c.id === customer.id);
    this.customers[index] = customer;
    return customer;
  }

  async delete(id: string): Promise<void> {
    const index = this.customers.findIndex(c => c.id === id);
    this.customers.splice(index, 1);
  }

  async findById(id: string): Promise<Customer | null> {
    return this.customers.find(c => c.id === id) || null;
  }

  async findByEmail(email: string): Promise<Customer | null> {
    return this.customers.find(c => c.email === email) || null;
  }

  async findAll(): Promise<Customer[]> {
    return this.customers;
  }
}

describe('CreateCustomerUseCase', () => {
  let createCustomerUseCase: CreateCustomerUseCase;
  let fakeCustomerRepository: FakeCustomerRepository;

  beforeEach(() => {
    fakeCustomerRepository = new FakeCustomerRepository();
    createCustomerUseCase = new CreateCustomerUseCase(fakeCustomerRepository);
  });

  it('should be able to create a new customer', async () => {
    const customer = await createCustomerUseCase.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
      phone: '1234567890',
      address: 'Example Street, 123'
    });

    expect(customer).toHaveProperty('id');
    expect(customer.name).toBe('John Doe');
    expect(customer.email).toBe('john@example.com');
  });

  it('should not be able to create a customer with same email', async () => {
    await createCustomerUseCase.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
      phone: '1234567890',
      address: 'Example Street, 123'
    });

    await expect(
      createCustomerUseCase.execute({
        name: 'John Doe 2',
        email: 'john@example.com',
        password: '123456',
        phone: '1234567890',
        address: 'Example Street, 123'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});