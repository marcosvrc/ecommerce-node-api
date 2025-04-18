import { randomUUID } from 'crypto';

export abstract class Entity {
  protected readonly _id: string;

  constructor(id?: string) {
    this._id = id || randomUUID();
  }

  get id(): string {
    return this._id;
  }

  equals(entity: Entity): boolean {
    if (entity === null || entity === undefined) {
      return false;
    }

    if (this === entity) {
      return true;
    }

    return this._id === entity._id;
  }
}