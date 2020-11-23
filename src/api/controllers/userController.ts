import UserService from '../services/userService';
import { Request, Response } from 'express';

export default class UserController {
  userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
  }

  all = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = await this.userService.all();
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json(error);
    }
  };

  byId = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const data = await this.userService.byId(id);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json(error);
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = await this.userService.create(req.body);
      res.status(201).location(`/api/v1/user/${data.user_id}`).send(data);
    } catch (error) {
      res.status(400).json(error);
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const data = await this.userService.update(id, req.body);
      res.status(201).location(`/api/v1/user/${data.user_id}`).send(data);
    } catch (error) {
      res.status(400).json(error);
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    await this.userService.delete(id);

    res.status(200).end();
  };
}
