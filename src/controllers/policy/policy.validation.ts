import Joi from "joi";

export const create = Joi.object({
  customer_name: Joi.string().optional(),
  mobile: Joi.string().optional(),
  vehicle_number: Joi.string().optional(),
  insurance_company_name: Joi.string().optional(),
  insurance_type: Joi.string().optional(),
  motor_insurance_type: Joi.string().optional(),
  net_premium: Joi.number().optional(),
  executive: Joi.string().optional(),
  policy_pdf: Joi.string().optional(),
  policy_expiry_date: Joi.string().optional(),
  fitness_validity: Joi.string().optional(),
  tex_validity: Joi.string().optional(),
  puc_validity: Joi.string().optional(),
  permit_validity: Joi.string().optional(),
}).options({ stripUnknown: true });

export const update = Joi.object({
  customer_name: Joi.string().optional(),
  mobile: Joi.string().optional(),
  vehicle_number: Joi.string().optional(),
  insurance_company_name: Joi.string().optional(),
  insurance_type: Joi.string().optional(),
  net_premium: Joi.number().optional(),
  executive: Joi.string().optional(),
  policy_pdf: Joi.string().optional(),
  policy_expiry_date: Joi.string().optional(),
}).options({ stripUnknown: true });

export const single = Joi.object({
  id: Joi.string().required(),
});

export const query = Joi.object({
  page: Joi.number().optional(),
  limit: Joi.number().optional(),
  offset: Joi.number().optional(),
});
