import express from 'express';
import UserController from '../controllers/userController';
import { isAuthenticated, hasScope } from '../utils/security';
import UserService from '../services/userService';

export default () => {
  const controller = new UserController(new UserService());
  return express
    .Router()
    .get('/', isAuthenticated, hasScope(['read:users']), controller.all)
    .get('/:id', isAuthenticated, hasScope(['read:users']), controller.byId)
    .post('/', controller.create)
    .put('/:id', isAuthenticated, hasScope(['update:users']), controller.update)
    .delete(
      '/:id',
      isAuthenticated,
      hasScope(['delete:users']),
      controller.delete
    );
};
