import Joi from 'joi';

export const clientProjectSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  budget: Joi.number().required(),
  deadline: Joi.date().required(),
  skillsRequired: Joi.array().items(Joi.string()).required(),
  status: Joi.string().valid('open', 'in_progress', 'completed', 'canceled').default('open')
});
