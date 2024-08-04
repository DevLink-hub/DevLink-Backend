import Joi from 'joi';

// Portfolio Validation Schema
export const portfolioSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  link: Joi.string().uri().required(),
  createdAt: Joi.date().default(() => new Date()).required(),
});