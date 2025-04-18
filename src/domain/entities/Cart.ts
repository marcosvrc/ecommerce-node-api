import { Entity } from '@/domain/shared/Entity';

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

export class Cart extends Entity {
  private _items: CartItem[] = [];

  constructor(
    private _customerId: string,
    items?: CartItem[],
    id?: string
  ) {
    super(id);
    if (items) {
      this._items = items;
    }
    this.validate();
  }

  get customerId(): string {
    return this._customerId;
  }

  get items(): CartItem[] {
    return [...this._items];
  }

  get total(): number {
    return this._items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }

  addItem(item: CartItem): void {
    const existingItem = this._items.find(i => i.productId === item.productId);
    
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this._items.push(item);
    }
  }

  removeItem(productId: string): void {
    const index = this._items.findIndex(item => item.productId === productId);
    if (index >= 0) {
      this._items.splice(index, 1);
    }
  }

  updateItemQuantity(productId: string, quantity: number): void {
    const item = this._items.find(i => i.productId === productId);
    if (!item) {
      throw new Error('Item não encontrado no carrinho');
    }

    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }

    item.quantity = quantity;
  }

  clear(): void {
    this._items = [];
  }

  private validate(): void {
    if (!this._customerId) {
      throw new Error('Cliente é obrigatório');
    }

    this._items.forEach(item => {
      if (item.quantity <= 0) {
        throw new Error('Quantidade deve ser maior que zero');
      }
      if (item.price <= 0) {
        throw new Error('Preço deve ser maior que zero');
      }
    });
  }

  toJSON() {
    return {
      id: this.id,
      customerId: this._customerId,
      items: this._items,
      total: this.total
    };
  }
}