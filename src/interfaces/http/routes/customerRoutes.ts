import { Router } from 'express';
import { CustomerController } from '../controllers/CustomerController';
import { authMiddleware } from '../middlewares/authMiddleware';

const customerRoutes = Router();
const customerController = new CustomerController();

customerRoutes.post('/', customerController.create);
customerRoutes.post('/login', customerController.login);

customerRoutes.use(authMiddleware);

customerRoutes.get('/', customerController.list);
customerRoutes.get('/:id', customerController.show);
customerRoutes.put('/:id', customerController.update);
customerRoutes.delete('/:id', customerController.delete);

export { customerRoutes };