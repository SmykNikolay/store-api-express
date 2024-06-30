import { celebrate, Joi, Segments } from 'celebrate';
import { describe } from 'node:test';

export const signInValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

export const signUpValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
});

export const userIdValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
});

export const updateUserAvatarValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().uri().required(),
  }),
});

export const updateUserProfileValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().uri(),
  }),
});

export const cardIdValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

export const createCardValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().uri().required(),
  }),
});

export const productIdValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    productId: Joi.string().length(24).hex().required(),
  }),
});

export const createProductValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    category_id: Joi.string().length(24).hex(),
    stock: Joi.number(),
    images: Joi.array().items(Joi.string().uri()).required(),
  }),
});

export const categoryIdValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    categoryId: Joi.string().length(24).hex().required(),
  }),
});

export const createCategoryValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    description: Joi.string().min(2).max(100).required(),
  }),
});
