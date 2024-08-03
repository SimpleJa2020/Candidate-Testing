const Joi = require("joi");

const { Category } = require("../models");

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

const updateCategorySchema = Joi.object({
  name: Joi.string().trim(),
  type: Joi.string().trim()
}).min(1);

exports.createCategory = async (req, res, next) => {
  try {
    // request body name, type
    // 1. validate data (req.body)
    const { value, error } = createCategorySchema.validate(req.body);
    if (error) {
      return next(error);
    }

    // 2. save data to database
    value.userId = req.user.id;
    Category.create(value);

    // 3. sent response
    res.status(201).json({ message: "create category success" });
  } catch (err) {
    next(err);
  }
};
exports.getAllCategory = async (req, res, next) => {
  try {
    const category = await Category.findAll({
      where: {
        userId: req.user.id
      },
      order: [["createdAt", "DESC"]]
    });
    res.status(200).json({ category });
  } catch (err) {
    next(err);
  }
};
exports.getCategoryById = async (req, res, next) => {
  try {
    const categoryId = req.params.id;

    const category = await Category.findOne({
      where: { id: categoryId, userId: req.user.id }
    });
    res.status(200).json({ category });
  } catch (err) {
    next(err);
  }
};
exports.updateCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;

    // request body name?, type?
    // request params id
    // 1. validate data (req.body)
    const { value, error } = updateCategorySchema.validate(req.body);
    if (error) {
      return next(error);
    }

    // 2. update category table
    await Category.update(value, {
      where: { id: categoryId, userId: req.user.id }
    });

    // 3. sent response
    res.status(200).json({ message: "update category success" });
  } catch (err) {
    next(err);
  }
};
exports.deleteCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    await Category.destroy({ where: { id: categoryId, userId: req.user.id } });
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
