const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../configs/jwt");
exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new Error("validation error");
  }
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 12);
  const user = new User({ username, hash });
  try {
    await user.save();
  } catch (e) {
    return next(e);
  }
  return res.status(201).json({ id: user._id.toString() });
};

exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new Error("validation error"));
  }
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    const error = new Error("User not found!");
    error.statusCode = 404;
    return next(error);
  }
  const isCorrect = await bcrypt.compare(password, user.hash);
  if (!isCorrect) {
    const error = new Error("Wrong password!");
    error.statusCode = 401;
    return next(error);
  }
  const id = user._id.toString();
  const token = jwt.sign({ username, id }, jwtSecret);
  res.status(200).json({ id, token });
};
