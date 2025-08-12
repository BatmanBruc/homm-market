export default class Unit {
  db;
  constructor(db) {
    this.db = db;
  }

  getList(page, search) {
    return this.db.list(page * 20, search);
  }

  getOne(id) {
    return this.db.get(id);
  }

  move(fromIndex, toIndex) {
    this.db.moveIndex(fromIndex, toIndex);
  }

  buy(id) {
    this.db.set(id, 'in_stock', true);
  }

  dismiss(id) {
    this.db.set(id, 'in_stock', false);
  }
}