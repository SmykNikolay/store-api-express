import express from 'express';
import winston from 'winston';
import expressWinston from 'express-winston';
import 'winston-daily-rotate-file';

const requestLogger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.DailyRotateFile({
      filename: 'logs/request-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      zippedArchive: true,
      maxFiles: '14d',
    }),
  ],
});

const errorLogger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      zippedArchive: true,
      maxFiles: '14d',
    }),
  ],
});

const app = express();

app.use(
  expressWinston.logger({
    winstonInstance: requestLogger,
  }),
);

app.use(
  expressWinston.errorLogger({
    winstonInstance: errorLogger,
  }),
);

export { requestLogger, errorLogger };
