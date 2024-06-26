/* eslint-disable no-console */
import mongoose from 'mongoose';
import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import { errors } from 'celebrate';

import morgan from 'morgan';
import { IError } from './utils/types';
import {
  DEFAULT_MONGO_DB_NAME, DEFAULT_MONGO_DB_PATH, DEFAULT_PORT,
} from './utils/constants';

import { ERROR_MESSAGES, NotFoundError, STATUS_CODES } from './utils/errors';
import { requestLogger } from './middlewares/logger';

const app = express();

mongoose.set('strictQuery', true);

const db = `${DEFAULT_MONGO_DB_PATH}/${DEFAULT_MONGO_DB_NAME}`;

app.use(helmet());

mongoose.connect(db)
  .then(() => console.log('Подключение к MongoDB успешно установлено'))
  .catch((error) => console.error('Ошибка подключения к MongoDB:', error));

app.use(express.json());

app.use(morgan('tiny', {
  stream: {
    write: (message: string) => requestLogger.info(message.trim()),
  },
}));

app.use(errors());

app.get('/', (req: Request, res: Response) => {
  res.send('Сервер работает!');
});

app.use('*', (req, res, next) => {
  next(new NotFoundError(ERROR_MESSAGES.NOT_FOUND));
});

app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
  res
    .status(err.status || STATUS_CODES.INTERNAL_SERVER_ERROR)
    .json({
      message: err.message,
    });
  next();
});

app.listen(DEFAULT_PORT, () => {
  console.log(`Сервер запущен на порту ${DEFAULT_PORT}`);
});
