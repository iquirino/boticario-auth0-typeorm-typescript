import { Request, Response, NextFunction } from 'express';
import l from '../../common/logger';

// eslint-disable-next-line no-unused-vars, no-shadow
export default function errorHandler(
  err,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void {
  const errors = err.errors || [{ message: err.message }];
  l.error(err);
  res.status(err.status || 500).json({ errors });
}
