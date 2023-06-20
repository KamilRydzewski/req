
export interface User {
  id?: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface BackendTableResponse<T> {
  page: number,
  per_page: number,
  total: number,
  total_pages: number,
  data: T;
}

export enum Page {
  USER_LIST = 'userList',
  USER = 'user'
}
