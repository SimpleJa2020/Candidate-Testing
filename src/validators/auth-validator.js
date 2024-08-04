const Joi = require("joi");

const validate = require("./validate");

const registerSchema = Joi.object({
  email: Joi.string().required().email().messages({
    "string.email": "email is invalid",
    "any.required": "email is required"
  }),
  password: Joi.string().required().min(6).trim(),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).strip()
});

exports.validateRegister = validate(registerSchema);

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required()
});

exports.validateLogin = validate(loginSchema);
