import { NextFunction, Request, Response } from 'express';

export class AppError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export const notFoundHandler = (_req: Request, _res: Response, next: NextFunction): void => {
  next(new AppError(404, 'Route not found'));
};

export const errorHandler = (
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const status = err instanceof AppError ? err.status : 500;
  res.status(status).json({ message: err.message || 'Internal server error' });
};
