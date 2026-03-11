import dotenv from 'dotenv';

dotenv.config();

const required = ['DATABASE_URL', 'JWT_SECRET'];
required.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing environment variable: ${key}`);
  }
});

export const env = {
  port: Number(process.env.PORT ?? 5000),
  databaseUrl: process.env.DATABASE_URL as string,
  jwtSecret: process.env.JWT_SECRET as string,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '1d',
  adminLogin: process.env.ADMIN_LOGIN ?? 'admin',
  adminPassword: process.env.ADMIN_PASSWORD ?? 'admin123'
};
