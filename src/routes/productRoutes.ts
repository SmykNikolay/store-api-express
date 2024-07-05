import express, { Request } from 'express';
import multer from 'multer';

import auth from '../middlewares/auth';
import * as productController from '../controllers/products';
import * as validate from '../middlewares/validation';

const router = express.Router();

const storage = multer.diskStorage({
  destination(_req: Request, _file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
    cb(null, 'uploads/');
  },
  filename(req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
    cb(null, `${Date.now()}-${file.originalname}`); // Настройка имени файла
  }
});
const upload = multer({ storage });

router.get('/products', productController.getAllProducts);
router.get('/products/:productId', validate.productIdValidation, productController.getProduct);

router.use(auth);

router.post('/products', validate.createProductValidation, productController.createProduct);
router.put('/products/:productId', validate.productIdValidation, productController.updateProduct);

router.delete('/products/:productId', validate.productIdValidation, productController.deleteProduct);

router.post('/products/upload', upload.single('file'), productController.uploadFile);

export default router;
