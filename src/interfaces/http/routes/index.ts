import { Router } from 'express';
import { customerRoutes } from './customerRoutes';
import { productRoutes } from './productRoutes';
import { cartRoutes } from './cartRoutes';
import { orderRoutes } from './orderRoutes';
import { paymentRoutes } from './paymentRoutes';
import { sellerRoutes } from './sellerRoutes';

const router = Router();

router.use('/customers', customerRoutes);
router.use('/products', productRoutes);
router.use('/carts', cartRoutes);
router.use('/orders', orderRoutes);
router.use('/payments', paymentRoutes);
router.use('/sellers', sellerRoutes);

export { router };