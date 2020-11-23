import L from '../../common/logger';
import Deal from '../models/deal';
import { getConnection, DeleteResult, InsertResult } from "typeorm";
import { BonusService } from './bonusService';


export class DealService {
    private bonusService:BonusService;

    constructor(bonusService:BonusService){
        this.bonusService = bonusService;
    }

    async all(): Promise<Deal[]> {
        L.info('fetch all deals');
        const dealRepository = getConnection().getRepository(Deal);
        return await dealRepository.find();
    }

    async byId(id: number): Promise<Deal> {
        L.info(`fetch deal with id ${id}`);
        const dealRepository = getConnection().getRepository(Deal);
        return await dealRepository.findOne(id);
    }

    async delete(id: number): Promise<DeleteResult> {
        L.info(`delete deal with id ${id}`);
        const dealRepository = getConnection().getRepository(Deal);
        return await dealRepository.delete(id);
    }

    async create(deal: Deal): Promise<InsertResult> {
        L.info(`create deal with cpf ${deal.cpf}`);
        
        const dealRepository = getConnection().getRepository(Deal);

        deal.date = new Date();
        deal.status = "Em validação";

        if (deal.cpf === "153.509.460-56")
            deal.status = "Aprovado";

        deal = this.bonusService.applyBonus(deal);

        return await dealRepository.insert(deal);
    }
}

export default DealService;
