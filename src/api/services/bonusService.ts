import Deal from "../models/deal";

export class BonusService {
    calculate = (value: number): number => {
        if (value < 1000)
            return 0.1;
        else if (value > 1000 && value <= 1500)
            return 0.15;
        else
            return 0.2;
    }
    applyBonus = (deal: Deal): Deal => {
        deal.cashback_percent = this.calculate(deal.value);
        deal.cashback_value = deal.value * deal.cashback_percent;
        return deal;
    }
}