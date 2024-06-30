import express from 'express';
import auth from '../middlewares/auth';
import * as productController from '../controllers/products';
import * as validate from '../middlewares/validation';

const router = express.Router();

router.get('/products', productController.getAllProducts);
router.get(
  '/products/:productId',
  validate.productIdValidation,
  productController.getProduct,
);

router.use(auth);
router.post(
  '/products',
  validate.createProductValidation,
  productController.createProduct,
);
router.put(
  '/products/:productId',
  validate.productIdValidation,
  productController.updateProduct,
);

router.delete(
  '/products/:productId',
  validate.productIdValidation,
  productController.deleteProduct,
);

export default router;
