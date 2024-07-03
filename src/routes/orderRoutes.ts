import express from 'express';
import * as orderController from '../controllers/orders';
import * as validate from '../middlewares/validation';
import auth from '../middlewares/auth';

const router = express.Router();

router.get('/orders/:orderId', validate.orderIdValidation, orderController.getOrder);
router.post('/orders', validate.createOrderValidation, orderController.createOrder);
router.use(auth);

router.get('/orders', orderController.getAllOrders);

router.put(
  '/orders/:orderId',
  validate.updateOrderValidation,
  orderController.updateOrder,
);
router.delete(
  '/orders/:orderId',
  validate.orderIdValidation,
  orderController.deleteOrder,
);

export default router;
