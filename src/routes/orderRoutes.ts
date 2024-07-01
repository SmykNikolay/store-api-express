import express from 'express';
import * as orderController from '../controllers/orders';
// import * as validate from '../middlewares/validation';
import auth from '../middlewares/auth';

const router = express.Router();

router.get('/orders', orderController.getAllOrders);
router.get('/orders/:orderId', orderController.getOrder);

router.use(auth);
router.post('/orders', orderController.createOrder);
router.put('/orders/:orderId', orderController.updateOrder);
router.delete('/orders/:orderId', orderController.deleteOrder);

export default router;
