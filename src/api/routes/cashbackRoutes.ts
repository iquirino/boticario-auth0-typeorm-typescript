import express from 'express';

import CashbackController from '../controllers/cashbackController';
import { isAuthenticated, hasScope } from '../utils/security';
import CashbackService from '../services/cashbackService';

export default () => {
    const controller = new CashbackController(new CashbackService());
    return express
        .Router()
        .get('/:cpf', isAuthenticated, hasScope(['read:cashbacks']), controller.getCashbackByCpf);
};
