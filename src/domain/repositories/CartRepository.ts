import { Cart } from '../entities/Cart';
import { Repository } from './Repository';

export interface CartRepository extends Repository<Cart> {
  findByCustomer(customerId: string): Promise<Cart | null>;
  clear(id: string): Promise<void>;
}