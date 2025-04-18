import { Entity } from '@/domain/shared/Entity';

export enum PaymentStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  REFUNDED = 'REFUNDED'
}

export enum PaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  PIX = 'PIX',
  BANK_SLIP = 'BANK_SLIP'
}

export class Payment extends Entity {
  private _status: PaymentStatus = PaymentStatus.PENDING;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(
    private _orderId: string,
    private _amount: number,
    private _method: PaymentMethod,
    private _paymentDetails: Record<string, any>,
    id?: string,
    status?: PaymentStatus,
    createdAt?: Date
  ) {
    super(id);
    this._status = status || PaymentStatus.PENDING;
    this._createdAt = createdAt || new Date();
    this._updatedAt = new Date();
    this.validate();
  }

  get orderId(): string {
    return this._orderId;
  }

  get amount(): number {
    return this._amount;
  }

  get method(): PaymentMethod {
    return this._method;
  }

  get status(): PaymentStatus {
    return this._status;
  }

  get paymentDetails(): Record<string, any> {
    return { ...this._paymentDetails };
  }

  get createdAt(): Date {
    return new Date(this._createdAt);
  }

  get updatedAt(): Date {
    return new Date(this._updatedAt);
  }

  updateStatus(status: PaymentStatus): void {
    this._status = status;
    this._updatedAt = new Date();
  }

  approve(): void {
    this._status = PaymentStatus.APPROVED;
    this._updatedAt = new Date();
  }

  reject(): void {
    this._status = PaymentStatus.REJECTED;
    this._updatedAt = new Date();
  }

  refund(): void {
    if (this._status !== PaymentStatus.APPROVED) {
      throw new Error('Apenas pagamentos aprovados podem ser reembolsados');
    }
    this._status = PaymentStatus.REFUNDED;
    this._updatedAt = new Date();
  }

  private validate(): void {
    if (!this._orderId) {
      throw new Error('Pedido é obrigatório');
    }

    if (this._amount <= 0) {
      throw new Error('Valor deve ser maior que zero');
    }

    if (!this._method) {
      throw new Error('Método de pagamento é obrigatório');
    }

    if (!this._paymentDetails) {
      throw new Error('Detalhes do pagamento são obrigatórios');
    }

    this.validatePaymentDetails();
  }

  private validatePaymentDetails(): void {
    switch (this._method) {
      case PaymentMethod.CREDIT_CARD:
      case PaymentMethod.DEBIT_CARD:
        if (!this._paymentDetails.cardNumber || !this._paymentDetails.cardHolder) {
          throw new Error('Dados do cartão inválidos');
        }
        break;
      case PaymentMethod.PIX:
        if (!this._paymentDetails.pixKey) {
          throw new Error('Chave PIX é obrigatória');
        }
        break;
      case PaymentMethod.BANK_SLIP:
        if (!this._paymentDetails.dueDate) {
          throw new Error('Data de vencimento é obrigatória');
        }
        break;
    }
  }

  toJSON() {
    return {
      id: this.id,
      orderId: this._orderId,
      amount: this._amount,
      method: this._method,
      status: this._status,
      paymentDetails: this._paymentDetails,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt
    };
  }
}