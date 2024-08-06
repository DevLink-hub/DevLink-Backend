import Joi from "joi";

export const clientSchema = Joi.object({
    companyName: Joi.string(),
    location: Joi.string(),
    Industry: Joi.string().optional(),
    companyAddress: Joi.string(),
    companyEmail: Joi.string().email(),
    companyPhone: Joi.string(),
    Bio:Joi.string(),
    socilLink:Joi.string(),
    coverPhoto:Joi.string(),
    profilePhoto:Joi.string(),

})