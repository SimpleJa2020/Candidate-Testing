const jwt = require("jsonwebtoken");

const { User } = require("../models");
const createError = require("../utils/create-error");

module.exports = async (req, res, next) => {
  try {
    // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzIyNjY5NDY1LCJleHAiOjE3MjUyNjE0NjV9.45z8yJuYfUg6AZSRC6LLnEfpNhmnAntkfJDzaSpshE4
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer")) {
      createError("you are unauthorized", 401);
    }
    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findOne({ where: { id: payload.id } });
    if (!user) {
      createError("you are unauthorized", 401);
    }
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
