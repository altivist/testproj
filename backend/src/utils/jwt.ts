import jwt from 'jsonwebtoken';
import { UserRole } from '@prisma/client';
import { env } from '../config/env';

type Payload = { id: number; login: string; role: UserRole };

export const signToken = (payload: Payload): string =>
  jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn });

export const verifyToken = (token: string): Payload => jwt.verify(token, env.jwtSecret) as Payload;
