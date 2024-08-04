const Joi = require("joi");

const validate = require("./validate");

const createCategorySchema = Joi.object({
  name: Joi.string().required().trim().messages({
    "any.required": "name is required",
    "string.empty": "name is required",
    "string.base": "name must be a string"
  }),
  type: Joi.string().required().trim().messages({
    "any.required": "type is required",
    "string.empty": "type is required",
    "string.base": "type must be a string"
  })
});

exports.validateCreateCategory = validate(createCategorySchema);

const updateCategorySchema = Joi.object({
  name: Joi.string().trim(),
  type: Joi.string().trim()
}).min(1);

exports.validateUpdateCategory = validate(updateCategorySchema);
