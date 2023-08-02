import express from "express";
import authMiddleware from "../middlewares/auth.js";
import { login, signup } from "../controllers/user.js";
import { get as getTransaction } from "../controllers/transaction.js";

const router = express.Router();
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json({ users: "respond with a resource" });
});

router.post("/signup", [], signup);
router.post("/login", [], login);
router.get("/:id/transactions", [authMiddleware], getTransaction);
export default router;
