import { Seller } from '../entities/Seller';
import { Repository } from './Repository';

export interface SellerRepository extends Repository<Seller> {
  findByEmail(email: string): Promise<Seller | null>;
  findByDocument(document: string): Promise<Seller | null>;
  findActive(): Promise<Seller[]>;
}