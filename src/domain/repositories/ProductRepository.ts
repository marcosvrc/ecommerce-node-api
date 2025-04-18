import { Product } from '../entities/Product';
import { Repository } from './Repository';

export interface ProductRepository extends Repository<Product> {
  findByCategory(category: string): Promise<Product[]>;
  findBySeller(sellerId: string): Promise<Product[]>;
  searchByName(name: string): Promise<Product[]>;
  updateStock(id: string, quantity: number): Promise<void>;
}