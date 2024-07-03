import { celebrate, Joi, Segments } from 'celebrate';

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

export const orderIdValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    orderId: Joi.string().length(24).hex().required(),
  }),
});

export const createOrderValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    user_id: Joi.string().length(24).hex().required(),
    order_date: Joi.date().required(),
    status: Joi.string().required(),
    total_amount: Joi.number().required(),
    items: Joi.array()
      .items(
        Joi.object().keys({
          product_id: Joi.string().length(24).hex().required(),
          quantity: Joi.number().required(),
          price_per_item: Joi.number().required(),
          size: Joi.string().required(),
          color: Joi.string().required(),
        }),
      )
      .required(),
    shipping_address: Joi.object()
      .keys({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        address_line_1: Joi.string().required(),
        address_line_2: Joi.string().required(),
        city: Joi.string().required(),
        postal_code: Joi.string().required(),
        country: Joi.string().required(),
      })
      .required(),
  }),
});

export const updateOrderValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    status: Joi.string(),
    total_amount: Joi.number(),
    items: Joi.array().items(
      Joi.object().keys({
        product_id: Joi.string().length(24).hex(),
        quantity: Joi.number(),
        price_per_item: Joi.number(),
        size: Joi.string(),
        color: Joi.string(),
      }),
    ),
    shipping_address: Joi.object().keys({
      first_name: Joi.string(),
      last_name: Joi.string(),
      address_line_1: Joi.string(),
      address_line_2: Joi.string(),
      city: Joi.string(),
      postal_code: Joi.string(),
      country: Joi.string(),
    }),
  }),
});
