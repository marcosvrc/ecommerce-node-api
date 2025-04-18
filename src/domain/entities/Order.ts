import { Entity } from '@/domain/shared/Entity';

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export class Order extends Entity {
  private _status: OrderStatus = OrderStatus.PENDING;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(
    private _customerId: string,
    private _items: OrderItem[],
    private _shippingAddress: string,
    private _paymentId?: string,
    id?: string,
    status?: OrderStatus,
    createdAt?: Date
  ) {
    super(id);
    this._status = status || OrderStatus.PENDING;
    this._createdAt = createdAt || new Date();
    this._updatedAt = new Date();
    this.validate();
  }

  get customerId(): string {
    return this._customerId;
  }

  get items(): OrderItem[] {
    return [...this._items];
  }

  get status(): OrderStatus {
    return this._status;
  }

  get shippingAddress(): string {
    return this._shippingAddress;
  }

  get paymentId(): string | undefined {
    return this._paymentId;
  }

  get createdAt(): Date {
    return new Date(this._createdAt);
  }

  get updatedAt(): Date {
    return new Date(this._updatedAt);
  }

  get total(): number {
    return this._items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }

  updateStatus(status: OrderStatus): void {
    this._status = status;
    this._updatedAt = new Date();
  }

  addPayment(paymentId: string): void {
    this._paymentId = paymentId;
    this._status = OrderStatus.PAID;
    this._updatedAt = new Date();
  }

  cancel(): void {
    if (this._status === OrderStatus.DELIVERED) {
      throw new Error('Não é possível cancelar um pedido já entregue');
    }
    this._status = OrderStatus.CANCELLED;
    this._updatedAt = new Date();
  }

  private validate(): void {
    if (!this._customerId) {
      throw new Error('Cliente é obrigatório');
    }

    if (!this._items || this._items.length === 0) {
      throw new Error('Pedido deve ter pelo menos um item');
    }

    if (!this._shippingAddress) {
      throw new Error('Endereço de entrega é obrigatório');
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
      status: this._status,
      shippingAddress: this._shippingAddress,
      paymentId: this._paymentId,
      total: this.total,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt
    };
  }
}