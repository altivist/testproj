import bcrypt from 'bcryptjs';
import { CarStatus, PrismaClient, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  await prisma.testDrive.deleteMany();
  await prisma.application.deleteMany();
  await prisma.car.deleteMany();
  await prisma.model.deleteMany();
  await prisma.client.deleteMany();
  await prisma.user.deleteMany();

  const models = await prisma.$transaction([
    prisma.model.create({ data: { brand: 'Toyota', modelName: 'Camry', bodyType: 'Sedan' } }),
    prisma.model.create({ data: { brand: 'BMW', modelName: 'X5', bodyType: 'SUV' } }),
    prisma.model.create({ data: { brand: 'Audi', modelName: 'A6', bodyType: 'Sedan' } }),
    prisma.model.create({ data: { brand: 'Kia', modelName: 'Sportage', bodyType: 'SUV' } }),
    prisma.model.create({ data: { brand: 'Hyundai', modelName: 'Elantra', bodyType: 'Sedan' } }),
    prisma.model.create({ data: { brand: 'Mercedes-Benz', modelName: 'GLC', bodyType: 'SUV' } })
  ]);

  const mkCar = (modelId: number, i: number, status: CarStatus) => ({
    modelId,
    year: 2018 + (i % 7),
    price: 18000 + i * 2200,
    mileage: 15000 + i * 9000,
    engine: i % 2 === 0 ? '2.0L Turbo' : '2.5L',
    transmission: i % 2 === 0 ? 'Automatic' : 'CVT',
    fuelType: i % 3 === 0 ? 'Diesel' : 'Petrol',
    color: ['Black', 'White', 'Blue', 'Gray'][i % 4],
    description: `Отличное состояние, сервисная история, проверка на СТО. Автомобиль №${i + 1}.`,
    imageUrl: `https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1200&q=80&sig=${i}`,
    status
  });

  const cars = await prisma.car.createManyAndReturn({
    data: Array.from({ length: 12 }).map((_, i) =>
      mkCar(models[i % models.length].id, i, i % 5 === 0 ? CarStatus.RESERVED : i % 7 === 0 ? CarStatus.SOLD : CarStatus.AVAILABLE)
    )
  });

  const clients = await prisma.$transaction([
    prisma.client.create({ data: { fullName: 'Иван Петров', phone: '+79990000001', email: 'ivan@example.com' } }),
    prisma.client.create({ data: { fullName: 'Мария Соколова', phone: '+79990000002', email: 'maria@example.com' } }),
    prisma.client.create({ data: { fullName: 'Алексей Орлов', phone: '+79990000003', email: 'alex@example.com' } })
  ]);

  await prisma.application.createMany({
    data: [
      { clientId: clients[0].id, carId: cars[0].id, message: 'Интересует кредит и трейд-ин.' },
      { clientId: clients[1].id, carId: cars[3].id, message: 'Можно ли посмотреть машину в выходные?' },
      { clientId: clients[2].id, carId: cars[5].id, message: 'Нужна комплектация с кожаным салоном.' }
    ]
  });

  await prisma.testDrive.createMany({
    data: [
      { clientId: clients[0].id, carId: cars[2].id, preferredDate: new Date(Date.now() + 86400000), comment: 'После 18:00' },
      { clientId: clients[1].id, carId: cars[4].id, preferredDate: new Date(Date.now() + 172800000), comment: 'Утром' },
      { clientId: clients[2].id, carId: cars[1].id, preferredDate: new Date(Date.now() + 259200000), comment: 'Нужен автомат' }
    ]
  });

  const passwordHash = await bcrypt.hash('admin123', 10);
  await prisma.user.create({
    data: {
      login: 'admin',
      passwordHash,
      role: UserRole.ADMIN
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('Seed completed');
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
