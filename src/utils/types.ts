import { Request } from 'express';

export interface MyRequest extends Request {
  user?: { _id: string };
  file?: Express.Multer.File;
}

export interface IError extends Error {
  status?: number;
}
