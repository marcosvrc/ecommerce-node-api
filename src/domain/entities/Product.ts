import { Entity } from '@/domain/shared/Entity';

export class Product extends Entity {
  constructor(
    private _name: string,
    private _description: string,
    private _price: number,
    private _stock: number,
    private _sellerId: string,
    private _categories: string[],
    id?: string
  ) {
    super(id);
    this.validate();
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get price(): number {
    return this._price;
  }

  get stock(): number {
    return this._stock;
  }

  get sellerId(): string {
    return this._sellerId;
  }

  get categories(): string[] {
    return [...this._categories];
  }

  updateStock(quantity: number): void {
    if (this._stock + quantity < 0) {
      throw new Error('Estoque não pode ser negativo');
    }
    this._stock += quantity;
  }

  private validate(): void {
    if (!this._name || this._name.length < 3) {
      throw new Error('Nome do produto inválido');
    }

    if (!this._description) {
      throw new Error('Descrição é obrigatória');
    }

    if (this._price <= 0) {
      throw new Error('Preço deve ser maior que zero');
    }

    if (this._stock < 0) {
      throw new Error('Estoque não pode ser negativo');
    }

    if (!this._sellerId) {
      throw new Error('Vendedor é obrigatório');
    }

    if (!this._categories || this._categories.length === 0) {
      throw new Error('Produto deve ter pelo menos uma categoria');
    }
  }

  toJSON() {
    return {
      id: this.id,
      name: this._name,
      description: this._description,
      price: this._price,
      stock: this._stock,
      sellerId: this._sellerId,
      categories: this._categories
    };
  }
}