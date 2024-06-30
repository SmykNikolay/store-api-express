import express from 'express';
import * as categoryController from '../controllers/categories';
import * as validate from '../middlewares/validation';
import auth from '../middlewares/auth';

const router = express.Router();

router.get('/categories', categoryController.getAllCategories);
router.get(
  '/categories/:categoryId',
  validate.categoryIdValidation,
  categoryController.getCategory,
);

router.use(auth);
router.put(
  '/categories/:categoryId',
  validate.categoryIdValidation,
  categoryController.updateCategory,
);
router.post(
  '/categories',
  validate.createCategoryValidation,
  categoryController.createCategory,
);
router.delete(
  '/categories/:categoryId',
  validate.categoryIdValidation,
  categoryController.deleteCategory,
);

export default router;
