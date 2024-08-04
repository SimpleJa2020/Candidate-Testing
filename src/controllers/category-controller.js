const {
  validateCreateCategory,
  validateUpdateCategory
} = require("../validators/category-validator");

const { Category } = require("../models");

exports.createCategory = async (req, res, next) => {
  try {
    // request body name, type
    // 1. validate data (req.body)
    const value = validateCreateCategory(req.body);

    // 2. save data to database
    value.userId = req.user.id;

    const category = await Category.create(value);

    // 3. sent response
    res.status(201).json({ category });
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
    const categoryId = req.params.categoryId;

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
    // request body name?, type?
    // request params id
    const categoryId = req.params.categoryId;
    // 1. validate data (req.body)
    const value = validateUpdateCategory(req.body);

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
    const categoryId = req.params.categoryId;
    await Category.destroy({ where: { id: categoryId, userId: req.user.id } });
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
