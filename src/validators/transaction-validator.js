const Joi = require("joi");

const validate = require("./validate");

const createTransactionSchema = Joi.object({
  payee: Joi.string().required().trim().messages({
    "any.required": "payee is required",
    "string.empty": "payee is required",
    "string.base": "payee must be a string"
  }),
  amount: Joi.number().required(),
  date: Joi.date().required(),
  image: Joi.string().trim().required().messages({
    "any.required": "image is required",
    "string.empty": "image is required"
  }),
  note: Joi.string()
    .trim()
    .replace(/{{[^}]+}}|(fuck)/gm, "*"),
  categoryId: Joi.string().trim()
}).min(1);

exports.validateCreateTransaction = validate(createTransactionSchema);

const updateTransactionSchema = Joi.object({
  payee: Joi.string().trim(),
  amount: Joi.number(),
  date: Joi.date(),
  image: Joi.string().trim(),
  note: Joi.string()
    .trim()
    .replace(/{{[^}]+}}|(fuck)/gm, "*"),
  categoryId: Joi.string().trim()
});

exports.validateUpdateTransaction = validate(updateTransactionSchema);
