import { Payment, PaymentStatus } from '../entities/Payment';
import { Repository } from './Repository';

export interface PaymentRepository extends Repository<Payment> {
  findByOrder(orderId: string): Promise<Payment | null>;
  findByStatus(status: PaymentStatus): Promise<Payment[]>;
  updateStatus(id: string, status: PaymentStatus): Promise<void>;
}