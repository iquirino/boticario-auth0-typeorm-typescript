import express from 'express';
import AuthController from '../controllers/authController';
import AuthService from '../services/authService';

export default () => {
  const service = new AuthService();
  const controller = new AuthController(service);
  return express.Router().post('/token', controller.getToken);
};
