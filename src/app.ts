import mongoose from 'mongoose';
import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { errors } from 'celebrate';

import { IError } from './utils/types';
import { DEFAULT_PORT } from './utils/constants';

import userRoutes from './routes/userRoutes';
import cardRoutes from './routes/cardRoutes';
import orderRoutes from './routes/orderRoutes';

import { ERROR_MESSAGES, NotFoundError, STATUS_CODES } from './utils/errors';

import { requestLogger, errorLogger } from './middlewares/logger';
import categoryRoutes from './routes/categoryRoutes';
import productRoutes from './routes/productRoutes';

const app = express();

mongoose.set('strictQuery', true);

const db =
  'mongodb://mestodb:DEFAULT_SECRET_KEY@localhost:27017/mestodb?authSource=admin';

app.use(helmet());

mongoose
  .connect(db)
  .then(() => console.log('Подключение к MongoDB успешно установлено'))
  .catch((error) => console.error('Ошибка подключения к MongoDB:', error));

app.use(express.json());

app.use(
  morgan('tiny', {
    stream: {
      write: (message: string) => requestLogger.info(message.trim()),
    },
  }),
);

app.use((err: any, _req: Request, _res: Response, next: NextFunction) => {
  errorLogger.error(err);
  next(err);
});

app.get('/test', (_req, res) => {
  res.send('Hello world!');
});

app.use(userRoutes);

app.use(cardRoutes);

app.use(categoryRoutes);

app.use(productRoutes);

app.use(orderRoutes);

app.use(errors());

app.use('*', (_req, _res, next) => {
  next(new NotFoundError(ERROR_MESSAGES.NOT_FOUND));
});
app.use((err: IError, _req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || STATUS_CODES.INTERNAL_SERVER_ERROR).json({
    message: err.message,
  });
  next();
});

app.listen(DEFAULT_PORT, () => {
  console.log(`Сервер запущен на порту ${DEFAULT_PORT}`);
});
