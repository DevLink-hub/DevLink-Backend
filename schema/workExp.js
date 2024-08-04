import Joi from 'joi';

// Work Experience Validation Schema
export const workExperienceSchema = Joi.object({
  company: Joi.string().required(),
  position: Joi.string().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  description: Joi.string().required(),
});