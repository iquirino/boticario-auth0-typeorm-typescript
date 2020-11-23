import { Request, Response, NextFunction, RequestHandler } from 'express';

import jwt from 'express-jwt';
import jwks from 'jwks-rsa';
import AuthService from '../services/authService';

export const hasScope = (permissions: string[]): RequestHandler => async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const service = new AuthService();
    const user_id = req['user']?.sub.toString();
    const data = await service.getPermissions(user_id);

    for (let x = 0; x < permissions.length; x++) {
      const permission = permissions[x];
      if (data.includes(permission)) {
        next();
        return { req, res, next };
      }
    }

    res.status(401).json({ error: 'Unathorized' }).end();
  } catch (error) {
    res.status(400).json({ error }).end();
  }
  return { req, res, next };
};

export const isAuthenticated = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://' + process.env.OAUTH2_ISSUER + '/.well-known/jwks.json',
  }),
  audience: process.env.OAUTH2_AUDIENCE,
  issuer: 'https://' + process.env.OAUTH2_ISSUER + '/',
  algorithms: ['RS256'],
});
