import UserService from '../services/userService';
import CashbackService from '../services/cashbackService';
import { Request, Response } from 'express';

export default class ProfileController {
  userService: UserService;
  cashbackService: CashbackService;

  constructor(userService: UserService, cashbackService: CashbackService) {
    this.userService = userService;
    this.cashbackService = cashbackService;
  }

  get = async (req: Request, res: Response): Promise<void> => {
    try {
      const user_id = req['user']?.sub.toString();
      const data = await this.userService.byId(user_id);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json(error);
    }
  };

  getCashback = async (req: Request, res: Response): Promise<void> => {
    try {
      const user_id = req['user']?.sub.toString();
      const data = await this.userService.byId(user_id);
      const cashback = await this.cashbackService.getCashback(data.user_metadata?.cpf);
      res.status(200).json(cashback);
    } catch (error) {
      res.status(400).json(error);
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const user_id = req['user']?.sub.toString();
      const data = await this.userService.update(user_id, req.body);
      res.status(201).location(`/api/v1/user/${data.user_id}`).send(data);
    } catch (error) {
      res.status(400).json(error);
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const user_id = req['user']?.sub.toString();
    await this.userService.delete(user_id);
    res.status(200).end();
  };
}
