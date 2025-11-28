export interface Address {
  id?: number;
  userId?: number;
  street?: string;
  suite?: string | null;
  city?: string;
  zipcode?: string;
  [key: string]: any; 
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  address?: Address | null;
  formattedAddress?: string | null;
}
