export type TUnit = {
  id: number;
  name: string;
  price: number;
  count: number;
  inStock: boolean;
  sortIndex: number;
}

export interface Entity<T> {
  list: (offset: number, search: string, limit: number) => T[];
  get: (id: number) => T;
  moveIndex: (fromIndex: number, toIndex: number) => void;
  update: (id: number, field: string, value: any) => void;
}