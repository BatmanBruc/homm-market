import type { Entity, TUnit } from "./types.js";

export default class Unit {
  entity: Entity<TUnit>;

  constructor(entity: Entity<TUnit>) {
    this.entity = entity;
  }

  getList(page: number, search: string) {
    const offset = (page - 1) * 20;
    const limit = 20;
    return this.entity.list(offset, search, limit);
  }

  getOne(id: number) {
    return this.entity.get(id);
  }

  move(fromIndex: number, toIndex: number) {
    this.entity.moveIndex(fromIndex, toIndex);
  }

  buy(id: number) {
    this.entity.update(id, 'inStock', true);
  }

  dismiss(id: number) {
    this.entity.update(id, 'inStock', false);
  }
}