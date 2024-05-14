export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  number: string;
  complement?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
