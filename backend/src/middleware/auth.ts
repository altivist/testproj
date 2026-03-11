import { NextFunction, Request, Response } from 'express';
import { UserRole } from '@prisma/client';
import { verifyToken } from '../utils/jwt';

export const authRequired = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : req.cookies?.token;

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    req.user = verifyToken(token);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const adminOnly = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user || req.user.role !== UserRole.ADMIN) {
    res.status(403).json({ message: 'Forbidden' });
    return;
  }
  next();
};
