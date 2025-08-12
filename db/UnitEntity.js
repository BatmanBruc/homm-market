import unitMap from "./unitMap.js";

export default class UnitEntity {
  origin_table = [];
  sort_indexes_table = [];
  names_hash_table = new Map();
  search_hash_table = new Map();
  in_stock_table = new Map();
  positionMap = new Map();

  constructor(length = 1000000) {
    this._createTable(length);
    if (this.origin_table.length) {
      this._createNamesHashTable();
    }
  }

  _generateUnit() {
    const rank = Math.floor(Math.random() * 8) + 1;
    const unit = Math.floor(Math.random() * 6) + 1;
    const name = unitMap[rank - 1][unit - 1];
    const count = Math.floor(Math.random() * 10000) + 1;
    return [rank, name, count];
  }

  _createTable(length) {
    for (let i = 0; i < length; i++) {
      this.sort_indexes_table.push(i);
      const [rank, name, count] = this._generateUnit();
      this.origin_table.push({
        internal_id: i,
        id: i + 1,
        name,
        price: rank * count * 100,
        count,
      });
    }
  }

  _createNamesHashTable() {
    for (let i = 0; i < this.origin_table.length; i++) {
      if (this.names_hash_table.has(this.origin_table[i]["name"])) {
        this.names_hash_table
          .get(this.origin_table[i]["name"])
          .push(this.origin_table[i]);
      } else {
        this.names_hash_table.set(this.origin_table[i]["name"], [
          this.origin_table[i],
        ]);
      }
    }
  }

  _merge(u) {
    return {
      ...u,
      inStock: this.in_stock_table[u["id"]],
    };
  }

  _search(field, value) {
    return this.origin_table.filter((item) => item[field] === value);
  }

  _updatePositionMap() {
    this.positionMap.clear();
    this.sort_indexes_table.forEach((internal_id, sortedPos) => {
      this.positionMap.set(internal_id, sortedPos);
    });
  }

  list(offset = 0, search, limit = 20) {
    if (search) {
      const names = this.names_hash_table
        .keys()
        .filter((key) => key.includes(search));
      
      const indexes = this.search_hash_table[search] || [];
      if (!indexes.length) {
        for (let i = 0; i < names.length; i++) {
          indexes = [...indexes, ...this.names_hash_table.get(names[i])];
        }
        this.search_hash_table[search] = indexes;
      }

      return indexes
        .slice(offset, offset + limit)
        .sort((a, b) => {
          return positionMap.get(a) - positionMap.get(b);
        });
    } else {
      return this.sort_indexes_table
        .slice(offset, offset + limit)
        .map((i) => this._merge(this.origin_table[i]));
    }
  }

  get(id) {
    return this.origin_table[this.sort_indexes_table[this.positionMap.get(id)]];
  }

  moveIndex(fromIndex, toIndex) {
    if (fromIndex === toIndex) return arr;
    const item = this.sort_indexes_table[fromIndex];
    const direction = fromIndex < toIndex ? 1 : -1;

    for (let i = fromIndex; i !== toIndex; i += direction) {
      this.sort_indexes_table[i] = this.sort_indexes_table[i + direction];
    }

    this.sort_indexes_table[toIndex] = item;
    this._updatePositionMap();
  }

  insert(id, field, value) {
    if (field === 'inStock') {
      this.in_stock_table[id] = value;
    }
  }
}
