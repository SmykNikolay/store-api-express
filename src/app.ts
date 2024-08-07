import { errors } from 'celebrate';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';

import { DEFAULT_PORT } from './utils/constants';
import { IError } from './utils/types';

import cardRoutes from './routes/cardRoutes';
import orderRoutes from './routes/orderRoutes';
import userRoutes from './routes/userRoutes';

import { ERROR_MESSAGES, NotFoundError, STATUS_CODES } from './utils/errors';

import { errorLogger, requestLogger } from './middlewares/logger';
import categoryRoutes from './routes/categoryRoutes';
import productRoutes from './routes/productRoutes';

const app = express();

mongoose.set('strictQuery', true);

// const db = `${DEFAULT_MONGO_DB_PATH}/${DEFAULT_MONGO_DB_NAME}`;
const db = 'mongodb://mestodb:DEFAULT_SECRET_KEY@localhost:27017/mestodb?authSource=admin';

app.use(helmet());

mongoose
  .connect(db)
  .then(() => console.log('Подключение к MongoDB успешно установлено'))
  .catch((error) => console.error('Ошибка подключения к MongoDB:', error));

app.use(express.json());

app.use(
  morgan('tiny', {
    stream: {
      write: (message: string) => requestLogger.info(message.trim())
    }
  })
);

app.use((err: Error, _req: Request, _res: Response, next: NextFunction) => {
  errorLogger.error(err);
  next(err);
});

app.get('/test', (_req, res) => {
  res.send('Hello world!');
});

app.get('/crash-test', (_req, res) => {
  res.status(STATUS_CODES.INTERNAL_SERVER_ERROR);
  throw new Error('Сервер сейчас упадёт');
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
    message: err.message
  });
  next();
});

app.listen(DEFAULT_PORT, () => {
  console.log(`Сервер запущен на порту ${DEFAULT_PORT}`);
});
