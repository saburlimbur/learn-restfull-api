import Joi from 'joi';
import { TAGS_NAME } from "@prisma/client"

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
  position: Joi.string().required(),
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
  title: Joi.string().required().min(8),
  content: Joi.string().required().min(15),
  media: Joi.string().required(),
  categoryId: Joi.number().required(),
  tags: Joi.optional(),
});

export const tagsValidation = Joi.object({
  tag_name: Joi.string().valid(...Object.values(TAGS_NAME)).required(),
});

export const categoryValidation = Joi.object({
  name: Joi.string().required().min(3),
});