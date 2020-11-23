import AuthService from '../services/authService';
import { Request, Response } from 'express';

export default class AuthController {
  authService: AuthService;
  constructor(service: AuthService) {
    this.authService = service;
  }

  getToken = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    try {
      const data = await this.authService.getToken(username, password);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json(error);
    }
  };
}
