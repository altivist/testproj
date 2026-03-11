import { CarStatus, Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import { prisma } from '../config/prisma';

export const getModels = async (_req: Request, res: Response): Promise<void> => {
  const models = await prisma.model.findMany({ orderBy: [{ brand: 'asc' }, { modelName: 'asc' }] });
  res.json(models);
};

export const getCars = async (req: Request, res: Response): Promise<void> => {
  const { brand, model, fuelType, transmission, status, minPrice, maxPrice, minYear, maxYear, q } = req.query;

  const statusValue = status && Object.values(CarStatus).includes(String(status) as CarStatus) ? String(status) as CarStatus : undefined;

  const where: Prisma.CarWhereInput = {
    status: statusValue,
    fuelType: fuelType ? String(fuelType) : undefined,
    transmission: transmission ? String(transmission) : undefined,
    year: (minYear || maxYear) ? {
      gte: minYear ? Number(minYear) : undefined,
      lte: maxYear ? Number(maxYear) : undefined
    } : undefined,
    price: (minPrice || maxPrice) ? {
      gte: minPrice ? new Prisma.Decimal(String(minPrice)) : undefined,
      lte: maxPrice ? new Prisma.Decimal(String(maxPrice)) : undefined
    } : undefined,
    OR: q ? [
      { description: { contains: String(q), mode: 'insensitive' } },
      { color: { contains: String(q), mode: 'insensitive' } },
      { model: { brand: { contains: String(q), mode: 'insensitive' } } },
      { model: { modelName: { contains: String(q), mode: 'insensitive' } } }
    ] : undefined,
    model: {
      brand: brand ? String(brand) : undefined,
      modelName: model ? String(model) : undefined
    }
  };

  const cars = await prisma.car.findMany({ where, include: { model: true }, orderBy: { createdAt: 'desc' } });
  res.json(cars);
};

export const getCarById = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  const car = await prisma.car.findUnique({ where: { id }, include: { model: true } });
  if (!car) {
    res.status(404).json({ message: 'Car not found' });
    return;
  }
  res.json(car);
};

export const createApplication = async (req: Request, res: Response): Promise<void> => {
  const { fullName, phone, email, carId, message } = req.body;

  const client = await prisma.client.upsert({
    where: { phone_email: { phone, email } },
    create: { fullName, phone, email },
    update: { fullName }
  });

  const application = await prisma.application.create({
    data: { clientId: client.id, carId, message },
    include: { car: { include: { model: true } }, client: true }
  });

  res.status(201).json(application);
};

export const createTestDrive = async (req: Request, res: Response): Promise<void> => {
  const { fullName, phone, email, carId, preferredDate, comment } = req.body;

  const client = await prisma.client.upsert({
    where: { phone_email: { phone, email } },
    create: { fullName, phone, email },
    update: { fullName }
  });

  const testDrive = await prisma.testDrive.create({
    data: { clientId: client.id, carId, preferredDate: new Date(preferredDate), comment },
    include: { car: { include: { model: true } }, client: true }
  });

  res.status(201).json(testDrive);
};
