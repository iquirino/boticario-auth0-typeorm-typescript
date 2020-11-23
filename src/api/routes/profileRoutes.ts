import express from 'express';
import ProfileController from '../controllers/profileController';
import { isAuthenticated } from '../utils/security';
import UserService from '../services/userService';
import CashbackService from '../services/cashbackService';

export default () => {
  const controller = new ProfileController(new UserService(), new CashbackService());
  return express
    .Router()
    .get('/', isAuthenticated, controller.get)
    .get('/cashback', isAuthenticated, controller.getCashback)
    .put('/', isAuthenticated, controller.update)
    .delete('/', isAuthenticated, controller.delete);
};
