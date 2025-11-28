export interface Address {
  street: string;
  state: string;
  city: string;
  zipcode: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  address: Address;
  formattedAddress: string;
}

export interface PaginatedUsersResponse {
  users: User[];
  total: number;
}

export interface Post {
  id: string;
  userId: string;
  title: string;
  body: string;
}

