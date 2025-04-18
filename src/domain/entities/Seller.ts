import { Entity } from '@/domain/shared/Entity';

export class Seller extends Entity {
  constructor(
    private _name: string,
    private _email: string,
    private _password: string,
    private _document: string,
    private _phone: string,
    private _address: string,
    private _active: boolean = true,
    id?: string
  ) {
    super(id);
    this.validate();
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  get document(): string {
    return this._document;
  }

  get phone(): string {
    return this._phone;
  }

  get address(): string {
    return this._address;
  }

  get active(): boolean {
    return this._active;
  }

  deactivate(): void {
    this._active = false;
  }

  activate(): void {
    this._active = true;
  }

  private validate(): void {
    if (!this._name || this._name.length < 3) {
      throw new Error('Nome inválido');
    }

    if (!this._email || !this._email.includes('@')) {
      throw new Error('Email inválido');
    }

    if (!this._password || this._password.length < 6) {
      throw new Error('Senha deve ter no mínimo 6 caracteres');
    }

    if (!this._document) {
      throw new Error('Documento é obrigatório');
    }

    if (!this._phone) {
      throw new Error('Telefone é obrigatório');
    }

    if (!this._address) {
      throw new Error('Endereço é obrigatório');
    }
  }

  toJSON() {
    return {
      id: this.id,
      name: this._name,
      email: this._email,
      document: this._document,
      phone: this._phone,
      address: this._address,
      active: this._active
    };
  }
}