import Joi from "joi";

export const userSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    termsAndCondition:Joi.boolean(),
    userName:Joi.string(),
});

