import { NextFunction, Request, Response } from 'express';
import {
  STATUS_CODES,
  ERROR_MESSAGES,
  NotFoundError,
  BadRequestError,
} from '../utils/errors';
import Category from '../model/category';
import { MyRequest } from '../utils/types';

export async function getAllCategories(_req: Request, res: Response, next: NextFunction) {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (err) {
    next(err);
  }
}

export async function createCategory(req: MyRequest, res: Response, next: NextFunction) {
  try {
    const category = await Category.create({ ...req.body });
    return res.status(STATUS_CODES.CREATED).send(category);
  } catch (err) {
    if ((err as Error).name === 'ValidationError') {
      return next(new BadRequestError('Ошибка создании категории'));
    }
    return next(err);
  }
}

export async function getCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) {
      throw new NotFoundError(ERROR_MESSAGES.PRODUCT_NOT_FOUND);
    }
    return res.send(category);
  } catch (err) {
    if ((err as Error).name === 'CastError') {
      return next(new BadRequestError(ERROR_MESSAGES.INVALID_ID));
    }
    return next(err);
  }
}

export async function updateCategory(req: MyRequest, res: Response, next: NextFunction) {
  try {
    const category = await Category.findByIdAndUpdate(req.params.categoryId, req.body, {
      new: true,
    });
    if (!category) {
      throw new NotFoundError(ERROR_MESSAGES.PRODUCT_NOT_FOUND);
    }
    return res.send(category);
  } catch (err) {
    if ((err as Error).name === 'CastError') {
      return next(new BadRequestError(ERROR_MESSAGES.INVALID_ID));
    }
    return next(err);
  }
}

export async function deleteCategory(req: MyRequest, res: Response, next: NextFunction) {
  try {
    const category = await Category.findByIdAndDelete(req.params.categoryId);
    if (!category) {
      throw new NotFoundError(ERROR_MESSAGES.PRODUCT_NOT_FOUND);
    }
    return res.send(category);
  } catch (err) {
    if ((err as Error).name === 'CastError') {
      return next(new BadRequestError(ERROR_MESSAGES.INVALID_ID));
    }
    return next(err);
  }
}
