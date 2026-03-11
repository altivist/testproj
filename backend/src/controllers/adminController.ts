import { Request, Response } from 'express';
import { prisma } from '../config/prisma';

export const createCar = async (req: Request, res: Response): Promise<void> => {
  const car = await prisma.car.create({ data: req.body, include: { model: true } });
  res.status(201).json(car);
};

export const updateCar = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  const car = await prisma.car.update({ where: { id }, data: req.body, include: { model: true } });
  res.json(car);
};

export const deleteCar = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  await prisma.car.delete({ where: { id } });
  res.json({ message: 'Car deleted' });
};

export const getApplications = async (_req: Request, res: Response): Promise<void> => {
  const applications = await prisma.application.findMany({
    include: { client: true, car: { include: { model: true } } },
    orderBy: { createdAt: 'desc' }
  });
  res.json(applications);
};

export const getTestDrives = async (_req: Request, res: Response): Promise<void> => {
  const testDrives = await prisma.testDrive.findMany({
    include: { client: true, car: { include: { model: true } } },
    orderBy: { createdAt: 'desc' }
  });
  res.json(testDrives);
};
