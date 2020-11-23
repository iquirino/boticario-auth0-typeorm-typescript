import DealService from '../services/dealService';
import { Request, Response } from 'express';

export default class DealController {
    dealService: DealService;
    constructor(dealService: DealService) {
        this.dealService = dealService;
    }

    all = async (req: Request, res: Response): Promise<void> => {
        try {
            const data = await this.dealService.all();
            res.status(200).json(data);
        } catch (error) {
            res.status(400).json(error);
        }
    };

    byId = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        try {
            const data = await this.dealService.byId(parseInt(id));
            res.status(200).json(data);
        } catch (error) {
            res.status(400).json(error);
        }
    };

    delete = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const data = await this.dealService.delete(parseInt(id));
            res.status(200).json(data);
        } catch (error) {
            res.status(400).json(error);
        }
    };

    create = async (req: Request, res: Response): Promise<void> => {
        try {
            const data = await this.dealService.create(req.body);
            res.status(201).location(`/api/v1/deal/${data.generatedMaps[0]}`).send(data);
        } catch (error) {
            res.status(400).json(error);
        }
    };
}
