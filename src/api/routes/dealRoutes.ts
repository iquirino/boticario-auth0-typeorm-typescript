import express from 'express';
import DealController from '../controllers/dealController';
import { isAuthenticated, hasScope } from '../utils/security';
import DealService from '../services/dealService';
import { BonusService } from '../services/bonusService';

export default () => {
  const controller = new DealController(new DealService(new BonusService()));
  return express
    .Router()
    .get('/', isAuthenticated, controller.all)
    .get('/:id', isAuthenticated, controller.byId)
    .post('/', isAuthenticated, controller.create)
    .delete('/', isAuthenticated, hasScope(['delete:deals']), controller.delete);
};
