import { Application } from 'express';

import authRouter from './api/routes/authRoutes';
import userRouter from './api/routes/userRoutes';
import profileRouter from './api/routes/profileRoutes';
import dealRouter from './api/routes/dealRoutes';

export default function routes(app: Application): void {
  app.use('/api/v1/auth', authRouter());
  app.use('/api/v1/user', userRouter());
  app.use('/api/v1/deal', dealRouter());
  app.use('/api/v1/profile', profileRouter());
}
