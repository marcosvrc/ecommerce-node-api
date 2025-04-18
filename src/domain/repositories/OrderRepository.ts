import { Order, OrderStatus } from '../entities/Order';
import { Repository } from './Repository';

export interface OrderRepository extends Repository<Order> {
  findByCustomer(customerId: string): Promise<Order[]>;
  findByStatus(status: OrderStatus): Promise<Order[]>;
  updateStatus(id: string, status: OrderStatus): Promise<void>;
}