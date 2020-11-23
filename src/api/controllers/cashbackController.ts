import CashbackService from '../services/cashbackService';
import { Request, Response } from 'express';

export default class UserController {
    cashbackService: CashbackService;
    constructor(cashbackService: CashbackService) {
        this.cashbackService = cashbackService;
    }

    getCashbackByCpf = async (req: Request, res: Response): Promise<void> => {
        const { cpf } = req.params;
        try {
            const data = await this.cashbackService.getCashback(cpf);
            res.status(200).json(data);
        } catch (error) {
            res.status(400).json(error);
        }
    };
}
