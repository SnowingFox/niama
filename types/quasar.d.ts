import * as C from './core';

export interface QTableColumn<FR> {
  align?: 'center' | 'left' | 'right';
  classes?: string;
  field: keyof FR | ((row: FR) => string);
  format?: (val: any, row: FR) => string;
  label: string;
  name: string;
  required?: boolean;
  sort?: (a:any, b: any, rowA: FR, rowB: FR) => number;
  sortable?: boolean;
  style?: string;
}

export interface QTablePagination {
  descending: boolean;
  page: number;
  rowsNumber?: number;
  rowsPerPage: number;
  sortBy: C.Maybe<string>;
}
