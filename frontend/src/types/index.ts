export type CarStatus = 'AVAILABLE' | 'RESERVED' | 'SOLD';

export interface Model {
  id: number;
  brand: string;
  modelName: string;
  bodyType: string;
}

export interface Car {
  id: number;
  modelId: number;
  model: Model;
  year: number;
  price: string;
  mileage: number;
  engine: string;
  transmission: string;
  fuelType: string;
  color: string;
  description: string;
  imageUrl: string;
  status: CarStatus;
}

export interface Application {
  id: number;
  message: string;
  createdAt: string;
  client: { fullName: string; phone: string; email: string };
  car: Car;
}

export interface TestDrive {
  id: number;
  preferredDate: string;
  comment: string;
  createdAt: string;
  client: { fullName: string; phone: string; email: string };
  car: Car;
}

export interface AdminUser {
  id: number;
  login: string;
  role: 'ADMIN';
}
