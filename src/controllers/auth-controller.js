const {
  validateRegister,
  validateLogin
} = require("../validators/auth-validator");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../models");
const createError = require("../utils/create-error");

exports.register = async (req, res, next) => {
  try {
    // 1. validate input (req.body)
    const value = validateRegister(req.body);

    // 2. search user by email
    const user = await User.findOne({ where: { email: value.email } });
    if (user) {
      createError("invalid email or password", 400);
    }
    // 3. insert data to users
    value.password = await bcrypt.hash(value.password, 12);
    await User.create(value);

    // 4. sent response
    res
      .status(201)
      .json({ message: "register success.  please log in to continue" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    // 1. validate input (req.body)
    const value = validateLogin(req.body);

    // 2. search user by email
    const user = await User.findOne({ where: { email: value.email } });
    if (!user) {
      createError("invalid email or password", 400);
    }

    // 3. compare password
    const isCorrect = await bcrypt.compare(value.password, user.password);
    if (!isCorrect) {
      createError("invalid email or password", 400);
    }

    // 4. gen jwt
    const payload = { id: user.id };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

    // 5. sent response
    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};
