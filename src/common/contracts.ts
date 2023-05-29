export type SelectBoxInterface = {
  value: any;
  label: string;
};

export type Pagination = {
  sortBy: string;
  descending: boolean;
  page: number;
  rowsPerPage: number;
  rowsNumber: number;

  // page: number;
  // total: number;
  // per_page: number;
  // sortBy: string;
  // descending?: boolean;
  // rowsPerPage: number;
  // rowsNumber: number;
};

export interface OutputApiPaginationInterface<T> {
  data: T[];
  page: number;
  per_page: number;
  total: number;
}

export interface InputApiPaginationInterface {
  page?: number;
  per_page?: number;
  sort_by?: string;
  sort_order?: "asc" | "desc";
}
