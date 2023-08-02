import { validationResult } from "express-validator";
import Transaction from "../models/transaction.js";
import User from "../models/user.js";

const create = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new Error("validation error");
    const { addition, amount, date, note, type } = req.body;
    const user = await User.findById(req.user);
    console.log(user, req.user);
    if (!user) throw new Error("User not found!");
    const transaction = new Transaction({
      addition,
      amount,
      date,
      note,
      type,
      user: user._id.toString(),
    });
    await transaction.save();
    return res.status(201).json({ id: transaction._id.toString() });
  } catch (e) {
    return next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const user = await User.findById(req.user);

    if (!user) {
      const error = new Error("User not found!");
      error.statusCode = 404;
      return next(error);
    }

    if (req.user !== req.params.id) {
      const error = new Error("Unauthorized!");
      error.statusCode = 403;
      return next(error);
    }

    if (req.user !== req.params.id) {
      const error = new Error("User not found!");
      error.statusCode = 404;
      return next(error);
    }
    const transactions = await Transaction.find({ user: user._id.toString() });
    res.status(200).json(transactions);
  } catch (e) {
    next(e);
  }
};

export { get, create };
