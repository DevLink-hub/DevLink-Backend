import Joi from "joi";


// Define the Joi schema for validation
export const educationSchema = Joi.object({
  institution: Joi.string().required(),
  degree: Joi.string().required(),
  year: Joi.string().required(),
  fieldOfStudy: Joi.string().required(),

});