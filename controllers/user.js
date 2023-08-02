import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import User from "../models/user";
import jwt from "jsonwebtoken";
import jwtSecret from "../configs/jwt";

const signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new Error("validation error");
    const { username, password } = req.body;
    const sameUser = await User.findOne({ username });
    if (sameUser) throw new Error("This username is taken!");
    const hash = await bcrypt.hash(password, 12);
    const user = new User({ username, hash });
    await user.save();
    return res.status(201).json({ id: user._id.toString() });
  } catch (e) {
    return next(e);
  }
};

const login = async (req, res, next) => {
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

export { login, signup };
