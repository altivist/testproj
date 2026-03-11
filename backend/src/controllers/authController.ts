import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { prisma } from '../config/prisma';
import { signToken } from '../utils/jwt';

export const login = async (req: Request, res: Response): Promise<void> => {
  const { login, password } = req.body;

  const user = await prisma.user.findUnique({ where: { login } });
  if (!user) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  const token = signToken({ id: user.id, login: user.login, role: user.role });
  res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
  res.json({ token, user: { id: user.id, login: user.login, role: user.role } });
};

export const me = async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  res.json({ user: req.user });
};

export const logout = async (_req: Request, res: Response): Promise<void> => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
};
