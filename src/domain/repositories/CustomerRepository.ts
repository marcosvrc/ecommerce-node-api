import { Customer } from '../entities/Customer';
import { Repository } from './Repository';

export interface CustomerRepository extends Repository<Customer> {
  findByEmail(email: string): Promise<Customer | null>;
}