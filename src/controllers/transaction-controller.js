const fs = require("fs");
const {
  validateCreateTransaction,
  validateUpdateTransaction
} = require("../validators/transaction-validator");

const cloudinary = require("../utils/cloudinary");

const { Transaction, Category } = require("../models");

exports.createTransaction = async (req, res, next) => {
  try {
    // request body payee, amount, date, image, note
    // 1. validate data (req.body)
    const value = validateCreateTransaction({
      payee: req.body.payee,
      amount: req.body.amount,
      date: req.body.date,
      image: req.file?.path,
      note: req.body.note,
      categoryId: req.params.categoryId
    });
    // 2. save data to database
    if (value.image) {
      value.image = await cloudinary.upload(value.image);
    }

    value.userId = req.user.id;

    const transaction = await Transaction.create(value);

    // 3. sent response
    res.status(201).json({ transaction });
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};
exports.getAllTransaction = async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll({
      where: {
        userId: req.user.id
      },
      order: [["createdAt", "DESC"]],
      include: {
        model: Category,
        attributes: {
          exclude: ["createdAt", "updatedAt", "userId"]
        }
      }
    });
    res.status(200).json({ transactions });
  } catch (err) {
    next(err);
  }
};
exports.getTransactionById = async (req, res, next) => {
  try {
    const transactionId = req.params.transactionId;

    const transaction = await Transaction.findOne({
      where: { id: transactionId, userId: req.user.id },
      include: {
        model: Category,
        attributes: {
          exclude: ["createdAt", "updatedAt", "userId"]
        }
      }
    });
    res.status(200).json({ transaction });
  } catch (err) {
    next(err);
  }
};
exports.updateTransaction = async (req, res, next) => {
  try {
    // request body payee, amount, date, image, note
    // request params id
    const transactionId = req.params.transactionId;
    // 1. validate data (req.body)
    const value = validateUpdateTransaction(req.body);

    // 2. update category table
    const transaction = await Transaction.update(value, {
      where: {
        id: transactionId,
        userId: req.user.id
      }
    });

    // 3. sent response
    res.status(200).json({ transaction });
  } catch (err) {
    next(err);
  }
};
exports.deleteTransaction = async (req, res, next) => {
  try {
    const transactionId = req.params.transactionId;
    await Transaction.destroy({
      where: { id: transactionId, userId: req.user.id }
    });
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
