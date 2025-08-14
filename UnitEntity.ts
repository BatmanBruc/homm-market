import unitMap from "./unitMap.js";
import type { Entity, TUnit } from "./types.js";

type TableUnit = {
  id: number;
  name: string;
  price: number;
  count: number;
}

export default class UnitEntity implements Entity<TUnit> {
  private origin_table: TableUnit[] = [];
  private sort_indexes_table: number[] = [];
  private names_hash_table: Map<string, number[]> = new Map();
  private in_stock_table: Map<number, boolean> = new Map();
  private position_map: Map<number, number> = new Map();
  private id_hash_table: Map<number, number> = new Map();
  private propertys_entity = ['id', 'name', 'price', 'count'];

  constructor(length: number = 1000000) {
    this.createTable(length);
  }

  private generateUnit(): [number, string, number] {
    const rank = Math.floor(Math.random() * 8) + 1;
    const unit = Math.floor(Math.random() * 6) + 1;
    const name = unitMap[rank - 1][unit - 1];
    const count = Math.floor(Math.random() * 10000) + 1;
    return [rank, name, count];
  }

  createTable(length: number) {
    this.origin_table = [];
    this.sort_indexes_table = [];
    this.names_hash_table = new Map();
    this.id_hash_table = new Map();
    this.in_stock_table = new Map();
    this.position_map = new Map();
    for (let i = 0; i < length; i++) {
      this.sort_indexes_table.push(i);
      this.position_map.set(i, i);
      this.id_hash_table.set(i, i)
      const [rank, name, count] = this.generateUnit();
      this.origin_table.push({
        id: i,
        name,
        price: rank * count * 100,
        count,
      });
    }
    this.createNamesHashTable();
  }

  private createNamesHashTable() {
    for (let i = 0; i < this.origin_table.length; i++) {
      if (this.names_hash_table.has(this.origin_table[i]["name"])) {
        this.names_hash_table
          .get(this.origin_table[i]["name"])!
          .push(this.origin_table[i]["id"]);
      } else {
        this.names_hash_table.set(this.origin_table[i]["name"], [
          this.origin_table[i]["id"],
        ]);
      }
    }
  }

  private merge(u: TableUnit) {
    return {
      ...u,
      inStock: this.in_stock_table.get(u["id"]) || false,
      sortIndex: this.position_map.get(u["id"])!
    };
  }

  list(offset: number, search: string, limit = 20) {
    if (search) {
      let indexes = [];
      for (const id of this.id_hash_table.keys()) {
        String(id).includes(search) && indexes.push(this.id_hash_table.get(id)!);
      }
      return indexes
        .slice(offset, offset + limit)
        .sort((a: number, b: number) => {
          return this.position_map.get(a)! - this.position_map.get(b)!;
        })
        .map((i: number) => this.merge(this.origin_table[i]));
    } else {
      return this.sort_indexes_table
        .slice(offset, offset + limit)
        .map((i) => this.merge(this.origin_table[i]));
    }
  }

  get(id: number) {
    return this.merge(
      this.origin_table[this.sort_indexes_table[this.position_map.get(id)!]]
    );
  }

  moveIndex(fromIndex: number, toIndex: number) {
    const item = this.sort_indexes_table[fromIndex];
    const direction = fromIndex < toIndex ? 1 : -1;

    for (let i = fromIndex; i !== toIndex; i += direction) {
      this.sort_indexes_table[i] = this.sort_indexes_table[i + direction];
      this.position_map.set(this.sort_indexes_table[i], i);
    }

    this.sort_indexes_table[toIndex] = item;
    this.position_map.set(this.sort_indexes_table[toIndex], toIndex);
  }

  update(id: number, field: string, value: any) {
    if (field === "inStock") {
      this.in_stock_table.set(id, value);
    } else if (this.propertys_entity.includes(field)) {
      if (this.id_hash_table.get(id)) {
        const elem = this.origin_table[this.id_hash_table.get(id)!];
        //@ts-ignore
        elem[field] = value
      }
    }
    const obj = 
  }
}
