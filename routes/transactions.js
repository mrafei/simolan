import express from "express";
import authMiddleware from "../middlewares/auth.js";
import { create } from "../controllers/transaction.js";
const router = express.Router();
/* GET users listing. */

router.post("/", [authMiddleware], create);
export default router;
