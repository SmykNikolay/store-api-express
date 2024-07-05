import { NextFunction, Request, Response } from 'express';
import { STATUS_CODES, ERROR_MESSAGES, NotFoundError, BadRequestError } from '../utils/errors';
import Order from '../model/order';
import { MyRequest } from '../utils/types';

export async function getAllOrders(_req: Request, res: Response, next: NextFunction) {
  try {
    const orders = await Order.find();
    res.send(orders);
  } catch (err) {
    next(err);
  }
}

export async function createOrder(req: MyRequest, res: Response, next: NextFunction) {
  try {
    const order = await Order.create({ ...req.body });
    return res.status(STATUS_CODES.CREATED).send(order);
  } catch (err) {
    if ((err as Error).name === 'ValidationError') {
      return next(new BadRequestError(ERROR_MESSAGES.INVALID_ORDER_DATA));
    }
    return next(err);
  }
}

export async function getOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      throw new NotFoundError(ERROR_MESSAGES.ORDER_NOT_FOUND);
    }
    return res.send(order);
  } catch (err) {
    if ((err as Error).name === 'CastError') {
      return next(new BadRequestError(ERROR_MESSAGES.INVALID_ID));
    }
    return next(err);
  }
}

export async function updateOrder(req: MyRequest, res: Response, next: NextFunction) {
  try {
    const order = await Order.findByIdAndUpdate(req.params.orderId, req.body, {
      new: true
    });
    if (!order) {
      throw new NotFoundError(ERROR_MESSAGES.ORDER_NOT_FOUND);
    }
    return res.send(order);
  } catch (err) {
    if ((err as Error).name === 'CastError') {
      return next(new BadRequestError(ERROR_MESSAGES.INVALID_ID));
    }
    return next(err);
  }
}

export async function deleteOrder(req: MyRequest, res: Response, next: NextFunction) {
  try {
    const order = await Order.findByIdAndDelete(req.params.orderId);
    if (!order) {
      throw new NotFoundError(ERROR_MESSAGES.ORDER_NOT_FOUND);
    }
    return res.send(order);
  } catch (err) {
    if ((err as Error).name === 'CastError') {
      return next(new BadRequestError(ERROR_MESSAGES.INVALID_ID));
    }
    return next(err);
  }
}
