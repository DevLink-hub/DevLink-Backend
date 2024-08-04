import Joi from 'joi';

// Freelancer Validation Schema
export const freelancerSchema = Joi.object({
  coverPhoto:Joi.string(),
  profilePhoto:Joi.string(),
  bio: Joi.string().required(),
  location: Joi.string().required(),
  skills:Joi.string().required().required(),
});


