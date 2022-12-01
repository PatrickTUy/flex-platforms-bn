import express from 'express';
import userRoutes from './userRoutes';

const routes = express.Router();

routes.use('/auth', userRoutes);

export default routes;