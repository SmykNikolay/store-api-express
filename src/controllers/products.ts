import { NextFunction, Request, Response } from 'express';
import {
  STATUS_CODES,
  ERROR_MESSAGES,
  NotFoundError,
  BadRequestError,
} from '../utils/errors';
import Product from '../model/product';
import { MyRequest } from '../utils/types';

export async function getAllProducts(_req: Request, res: Response, next: NextFunction) {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (err) {
    next(err);
  }
}

export async function createProduct(req: MyRequest, res: Response, next: NextFunction) {
  try {
    const product = await Product.create({ ...req.body });
    return res.status(STATUS_CODES.CREATED).send(product);
  } catch (err) {
    if ((err as Error).name === 'ValidationError') {
      return next(new BadRequestError(ERROR_MESSAGES.INVALID_PRODUCT_DATA));
    }
    return next(err);
  }
}

export async function getProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      throw new NotFoundError(ERROR_MESSAGES.PRODUCT_NOT_FOUND);
    }
    return res.send(product);
  } catch (err) {
    if ((err as Error).name === 'CastError') {
      return next(new BadRequestError(ERROR_MESSAGES.INVALID_ID));
    }
    return next(err);
  }
}

export async function updateProduct(req: MyRequest, res: Response, next: NextFunction) {
  try {
    const product = await Product.findByIdAndUpdate(req.params.productId, req.body, {
      new: true,
    });
    if (!product) {
      throw new NotFoundError(ERROR_MESSAGES.PRODUCT_NOT_FOUND);
    }
    return res.send(product);
  } catch (err) {
    if ((err as Error).name === 'CastError') {
      return next(new BadRequestError(ERROR_MESSAGES.INVALID_ID));
    }
    return next(err);
  }
}

export async function deleteProduct(req: MyRequest, res: Response, next: NextFunction) {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId);
    if (!product) {
      throw new NotFoundError(ERROR_MESSAGES.PRODUCT_NOT_FOUND);
    }
    return res.send(product);
  } catch (err) {
    if ((err as Error).name === 'CastError') {
      return next(new BadRequestError(ERROR_MESSAGES.INVALID_ID));
    }
    return next(err);
  }
}
