import Joi from 'joi';

export const createUserValidation = Joi.object({
  username: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com'] },
    })
    .required(),
  phone_number: Joi.string()
    .pattern(/^(08|628)\d+$/)
    .min(10)
    .max(14)
    .required(),
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]+$'))
    .min(8)
    .required(),
});

export const loginUserValidation = Joi.object({
  username: Joi.string().allow(null, '').optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com'] },
    })
    .allow(null, '')
    .optional(),
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]+$'))
    .min(8)
    .required(),
}).or('username', 'email'); 

export const createPostValidation = Joi.object({
  content: Joi.string().required().min(15),
  media: Joi.string().required(),
  categoryId: Joi.number().required(),
  tags: Joi.array().items(Joi.number()).required(),
});

export const tagsValidation = Joi.object({
    name: Joi.string().required().min(3)
});

export const categoryValidation = Joi.object({
  name: Joi.string().required().min(3)
});