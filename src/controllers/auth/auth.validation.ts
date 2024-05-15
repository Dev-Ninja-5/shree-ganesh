import Joi from "joi";

export const register = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().optional(),
  password: Joi.string().required(),
  role: Joi.string().optional(),
  is_disabled: Joi.boolean().optional(),
}).options({ stripUnknown: true });

export const login = Joi.object({
  email: Joi.string().lowercase().required(),
  password: Joi.string().required(),
});
