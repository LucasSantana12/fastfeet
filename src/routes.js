import { Router } from 'express'
import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import authMiddlewares from './app/middlewares/auth'
import RecipientController from './app/controllers/RecipientController';

const routes = new Router();

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)

//Criar novo destinattario
routes.post('/recipients', authMiddlewares, RecipientController.store)
    //UPDATE
routes.put('/recipients/edit/:id', authMiddlewares, RecipientController.update)
routes.put('/users', UserController.update)


export default routes