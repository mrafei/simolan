import express from "express";
import authMiddleware from "../middlewares/auth";
import { login, signup } from "../controllers/user";
import { get as getTransaction } from "../controllers/transaction";

const router = express.Router();
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json({ users: "respond with a resource" });
});

router.post("/signup", [], signup);
router.post("/login", [], login);
router.get("/:id/transactions", [authMiddleware], getTransaction);
export default router;
