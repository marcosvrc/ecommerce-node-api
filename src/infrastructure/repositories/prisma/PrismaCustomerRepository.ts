import { PrismaClient } from '@prisma/client';
import { Customer } from '@/domain/entities/Customer';
import { CustomerRepository } from '@/domain/repositories/CustomerRepository';

export class PrismaCustomerRepository implements CustomerRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(customer: Customer): Promise<Customer> {
    const data = customer.toJSON();

    const createdCustomer = await this.prisma.customer.create({
      data
    });

    return new Customer(
      createdCustomer.name,
      createdCustomer.email,
      createdCustomer.password,
      createdCustomer.phone,
      createdCustomer.address,
      createdCustomer.id
    );
  }

  async update(customer: Customer): Promise<Customer> {
    const data = customer.toJSON();

    const updatedCustomer = await this.prisma.customer.update({
      where: { id: customer.id },
      data
    });

    return new Customer(
      updatedCustomer.name,
      updatedCustomer.email,
      updatedCustomer.password,
      updatedCustomer.phone,
      updatedCustomer.address,
      updatedCustomer.id
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.customer.delete({
      where: { id }
    });
  }

  async findById(id: string): Promise<Customer | null> {
    const customer = await this.prisma.customer.findUnique({
      where: { id }
    });

    if (!customer) {
      return null;
    }

    return new Customer(
      customer.name,
      customer.email,
      customer.password,
      customer.phone,
      customer.address,
      customer.id
    );
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const customer = await this.prisma.customer.findUnique({
      where: { email }
    });

    if (!customer) {
      return null;
    }

    return new Customer(
      customer.name,
      customer.email,
      customer.password,
      customer.phone,
      customer.address,
      customer.id
    );
  }

  async findAll(): Promise<Customer[]> {
    const customers = await this.prisma.customer.findMany();

    return customers.map(customer => new Customer(
      customer.name,
      customer.email,
      customer.password,
      customer.phone,
      customer.address,
      customer.id
    ));
  }
}